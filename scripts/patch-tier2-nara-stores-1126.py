#!/usr/bin/env python3
"""奈良県ハブ（local-buyers.json nara）の店舗一覧を 2026-11-26 の公式ページで再照合した結果を反映する（冪等）。

公式（11/26 curl）:
- 買取大吉 /list/sake/store/nara-ken/ 45件・各店ページの住所・営業時間・定休日・買取品目一覧「お酒」＝45店すべてあり
  - 法隆寺店 住所 興留5-1-34 → 興留5-1-35 サンメゾン法隆寺
  - プライスカット天理北店 URL pc-tenrikita/（404）→ pc-tenrikita-r/
- おたからや /shop/nara/ 25件（直営4＋加盟店21・ajax_load_fc）。店舗ページの買取品目に「洋酒」＝加盟店13店
  （既存12店＋シルキア奈良店 2026-11-15 開店）。直営4店（イオンビッグ香芝・近鉄奈良駅西口本店・オークワ高田神楽・斑鳩）は店舗別の品目表示に洋酒・お酒なし
- リフレ館 /rifrekan.html: 店名「リフレ館プラス 小西さくら通り本店」・9:30〜17:00（定休日の記載なし）
"""
import json
from pathlib import Path

P = Path(__file__).resolve().parent.parent / "data" / "local-buyers.json"

DK_HOURS = {
    "am-yamatokoriyama": "10:00〜20:00・年中無休",
    "at-tenri": "10:00〜19:00・年中無休",
    "at-tomiominami": "10:00〜18:00・年中無休",
    "dq-izumiya-shinomiya": "10:00〜19:00・年中無休",
    "ghikoma": "10:00〜18:00（受付終了17:30）・施設休館日・年末年始休",
    "gojo-imai": "10:00〜17:00・日曜定休",
    "horyuji": "10:00〜19:00・年中無休",
    "ikoma-kitayamato": "10:00〜18:00・年中無休",
    "ikoma-komyocho": "10:00〜17:00（月〜金） 10:00〜15:30（土）・日曜・祝日定休",
    "ikoma-nakanabata": "10:00〜19:00・水曜・土曜定休",
    "kashiba-hata": "10:00〜19:00・年中無休",
    "kashihara-masuga": "10:00〜19:00・年中無休",
    "kashiharajingumae": "10:00〜19:00・日曜・水曜定休",
    "kawai-hirosedai": "10:00〜19:00・年中無休",
    "kinsho-yamatotakada": "10:00〜19:00・年中無休",
    "liebell-oji": "10:00〜18:30（平日） 10:00〜17:00（土日祝）・木曜定休",
    "life-gose": "10:00〜18:00・土曜定休",
    "life-oyodo": "10:00〜18:00・金曜定休",
    "matsugen-heguri": "10:00〜19:00・年中無休",
    "minamihanauchi": "10:00〜19:00・日曜・水曜定休",
    "nara-daianji": "10:00〜19:00・年中無休",
    "nara-ecollmami": "10:00〜19:00・年中無休（臨時休業を除く）",
    "nara-kashiwagicho": "10:30〜18:00・水曜定休",
    "nara-kodono": "10:00〜18:00・日曜・水曜定休",
    "nara-omiya": "10:00〜19:00・年中無休（臨時休業を除く）",
    "nara-oshikuma": "10:00〜19:00・年中無休",
    "nara-sanjodori-r": "10:30〜19:00・年中無休",
    "nara-tomigaoka": "10:00〜19:00・年中無休",
    "nara-tomiomotomachi": "10:00〜18:00・火曜定休",
    "nishiyamato": "10:00〜18:00・日曜・月曜定休",
    "okuwa-kashibaminami": "10:00〜19:00・年中無休",
    "okuwa-narafuruichi": "10:00〜18:00・年中無休",
    "p-gakuenmae": "10:00〜19:00・年中無休（元旦〜2日を除く）",
    "pc-tenrikita-r": "10:00〜18:00・年中無休",
    "raspa-nishiyamato": "10:00〜19:00・年中無休",
    "sakurai-abemokuzaidanchi": "10:00〜19:00・水曜定休",
    "sakurai-higashishindo": "10:00〜19:00・年中無休",
    "sakurai-odono": "10:00〜19:00・年中無休",
    "so-takada": "10:00〜19:00・年中無休",
    "tawaramoto-chishiro": "10:00〜19:00・年中無休",
    "tenri-aramaki": "10:00〜19:00・年中無休",
    "tonarie-yamatotakada-r": "10:00〜19:00・年中無休",
    "yamato-yagi": "10:00〜19:00・日曜定休",
    "yamatokoriyama-shinmachi": "10:00〜19:00・年中無休",
    "yamatotakada-sakaemachi": "10:00〜19:00・日曜定休",
}

