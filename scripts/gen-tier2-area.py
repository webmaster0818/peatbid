#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""tier2エリア親ページ生成（勝てる設計・実データ駆動）。
使い方: python3 scripts/gen-tier2-area.py oita
- 相場=brands.json の Yahoo180日実落札中央値（実データ）。買取目安=中央値×60〜80%（業界一般目安・断定しない）。
- 業者=全国対応の実在3社（既存送客先・実URL）。地元店の創作はしない。
- 県の事実=prefectures.py（人口・主要都市等の公開事実のみ）。気候等の冗長テンプレ文は使わない。"""
import json, importlib.util, sys, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPDATED = "2026-06-23"

def load_pref():
    spec = importlib.util.spec_from_file_location("p", os.path.join(ROOT, "data/prefectures.py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m.PREFECTURES

BUYERS = [
    ("バイセル", "https://buysell-kaitori.com/liquor/japanese-whisky/", "東証グロース上場企業が運営する買取大手です。出張・店頭・宅配の3つの方式に対応しています（出張は離島を除く全国）。", "宅配・出張・店頭"),
    ("福ちゃん", "https://fuku-chan.jp/", "株式会社REGATEが運営する買取専門店で、お酒・ウイスキーの査定にも対応しています。出張・宅配・店舗の3つの方式があります（出張の対応エリアは公式サイトに記載がありません）。", "出張・宅配・店舗"),
    ("LINXAS", "https://linxas.shop/whiskey/", "ウイスキー買取の専門店です。銘柄別の買取参考価格を公開しており、相場の目安を把握しやすい業者です。", "宅配"),
]

def yen(n): return f"¥{int(round(n)):,}"
def r100(n): return int(round(n / 100.0)) * 100

def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def load_local(pref_key):
    """data/local-buyers.json（県内の実店舗・出張対応・県のウイスキー事情。各社公式で確認した分だけ）。無い県は None＝従来どおり。"""
    try:
        d = json.load(open(os.path.join(ROOT, "data/local-buyers.json"), encoding="utf-8"))
    except FileNotFoundError:
        return None
    v = d.get(pref_key)
    return v if isinstance(v, dict) else None


def local_section(name, lb):
    a = 'target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy"'
    has_h = any(s.get("hours") for s in lb["stores"])
    rows = "\n              ".join(
        f'<tr className="border-b border-warm-border/60"><td className="px-3 py-2 whitespace-nowrap">{esc(s["city"])}</td><td className="px-3 py-2">{esc(s["brand"])} {esc(s["name"])}</td><td className="px-3 py-2">{esc(s["addr"])}</td>'
        + (f'<td className="px-3 py-2 text-xs">{esc(s.get("hours") or "—")}</td>' if has_h else "")
        + f'<td className="px-3 py-2 whitespace-nowrap"><a href="{s["url"]}" {a}>店舗ページ</a></td></tr>'
        for s in lb["stores"])
    # 市町村別の店舗数（2026-10-24 追加・「ウイスキー 買取 高岡」のような市名の検索向け）
    from collections import Counter as _C
    _cc = _C(s["city"] for s in lb["stores"])
    city_line = "・".join(f"{c} {n}店" for c, n in _cc.most_common())
    ck_label = lb.get("checked_label") or lb["checked_at"]
    notes = "".join(f'<li><strong>{esc(b)}</strong>：{esc(t)}（<a href="{u}" {a}>公式</a>）</li>' for b, t, u in lb["brand_notes"])
    disp = "".join(f'<li><strong>{esc(b)}</strong>：{esc(t)}（<a href="{u}" {a}>公式</a>）</li>' for b, t, u in lb["dispatch"])
    ck = lb["checked_at"]
    dist = ""
    if lb.get("distillery"):
        dist = f'''
      <h3 className="font-bold text-lg mt-8 mb-2">{name}のウイスキー蒸留所</h3>
      <p className="text-sm text-warm-gray mb-2 leading-relaxed">{esc(lb["distillery"])}</p>
      <p className="text-[11px] text-warm-gray mb-8">出典: <a href="{lb["distillery_url"]}" {a}>{esc(lb.get("distillery_label") or "若鶴酒造 三郎丸蒸留所 公式サイト")}</a>（{lb.get("distillery_checked") or ck}確認）</p>'''
    return f'''
      {{/* 5-2. 県内の実店舗・出張対応（data/local-buyers.json） */}}
      <h2 id="local-stores" className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}内でお酒を買い取る店舗（{len(lb["stores"])}店・{ck_label}確認）</h2>
      <p className="text-sm text-warm-gray mb-4 leading-relaxed">各社の公式サイトの店舗ページで、お酒（洋酒）の買取を確認できた{name}内の店舗です（PeatBid編集部が{ck_label}に確認）。営業時間や取扱品目は変わることがあるため、来店前に各店舗へご確認ください。</p>
      <p id="local-cities" className="text-sm text-ink mb-4 leading-relaxed"><strong>市町村別の店舗数</strong>：{city_line}</p>
      <div className="overflow-x-auto mb-4 rounded-xl border border-warm-border">
        <table className="w-full text-sm">
          <thead className="bg-cream/60"><tr className="text-left text-xs text-warm-gray"><th className="px-3 py-2">市</th><th className="px-3 py-2">店舗</th><th className="px-3 py-2">住所（公式表記）</th>{'<th className="px-3 py-2">営業時間（公式）</th>' if has_h else ""}<th className="px-3 py-2">出典</th></tr></thead>
          <tbody>
              {rows}
          </tbody>
        </table>
      </div>
      <ul className="text-sm text-warm-gray mb-4 leading-relaxed list-disc pl-5 space-y-1">{notes}</ul>
      <p className="text-sm text-warm-gray mb-8 leading-relaxed">{esc(lb["not_liquor"])}</p>

      <h3 className="font-bold text-lg mt-8 mb-2">{name}への出張買取（公式の記載）</h3>
      <ul className="text-sm text-warm-gray mb-8 leading-relaxed list-disc pl-5 space-y-1">{disp}</ul>
{dist}
'''


# 2026-11-12 成長ルーチン: 「ウイスキー 買取 茨城／神奈川」で h1 直下に「持ち込み・出張できる店」の早見表。
# 各行は 2026-11-12 に各社公式ページを開いて確認した内容だけ（店名・所在地・方式・出典）。
# 値=(確認日, [(店舗・方式, 所在地・対応範囲, 出典URL)])。下の「県内でお酒を買い取る店舗」（local-buyers.json）とは別の要約。
# 福ちゃん行は /tier2/ の判断待ち（A/B）のため載せていない。
QUICK_STORES = {
    "ibaraki": ("2026-11-12", [
        ("ストックラボ 茨城日立店（お酒買取専門店）", "日立市東滑川町5丁目1-3 シーマークスクエア2階。店舗ページに「日立市は無料で出張買取・宅配買取を対応」", "https://stock-lab.com/osake-kaitori/shop/ibaraki-hitachi/"),
        ("大黒屋 質水戸50号バイパス店（店頭・出張）", "水戸市千波町2067-5。お酒の出張買取の訪問査定エリアは水戸市・那珂市・ひたちなか市・小美玉市・笠間市・大洗町・茨城町・城里町・東海村", "https://kaitori.e-daikoku.com/liquor/shop/mito/"),
        ("質屋かんてい局 つくば店（店頭）", "つくば市松代1丁目9-2。ウイスキー・ブランデーなどお酒・古酒の買取を案内", "https://kanteikyoku.jp/store/tsukuba/news/151741/"),
        ("駅南やまご質店（水戸市の質店）", "お酒の買取可能エリアとして県央・県北・鹿行・県南・県西の各地区の市町村を掲載", "https://yamago78.jp/trade/liquor/liquor/"),
        ("買取大吉（店頭）", "公式の茨城県の店舗一覧に74件。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/ibaraki-ken/"),
        ("バイセル（出張）", "「水戸市をはじめ、つくば市や日立市など茨城県全域」と記載", "https://buysell-kaitori.com/area/liquor-ibaraki/"),
        ("LINXAS（出張・宅配）", "「茨城県は無料出張エリア（関東）」「県内に店舗はありません」と記載", "https://linxas.shop/shops/ibaragi/"),
    ]),
    "kanagawa": ("2026-11-12", [
        ("LINXAS 神奈川横浜本店（お酒買取専門店）", "横浜市中区尾上町2-20 大和証券横浜ビル2F。店頭・宅配・出張", "https://linxas.shop/shops/yokohama/"),
        ("ファイブニーズ 神奈川横浜店（お酒買取専門店）", "横浜市中区羽衣町3丁目63 羽衣ビル1F", "https://www.sakekaitori.com/shop/yokohama/"),
        ("ストックラボ 溝の口店（お酒買取専門店）", "川崎市高津区溝口2丁目10-36-101（横浜店は店舗一覧で［臨時休業中］）", "https://www.stock-lab.com/osake-kaitori/shop/mizonokuchi/"),
        ("大黒屋（店頭3店）", "質横浜モアーズ前店（横浜市西区南幸1-2-3）・質横浜買取センター（横浜市西区岡野1-12-13）・ブランド館 川崎店（川崎市川崎区砂子2-3-12）。各店舗ページにお酒の買取の記載", "https://shichi.e-daikoku.com/shop/"),
        ("キングラム（店頭2店）", "相模大野店（相模原市南区）・武蔵新城店（川崎市中原区）。店舗一覧のサービス欄に「酒買取」", "https://kingram.jp/shop/area/kanto/kanagawa/"),
        ("買取大吉（店頭）", "公式の神奈川県の店舗一覧に168件。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/kanagawa-ken/"),
        ("バイセル（出張）", "「横浜市をはじめ、川崎市や相模原市など神奈川県全域」と記載", "https://buysell-kaitori.com/area/liquor-kanagawa/"),
        ("リカスタ（出張・宅配）", "「神奈川県は 出張買取 宅配買取 エリアです」と記載（店頭は新宿店）", "https://www.licasta.com/areas/area_kanagawa/"),
        ("大黒屋（出張）", "お酒の訪問査定エリアに横浜市・川崎市・相模原市・横須賀市・藤沢市など19市と県内の町村を掲載", "https://kaitori.e-daikoku.com/visit/liquor/"),
    ]),
    # 2026-11-12（追加）: local-buyers.json の無い3県。公式で県内店舗を確認できない業者は店頭行に載せない
    # （ストックラボ・大黒屋（長野）・キングラム（埼玉・広島）は県内店舗なし／確認できず）。出張は公式に県の記載がある業者のみ。
    "saitama": ("2026-11-12", [
        ("ファイブニーズ 埼玉大宮店（お酒買取専門店）", "さいたま市大宮区大門町2丁目86 田原ビル1F", "https://www.sakekaitori.com/shop/saitama/"),
        ("大黒屋（店頭3店）", "質川口店（川口市栄町3-4-15）・質浦和買取センター（さいたま市浦和区東高砂町14-4）・春日部店（春日部市中央8-8-11）。各店舗ページにお酒の買取の記載", "https://shichi.e-daikoku.com/shop/"),
        ("買取大吉（店頭）", "公式の埼玉県の店舗一覧に156件。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/saitama-ken/"),
        ("バイセル（出張）", "「さいたま市をはじめ、川越市や川口市など埼玉県全域」と記載", "https://buysell-kaitori.com/area/liquor-saitama/"),
        ("LINXAS（出張・宅配）", "「埼玉県は無料出張エリア（関東）」「県内に店舗はありません」と記載", "https://linxas.shop/shops/saitama/"),
        ("リカスタ（出張・宅配）", "「埼玉県は 出張買取 宅配買取 エリアです」と記載", "https://www.licasta.com/areas/area_saitama/"),
        ("大黒屋（出張）", "お酒の訪問査定エリアにさいたま市・川口市・川越市・所沢市・越谷市など県内の市町を掲載", "https://kaitori.e-daikoku.com/visit/liquor/"),
    ]),
    "nagano": ("2026-11-12", [
        ("キングラム 上田インター店（店頭・出張）", "上田市住吉277-17。店舗一覧のサービス欄に「酒買取」「出張買取」", "https://kingram.jp/shop/area/chubu/nagano/"),
        ("買取大吉（店頭）", "公式の長野県の店舗一覧に27件（長野市5件・松本市3件など）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/nagano-ken/"),
        ("バイセル（出張）", "「長野市をはじめ、松本市や上田市など長野県全域」と記載", "https://buysell-kaitori.com/area/liquor-nagano/"),
        ("LINXAS（出張・宅配）", "「長野県は無料出張エリア（中部）」「県内に店舗はありません」と記載", "https://linxas.shop/shops/nagano/"),
    ]),
    "hiroshima": ("2026-11-12", [
        ("ファイブニーズ 広島店（お酒買取専門店）", "広島市中区三川町5-14 三川町ビル1F", "https://www.sakekaitori.com/shop/hiroshima/"),
        ("大黒屋 ブランド館 広島本通店（店頭）", "広島市中区本通9-32。店舗ページにお酒の買取の記載", "https://shichi.e-daikoku.com/shop/hiroshima/"),
        ("買取大吉（店頭）", "公式の中国・四国の店舗一覧で広島県は52件。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/tyugoku-sikoku/"),
        ("バイセル（出張）", "「広島市をはじめ、福山市や呉市など広島県全域」と記載", "https://buysell-kaitori.com/area/liquor-hiroshima/"),
        ("大黒屋（出張）", "お酒の訪問査定エリアに広島市（8区）・呉市・福山市・東広島市・尾道市など県内の市町を掲載", "https://kaitori.e-daikoku.com/visit/liquor/"),
    ]),
    # 2026-11-13 成長ルーチン: 「ウイスキー 買取」（熊本着地）・群馬・北海道・新潟。同じ型（11/13 に各社公式で確認した行だけ・福ちゃん行なし）。
    # 載せない: ストックラボ（4県とも店舗なし）、LINXAS 北海道・新潟（「無料出張エリアの外」＝宅配中心）、リカスタ（4県とも宅配のみ）、
    # 大黒屋 札幌の他3店（店舗ページの「お酒買取」はフッターの共通メニューのみ）、キングラム 稚内潮見・苫小牧柳町（サービス欄に酒買取なし）、
    # ファイブニーズ・大黒屋・キングラム（群馬・新潟は店舗一覧に県内店なし）。
    "kumamoto": ("2026-11-13", [
        ("ファイブニーズ 熊本店（お酒買取専門店）", "熊本市中央区下通1丁目10-25 アロービル1F。店舗受付10:00〜19:00・火曜日・金曜日定休。店頭・出張・宅配", "https://www.sakekaitori.com/shop/kumamoto/"),
        ("大黒屋 質熊本下通店（店頭）", "熊本市中央区下通1丁目7-14 田尻本店ビル2階。店舗ページの買取品目に「お酒」", "https://shop.e-daikoku.com/info/spot/detail?code=0000000065"),
        ("バイセル 熊本ゆめタウンはません店（店頭）", "熊本市南区田井島1丁目2-1 ゆめタウンはません3F・10:00〜19:00（施設の営業時間に準じる）。県のお酒買取ページに同店でのウイスキー等の買取事例", "https://buysell-kaitori.com/store/kumamoto-youmetownhamasen/"),
        ("キングラム（店頭3店）", "味噌天神店（熊本市中央区大江）・通町店（同 上通町）・東バイパス店（熊本市東区新南部）。店舗一覧のサービス欄に「酒買取」「出張買取」", "https://kingram.jp/shop/area/kyushu/kumamoto/"),
        ("買取大吉（店頭）", "公式の熊本県のお酒買取店舗一覧に22件（熊本市12件・八代市3件・荒尾市2件など）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/kumamoto-ken/"),
        ("バイセル（出張）", "「熊本市、八代市、人吉市、荒尾市、玉名市など熊本県全域の各市町村にて出張料無料で対応可能」と記載", "https://buysell-kaitori.com/area/liquor-kumamoto/"),
        ("LINXAS（出張・宅配）", "「熊本県は無料出張エリア（九州）」「県内に店舗はありません」と記載", "https://linxas.shop/shops/kumamoto/"),
        ("大黒屋（出張）", "お酒の訪問査定エリアに熊本市（5区）・八代市・人吉市・荒尾市・天草市など県内の市町村を掲載", "https://kaitori.e-daikoku.com/visit/liquor/"),
    ]),
    "hokkaido": ("2026-11-13", [
        ("ファイブニーズ 北海道札幌店（お酒買取専門店）", "札幌市中央区大通西15丁目2-1 ラスコム15ビル1-A。店舗受付10:00〜19:00・木曜日・日曜日定休。出張対応エリアに札幌市各区・函館市・小樽市・旭川市など", "https://www.sakekaitori.com/shop/sapporo/"),
        ("大黒屋 質札幌店（店頭）", "札幌市中央区北一条西3-3 札幌中央ビル1F・2F。店舗ページに「お酒買取や金券売買まで出来る」と記載", "https://shichi.e-daikoku.com/shop/sapporo/"),
        ("キングラム（店頭8店）", "手稲店・札幌白石店（札幌市）・千歳信濃店・函館花園店・帯広柏林台店・苫小牧桜木店・旭川宮前店・釧路星が浦店。店舗一覧のサービス欄に「酒買取」", "https://kingram.jp/shop/area/hokkaido/hokkaido/"),
        ("買取大吉（店頭）", "公式の北海道のお酒買取店舗一覧に95件（札幌市47件・旭川市8件・函館市7件など）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/hokkaido/"),
        ("バイセル（出張）", "「札幌市をはじめ、函館市や旭川市など北海道全域」と記載（道内の店舗一覧は掲載なし）", "https://buysell-kaitori.com/area/liquor-hokkaido/"),
        ("大黒屋（出張）", "お酒の訪問査定エリアに札幌市・小樽市・北広島市・千歳市・苫小牧市・登別市・岩見沢市・旭川市・江別市・恵庭市・白老町を掲載", "https://kaitori.e-daikoku.com/visit/liquor/"),
    ]),
    "gunma": ("2026-11-13", [
        ("バイセル（店頭2店・出張）", "県のお酒買取ページの店舗案内にスマーク伊勢崎店（伊勢崎市西小保方町368 スマーク伊勢崎2F）・伊勢崎連取店（伊勢崎市連取元町175-20）。出張は「高崎市、前橋市、太田市、伊勢崎市、桐生市、渋川市、館林市など群馬県全域の各市町村」と記載", "https://buysell-kaitori.com/area/liquor-gunma/"),
        ("買取大吉（店頭）", "公式の群馬県のお酒買取店舗一覧に47件（高崎市13件・前橋市8件・伊勢崎市8件・太田市5件など）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/gunma-ken/"),
        ("LINXAS（出張・宅配）", "「群馬県は無料出張エリア（関東）」「県内に店舗はありません」と記載", "https://linxas.shop/shops/gunma/"),
    ]),
    "niigata": ("2026-11-13", [
        ("買取大吉（店頭）", "公式の新潟県のお酒買取店舗一覧に40件（新潟市17件・長岡市7件など）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/niigata-ken/"),
        ("バイセル（出張）", "「新潟市（北区・東区・中央区・江南区・秋葉区）、長岡市、三条市、柏崎市、新発田市、小千谷市、加茂市など新潟県全域の各市町村」と記載。県の店舗案内に万代シテイバスセンター店（新潟市中央区万代1丁目6番1号・「11月27日 NEW OPEN」と記載）", "https://buysell-kaitori.com/area/liquor-niigata/"),
    ]),
    # 2026-11-14 成長ルーチン: 「お酒 買取 徳島」「ウイスキー 買取 富山／石川」。同じ型（11/14 に各社公式で確認した行だけ・福ちゃん行なし）。
    # 載せない: ファイブニーズ・ストックラボ・キングラム（3県とも店舗一覧に県内店なし）、大黒屋（富山・徳島は店舗一覧に県内店なし。徳島は訪問査定エリアにも記載なし）、
    # LINXAS 徳島（「無料出張エリアの外」＝宅配中心）、リカスタ（3県とも宅配のみ）、バイセル 富山・石川の店頭（県の店舗案内に店舗なし）。
    "tokushima": ("2026-11-14", [
        ("バイセル 徳島田宮店（店頭）", "徳島市南田宮2丁目1-26（運営会社：エース環境設計株式会社）・10:00〜18:00・土日祝定休。店舗ページに「酒類の買取に関しては20歳以上のお客様のみ対象」", "https://buysell-kaitori.com/store/tokushima-tamiya/"),
        ("買取大吉（店頭）", "公式の徳島県のお酒買取店舗一覧に23件（徳島市8件・小松島市2件・阿南市2件・石井町2件など。うちイオンモール徳島店は「2026.11.20（金）オープン」と記載）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/tokusima-ken/"),
        ("バイセル（出張）", "「徳島市、阿南市、鳴門市、吉野川市、小松島市、阿波市、三好市など徳島県全域の各市町村にて対応可能」と記載", "https://buysell-kaitori.com/area/liquor-tokushima/"),
    ]),
    "toyama": ("2026-11-14", [
        ("買取大吉（店頭）", "公式の富山県のお酒買取店舗一覧に19件（富山市9件・高岡市5件・射水市3件・滑川市1件・砺波市1件）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/toyama-ken/"),
        ("バイセル（出張）", "「富山市、高岡市、射水市、南砺市、砺波市など富山県全域の各市町村にて対応可能」と記載（県の店舗案内に店舗なし）", "https://buysell-kaitori.com/area/liquor-toyama/"),
        ("LINXAS（出張・宅配）", "「富山県は無料出張エリア（中部）」「県内に店舗はありません」と記載", "https://linxas.shop/shops/toyama/"),
        ("大黒屋（出張）", "お酒の訪問査定エリアに南砺市・小矢部市・砺波市・高岡市・射水市・氷見市を掲載（富山市は記載なし）", "https://kaitori.e-daikoku.com/visit/liquor/"),
    ]),
    "ishikawa": ("2026-11-14", [
        ("大黒屋 質金沢買取センター（店頭）", "金沢市片町1-1-21 KMビル・10:00〜19:00（定休日なし）。店舗ページに「お酒(買取のみ)」と記載", "https://kaitori.e-daikoku.com/liquor/shop/kanazawa/"),
        ("買取大吉（店頭）", "公式の石川県のお酒買取店舗一覧に22件（金沢市12件・小松市3件・加賀市2件・野々市市2件など）。「お酒に関しては、一部取り扱っていない店舗がございます」と記載", "https://www.kaitori-daikichi.jp/list/sake/store/isikawa-ken/"),
        ("バイセル（出張）", "「金沢市、七尾市、小松市、輪島市、珠洲市、加賀市、羽咋市、かほく市、白山市、能美市など石川県全域の各市町村にて対応可能」と記載（県の店舗案内に店舗なし）", "https://buysell-kaitori.com/area/liquor-ishikawa/"),
        ("LINXAS（出張・宅配）", "「石川県は無料出張エリア（中部）」「県内に店舗はありません」と記載", "https://linxas.shop/shops/ishikawa/"),
        ("大黒屋（出張）", "お酒の訪問査定エリアに金沢市・野々市市・白山市・小松市・加賀市・七尾市・輪島市など県内19市町を掲載", "https://kaitori.e-daikoku.com/visit/liquor/"),
    ]),
}


def quick_stores_section(name, pref_key, has_local=True):
    q = QUICK_STORES.get(pref_key)
    if not q:
        return ""
    ck, rows = q
    more = (f'市町村別の全店舗は <a href="#local-stores" className="text-amber-dark underline hover:text-burgundy">{name}内でお酒を買い取る店舗</a> にあります。'
            if has_local else "店舗の一覧は各社公式の店舗一覧（出典リンク）をご覧ください。")
    a = 'target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy"'
    trs = "\n              ".join(
        f'<tr className="border-b border-warm-border/60"><th scope="row" className="px-3 py-2 text-left font-medium">{esc(s)}</th><td className="px-3 py-2">{esc(d)}</td><td className="px-3 py-2 whitespace-nowrap"><a href="{u}" {a}>公式</a></td></tr>'
        for s, d, u in rows)
    y, m, dd = ck.split("-")
    ck_ja = f"{int(y)}年{int(m)}月{int(dd)}日"
    return f'''
      {{/* 0. 持ち込み・出張できる店の早見表（{ck} 公式確認） */}}
      <section aria-labelledby="quick-stores" className="bg-white border-2 border-amber/40 rounded-xl p-5 mb-8 not-prose">
        <h2 id="quick-stores" className="text-lg font-bold text-ink mb-2">{name}でウイスキーを持ち込み・出張で売れる店の早見表（{ck_ja}確認）</h2>
        <p className="text-sm text-ink mb-3 leading-relaxed">各社の公式サイトで{ck_ja}に確認した内容です。{more}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="px-3 py-2">店舗・方式</th><th className="px-3 py-2">所在地・対応範囲（公式の記載）</th><th className="px-3 py-2">出典</th></tr></thead>
            <tbody>
              {trs}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-warm-gray mt-3 leading-relaxed">取扱品目・営業時間・対応エリアは変わることがあります。来店・申し込みの前に各店舗へご確認ください。</p>
      </section>
'''


def gen(pref_key):
    pref = load_pref()[pref_key]
    lb = load_local(pref_key)
    name = pref["name_ja"]; region = pref["region"]; pop = pref["population"]; cities = pref["cities"]
    city_list = cities.split("・")
    brands = json.load(open(os.path.join(ROOT, "data/brands.json"), encoding="utf-8"))
    brands = [b for b in brands if b.get("yahoo_median_jpy_180d")]
    brands.sort(key=lambda b: -b["yahoo_median_jpy_180d"])
    fetched = brands[0].get("yahoo_fetched_at", UPDATED)

    # 銘柄別相場テーブル行
    rows = []
    for b in brands:
        m = b["yahoo_median_jpy_180d"]; lo = r100(m*0.6); hi = r100(m*0.8); n = b.get("yahoo_sample_n", "—")
        rows.append(
            f'<tr><td className="px-3 py-2 font-medium"><Link href="/tier2/{pref_key}/{b["slug"]}-kaitori/" className="text-amber-dark underline hover:text-burgundy">{esc(b["name_ja"])}</Link></td>'
            f'<td className="px-3 py-2 text-right tabular-nums">{yen(m)}</td>'
            f'<td className="px-3 py-2 text-right tabular-nums text-amber-dark">{yen(lo)}〜{yen(hi)}</td>'
            f'<td className="px-3 py-2 text-right tabular-nums text-warm-gray">{n}</td></tr>'
        )
    rows_html = "\n              ".join(rows)

    buyer_rows = []
    for nm, url, desc, ch in BUYERS:
        # 2026-11-05: 和歌山は公式のエリアページ（fuku-chan.info/liquor/area/wakayama/）で確認済み。他県は件数のみ報告（判断待ち）
        if pref_key == "wakayama" and nm == "福ちゃん":
            desc = desc.replace("（出張の対応エリアは公式サイトに記載がありません）", "（公式のエリアページに「和歌山県全域がお酒買取対象エリアです」と記載されています）")
        buyer_rows.append(
            f'<div className="border border-warm-border rounded-xl p-4 bg-white">'
            f'<div className="flex items-center justify-between gap-3 mb-2"><p className="font-bold text-foreground">{nm}</p>'
            f'<span className="text-[11px] text-warm-gray whitespace-nowrap">{ch}</span></div>'
            f'<p className="text-sm text-warm-gray mb-3">{esc(desc)}</p>'
            f'<a href="{url}" target="_blank" rel="noopener noreferrer sponsored" className="block text-center bg-amber-dark text-white text-sm font-bold py-2.5 rounded-lg hover:opacity-90 transition">{nm}の公式サイトで査定する →</a>'
            f'</div>'
        )
    buyers_html = "\n            ".join(buyer_rows)

    # ItemList schema（銘柄ページ・実値の中央値のみ）
    items = [{"@type": "ListItem", "position": i+1, "name": f'{name}の{b["name_ja"]}買取',
              "url": f'https://peatbid.com/tier2/{pref_key}/{b["slug"]}-kaitori/'} for i, b in enumerate(brands)]
    faqs = [
        (f"{name}から宅配買取の集荷に来てもらえますか？",
         f"はい。本記事で紹介している業者はいずれも全国対応の宅配買取に対応しており、{name}（{cities}など県内全域）から集荷を依頼できます。多くの業者は送料・査定料が無料です（最新の条件は各公式サイトでご確認ください）。"),
        ("外箱やギャランティカードがなくても売れますか？",
         "多くの場合、箱や付属品がなくても買取の対象となります。ただし、外箱・冊子・ギャランティカードが揃っていると、業界一般の目安として査定額が10〜20%程度上がる傾向があります。付属品はできるだけ揃えて査定に出すことをおすすめします。"),
        (f"{name}でウイスキーを高く売るためのポイントは何ですか？",
         "3社以上に同時に査定を依頼し、相見積もりで比較することが基本です。付属品を揃える、状態を保つ、終売や限定の銘柄は需要が高い時期に売却する、といった点も査定額に影響します。"),
        ("査定料・送料・キャンセル料はかかりますか？",
         "全国対応の宅配買取では、査定料・送料・キャンセル料が無料の業者が一般的です。ただし、条件は業者・時期により異なるため、申し込み前に各公式サイトで最新の条件を必ずご確認ください。"),
        ("提示された買取額が相場より安い場合は、どうすればよいですか？",
         f"買取額は市場相場（本記事のYahoo中央値）をベースに、各社が在庫・キャンペーン・状態評価・利益率を加味して決めます。業界一般の目安として市場相場の60〜80%程度に収まることが多いため、複数社の見積もりを比較し、根拠を確認したうえでご判断ください。"),
    ]
    faq_html = "\n          ".join(
        f'<details className="border border-warm-border rounded-lg p-4 bg-white"><summary className="font-medium cursor-pointer">{esc(q)}</summary><p className="text-sm text-warm-gray mt-2 leading-relaxed">{esc(a)}</p></details>'
        for q, a in faqs)
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage",
              "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]}
    breadcrumb_ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://peatbid.com/"},
        {"@type": "ListItem", "position": 2, "name": "地域別買取", "item": "https://peatbid.com/tier2/"},
        {"@type": "ListItem", "position": 3, "name": f"{name}のウイスキー買取", "item": f"https://peatbid.com/tier2/{pref_key}/"}]}
    if lb:
        bl = sorted({s["brand"] for s in lb["stores"]})
        faqs.insert(1, (f"{name}内に、店頭でウイスキーを売れる店はありますか？",
            f"あります。PeatBid編集部が{lb.get('checked_label') or lb['checked_at']}に各社公式の店舗ページで確認したところ、{name}内でお酒（洋酒）の買取を受け付けている店舗は{'・'.join(bl)}の計{len(lb['stores'])}店でした（店舗一覧は本ページに掲載）。買取大吉は一部の店舗でお酒を扱っていないと公式に記載しているため、来店前に店舗へご確認ください。"))
        faqs.insert(2, (f"{name}に出張買取に来てもらえますか？",
            "公式サイトに記載がある業者では、" + "／".join(f"{b}：{t}" for b, t, _ in lb["dispatch"]) + "。最新の対応エリアは各社にご確認ください。"))
    article_ld = {"@context": "https://schema.org", "@type": "Article",
                  "headline": f"{name}のウイスキー買取｜実売相場とおすすめ業者【2026年最新】",
                  "datePublished": "2026-05-22", "dateModified": max([fetched] + ([lb["checked_at"]] if lb else []) + ([QUICK_STORES[pref_key][0]] if pref_key in QUICK_STORES else [])),
                  "author": {"@type": "Organization", "name": "PeatBid編集部"},
                  "publisher": {"@type": "Organization", "name": "PeatBid"}}
    itemlist_ld = {"@context": "https://schema.org", "@type": "ItemList", "name": f"{name}のウイスキー銘柄別 実売相場", "itemListElement": items}

    title = f"ウイスキー買取 {name}｜Yahoo実売中央値で見る相場とおすすめ業者【2026年最新】"
    desc = f"{name}でウイスキーを売却する方向けに、Yahoo!オークション過去180日の実落札中央値による銘柄別の相場、買取目安、宅配買取のおすすめ業者の比較、高く売るためのポイントを掲載しています。"

    if lb:
        title = lb.get("title", title)
        desc = lb.get("desc", desc)
    local_html = local_section(name, lb) if lb else ""

    top_brands = "・".join(b["name_ja"] for b in brands[:4])
    page = f'''import type {{ Metadata }} from "next";
import Link from "next/link";

const TITLE = {json.dumps(title, ensure_ascii=False)};
const DESC = {json.dumps(desc, ensure_ascii=False)};
const URL = "https://peatbid.com/tier2/{pref_key}/";

export const metadata: Metadata = {{
  title: TITLE,
  description: DESC,
  alternates: {{ canonical: URL }},
  robots: {{ index: true, follow: true }},
  openGraph: {{ type: "website", siteName: "PeatBid", locale: "ja_JP", title: TITLE, description: DESC, url: URL, images: [{{ url: "/og-image.png", width: 1200, height: 630 }}] }},
}};

const LD = {json.dumps([breadcrumb_ld, article_ld, faq_ld, itemlist_ld], ensure_ascii=False)};

export default function Page() {{
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(LD) }}}} />
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1 flex-wrap">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/tier2/" className="hover:text-amber-dark transition-colors">地域別買取</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">{name}</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">{name}のウイスキー買取｜実売相場とおすすめ業者</h1>
      <p className="text-warm-gray text-sm mb-2">最終更新: {UPDATED} / 編集: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>
{quick_stores_section(name, pref_key, bool(lb))}
      <p className="text-sm text-warm-gray mb-8 leading-relaxed">
        本ページの相場は<strong>Yahoo!オークション過去180日の実落札中央値</strong>（{fetched}時点）にもとづく一次データです。{name}でウイスキーを売却する際の、銘柄別の相場・買取目安、宅配買取のおすすめ業者、高く売るためのポイントをまとめています。
      </p>

      {{/* 1. 結論ボックス */}}
      <div className="border-2 border-amber/40 rounded-xl p-5 mb-10 bg-cream/40">
        <p className="font-bold text-base mb-2">{name}での売却方法について</p>
        <p className="text-sm leading-relaxed mb-4">
          {name}（{region}地方・人口{pop}）は{cities}を中心に二次流通の需要があります。店舗へ持ち込む方法もありますが、<strong>全国対応の宅配買取を利用すると、{name}全域から売却でき、複数社に同時に査定を依頼して比較できます</strong>（送料は多くの業者で無料です）。買取額は市場相場（下記Yahoo中央値）の60〜80%程度が業界一般の目安です。
        </p>
        <a href="#osusume" className="inline-block bg-amber-dark text-white text-sm font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition">おすすめの宅配買取業者を見る →</a>
        <p className="text-[10px] text-warm-gray mt-2">本ページは広告（アフィリエイト）を含みます。</p>
      </div>

      {{/* 2. 銘柄別 実売相場テーブル */}}
      <h2 id="souba" className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}のウイスキー銘柄別 実売相場（Yahoo中央値）</h2>
      <p className="text-sm text-warm-gray mb-4 leading-relaxed">
        過去180日のYahoo!オークション実落札データの中央値です（{fetched}時点）。<strong>買取目安</strong>は中央値の60〜80%で算出した業界一般の参考値であり、実際の買取額は業者・状態・時期により変動します。銘柄名をタップすると{name}向けの詳細ページへ移動します。
      </p>
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-cream/60 text-left">
            <th className="px-3 py-2">銘柄</th><th className="px-3 py-2 text-right">実売中央値</th>
            <th className="px-3 py-2 text-right">買取目安</th><th className="px-3 py-2 text-right">サンプル数</th>
          </tr></thead>
          <tbody className="divide-y divide-warm-border">
              {rows_html}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-warm-gray mb-12">※中央値＝過去180日のYahoo!オークション落札価格の中央値（外れ値除外後）。買取目安は中央値×60〜80%の参考レンジで、買取額を保証するものではありません。</p>

      {{/* 3. 高価買取のコツ */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}でウイスキーを高く売る4つのポイント</h2>
      <ul className="space-y-3 text-sm leading-relaxed mb-12">
        <li><strong>① 複数社で相見積もりを取る</strong>：3社以上、できれば4〜5社に同時に査定を依頼します。同じ銘柄でも在庫・キャンペーン・査定基準の違いで、業界目安として10〜20%の差が出ることがあります。</li>
        <li><strong>② 付属品を揃える</strong>：外箱・冊子・カートン・ギャランティカードが揃うと、業界一般の目安として査定額が10〜20%上がる傾向があります。購入時の状態を保ってください。</li>
        <li><strong>③ 状態を保つ</strong>：ラベルの傷み・液面の低下・キャップの状態は評価の対象です。直射日光・高温多湿を避けて保管します。</li>
        <li><strong>④ 需要の高い時期に売る</strong>：終売・限定・ヴィンテージは需要が高く、海外オークションの上昇局面では国内査定も上がりやすい傾向があります。</li>
      </ul>

      {{/* 4. 売却方法の比較 */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">売却方法の比較（宅配・出張・店頭）</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-cream/60 text-left"><th className="px-3 py-2">方式</th><th className="px-3 py-2">手間</th><th className="px-3 py-2">スピード</th><th className="px-3 py-2">適している方</th></tr></thead>
          <tbody className="divide-y divide-warm-border">
            <tr><td className="px-3 py-2 font-medium">宅配買取</td><td className="px-3 py-2">小（自宅で完結）</td><td className="px-3 py-2">数日</td><td className="px-3 py-2">{name}全域の方・本数が多い方・相見積もりを重視する方</td></tr>
            <tr><td className="px-3 py-2 font-medium">出張買取</td><td className="px-3 py-2">小（自宅査定）</td><td className="px-3 py-2">最短即日</td><td className="px-3 py-2">本数が多い方・持ち運びが難しい方・対面で売却したい方</td></tr>
            <tr><td className="px-3 py-2 font-medium">店頭買取</td><td className="px-3 py-2">中（持込）</td><td className="px-3 py-2">即日</td><td className="px-3 py-2">近隣に店舗があり、少量を売却したい方</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-warm-gray mb-12 leading-relaxed">{name}では、全域から利用できる宅配買取をおすすめします。<strong>宅配買取の流れ：①申し込み → ②梱包キット等で梱包 → ③集荷（送料無料が一般的）→ ④査定 → ⑤入金</strong>。査定額に納得できない場合はキャンセルできます（条件は各社にご確認ください）。</p>

      {{/* 5. 県の売却事情 */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}でウイスキーを売るときのポイント</h2>
      <p className="text-sm text-warm-gray mb-12 leading-relaxed">
        {name}は{region}地方の人口{pop}の県で、{cities}などに人口が集まっています。地域の特徴：{pref["demand"]}。大型のウイスキー専門買取店は都市部に集中する傾向があるため、{name}では<strong>全国対応の宅配・出張買取を活用すると、エリアを問わず複数社の査定を比較できます</strong>。古物営業法により売却時は本人確認書類（運転免許証・マイナンバーカード等）が必要です。
      </p>

{local_html}      {{/* 6. おすすめ業者比較 */}}
      <h2 id="osusume" className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}に対応するおすすめの宅配買取業者</h2>
      <p className="text-sm text-warm-gray mb-4 leading-relaxed">いずれも全国対応で{name}から依頼できます。買取額は変動するため固定の金額は掲載せず、最新の査定額・キャンペーンは各公式サイトでご確認ください。<strong>複数社への同時査定</strong>をおすすめします。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {buyers_html}
      </div>

      {{/* 7. FAQ */}}
      <h2 className="font-display text-xl md:text-2xl font-semibold mt-10 mb-3">{name}のウイスキー買取 よくある質問</h2>
      <div className="space-y-3 mb-12">
          {faq_html}
      </div>

      {{/* 8. 方法論・運営 */}}
      <div className="border-t border-warm-border pt-6 text-xs text-warm-gray leading-relaxed">
        <p className="mb-2"><strong>相場データについて</strong>：本ページの「実売中央値」は、Yahoo!オークションの過去180日の落札価格を収集し、外れ値を除外した中央値です（{fetched}時点・銘柄ごとにサンプル数を表示）。買取目安は中央値×60〜80%で算出した業界一般の参考値で、実際の買取額・査定額を保証するものではありません。最新の正確な金額は各買取業者の公式サイトでご確認ください。</p>
        <p>運営：PeatBid編集部 ／ 本ページは広告（アフィリエイト）を含みます。掲載業者・条件は変動する場合があります。</p>
      </div>
    </div>
  );
}}
'''
    out = os.path.join(ROOT, f"app/tier2/{pref_key}/page.tsx")
    open(out, "w", encoding="utf-8").write(page)
    print(f"generated {out} ({len(brands)} brands, {len(BUYERS)} buyers)")

if __name__ == "__main__":
    for k in sys.argv[1:]:
        gen(k)
