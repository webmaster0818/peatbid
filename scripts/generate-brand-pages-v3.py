#!/usr/bin/env python3
"""
v3: Plan A compliant brand-kaitori pages.
- Primary price: Yahoo Auctions 180-day median (no fabricated buyback estimates).
- State variations: industry rule-of-thumb percentages only (no derived yen amounts).
- Dealer pricing: link-only (LINXAS, バイセル, 福ちゃん).
- Insufficient sample (n<20) → "市場相場データ不足" mode.
"""
import csv
import datetime
import re
from pathlib import Path

# フュージョン打ち手②: 機会バンド(GSC pos8-30×imp30+)のtitle刷新＋12週スパークライン＋FAQ強化
from opportunity_band import (
    BAND_BRAND_SLUGS,
    PRECHECK_SLUGS,
    UPDATE_NOTE,
    band_latest,
    DATA_QUALITY_EXCLUDE,
    band_title,
    load_price_history,
    sparkline_block,
)
# 成長ルーチン 2026-10-11: 買取店の掲示価格（店舗別比較・月次推移・定価）＝ data/store-prices.json
import store_prices

# 週次cronで再生成されるため、生成時点の年月がそのままタイトル鮮度になる
_NOW = datetime.date.today()
MONTH_TAG = f"【{_NOW.year}年{_NOW.month}月最新】"

ROOT = Path(__file__).parent.parent
DATA = ROOT / "data" / "brands.csv"
OUT_DIR = ROOT / "app" / "articles"

with open(DATA, "r", encoding="utf-8") as f:
    BRANDS = list(csv.DictReader(f))


HUB_FAMILIES = {"yamazaki": "山崎", "hibiki": "響", "hakushu": "白州", "macallan": "マッカラン", "ichirosu": "イチローズモルト", "bowmore": "ボウモア", "springbank": "スプリングバンク", "glenfarclas": "グレンファークラス", "ardbeg": "アードベッグ"}

# N1② 強化クラスタ（年代指定なし/NVの注目銘柄・カテゴリ横断で相互リンク集中）。
# 勝ちページ(山崎/白州NV)⇄スコッチNVクラスタを全kaitoriページから相互リンクし内部リンクを集中させる。
CLUSTER = [
    ("yamazaki-nv", "山崎ノンエイジ（NV・年代指定なし）"),
    ("hakushu-nv", "白州ノンエイジ（NV・年代指定なし）"),
    ("glenfarclas-105", "グレンファークラス105（カスクストレングス・年代指定なし）"),
    # N3①（2026-08-29）年数ページ→NV受け皿へ差し替え。
    # 「年代指定なし 買取」がpos3.4〜9.7で表示されているのに0クリックだったのは、
    # この枠に年数ページが入っていて被リンクが2倍あり、Googleが年数ページを出していたため。
    ("glenfarclas-nv", "グレンファークラスの年代指定なし（NV）"),
    ("springbank-nv", "スプリングバンクの年代指定なし（NV）"),
    ("bowmore-nv", "ボウモアの年代指定なし（NV）"),
    ("ardbeg-nv", "アードベッグの年代指定なし（NV）"),
    ("talisker-nv", "タリスカーの年代指定なし（NV）"),
    ("laphroaig-nv", "ラフロイグの年代指定なし（NV）"),
    ("glenfiddich-30", "グレンフィディック30年"),
    # N2（2026-08-27）「グレンフィディック 買取」(年数なし)が30年ページに着地していた。
    # ハブ /articles/glenfiddich-kaitori/ は被リンク1本しかなく受け皿になれていなかった。
    ("glenfiddich", "グレンフィディック（年代別の一覧）"),
    # N3②（2026-08-29）「グレンモーレンジ 年代指定なし 買取」pos8.0 等がシグネット単体の
    # ページに着地して0クリックだった。ラインナップ横断の受け皿を新設して受ける。
    ("glenmorangie", "グレンモーレンジ（ラインナップ別の一覧）"),
    # 2026-10-20「竹鶴 買取」20.3位(imp126) が25年ページに着地。受け皿の taketsuru-pure は
    # 「Discovered - currently not indexed」だった。ピュアモルト・12年〜35年の一覧ハブ（手書き）を新設して受ける。
    ("taketsuru", "竹鶴（ピュアモルト・12年〜35年の一覧）"),
]

# N1（2026-08-24）: 「◯◯ 年代指定なし 買取」クエリが、同じブランドの年数ページに着地して
# 0クリックになっていた（GSC実測 1,457imp/0click）。原因は内部リンクの偏りで、
# CLUSTER に入っている yamazaki-nv / hakushu-nv だけが被リンク63〜64本を持ち、
# 他のNVページは3〜7本しかないため、Googleが同ブランドの年数ページを代わりに出していた。
# → 実在するNVページを全ページから相互リンクして、受け皿を入れ替える。
# ⚠️ スコッチ系のNVページは手書き（brands.csvに無い＝週次再生成の対象外）なので、
#    ここのリストとページの実在は手動で対応させること。増減したら両方を直す。
NV_PAGES = [
    ("yamazaki-nv", "山崎"),
    ("hakushu-nv", "白州"),
    ("hibiki-nv", "響"),
    ("yoichi-nv", "余市"),
    ("miyagikyo-nv", "宮城峡"),
    ("bowmore-nv", "ボウモア"),
    ("ardbeg-nv", "アードベッグ"),
    ("laphroaig-nv", "ラフロイグ"),
    ("talisker-nv", "タリスカー"),
    ("glenfarclas-nv", "グレンファークラス"),
    ("springbank-nv", "スプリングバンク"),
    # N2（2026-08-27）竹鶴は「竹鶴ピュアモルト」が年代指定なしの実体（-nvページは作らない）。
    # 「竹鶴 買取」が25年ページに着地していたため、受け皿としてここに載せて全ページから張る。
    ("taketsuru-pure", "竹鶴"),
]
# ⚠️ スラッグの接尾辞は "-nv" とは限らない（竹鶴は "-pure"）。ファミリー名は先頭要素で取る。
NV_FAMILIES = {slug.split("-")[0]: (slug, label) for slug, label in NV_PAGES}

def md_to_html(text):
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    normalized = text.replace('\\n', '\n')
    if re.search(r'\b1\.\s', normalized):
        m = re.search(r'(.*?)\b1\.\s+(.+)$', normalized, re.DOTALL)
        if m:
            intro = m.group(1).strip()
            rest = m.group(2)
            items_split = re.split(r'\s+(\d+)\.\s+', rest)
            items = [items_split[0].strip()]
            i = 1
            while i + 1 < len(items_split):
                items.append(items_split[i + 1].strip())
                i += 2
            items = [it for it in items if it]
            if len(items) >= 2:
                items_html = ''.join(f'<li>{item}</li>' for item in items)
                if intro:
                    return f'<p>{intro}</p><ol>{items_html}</ol>'
                return f'<ol>{items_html}</ol>'
    if '\n' in normalized:
        paragraphs = normalized.split('\n\n')
        out = []
        for p in paragraphs:
            p = p.strip().replace('\n', '<br/>')
            if p:
                out.append(f'<p>{p}</p>')
        return ''.join(out)
    return f'<p>{normalized}</p>'


def fmt(n):
    n = int(n)
    if n >= 10_000_000:
        return f"{n//10000:,}万円"
    if n >= 1_000_000:
        return f"{n//10000}万円"
    return f"{n:,}円"


CAT_LABEL = {
    "japanese-whisky": "ジャパニーズウイスキー",
    "scotch-whisky": "スコッチウイスキー",
}


