#!/usr/bin/env python3
"""tier2 鹿児島リーフの地元業者表「福ちゃん 鹿児島」行を公式（2026-11-07 確認）に合わせる。冪等。

福ちゃん（fuku-chan.jp /liquor/・/site-info/company.php を 11/7 curl）:
  運営=株式会社REGATE。店舗一覧11店・会社概要の事業所14拠点に鹿児島県は無い（九州は福岡センターのみ）。
  → 旧「鹿児島県鹿児島市」は所在地として誤り。「全国大手」は公式の表現に無い → 佐賀 11/3 と同じ形に。
  出張の対応エリアの文言は他県を含め A/B 判断待ちのため、この行には書かない。
同じ表のバイセル行（鹿児島県全域／出張・宅配）は /area/liquor-kagoshima/ の「鹿児島県全域の各市町村にて対応可能」と一致＝変更なし。
県内の天文館金生通り店は、店舗ページにお酒の買取実績がなく（全店共通の品目一覧と酒類の年齢条件のみ）、11/7 の県お酒ページにも店頭のお酒実績がないため、方式に店頭は足さない
（「東証上場大手」は A/B 判断待ちのため据え置き）。
"""
import glob

OLD = ("福ちゃん 鹿児島", "鹿児島県鹿児島市", "出張・宅配", "全国大手")
NEW = ("福ちゃん",
       "鹿児島県内に店舗・事業所なし",
       "出張・宅配",
       "株式会社REGATEが運営する買取専門店。店舗一覧（11店）・会社概要の事業所（14拠点）に鹿児島県はありません。お酒の買取ページに出張・宅配・店舗の3方式を記載（2026年11月7日確認）")


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


files = sorted(glob.glob("app/tier2/kagoshima/*/page.tsx"))
n = 0
for f in files:
    s = open(f, encoding="utf-8").read()
    if row(OLD) in s:
        open(f, "w", encoding="utf-8").write(s.replace(row(OLD), row(NEW))); n += 1
p = "data/prefectures.py"
s = open(p, encoding="utf-8").read()
m = 0
if py(OLD) in s:
    open(p, "w", encoding="utf-8").write(s.replace(py(OLD), py(NEW))); m = 1
left = sum(row(OLD) in open(f, encoding="utf-8").read() for f in files)
print(f"app {n} / prefectures.py {m} / 残り {left}")
