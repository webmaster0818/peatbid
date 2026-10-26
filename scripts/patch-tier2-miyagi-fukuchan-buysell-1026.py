#!/usr/bin/env python3
"""tier2 宮城リーフの地元業者表「バイセル 仙台」「福ちゃん 仙台」行を各社公式（2026-10-26確認）に合わせる。冪等。

バイセル（buysell-kaitori.com トップ・/store/sendai/・/store/themall-sendai/・/store/aeon-sendaioroshimachi/・/liquor/）:
  運営=株式会社BuySell Technologies（公式に「東証上場企業が運営」）。「バイセル 仙台」という店名は無い。
  宮城県の店舗は3店（いずれも仙台市）＝仙台定禅寺通り店（青葉区国分町3丁目1-2・勾当台公園駅 徒歩1分）／
  ザ・モール仙台長町店（太白区長町7丁目20-3 ザ・モール仙台長町 Part2 2階）／イオンスタイル仙台卸町店（若林区卸町1-1-1 1F）。
  店舗ページに「酒類の買取に関しては20歳以上のお客様のみ」＝店頭でお酒の買取あり。お酒ページに出張・宅配・店頭の3方式、
  出張は「離島を除く日本全国どこでも」。旧「出張・宅配」は店頭が抜けていた。
  営業時間は仙台定禅寺通り店の店舗概要（10:00〜19:00）と FAQ（10:30〜19:00）が食い違うため書かない。
福ちゃん（fuku-chan.jp トップ・/liquor/・/site-info/company.php）:
  運営=株式会社REGATE。店舗一覧（11店）に宮城県の店は無い。会社概要の事業所に「仙台センター」（仙台市若林区清水小路1-11）が
  あるが「各事業所ではお品物を買取することができません」→ 旧「店頭」は誤り。お酒ページに出張・宅配・店舗の3方式、
  宅配の対象品目にお酒あり（宅配はグループ会社のバイセルテクノロジーズの宅配部門が対応）。出張の対応エリアの記載なし。
  「全国大手」は公式の表現に無い → 削除。
app の page.tsx・data/prefectures.py（v4/full が読む）を同時に置換。"""
import glob

ROWS = [
    (("バイセル 仙台", "宮城県仙台市", "出張・宅配", "東証上場大手"),
     ("バイセル 仙台定禅寺通り店ほか（仙台市内3店）",
      "仙台市青葉区国分町3丁目1-2（勾当台公園駅 徒歩1分）／太白区 ザ・モール仙台長町店／若林区 イオンスタイル仙台卸町店",
      "店頭・出張・宅配",
      "株式会社BuySell Technologies（公式に「東証上場企業が運営」と記載）の総合買取店。店舗ページに酒類の買取（20歳以上）の記載あり。お酒の買取ページに出張・宅配・店頭の3方式を記載し、出張は離島を除く全国が対象（2026年10月26日確認）")),
    (("福ちゃん 仙台", "宮城県仙台市", "出張・宅配・店頭", "全国大手"),
     ("福ちゃん",
      "宮城県内に店舗なし（仙台市若林区の「仙台センター」は事業所）",
      "出張・宅配",
      "株式会社REGATEが運営する買取専門店。店舗一覧に宮城県の店舗はなく、会社概要に記載の事業所（仙台センター）では買取を行っていません。お酒の買取ページに出張・宅配・店舗の3方式を記載。出張の対応エリアの記載なし（2026年10月26日確認）")),
]


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


for old, new in ROWS:
    n = 0
    for f in sorted(glob.glob("app/tier2/miyagi/*/page.tsx")):
        s = open(f, encoding="utf-8").read()
        if row(old) in s:
            open(f, "w", encoding="utf-8").write(s.replace(row(old), row(new))); n += 1
    print(old[0], "pages changed", n)
    for f in ("data/prefectures.py",):
        s = open(f, encoding="utf-8").read()
        c = s.count(py(old))
        if c:
            open(f, "w", encoding="utf-8").write(s.replace(py(old), py(new)))
        print(" ", f, "changed", c)
