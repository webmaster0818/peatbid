#!/usr/bin/env python3
"""
サンプル不足（insufficient）銘柄の tier2 リーフ（app/tier2/{pref}/{slug}-kaitori/page.tsx）の
「取得日」「サンプル数 n」「最終更新」「dateModified」を data/yahoo-medians.json の最新値に差し替える。
何度流しても同じ結果（冪等）。

なぜ要るか（2026-10-07）:
  週次 cron（weekly-yahoo-update.sh）は brand-kaitori / angle / ハブ記事だけを再生成し、tier2 リーフは
  一切再生成しない（rsync も --exclude tier2）。tier2 リーフは 8/4 の全再生成（JOYLAB撤去）時点の
  取得日 2026-08-03 がハードコードされたまま本番に残っていた。
  ⚠️ tier2 の全再生成（generate-tier2-full.py / v4-plan-a）は price-history JSON の型不一致で
  ビルドが落ちるため禁止（CLAUDE.md 2026-10-04 参照）。そのため既存ページへの文字列差し替えで対応する。

対象:
  yahoo-medians.json で insufficient=true の銘柄のみ（brands.csv に存在するもの）。
  (a) リーフ本文が「20件に満たない」テンプレ（＝サンプル不足表示）→ 取得日・n・最終更新・dateModified を差し替え。
  (b) リーフが中央値を表示している（前回は n≥20 だったが今回 n<20 に落ちた銘柄。例: macallan-fine-rare 8/3 n=20→10/5 n=16）
      → generate-tier2-v4-plan-a.py の「sufficient=False」分岐と同じ文言に変換する
        （title / description / FAQ JSON-LD / 本文2箇所 / 査定根拠の1箇所）。古い中央値は一切残さない。
  中央値→不足の変換後に「¥」付きの旧中央値が残っていたら、その銘柄は書き込まず WARN（手動対応）。

使い方:
  python3 scripts/patch-tier2-yahoo-freshness.py                # 対象=insufficient 全銘柄
  python3 scripts/patch-tier2-yahoo-freshness.py --slugs a,b    # 対象を限定
  python3 scripts/patch-tier2-yahoo-freshness.py --dry-run      # 書き込まず件数だけ
  python3 scripts/patch-tier2-yahoo-freshness.py --out-slugs /tmp/x.txt  # 変更があった slug を1行1件で書く（週次の部分rsync用）
"""
import argparse
import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TIER2 = ROOT / "app" / "tier2"
MEDIANS = ROOT / "data" / "yahoo-medians.json"
BRANDS_CSV = ROOT / "data" / "brands.csv"

DATE = r"\d{4}-\d{2}-\d{2}"
RE_INSUFF = re.compile(r"（取得日 " + DATE + r"、サンプル数 n=\d+）")
RE_UPDATED = re.compile(r"最終更新: " + DATE)
RE_DATEMOD = re.compile(r'(dateModified\\": \\")' + DATE)
RE_FOOT = re.compile(r"（取得日 " + DATE + r"）です")
INSUFF_MARK = "20件に満たないため"

# --- 中央値表示 → サンプル不足表示 への変換（generate-tier2-v4-plan-a.py の sufficient=False 分岐と同文言） ---
YEN = r"¥[\d,]+"
YEN_ESC = r"\\u00a5[\d,]+"  # JSON-LD 内は json.dumps(ensure_ascii) で ¥ が \u00a5 になっている
LABEL_INSUFF = "現在集計中"
LABEL_INSUFF_ESC = json.dumps(LABEL_INSUFF)[1:-1]  # \u73fe\u5728\u96c6\u8a08\u4e2d
RE_S_TITLE = re.compile(r"｜市場相場\(Yahoo中央値\)" + YEN + r"・業者比較\"")
RE_S_DESC = re.compile(r"売却するなら？市場相場 " + YEN + r"（Yahoo Auctions 過去180日中央値）、(.+?地方の地元業者と4業者参考リンクを掲載。)\"")
RE_S_FAQ = re.compile(r"(\\u306f )" + YEN_ESC + r"(\\uff08Yahoo Auctions )")
RE_S_MEDIAN = re.compile(
    r"(<strong>)" + YEN + r"(</strong>です（)" + YEN + r"（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=\d+、取得日 " + DATE + r"）"
)
RE_S_LIST = re.compile(r"(</strong>: )" + YEN + r"（" + YEN + r"（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=\d+、取得日 " + DATE + r"）")
RE_S_BASIS = re.compile(r"(市場相場（Yahoo中央値 )" + YEN + r"）")


