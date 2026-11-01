#!/usr/bin/env python3
"""tier2 和歌山リーフの地元業者表「福ちゃん 和歌山」「リサイクルマート和歌山」行を各社公式（2026-11-01確認）に合わせる。冪等。

福ちゃん（fuku-chan.jp トップ・/liquor/・/site-info/company.php）:
  運営=株式会社REGATE（大阪市東成区）。店舗一覧（11店＝札幌・さいたま・千葉・八王子・静岡・名古屋2・京都・大阪 豊中・神戸・広島）
  に和歌山県の店は無い。会社概要の事業所14拠点にも和歌山は無い（しかも「各事業所ではお品物を買取することができません」）。
  → 旧「和歌山県和歌山市」は所在地として誤り。お酒ページに出張・宅配・店舗の3方式、宅配の対象品目にお酒あり。
  出張の対応エリアの記載なし。「全国大手」は公式の表現に無い → 削除（宮城 10/26 と同じ扱い）。
リサイクルマート（www.recyclemart.jp/shop_area/wakayama/）:
  公式の店舗検索・和歌山県のページに「和歌山県には店舗がありません」。→ 公式で実在を確認できない行は削除（宮城 大黒屋 10/27 と同じ）。
表の件数を数える文言は和歌山リーフに無い（「3〜5社で相見積もり」「全国対応の主要3業者」は別の話）＝本文の修正は不要。
app の page.tsx・data/prefectures.py（v4/full が読む）を同時に処理。旧 v2 生成器には和歌山の行なし。"""
import glob

FUKU_OLD = ("福ちゃん 和歌山", "和歌山県和歌山市", "出張・宅配", "全国大手")
FUKU_NEW = ("福ちゃん",
            "和歌山県内に店舗・事業所なし",
            "出張・宅配",
            "株式会社REGATEが運営する買取専門店。店舗一覧（11店）・会社概要の事業所（14拠点）に和歌山県はありません。お酒の買取ページに出張・宅配・店舗の3方式を記載。出張の対応エリアの記載なし（2026年11月1日確認）")
RM_OLD = ("リサイクルマート和歌山", "和歌山県和歌山市", "店頭", "地元密着")


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


n_f = n_r = 0
for f in sorted(glob.glob("app/tier2/wakayama/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    o = s
    if row(FUKU_OLD) in s:
        s = s.replace(row(FUKU_OLD), row(FUKU_NEW)); n_f += 1
    if row(RM_OLD) in s:
        s = s.replace(row(RM_OLD), ""); n_r += 1
    if s != o:
        open(f, "w", encoding="utf-8").write(s)
print("fukuchan pages changed", n_f, "/ recyclemart rows removed", n_r)

f = "data/prefectures.py"
s = open(f, encoding="utf-8").read()
o = s
c1 = s.count(py(FUKU_OLD))
s = s.replace(py(FUKU_OLD), py(FUKU_NEW))
RM_LINE = ",\n                                   " + py(RM_OLD)
c2 = s.count(RM_LINE)
s = s.replace(RM_LINE, "")
if s != o:
    open(f, "w", encoding="utf-8").write(s)
print(f, "fukuchan", c1, "recyclemart", c2)
