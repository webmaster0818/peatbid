#!/bin/bash
# PeatBid 週次 Yahoo中央値更新 + 自動デプロイ + Discord通知
#
# Plan A 準拠：
#   - Yahoo Auctions 過去180日落札中央値を取得
#   - data/brands.csv + data/price-history/*.json を更新（履歴蓄積）
#   - brand-kaitori 54本 + angle 452本 + ハブ6本を再生成
#   - peatbid-deploy へコピー（tier2除外）→ push → CF自動デプロイ
#   - Discord に完了/失敗を通知
#
# 環境変数:
#   DISCORD_PRICE_WEBHOOK — Discord Webhook URL（LaunchAgent plist で設定）
#
# 失敗時も Discord に通知する設計（set -e で停止 → trap で通知）

SRC="/Users/takashi.hasegawa/projects/peatbid"
DEPLOY="/Users/takashi.hasegawa/projects/peatbid-deploy"
RUN_LOG="/tmp/peatbid-weekly.log"

export PATH=/opt/homebrew/bin:/usr/bin:/usr/local/bin:$PATH

# ===== Discord notification helper =====
notify_discord() {
  local content="$1"
  if [ -z "$DISCORD_PRICE_WEBHOOK" ]; then
    local discord_keys
    discord_keys=$(env | cut -d= -f1 | grep -i 'discord\|webhook' | tr '\n' ',' || true)
    echo "[$(date '+%H:%M:%S')] ⚠️  DISCORD_PRICE_WEBHOOK 未設定、通知スキップ (env discord-related keys: ${discord_keys:-none}, PATH=${PATH:0:60}...)" >&2
    return 0
  fi
  # Discord limits content to 2000 chars
  local payload
  payload=$(/opt/homebrew/bin/python3 -c "
import json, sys
text = sys.stdin.read()
if len(text) > 1900: text = text[:1900] + '...(truncated)'
print(json.dumps({'content': text}, ensure_ascii=False))
" <<< "$content")
  /usr/bin/curl -s -X POST -H "Content-Type: application/json" \
    -d "$payload" "$DISCORD_PRICE_WEBHOOK" > /dev/null || true
}

# ===== rm -rf with retry (APFS race condition workaround) =====
safe_rm_rf() {
  local target="$1"
  for attempt in 1 2 3; do
    if rm -rf "$target" 2>/dev/null; then
      return 0
    fi
    sleep 2
  done
  # Last-resort: force again with stderr visible, accept partial removal
  rm -rf "$target" 2>&1 || true
  if [ -d "$target" ]; then
    echo "[$(date '+%H:%M:%S')] ⚠️  $target removal partial; continuing" >&2
  fi
  return 0
}

# ===== Error trap =====
RUN_ID="$(date '+%Y-%m-%d %H:%M:%S')"
START_EPOCH=$(date +%s)
trap 'on_error $LINENO' ERR
on_error() {
  local lineno=$1
  local elapsed=$(( $(date +%s) - START_EPOCH ))
  local last_lines
  last_lines=$(tail -25 "$RUN_LOG" 2>/dev/null | tail -c 1500)
  notify_discord "❌ **PeatBid 週次更新 失敗** ($(date '+%Y-%m-%d %H:%M'))
- 実行ID: $RUN_ID
- 失敗箇所: scripts/weekly-yahoo-update.sh 行$lineno
- 経過時間: ${elapsed}s
- ログ末尾:
\`\`\`
${last_lines}
\`\`\`
ログ全文: $RUN_LOG"
  exit 1
}

set -e
cd "$SRC"

echo "[$RUN_ID] === PeatBid 週次更新 開始 ==="

echo "[$(date '+%H:%M:%S')] 🔍 [1/7] Yahoo中央値取得（50銘柄 / 過去180日 / IQR外れ値除去）"
/opt/homebrew/bin/python3 scripts/fetch-yahoo-medians.py 2>&1 | tee /tmp/peatbid-fetch.log | tail -5

echo "[$(date '+%H:%M:%S')] 🔄 [2/7] brands.json 再生成（hub ページ用）"
/opt/homebrew/bin/python3 -c "
import csv, json
from pathlib import Path
ROOT = Path('$SRC')
rows = []
with open(ROOT / 'data' / 'brands.csv', encoding='utf-8') as f:
    for r in csv.DictReader(f):
        median = r.get('yahoo_median_jpy_180d', '').strip()
        n = r.get('yahoo_sample_n', '0').strip()
        rows.append({
            'slug': r['slug'], 'name_ja': r['name_ja'], 'name_en': r['name_en'],
            'category': r['category'], 'origin': r['origin'], 'rarity_tier': r['rarity_tier'],
            'yahoo_median_jpy_180d': int(median) if median.isdigit() else None,
            'yahoo_sample_n': int(n) if n.isdigit() else 0,
            'yahoo_fetched_at': r.get('yahoo_fetched_at', '').strip() or None,
            'yahoo_query_used': r.get('yahoo_query_used', '').strip() or None,
        })
(ROOT / 'data' / 'brands.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'  ✓ wrote brands.json ({len(rows)} brands)')
"

echo "[$(date '+%H:%M:%S')] 📝 [3/7] brand-kaitori ページ再生成（v3）"
/opt/homebrew/bin/python3 scripts/generate-brand-pages-v3.py

echo "[$(date '+%H:%M:%S')] 📝 [4/7] angle ページ再生成（v3）"
/opt/homebrew/bin/python3 scripts/generate-angle-pages-v3.py

echo "[$(date '+%H:%M:%S')] 📝 [4.2/7] 真贋ハブ再生成（CVブロックの実勢中央値を週次更新）"
/opt/homebrew/bin/python3 scripts/gen-nisemono-brand-hubs.py

echo "[$(date '+%H:%M:%S')] 📈 [4.5/7] 相場ランキング・データ再生成（B：更新型コンテンツ）"
/opt/homebrew/bin/python3 scripts/generate-souba-ranking.py
/opt/homebrew/bin/python3 scripts/generate-souba-index.py
/opt/homebrew/bin/python3 scripts/generate-souba-report.py

echo "[$(date '+%H:%M:%S')] 📊 [5/7] sitemap.xml 再生成"
node scripts/generate-sitemap.mjs
cp public/sitemap.xml out/sitemap.xml 2>/dev/null || true

echo "[$(date '+%H:%M:%S')] 🏗️  [6/7] Next.js ビルド"
safe_rm_rf .next
# 大規模ビルド（約2900URL）でヒープ不足によるSIGABRT(OOM)を防ぐためヒープ拡張
export NODE_OPTIONS="--max-old-space-size=12288"
set -o pipefail
npx next build 2>&1 | tail -5
set +o pipefail
# Next 16.2 では RSC payload が __next*.txt から index.txt に変わったため *.txt 全削除
find out -name "*.txt" -type f -delete

# Scaled Content リント（warnモード：違反を記録するだけでデプロイは止めない）
echo "[$(date '+%H:%M:%S')] 🔎 [6.5/7] Scaled Content リント"
LINT="$HOME/.openclaw/workspace/scaled-content-lint.py"
[ -f "$LINT" ] && /opt/homebrew/bin/python3 "$LINT" peatbid "$SRC/out" --glob "articles/*/index.html" --min-unique 200 --dup 0.6 --top 10 2>&1 | sed -n '1,4p' || true

echo "[$(date '+%H:%M:%S')] 📤 [7/7] peatbid-deploy へ rsync & push（tier2除外）"
rsync -a --delete \
  --exclude=".git" \
  --exclude="tier2" \
  --exclude="_not-found" \
  --exclude="functions" \
  "$SRC/out/" "$DEPLOY/"

cd "$DEPLOY"
git add -A
TIMESTAMP=$(date "+%Y-%m-%d")
git commit -m "Weekly Yahoo median update: $TIMESTAMP" --allow-empty 2>&1 | tail -3
COMMIT_HASH=$(git rev-parse --short HEAD)
git push origin "$(git rev-parse HEAD):refs/heads/main" 2>&1 | tail -3

echo "[$(date '+%H:%M:%S')] 📤 [7b/7] peatbid (SRC) もコミット & push"
cd "$SRC"
git add -A
git commit -m "Weekly Yahoo median update (SRC sync): $TIMESTAMP" --allow-empty 2>&1 | tail -3
SRC_COMMIT_HASH=$(git rev-parse --short HEAD)
git push origin "$(git rev-parse HEAD):refs/heads/main" 2>&1 | tail -3

# ===== Summarize results for Discord =====
SUMMARY=$(/opt/homebrew/bin/python3 -c "
import json
from pathlib import Path
data = json.load(open('$SRC/data/yahoo-medians.json'))
ok = [s for s,r in data.items() if r.get('median') and not r.get('insufficient')]
insufficient = [s for s,r in data.items() if not r.get('median') or r.get('insufficient')]
top_movers = []  # 比較対象前回値がないので今回はスキップ
print(f'取得成功: {len(ok)}/{len(data)}')
print(f'データ不足: {len(insufficient)}')
if insufficient:
    print('  - ' + ', '.join(insufficient))
")
ELAPSED=$(( $(date +%s) - START_EPOCH ))

echo "[$(date '+%H:%M:%S')] ✅ 完了 — 経過時間: ${ELAPSED}s"

# 週次相場指数レポート（読者向け・このチャンネルへ自動投稿）
REPORT=$(/opt/homebrew/bin/python3 "$SRC/scripts/build-index-report.py" 2>/dev/null || echo "")

notify_discord "${REPORT}

──────────
(内部) 週次更新完了 $(date '+%Y-%m-%d %H:%M')・${ELAPSED}s・commit \`$COMMIT_HASH\`・${SUMMARY}・CF反映数分"
