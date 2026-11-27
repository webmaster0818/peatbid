#!/usr/bin/env python3
"""茨城県ハブ（local-buyers.json ibaraki）の店舗一覧を 2026-11-27 の公式ページで再照合した結果を反映する（冪等）。

公式（11/27 curl・既定 UA）:
- 買取大吉 /list/sake/store/ibaraki-ken/ 75件。既存72店すべて残存・店名/住所/URL 一致・各店ページ「<店名>の買取品目一覧」に「お酒」
  - 新規 高萩安良川店（高萩市安良川193・10:00〜18:00・年中無休・品目一覧に「お酒」）を追加
  - 取手白山店・やまや千波店は店舗別の品目一覧に「お酒」なし＝判断待ち（11/26）のため触らない
- おたからや /shop/ibaraki/ 49件（直営12＋加盟店37）。既存10店（いな店は公式404＝判断待ち・触らない）の住所一致・洋酒あり
  - 独自サイト3店の liquor.html は 301 → /itemlist/liquor/ に URL 更新
  - 50号水戸赤塚店（12月1日オープン予定）は品目に洋酒あり → 開店前のため一覧に入れず not_liquor に注記
  - 境中央店の「洋酒」は HTML コメント内のみ（表示なし）
- 大黒屋 水戸50号バイパス・ストックラボ 茨城日立（URL www. へ 301）・かんてい局 つくば・やまご質店: 住所一致・営業時間を追加
"""
import json
from pathlib import Path

P = Path(__file__).resolve().parent.parent / "data" / "local-buyers.json"

