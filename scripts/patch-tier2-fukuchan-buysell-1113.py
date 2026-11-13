#!/usr/bin/env python3
"""tier2 リーフの地元業者表を公式（2026-11-13 確認）に合わせる。冪等。

1) 福ちゃん行（富山・福井・岡山・山口・香川）
   fuku-chan.jp トップ・/liquor/・/site-info/company.php を 11/13 curl:
   運営=株式会社REGATE。店舗一覧11店（札幌北20条・さいたま白岡・千葉祐光・東京八王子・静岡西脇・名古屋高針・
   名古屋緑滝ノ水・京都伏見・大阪豊中・神戸長田・広島出汐）・会社概要の事業所14拠点に5県は無い。
   → 旧「富山県富山市」「福井県福井市」「岡山県岡山市」「山口県山口市」「香川県高松市」は所在地として誤り。
     旧「店頭」（岡山・香川）も県内に店が無いので誤り。「全国大手」は公式の表現に無い → 徳島・愛媛・高知 11/12 と同じ形に。
   出張の対応エリアの文言は A/B 判断待ちのため、この行には書かない
   （参考: fuku-chan.info/liquor/area/{toyama,fukui,okayama,yamaguchi,kagawa}/ は各「県全域」）。

2) バイセル行（徳島・愛媛）に店頭を反映（和歌山ミオ店 10/31 と同じ形）
   buysell-kaitori.com /area/liquor-tokushima/・/area/liquor-ehime/ の「県の店舗案内」と店舗ページを 11/13 curl:
   徳島田宮店＝徳島県徳島市南田宮2丁目1-26（運営会社：エース環境設計株式会社）
   松山大街道店＝愛媛県松山市大街道1-5-8（運営会社：株式会社ユニケット）
   店舗ページに「酒類の買取に関しては20歳以上のお客様のみ対象」＝店頭でお酒の買取あり。
   出張はエリアページ FAQ「…徳島県全域／愛媛県全域の各市町村にて対応可能」。
   特徴欄「東証上場大手」は A/B 判断待ちのため据え置き。
"""
import glob

FUKU = {
    "toyama": ("富山", ("福ちゃん 富山", "富山県富山市", "出張・宅配", "全国大手")),
    "fukui": ("福井", ("福ちゃん 福井", "福井県福井市", "出張・宅配", "全国大手")),
    "okayama": ("岡山", ("福ちゃん 岡山", "岡山県岡山市", "出張・宅配・店頭", "全国大手")),
    "yamaguchi": ("山口", ("福ちゃん 山口", "山口県山口市", "出張・宅配", "全国大手")),
    "kagawa": ("香川", ("福ちゃん 高松", "香川県高松市", "出張・宅配・店頭", "全国大手")),
}

BUYSELL = {
    "tokushima": (("バイセル 徳島", "徳島県全域", "宅配・出張", "東証上場大手"),
                  ("バイセル 徳島田宮店", "徳島市南田宮2丁目1-26（運営会社：エース環境設計株式会社）。出張は徳島県全域", "店頭・出張・宅配", "東証上場大手")),
    "ehime": (("バイセル 愛媛", "愛媛県全域", "出張・宅配", "東証上場大手"),
              ("バイセル 松山大街道店", "松山市大街道1-5-8（運営会社：株式会社ユニケット）。出張は愛媛県全域", "店頭・出張・宅配", "東証上場大手")),
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
           f"株式会社REGATEが運営する買取専門店。店舗一覧（11店）・会社概要の事業所（14拠点）に{ja}県はありません。お酒の買取ページに出張・宅配・店舗の3方式を記載（2026年11月13日確認）")
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