def insuff_sentence(date: str, n: int) -> str:
    return f"現在、過去180日の落札データが20件に満たないため市場相場の中央値は集計できていません（取得日 {date}、サンプル数 n={n}）"


def convert_sufficient_to_insufficient(src: str, date: str, n: int) -> str:
    s = RE_S_TITLE.sub("｜業者比較・買取査定ガイド\"", src)
    s = RE_S_DESC.sub(lambda m: "売却するなら？" + m.group(1) + "市場相場は現在データ蓄積中で、確定額は各業者の最新査定でご確認ください。\"", s)
    s = RE_S_FAQ.sub(lambda m: m.group(1) + LABEL_INSUFF_ESC + m.group(2), s)
    s = RE_S_MEDIAN.sub(lambda m: m.group(1) + LABEL_INSUFF + m.group(2) + insuff_sentence(date, n), s)
    s = RE_S_LIST.sub(lambda m: m.group(1) + LABEL_INSUFF + "（" + insuff_sentence(date, n), s)
    s = RE_S_BASIS.sub(lambda m: m.group(1) + LABEL_INSUFF + "）", s)
    return s


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slugs", default="", help="カンマ区切りで対象 slug を限定")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--out-slugs", default="", help="変更があった slug の一覧を書き出すファイル")
    args = ap.parse_args()

    medians = json.loads(MEDIANS.read_text(encoding="utf-8"))
    with BRANDS_CSV.open(encoding="utf-8") as f:
        csv_slugs = {r["slug"] for r in csv.DictReader(f)}

    targets = {s: r for s, r in medians.items() if r.get("insufficient") and s in csv_slugs}
    if args.slugs:
        want = {s.strip() for s in args.slugs.split(",") if s.strip()}
        missing = want - set(targets)
        if missing:
            print(f"⚠️ insufficient ではない／medians に無い slug を指定: {sorted(missing)}（スキップ）")
        targets = {s: r for s, r in targets.items() if s in want}

    scanned = changed = skipped = converted = 0
    changed_slugs: list[str] = []
    for slug in sorted(targets):
        r = targets[slug]
        date = r.get("fetched_at")
        n = r.get("filtered_n", 0)
        if not date:
            print(f"⚠️ {slug}: fetched_at 無し、スキップ")
            continue
        pages = sorted(TIER2.glob(f"*/{slug}-kaitori/page.tsx"))
        slug_changed = 0
        for p in pages:
            scanned += 1
            src = p.read_text(encoding="utf-8")
            if INSUFF_MARK not in src:
                # 中央値表示 → サンプル不足表示へ変換（旧中央値を残さない）
                old_yen = set(re.findall(r"<strong>(" + YEN + r")</strong>です（", src))
                conv = convert_sufficient_to_insufficient(src, date, n)
                leftover = [y for y in old_yen if y in conv or json.dumps(y)[1:-1] in conv]
                if INSUFF_MARK not in conv or leftover:
                    skipped += 1
                    print(f"⚠️ {p.relative_to(ROOT)}: 中央値表示→不足表示の変換に失敗（残存: {leftover}）→ 触らない")
                    continue
                converted += 1
                src = conv
            new = RE_INSUFF.sub(f"（取得日 {date}、サンプル数 n={n}）", src)
            new = RE_UPDATED.sub(f"最終更新: {date}", new)
            new = RE_DATEMOD.sub(lambda m: m.group(1) + date, new)
            new = RE_FOOT.sub(f"（取得日 {date}）です", new)
            if new != src:
                changed += 1
                slug_changed += 1
                if not args.dry_run:
                    p.write_text(new, encoding="utf-8")
        if slug_changed:
            changed_slugs.append(slug)
        print(f"  {slug}: fetched_at={date} n={n} pages={len(pages)} changed={slug_changed}")

    print(f"✓ patch-tier2-yahoo-freshness: 対象銘柄={len(targets)} 走査={scanned} 変更={changed}（うち中央値→不足に変換={converted}） 変換失敗={skipped}{' [dry-run]' if args.dry_run else ''}")
    if args.out_slugs:
        Path(args.out_slugs).write_text("\n".join(changed_slugs) + ("\n" if changed_slugs else ""), encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