DK_HOURS = {
    "ae-koga-r": "10:00〜19:00・年中無休（年末年始除く）",
    "aeon-naka": "10:00〜19:00・水曜定休",
    "ami-nakago": "10:00〜18:00・火曜定休",
    "bando-iwai": "10:00〜19:00・年中無休（年末年始除く）",
    "bh-toride": "10:00〜20:00・年中無休（元旦、臨時休業を除く）",
    "chikusei-ipponmatsu": "10:00〜18:00・月曜定休",
    "escado-ushiku": "10:00〜19:00・水曜定休",
    "frespo-akatsuka": "10:00〜19:00・日曜定休",
    "hitachinaka-mineushiro": "10:00〜18:00・月曜定休",
    "hitachinaka-nakane": "10:00〜19:00・年中無休",
    "hitachinaka-takaba": "10:00〜19:00・年中無休",
    "hitachino-ushikunishi": "10:00〜19:00・年中無休",
    "ibaraki-ishioka": "10:00〜19:00・日曜・祝日定休",
    "inashiki-edosaki": "10:00〜18:00・火曜定休",
    "joso-mitsukaidosuwa": "10:00〜19:00・年中無休",
    "kamisu-1": "10:00〜18:30・木曜定休",
    "kamisu-hiraizumi": "10:00〜18:30・日曜・祝日定休",
    "kashima-shiyakusyodori": "10:00〜18:00・日曜定休",
    "kasumigaura-kamiinayoshi": "10:00〜19:00・年中無休",
    "kitaibaraki-isohara": "10:00〜19:00・年中無休",
    "koga-haramachi": "9:30〜18:30・年中無休",
    "koga-kozutsumi": "10:00〜18:30・日曜定休",
    "koga-morokawa": "10:00〜19:00・水曜定休",
    "kogaeki-nishiguchi": "10:00〜18:00・年中無休（臨時休業を除く）",
    "kubogaoka-2": "10:00〜19:00・年中無休（年末年始除く）",
    "mc-koga": "10:00〜19:00・年中無休",
    "md-katsuta": "10:00〜19:00・年中無休（年末年始、臨時休業を除く）",
    "mdu-saharahigashi": "10:00〜19:00・年中無休",
    "mito-migawa": "10:00〜19:00・年中無休",
    "mito-minami": "10:00〜18:00・年中無休",
    "mito-sannomaru": "10:00〜19:00・年中無休（臨時休業除く）",
    "mito-yonezawa-r": "10:00〜19:00・水曜定休",
    "ms-trial-ishige": "10:00〜18:30・年中無休（年末年始を除く）",
    "pc-arakawahongo": "10:00〜19:00・年中無休",
    "psrlo-hitachioomiya": "10:00〜19:00・水曜定休（祝日の場合は営業）・12/31〜1/2休",
    "roseo-mito": "10:00〜19:00・火曜定休",
    "ryugasaki-matsugaoka": "10:00〜18:00・年中無休",
    "ryugasaki-nakanedai": "10:00〜19:00・年中無休（臨時休業を除く）",
    "ryugasaki-sapla": "10:00〜20:00・年中無休",
    "sakai-nagaido": "10:00〜19:00・年中無休",
    "sea-mark": "10:00〜19:00・年中無休",
    "seimiya-hokotaanbo": "10:00〜18:30・水曜定休",
    "sh-naka": "10:00〜18:30・日曜定休（臨時休業除く）",
    "sm-aso": "10:00〜18:30・水曜定休",
    "takahagi-arakawa": "10:00〜18:00・年中無休",
    "tokaieki-nishi": "10:00〜19:00・火曜定休（1/5（火）は営業）",
    "toride-aoyanagi": "10:00〜19:00・年中無休",
    "toride-fujishirominami": "10:00〜19:00・水曜定休",
    "toride-togashira": "10:00〜19:00・水曜・第二・第四木曜定休",
    "torisen-shimotsuma": "10:00〜18:30・年中無休（年末年始を除く）",
    "tr-chikusei": "10:00〜18:30・年中無休（年末年始を除く）",
    "tr-kasama": "10:00〜18:30（平日） 10:00〜18:00（日曜・祝日）・金曜・土曜定休",
    "tr-sakuranosato": "10:00〜17:00・金曜・土曜定休",
    "ts-hitachinaka": "10:00〜19:00・年中無休",
    "tsuchiura-arakawaoki": "10:00〜18:00・火曜定休",
    "tsuchiura-kandatsu": "10:00〜18:00・年中無休",
    "tsuchiura-nishi": "10:00〜19:00・水曜定休",
    "tsuchiura-nishinamiki-r": "10:00〜19:00・日曜・祝日定休",
    "tsuchiura-sakuragaoka": "10:00〜19:00・年中無休（臨時休業除く）",
    "tsukuba-amabouki": "10:00〜19:00・年中無休",
    "tsukuba-gakuentoshi": "10:00〜17:00・年中無休",
    "tsukuba-higashi": "10:00〜18:00・火曜定休",
    "tsukuba-shibasaki": "10:00〜19:00・水曜定休",
    "tsukuba-tohigashi": "10:00〜19:00・年中無休",
    "tsukubamirai-fujimigaoka": "10:00〜19:00・年中無休",
    "tsukubamirai-yaita": "10:00〜19:00・水曜定休",
    "txavenue-moriya": "10:00〜19:00・年中無休",
    "ushiku-chuo": "10:00〜19:00・年中無休",
    "yb-hitachikawaragocho": "10:00〜19:00・水曜定休",
    "yb-hitachinaka": "10:00〜19:00・年中無休",
    "yb-mawatari": "10:00〜19:00・年中無休",
    "yb-mitokasahara": "10:00〜19:00・年中無休",
    "yuki-chuocho": "10:00〜19:00・年中無休",
}

OTA_HOURS = {
    "heta": "10:00〜17:30・不定休",
    "kashimakyuchu": "10:00〜18:00・年中無休",
    "superharigae-tsuchiura": "10:00〜18:00・年中無休（お盆、年末年始を除く）",
    "kenkyugakuen": "9:00〜18:00・年中無休（年末年始を除く）",
    "route6east": "9:00〜18:00・年中無休（年末年始を除く）",
    "akayamajoy": "10:00〜18:00・年中無休（1/1休み）",
    "shimohemi": "10:00〜18:00・年中無休（12/31〜1/2休業）",
    "saiwai-cho-otakaraya.net": "10:00〜19:00（日曜は18:00まで）・不定休",
    "branch-moriya-otakaraya.net": "10:00〜19:00（日曜は18:00まで）・年中無休",
    "honcho-ten-otakaraya.net": "10:00〜19:00（日曜は18:00まで）・年中無休",
}
OTHER_HOURS = {
    "大黒屋": "10:00〜19:00（定休日なし）",
    "ストックラボ": "10:00〜20:00・定休日なし（臨時休業・年末年始を除く）",
    "質屋かんてい局": "10:00〜20:00（受付・売り場19:30まで）・木曜定休（12/30〜1/3休業）",
    "駅南やまご質店": "9:30〜19:00・水曜定休",
}
SL_OLD = "https://stock-lab.com/osake-kaitori/shop/ibaraki-hitachi/"
SL_NEW = "https://www.stock-lab.com/osake-kaitori/shop/ibaraki-hitachi/"

