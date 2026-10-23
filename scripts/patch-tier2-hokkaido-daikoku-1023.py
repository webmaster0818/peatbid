#!/usr/bin/env python3
"""tier2 北海道リーフの地元業者表「大黒屋 質札幌店」行を公式（shichi.e-daikoku.com/shop/sapporo/ ・2026-10-23確認）に合わせる。冪等。
公式: 北海道札幌市中央区北一条西3-3 札幌中央ビル1F・2F／大通駅7番出口・地下鉄さっぽろ駅11番出口 徒歩4分／10:00～19:00 年中無休(年末年始除く)／
取扱サービス=質預かり・ブランド買取・チケット買取/販売（メール査定・LINE査定あり）。「お酒買取や金券売買まで出来る」と記載。
出張買取: 質店舗一覧の絞り込み「出張買取 (3)」は水戸50号バイパス店・栃木買取センター・静岡買取センターのみ＝札幌店は出張なし（旧「店頭・出張」は誤り）。
「質屋系列で即現金化」: 札幌店は質屋そのもの（系列ではない）。即日現金は質預かりの説明のみ→公式の記載に置換。
app の page.tsx・data/prefectures.py（v4/full が読む）・旧 generate-tier2-samples-v2.py を同時に置換。"""
import glob

OLD_T = ("大黒屋 質札幌店", "札幌駅/大通駅徒歩4分", "店頭・出張", "質屋系列で即現金化")
NEW_T = ("大黒屋 質札幌店",
         "札幌市中央区北一条西3-3（地下鉄さっぽろ駅・大通駅 徒歩4分）",
         "店頭",
         "質屋（質預かり・買取）。店舗ページに「お酒買取」対応と記載。出張買取は札幌店の対応サービスに無し。10:00〜19:00・年中無休（年末年始除く）（2026年10月23日確認）")


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


n = 0
for f in sorted(glob.glob("app/tier2/hokkaido/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    if row(OLD_T) in s:
        open(f, "w", encoding="utf-8").write(s.replace(row(OLD_T), row(NEW_T))); n += 1
print("pages changed", n)
for f in ("data/prefectures.py", "scripts/generate-tier2-samples-v2.py"):
    s = open(f, encoding="utf-8").read()
    c = s.count(py(OLD_T))
    if c:
        open(f, "w", encoding="utf-8").write(s.replace(py(OLD_T), py(NEW_T)))
    print(f, "changed", c)