OTA_HOURS = {
    "frespo-sakurai": "10:00〜19:00・年中無休",
    "ionsakurai": "10:00〜19:00・年中無休",
    "sakurai-minami": "10:00〜19:00・年中無休",
    "heguri": "10:00〜19:00・年中無休",
    "horyuji": "10:00〜19:00・年中無休（年末年始のみ休み）",
    "nishinokyo": "10:00〜19:00・年中無休",
    "okuwa-gose": "10:00〜19:00・年中無休",
    "seishoukoukoumae": "10:00〜19:00・年中無休",
    "okuwa-tawaramotointer": "10:00〜19:00・年中無休",
    "shirakashi": "10:00〜19:00・年中無休",
    "twingate": "10:00〜19:00・年中無休（年末年始のみ休み）",
    "unebigoryomae": "10:00〜19:00・年中無休（年末年始のみ休み）",
    "silkianara": "10:00〜19:00・年中無休",
}

SILKIA = {
    "brand": "おたからや",
    "city": "奈良市",
    "name": "シルキア奈良店",
    "addr": "奈良県奈良市三条本町8-1 1階",
    "url": "https://www.otakaraya-shop.jp/silkianara/",
}

TITLE = "お酒買取 奈良県｜県内でウイスキーを買い取る59店・出張対応とYahoo実売相場【2026年最新】"
DESC = "奈良県でお酒・ウイスキーを売る方向けに、県内の買取店59店（買取大吉45店・おたからや13店・リフレ館）、出張買取の対応エリア、曽爾村の神息酒造 奈良蒸溜所、Yahoo!オークション実落札中央値による銘柄別相場を掲載しています。"

NOTE_DK = "県ページ掲載の45店（2026-11-26確認）すべてで、店舗ページの買取品目一覧に「お酒」あり。ただし「お酒に関しては、一部取り扱っていない店舗がございます。詳しくは、店舗またはお電話にてご確認ください。」と記載。出張買取は「出張費無料 / 日本全国OK」"
NOTE_OTA = "公式店舗一覧の県内25店（直営4店・加盟店21店）のうち、店舗ページの買取品目に「洋酒」があるのは上記13店（2026-11-26確認。シルキア奈良店は2026年11月15日開店）。うちフレスポ桜井店・平群店・西ノ京店・桜井南店・青翔高校前店・白橿店・シルキア奈良店は店舗ページに出張買取の記載あり"
NOTE_RIFRE = "奈良市小西町の「リフレ館プラス 小西さくら通り本店」（店舗案内の営業時間 9:30〜17:00）。お酒の買取品目ページで「ウイスキー買取はスコッチ、モルト、バーボン、国産ウイスキーまで幅広く買取」と記載"
NOT_LIQUOR = "おたからやの県内店舗のうち上記13店以外（直営4店・加盟店8店の計12店）は、店舗ページの買取品目に洋酒・お酒の記載がありません（2026-11-26確認）。なんぼや（近鉄百貨店生駒店・ならファミリー店）は店舗ページの取扱ジャンルにお酒がありません。大黒屋と銀座蔵やは公式店舗一覧に県内の店舗がありません（この2文は2026-10-24確認）。"


def main():
    d = json.loads(P.read_text(encoding="utf-8"))
    n = d["nara"]
    before = json.dumps(n, ensure_ascii=False, sort_keys=True)
    stores = n["stores"]
    for s in stores:
        slug = s["url"].rstrip("/").split("/")[-1]
        if s["brand"] == "買取大吉":
            if slug == "pc-tenrikita":
                s["url"] = "https://www.kaitori-daikichi.jp/list/sake/store/pc-tenrikita-r/"
                slug = "pc-tenrikita-r"
            if slug == "horyuji":
                s["addr"] = "奈良県生駒郡斑鳩町興留5-1-35 サンメゾン法隆寺"
            s["hours"] = DK_HOURS[slug]
        elif s["brand"] == "おたからや":
            s["hours"] = OTA_HOURS[slug]
        elif s["brand"] == "リフレ館":
            s["name"] = "リフレ館プラス 小西さくら通り本店"
            s["hours"] = "9:30〜17:00"
    if not any(s["url"] == SILKIA["url"] for s in stores):
        idx = next(i for i, s in enumerate(stores) if s["url"].endswith("/nishinokyo/")) + 1
        stores.insert(idx, dict(SILKIA, hours=OTA_HOURS["silkianara"]))
    n["checked_at"] = "2026-11-26"
    n["title"] = TITLE
    n["desc"] = DESC
    for bn in n["brand_notes"]:
        if bn[0] == "買取大吉":
            bn[1] = NOTE_DK
        elif bn[0] == "おたからや":
            bn[1] = NOTE_OTA
        elif bn[0] == "リフレ館":
            bn[1] = NOTE_RIFRE
    n["not_liquor"] = NOT_LIQUOR
    assert len(stores) == 59, len(stores)
    assert sum(s["brand"] == "買取大吉" for s in stores) == 45
    assert sum(s["brand"] == "おたからや" for s in stores) == 13
    after = json.dumps(n, ensure_ascii=False, sort_keys=True)
    if before == after:
        print("nara: 変更なし")
        return
    P.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("nara: 更新", len(stores), "店")


if __name__ == "__main__":
    main()