TAKAHAGI = {
    "brand": "買取大吉",
    "city": "高萩市",
    "name": "高萩安良川店",
    "addr": "茨城県高萩市安良川193",
    "url": "https://www.kaitori-daikichi.jp/list/sake/store/takahagi-arakawa/",
}

TITLE = "お酒買取 茨城県｜県内でウイスキーを買い取る88店・出張対応とYahoo実売相場【2026年最新】"
DESC = "茨城県でお酒・ウイスキーを売る方向けに、県内の買取店88店（買取大吉73店・おたからや11店・大黒屋・ストックラボほか）、出張買取の対応エリア、木内酒造の八郷蒸溜所、Yahoo!オークション実落札中央値による銘柄別相場を掲載しています。"

NOTE_DK = "県ページ掲載の店舗のうち、店舗ページの買取品目一覧に「お酒」がある73店を掲載（2026-11-27確認）。ただし「お酒に関しては、一部取り扱っていない店舗がございます。詳しくは、店舗またはお電話にてご確認ください。」と記載。出張買取は「出張費無料 / 日本全国OK」"
NOTE_SL = "お酒買取専門店。茨城日立店の店舗ページに「日立市は無料で出張買取・宅配買取を対応」と記載し、店舗別のお酒買取価格一覧表を掲載（2026-11-27確認）"
NOT_LIQUOR = "おたからやの県内店舗のうち上記11店以外は、店舗ページの買取品目に洋酒・お酒の記載がありません（2026-11-27確認）。ただし2026年12月1日オープン予定の50号水戸赤塚店（水戸市赤塚2丁目）は店舗ページの買取品目に「洋酒」があります（開店前のため上の一覧には含めていません）。なんぼや（水戸エクセルみなみ店）は店舗ページの取扱ジャンルにお酒がありません。銀座蔵やは県内に店舗がなく、出張買取対応エリアにも茨城県は含まれていません（この2文は2026-10-24確認）。"


def main():
    d = json.loads(P.read_text(encoding="utf-8"))
    n = d["ibaraki"]
    before = json.dumps(n, ensure_ascii=False, sort_keys=True)
    stores = n["stores"]
    for s in stores:
        u = s["url"]
        if s["brand"] == "買取大吉":
            s["hours"] = DK_HOURS[u.rstrip("/").split("/")[-1]]
        elif s["brand"] == "おたからや":
            if u.endswith("/items/liquor.html"):
                u = s["url"] = u.replace("/items/liquor.html", "/itemlist/liquor/")
            key = u.split("/")[2] if "otakaraya-shop.jp" not in u else u.rstrip("/").split("/")[-1]
            if key in OTA_HOURS:
                s["hours"] = OTA_HOURS[key]
        else:
            if u == SL_OLD:
                s["url"] = SL_NEW
            s["hours"] = OTHER_HOURS[s["brand"]]
    if not any(s["url"] == TAKAHAGI["url"] for s in stores):
        idx = next(i for i, s in enumerate(stores) if s["url"].endswith("/kitaibaraki-isohara/")) + 1
        stores.insert(idx, dict(TAKAHAGI, hours=DK_HOURS["takahagi-arakawa"]))
    for bn in n["brand_notes"]:
        if bn[0] == "買取大吉":
            bn[1] = NOTE_DK
        elif bn[0] == "ストックラボ":
            bn[1] = NOTE_SL
        if bn[2] == SL_OLD:
            bn[2] = SL_NEW
    for dp in n["dispatch"]:
        if dp[2] == SL_OLD:
            dp[2] = SL_NEW
    n["checked_at"] = "2026-11-27"
    n["checked_label"] = "2026-10-24・11-27"
    n["distillery_checked"] = "2026-10-24"  # 蒸溜所の段落は再照合していない
    n["title"] = TITLE
    n["desc"] = DESC
    n["not_liquor"] = NOT_LIQUOR
    assert len(stores) == 88, len(stores)
    assert sum(s["brand"] == "買取大吉" for s in stores) == 73
    assert sum(s["brand"] == "おたからや" for s in stores) == 11
    after = json.dumps(n, ensure_ascii=False, sort_keys=True)
    if before == after:
        print("ibaraki: 変更なし")
        return
    P.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("ibaraki: 更新", len(stores), "店")


if __name__ == "__main__":
    main()
