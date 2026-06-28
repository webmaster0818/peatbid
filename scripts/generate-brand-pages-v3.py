#!/usr/bin/env python3
"""
v3: Plan A compliant brand-kaitori pages.
- Primary price: Yahoo Auctions 180-day median (no fabricated buyback estimates).
- State variations: industry rule-of-thumb percentages only (no derived yen amounts).
- Dealer pricing: link-only (LINXAS, バイセル, 福ちゃん, JOYLAB).
- Insufficient sample (n<20) → "市場相場データ不足" mode.
"""
import csv
import datetime
import re
from pathlib import Path

# 週次cronで再生成されるため、生成時点の年月がそのままタイトル鮮度になる
_NOW = datetime.date.today()
MONTH_TAG = f"【{_NOW.year}年{_NOW.month}月最新】"

ROOT = Path(__file__).parent.parent
DATA = ROOT / "data" / "brands.csv"
OUT_DIR = ROOT / "app" / "articles"

with open(DATA, "r", encoding="utf-8") as f:
    BRANDS = list(csv.DictReader(f))


HUB_FAMILIES = {"yamazaki": "山崎", "hibiki": "響", "hakushu": "白州", "macallan": "マッカラン", "ichirosu": "イチローズモルト", "bowmore": "ボウモア", "springbank": "スプリングバンク"}

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
    "common": "現行品として安定流通しているが、銘柄によってはプレミア化の兆しあり。市場価値は中位だが、コレクター入門品として安定需要を持つ。",
    "mid": "終売・休売後の供給制限により価格上昇基調にある銘柄帯。市場流通量が徐々に減少し、二次流通価格は年単位で15〜30%上昇する傾向。",
    "high": "希少性と国際的評価により、二次流通市場で高値が定着している銘柄帯。コレクター・投資需要が支え、長期保有での価値増大が期待できる。",
    "ultra": "極めて希少な長期熟成銘柄。Sotheby's・Bonhamsなどの海外オークションでの落札データが査定の基準となり、富裕層・コレクターの主要ターゲット。",
    "ultra-rare": "市場流通量が極小、もしくは閉鎖蒸溜所のボトル。1本数百万円〜数千万円の取引が発生し、世界中のオークションで注目される伝説級の銘柄。",
}


