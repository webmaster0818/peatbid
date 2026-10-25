#!/usr/bin/env python3
"""tier2 愛知リーフの地元業者表「福ちゃん 名古屋」「ファイブニーズ 名古屋」行を各社公式（2026-10-25確認）に合わせる。冪等。
あわせて北海道リーフの「JOYLAB 札幌店（ファイブニーズ）」から誤った「（ファイブニーズ）」を外す。

福ちゃん（fuku-chan.jp トップ・/liquor/・/site-info/company.php）:
  運営=株式会社REGATE。店舗一覧の愛知県は2店＝名古屋 高針店（名古屋市名東区牧の原1-907・西山本通三丁目バス停 徒歩4分・
  10:00〜18:00 完全予約制（不定休））／名古屋 緑滝ノ水店（名古屋市緑区万場山1丁目2207・名古屋市バス「上旭」徒歩1分・
  10:00〜18:00 年中無休（年末年始除く））。「福ちゃん 名古屋」という店名は無い。お酒ページに出張・宅配・店舗の3方式。
  「大手で中部全域カバー」＝対応エリアの記載なし（10/16 確認と同じ）→ 削除。
ファイブニーズ（sakekaitori.com /shop/nagoya/・/company/、fiveneeds.co.jp/corporate）:
  運営=株式会社ファイブニーズ（2011年7月6日設立）。店名=愛知名古屋店・名古屋市中区新栄2-2-1 イノフィスビル1F・
  地下鉄東山線 新栄町駅 徒歩3分・店舗受付 10:00〜19:00。店頭・出張・宅配の3方式（旧「出張・宅配」は店頭が抜けていた）。
  店舗ページの出張対応エリア=名古屋市16区・豊田市・岡崎市・一宮市・豊橋市・西尾市等＋岐阜・三重・富山・石川・静岡の各県。
  「10年以上の実績」＝公式の文言は「お酒買取のパイオニアとして丸10年」→ 設立年（会社概要）に置換。
北海道: JOYLAB は JOYLAB株式会社（joylab.jp 10/25 のメンテナンス告知「当社（JOYLAB株式会社）」・会社案内）で、
  株式会社ファイブニーズとは別会社。ファイブニーズは別に「北海道札幌店」（札幌市中央区北5条西25-4-18）を持つ。
  10/22 の行は JOYLAB 札幌店の内容なので、店名表記の「（ファイブニーズ）」だけを外す（行の差し替えは判断待ち）。
app の page.tsx・data/prefectures.py（v4/full が読む）・旧 generate-tier2-samples-v2.py を同時に置換。"""
import glob

ROWS = [
    ("aichi",
     ("福ちゃん 名古屋", "愛知県名古屋市", "出張・宅配・店頭", "大手で中部全域カバー"),
     ("福ちゃん 名古屋 高針店・緑滝ノ水店",
      "名古屋市名東区牧の原1-907／名古屋市緑区万場山1丁目2207",
      "出張・宅配・店頭",
      "株式会社REGATEが運営する買取専門店。お酒の買取ページに出張・宅配・店舗の3方式を記載。両店とも10:00〜18:00（高針店は完全予約制・不定休、緑滝ノ水店は年中無休・年末年始除く）。対応エリアの記載なし（2026年10月25日確認）")),
    ("aichi",
     ("ファイブニーズ 名古屋", "愛知県名古屋市", "出張・宅配", "10年以上の実績"),
     ("ファイブニーズ 愛知名古屋店",
      "名古屋市中区新栄2-2-1 イノフィスビル1F（地下鉄東山線 新栄町駅 徒歩3分）",
      "店頭・出張・宅配",
      "お酒買取専門店（株式会社ファイブニーズ・2011年設立）。店舗受付10:00〜19:00。店舗ページの出張対応エリアに名古屋市全16区・豊田市・岡崎市・一宮市・豊橋市・西尾市などと、岐阜・三重・富山・石川・静岡の各県を記載（2026年10月25日確認）")),
]
HOKKAIDO_OLD = "JOYLAB 札幌店（ファイブニーズ）"
HOKKAIDO_NEW = "JOYLAB 札幌店"


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


for pref, old, new in ROWS:
    n = 0
    for f in sorted(glob.glob(f"app/tier2/{pref}/*/page.tsx")):
        s = open(f, encoding="utf-8").read()
        if row(old) in s:
            open(f, "w", encoding="utf-8").write(s.replace(row(old), row(new))); n += 1
    print(old[0], "pages changed", n)
    for f in ("data/prefectures.py", "scripts/generate-tier2-samples-v2.py"):
        s = open(f, encoding="utf-8").read()
        c = s.count(py(old))
        if c:
            open(f, "w", encoding="utf-8").write(s.replace(py(old), py(new)))
        print(" ", f, "changed", c)

n = 0
for f in sorted(glob.glob("app/tier2/hokkaido/*/page.tsx")) + ["data/prefectures.py"]:
    s = open(f, encoding="utf-8").read()
    if HOKKAIDO_OLD in s:
        open(f, "w", encoding="utf-8").write(s.replace(HOKKAIDO_OLD, HOKKAIDO_NEW)); n += 1
print("hokkaido JOYLAB label files changed", n)
