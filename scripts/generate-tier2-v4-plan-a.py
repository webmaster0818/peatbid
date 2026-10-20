#!/usr/bin/env python3
"""
⚠️ STALE GENERATOR — DO NOT regenerate blindly. The live tier2 pages were patched
after this script last ran (Plan C noindex removal, Layer1 content/data injection,
and the 2026-06-10 internal-link breadcrumb repair). Re-running overwrites those.
The robots flag and breadcrumb below were aligned to the live state on 2026-06-10,
but the body content may still be behind the deployed pages. If you must regen, diff against a live leaf first and re-apply BOTH
patch-tier2-internal-links.py and patch-tier2-nearby-links.py afterward.

Tier 2 PSEO generator v4 — Plan A compliant.

Changes from v3:
- Yahoo Auctions median (180d) replaces all reference_price_jpy_2026_05
- State variations expressed as % only (no derived yen amounts)
- 4-dealer reference links (LINXAS / バイセル / 福ちゃん)
- Hero images use heroes/{slug}.png (real product images)
- robots.txt + _headers keep tier2 noindex (staging-only)

Outputs: app/tier2/{pref}/{brand-slug}-kaitori/page.tsx (50 × 47 = 2,350)
"""
import csv
import hashlib
import json
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "app" / "tier2"
BRANDS_CSV = ROOT / "data" / "brands.csv"
HEROES_DIR = ROOT / "public" / "images" / "heroes"

sys.path.insert(0, str(ROOT))
from data.prefectures import PREFECTURES
from data.prefectures_extra import PREFECTURES_EXTRA
from data.brands_extra import BRANDS_EXTRA


