#!/usr/bin/env python3
"""tier2 リーフの地元業者表を公式（2026-11-14 確認）に合わせる。冪等。

1) 福ちゃん行（茨城・栃木・群馬・新潟・石川）
   fuku-chan.jp トップ・/liquor/・/site-info/company.php を 11/14 curl:
   運営=株式会社REGATE。店舗一覧11店（札幌北20条・さいたま白岡・千葉祐光・東京八王子・静岡西脇・名古屋高針・
   名古屋緑滝ノ水・京都伏見・大阪豊中・神戸長田・広島出汐）・会社概要の事業所14拠点に5県は無い（11/13 と同じ）。
   → 旧「茨城県水戸市」「栃木県宇都宮市」「群馬県高崎市」「新潟県新潟市」「石川県金沢市」は所在地として誤り。
     旧「店頭」（5県とも）も県内に店が無いので誤り。「全国大手」は公式の表現に無い → 11/13 と同じ形に。
   出張の対応エリアの文言は A/B 判断待ちのため、この行には書かない。

2) バイセル行（香川・熊本）に店頭を反映（徳島・愛媛 11/13 と同じ形）
   buysell-kaitori.com /area/liquor-kagawa/・/area/liquor-kumamoto/ の「県の店舗案内」と店舗ページを 11/14 curl:
   イオンモール高松店＝香川県高松市香西本町1-1 イオンモール高松 3F（/store/aeon-takamatsu/）
   パワーシティ屋島店＝香川県高松市屋島西町1912-1 マルナカパワーシティ屋島店生活館 1F（/store/powercity-yashima/）
   熊本ゆめタウンはません店＝熊本県熊本市南区田井島1丁目2-1 ゆめタウンはません 3F（/store/kumamoto-youmetownhamasen/）
   3店とも店舗ページに「酒類の買取に関しては20歳以上のお客様のみ対象」・運営会社：株式会社BuySell Technologies。
   出張はエリアページ FAQ「…香川県全域／熊本県全域の各市町村にて対応可能」。
   ⚠️香川のエリアページ FAQ には「現在、香川県内にバイセルの店舗はございません」という旧い文も残る
     （同じページの店舗案内と店舗ページは2店を掲載）→ 店舗ページを正とした。
   特徴欄「東証上場大手」は A/B 判断待ちのため据え置き。
"""
import glob

FUKU = {
    "ibaraki": ("茨城", ("福ちゃん 水戸", "茨城県水戸市", "出張・宅配・店頭", "全国大手")),
    "tochigi": ("栃木", ("福ちゃん 宇都宮", "栃木県宇都宮市", "出張・宅配・店頭", "全国大手")),
    "gunma": ("群馬", ("福ちゃん 高崎", "群馬県高崎市", "出張・宅配・店頭", "全国大手")),
    "niigata": ("新潟", ("福ちゃん 新潟", "新潟県新潟市", "出張・宅配・店頭", "全国大手")),
    "ishikawa": ("石川", ("福ちゃん 金沢", "石川県金沢市", "出張・宅配・店頭", "全国大手")),
}

BUYSELL = {
    "kagawa": (("バイセル 香川", "香川県全域", "出張・宅配", "東証上場大手"),
               ("バイセル イオンモール高松店・パワーシティ屋島店",
                "高松市香西本町1-1 イオンモール高松 3F／高松市屋島西町1912-1 マルナカパワーシティ屋島店生活館 1F。出張は香川県全域",
                "店頭・出張・宅配", "東証上場大手")),
    "kumamoto": (("バイセル 熊本", "熊本県全域", "出張・宅配", "東証上場大手"),
                 ("バイセル 熊本ゆめタウンはません店",
                  "熊本市南区田井島1丁目2-1 ゆめタウンはません 3F。出張は熊本県全域",
                  "店頭・出張・宅配", "東証上場大手")),
}


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


jobs = []
for slug, (ja, old) in FUKU.items():
    new = ("福ちゃん",
           f"{ja}県内に店舗・事業所なし",
           "出張・宅配",
           f"株式会社REGATEが運営する買取専門店。店舗一覧（11店）・会社概要の事業所（14拠点）に{ja}県はありません。お酒の買取ページに出張・宅配・店舗の3方式を記載（2026年11月14日確認）")
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
