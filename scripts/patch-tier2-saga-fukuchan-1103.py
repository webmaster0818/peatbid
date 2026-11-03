#!/usr/bin/env python3
"""tier2 佐賀リーフの地元業者表「福ちゃん 佐賀」行を公式（2026-11-03 確認）に合わせる。冪等。

福ちゃん（fuku-chan.jp トップ・/liquor/・/site-info/company.php を 11/3 curl）:
  運営=株式会社REGATE。店舗一覧11店（札幌 北20条・さいたま 白岡・千葉 祐光・東京 八王子・静岡 西脇・名古屋 高針・名古屋 緑滝ノ水・
  京都 伏見・大阪 豊中・神戸 長田・広島 出汐）に佐賀県の店は無い。会社概要の事業所14拠点にも佐賀は無い（九州は福岡センターのみ）。
  3ページとも「佐賀」の語は0件。→ 旧「佐賀県佐賀市」は所在地として誤り。「全国大手」は公式の表現に無い → 和歌山 11/1 と同じ形に。
  ※会社概要の「各事業所ではお品物を買取することができません」は 11/3 時点で HTML コメント内（非表示）＝根拠に使わない。
同じ表のバイセル行（佐賀県全域／宅配・出張）は /area/liquor-saga/ の「佐賀県全域の各市町村にて対応可能」と一致＝変更なし
（「東証上場大手」は A/B 判断待ちのため据え置き。県内店 東佐賀店（FC）は店舗ページにお酒の記載なし＝方式に店頭を足さない）。
"""
import glob

OLD = ("福ちゃん 佐賀", "佐賀県佐賀市", "宅配・出張", "全国大手")
NEW = ("福ちゃん",
       "佐賀県内に店舗・事業所なし",
       "出張・宅配",
       "株式会社REGATEが運営する買取専門店。店舗一覧（11店）・会社概要の事業所（14拠点）に佐賀県はありません。お酒の買取ページに出張・宅配・店舗の3方式を記載。出張の対応エリアの記載なし（2026年11月3日確認）")


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


n = 0
for f in sorted(glob.glob("app/tier2/saga/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    if row(OLD) in s:
        open(f, "w", encoding="utf-8").write(s.replace(row(OLD), row(NEW))); n += 1
p = "data/prefectures.py"
s = open(p, encoding="utf-8").read()
m = 0
if py(OLD) in s:
    open(p, "w", encoding="utf-8").write(s.replace(py(OLD), py(NEW))); m = 1
left = sum(row(OLD) in open(f, encoding="utf-8").read() for f in glob.glob("app/tier2/saga/*/page.tsx"))
print(f"app {n} / prefectures.py {m} / 残り {left}")