def load_brands():
    brands = {}
    with BRANDS_CSV.open("r", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            median = row.get("yahoo_median_jpy_180d", "").strip()
            n = row.get("yahoo_sample_n", "0").strip()
            brands[row["slug"]] = {
                "slug": row["slug"],
                "name_ja": row["name_ja"],
                "name_en": row["name_en"],
                "category": row["category"],
                "rarity": row["rarity_tier"],
                "description": row["description"],
                "yahoo_median": int(median) if median.isdigit() else None,
                "yahoo_n": int(n) if n.isdigit() else 0,
                "yahoo_date": row.get("yahoo_fetched_at", "").strip() or "—",
            }
    return brands


CAT_JA = {"japanese-whisky": "ジャパニーズウイスキー", "scotch-whisky": "スコッチウイスキー"}

CAT_JA = {"japanese-whisky": "ジャパニーズウイスキー", "scotch-whisky": "スコッチウイスキー"}

H1_PATTERNS = [
    "{pref}で{brand}を売却・査定する際のガイド",
    "{pref}の{brand}市場相場と業者比較",
    "{brand}を{pref}で売る — 業者選びと相見積もりのコツ",
    "{pref}エリア対応の{brand}買取ガイド",
    "{brand}市場相場と業者比較【{pref}最新版】",
    "{brand}を{pref}で高く売る方法|相場・業者・査定のポイント",
    "{pref}対応|{brand}の買取査定・市場相場と業者選定",
    "【{pref}】{brand}の売却に向けた業者比較と相場",
    "{brand}の買取相場と{pref}対応業者の選び方",
    "{pref}で{brand}を高く売却するための業者選定ガイド",
]

INTRO_PATTERNS = [
    "{pref}（人口{pop}、{households}、主要都市: {cities}）で{brand}の売却を検討している方向けのガイドです。本ページでは、{pref}における{brand}の **市場相場（Yahoo中央値）**・地元対応業者・複数業者で比較する手順を解説します。{pref}は{industries}を主要産業とする地域で、ウイスキーの二次流通の需要もあります。",
    "{brand}を{pref}で査定に出したい方のためのガイドです。{pref}の人口は{pop}（{households}）で、主要都市は{cities}です。{region}地方の主要な経済圏（県内総生産 約{gdp_label}）で、ウイスキー買取の需要もあります。",
    "「{pref}で{brand}を売りたい」という方のためのガイドです。{pref}は{region}地方の中核となる地域（人口{pop}、{households}、主要都市は{cities}）で、ウイスキー専門業者・大手総合業者の両方が出張・店頭・宅配で対応しています。1人あたり県民所得は{income}です。",
    "{pref}で{brand}の買取を検討している方向けのガイドです。人口{pop}の{pref}（{cities}、{households}）では、地域密着の業者と全国対応の大手の両方が買取に対応しており、相見積もりを取りやすい環境です。{pref}の酒類消費は{alcohol_rank}です。本ページでは、Yahoo中央値にもとづく市場相場と、3業者への参考リンクを掲載しています。",
    "本ページは{pref}における{brand}の業者査定ガイドです。市場相場は Yahoo Auctions 過去180日の落札データ中央値（実勢データ）を使用し、業者買取額は3業者の公式ページへ直リンクして比較できる構成です。{pref}は{industries}を主要産業とする地域です。",
    "{pref}（{region}地方・人口{pop}）で{brand}を売却する方向けの業者比較ガイドです。県内には酒類小売業免許場が{retail_stores}あり、{cities}を中心に出張・店頭・宅配の各方式で査定が受けられます。気候特性（{climate}）も、保管・査定時の参考としてご確認ください。",
    "{pref}で{brand}の査定・売却を検討している方向けのガイドです。{pref}は1人あたり県民所得 {income}・県内総生産 約{gdp_label} の経済圏で、ウイスキー専門業者と大手総合業者の両方が出張・店頭・宅配で対応しています。本ページでは、市場相場（Yahoo中央値）と3業者への参考リンクを掲載しています。",
    "{pref}（{cities}を中心とした{households}・人口{pop}）で{brand}を売却する方向けのガイドです。{pref}の酒類消費は{alcohol_rank}です。本ページの市場相場は Yahoo Auctions 中央値ベースで、各業者の最新査定額は3業者ページから直接ご確認いただけます。",
    "{pref}で{brand}を売却する際の相場と業者の選び方を解説します。{pref}は{industries}を主要産業とする、人口{pop}・{households}の地域で、{cities}を中心に酒類小売業の免許場が{retail_stores}あります。専門業者・総合業者が出張査定に対応しており、相見積もりを取りやすい環境です。",
    "{pref}で{brand}の売却を検討している方向けのガイドです。{pref}（{region}地方、1人あたり県民所得 {income}）では、ウイスキー専門業者（LINXAS等）と大手総合業者（バイセル・福ちゃん）が買取に対応しています。気候特性（{climate}）は、{brand}の保管・査定にも関係します。本ページでは、市場相場と業者選定のポイントを整理しています。",
]


def hero_path(slug: str) -> str:
    p = HEROES_DIR / f"{slug}.png"
    if p.exists():
        return f"/images/heroes/{slug}.png"
    return "/images/article-yamazaki.png"


def fmt(n):
    if n is None:
        return "市場相場データ集計中"
    return f"¥{n:,}"


def build_page(brand: dict, pref_slug: str) -> str:
    p = PREFECTURES[pref_slug]
    b = brand
    slug = b["slug"]
    h = hashlib.md5(f"{slug}-{pref_slug}".encode()).hexdigest()
    h_int = int(h[:8], 16)

    median = b["yahoo_median"]
    sufficient = median is not None and b["yahoo_n"] >= 20
    market_label = fmt(median) if sufficient else "現在集計中"
    median_str = (
        f"{fmt(median)}（Yahoo Auctions 過去180日の落札中央値、サンプル数 n={b['yahoo_n']}、取得日 {b['yahoo_date']}）"
        if sufficient else f"過去180日の落札データが20件に満たないため、市場相場の中央値は掲載していません（取得日 {b['yahoo_date']}、サンプル数 n={b['yahoo_n']}）"
    )

    pe = PREFECTURES_EXTRA.get(pref_slug, {})
    be = BRANDS_EXTRA.get(slug, {})
    # 公式URLが無い／使えない（パーキング等）銘柄はリンクを出さない（2026-10-17）
    _ou = be.get("distillery_official_url", "")
    official_cell = (
        f'<a href="{_ou}" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">{_ou}</a>'
        if _ou else "—"
    )

    gdp_label = pe.get("gdp_billion_jpy", "—")
    try:
        gdp_int = int(gdp_label.replace(",", ""))
        gdp_label = f"{gdp_int/1000:.1f}兆円" if gdp_int >= 1000 else f"{gdp_int}十億円"
    except (ValueError, AttributeError):
        gdp_label = "—"

    h1 = H1_PATTERNS[h_int % len(H1_PATTERNS)].format(pref=p["name_ja"], brand=b["name_ja"])
    intro = INTRO_PATTERNS[h_int % len(INTRO_PATTERNS)].format(
        pref=p["name_ja"], pop=p["population"], cities=p["cities"],
        brand=b["name_ja"], region=p["region"],
        households=pe.get("households", "—"),
        income=pe.get("average_income", "—"),
        gdp_label=gdp_label,
        industries=pe.get("major_industries", "多様な産業"),
        alcohol_rank=pe.get("alcohol_consumption_rank", "全国平均水準"),
        retail_stores=pe.get("liquor_retail_stores", "—"),
        climate=pe.get("climate_type", "—"),
    )

    if sufficient:
        title = f"【2026年最新】{p['name_ja']}で{b['name_ja']}を売る｜市場相場(Yahoo中央値){market_label}・業者比較"
        description = f"{p['name_ja']}（{p['cities']}）で{b['name_ja']}を売却するなら？市場相場 {market_label}（Yahoo Auctions 過去180日中央値）、{p['region']}地方の地元業者と3業者参考リンクを掲載。"
    else:
        title = f"【2026年最新】{p['name_ja']}で{b['name_ja']}を売る｜業者比較・買取査定ガイド"
        description = f"{p['name_ja']}（{p['cities']}）で{b['name_ja']}を売却するなら？{p['region']}地方の地元業者と3業者参考リンクを掲載。市場相場は集計中です。最新の査定額は各業者にご確認ください。"

    state_rows_html = "".join(
        f"<tr><td>{label}</td><td>{coef}</td></tr>"
        for label, coef in [
            ("未開封・付属品完備（箱・冊子揃い）", "市場相場の95〜100%程度"),
            ("未開封・箱なし", "市場相場の80〜90%程度"),
            ("未開封・ラベル軽度汚れ", "市場相場の75〜88%程度"),
            ("未開封・液面減少", "市場相場の55〜70%程度"),
            ("開封済み・9割以上残", "市場相場の30〜40%程度"),
            ("開封済み・半分以下残", "市場相場の15〜25%程度"),
        ]
    )

    dealer_rows = "".join(
        f"<tr><td><strong>{d[0]}</strong></td><td>{d[1]}</td><td>{d[2]}</td><td>{d[3]}</td></tr>"
        for d in p["local_dealers"]
    )

    faqs = [
        (
            f"{p['name_ja']}で{b['name_ja']}は出張買取してもらえますか？",
            f"はい。{p['name_ja']}（{p['cities']}）は{p['region']}地方の中核エリアです。掲載しているバイセルは出張買取を「離島を除く日本全国」で受け付けており、申込から最短即日の訪問に対応しています（公式サイト・2026年10月16日確認）。福ちゃんも出張買取を行っていますが、対応エリアは公式サイトに記載がないため、申込時にご確認ください。",
        ),
        (
            f"{p['name_ja']}の{b['name_ja']}市場相場は他県と差がありますか？",
            f"市場相場（Yahoo中央値）は全国共通ですが、業者買取額は地域や業者で異なります。{b['name_ja']}の現在の市場相場は {market_label}（Yahoo Auctions 中央値）です。実際の業者の査定額は、LINXAS / バイセル / 福ちゃん の各社ページでご確認ください。",
        ),
        (
            f"{p['name_ja']}の店頭買取で{b['name_ja']}は売れますか？",
            f"はい、{p['cities']}を中心に、専門店・お酒の買取店で店頭買取を受けられます。高額なボトルの場合は、事前予約のうえ、専門の査定士による査定を受けることをおすすめします。",
        ),
        (
            f"{b['name_ja']}を{p['name_ja']}で売る時期はいつがよいですか？",
            f"年末年始・お中元の時期（11〜12月、6〜7月）は高値の傾向があります。{p['region']}地方の業者は、需要期に査定額が10〜15%上昇する傾向があります。早めに相見積もりを取ることをおすすめします。",
        ),
    ]

    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in faqs
        ],
    }
    article_schema = {
        "@context": "https://schema.org", "@type": "Article", "headline": h1,
        "datePublished": "2026-05-19", "dateModified": b["yahoo_date"],
        "author": {"@type": "Organization", "name": "PeatBid編集部"},
        "publisher": {"@type": "Organization", "name": "PeatBid"},
    }
    service_schema = {
        "@context": "https://schema.org", "@type": "Service",
        "areaServed": {"@type": "AdministrativeArea", "name": p["name_ja"]},
        "serviceType": "ウイスキー買取相場", "provider": {"@type": "Organization", "name": "PeatBid"},
    }

    hero = hero_path(slug)
    # MarketPriceCard requires price-history JSON
    json_exists = (ROOT / "data" / "price-history" / f"{slug}.json").exists()
    price_card_import = (
        'import MarketPriceCard from "@/components/MarketPriceCard";\n'
        f'import priceData from "@/data/price-history/{slug}.json";\n'
        if json_exists else ""
    )
    price_card = '<MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />' if json_exists else ""

    faq_html = "".join(
        f'''<details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>{q}</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{{{ __html: {json.dumps(a)} }}}} />
          </details>''' for q, a in faqs
    )

    canonical_url = f"https://peatbid.com/tier2/{pref_slug}/{slug}-kaitori/"

    return f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";
{price_card_import}
export const metadata: Metadata = {{
  title: "{title}",
  description: "{description}",
  alternates: {{ canonical: "{canonical_url}" }},
  openGraph: {{ type: "website", siteName: "PeatBid", locale: "ja_JP", url: "{canonical_url}", images: ["/og-image.png"] }},
  robots: {{ index: true, follow: true }},
}};

