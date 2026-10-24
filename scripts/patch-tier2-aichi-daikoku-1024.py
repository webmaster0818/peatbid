#!/usr/bin/env python3
"""tier2 愛知リーフの地元業者表「大黒屋 名古屋」行を公式（shichi.e-daikoku.com・2026-10-24確認）に合わせる。冪等。
公式の質店舗一覧: 愛知県は3店＝大黒屋ブランド館 名古屋大須店（中区大須3-26-40 高田ビル）／大黒屋 質名古屋栄買取センター（中区栄3-7-9 新鏡栄ビル2F）／
大黒屋 質豊田248店（豊田市）。「大黒屋 名古屋」という店名は無い。
名古屋市内2店のうち、店舗ページに「お酒(買取のみ)」と書いてあるのは名古屋大須店だけ（栄の取扱商品・本文にお酒の記載なし）→ 名古屋大須店の行にする。
名古屋大須店（/shop/nagoya/）: 上前津駅9番出口 徒歩4分・大須観音駅2番出口 徒歩5分／10:30～19:30 年中無休(年末年始除く)／
取扱=質預かり・ブランド買取・チケット買取・外貨両替。
出張買取: 質店舗一覧の絞り込み「出張買取 (3)」は水戸50号バイパス店・栃木買取センター・静岡買取センターのみ＝名古屋の店は出張なし（旧「店頭・出張」は誤り）。
「質屋系列で安心、即現金化」: 質屋そのもの（系列ではない）→ 公式の記載に置換。
app の page.tsx・data/prefectures.py（v4/full が読む）・旧 generate-tier2-samples-v2.py を同時に置換。"""
import glob

OLD_T = ("大黒屋 名古屋", "愛知県名古屋市", "店頭・出張", "質屋系列で安心、即現金化")
NEW_T = ("大黒屋ブランド館 名古屋大須店",
         "名古屋市中区大須3-26-40（上前津駅 徒歩4分・大須観音駅 徒歩5分）",
         "店頭",
         "質屋（質預かり・買取）。店舗ページに「お酒(買取のみ)」と記載。出張買取は対応サービスに無し。10:30〜19:30・年中無休（年末年始除く）。名古屋市内には質名古屋栄買取センター（中区栄）もあり（2026年10月24日確認）")


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


n = 0
for f in sorted(glob.glob("app/tier2/aichi/*/page.tsx")):
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
