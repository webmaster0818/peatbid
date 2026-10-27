#!/usr/bin/env python3
"""tier2 宮城リーフの地元業者表から「大黒屋 質仙台店」行を削除する（10/26宣言の既定案A・回答なし→10/27実行）。冪等。

根拠（2026-10-27 再確認）: 大黒屋の質店舗一覧 shichi.e-daikoku.com/shop/ に「宮城」「仙台」の記載 0件
（同ページに北海道/札幌・愛知/名古屋は掲載＝取得は正常）、/shop/sendai/ は 404、www.e-daikoku.com の店舗ページ・トップも 0件。
10/23 の照合でも質店舗一覧に宮城県の店は無かった。公式で確認できない店は出さない側に倒す。
表の件数を数える文言（「N社」等）は宮城リーフに無い（3〜5社の相見積もり推奨・全国対応の主要3業者は別の話）＝本文の修正は不要。
app の page.tsx・data/prefectures.py（v4/full が読む）を同時に処理。旧 v2 生成器には宮城の行なし。"""
import glob

OLD = ("大黒屋 質仙台店", "仙台駅近郊", "店頭・出張", "質屋系列で即現金化")
ROW = f"<tr><td><strong>{OLD[0]}</strong></td><td>{OLD[1]}</td><td>{OLD[2]}</td><td>{OLD[3]}</td></tr>"
PY_LINE = ",\n                                 (" + ", ".join(f'"{x}"' for x in OLD) + ")"

n = 0
for f in sorted(glob.glob("app/tier2/miyagi/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    if ROW in s:
        open(f, "w", encoding="utf-8").write(s.replace(ROW, "")); n += 1
print("pages changed", n)

f = "data/prefectures.py"
s = open(f, encoding="utf-8").read()
c = s.count(PY_LINE)
if c:
    open(f, "w", encoding="utf-8").write(s.replace(PY_LINE, ""))
print(f, "changed", c)