function Schema() {{
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(json.dumps(faq_schema, ensure_ascii=False))} }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(json.dumps(article_schema, ensure_ascii=False))} }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(json.dumps(service_schema, ensure_ascii=False))} }}}} />
    </>
  );
}}

export default function Page() {{
  return (
    <>
      <Schema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/tier2/" className="hover:text-amber-dark transition-colors">地域別買取</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/tier2/{pref_slug}/" className="hover:text-amber-dark transition-colors">{p['name_ja']}</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{b['name_ja']}</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="{hero}" alt="{b['name_ja']}の市場相場 {p['name_ja']}" width={{1408}} height={{768}} className="w-full h-[240px] md:h-[300px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <div className="flex flex-wrap gap-2 mb-3 not-prose">
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">{p['region']}・{p['name_ja']}</span>
            <span className="bg-burgundy/15 text-burgundy text-xs font-bold px-3 py-1 rounded-full">{CAT_JA.get(b['category'], b['category'])}</span>
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">2026年版</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{h1}</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {b['yahoo_date']} / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          {price_card}

          <h2>1. {p['name_ja']}における{b['name_ja']}の市場概況</h2>
          <p>{intro}</p>
          <p><strong>地域の市場の特徴</strong>: {p['demand']}</p>
          <p>{b['name_ja']}のような銘柄は二次流通が活発で、複数の買取業者が出張・店頭・宅配で対応しています。</p>
          <p>{p['name_ja']}には<strong>地域密着の専門業者</strong>と<strong>全国対応の大手</strong>の両方があるため、複数の業者で見積もりを比較できます。</p>

          <h2>2. {b['name_ja']}の市場相場（Yahoo中央値）</h2>
          <p>{b['name_ja']}の市場相場は<strong>{market_label}</strong>です（{median_str}）。{b['description']}</p>
          <p>業者の買取査定額は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。</p>

          <h3 className="!mt-6">2-1. {b['name_ja']}の基本プロフィール（公式情報）</h3>
          <div className="table-wrapper not-prose">
            <table className="text-sm">
              <tbody>
                <tr><th className="text-left bg-cream/30 px-3 py-2">流通ステータス</th><td className="px-3 py-2">{be.get("status", "—")}</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">国内発売年</th><td className="px-3 py-2">{be.get("first_release_year", "—")}</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">後継品</th><td className="px-3 py-2">{be.get("successor_product", "—")}</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">テイスティング特徴</th><td className="px-3 py-2">{be.get("flavor_profile", "—")}</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">コレクション価値</th><td className="px-3 py-2">{be.get("collectibility_note", "—")}</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">海外オークション直近</th><td className="px-3 py-2">{be.get("recent_overseas_auction", "—")}</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">公式情報</th><td className="px-3 py-2">{official_cell}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※流通ステータスや後継品の情報は、{be.get("status_as_of", "2026年5月")}時点の公式情報にもとづきます。海外オークションの直近の落札は参照時点のものです。最新の市況は、各オークションの公式サイトでご確認ください。</p>

          <h2>3. 状態別の業界目安（パーセンテージ）</h2>
          <p>市場相場（Yahoo中央値）を基準（100%）とした業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>状態</th><th>業界目安（市場相場対比）</th></tr></thead>
              <tbody>{state_rows_html}</tbody>
            </table>
          </div>

          <h2>4. {p['name_ja']}のウイスキー買取市場の特性（経済データ）</h2>
          <p>{p['name_ja']}は{p['region']}地方に位置し、人口{p['population']}・{pe.get("households", "—")}の地域です。ウイスキーの二次流通に関係する公的統計データは、以下のとおりです。</p>
          <div className="table-wrapper not-prose">
            <table className="text-sm">
              <tbody>
                <tr><th className="text-left bg-cream/30 px-3 py-2">県内総生産</th><td className="px-3 py-2">約{gdp_label}（内閣府 県民経済計算 R3年度）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">1人あたり県民所得</th><td className="px-3 py-2">{pe.get("average_income", "—")}（内閣府 R3年度確報）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">酒類消費量ランク</th><td className="px-3 py-2">{pe.get("alcohol_consumption_rank", "—")}（国税庁 酒のしおり R5年版）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">酒類小売業免許場数</th><td className="px-3 py-2">{pe.get("liquor_retail_stores", "—")}（国税庁 R4年3月末）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">気候特性</th><td className="px-3 py-2">{pe.get("climate_type", "—")}（気象庁 気候区分）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">主要産業</th><td className="px-3 py-2">{pe.get("major_industries", "—")}</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">主要駅・路線</th><td className="px-3 py-2">{pe.get("main_stations", "—")}</td></tr>
              </tbody>
            </table>
          </div>
          <p>経済規模・所得水準・酒類消費の動向は、ウイスキーの二次流通市場の活発さを示す指標の一つです。{p['name_ja']}の酒類消費は<strong>{pe.get("alcohol_consumption_rank", "全国水準")}</strong>、主要産業は<strong>{pe.get("major_industries", "多様な産業基盤")}</strong>です。</p>

          <h2>5. {p['name_ja']}で{b['name_ja']}を売る — 業者の選び方と査定取得先</h2>
          <p>{p['name_ja']}で{b['name_ja']}を売却する際の業者は、大きく2つのタイプに分かれます。両方のタイプから相見積もりを取ることをおすすめします。</p>

          <h3 className="!mt-6">5-1. {p['name_ja']}の地元・対応買取業者</h3>
          <p>{p['region']}地方で出張・店頭・宅配に対応している業者です。地域に密着した専門知識と、迅速な対応が強みです。{pe.get("main_stations", "県内主要駅")}周辺にも対応している場合が多くあります。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody>{dealer_rows}</tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※対応状況は変更される場合があります。事前に公式サイトでご確認いただくか、複数の業者に同時に査定を依頼することをおすすめします。</p>

          <h3 className="!mt-6">5-2. 全国対応の主要3業者（最新査定額の取得先）</h3>
          <p>当サイトでは買取額の固定値は掲載していません。各業者の最新の査定額・キャンペーン情報は、以下の公式ページでご確認いただけます。地域の業者とあわせて、3〜5社で相見積もりを取ることをおすすめします。</p>
          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています。出張は離島を除き{p['name_ja']}全域に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています。出張・宅配・店舗の3つの方式があります（出張の対応エリアは公式サイトに記載がないため、申込時にご確認ください）</li>
            
          </ul>

          <h2>6. {b['name_ja']}の保管と輸送 — {p['name_ja']}の気候特性を踏まえて</h2>
          <p>{p['name_ja']}の気候特性は「<strong>{pe.get("climate_type", "—")}</strong>」（気象庁の気候区分）です。{b['name_ja']}の保管・輸送の際は、以下の点にご留意ください。</p>
          <p><strong>保管時の基本</strong>: {be.get("storage_advice", "アルコール度数43%前後。直射日光・高温多湿を避け、15-20℃の冷暗所で縦置き保管。")}</p>
          <ul>
            <li><strong>温度管理</strong>: 夏季は冷暗所で保管し、冬季は凍結を避けてください（特に北日本・日本海側）</li>
            <li><strong>湿度</strong>: 湿度50〜70%が適しています。湿度が低すぎるとコルクが乾燥して液漏れの原因となり、高すぎるとラベルが劣化します</li>
            <li><strong>振動の回避</strong>: 縦置きでの保管が基本です。横置きはコルクの劣化を早めるため、おすすめしません</li>
            <li><strong>輸送時</strong>: 宅配買取の場合は、緩衝材を十分にご使用ください。破損した場合は買取不可となるため、業者が指定する梱包方法に従ってください</li>
            <li><strong>発送の時期</strong>: 季節による温度差が大きい時期の発送は避け、春・秋の気候が安定した時期の発送をおすすめします</li>
          </ul>

          <h2>7. {b['name_ja']}の最新オークション動向と査定への影響</h2>
          <p>{b['name_ja']}の市場価値は、国内市場（Yahoo Auctions）と海外オークションの両方で形成されます。直近の動向を踏まえて、売却の時期をご判断ください。</p>
          <ul>
            <li><strong>国内市場（Yahoo Auctions 過去180日中央値）</strong>: {market_label}（{median_str}）</li>
            <li><strong>海外オークション直近</strong>: {be.get("recent_overseas_auction", "情報なし")}</li>
            <li><strong>コレクション価値</strong>: {be.get("collectibility_note", "—")}</li>
            <li><strong>流通ステータス</strong>: {be.get("status", "—")}（{be.get("first_release_year", "—")}発売）</li>
          </ul>
          <p>海外オークションで高値が付いた直後は、国内の業者の買取査定額も上昇する傾向があります。一方、下落の局面では業者の買取意欲も低下するため、上昇傾向の時期に複数の業者で相見積もりを取ることをおすすめします。</p>

          <h2>8. {p['name_ja']}で{b['name_ja']}を高く売る3つのポイント</h2>
          <ol>
            <li>
              <strong>複数の業者で相見積もりを取る</strong>: 3社以上、できれば5社（地域の業者と全国対応の業者）から見積もりを取り、比較することをおすすめします。同じ{b['name_ja']}でも業者ごとに在庫状況・キャンペーン・査定基準が異なり、業界の目安として<strong>10〜20%の査定差</strong>が生じる場合があります。同じ日に複数の業者へ査定を依頼すると、比較しやすくなります。
            </li>
            <li>
              <strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書・ギャランティカードを揃えることで、業界の目安として<strong>市場相場の10〜20%</strong>査定額が上がります。{b['name_ja']}のような銘柄では、付属品の有無が査定額に大きく影響します。発売当時の包装紙やコルク表面の状態、ボトルナンバーの読み取りの可否も評価の対象となるため、購入時の状態をできる限り保ってください。
            </li>
            <li>
              <strong>需要期に売る</strong>: 年末年始（11〜12月）、お中元・お歳暮の時期（6〜7月、11〜12月）、新生活の前（2〜3月）は高値の傾向があります。これらの時期は贈答需要やコレクター需要が高まり、業者の仕入れ意欲も高まります。年末年始と春先の需要期には、査定額が<strong>10〜15%上昇</strong>する傾向があります。一方、夏場（8〜9月）や年明け（1月下旬〜2月）は需要が落ち着き、査定額もやや下がる傾向があります。海外オークションの動向も、売却の時期の参考になります。
            </li>
            
            
          </ol>

          <h2>9. {p['name_ja']}の{b['name_ja']}買取で注意すべき点</h2>
          <ul>
            <li><strong>本人確認書類が必要です</strong>: 古物営業法により、本人確認が必要です（運転免許証・マイナンバーカード等）。出張査定の場合も、事前に本人確認書類をご準備ください。住所・氏名・生年月日が確認できる公的書類が必要で、健康保険証など顔写真のない書類の場合は、補助書類（公共料金の請求書等）が必要な場合もあります。</li>
            <li><strong>未成年（18歳未満）の方は売却できません</strong>: 親権者の同意がある場合も同様です。古物営業法により、未成年からの買取は厳格に禁止されています。所有者が未成年の場合は、相続・贈与の手続きを経て、成人が売却する必要があります。</li>
            
            <li><strong>輸送のリスク</strong>: 宅配買取の場合は、緩衝材を十分に使用し、業者が指定する梱包方法に従ってください。季節によっては、輸送中の温度変化が品質に影響する場合があります。できる限り、温度変化の小さい時期（春・秋）の発送をおすすめします。輸送中の破損は買取不可となる場合が多く、業者の保険の対象外となる場合もあります。</li>
            
            <li><strong>査定額の根拠の確認</strong>: 業者から提示された査定額の根拠（市場相場・在庫状況・状態評価）を必ずご確認ください。透明性のある業者ほど、根拠を明確に説明する傾向があります。{b['name_ja']}の市場相場（Yahoo中央値 {market_label}）と比較し、提示額が市場相場の60〜80%の範囲から大きく外れる場合は、その理由をご確認ください。</li>
            <li><strong>キャンセル・取消の取り扱い</strong>: 査定後すぐに契約を急がせる業者にはご注意ください。出張買取（訪問購入）の場合は、特定商取引法により8日以内のクーリング・オフが認められています（店頭への持ち込みは対象外です）。査定額に納得できない場合は、その場でお断りいただいて問題ありません。</li>
          </ul>

          <h2>10. よくある質問</h2>
          {faq_html}

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/{slug}-kaitori/" className="text-amber-dark hover:text-burgundy underline">{b['name_ja']}の市場相場（全国版）</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー市場相場一覧</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {b['yahoo_date']}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}}
'''


def main():
    brands = load_brands()
    total = len(brands) * len(PREFECTURES)
    print(f"Generating {total} tier2 pages (Plan A compliant)...")

    written = 0
    for brand_slug, b in brands.items():
        for pref_slug in PREFECTURES.keys():
            out_dir = ARTICLES_DIR / pref_slug / f"{brand_slug}-kaitori"
            out_dir.mkdir(parents=True, exist_ok=True)
            (out_dir / "page.tsx").write_text(build_page(b, pref_slug), encoding="utf-8")
            written += 1
            if written % 250 == 0:
                print(f"  ... {written}/{total}", flush=True)

    print(f"\n✅ {written} pages written")

    # 関連リンク（近隣県・同じ県の関連銘柄）を入れ直す。これを飛ばすとリーフが県ハブからしか
    # 張られない孤立ページに戻る（2026-08-04 の再生成で実際に起きた → 10/5 公開前チェック不合格）。
    import subprocess
    import sys
    subprocess.run([sys.executable, str(Path(__file__).resolve().parent / "patch-tier2-related-links.py")], check=True)


if __name__ == "__main__":
    main()
