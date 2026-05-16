#!/usr/bin/env python3
"""
PeatBid Level 3 Price Monitor
============================

毎週 Yahoo Auctions の終了オークションデータを取得し、
TOP10銘柄の平均落札価格・出品件数の変動を検知。

実行: python3 scripts/level3-monitor.py [--notify]

データフロー:
  Yahoo Auctions closed search
    → HTML 解析（平均価格・最高価格・出品件数）
    → data/scraper-state/<brand>.json に保存
    → 前回スナップショットと比較
    → 差分が閾値超 → Discord 通知 + 更新提案生成

閾値:
  - 平均価格変動率 >= 5%
  - 出品件数変動率 >= 20%
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATE_DIR = ROOT / "data" / "scraper-state"
PROPOSAL_DIR = ROOT / "data" / "scraper-state" / "proposals"
STATE_DIR.mkdir(parents=True, exist_ok=True)
PROPOSAL_DIR.mkdir(parents=True, exist_ok=True)

# 監視対象（TOP10）
BRANDS = [
    {"slug": "yamazaki-18", "label": "山崎18年", "query": "山崎18年"},
    {"slug": "yamazaki-25", "label": "山崎25年", "query": "山崎25年"},
    {"slug": "hibiki-30", "label": "響30年", "query": "響30年"},
    {"slug": "hibiki-21", "label": "響21年", "query": "響21年"},
    {"slug": "hakushu-25", "label": "白州25年", "query": "白州25年"},
    {"slug": "hakushu-18", "label": "白州18年", "query": "白州18年"},
    {"slug": "karuizawa-12", "label": "軽井沢12年", "query": "軽井沢 12年 ウイスキー"},
    {"slug": "macallan-25", "label": "マッカラン25年", "query": "マッカラン25年"},
    {"slug": "macallan-30", "label": "マッカラン30年", "query": "マッカラン30年"},
    {"slug": "chichibu-the-first", "label": "秩父ザファースト", "query": "秩父 ザファースト"},
]

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"

# 変動検知の閾値
PRICE_THRESHOLD_PCT = 5.0
COUNT_THRESHOLD_PCT = 20.0


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=15) as res:
        return res.read().decode("utf-8", errors="replace")


def parse_yahoo(html: str) -> dict:
    """
    Yahoo Auctions closed search HTML から統計を抽出。
    Returns: { avg: int, max: int, min: int, count: int } or empty dict if parse fails
    """
    result = {"avg": None, "max": None, "min": None, "count": None}

    # 平均価格 X,XXX
    m = re.search(r"平均価格\s*([\d,]+)", html)
    if m:
        result["avg"] = int(m.group(1).replace(",", ""))

    # 最高価格 X,XXX
    m = re.search(r"最高価格\s*([\d,]+)", html)
    if m:
        result["max"] = int(m.group(1).replace(",", ""))

    # 最低価格 X,XXX
    m = re.search(r"最低価格\s*([\d,]+)", html)
    if m:
        result["min"] = int(m.group(1).replace(",", ""))

    # 約X,XXX件
    m = re.search(r"約([\d,]+)件", html)
    if m:
        result["count"] = int(m.group(1).replace(",", ""))

    return result


def fetch_brand(brand: dict) -> dict:
    """Fetch + parse + return statistics for one brand."""
    q = urllib.parse.quote(brand["query"])
    url = f"https://auctions.yahoo.co.jp/closedsearch/closedsearch?p={q}"
    try:
        html = fetch(url)
        stats = parse_yahoo(html)
        return {
            "slug": brand["slug"],
            "label": brand["label"],
            "fetched_at": datetime.now().isoformat(timespec="seconds"),
            "source_url": url,
            **stats,
            "ok": all(v is not None for v in [stats["avg"], stats["count"]]),
        }
    except Exception as e:
        return {
            "slug": brand["slug"],
            "label": brand["label"],
            "fetched_at": datetime.now().isoformat(timespec="seconds"),
            "source_url": url,
            "error": str(e),
            "ok": False,
        }


def load_previous(slug: str) -> dict | None:
    path = STATE_DIR / f"{slug}.json"
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return None


def save_snapshot(data: dict) -> None:
    path = STATE_DIR / f"{data['slug']}.json"
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def pct(prev: int, curr: int) -> float:
    if prev == 0:
        return 0.0
    return (curr - prev) / prev * 100


def compare(prev: dict | None, curr: dict) -> dict | None:
    """Returns change record if threshold exceeded, else None."""
    if not curr.get("ok") or prev is None or not prev.get("ok"):
        return None

    avg_pct = pct(prev["avg"], curr["avg"])
    count_pct = pct(prev["count"], curr["count"])

    significant = abs(avg_pct) >= PRICE_THRESHOLD_PCT or abs(count_pct) >= COUNT_THRESHOLD_PCT
    if not significant:
        return None

    return {
        "slug": curr["slug"],
        "label": curr["label"],
        "avg_prev": prev["avg"],
        "avg_curr": curr["avg"],
        "avg_pct": round(avg_pct, 1),
        "count_prev": prev["count"],
        "count_curr": curr["count"],
        "count_pct": round(count_pct, 1),
    }


def trend_icon(pct: float) -> str:
    if pct >= PRICE_THRESHOLD_PCT:
        return "🔼"
    if pct <= -PRICE_THRESHOLD_PCT:
        return "🔽"
    return "🟰"


def build_proposal(changes: list, snapshots: list) -> str:
    """
    snapshots: list of (prev, curr) tuples
    """
    today = datetime.now().strftime("%Y-%m-%d")
    lines = [
        f"# PeatBid 価格変動レポート — {today}",
        "",
        f"監視対象: {len(snapshots)}銘柄 / 変動検知: **{len(changes)}件**",
        f"閾値: 平均価格 ±{PRICE_THRESHOLD_PCT}% / 出品件数 ±{COUNT_THRESHOLD_PCT}%",
        "",
        "## 📊 サマリ",
        "",
        "| 銘柄 | 前回平均 | 今回平均 | 変動率 | 出品数変動 |",
        "|------|---------|---------|-------|-----------|",
    ]
    for prev, d in snapshots:
        if not d.get("ok"):
            lines.append(f"| {d['label']} | エラー | - | - | - |")
            continue
        prev_avg = "初回" if not prev or not prev.get("ok") else f"¥{prev['avg']:,}"
        prev_count = "初回" if not prev or not prev.get("ok") else f"{prev['count']:,}件"
        curr_avg = f"¥{d['avg']:,}"
        curr_count = f"{d['count']:,}件"
        if prev and prev.get("ok"):
            ap = pct(prev["avg"], d["avg"])
            cp = pct(prev["count"], d["count"])
            ap_str = f"{trend_icon(ap)} {ap:+.1f}%"
            cp_str = f"{cp:+.1f}%"
        else:
            ap_str = "初回"
            cp_str = "初回"
        lines.append(f"| {d['label']} | {prev_avg} | {curr_avg} | {ap_str} | {prev_count} → {curr_count} ({cp_str}) |")

    lines.extend(["", "## 🚨 要更新候補（閾値超）", ""])
    if not changes:
        lines.append("変動なし。今週の更新は不要です。")
    else:
        for c in changes:
            lines.append(
                f"- **{c['label']}** ({c['slug']}.json)\n"
                f"  - 平均落札: ¥{c['avg_prev']:,} → ¥{c['avg_curr']:,} ({c['avg_pct']:+.1f}%)\n"
                f"  - 出品件数: {c['count_prev']:,}件 → {c['count_curr']:,}件 ({c['count_pct']:+.1f}%)\n"
                f"  - 推定買取相場 = 平均落札 × 0.65 = **¥{int(c['avg_curr'] * 0.65):,}** （業者買取の目安）"
            )
            lines.append("")
    lines.extend([
        "",
        "## 📝 次のアクション",
        "",
        "1. このレポートを確認",
        "2. 更新候補銘柄について、`data/price-history/<slug>.json` の最新月を編集",
        "3. `./scripts/update-prices-and-deploy.sh` を実行",
        "",
        f"_生成日時: {datetime.now().isoformat(timespec='seconds')}_",
    ])
    return "\n".join(lines)


def notify_discord(text: str, webhook_url: str | None) -> bool:
    """Discord webhook 通知（webhook URL がある場合のみ）"""
    if not webhook_url:
        print("⚠️  DISCORD_WEBHOOK_URL 未設定 — 通知スキップ")
        return False
    try:
        import urllib.request as ur
        payload = json.dumps({"content": text[:1900]}).encode("utf-8")
        req = ur.Request(webhook_url, data=payload, headers={"Content-Type": "application/json"})
        ur.urlopen(req, timeout=10)
        return True
    except Exception as e:
        print(f"⚠️  Discord通知失敗: {e}")
        return False


def main():
    import os
    notify = "--notify" in sys.argv
    webhook_url = os.environ.get("DISCORD_PRICE_WEBHOOK")

    print(f"🔍 PeatBid Level 3 Monitor — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"   監視対象: {len(BRANDS)}銘柄")

    snapshots = []
    changes = []
    for i, brand in enumerate(BRANDS, 1):
        print(f"  [{i}/{len(BRANDS)}] {brand['label']} ", end="", flush=True)
        prev = load_previous(brand["slug"])
        curr = fetch_brand(brand)
        snapshots.append((prev, curr))

        if curr.get("ok"):
            change = compare(prev, curr)
            print(f"avg=¥{curr['avg']:,} count={curr['count']:,}", end="")
            if change:
                print(f"  ⚠️ 変動検知 (avg {change['avg_pct']:+.1f}%, count {change['count_pct']:+.1f}%)")
                changes.append(change)
            else:
                print()
            save_snapshot(curr)
        else:
            print(f"❌ {curr.get('error', 'parse failed')}")

        if i < len(BRANDS):
            time.sleep(2)  # 礼儀正しい間隔

    proposal = build_proposal(changes, snapshots)
    today = datetime.now().strftime("%Y-%m-%d")
    proposal_path = PROPOSAL_DIR / f"{today}.md"
    proposal_path.write_text(proposal, encoding="utf-8")
    print(f"\n📝 提案レポート: {proposal_path}")

    if notify:
        summary = f"📊 **PeatBid 価格変動レポート ({today})**\n\n"
        if changes:
            summary += f"変動検知: **{len(changes)}件**\n"
            for c in changes[:5]:
                summary += f"- {trend_icon(c['avg_pct'])} {c['label']}: {c['avg_pct']:+.1f}% (¥{c['avg_curr']:,})\n"
            summary += f"\n詳細レポート: `{proposal_path.relative_to(ROOT)}`\n"
        else:
            summary += "全銘柄、閾値内の変動でした。今週の更新は不要です。\n"
        notify_discord(summary, webhook_url)

    print(f"\n✅ 完了。変動検知: {len(changes)}/{len(snapshots)}件")


if __name__ == "__main__":
    main()
