#!/usr/bin/env python3
"""tier2 長崎・熊本・宮崎リーフの地元業者表「福ちゃん <県>」行を公式（2026-11-11 確認）に合わせる。冪等。

福ちゃん（fuku-chan.jp トップ・/liquor/・/site-info/company.php を 11/11 curl）:
  運営=株式会社REGATE。店舗一覧11店・会社概要の事業所14拠点に長崎県・熊本県・宮崎県は無い（九州は福岡センターのみ）。
  → 旧「長崎県長崎市」「熊本県熊本市」「宮崎県宮崎市」は所在地として誤り。「全国大手」は公式の表現に無い → 鹿児島 11/7 と同じ形に。
  /liquor/ に「買取方法は3種類」＝出張買取・宅配買取・店舗買取。
  出張の対応エリアの文言は A/B 判断待ちのため、この行には書かない
  （参考: fuku-chan.info/liquor/area/{nagasaki,kumamoto,miyazaki}/ は各「県全域がお酒買取対象エリア」）。
同じ表のバイセル行（県全域／出張・宅配）は /area/liquor-<県>/ の「県全域の各市町村にて出張料無料で対応可能」と一致＝変更なし
（「東証上場大手」は A/B 判断待ちのため据え置き）。
"""
import glob

PREFS = {
    "nagasaki": ("長崎", "長崎県長崎市", "宅配・出張"),
    "kumamoto": ("熊本", "熊本県熊本市", "出張・宅配"),
    "miyazaki": ("宮崎", "宮崎県宮崎市", "宅配・出張"),
}


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


p = "data/prefectures.py"
ps = open(p, encoding="utf-8").read()
for slug, (ja, city, how) in PREFS.items():
    OLD = (f"福ちゃん {ja}", city, how, "全国大手")
    NEW = ("福ちゃん",
           f"{ja}県内に店舗・事業所なし",
           "出張・宅配",
           f"株式会社REGATEが運営する買取専門店。店舗一覧（11店）・会社概要の事業所（14拠点）に{ja}県はありません。お酒の買取ページに出張・宅配・店舗の3方式を記載（2026年11月11日確認）")
    files = sorted(glob.glob(f"app/tier2/{slug}/*/page.tsx"))
    n = 0
    for f in files:
        s = open(f, encoding="utf-8").read()
        if row(OLD) in s:
            open(f, "w", encoding="utf-8").write(s.replace(row(OLD), row(NEW))); n += 1
    m = 0
    if py(OLD) in ps:
        ps = ps.replace(py(OLD), py(NEW)); m = 1
    left = sum(row(OLD) in open(f, encoding="utf-8").read() for f in files)
    print(f"{slug}: app {n} / prefectures.py {m} / 残り {left}")
open(p, "w", encoding="utf-8").write(ps)