RARITY_DETAILED = {
    "common": "現行品として安定して流通している銘柄帯です。銘柄によってはプレミア価格が付く場合があり、コレクターの入門品として安定した需要があります。",
    "mid": "終売・休売後の供給制限により、価格が上昇傾向にある銘柄帯です。市場の流通量は徐々に減少しており、二次流通価格は年単位で15〜30%上昇する傾向があります。",
    "high": "希少性と国際的な評価により、二次流通市場で高値が定着している銘柄帯です。コレクターや投資目的の需要に支えられています。",
    "ultra": "極めて希少な長期熟成銘柄です。Sotheby's・Bonhamsなどの海外オークションの落札データが査定の基準となり、主な購入層は富裕層やコレクターです。",
    "ultra-rare": "市場の流通量が極めて少ない銘柄、または閉鎖蒸溜所のボトルです。1本数百万円〜数千万円で取引される例があり、各国のオークションで注目されています。",
}


# Distillery profiles
DISTILLERY_INFO = {
    "山崎蒸溜所": "1923年（大正12年）にサントリーが京都・山崎に開設した、日本最初の本格モルトウイスキー蒸溜所です。三方を山に囲まれた湿潤な気候のもと、千利休が茶の湯に使ったとされる湧水「離宮の水」を仕込み水に用いています。山崎は日本のウイスキー文化発祥の地とされ、国際的にも高く評価されています。",
    "白州蒸溜所": "1973年（昭和48年）にサントリーが山梨県北杜市・南アルプス山系の麓に開設した蒸溜所です。標高約700メートルの森林に囲まれた立地で、ミネラル分の少ない軟水を使用しています。「森のウイスキー」と称される、爽やかで軽快な味わいが特徴です。",
    "サントリー": "1899年創業のサントリーホールディングスは、日本最大のウイスキーメーカーです。山崎・白州・知多の3つの蒸溜所を運営し、響をはじめとするブレンデッドウイスキーで国際的な評価を得ています。",
    "余市蒸溜所": "1934年（昭和9年）にニッカウヰスキーの竹鶴政孝が北海道余市に開設した蒸溜所です。スコットランドに似た冷涼な気候と、海風・石炭直火蒸溜による力強くピーティな味わいが特徴です。",
    "宮城峡蒸溜所": "1969年（昭和44年）にニッカウヰスキーが宮城県仙台市・新川渓谷に開設した、同社2番目の蒸溜所です。穏やかな気候と軟水による、フルーティで華やかな味わいが特徴です。余市とは対照的な、軽やかなモルト原酒を生産しています。",
    "ニッカ": "1934年に竹鶴政孝が創業した「大日本果汁株式会社」を起源とする、日本の主要ウイスキーメーカーの一つです。余市・宮城峡の2つの蒸溜所を運営し、竹鶴・余市・宮城峡などの銘柄を製造しています。",
    "ベンチャーウイスキー": "2007年に肥土伊知郎氏が埼玉県秩父に設立した独立系蒸溜所です。閉鎖した羽生蒸溜所の原酒を活用しながら、秩父蒸溜所で独自のクラフトウイスキーを生産しています。「イチローズモルト」ブランドは、国内外のコレクターから高い評価を得ています。",
    "軽井沢蒸溜所": "1955年〜2000年に長野県軽井沢で稼働し、現在は閉鎖されている蒸溜所です。残存するボトルは各国のオークションで取引され、1本数百万円から数千万円の価格が付く例があります。",
    "羽生蒸溜所": "1980年代〜2000年に埼玉県羽生で稼働し、現在は閉鎖されている蒸溜所です。残された原酒はベンチャーウイスキーが引き継ぎ、「イチローズモルト カードシリーズ」としてリリースされました。同シリーズは1セット数千万円で取引される例があります。",
    "秩父蒸溜所": "ベンチャーウイスキーが埼玉県秩父に設立したクラフト蒸溜所です。2008年に蒸溜を開始し、最初のリリースである「ザ・ファースト」は希少銘柄として知られています。",
    "信州マルス蒸溜所": "本坊酒造が長野県で運営する蒸溜所です。標高800メートルを超える高地の冷涼な気候を活かした熟成が特徴です。",
    "スペイサイド": "スコットランド北東部のスペイ川流域を中心とした、世界最大のウイスキー生産地です。マッカラン・グレンフィディック・グレンファークラス・グレンリヴェットなどの蒸溜所が集まっており、フルーティで華やかな味わいが特徴です。",
    "アイラ": "スコットランド西海岸のアイラ島は、ピートを効かせたウイスキーの産地として知られています。ボウモア・ラフロイグ・アードベッグ・ラガヴーリンなど、スモーキーな味わいで知られる蒸溜所があります。",
    "キャンベルタウン": "スコットランド南西部のキャンベルタウンは、かつて30以上の蒸溜所が稼働したウイスキーの産地です。現在稼働しているのはスプリングバンクなど数か所のみで、希少価値が高いとされています。",
    "ハイランド": "スコットランド北部・中央部の広い地域です。グレンモーレンジ・ダルモア・グレンドロナックなど、フルーティで複雑な味わいの蒸溜所があります。",
    "スカイ": "スコットランド西海岸のスカイ島です。タリスカー蒸溜所が代表的なシングルモルト蒸溜所として知られ、スモーキーで力強い味わいが特徴です。",
}


# Tasting notes by category × age tier
TASTING_NOTES = {
    "japanese-whisky": {
        "young": "リンゴ・洋ナシなどのフレッシュな果実の香りが軽やかに広がり、バニラ・蜂蜜の柔らかな甘みがあります。フィニッシュは短めから中程度で、飲みやすい味わいです。",
        "mid": "レーズン・プラムなどのドライフルーツ、シナモン・クローブのスパイス、ミズナラ樽由来の伽羅・白檀を思わせる香りがあります。ふくよかな甘みと長いフィニッシュが特徴です。",
        "old": "シェリー樽由来のドライフルーツケーキ、ダークチョコレート、煙草の葉、ミズナラ樽由来のオリエンタルな香りがあります。複雑な味わいで、長いフィニッシュが続きます。",
    },
    "scotch-whisky": {
        "young": "シェリー樽またはバーボン樽の特徴が素直に表れた、若々しい味わいです。フルーツ・蜂蜜・バニラの香りがあります。",
        "mid": "シェリー樽熟成ではドライフルーツ・スパイス、バーボン樽熟成ではバニラ・キャラメル・フルーツの香りが調和し、樽の個性による深みがあります。",
        "old": "長期熟成による複雑な味わいです。シェリー由来のダークフルーツ、ピート由来のスモーキーさ、樽材のオーク・タンニンが一体となっています。",
    },
}


def get_tasting_note(category, age):
    if age == 0:
        return TASTING_NOTES.get(category, TASTING_NOTES["japanese-whisky"])["young"]
    if age <= 15:
        return TASTING_NOTES.get(category, TASTING_NOTES["japanese-whisky"])["young"]
    if age <= 21:
        return TASTING_NOTES.get(category, TASTING_NOTES["japanese-whisky"])["mid"]
    return TASTING_NOTES.get(category, TASTING_NOTES["japanese-whisky"])["old"]


def get_hero_image(slug):
    """Plan A 改訂: 各銘柄の実商品画像（public/images/heroes/{slug}.png）を使用。"""
    hero_path = ROOT / "public" / "images" / "heroes" / f"{slug}.png"
    if hero_path.exists():
        return f"/images/heroes/{slug}.png"
    # フォールバック: カテゴリ別の汎用画像
    if any(k in slug for k in ["yamazaki", "hakushu", "yoichi", "miyagikyo", "ichirosu", "karuizawa", "hanyu", "chichibu", "mars", "taketsuru", "hibiki"]):
        return "/images/article-yamazaki.png"
    return "/images/article-hibiki.png"


