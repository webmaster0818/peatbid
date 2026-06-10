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
- 4-dealer reference links (LINXAS / バイセル / 福ちゃん / JOYLAB)
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


H1_PATTERNS = [
    "{pref}で{brand}を売却・査定する完全ガイド",
    "{pref}の{brand}市場相場と業者比較",
    "{brand}を{pref}で売る — 業者選びと相見積もりのコツ",
    "{pref}エリア対応の{brand}買取ガイド",
    "{brand}市場相場と業者比較【{pref}最新版】",
    "{brand}を{pref}で高く売る方法|相場・業者・査定のポイント",
    "{pref}対応|{brand}の買取査定・市場相場と業者選定",
    "【{pref}】{brand}を売るなら知っておきたい業者比較と相場",
    "{brand}の買取相場と{pref}対応業者の選び方",
    "{pref}で{brand}を最高値で売却するための業者選定ガイド",
]

INTRO_PATTERNS = [
    "{pref}（人口{pop}、{households}、主要都市: {cities}）で{brand}を売却したい方へ。本ページでは、{pref}における{brand}の **市場相場（Yahoo中央値）**・地元対応業者・複数業者で比較する手順を解説します。{pref}の{industries}を背景に、ウイスキー二次流通需要も活発です。",
    "{brand}を{pref}で査定に出したい方のためのガイドです。{pref}には{pop}{households}が暮らし、主要都市は{cities}。{region}地方を代表する経済圏（県内総生産 約{gdp_label}）で、ウイスキー買取の需要も活発です。",
    "「{pref}で{brand}を売りたい」という方のためのガイドです。{pref}は{region}地方の中核（人口{pop}、{households}、{cities}が主要都市）で、ウイスキー専門業者・大手総合業者の両方が出張・店頭・宅配で対応しています。1人あたり県民所得 {income} を背景に、富裕層・コレクター層の二次流通市場も成熟しています。",
    "{brand}の買取を{pref}で検討中の方へ。{pop}が居住する{pref}（{cities}、{households}）には、地域密着業者と全国大手の両方が対応しており、相見積もりで高値が出やすい環境です。{pref}の酒類消費は{alcohol_rank}で、洋酒市場も活発。本ページでは Yahoo中央値ベースの市場相場と、4業者への参考リンクを掲載しています。",
    "本ページは{pref}における{brand}の業者査定ガイドです。市場相場は Yahoo Auctions 過去180日の落札データ中央値（実勢データ）を使用し、業者買取額は4業者の公式ページへ直リンクして比較できる構成です。{pref}は{industries}を主要産業に持ち、可処分所得水準と相まって洋酒コレクター需要も一定規模あります。",
    "{pref}（{region}地方・人口{pop}）で{brand}を売る方のための業者比較ガイドです。県内には酒類小売業免許場が{retail_stores}あり、{cities}を中心に出張・店頭・宅配の各方式で査定が受けられます。{climate}という気候特性も保管・査定時の参考にしてください。",
    "{brand}を{pref}で査定・売却したい方へ。{pref}は1人あたり県民所得 {income}・県内総生産 約{gdp_label} の経済圏で、ウイスキー専門業者と大手総合業者の両方が出張・店頭・宅配で対応しています。本ページでは市場相場（Yahoo中央値）と4業者参考リンクを掲載。",
    "{pref}（{cities}を中心とした{households}・{pop}）で {brand} を売る人のための完全ガイドです。{region}地方の経済圏では、酒類消費{alcohol_rank}を背景に二次流通市場も整っています。本ページの市場相場は Yahoo Auctions 中央値ベースで、各業者の最新査定額は4業者ページから直接ご確認いただけます。",
    "「{pref}で{brand}は高く売れる？」という疑問にお答えします。{pref}は{industries}が主要産業、人口{pop}・{households}の経済圏で、{cities}を中心に酒類小売店約{retail_stores}が分布しています。専門業者・総合業者の出張査定が活発で、相見積もりがしやすい環境です。",
    "{brand}を{pref}で売却検討の方へ。{pref}（{region}地方、1人あたり県民所得 {income}）には、ウイスキー専門業者（LINXAS・JOYLAB等）と大手総合業者（バイセル・福ちゃん）が対応しています。{climate}という気候特性も{brand}の保管・査定の観点で関連します。本ページでは市場相場と業者選定ポイントを整理。",
]