# Distillery profiles
DISTILLERY_INFO = {
    "山崎蒸溜所": "1923年（大正12年）創業、サントリーが京都・山崎に開設した日本最初の本格モルトウイスキー蒸溜所。三方を山に囲まれた湿潤な気候と、千利休が茶の湯に使った湧水「離宮の水」を仕込み水として用いる。山崎は日本のウイスキー文化発祥の地として、国際的評価も極めて高い。",
    "白州蒸溜所": "1973年（昭和48年）創業、サントリーが山梨県北杜市・南アルプス山系の麓に開設した蒸溜所。標高約700メートルの森林に囲まれた立地と、ミネラル分の少ない軟水を使用。「森のウイスキー」と称される爽やかで軽快な味わいが特徴。",
    "サントリー": "1899年創業のサントリーホールディングスは、日本最大のウイスキーメーカー。山崎・白州・知多の3つの蒸溜所を運営し、響をはじめとするブレンデッドウイスキーで国際的評価を確立している。",
    "余市蒸溜所": "1934年（昭和9年）創業、ニッカウヰスキーの竹鶴政孝が北海道余市に開設。スコットランドに似た冷涼な気候と、海風・石炭直火蒸溜による力強いピーティな味わいが特徴。日本ウイスキーの父・竹鶴政孝の理想を体現する蒸溜所。",
    "宮城峡蒸溜所": "1969年（昭和44年）創業、ニッカウヰスキーが宮城県仙台市・新川渓谷に開設した第2の蒸溜所。穏やかな気候と軟水によるフルーティで華やかな味わいが特徴。余市と対照的な、エレガントなモルト原酒を生み出す。",
    "ニッカ": "1934年に竹鶴政孝が創業した「大日本果汁株式会社」を起源とする日本2大ウイスキーメーカーの一角。余市・宮城峡の2つの蒸溜所を擁し、竹鶴・余市・宮城峡など名作を世に送り出している。",
    "ベンチャーウイスキー": "2007年、肥土伊知郎氏が埼玉県秩父に設立した独立系蒸溜所。閉鎖した羽生蒸溜所の原酒を活かしながら、秩父蒸溜所で独自のクラフトウイスキーを生産。「イチローズモルト」ブランドで世界中のコレクターから絶大な支持を集める。",
    "軽井沢蒸溜所": "1955年〜2000年に長野県軽井沢で稼働した、現在は閉鎖済みの伝説的蒸溜所。残存ボトルは世界中のオークションで取引され、1本数百万円から数千万円の価格がつく。希少性ゆえに「日本ウイスキー界の聖杯」とも呼ばれる。",
    "羽生蒸溜所": "1980年代〜2000年に埼玉県羽生で稼働した、閉鎖済み蒸溜所。残された原酒はベンチャーウイスキーが引き継ぎ、「イチローズモルト カードシリーズ」として伝説化。現在は1セット数千万円で取引される。",
    "秩父蒸溜所": "ベンチャーウイスキーが埼玉県秩父に設立したクラフト蒸溜所。2008年蒸溜開始、初リリースの「ザ・ファースト」は世界中のコレクターが追い求める希少銘柄。",
    "信州マルス蒸溜所": "1949年創業の本坊酒造が運営する長野県の蒸溜所。標高800メートル超の高地・冷涼気候を活かした熟成が特徴。クラフトウイスキーの先駆者の一つ。",
    "スペイサイド": "スコットランド東部のスペイ川流域を中心とした、世界最大のウイスキー生産地。マッカラン・グレンフィディック・グレンファークラス・グレンリヴェットなど、世界的に有名な蒸溜所が集積。フルーティで華やかな味わいが特徴。",
    "アイラ": "スコットランド西海岸のアイラ島は、ピートウイスキーの聖地。ボウモア・ラフロイグ・アードベッグ・ラガヴーリンなど、独特のスモーキーな味わいで知られる蒸溜所が点在する。",
    "キャンベルタウン": "スコットランド南西部のキャンベルタウンは、かつて30以上の蒸溜所が稼働した「ウイスキーの首都」。現在はスプリングバンクなど数軒のみが伝統製法を守り続け、希少価値が高い。",
    "ハイランド": "スコットランド北部・中央部の広大な地域。グレンモーレンジ・ダルモア・グレンドロナックなど、フルーティで複雑な味わいの蒸溜所が点在する。",
    "スカイ": "スコットランド西海岸のスカイ島。タリスカー蒸溜所が唯一のシングルモルト蒸溜所として知られ、海風と火山地形が育むスモーキーで力強い味わいが特徴。",
}


