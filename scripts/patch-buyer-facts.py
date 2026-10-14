#!/usr/bin/env python3
"""掲載業者の事実を各社公式と突き合わせて直す（2026-10-14・冪等）。

公式で確認した値（2026-10-14）:
- バイセル（buysell-kaitori.com/liquor/）: 東証グロース上場 / 累計買取4,800万点以上（2015〜2025年の合計）/
  出張は「離島を除く日本全国」/ 開封品は「買取できないことがほとんど」/ 出張・店頭・宅配
  旧CTA先 www.buysell-onlineshop.jp は NXDOMAIN（ドメインが存在しない）
- リカスタ（licasta.com）: 宅配・出張・店頭（大阪店・新宿店）/ 「未開封品のみの買取対象」/
  「即日現金化ももちろん可能」/ 送料・査定料・キャンセル料・返送料 無料
- ヒカカク！（hikakaku.com/lp/）: 最大20社一括査定・完全無料（変更なし）

対象: app/**/page.tsx（tier2 含む）と現行の生成器（再生成で戻らないように）。
使い方: python3 scripts/patch-buyer-facts.py [--dry-run]
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY = "--dry-run" in sys.argv

BUYSELL_OLD = "https://www.buysell-onlineshop.jp/"
BUYSELL_NEW = "https://buysell-kaitori.com/liquor/japanese-whisky/"

# (旧, 新) 文字列置換。どれも新文字列に旧文字列を含まない＝2回目は変更0。
PAIRS = [
    (BUYSELL_OLD, BUYSELL_NEW),
    ("年間累計買取件数430万件超の大手", "累計買取点数4,800万点以上（2015〜2025年の合計・公式）の大手"),
    ("/ 出張買取はエリア限定", "/ 出張買取は離島が対象外"),
    ("/ 即日現金化はできない（宅配のため）", "/ 店舗は大阪・新宿の2店のみ（ほかの地域は宅配か出張）"),
    ("PeatBid推奨の3社（ヒカカク・バイセル・リカスタ）は、いずれも開封済みでも査定対応可能です。",
     "PeatBid掲載の3社でも、開封済みの扱いは分かれます（各社公式サイト・2026年10月14日確認）。"),
    ("一括査定で開封済みも受付業者を絞り込み可能",
     "査定・買取は紹介先の買取店が行うため、開封済みと明記して申し込み、各店の回答で受付可否を確認"),
    ("残量9割以上を主に扱う、それ以下は要相談",
     "公式で開封済みのお酒は「買取できないことがほとんど」と案内（未開封が前提）"),
    ("宅配で開封済みも対応、ただし運送中の漏れに注意",
     "公式で「未開封品のみの買取対象」と案内"),
    ("業者によっては残量条件があるため、事前確認をおすすめします。",
     "開封済みは受付自体を断る業者もあるため、申し込み前に必ず確認してください。"),
    ("開封済み歓迎の買取業者", "開封済みに対する業者ごとの対応"),
    ("開封済みを買取してくれる業者", "開封済みに対する各社の対応"),
    # リカスタの買取方法（店頭が抜けていた）
    ('>宅配/出張<', '>宅配/出張/店頭<'),
    ('"method": "宅配/出張"', '"method": "宅配/出張/店頭"'),
    ('method: "宅配/出張",', 'method: "宅配/出張/店頭",'),
]

# tier2: 「{県}全域出張可能」→ 公式は「離島を除く日本全国」
TIER2_RE = re.compile(r"3チャネル対応。([^<。]{2,4})全域出張可能")
TIER2_SUB = r"3チャネル対応。出張は離島を除き\1全域に対応"
# 生成器側（f-string）
GEN_TIER2 = ("3チャネル対応。{p['name_ja']}全域出張可能", "3チャネル対応。出張は離島を除き{p['name_ja']}全域に対応")

GENERATORS = [
    "scripts/generate-brand-pages-v3.py",
    "scripts/generate-angle-pages-v3.py",
    "scripts/generate-tier2-v4-plan-a.py",
]


def patch_text(t, is_gen):
    n = 0
    for old, new in PAIRS:
        if is_gen:
            # 生成器の Python 文字列中では " がそのまま、\n は \\n なので単純置換で一致する
            pass
        c = t.count(old)
        if c:
            t = t.replace(old, new)
            n += c
    if is_gen:
        c = t.count(GEN_TIER2[0])
        if c:
            t = t.replace(GEN_TIER2[0], GEN_TIER2[1])
            n += c
    else:
        t, c = TIER2_RE.subn(TIER2_SUB, t)
        n += c
    return t, n


def main():
    files = []
    for root, _, fs in os.walk(os.path.join(ROOT, "app")):
        for f in fs:
            if f.endswith(".tsx"):
                files.append((os.path.join(root, f), False))
    files += [(os.path.join(ROOT, g), True) for g in GENERATORS]
    changed_files = total = 0
    for path, is_gen in files:
        t = open(path, encoding="utf-8").read()
        nt, n = patch_text(t, is_gen)
        if n:
            changed_files += 1
            total += n
            if not DRY:
                open(path, "w", encoding="utf-8").write(nt)
            if is_gen:
                print(f"GEN {os.path.relpath(path, ROOT)}: {n}")
    print(f"{'DRY ' if DRY else ''}files changed={changed_files} replacements={total}")


if __name__ == "__main__":
    main()