def hero_path(slug: str) -> str:
    p = HEROES_DIR / f"{slug}.png"
    if p.exists():
        return f"/images/heroes/{slug}.png"
    return "/images/article-yamazaki.png"


def fmt(n):
    if n is None:
        return "市場相場データ蓄積中"
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
        if sufficient else f"現在、過去180日の落札データが20件に満たないため市場相場の中央値は集計できていません（取得日 {b['yahoo_date']}、サンプル数 n={b['yahoo_n']}）"
    )

    pe = PREFECTURES_EXTRA.get(pref_slug, {})
    be = BRANDS_EXTRA.get(slug, {})

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
        description = f"{p['name_ja']}（{p['cities']}）で{b['name_ja']}を売却するなら？市場相場 {market_label}（Yahoo Auctions 過去180日中央値）、{p['region']}地方の地元業者と4業者参考リンクを掲載。"
    else:
        title = f"【2026年最新】{p['name_ja']}で{b['name_ja']}を売る｜業者比較・買取査定ガイド"
        description = f"{p['name_ja']}（{p['cities']}）で{b['name_ja']}を売却するなら？{p['region']}地方の地元業者と4業者参考リンクを掲載。市場相場は現在データ蓄積中で、確定額は各業者の最新査定でご確認ください。"

    state_rows_html = "".join(
        f"<tr><td>{label}</td><td>{coef}</td></tr>"
        for label, coef in [
            ("未開封・完璧（箱・冊子揃い）", "市場相場の95〜100%程度"),
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
            f"はい。{p['name_ja']}（{p['cities']}）は{p['region']}地方の中核エリアで、{', '.join(d[0] for d in p['local_dealers'][:3])}など主要業者が出張買取対応エリアにしています。最短即日対応も可能です。",
        ),
        (
            f"{p['name_ja']}の{b['name_ja']}市場相場は他県と差がありますか？",
            f"市場相場（Yahoo中央値）は全国共通ですが、業者買取額は地域や業者で異なります。{b['name_ja']}の現在の市場相場は {market_label}（Yahoo Auctions 中央値）。実際の業者査定は LINXAS / バイセル / 福ちゃん / JOYLAB 各社ページでご確認ください。",
        ),
        (
            f"{p['name_ja']}の店頭買取で{b['name_ja']}は売れますか？",
            f"はい、{p['cities']}を中心に専門店・お酒買取店で店頭買取可能です。{b['name_ja']}は{b['rarity']}クラスの銘柄のため、事前予約・専門査定士の同行を推奨します。",
        ),
        (
            f"{b['name_ja']}を{p['name_ja']}で売るベストタイミングは？",
            f"年末年始・お中元シーズン（11〜12月、6〜7月）が高値傾向。{p['region']}地方の業者は需要期に査定額が10〜15%上昇する傾向があります。早めの相見積もり推奨。",
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
            <span className="bg-burgundy/15 text-burgundy text-xs font-bold px-3 py-1 rounded-full">{b['category']}</span>
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">2026年最新</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{h1}</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {b['yahoo_date']} / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          {price_card}

          <h2>1. {p['name_ja']}における{b['name_ja']}の市場概況</h2>
          <p>{intro}</p>
          <p>{p['demand']}。そのため{b['name_ja']}のような{b['category']}カテゴリの銘柄も二次流通が活発で、複数の買取業者が出張・店頭・宅配で対応しています。</p>
          <p>{p['name_ja']}には<strong>地域密着の専門業者</strong>と<strong>全国対応の大手</strong>の両方があるため、複数業者で見積もりを比較できる環境です。</p>

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
                <tr><th className="text-left bg-cream/30 px-3 py-2">公式情報</th><td className="px-3 py-2"><a href="{be.get('distillery_official_url', '#')}" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">{be.get('distillery_official_url', '—')}</a></td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※流通ステータスや後継品情報は2026年5月時点の公式情報に基づきます。海外オークション直近落札は参照時点のものであり、最新の市況は各オークションサイト公式で確認してください。</p>

          <h2>3. 状態別の業界目安（パーセンテージ）</h2>
          <p>市場相場（Yahoo中央値）を基準（100%）とした業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>状態</th><th>業界目安（市場相場対比）</th></tr></thead>
              <tbody>{state_rows_html}</tbody>
            </table>
          </div>

          <h2>4. {p['name_ja']}のウイスキー買取市場の特性（経済データから読み解く）</h2>
          <p>{p['name_ja']}は{p['region']}地方に位置し、人口{p['population']}・{pe.get("households", "—")}を擁する経済圏です。ウイスキー二次流通の活発度を、公的統計データから読み解きます。</p>
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
          <p>{p['name_ja']}の経済規模・所得水準・酒類消費動向は、ウイスキー二次流通市場の活発度を示す重要な指標です。<strong>{pe.get("alcohol_consumption_rank", "全国水準")}</strong>という酒類消費水準と、<strong>{pe.get("major_industries", "多様な産業基盤")}</strong>を主要産業に持つ経済構造から、{b['name_ja']}のような{b['category']}カテゴリの銘柄も安定した買取需要があると考えられます。</p>

          <h2>5. {p['name_ja']}で{b['name_ja']}を売る — 業者の選び方と査定取得先</h2>
          <p>{p['name_ja']}で{b['name_ja']}を売却する際の業者は大きく2タイプに分かれます。最高値を引き出すには、両方から相見積もりを取るのが鉄則です。</p>

          <h3 className="!mt-6">5-1. {p['name_ja']}の地元・対応買取業者</h3>
          <p>{p['region']}地方を出張・店頭・宅配でカバーしている業者です。地域密着の専門知識と、足の早い対応が強み。{pe.get("main_stations", "県内主要駅")}周辺へのアクセスにも対応するケースが多いです。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody>{dealer_rows}</tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※対応状況は変動する場合があります。事前に公式サイトで確認するか、複数業者へ同時に査定依頼を出すのがおすすめです。</p>

          <h3 className="!mt-6">5-2. 全国対応の主要4業者（最新査定額の取得先）</h3>
          <p>本サイトでは買取額の固定値は提示せず、各業者の最新の査定額・キャンペーン情報を以下の公式ページから直接確認できます。地元業者と合わせて、最低 3〜5 社で相見積もりするのが推奨です。</p>
          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店。{b['name_ja']}のような{b['rarity']}クラス銘柄の参考価格を公開</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応。{p['name_ja']}全域出張可能</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> — 総合買取の大手、お酒査定にも対応。{p['cities']}を中心に対応</li>
            <li><a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">JOYLAB</a> — お酒買取専門、希少銘柄の鑑定査定に強み。{b['name_ja']}のような{b['rarity']}クラスにも対応</li>
          </ul>

          <h2>6. {b['name_ja']}の保管と輸送 — {p['name_ja']}の気候特性を踏まえて</h2>
          <p>{p['name_ja']}は<strong>{pe.get("climate_type", "—")}</strong>という気候特性があり、{b['name_ja']}の保管・輸送時には以下に留意してください。</p>
          <p><strong>保管時の基本</strong>: {be.get("storage_advice", "アルコール度数43%前後。直射日光・高温多湿を避け、15-20℃の冷暗所で縦置き保管。")}</p>
          <ul>
            <li><strong>温度管理</strong>: {p['name_ja']}の{pe.get("climate_type", "気候")}を踏まえ、夏季は冷暗所、冬季は凍結を避ける（特に北日本・日本海側）</li>
            <li><strong>湿度</strong>: 湿度50-70%が理想。湿度が低すぎるとコルク乾燥でリーカー化、高すぎるとラベル劣化</li>
            <li><strong>振動回避</strong>: 縦置き保管が基本。横置きはコルク劣化を早めるため非推奨</li>
            <li><strong>輸送時</strong>: 宅配買取の場合、緩衝材を十分に。割れた場合は買取不可になるため、業者指定の梱包方法に従う</li>
            <li><strong>{p['name_ja']}特有の留意点</strong>: {pe.get("climate_type", "—")}の地域では、季節の温度差が大きい時期の発送は避ける（春・秋の安定期推奨）</li>
          </ul>

          <h2>7. {b['name_ja']}の最新オークション動向と査定への影響</h2>
          <p>{b['name_ja']}の市場価値は、国内市場（Yahoo Auctions）と海外オークションの両方で形成されます。直近の動向を踏まえて売却タイミングを判断しましょう。</p>
          <ul>
            <li><strong>国内市場（Yahoo Auctions 過去180日中央値）</strong>: {market_label}（{median_str}）</li>
            <li><strong>海外オークション直近</strong>: {be.get("recent_overseas_auction", "情報なし")}</li>
            <li><strong>コレクション価値</strong>: {be.get("collectibility_note", "—")}</li>
            <li><strong>流通ステータス</strong>: {be.get("status", "—")}（{be.get("first_release_year", "—")}発売）</li>
          </ul>
          <p>海外オークションで高値が付いた直後は、国内業者の買取査定額も上昇する傾向があります。逆に下落局面では業者の買取意欲も減退するため、上昇トレンドのタイミングで複数業者の相見積もりを取るのが理想です。</p>

          <h2>8. {p['name_ja']}で{b['name_ja']}を高く売る5つのコツ</h2>
          <ol>
            <li>
              <strong>複数業者で相見積もり</strong>: 最低3社、できれば5社（地元業者+全国業者）の見積もりで最高値を選ぶことが鉄則です。同じ{b['name_ja']}でも業者ごとに在庫状況・キャンペーン・査定基準が異なり、業界目安として<strong>10〜20%の査定差</strong>が出ることは珍しくありません。{p['name_ja']}は{pe.get("alcohol_consumption_rank", "全国水準")}の酒類消費圏で、業者間の競争も活発なため、相見積もりによる引き上げ効果が出やすい地域です。同時査定（同日に複数業者へ依頼）で各社の本気度を引き出すと、より高い金額が提示される傾向があります。
            </li>
            <li>
              <strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書・ギャランティカードを揃えることで、業界目安として<strong>市場相場の10〜20%上昇</strong>します。特に{b['name_ja']}（{b['rarity']}クラス）のような銘柄では、付属品の有無が査定額に大きく影響します。発売当時の包装紙やコルク表面の状態、ボトルナンバーの読み取り可否も評価対象になるため、購入時の状態を可能な限り保持しておきましょう。{be.get("collectibility_note", "")}のような銘柄では、特に状態維持が査定額の差を生みます。
            </li>
            <li>
              <strong>{p['region']}地方の需要期に売る</strong>: 年末年始（11〜12月）、お中元・お歳暮シーズン（6〜7月、11〜12月）、新生活前（2〜3月）が高値傾向です。これらの時期は贈答需要やコレクター需要が高まり、業者側の仕入れ意欲も上昇します。{p['name_ja']}では{pe.get("major_industries", "経済活動")}を背景に、年末年始と春先の需要期で査定額が<strong>10〜15%上昇</strong>する傾向があります。逆に夏場（8〜9月）や年明け（1月下旬〜2月）は需要が落ち着き、査定額もやや下がる傾向。{b['name_ja']}が{be.get("status", "")}の場合、海外オークションの動向も売却タイミングの参考になります。
            </li>
            <li>
              <strong>地域密着業者と全国業者を比較</strong>: {p['name_ja']}の地元業者は<strong>専門知識・足の早さ・地域顧客のニーズ把握</strong>が強み、全国業者は<strong>競争力ある提示額・キャンペーン展開・在庫リスク許容度</strong>が強みです。{pe.get("main_stations", "主要駅周辺")}にアクセスしやすい立地の地元業者と、出張・宅配でも対応する全国業者を組み合わせて見積もり比較することで、最高値を引き出せます。{b['name_ja']}のような{b['rarity']}クラスの銘柄では、専門知識を持つ業者（JOYLAB・LINXAS等）の査定が特に重要です。
            </li>
            <li>
              <strong>出張買取の場合は事前予約</strong>: {b['name_ja']}は{b['rarity']}クラスの銘柄のため、専門査定士の同行を事前に依頼するのが賢明です。{p['name_ja']}内の主要4業者（バイセル・福ちゃん・LINXAS・JOYLAB）は出張対応エリアにしていますが、{b['name_ja']}クラスの査定には専門知識が必要なため、事前に「{b['name_ja']}の査定希望」と伝えておくとスムーズです。{p['name_ja']}は{pe.get("climate_type", "気候")}の地域であり、出張査定の日程は{pe.get("climate_type", "気候")}を踏まえた季節選びも考慮するとよいでしょう。
            </li>
          </ol>

          <h2>9. {p['name_ja']}の{b['name_ja']}買取で注意すべき点</h2>
          <ul>
            <li><strong>身分証必須</strong>: 古物営業法により本人確認が必要（運転免許証・マイナンバーカード等）。出張査定でも事前に身分証の準備を。住所・氏名・生年月日が確認できる公的書類が必須で、健康保険証など顔写真がない書類の場合は補助書類（公共料金請求書等）が必要なケースもあります。</li>
            <li><strong>未成年（18歳未満）は売却不可</strong>: 親権者の同意も不可。古物営業法により、未成年からの買取は厳格に禁止されています。所有者が未成年の場合、相続・贈与の手続きを経て成人が売却する形式を取る必要があります。</li>
            <li><strong>偽物・贋作リスク</strong>: {b['name_ja']}のような{b['rarity']}クラス銘柄は、専門査定士の鑑定推奨です。{be.get("status", "現行品/終売品")}の{b['name_ja']}では特に贋作リスクが高まる傾向があり、ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性などを総合的にチェックします。JOYLABやLINXASのような専門業者では、贋作鑑定のための専門知識を持つ査定士が在籍しています。</li>
            <li><strong>輸送リスク</strong>: 宅配買取の場合、緩衝材を十分に巻き、業者指定の梱包方法に従いましょう。{p['name_ja']}は{pe.get("climate_type", "気候特性")}があり、季節によっては輸送中の温度変化が品質に影響する場合があります。可能な限り温度変化の小さい時期（春・秋）の発送が理想です。輸送中の破損は買取不可になることが多く、業者の保険対象外のケースも。</li>
            <li><strong>業者の評判確認</strong>: クチコミ・Googleレビュー・実績件数・運営年数を事前にチェックしましょう。古物商許可番号の表示も信頼性の指標。{p['name_ja']}内の地元業者は地域コミュニティでの評判も参考になります。本サイトで紹介している4業者（バイセル・福ちゃん・LINXAS・JOYLAB）はいずれも実績豊富で信頼性が確認できる業者です。</li>
            <li><strong>査定額の根拠を確認</strong>: 業者から提示された査定額の根拠（市場相場・在庫状況・状態評価）を必ず確認しましょう。透明性のある業者ほど、根拠を明確に説明します。{b['name_ja']}の市場相場（Yahoo中央値 {market_label}）と比較し、提示額が市場相場の60〜80%レンジから大きく外れる場合は、その理由を確認することが重要です。</li>
            <li><strong>キャンセル・取消の取り扱い</strong>: 査定後すぐの即決を急かす業者は要注意。古物営業法により、買取後8日間のクーリングオフ（条件付き）が認められる場合があります。査定額に納得できない場合は、その場で断る勇気も大切。{p['name_ja']}内では業者間の競争が活発なため、即決を強要されることは少ないですが、念のため留意しましょう。</li>
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

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {b['yahoo_date']}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
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


if __name__ == "__main__":
    main()