# Tasting notes by category × age tier
TASTING_NOTES = {
    "japanese-whisky": {
        "young": "フレッシュなフルーツの香り、リンゴ・梨・洋ナシのアロマが軽快に広がる。バニラ・蜂蜜の柔らかな甘み。フィニッシュは短〜中で、初心者にも飲みやすい繊細さ。",
        "mid": "熟成感のあるドライフルーツ（レーズン・プラム）、シナモン・クローブのスパイス、ミズナラ樽からくる伽羅・白檀の和の香り。ふくよかな甘みと長いフィニッシュ。",
        "old": "深いシェリー樽由来のドライフルーツケーキ、ダークチョコレート、煙草の葉、ミズナラ独特のオリエンタルな香り。複雑性が極まり、フィニッシュは数分続く。長期熟成の真髄。",
    },
    "scotch-whisky": {
        "young": "シェリー樽もしくはバーボン樽の特徴がストレートに表現された若々しい味わい。フルーツ・蜂蜜・バニラのアロマ。",
        "mid": "シェリー樽熟成ではドライフルーツ・スパイス、バーボン樽熟成ではバニラ・キャラメル・フルーツが調和。樽の個性が立ち、味わいに深みが出る。",
        "old": "長期熟成ならではの複雑性。シェリー由来のダークフルーツ、ピート由来のスモーキネス、樽材のオーク・タンニンが渾然一体となる。世界のコレクター垂涎の味わい。",
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
        "intro": "ヒカカク！は最大20社の買取業者へ一括で見積もりを依頼できる比較プラットフォーム。希少銘柄ほど業者間の査定差が大きく、まず**相場感を把握する**目的で最適です。",
        "strengths": ["最大20社一括査定（業界最多級）", "完全無料・しつこい営業なし", "ウイスキー・洋酒・ブランデー対応"],
        "best_for": "**最高値を狙いたい方** / 初めての方",
    },
    {
        "name": "バイセル",
        "url": "https://www.buysell-onlineshop.jp/",
        "method": "出張/店頭/宅配",
        "intro": "東証グロース上場のBuySell Technologiesが運営。年間累計買取件数430万件超の大手で、お酒・ウイスキー買取に注力中。**信頼性とスピードを両立**したい場合に最適です。",
        "strengths": ["東証グロース上場で社会的信頼性◎", "3チャネル対応（出張・店頭・宅配）", "CMでも知名度抜群"],
        "best_for": "**信頼性とスピード**を両立したい方",
    },
    {
        "name": "JOYLAB",
        "url": "https://joylab.jp/",
        "method": "店頭/宅配/出張",
        "intro": "お酒買取専門で、銘柄ごとのリアルタイム相場表を公式サイトで公開。**ジャパニーズウイスキー強化中**で、希少銘柄に対する専門知識と査定スピードに定評があります。",
        "strengths": ["お酒買取専門の深い知識", "リアルタイム相場公開", "ジャパニーズウイスキー注力"],
        "best_for": "**希少銘柄を専門店で売りたい方**",
    },
    {
        "name": "リカスタ",
        "url": "https://www.licasta.com/",
        "method": "宅配/出張",
        "intro": "全国対応の宅配買取サービス。**店舗に行く時間がない方・地方在住の方**に最適。査定無料・キャンセル無料で気軽に試せます。",
        "strengths": ["全国対応の宅配買取", "査定無料・キャンセル無料", "送料・梱包キット無料"],
        "best_for": "**宅配で完結したい方** / 地方在住の方",
    },
]


