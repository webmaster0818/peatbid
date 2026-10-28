#!/usr/bin/env python3
"""tier2 北海道リーフの地元業者表「JOYLAB 札幌店」行を「ファイブニーズ 北海道札幌店」に差し替える。冪等。
（10/27 宣言の既定案B。10/29 実行予定。wip ブランチで用意・本番未反映）

理由: joylab.jp は 10/22〜10/28 も 503（メンテナンス中）で、JOYLAB 札幌店の内容を再確認できない。
ファイブニーズ（sakekaitori.com /shop/sapporo/・/shop/ 2026-10-28確認）:
  運営=株式会社ファイブニーズ。店名=北海道札幌店・〒060-0042 札幌市中央区大通西15丁目2-1 ラスコム15ビル 1-A。
  最寄り=札幌市電「西15丁目停留場」徒歩4分・地下鉄東西線「西18丁目駅」徒歩5分・「西11丁目駅」徒歩8分。
  店舗受付 10:00〜19:00・電話受付 9:45〜19:00・定休日 木曜日・日曜日（店舗情報・店舗一覧・FAQ の3か所で一致）。
  お知らせ「2025年11月8日移転リニューアルオープン」（10/25 記録の北5条西25-4-18 は旧住所）。
  買取方法=店頭・出張・宅配。出張対応エリア=札幌市10区・函館市・小樽市・旭川市・釧路市・帯広市ほか道内各市。
app の page.tsx・data/prefectures.py（v4/full が読む）を同時に置換。"""
import glob

OLD = ("JOYLAB 札幌店",
       "札幌市中央区（市電 中島公園通駅・行啓通駅 徒歩約4分）",
       "店頭・出張・宅配",
       "札幌店は北海道内全域に対応。JOYLAB は全国10店（2026年10月22日確認）")
NEW = ("ファイブニーズ 北海道札幌店",
       "札幌市中央区大通西15丁目2-1 ラスコム15ビル 1-A（市電 西15丁目停留場 徒歩4分・地下鉄東西線 西18丁目駅 徒歩5分）",
       "店頭・出張・宅配",
       "お酒買取専門店（株式会社ファイブニーズ）。2025年11月8日に移転リニューアル。店舗受付10:00〜19:00・定休日 木曜日・日曜日。店舗ページの出張対応エリアに札幌市全10区と函館市・小樽市・旭川市・釧路市・帯広市など道内各市を記載（2026年10月28日確認）")


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


n = 0
for f in sorted(glob.glob("app/tier2/hokkaido/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    if row(OLD) in s:
        open(f, "w", encoding="utf-8").write(s.replace(row(OLD), row(NEW))); n += 1
print("hokkaido pages changed", n)

f = "data/prefectures.py"
s = open(f, encoding="utf-8").read()
c = s.count(py(OLD))
if c:
    open(f, "w", encoding="utf-8").write(s.replace(py(OLD), py(NEW)))
print(f, "changed", c)