PARTNERS_DETAILED = [
    {
        "name": "ヒカカク！",
        "url": "https://hikakaku.com",
        "method": "一括査定",
        "intro": "ヒカカク！は、最大20社の買取業者に一括で見積もりを依頼できる比較サービスです。希少銘柄ほど業者間の査定差が大きくなるため、**相場の把握**を目的とした利用に適しています。",
        "strengths": ["最大20社から一括査定（公式）", "査定は無料で、査定額に納得できない場合は買取を依頼する必要はありません", "ウイスキー・洋酒・ブランデーに対応"],
        "best_for": "**複数社の査定額を比較したい方** / 初めて売却する方",
    },
    {
        "name": "バイセル",
        "url": "https://buysell-kaitori.com/liquor/japanese-whisky/",
        "method": "出張/店頭/宅配",
        "intro": "東証グロース上場のBuySell Technologiesが運営。累計買取点数4,800万点以上（2015〜2025年の合計・公式）の買取大手で、お酒・ウイスキーの買取に対応しています。**大手の業者に出張買取を依頼したい場合**に適しています。",
        "strengths": ["東証グロース上場企業が運営", "出張・店頭・宅配の3つの方式に対応", "テレビCMを放映している大手"],
        "best_for": "**大手の業者に依頼したい方**",
    },
    {
        "name": "リカスタ",
        "url": "https://www.licasta.com/",
        "method": "宅配/出張/店頭",
        "intro": "宅配・出張・店頭で買取を受け付けているお酒の買取サービスです。**店舗に行く時間がない方・地方にお住まいの方**に適しています。査定料・キャンセル料は無料です。",
        "strengths": ["全国から宅配買取を受付", "査定料・キャンセル料は無料", "送料・梱包キットは無料"],
        "best_for": "**宅配で売却したい方** / 地方にお住まいの方",
    },
]


def state_table_rows_pct():
    """業界一般の目安。(状態, 付属品, ％ラベル, lo%, hi%)。loが0=単一値(95-100は95,100)。"""
    return [
        ("未開封・付属品完備", "箱・冊子・カートン揃い", "市場相場の95〜100%程度", 95, 100),
        ("未開封・箱なし", "ラベル良好", "市場相場の80〜90%程度", 80, 90),
        ("未開封・冊子なし", "外箱あり", "市場相場の85〜95%程度", 85, 95),
        ("未開封・ラベル軽度汚れ", "付属あり", "市場相場の75〜88%程度", 75, 88),
        ("未開封・ラベル損傷", "付属あり", "市場相場の60〜75%程度", 60, 75),
        ("未開封・液面減少", "やや進行", "市場相場の55〜70%程度", 55, 70),
        ("開封済み・9割以上残", "付属あり", "市場相場の30〜40%程度", 30, 40),
        ("開封済み・半分以下残", "付属あり", "市場相場の15〜25%程度", 15, 25),
    ]


def yen_range_pct(median, lo, hi):
    a = int(round(median * lo / 100.0, -1))
    z = int(round(median * hi / 100.0, -1))
    return f"約{a:,}〜{z:,}円"


