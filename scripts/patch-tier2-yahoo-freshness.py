#!/usr/bin/env python3
"""
tier2 リーフ（app/tier2/{pref}/{slug}-kaitori/page.tsx）の「中央値」「取得日」「サンプル数 n」「最終更新」「dateModified」を
data/brands.csv（＝記事 /articles/{slug}-kaitori/ が表示している値と同じ出典）の最新値に差し替える。
全銘柄が対象。何度流しても同じ結果（冪等）。

なぜ要るか（2026-10-07 / 2026-10-08）:
  週次 cron（weekly-yahoo-update.sh）は brand-kaitori / angle / ハブ記事だけを再生成し、tier2 リーフは
  一切再生成しない（rsync も --exclude tier2）。tier2 リーフは 8/4 の全再生成（JOYLAB撤去）時点の
  取得日 2026-08-03・中央値がハードコードされたまま本番に残っていた。
  ⚠️ tier2 の全再生成（generate-tier2-full.py / v4-plan-a）は price-history JSON の型不一致で
  ビルドが落ちるため禁止（CLAUDE.md 2026-10-04 参照）。そのため既存ページへの文字列差し替えで対応する。

出典: data/brands.csv の yahoo_median_jpy_180d / yahoo_sample_n / yahoo_fetched_at。
  記事側（generate-brand-pages-v3.py）も同じ列を読むので、tier2 と記事の表示値が必ず一致する。
  十分 = 中央値あり かつ n>=20（生成器 generate-tier2-v4-plan-a.py と同じ判定）。
  bowmore-blackbowmore は fetch 側で中央値を空にしている（意図的な抑止）ので自動的に「集計中」のまま。

4 ケース（ページの現状 × 今回のデータ）:
  (1) 十分 → 十分: title / description / FAQ JSON-LD / 本文2箇所 / 査定根拠 の中央値と n・取得日を差し替え
  (2) 不足 → 十分: 生成器の sufficient=True 分岐と同じ文言に変換して中央値を差し込む（例: ichirosu-card 8/3 n=12 → 10/5 n=20）
  (3) 十分 → 不足: 生成器の sufficient=False 分岐と同じ文言に変換（例: macallan-fine-rare 8/3 n=20 → 10/5 n=16）
  (4) 不足 → 不足: 取得日・n のみ差し替え
  共通: 最終更新 / dateModified / 末尾注記の取得日。
  書き込み前に検証（中央値の出現回数＝生成器どおり、旧中央値・旧日付の残存ゼロ）し、1つでも外れたページは書かずに WARN。

使い方:
  python3 scripts/patch-tier2-yahoo-freshness.py                # 全銘柄
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
BRANDS_CSV = ROOT / "data" / "brands.csv"

MIN_SAMPLE = 20

DATE = r"\d{4}-\d{2}-\d{2}"
YEN = r"¥[\d,]+"
YEN_ESC = r"\\u00a5[\d,]+"  # JSON-LD 内は json.dumps(ensure_ascii) で ¥ が \u00a5 になっている
INSUFF_MARK = "20件に満たないため"
LABEL_INSUFF = "現在集計中"
LABEL_INSUFF_ESC = json.dumps(LABEL_INSUFF)[1:-1]  # \u73fe\u5728\u96c6\u8a08\u4e2d

# 生成器（generate-tier2-v4-plan-a.py）の文言。十分なら 1 ページに ¥ が 7 回（title1・desc1・本文2・一覧2・根拠1）＋ JSON-LD 2 回
EXPECTED_YEN_PLAIN = 7
EXPECTED_YEN_ESC = 2

# 共通（日付・n）
RE_SLOT = re.compile(r'(?:取得日 |最終更新: |dateModified\\": \\")(' + DATE + r")")  # 差し替え対象の日付スロット
RE_UPDATED = re.compile(r"最終更新: " + DATE)
RE_DATEMOD = re.compile(r'(dateModified\\": \\")' + DATE)
RE_FOOT = re.compile(r"（取得日 " + DATE + r"）です")
RE_INSUFF = re.compile(r"（取得日 " + DATE + r"、サンプル数 n=\d+）")

# 十分表示のまま値を差し替える
RE_S_TITLE = re.compile(r"｜市場相場\(Yahoo中央値\)" + YEN + r"・業者比較\"")
RE_S_DESC = re.compile(r"市場相場 " + YEN + r"（Yahoo Auctions 過去180日中央値）")
RE_S_FAQ = re.compile(r"(\\u306f )" + YEN_ESC + r"(\\uff08Yahoo Auctions )")
RE_S_MEDIAN = re.compile(
    r"(<strong>)" + YEN + r"(</strong>です（)" + YEN + r"（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=\d+、取得日 " + DATE + r"）"
)
RE_S_LIST = re.compile(r"(</strong>: )" + YEN + r"（" + YEN + r"（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=\d+、取得日 " + DATE + r"）")
RE_S_BASIS = re.compile(r"(市場相場（Yahoo中央値 )" + YEN + r"）")

# 十分 → 不足 への変換（sufficient=False 分岐と同文言）
RE_S2I_DESC = re.compile(r"売却するなら？市場相場 " + YEN + r"（Yahoo Auctions 過去180日中央値）、(.+?地方の地元業者と[34]業者参考リンクを掲載。)\"")

# 不足 → 十分 への変換（sufficient=True 分岐と同文言）
INSUFF_SENT = r"現在、過去180日の落札データが20件に満たないため市場相場の中央値は集計できていません（取得日 " + DATE + r"、サンプル数 n=\d+）"
RE_I_TITLE = re.compile(r"｜業者比較・買取査定ガイド\"")
RE_I_DESC = re.compile(r"売却するなら？(.+?地方の地元業者と[34]業者参考リンクを掲載。)市場相場は現在データ蓄積中で、確定額は各業者の最新査定でご確認ください。\"")
RE_I_FAQ = re.compile(r"(\\u306f )" + re.escape(LABEL_INSUFF_ESC) + r"(\\uff08Yahoo Auctions )")
RE_I_MEDIAN = re.compile(r"(<strong>)" + LABEL_INSUFF + r"(</strong>です（)" + INSUFF_SENT)
RE_I_LIST = re.compile(r"(</strong>: )" + LABEL_INSUFF + r"（" + INSUFF_SENT)
RE_I_BASIS = re.compile(r"(市場相場（Yahoo中央値 )" + LABEL_INSUFF + r"）")


def fmt(n: int) -> str:
    return f"¥{n:,}"


def fmt_esc(n: int) -> str:
    return json.dumps(fmt(n))[1:-1]  # \u00a521,060


def median_sentence(median: int, n: int, date: str) -> str:
    return f"{fmt(median)}（Yahoo Auctions 過去180日の落札中央値、サンプル数 n={n}、取得日 {date}）"


def insuff_sentence(date: str, n: int) -> str:
    return f"現在、過去180日の落札データが20件に満たないため市場相場の中央値は集計できていません（取得日 {date}、サンプル数 n={n}）"


def apply_common(s: str, date: str) -> str:
    s = RE_UPDATED.sub(f"最終更新: {date}", s)
    s = RE_DATEMOD.sub(lambda m: m.group(1) + date, s)
    s = RE_FOOT.sub(f"（取得日 {date}）です", s)
    return s


def update_sufficient(s: str, median: int, n: int, date: str) -> str:
    """(1) 十分 → 十分"""
    s = RE_S_TITLE.sub(f"｜市場相場(Yahoo中央値){fmt(median)}・業者比較\"", s)
    s = RE_S_DESC.sub(f"市場相場 {fmt(median)}（Yahoo Auctions 過去180日中央値）", s)
    s = RE_S_FAQ.sub(lambda m: m.group(1) + fmt_esc(median) + m.group(2), s)
    s = RE_S_MEDIAN.sub(lambda m: m.group(1) + fmt(median) + m.group(2) + median_sentence(median, n, date), s)
    s = RE_S_LIST.sub(lambda m: m.group(1) + fmt(median) + "（" + median_sentence(median, n, date), s)
    s = RE_S_BASIS.sub(lambda m: m.group(1) + fmt(median) + "）", s)
    return s


def convert_insufficient_to_sufficient(s: str, median: int, n: int, date: str) -> str:
    """(2) 不足 → 十分"""
    s = RE_I_TITLE.sub(f"｜市場相場(Yahoo中央値){fmt(median)}・業者比較\"", s)
    s = RE_I_DESC.sub(lambda m: f"売却するなら？市場相場 {fmt(median)}（Yahoo Auctions 過去180日中央値）、" + m.group(1) + "\"", s)
    s = RE_I_FAQ.sub(lambda m: m.group(1) + fmt_esc(median) + m.group(2), s)
    s = RE_I_MEDIAN.sub(lambda m: m.group(1) + fmt(median) + m.group(2) + median_sentence(median, n, date), s)
    s = RE_I_LIST.sub(lambda m: m.group(1) + fmt(median) + "（" + median_sentence(median, n, date), s)
    s = RE_I_BASIS.sub(lambda m: m.group(1) + fmt(median) + "）", s)
    return s


def convert_sufficient_to_insufficient(s: str, date: str, n: int) -> str:
    """(3) 十分 → 不足"""
    s = RE_S_TITLE.sub("｜業者比較・買取査定ガイド\"", s)
    s = RE_S2I_DESC.sub(lambda m: "売却するなら？" + m.group(1) + "市場相場は現在データ蓄積中で、確定額は各業者の最新査定でご確認ください。\"", s)
    s = RE_S_FAQ.sub(lambda m: m.group(1) + LABEL_INSUFF_ESC + m.group(2), s)
    s = RE_S_MEDIAN.sub(lambda m: m.group(1) + LABEL_INSUFF + m.group(2) + insuff_sentence(date, n), s)
    s = RE_S_LIST.sub(lambda m: m.group(1) + LABEL_INSUFF + "（" + insuff_sentence(date, n), s)
    s = RE_S_BASIS.sub(lambda m: m.group(1) + LABEL_INSUFF + "）", s)
    return s


def update_insufficient(s: str, n: int, date: str) -> str:
    """(4) 不足 → 不足"""
    return RE_INSUFF.sub(f"（取得日 {date}、サンプル数 n={n}）", s)


def verify(s: str, sufficient: bool, median, n: int, date: str) -> list[str]:
    """書き込み前の検証。問題があれば理由の一覧を返す（空なら OK）"""
    problems = []
    # 日付は「取得日 / 最終更新 / dateModified」のスロットだけ見る
    # （本文には海外オークションの落札日など Yahoo と無関係の日付が正当に入っている。例: macallan-18 の 2026-03-17）
    slot_dates = set(RE_SLOT.findall(s))
    if slot_dates != {date}:
        problems.append(f"取得日/最終更新/dateModified に旧日付が残存: {sorted(slot_dates - {date})}")
    plain = re.findall(YEN, s)
    esc = re.findall(YEN_ESC, s)
    if sufficient:
        want = fmt(median)
        if len(plain) != EXPECTED_YEN_PLAIN or any(y != want for y in plain):
            problems.append(f"本文の中央値が想定外: {plain}（期待 {want}×{EXPECTED_YEN_PLAIN}）")
        if len(esc) != EXPECTED_YEN_ESC or any(y != fmt_esc(median) for y in esc):
            problems.append(f"JSON-LD の中央値が想定外: {esc}（期待 {fmt_esc(median)}×{EXPECTED_YEN_ESC}）")
        if INSUFF_MARK in s or LABEL_INSUFF in s or LABEL_INSUFF_ESC in s:
            problems.append("集計中の文言が残存")
        if s.count(f"サンプル数 n={n}、取得日 {date}") != 2:
            problems.append("本文の n・取得日の出現回数が想定外")
        if "｜市場相場(Yahoo中央値)" not in s or "｜業者比較・買取査定ガイド" in s:
            problems.append("title が十分表示になっていない")
    else:
        if plain or esc:
            problems.append(f"不足表示なのに中央値が残存: {plain} {esc}")
        if s.count(INSUFF_MARK) != 2 or s.count(LABEL_INSUFF) != 3 or s.count(LABEL_INSUFF_ESC) != EXPECTED_YEN_ESC:
            problems.append("集計中の文言の出現回数が想定外")
        if s.count(f"（取得日 {date}、サンプル数 n={n}）") != 2:
            problems.append("不足表示の n・取得日の出現回数が想定外")
        if "｜業者比較・買取査定ガイド" not in s or "｜市場相場(Yahoo中央値)" in s:
            problems.append("title が不足表示になっていない")
    if f"最終更新: {date}" not in s or f'dateModified\\": \\"{date}' not in s or f"（取得日 {date}）です" not in s:
        problems.append("最終更新 / dateModified / 末尾注記のいずれかが未更新")
    return problems


def load_brands() -> dict:
    out = {}
    with BRANDS_CSV.open(encoding="utf-8") as f:
        for r in csv.DictReader(f):
            med = (r.get("yahoo_median_jpy_180d") or "").strip()
            n = (r.get("yahoo_sample_n") or "0").strip()
            out[r["slug"]] = {
                "median": int(med) if med.isdigit() and int(med) > 0 else None,
                "n": int(n) if n.isdigit() else 0,
                "date": (r.get("yahoo_fetched_at") or "").strip() or None,
            }
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slugs", default="", help="カンマ区切りで対象 slug を限定")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--out-slugs", default="", help="変更があった slug の一覧を書き出すファイル")
    args = ap.parse_args()

    brands = load_brands()
    if args.slugs:
        want = {s.strip() for s in args.slugs.split(",") if s.strip()}
        missing = want - set(brands)
        if missing:
            print(f"⚠️ brands.csv に無い slug を指定: {sorted(missing)}（スキップ）")
        brands = {s: b for s, b in brands.items() if s in want}

    scanned = changed = skipped = 0
    cases = {"suff->suff": 0, "insuff->suff": 0, "suff->insuff": 0, "insuff->insuff": 0}
    changed_slugs: list[str] = []
    for slug in sorted(brands):
        b = brands[slug]
        median, n, date = b["median"], b["n"], b["date"]
        if not date:
            print(f"⚠️ {slug}: yahoo_fetched_at 無し、スキップ")
            continue
        sufficient = median is not None and n >= MIN_SAMPLE
        pages = sorted(TIER2.glob(f"*/{slug}-kaitori/page.tsx"))
        slug_changed = 0
        for p in pages:
            scanned += 1
            src = p.read_text(encoding="utf-8")
            page_insuff = INSUFF_MARK in src
            if sufficient and not page_insuff:
                case = "suff->suff"; new = update_sufficient(src, median, n, date)
            elif sufficient and page_insuff:
                case = "insuff->suff"; new = convert_insufficient_to_sufficient(src, median, n, date)
            elif not sufficient and not page_insuff:
                case = "suff->insuff"; new = convert_sufficient_to_insufficient(src, date, n)
            else:
                case = "insuff->insuff"; new = update_insufficient(src, n, date)
            new = apply_common(new, date)
            problems = verify(new, sufficient, median, n, date)
            if problems:
                skipped += 1
                print(f"⚠️ {p.relative_to(ROOT)} [{case}]: 検証NG → 触らない: " + " / ".join(problems))
                continue
            if new != src:
                changed += 1
                slug_changed += 1
                cases[case] += 1
                if not args.dry_run:
                    p.write_text(new, encoding="utf-8")
        if slug_changed:
            changed_slugs.append(slug)
        label = fmt(median) if sufficient else "集計中"
        print(f"  {slug}: {label} n={n} 取得日={date} pages={len(pages)} changed={slug_changed}")

    print(
        f"✓ patch-tier2-yahoo-freshness: 対象銘柄={len(brands)} 走査={scanned} 変更={changed} "
        f"(十分→十分={cases['suff->suff']} 不足→十分={cases['insuff->suff']} 十分→不足={cases['suff->insuff']} 不足→不足={cases['insuff->insuff']}) "
        f"検証NG={skipped}{' [dry-run]' if args.dry_run else ''}"
    )
    if args.out_slugs:
        Path(args.out_slugs).write_text("\n".join(changed_slugs) + ("\n" if changed_slugs else ""), encoding="utf-8")
    # 検証NGはログに残すが、週次（set -e）を止めない
    return 0


if __name__ == "__main__":
    sys.exit(main())