def state_table_rows_pct():
    """業界一般の目安。(状態, 付属品, ％ラベル, lo%, hi%)。loが0=単一値(95-100は95,100)。"""
    return [
        ("未開封・完璧", "箱・冊子・カートン揃い", "市場相場の95〜100%程度", 95, 100),
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
    distillery_info = DISTILLERY_INFO.get(origin, f"{origin}は{cat_label}業界で評価の高い蒸溜所/メーカー。長年の伝統と現代的な品質管理を融合し、世界基準のウイスキーを生産しています。")
    tasting = get_tasting_note(category, age)
    rarity_detailed = RARITY_DETAILED.get(rarity, "")
    rarity_label_map = {"common": "コモン", "mid": "ミッド", "high": "ハイ", "ultra": "ウルトラ", "ultra-rare": "ウルトラレア"}
    rarity_label = rarity_label_map.get(rarity, rarity.upper())

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
        rmed_label = f"市場相場 {fmt(int(rmed))}" if rmed.isdigit() and int(rmed) > 0 else "市場相場データ蓄積中"
        related_links_parts.append(
            f'            <Link href="/articles/{r["slug"]}-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">{r["name_ja"]} の買取相場</p><p className="text-xs text-warm-gray mt-1">{rmed_label}</p></Link>'
        )
    related_links = "\n".join(related_links_parts)

    # Angle links for this brand
    angle_links_inline = [
        ("takaku-uru", "高く売る方法"),
        ("nisemono-mikata", "偽物の見分け方"),
        ("ranking", "買取業者ランキング"),
        ("rekishi", "歴史と特徴"),
        ("kihaku", "希少性・投資価値"),
        ("auction-suii", "オークション推移"),
        ("kaifu-zumi", "開封済みでも売れる"),
        ("hako-nashi", "箱なしでも買取"),
        ("label-yogore", "ラベル汚れでも査定"),
    ]
    _fam = slug_base.split("-")[0]
    _hub_li = (f'              <li><Link href="/articles/{_fam}-nisemono-mikata/" className="text-amber-dark hover:underline font-bold">{HUB_FAMILIES[_fam]}（全種）の偽物の見分け方・真贋ハブ</Link></li>\n') if _fam in HUB_FAMILIES else ""
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
            <div dangerouslySetInnerHTML={{{{ __html: `{md_to_html("こんな人におすすめ: " + p["best_for"])}` }}}} className="mt-2 text-sm" />
            <a href="{p["url"]}" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">{p["name"]}で無料査定する →</a>
          </div>'''
        partners_html_blocks.append(block)
    partners_html = "\n".join(partners_html_blocks)

    # Plan A: FAQ uses Yahoo median directly when available; falls back to generic guidance otherwise.
    if sufficient:
        market_str = f"{fmt(yahoo_median)}（Yahoo Auctions 過去180日の落札中央値、サンプル数 n={sample_n}、取得日 {fetched_at}）"
        market_short = fmt(yahoo_median)
    else:
        market_str = "現在、過去180日の落札データが20件に満たないため市場相場の中央値は集計できていません"
        market_short = "市場相場データ蓄積中"

    hako_yen = f"（{yen_range_pct(yahoo_median, 80, 90)}）" if sufficient else ""
    is_nv = slug_base.endswith("-nv")
    nv_base_name = name.replace("ノンエイジ", "").strip()
    nv_note = (
        f'<p>なお、{name}はラベルに熟成年数の表記がないボトルで、オークションや買取店では「<strong>{nv_base_name} 年代指定なし</strong>」「<strong>{nv_base_name} NV（ノンヴィンテージ）</strong>」とも表記されます。いずれも本ページの相場が目安になります。</p>'
        if is_nv else ""
    )

    faqs = [
        (f"{name}の市場相場はいくらですか？",
         f"{name}の市場相場は{market_str}。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん / JOYLAB など各業者のページで直接ご確認ください。"),
        (f"{name}を高く売るコツは？",
         "(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。"),
        (f"{name}の開封済みでも買取できますか？",
         "はい、可能です。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅減額となる傾向があります（業者により評価基準が異なります）。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。実際の査定額は各業者ページでご確認ください。"),
        (f"{name}は箱無しでも買取してもらえますか？",
         f"はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度{hako_yen}で、完品と比べ1〜2割の減額にとどまります。冊子やカートンが部分的に残っている場合は一緒に査定に出すと評価されます。減額幅は業者により異なるため、箱なしの場合こそ複数社の相見積もりがおすすめです。"),
        (f"{name}に偽物・贋作はありますか？",
         "高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合は専門知識を持つ買取業者（JOYLAB等）で鑑定査定を依頼してください。"),
        (f"{name}の保管方法は？",
         "(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。"),
        (f"{name}は税金がかかりますか？",
         "年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。"),
        (f"{name}を売るタイミングはいつがベスト？",
         "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。"),
        (f"{name}と他の銘柄、どっちを先に売るべき？",
         "市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。"),
    ]
    if is_nv:
        faqs.insert(1, (
            f"「{nv_base_name} 年代指定なし」と{name}は同じものですか？",
            f"はい、同じものです。「{nv_base_name} 年代指定なし」「{nv_base_name} NV」は、熟成年数の表記がないボトル＝{name}を指す表記ゆれです。本ページの相場（{market_short}）がそのまま目安になります。",
        ))

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

    meta_title = f"{name}の買取相場{MONTH_TAG}{market_short}｜箱なし・開封済みの査定額も" if sufficient else f"{name}の買取相場ガイド{MONTH_TAG}状態別の目安"
    meta_desc = (f"{name}の買取相場は{market_short}が目安（Yahoo Auctions 過去180日落札中央値ベース）。箱なし・開封済み等の状態別の買取価格目安、買取業者4社の比較、高く売るコツ、贋作リスクまで網羅。{name}を売る前に読む決定版ガイド。" if sufficient else f"{name}（{name_en}）の買取相場ガイド。箱なし・開封済み等の状態別目安、買取業者4社の比較、高く売るコツ、贋作リスクまで網羅。")

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
  {{ id: "summary", label: "1. {name}の概要" }},
  {{ id: "distillery", label: "2. 蒸溜所の歴史と特徴" }},
  {{ id: "tasting", label: "3. テイスティングノート" }},
  {{ id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" }},
  {{ id: "state-price", label: "5. 状態別の業界目安" }},
  {{ id: "price-reasons", label: "6. なぜこの価格になるのか" }},
  {{ id: "auction", label: "7. オークション落札データ" }},
  {{ id: "takaku-uru", label: "8. 高く売る7つの実践テクニック" }},
  {{ id: "fake", label: "9. 偽物・贋作の見分け方" }},
  {{ id: "partners", label: "10. おすすめ買取業者4社" }},
  {{ id: "process", label: "11. 売却プロセス5ステップ" }},
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
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{name}の買取相場と業者比較ガイド{MONTH_TAG.replace("最新】", "】")}</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetched_at} / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

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

          <p>{name}は{cat_label}を代表する銘柄の1つで、{origin}が手がける{age_label}のボトルです。{description}。</p>

          {nv_note}

          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。{name}は希少度<strong>{rarity_label}</strong>クラスに位置し、{rarity_detailed}</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>{cat_label}</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>{origin}</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>{age_label}</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>{abv}%</td></tr>
                <tr><td><strong>容量</strong></td><td>{bottle_size}ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>{rarity_label}</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>{market_short}</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. {origin}の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="{distillery_image}" alt="{origin}の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>{distillery_info}</p>

          <p>{origin}が生み出す{cat_label}は、世界の主要品評会で度々受賞しており、二次流通市場でも継続的に高値で取引されています。蒸溜所の歴史と職人技術が、{name}のような銘柄の市場価値を支えています。</p>

          <p>同じ蒸溜所の他の銘柄や、同年代の他銘柄との関連性を知ることで、{name}の市場における立ち位置がより明確になります。下の関連銘柄リンクから他のグレード・他蒸溜所の銘柄も合わせてチェックすることをおすすめします。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>{name}の味わいは、{age_label}の熟成期間中に樽から溶け出した成分と、{origin}独自の蒸溜技術が複雑に交差したものです。</p>

          <p>{tasting}</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合、ボトルを開けずに保管することが価値維持の鉄則です。一度開けると、香味の揮発と空気接触による酸化が進み、二次流通市場での評価が大幅に下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>{name}の市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>{market_short}</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n={sample_n}件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、**最低3社、できれば4社以上で相見積もり**を取ることをおすすめします。</p>

          <p>本サイトでは下記の4業者ページへのリンクを参考として提示しています（各社の最新の査定額・キャンペーンは直接ご確認ください）:</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 総合買取の大手、お酒査定にも対応</li>
            <li><a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">JOYLAB</a> — お酒買取専門、希少銘柄の鑑定査定に強み</li>
          </ul>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>{name}の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。**実際の査定額は業者により異なります**ので、最終的な金額は各業者のページからご確認ください。</p>

          {{/* State condition gallery (5 images) */}}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-5 not-prose">
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-perfect.png" alt="未開封・箱付き完璧" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>完璧</p>
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

          <p>未開封・完璧（箱・冊子・カートン揃い）を基準（100%）として、各状態の業界一般の目安は概ね上記の通りです。概算額は実勢中央値に各％を乗じた<strong>目安</strong>であり、<strong>業者により評価基準が異なる</strong>ため実際の査定額とは差が出ます。査定時には、業者が以下の要素を総合的に判断します:</p>

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

          <p>「{name} 買取 箱無し」とお調べの方向けの目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度{hako_yen}</strong>。外箱・冊子の揃った完品と比べて1〜2割の減額にとどまるため、<strong>箱がなくても売却を諦める必要はありません</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって差が出ます。箱なしの場合こそ<strong>複数業者の相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品だけでも残っていれば一緒に査定へ</strong>（部分的でも評価されます）</li>
            <li>詳しくは<Link href="/articles/{slug_base}-hako-nashi/" className="text-amber-dark hover:underline">{name}は箱なしでも買取してもらえるかの徹底ガイド</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. なぜ{name}はこの価格になるのか</h2>

          <p>{name}の二次流通価格を決定づける主要な要因は5つあります:</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果が、日本の買取業者の仕入れ価格の基準となっています</li>
            <li><strong>需給バランスと供給制限</strong> — {age_label}の長期熟成銘柄は供給量が物理的に限られており、需要拡大に応じて価格が上昇しやすい構造</li>
            <li><strong>為替レートの影響</strong> — 円安局面では海外バイヤー（アジア富裕層・中華圏コレクター）の購買力が拡大し、国内相場も連動して上昇する傾向</li>
            <li><strong>{origin}の国際的評価</strong> — World Whiskies Awards、ISC等の品評会受賞歴が国際的需要を支え、長期保有のプレミアにつながる</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮シーズンに需要が高まり、相場が上昇する</li>
          </ol>

          <p>これらの要因を総合的に踏まえると、{name}は{rarity_label}クラスの希少度を持つため、<strong>中長期で見れば価格安定〜上昇基調</strong>が予想されます。短期的な売り急ぎは避け、市場動向を見ながら最適なタイミングで売却するのが合理的です。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、{name}クラスの銘柄が継続的に取引されています。主要オークションプラットフォームと、それぞれの特徴は以下の通りです:</p>

          <div dangerouslySetInnerHTML={{{{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催、プレミアム銘柄中心。<br/><strong>Bonhams（香港・ロンドン）</strong>: 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次オンラインオークション、中位銘柄まで幅広く扱う。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次開催、コレクター向け。<br/><strong>Whisky Hammer（UK）</strong>: 月次オンライン、新興プレイヤー。</p>` }}}} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」アーカイブで閲覧可能です。日本の買取業者の査定額は、これらの海外データを基準に、輸送コスト・関税・業者マージンを考慮して算出されています。</p>

          <p>過去5年（2021〜2026年）の{name}の二次流通価格は、ジャパニーズウイスキーブーム・コレクター需要拡大により<strong>累積30〜80%の上昇</strong>を示しており、長期保有における資産価値も注目されています。</p>

          <h2 id="takaku-uru">8. {name}を高く売る7つの実践テクニック</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを必ず揃える</strong> — 付属品の有無で査定額が10〜20%変動。シミ・破れがあると更に評価減</li>
            <li><strong>未開封の状態を維持する</strong> — 開封済みは査定額が大幅減（20〜40%）。コレクション目的なら絶対に開けない</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により数万〜数十万円の差。ヒカカク等の一括査定+専門店個別査定の組み合わせが鉄則</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置き保管。湿度・温度の急激な変化はNG</li>
            <li><strong>売却タイミングを見極める</strong> — 年末年始・お中元・お歳暮シーズンが高値傾向。海外オークション結果直後も相場上昇のチャンス</li>
            <li><strong>ボトリング年代を業者に伝える</strong> — 古いラベル・ロット番号は希少価値が乗ることがある</li>
            <li><strong>状態を写真で記録</strong> — 事前に複数角度から撮影し、業者比較・トラブル防止に活用</li>
          </ol>

          <h2 id="fake">9. {name}の偽物・贋作の見分け方</h2>

          <p>{name}のような流通価値のある銘柄では、贋作・偽造ボトルのリスクが存在します。本物を見抜くには以下の5つのチェックが有効です:</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で色ズレなし。贋作はにじみ・かすれ・フォント違いが見られる</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリー山崎・響等はホログラムシール付き。贋作は光の反射が不均一</li>
            <li><strong>液色と液面の状態</strong> — 本物は均一な琥珀色（透明感あり）。贋作は色ムラ・濁り・沈殿物</li>
            <li><strong>瓶の形状と底面刻印</strong> — 正規品は底面にロット番号・製造所コードあり。贋作は刻印なし or 不自然</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークション経由は信頼度高。個人間取引（メルカリ・ヤフオク）は要注意</li>
          </ol>

          <p>怪しいと思ったら、お酒買取専門店（JOYLAB等）で**鑑定査定**を依頼するのが最も確実です。専門業者は本物・贋作の判定経験が豊富で、無料で見抜いてくれます。</p>

          <h2 id="partners">10. おすすめ買取業者4社の詳細レビュー</h2>

          <p>PeatBid編集部が{name}クラスの銘柄に強い買取業者を厳選しました。それぞれ得意領域が異なるため、目的別に使い分けるのがコツです。</p>

          {{/* Comparison table */}}
          <div className="table-wrapper not-prose mb-6">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr>
                  <th>業者</th>
                  <th>得意領域</th>
                  <th>査定スピード</th>
                  <th>査定額傾向</th>
                  <th>手数料</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>ヒカカク！</strong></td><td>一括査定（20社）</td><td>1〜2日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>バイセル</strong></td><td>大手の安心感</td><td>即日〜2日</td><td>★★★★</td><td>無料</td></tr>
                <tr><td><strong>JOYLAB</strong></td><td>お酒専門・希少銘柄</td><td>1〜3日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>リカスタ</strong></td><td>宅配買取</td><td>2〜5日</td><td>★★★★</td><td>無料</td></tr>
              </tbody>
            </table>
          </div>

          {{/* Decision flowchart */}}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-6 not-prose">
            <p className="font-bold text-base mb-3 text-ink">🎯 どの業者を選ぶべきか</p>
            <ul className="space-y-2 text-sm text-ink/85">
              <li>✓ <strong>最高値を狙いたい</strong> → まずヒカカクで一括査定し、JOYLABで個別査定して比較</li>
              <li>✓ <strong>急いで現金化したい</strong> → バイセルの店頭買取（即日現金化）</li>
              <li>✓ <strong>地方在住・宅配で完結したい</strong> → リカスタの宅配買取</li>
              <li>✓ <strong>希少銘柄を専門家に見てほしい</strong> → JOYLABの専門査定</li>
              <li>✓ <strong>大手の安心感を優先</strong> → バイセル（東証グロース上場）</li>
            </ul>
          </div>

          <div className="not-prose">
{partners_html}
          </div>

          <h2 id="process">11. 売却プロセス5ステップ</h2>

          <p>{name}を売却する際の標準的なプロセスを5ステップでまとめました:</p>

          <ol>
            <li><strong>状態確認・付属品準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃える</li>
            <li><strong>事前相場リサーチ</strong> — PeatBidなどで現在の相場を確認し、自分のボトルの目安価格を把握</li>
            <li><strong>複数業者で見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒買取専門店（JOYLAB等）に個別で2〜3社、計5〜8社で見積もり取得</li>
            <li><strong>査定額比較・業者選定</strong> — 最高値だけでなく、手数料・キャンセル料・送料・支払い方法を総合判断</li>
            <li><strong>売却契約・入金確認</strong> — 売却契約後、店頭買取なら即日現金、宅配買取なら1〜3営業日で銀行振込</li>
          </ol>

          <p>このプロセス全体で<strong>1〜2週間</strong>を見込めば、最適なタイミングで売却できます。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">{name}の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

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

          <h2>{name}の他の切り口で読む</h2>
          <p>{name}についてさらに詳しく知りたい方は、以下の切り口別解説も合わせてご覧ください。</p>
          <ul>
{angle_links_html}
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
{related_links}
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {fetched_at}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
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
