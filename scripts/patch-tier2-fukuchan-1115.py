#!/usr/bin/env python3
"""tier2 リーフの地元業者表 福ちゃん行を公式（2026-11-15 確認）に合わせる。冪等。

福ちゃん行（山梨・長野・岐阜・三重・滋賀）
   fuku-chan.jp トップ・/liquor/・/site-info/company.php を 11/15 curl:
   運営=株式会社REGATE。店舗一覧11店（札幌北20条・さいたま白岡・千葉祐光・東京八王子・静岡西脇・名古屋高針・
   名古屋緑滝ノ水・京都伏見・大阪豊中・神戸長田・広島出汐）・会社概要の事業所14拠点（大阪・札幌・仙台・さいたま・
   千葉・八王子・杉並・横浜・静岡・名古屋・神戸・京都・広島・福岡）に5県は無い（11/14 と同じ）。
   → 旧「山梨県甲府市」「長野県長野市」「岐阜県岐阜市」「三重県津市」「滋賀県大津市」は所在地として誤り。
     旧「店頭」（長野・岐阜）も県内に店が無いので誤り。「全国大手」は公式の表現に無い → 11/14 と同じ形に。
   出張の対応エリアの文言は A/B 判断待ちのため、この行には書かない。
"""
import glob

FUKU = {
    "yamanashi": ("山梨", ("福ちゃん 甲府", "山梨県甲府市", "出張・宅配", "全国大手")),
    "nagano": ("長野", ("福ちゃん 長野", "長野県長野市", "出張・宅配・店頭", "全国大手")),
    "gifu": ("岐阜", ("福ちゃん 岐阜", "岐阜県岐阜市", "出張・宅配・店頭", "全国大手")),
    "mie": ("三重", ("福ちゃん 津", "三重県津市", "出張・宅配", "全国大手")),
    "shiga": ("滋賀", ("福ちゃん 大津", "滋賀県大津市", "出張・宅配", "全国大手")),
}

BUYSELL = {}


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


jobs = []
for slug, (ja, old) in FUKU.items():
    new = ("福ちゃん",
           f"{ja}県内に店舗・事業所なし",
           "出張・宅配",
           f"株式会社REGATEが運営する買取専門店。店舗一覧（11店）・会社概要の事業所（14拠点）に{ja}県はありません。お酒の買取ページに出張・宅配・店舗の3方式を記載（2026年11月15日確認）")
    jobs.append((slug, old, new))
for slug, (old, new) in BUYSELL.items():
    jobs.append((slug, old, new))

p = "data/prefectures.py"
ps = open(p, encoding="utf-8").read()
for slug, old, new in jobs:
    files = sorted(glob.glob(f"app/tier2/{slug}/*/page.tsx"))
    n = 0
    for f in files:
        s = open(f, encoding="utf-8").read()
        if row(old) in s:
            open(f, "w", encoding="utf-8").write(s.replace(row(old), row(new)))
            n += 1
    m = 0
    if py(old) in ps:
        ps = ps.replace(py(old), py(new))
        m = 1
    left = sum(row(old) in open(f, encoding="utf-8").read() for f in files)
    print(f"{slug} {old[0]}: app {n}/{len(files)} / prefectures.py {m} / 残り {left}")
open(p, "w", encoding="utf-8").write(ps)
