#!/usr/bin/env python3
"""掲載業者の記述・リンクを各社公式と照合して直す（2026-10-20・冪等）。

GSC 28日（9/22〜10/19）の表示上位3記事（hakushu-nv / yamazaki-nv / taketsuru-21）で照合。
公式で確認した値（2026-10-20）:
- 福ちゃん: 公式は fuku-chan.jp。会社概要＝株式会社REGATE（2014年5月1日設立）・「買取専門店FUKUCHAN」。
  お酒のページ https://fuku-chan.jp/liquor/ に出張・宅配・店舗の3方式と手数料無料。「大手」に当たる記載はない。
  → 相場カードのリンク先 fukuchan.co.jp は別会社（アストジャパン＝餃子店）で /oshina/sake/ は 404。
- バイセル: 相場カードのリンク先 www.buysell-japan.jp は NXDOMAIN（ドメインが無い）。
  公式のお酒（ジャパニーズウイスキー）ページは https://buysell-kaitori.com/liquor/japanese-whisky/（他の CTA と同じ）。
- 他（10/20 に一致を確認・変更なし）: バイセル＝東証グロース（7685・IR）・4,800万点以上（2015〜2025年）・
  最短即日訪問・出張/店頭/宅配・TVCM。リカスタ＝株式会社リスタ・大阪店/新宿店・1営業日以内連絡・
  送料/査定料/キャンセル料/返品送料 無料。ヒカカク！＝最大20社・完全無料・査定結果メール最短1日。

対象: components/MarketPriceCard.tsx・app/**/*.tsx・生成器 generate-*/gen-*（再生成で戻らないように）。
使い方: python3 scripts/patch-buyer-facts-1020.py [--dry-run]
"""
import glob
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY = "--dry-run" in sys.argv

FUKU_DESC = "株式会社REGATEが運営する買取専門店"

# (旧, 新)。新文字列は旧文字列を含まない＝2回目は変更0。
PAIRS = [
    ('"https://www.buysell-japan.jp/sake/"', '"https://buysell-kaitori.com/liquor/japanese-whisky/"'),
    ('"https://fukuchan.co.jp/oshina/sake/"', '"https://fuku-chan.jp/liquor/"'),
    ("総合買取の大手で、お酒", FUKU_DESC + "で、お酒"),
    ("総合買取の大手、お酒", FUKU_DESC + "、お酒"),
]


def main():
    files = glob.glob(os.path.join(ROOT, "app", "**", "*.tsx"), recursive=True)
    files += glob.glob(os.path.join(ROOT, "components", "*.tsx"))
    files += glob.glob(os.path.join(ROOT, "scripts", "generate-*.py"))
    files += glob.glob(os.path.join(ROOT, "scripts", "gen-*.py"))
    changed = total = 0
    per = {o: 0 for o, _ in PAIRS}
    for path in sorted(set(files)):
        t = open(path, encoding="utf-8").read()
        nt = t
        for old, new in PAIRS:
            c = nt.count(old)
            if c:
                nt = nt.replace(old, new)
                per[old] += c
        if nt != t:
            changed += 1
            if not DRY:
                open(path, "w", encoding="utf-8").write(nt)
            rel = os.path.relpath(path, ROOT)
            if not rel.startswith("app/"):
                print(f"  {rel}")
    for o, c in per.items():
        print(f"{c:6d}  {o}")
    print(f"{'DRY ' if DRY else ''}files changed={changed}")


if __name__ == "__main__":
    main()