def render_page(b, all_brands):
    slug_base = b["slug"]
    name = b["name_ja"]
    name_en = b["name_en"]
    category = b["category"]
    cat_label = CAT_LABEL.get(category, "ウイスキー")
    origin = b["origin"]
    age = int(b["age_years"]) if b["age_years"] else 0
    abv = b["abv"]
    bottle_size = b["bottle_size_ml"]
    rarity = b["rarity_tier"]
    description = b["description"]
    age_label = f"{age}年熟成" if age > 0 else "ノンエイジ（NV）"

    # Plan A: Yahoo Auctions median (fact-based), or "insufficient data" mode
    median_raw = b.get("yahoo_median_jpy_180d", "").strip()
    sample_n_raw = b.get("yahoo_sample_n", "0").strip()
    fetched_at = b.get("yahoo_fetched_at", "").strip() or "—"
    has_median = bool(median_raw) and median_raw.isdigit() and int(median_raw) > 0
    yahoo_median = int(median_raw) if has_median else None
    sample_n = int(sample_n_raw) if sample_n_raw.isdigit() else 0
    sufficient = has_median and sample_n >= 20

    hero = get_hero_image(slug_base)
    distillery_image = "/images/distillery-japanese.png" if category == "japanese-whisky" else "/images/distillery-scotch.png"
    distillery_info = DISTILLERY_INFO.get(origin, f"{origin}は、{cat_label}の蒸溜所・メーカーです。")
    tasting = get_tasting_note(category, age)
    rarity_detailed = RARITY_DETAILED.get(rarity, "")
    rarity_label_map = {"common": "コモン", "mid": "ミッド", "high": "ハイ", "ultra": "ウルトラ", "ultra-rare": "ウルトラレア"}
    rarity_label = rarity_label_map.get(rarity, rarity.upper())

    # 2026-10-16: 複数エディションがある銘柄（ブラックボウモア等）は brands.csv の origin/age/abv が誤記になるため、
    # data/store-prices.json の profile がある slug だけ表示を差し替える（無い slug は従来どおり＝無変更）。
    _pf = store_prices.profile(slug_base)
    spec_age = _pf.get("age_label", age_label)
    spec_abv = _pf.get("abv", f"{abv}%")
    spec_size = _pf.get("size", f"{bottle_size}ml")
    if _pf:
        origin = _pf.get("maker", origin)
        age_label = _pf.get("age_short", age_label)
    summary_p = _pf.get("summary") or f"{name}は{cat_label}の代表的な銘柄の一つで、{origin}が手がける{age_label}のボトルです。{description}。"
    distillery_extra = f"\n          <p>{_pf['distillery_extra']}</p>\n" if _pf.get("distillery_extra") else ""
    tasting_intro = "" if _pf.get("tasting") else f"<p>{name}の味わいは、熟成期間中に樽から溶け出した成分と、{origin}の蒸溜技術によって形成されています。</p>"
    if _pf.get("tasting"):
        tasting = _pf["tasting"]
    if _pf.get("rarity_text"):
        rarity_detailed = _pf["rarity_text"]

    rows = state_table_rows_pct()

    # Related brands (same category, sorted by Yahoo median, top 6)
    def _related_sort_key(x):
        v = x.get("yahoo_median_jpy_180d", "").strip()
        return int(v) if v.isdigit() else 0
    related = sorted(
        [x for x in all_brands if x["category"] == category and x["slug"] != slug_base],
        key=_related_sort_key,
        reverse=True,
    )[:6]
    related_links_parts = []
    for r in related:
        rmed = r.get("yahoo_median_jpy_180d", "").strip()
        rmed_label = f"市場相場 {fmt(int(rmed))}" if rmed.isdigit() and int(rmed) > 0 else "市場相場データ集計中"
        related_links_parts.append(
            f'            <Link href="/articles/{r["slug"]}-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">{r["name_ja"]} の買取相場</p><p className="text-xs text-warm-gray mt-1">{rmed_label}</p></Link>'
        )
    related_links = "\n".join(related_links_parts)

    # N1（2026-08-24）年代指定なしページ一覧（自ページは除外）。全kaitoriページから相互リンクする。
    nv_index_links = "\n".join(
        f'              <li><Link href="/articles/{sl}-kaitori/" className="text-amber-dark hover:underline">{lb}の年代指定なし（ノンエイジ／NV）買取相場</Link></li>'
        for sl, lb in NV_PAGES if sl != slug_base
    )

    # N1② カテゴリ横断クラスタ相互リンク（自ページは除外）
    cluster_links = "\n".join(
        f'              <li><Link href="/articles/{c[0]}-kaitori/" className="text-amber-dark hover:underline">{c[1]}の買取相場</Link></li>'
        for c in CLUSTER if c[0] != slug_base
    )

    # Angle links for this brand
    angle_links_inline = [
        ("takaku-uru", "高価売却のポイント"),
        ("nisemono-mikata", "売る前チェック（真贋と相場）" if slug_base in PRECHECK_SLUGS else "偽物の見分け方"),
        ("ranking", "買取業者ランキング"),
        ("rekishi", "歴史と特徴"),
        ("kihaku", "希少性・投資価値"),
        ("auction-suii", "オークション推移"),
        ("kaifu-zumi", "開封済みボトルの買取"),
        ("hako-nashi", "箱なしボトルの買取"),
        ("label-yogore", "ラベル汚れがある場合の査定"),
    ]
    _fam = slug_base.split("-")[0]
    _hub_li = (f'              <li><Link href="/articles/{_fam}-nisemono-mikata/" className="text-amber-dark hover:underline font-bold">{HUB_FAMILIES[_fam]}（全種）の偽物の見分け方</Link></li>\n') if _fam in HUB_FAMILIES else ""
    angle_links_html = _hub_li + "\n".join(
        f'              <li><Link href="/articles/{slug_base}-{a[0]}/" className="text-amber-dark hover:underline">{name}の{a[1]}</Link></li>'
        for a in angle_links_inline
    )

    if sufficient:
        yen_th = "<th>概算額（中央値基準）</th>"
        rows_html = "\n".join(
            f'                <tr><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><strong>{yen_range_pct(yahoo_median, r[3], r[4])}</strong></td></tr>'
            for r in rows
        )
    else:
        yen_th = ""
        rows_html = "\n".join(
            f'                <tr><td>{r[0]}</td><td>{r[1]}</td><td><strong>{r[2]}</strong></td></tr>'
            for r in rows
        )

    # Partners detailed reviews
    partners_html_blocks = []
    for i, p in enumerate(PARTNERS_DETAILED, 1):
        strengths_html = "".join(f"<li>{s}</li>" for s in p["strengths"])
        block = f'''          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">{i}位: {p["name"]}</h3>
              <span className="text-xs text-amber-dark tracking-wider">{p["method"]}</span>
            </div>
            <div dangerouslySetInnerHTML={{{{ __html: `{md_to_html(p["intro"])}` }}}} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside">{strengths_html}</ul>
            <div dangerouslySetInnerHTML={{{{ __html: `{md_to_html("おすすめの方: " + p["best_for"])}` }}}} className="mt-2 text-sm" />
            <a href="{p["url"]}" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">{p["name"]}の無料査定を申し込む →</a>
          </div>'''
        partners_html_blocks.append(block)
    partners_html = "\n".join(partners_html_blocks)

    # Plan A: FAQ uses Yahoo median directly when available; falls back to generic guidance otherwise.
    if sufficient:
        market_str = f"{fmt(yahoo_median)}（Yahoo Auctions 過去180日の落札中央値、サンプル数 n={sample_n}、取得日 {fetched_at}）"
        market_short = fmt(yahoo_median)
    else:
        market_str = "過去180日の落札データが20件に満たないため、市場相場の中央値は掲載していません"
        market_short = "市場相場データ集計中"

    hako_yen = f"（{yen_range_pct(yahoo_median, 80, 90)}）" if sufficient else ""
    is_nv = slug_base.endswith("-nv") or slug_base.endswith("-105")
    nv_base_name = name.replace("ノンエイジ", "").replace("105", "").replace("（NV）", "").strip()
    nv_note = (
        f'<p>なお、{name}はラベルに熟成年数の表記がないボトルで、オークションや買取店では「<strong>{nv_base_name} 年代指定なし</strong>」「<strong>{nv_base_name} NV（ノンヴィンテージ）</strong>」とも表記されます。いずれも本ページの相場を目安としてご利用いただけます。</p>'
        if is_nv else ""
    )

    # 打ち手③（2026-07-04）: 買取ページ→買取前チェック（真贋）への相互リンク。
    # class "kaitori-to-shingan" は GA4測定ID設定後のクリック計測配線用フック。
    precheck_callout = ""
    if slug_base in PRECHECK_SLUGS:
        precheck_callout = f'''
          <div className="bg-burgundy/5 border border-burgundy/30 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">売却前の真贋確認については、次のページをご覧ください → <Link href="/articles/{slug_base}-nisemono-mikata/" className="kaitori-to-shingan text-amber-dark underline font-bold">{name}を売る前に｜本物チェックと今の買取相場（3分チェック）</Link></p>
          </div>
'''

    # ②積み残し（2026-07-04）: グレンファークラス 25年⇄105 の意図分離導線
    # （「年代指定なし」クエリの glenfarclas-25 誤着地を 105 ページへ振り分け。逆向きも明示）
    # 誤着地対策の意図分岐callout。値=(リンク先の完全パス, リード文, リンクラベル)
    # 2026-07-11拡張: 年代付き→NV導線(NVが機会バンド主役のため)＋スコッチ系→NVハブ。hrefは完全パス形式。
    INTENT_SPLIT = {
        "glenfarclas-25": ("/articles/glenfarclas-105-kaitori/", "年代表記のないグレンファークラス（「105」「年代指定なし」と呼ばれるカスクストレングスのボトル）をお探しの方はこちら", "グレンファークラス105（年代指定なし）の買取相場ガイド"),
        "glenfarclas-105": ("/articles/glenfarclas-25-kaitori/", "「25年」など熟成年数の表記があるグレンファークラスをお探しの方はこちら", "グレンファークラス25年の買取相場ガイド"),
        # 日本5銘柄: 年代付き→NV（年代表記のないボトルの誤着地受け）
        "yamazaki-12": ("/articles/yamazaki-nv-kaitori/", "年代表記のない「山崎」（ノンエイジ／NV）をお探しの方はこちら", "山崎ノンエイジの買取相場ガイド"),
        "yamazaki-18": ("/articles/yamazaki-nv-kaitori/", "年代表記のない「山崎」（ノンエイジ／NV）をお探しの方はこちら", "山崎ノンエイジの買取相場ガイド"),
        "yamazaki-25": ("/articles/yamazaki-nv-kaitori/", "年代表記のない「山崎」（ノンエイジ／NV）をお探しの方はこちら", "山崎ノンエイジの買取相場ガイド"),
        "hakushu-12": ("/articles/hakushu-nv-kaitori/", "年代表記のない「白州」（ノンエイジ／NV）をお探しの方はこちら", "白州ノンエイジの買取相場ガイド"),
        "hakushu-18": ("/articles/hakushu-nv-kaitori/", "年代表記のない「白州」（ノンエイジ／NV）をお探しの方はこちら", "白州ノンエイジの買取相場ガイド"),
        "hibiki-17": ("/articles/hibiki-nv-kaitori/", "年代表記のない「響」（Japanese Harmony等のNV）をお探しの方はこちら", "響ノンエイジの買取相場ガイド"),
        "hibiki-21": ("/articles/hibiki-nv-kaitori/", "年代表記のない「響」（Japanese Harmony等のNV）をお探しの方はこちら", "響ノンエイジの買取相場ガイド"),
        "hibiki-30": ("/articles/hibiki-nv-kaitori/", "年代表記のない「響」（Japanese Harmony等のNV）をお探しの方はこちら", "響ノンエイジの買取相場ガイド"),
        "yoichi-10": ("/articles/yoichi-nv-kaitori/", "年代表記のない「余市」（ノンエイジ／NV）をお探しの方はこちら", "余市NV（ノンエイジ）の買取価格｜4店の掲示価格・月別推移"),
        "yoichi-15": ("/articles/yoichi-nv-kaitori/", "年代表記のない「余市」（ノンエイジ／NV）をお探しの方はこちら", "余市NV（ノンエイジ）の買取価格｜4店の掲示価格・月別推移"),
        "yoichi-20": ("/articles/yoichi-nv-kaitori/", "年代表記のない「余市」（ノンエイジ／NV）をお探しの方はこちら", "余市NV（ノンエイジ）の買取価格｜4店の掲示価格・月別推移"),
        "miyagikyo-12": ("/articles/miyagikyo-nv-kaitori/", "年代表記のない「宮城峡」（ノンエイジ／NV）をお探しの方はこちら", "宮城峡ノンエイジの買取相場ガイド"),
        "miyagikyo-15": ("/articles/miyagikyo-nv-kaitori/", "年代表記のない「宮城峡」（ノンエイジ／NV）をお探しの方はこちら", "宮城峡ノンエイジの買取相場ガイド"),
        # NV→年代付き代表（逆方向の回遊）
        "yamazaki-nv": ("/articles/yamazaki-12-kaitori/", "「12年」など熟成年数の表記がある山崎をお探しの方はこちら", "山崎12年の買取相場ガイド"),
        "hakushu-nv": ("/articles/hakushu-12-kaitori/", "「12年」など熟成年数の表記がある白州をお探しの方はこちら", "白州12年の買取相場ガイド"),
        "hibiki-nv": ("/articles/hibiki-17-kaitori/", "「17年」など熟成年数の表記がある響をお探しの方はこちら", "響17年の買取相場ガイド"),
        "yoichi-nv": ("/articles/yoichi-10-kaitori/", "「10年」など熟成年数の表記がある余市をお探しの方はこちら", "余市10年の買取相場ガイド"),
        "miyagikyo-nv": ("/articles/miyagikyo-12-kaitori/", "「12年」など熟成年数の表記がある宮城峡をお探しの方はこちら", "宮城峡12年の買取相場ガイド"),
        # スコッチ系: 年代指定なしクエリの誤着地→各銘柄のNVページへ
        # ⚠️2026-08-04修正: 以前は汎用の whisky-nv-toha に流していたが、
        #   bowmore-nv / springbank-nv の専用ページが実在するため、そちらを直接指す。
        #   （P1で page.tsx に直接注入した導線は週次再生成で消えるため、ここへ移設した）
        "springbank-15": ("/articles/springbank-kaitori/", "10年・18年・25年・ローカルバーレイなど、ほかの年数や年代表記のないスプリングバンクの買取価格はこちら", "スプリングバンクの買取価格一覧（年数別の店舗掲示価格）"),
        "springbank-21": ("/articles/springbank-kaitori/", "10年・18年・25年・ローカルバーレイなど、ほかの年数や年代表記のないスプリングバンクの買取価格はこちら", "スプリングバンクの買取価格一覧（年数別の店舗掲示価格）"),
        "bowmore-18": ("/articles/bowmore-nv-kaitori/", "12年・15年・カモメラベルなど、ほかの年数や年代表記のないボウモアの買取価格はこちら", "ボウモアの買取相場（年数別・カモメラベル・NV）"),
        "bowmore-25": ("/articles/bowmore-nv-kaitori/", "12年・15年・カモメラベルなど、ほかの年数や年代表記のないボウモアの買取価格はこちら", "ボウモアの買取相場（年数別・カモメラベル・NV）"),
        "bowmore-blackbowmore": ("/articles/bowmore-nv-kaitori/", "12年・15年・カモメラベルなど、ほかの年数や年代表記のないボウモアの買取価格はこちら", "ボウモアの買取相場（年数別・カモメラベル・NV）"),
        "talisker-25": ("/articles/talisker-nv-kaitori/", "年代表記のないタリスカー（ストーム・スカイ等）をお探しの方はこちら", "タリスカーの年代指定なし(NV)買取相場"),
        "laphroaig-25": ("/articles/laphroaig-nv-kaitori/", "年代表記のないラフロイグ（セレクト・クォーターカスク等）をお探しの方はこちら", "ラフロイグの年代指定なし(NV)買取相場"),
        # 竹鶴: 年代表記のない竹鶴＝「竹鶴ピュアモルト」。専用NVページは作らず既存ページへ寄せる
        # （GSC実測では「竹鶴 買取」の中身は21年/25年など年代指定クエリが大半のため、新規URLは作らない判断）
        "taketsuru-17": ("/articles/taketsuru-kaitori/", "竹鶴の全ボトル（年数表記のないピュアモルト・12年・17年・21年・25年・35年）の買取価格を一覧で比べる場合はこちら", "竹鶴の買取価格一覧"),
        "taketsuru-21": ("/articles/taketsuru-kaitori/", "竹鶴の全ボトル（年数表記のないピュアモルト・12年・17年・21年・25年・35年）の買取価格を一覧で比べる場合はこちら", "竹鶴の買取価格一覧"),
        "taketsuru-25": ("/articles/taketsuru-kaitori/", "竹鶴の全ボトル（年数表記のないピュアモルト・12年・17年・21年・25年・35年）の買取価格を一覧で比べる場合はこちら", "竹鶴の買取価格一覧"),
        # 2026-10-20 自動導線が taketsuru-pure 自身を指していた（NV_FAMILIES の slug が "-nv" でないため）→ 一覧ハブへ
        "taketsuru-pure": ("/articles/taketsuru-kaitori/", "12年・17年・21年・25年など年数表記のある竹鶴をお持ちの方はこちら", "竹鶴の買取価格一覧"),
        # アードベッグ: 「アードベッグ 買取」がウーガダール/コリーヴレッカンの2ページに割れていた
        # （21.4位と26.1位で共食い）→ 銘柄横断の受け皿へ集約する
        "ardbeg-uigeadail": ("/articles/ardbeg-nv-kaitori/", "銘柄名が特定できていないアードベッグや、年代表記のないボトルをお持ちの方はこちら", "アードベッグの年代指定なし(NV)買取相場"),
        "ardbeg-corryvreckan": ("/articles/ardbeg-nv-kaitori/", "銘柄名が特定できていないアードベッグや、年代表記のないボトルをお持ちの方はこちら", "アードベッグの年代指定なし(NV)買取相場"),
        # グレンフィディック: 総称「グレンフィディック 買取」が30年ページに着地していた
        "glenfiddich-30": ("/articles/glenfiddich-kaitori/", "12年・15年・18年など、お持ちのボトルの年数が30年以外の方はこちら", "グレンフィディックの買取相場（年代別）"),
        # グレンモーレンジ: 総称・年代指定なしの検索がシグネット単体のページに着地していた
        "glenmorangie-signet": ("/articles/glenmorangie-kaitori/", "オリジナル10年・ラサンタ・キンタルバン・18年など、シグネット以外をお持ちの方はこちら", "グレンモーレンジの買取相場（ラインナップ別）"),
    }
    # 手書きのINTENT_SPLITに無くても、同ブランドのNVページが実在すれば自動で導線を作る
    _fam_nv = slug_base.split("-")[0]
    if slug_base not in INTENT_SPLIT and not slug_base.endswith("-nv") and _fam_nv in NV_FAMILIES and NV_FAMILIES[_fam_nv][0] != slug_base:
        _nvslug, _nvlabel = NV_FAMILIES[_fam_nv]
        INTENT_SPLIT[slug_base] = (
            f"/articles/{_nvslug}-kaitori/",
            f"熟成年数の表記がない{_nvlabel}（年代指定なし／ノンエイジ）をお探しの方はこちら",
            f"{_nvlabel}の年代指定なし(NV)買取相場",
        )

    intent_split_block = ""
    if slug_base in INTENT_SPLIT:
        _tgt, _lead, _lbl = INTENT_SPLIT[slug_base]
        intent_split_block = f'''
          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 {_lead} → <Link href="{_tgt}" className="text-amber-dark underline font-bold">{_lbl}</Link></p>
          </div>
'''

    # 2026-07-15: 年代指定なし(NV)専用ページへの導線1文（GSC「◯◯ 年代指定なし 買取」クエリの受け皿。
    # glenfarclas-nv-kaitori / springbank-nv-kaitori は手書きページ＝週次再生成の対象外。リンク先変更時はここも更新）
    NV_GUIDE = {
        "glenfarclas-25": ("/articles/glenfarclas-nv-kaitori/", "グレンファークラスの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格"),
        "springbank-15": ("/articles/springbank-nv-kaitori/", "スプリングバンクの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格"),
        "springbank-21": ("/articles/springbank-nv-kaitori/", "スプリングバンクの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格"),
    }
    # 2026-10-16: 同じ蒸溜所の別格ボトルへの導線（「ブラックボウモア」11位台の押し上げ。関連銘柄カードは中央値順で
    # insufficient のブラックボウモアが出ないため、ボウモア年数ページの本文から明示的にリンクする）
    SIBLING_GUIDE = {
        "bowmore-18": ("/articles/bowmore-blackbowmore-kaitori/", "1964年蒸留の「ブラックボウモア」（29年・30年・31年・42年・50年・DB5）をお持ちの方は", "ブラックボウモア全6種の違いと買取相場"),
        "bowmore-25": ("/articles/bowmore-blackbowmore-kaitori/", "1964年蒸留の「ブラックボウモア」（29年・30年・31年・42年・50年・DB5）をお持ちの方は", "ブラックボウモア全6種の違いと買取相場"),
    }
    if slug_base in SIBLING_GUIDE:
        _stgt, _slead, _slbl = SIBLING_GUIDE[slug_base]
        intent_split_block += f'''
          <p className="text-sm text-warm-gray my-4">{_slead} <Link href="{_stgt}" className="text-amber-dark underline">{_slbl}</Link> をご覧ください。</p>
'''
    if slug_base in NV_GUIDE:
        _ntgt, _nlbl = NV_GUIDE[slug_base]
        intent_split_block += f'''
          <p className="text-sm text-warm-gray my-4">年代表記が見当たらないボトルの正体と実勢価格は <Link href="{_ntgt}" className="text-amber-dark underline">{_nlbl}</Link> で解説しています。</p>
'''

    faqs = [
        (f"{name}の市場相場はいくらですか？",
         f"{name}の市場相場は{market_str}。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。"),
        (f"{name}を高く売るコツは？",
         "(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。"),
        (f"開封済みの{name}でも買取できますか？",
         "はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。"),
        (f"{name}は箱なしでも買取してもらえますか？",
         f"はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度{hako_yen}で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。"),
        (f"{name}に偽物・贋作はありますか？",
         "高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。"),
        (f"{name}の保管方法は？",
         "(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。"),
        (f"{name}は税金がかかりますか？",
         "年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。"),
        (f"{name}を売る時期はいつがよいですか？",
         "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。"),
        (f"{name}と他の銘柄は、どちらを先に売るべきですか？",
         "市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。"),
    ]
    if is_nv:
        faqs.insert(1, (
            f"「{nv_base_name} 年代指定なし」と{name}は同じものですか？",
            f"はい、同じものです。「{nv_base_name} 年代指定なし」「{nv_base_name} NV」は、熟成年数の表記がないボトル（{name}）を指す別の表記です。本ページの相場（{market_short}）を目安としてご利用いただけます。",
        ))

    _sfaq = store_prices.faq(slug_base, name)
    if _sfaq:
        faqs.insert(1, _sfaq)
    faqs = store_prices.apply_faqs(slug_base, faqs)

    # 機会バンド: 先頭FAQを「今の買取相場はいくら？」（中央値実数＋毎週更新明記）に置き換え
    if slug_base in BAND_BRAND_SLUGS and sufficient:
        faqs[0] = (
            f"今の{name}の買取相場はいくらですか？",
            f"{name}のヤフオク実落札（過去180日・IQR外れ値除去）の中央値は{fmt(yahoo_median)}です（サンプル数 n={sample_n}、取得日 {fetched_at}・毎週月曜に更新）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。",
        )

    faq_schema_json = "{" + '"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [' + ", ".join(
        '{ "@type": "Question", "name": ' + repr(q) + ', "acceptedAnswer": { "@type": "Answer", "text": ' + repr(a) + " } }"
        for q, a in faqs
    ) + "] }"

    faq_react = ", ".join(
        f'{{ q: {repr(q)}, a: {repr(a)} }}'
        for q, a in faqs
    )

    component_name = "".join(part.capitalize() for part in slug_base.replace("-", " ").split()) + "KaitoriPage"

    target_dir = OUT_DIR / f"{slug_base}-kaitori"
    target_dir.mkdir(parents=True, exist_ok=True)

    # 総称クエリ誤着地対策: 「年代指定なし」等の表記ゆれをtitle/descに恒久反映（2026-07-03）
    TITLE_ALIAS = {
        "glenfarclas-105": "グレンファークラス105（年代指定なし）",
    }
    title_name = TITLE_ALIAS.get(slug_base, name)
    meta_title = f"{title_name}の買取相場{MONTH_TAG}{market_short}｜箱なし・開封済みの査定額も" if sufficient else f"{title_name}の買取相場ガイド{MONTH_TAG}状態別の目安"
    meta_desc = (f"{name}の買取相場は{market_short}が目安（Yahoo Auctions 過去180日落札中央値ベース）。箱なし・開封済み等の状態別の買取価格の目安、買取業者3社の比較、高く売るためのポイント、贋作のリスクについて解説しています。" if sufficient else f"{name}（{name_en}）の買取相場ガイドです。箱なし・開封済み等の状態別の目安、買取業者3社の比較、高く売るためのポイント、贋作のリスクについて解説しています。")

    # 機会バンド: 鮮度＋中央値実数をtitle/descに機械挿入（insufficientなら実数を出さず既存titleを維持）
    band_lm = band_latest(slug_base) if slug_base in BAND_BRAND_SLUGS else None
    if band_lm:
        _bmed, _bn = band_lm
        meta_title = band_title(title_name, _bmed, slug_base)
        meta_desc = (
            f"{title_name}の買取相場は{_bmed:,}円が目安（{UPDATE_NOTE}・過去180日のIQR外れ値除去後、n={_bn}件）。"
            f"箱なし・開封済み等の状態別の査定の目安、買取業者3社の比較、高く売るためのポイントを実データにもとづいて解説しています。"
        )
    # 機会バンド: 12週スパークライン（点数<3なら「データ蓄積中」表示に自動フォールバック）
    spark = sparkline_block(slug_base, name) if slug_base in BAND_BRAND_SLUGS else ""

    # 買取店の掲示価格ブロック（data/store-prices.json にある slug のみ。無ければ全て空＝無変更）
    _tt = store_prices.title_tail(slug_base)
    if _tt and sufficient and not band_lm:
        meta_title = f"{title_name}の買取相場{MONTH_TAG}{market_short}｜{_tt}"
    if store_prices.get(slug_base):
        meta_desc += store_prices.desc_tail(slug_base)
        if not spark and sufficient:
            spark = sparkline_block(slug_base, name)
    store_block = store_prices.block(slug_base, name, yahoo_median if sufficient else None, fetched_at)
    store_toc = store_prices.toc_item(slug_base)
    store_fake = store_prices.fake_extra(slug_base, name)
    store_sell = store_prices.sell_extra(slug_base, name)
    toc_fake = store_prices.toc_fake(slug_base)
    toc_sell = store_prices.toc_sell(slug_base)
    page_updated = store_prices.page_updated(slug_base, fetched_at)
    _tf = store_prices.title_full(slug_base, MONTH_TAG)
    if _tf:
        meta_title = _tf
    if store_prices.desc_full(slug_base):
        meta_desc = store_prices.desc_full(slug_base)
    h1_text = store_prices.h1_full(slug_base, MONTH_TAG) or f'{name}の買取相場と業者比較ガイド{MONTH_TAG.replace("最新】", "】")}'
    editions_html = store_prices.editions_block(slug_base, name)
    toc_editions = store_prices.toc_editions(slug_base)
    auction_html = store_prices.auction_block(slug_base, name)
    toc_auction = store_prices.toc_auction(slug_base)
    quick_html = store_prices.quick_block(slug_base, name, yahoo_median if sufficient else None, fetched_at)

    # 2026-10-11: 出典の無い「過去5年で累積30〜80%の上昇」を撤去。代わりに自社集計（price-history）の
    # 集計開始時点→最新の実数のみを出す。4点未満・品質除外・insufficient なら一文ごと出さない。
    history_change_p = ""
    _ph = load_price_history(slug_base)
    if sufficient and _ph and slug_base not in DATA_QUALITY_EXCLUDE:
        _pts = [h for h in _ph.get("history", []) if isinstance(h.get("median_jpy"), int) and h["median_jpy"] > 0]
        if len(_pts) >= 4:
            _a, _b = _pts[0], _pts[-1]
            _chg = (_b["median_jpy"] - _a["median_jpy"]) / _a["median_jpy"] * 100
            history_change_p = (
                f'          <p>PeatBid がヤフオク落札中央値の週次集計を始めた {_a["date"]} 時点の{name}は <strong>{_a["median_jpy"]:,}円</strong>（n={_a["sample_n"]}）、'
                f'最新の {_b["date"]} は <strong>{_b["median_jpy"]:,}円</strong>（n={_b["sample_n"]}）で、この間の変化は <strong>{_chg:+.1f}%</strong> です'
                f'（出典: PeatBid 集計・<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">算出方法</Link>）。'
                f'集計期間が{len(_pts)}週分のため、数年単位の値動きについては、このデータからは判断できません。</p>\n'
            )

    content = f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/{slug_base}.json";

export const metadata: Metadata = {{
  title: {repr(meta_title)},
  description: {repr(meta_desc)},
}};

function FaqSchema() {{
  return <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({faq_schema_json}) }}}} />;
}}

const tocItems = [
  {{ id: "summary", label: "1. {name}の概要" }},{toc_editions}
  {{ id: "distillery", label: "2. 蒸溜所の歴史と特徴" }},
  {{ id: "tasting", label: "3. テイスティングノート" }},
  {{ id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" }},{store_toc}
  {{ id: "state-price", label: "5. 状態別の業界目安" }},
  {{ id: "price-reasons", label: "6. 価格を左右する要因" }},
  {{ id: "auction", label: "7. オークション落札データ" }},{toc_auction}
  {{ id: "takaku-uru", label: "8. 高く売るための7つのポイント" }},
  {{ id: "fake", label: "9. 偽物・贋作の見分け方" }},{toc_fake}
  {{ id: "partners", label: "10. おすすめ買取業者3社" }},
  {{ id: "process", label: "11. 売却プロセス5ステップ" }},{toc_sell}
  {{ id: "faq", label: "12. よくある質問" }},
];

export default function {component_name}() {{
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/" className="hover:text-amber-dark transition-colors">銘柄一覧</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{name}</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="{hero}" alt="{name}の買取相場" width={{1200}} height={{440}} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{h1_text}</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {page_updated} / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>
{quick_html}
          <MarketPriceCard data={{priceData as Parameters<typeof MarketPriceCard>[0]["data"]}} />

          {{/* Table of Contents */}}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              {{tocItems.map((item) => (
                <li key={{item.id}}><a href={{`#${{item.id}}`}} className="hover:underline">{{item.label}}</a></li>
              ))}}
            </ol>
          </div>

          <h2 id="summary">1. {name}の概要</h2>

          <p>{summary_p}</p>

          {nv_note}
{intent_split_block}

          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。{name}は希少度<strong>{rarity_label}</strong>クラスに分類しています。{rarity_detailed}</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>{cat_label}</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>{origin}</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>{spec_age}</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>{spec_abv}</td></tr>
                <tr><td><strong>容量</strong></td><td>{spec_size}</td></tr>
                <tr><td><strong>希少度</strong></td><td>{rarity_label}</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>{market_short}</strong></td></tr>
              </tbody>
            </table>
          </div>
{editions_html}
          <h2 id="distillery">2. {origin}の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="{distillery_image}" alt="{origin}の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>{distillery_info}</p>
{distillery_extra}
          <p>{origin}の{cat_label}は、二次流通市場で継続的に取引されています。蒸溜所の歴史と製法は、{name}のような銘柄の市場価値に影響しています。</p>

          <p>同じ蒸溜所の他の銘柄や同年代の銘柄と比べることで、{name}の市場における位置付けを確認できます。他のグレード・他の蒸溜所の銘柄は、ページ下部の関連銘柄のリンクからご覧いただけます。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          {tasting_intro}

          <p>{tasting}</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合は、開栓せずに保管することが価値を保つための基本です。開栓すると、香味の揮発と空気との接触による酸化が進み、二次流通市場での評価が大きく下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>{name}の市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>{market_short}</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n={sample_n}件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>
{spark}
          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、<strong>3社以上、できれば4社以上で相見積もり</strong>を取ることをおすすめします。</p>

          <p>当サイトでは、以下の3業者のページへのリンクを参考として掲載しています（各社の最新の査定額・キャンペーンは、各社のページでご確認ください）。</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています</li>
          </ul>
{store_block}
          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>{name}の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。<strong>実際の査定額は業者により異なります</strong>ので、最終的な金額は各業者のページでご確認ください。</p>

          {{/* State condition gallery (5 images) */}}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-5 not-prose">
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-perfect.png" alt="未開封・付属品完備" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>付属品完備</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-no-box.png" alt="未開封・箱なし" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>箱なし</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-label-dirty.png" alt="ラベル汚れ" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">ラベル<br/>軽度汚れ</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-low-liquid.png" alt="液面減少" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">液面<br/>減少</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-opened.png" alt="開封済み" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">開封済み</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>状態</th><th>付属品</th><th>業界目安（市場相場対比）</th>{yen_th}</tr>
              </thead>
              <tbody>
{rows_html}
              </tbody>
            </table>
          </div>

          <p>未開封・付属品完備（箱・冊子・カートン揃い）を基準（100%）として、各状態の業界一般の目安は概ね上記の通りです。概算額は実勢中央値に各％を乗じた<strong>目安</strong>であり、<strong>業者により評価基準が異なる</strong>ため実際の査定額とは差が生じます。査定時には、業者が以下の要素を総合的に判断します。</p>

          <ul>
            <li>ボトル本体の傷・汚れ</li>
            <li>ラベルの褪色・破れ・汚れ</li>
            <li>キャップ・封蝋・ホログラムの状態</li>
            <li>液面の高さ（目減りの度合い）</li>
            <li>外箱・冊子・カートンの有無と状態</li>
            <li>製造ロット・ボトリング年代</li>
            <li>付属の保証書・購入レシート</li>
          </ul>

          <h3 id="hako-nashi-souba">{name}を箱なし・付属品なしで売る場合の買取相場</h3>

          <p>箱や付属品がない場合の目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度{hako_yen}</strong>です。外箱・冊子の揃った完品と比べて1〜2割の減額が目安のため、<strong>箱がない場合でも売却は可能です</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって異なります。箱なしの場合は特に<strong>複数業者での相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品が残っている場合は、あわせて査定に出してください</strong>（一部でも評価の対象になります）</li>
            <li>詳しくは<Link href="/articles/{slug_base}-hako-nashi/" className="text-amber-dark hover:underline">{name}を箱なしで売る場合の解説</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. {name}の価格を左右する要因</h2>

          <p>{name}の二次流通価格を左右する主な要因は、次の5つです。</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果は、日本の買取業者の仕入れ価格の基準の一つとなっています</li>
            <li><strong>需給バランスと供給制限</strong> — {age_label}の銘柄は供給量が限られており、需要が拡大すると価格が上昇しやすい傾向があります</li>
            <li><strong>為替レートの影響</strong> — 円安の局面では海外の購入者の購買力が高まり、国内相場も連動して上昇する傾向があります</li>
            <li><strong>{origin}の国際的評価</strong> — World Whiskies Awards、ISC等の品評会での評価は、国際的な需要に影響します</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮の時期に需要が高まり、相場が上昇する傾向があります</li>
          </ol>

          <p>売却の時期は、上記の要因と市場の動向を確認したうえでご判断ください。将来の価格は保証されるものではありません。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、{name}と同じ価格帯の銘柄が継続的に取引されています。主なオークションと、それぞれの特徴は以下のとおりです。</p>

          <div dangerouslySetInnerHTML={{{{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催され、高額銘柄が中心です。<br/><strong>Bonhams（香港・ロンドン）</strong>: 高額銘柄が中心です。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次のオンラインオークションで、中価格帯の銘柄まで幅広く扱っています。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次で開催されています。<br/><strong>Whisky Hammer（UK）</strong>: 月次のオンラインオークションです。</p>` }}}} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」で閲覧できます。日本の買取業者の査定額は、海外の落札データに加え、輸送コスト・関税・業者の利益を考慮して算出されるのが一般的です。</p>

{history_change_p}
{auction_html}
          <h2 id="takaku-uru">8. {name}を高く売るための7つのポイント</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを揃える</strong> — 付属品の有無により、査定額が10〜20%変動する場合があります。シミ・破れがあると、さらに評価が下がります</li>
            <li><strong>未開封の状態を保つ</strong> — 開封済みの場合、査定額は大幅に下がります（20〜40%）。コレクション目的の場合は開栓しないことをおすすめします</li>
            <li><strong>複数の業者で相見積もりを取る</strong> — 同じボトルでも、業者により数万〜数十万円の差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です</li>
            <li><strong>適切な保管環境を保つ</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置きで保管してください。湿度・温度の急激な変化は避けてください</li>
            <li><strong>売却の時期を検討する</strong> — 年末年始・お中元・お歳暮の時期は高値の傾向があります。海外オークションの結果が出た直後も、相場が上昇しやすい時期です</li>
            <li><strong>ボトリングの年代を業者に伝える</strong> — 古いラベル・ロット番号は、希少価値として評価される場合があります</li>
            <li><strong>状態を写真で記録する</strong> — 事前に複数の角度から撮影しておくと、業者の比較やトラブルの防止に役立ちます</li>
          </ol>

          <h2 id="fake">9. {name}の偽物・贋作の見分け方</h2>

          <p>{name}のような取引価格の高い銘柄には、贋作・偽造ボトルのリスクがあります。真贋の確認には、以下の5点のチェックが有効です。</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で、色ずれがありません。贋作では、にじみ・かすれ・書体の違いが見られます</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリーの山崎・響等にはホログラムシールが貼付されています。贋作では光の反射が不均一な場合があります</li>
            <li><strong>液色と液面の状態</strong> — 正規品は均一な琥珀色で、透明感があります。贋作では色むら・濁り・沈殿物が見られる場合があります</li>
            <li><strong>瓶の形状と底面の刻印</strong> — 正規品は底面にロット番号・製造所コードがあります。贋作では刻印がない、または不自然な場合があります</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークションで購入したものは信頼性が高いと考えられます。個人間取引（メルカリ・ヤフオク）で購入したものは注意が必要です</li>
          </ol>
{precheck_callout}
          <p>疑わしい場合は、お酒の買取専門店に<strong>鑑定査定</strong>を依頼することをおすすめします。</p>
{store_fake}
          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が、{name}と同じ価格帯の銘柄に対応している買取業者を選定しました。それぞれ得意とする領域が異なるため、目的に応じてご利用ください。</p>

          {{/* Comparison table */}}
          <div className="table-wrapper not-prose mb-6">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr>
                  <th>業者</th>
                  <th>得意領域</th>
                  <th>査定スピード（各社公式・2026年10月16日確認）</th>
                  <th>査定額傾向</th>
                  <th>手数料</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>ヒカカク！</strong></td><td>一括査定（最大20社）</td><td>査定結果メールは最短1日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>バイセル</strong></td><td>大手の安心感</td><td>出張は最短即日訪問・その場で査定</td><td>★★★★</td><td>無料</td></tr>
                <tr><td><strong>リカスタ</strong></td><td>宅配買取</td><td>査定の連絡は1営業日以内（本数により2営業日以上）</td><td>★★★★</td><td>無料</td></tr>
              </tbody>
            </table>
          </div>

          {{/* Decision flowchart */}}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-6 not-prose">
            <p className="font-bold text-base mb-3 text-ink">目的別の業者の選び方</p>
            <ul className="space-y-2 text-sm text-ink/85">
              <li>✓ <strong>複数社の査定額を比較したい</strong> → ヒカカク！で一括査定を依頼し、専門店の個別査定と比較</li>
              <li>✓ <strong>早く現金化したい</strong> → バイセルの出張買取（最短即日の訪問）</li>
              <li>✓ <strong>地方にお住まいの方・宅配で売却したい方</strong> → リカスタの宅配買取</li>
              <li>✓ <strong>希少銘柄を専門家に査定してほしい</strong> → お酒の買取専門店の個別査定</li>
              <li>✓ <strong>大手の業者に依頼したい</strong> → バイセル（東証グロース上場）</li>
            </ul>
          </div>

          <div className="not-prose">
{partners_html}
          </div>

          <h2 id="process">11. 売却プロセス5ステップ</h2>

          <p>{name}を売却する際の標準的な流れを、5つのステップにまとめました。</p>

          <ol>
            <li><strong>状態確認・付属品の準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃えます</li>
            <li><strong>相場の確認</strong> — 当サイトなどで現在の相場を確認し、お持ちのボトルの目安価格を把握します</li>
            <li><strong>複数の業者への見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒の買取専門店に個別で2〜3社、合計5〜8社から見積もりを取得します</li>
            <li><strong>査定額の比較・業者の選定</strong> — 査定額だけでなく、手数料・キャンセル料・送料・支払い方法を含めて判断します</li>
            <li><strong>売却契約・入金の確認</strong> — 売却契約後、店頭買取では即日現金、宅配買取では1〜3営業日での銀行振込が一般的です</li>
          </ol>

          <p>全体の所要期間は<strong>1〜2週間</strong>が目安です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">{name}の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>
{store_sell}
          <h2 id="faq">12. {name}に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {{[{faq_react}].map((faq) => (
              <details key={{faq.q}} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{{faq.q}}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed" dangerouslySetInnerHTML={{{{ __html: faq.a.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>') }}}} />
              </details>
            ))}}
          </div>

          <h2>{name}に関するその他の解説</h2>
          <p>{name}に関するテーマ別の解説は、以下のページをご覧ください。</p>
          <ul>
{angle_links_html}
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
{related_links}
          </div>

          <h2>年代指定なし・注目銘柄の買取相場</h2>
          <p>「年代指定なし（ノンエイジ／NV）」で検索されやすい主要銘柄の実勢買取相場です。ジャパニーズ・スコッチの銘柄を対象に、毎週更新しています。</p>
          <ul>
{cluster_links}
          </ul>

          <h2>熟成年数の表記がないボトルをお持ちの方へ</h2>
          <p>ラベルに「12年」「25年」などの表記がないボトルは、買取店では「年代指定なし」「ノンエイジ」「NV（ノンヴィンテージ）」と呼ばれ、年数表記のあるボトルとは別に相場が形成されます。銘柄ごとの相場は、以下のページに掲載しています。</p>
          <ul>
{nv_index_links}
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {fetched_at}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}}
'''
    (target_dir / "page.tsx").write_text(content, encoding="utf-8")


def main():
    count = 0
    for b in BRANDS:
        render_page(b, BRANDS)
        count += 1
    print(f"✓ Generated {count} brand pages (expanded)")


if __name__ == "__main__":
    main()
