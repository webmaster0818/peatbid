#!/usr/bin/env python3
"""
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
]

INTRO_PATTERNS = [
    "{pref}（人口{pop}、主要都市: {cities}）で{brand}を売却したい方へ。本ページでは、{pref}における{brand}の **市場相場（Yahoo中央値）**・地元対応業者・複数業者で比較する手順を解説します。",
    "{brand}を{pref}で査定に出したい方のためのガイドです。{pref}には{pop}が暮らし、主要都市は{cities}。{region}地方を代表する経済圏で、ウイスキー買取の需要も活発です。",
    "「{pref}で{brand}を売りたい」という方のためのガイドです。{pref}は{region}地方の中核（人口{pop}、{cities}が主要都市）で、ウイスキー専門業者・大手総合業者の両方が出張・店頭・宅配で対応しています。",
    "{brand}の買取を{pref}で検討中の方へ。{pop}が居住する{pref}（{cities}）には、地域密着業者と全国大手の両方が対応しており、相見積もりで高値が出やすい環境です。本ページでは Yahoo中央値ベースの市場相場と、4業者への参考リンクを掲載しています。",
    "本ページは{pref}における{brand}の業者査定ガイドです。市場相場は Yahoo Auctions 過去180日の落札データ中央値（実勢データ）を使用し、業者買取額は4業者の公式ページへ直リンクして比較できる構成です。",
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

    h1 = H1_PATTERNS[h_int % len(H1_PATTERNS)].format(pref=p["name_ja"], brand=b["name_ja"])
    intro = INTRO_PATTERNS[h_int % len(INTRO_PATTERNS)].format(
        pref=p["name_ja"], pop=p["population"], cities=p["cities"],
        brand=b["name_ja"], region=p["region"]
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
  robots: {{ index: false, follow: false }},
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
            <li><Link href="/articles/whisky-kaitori-souba/" className="hover:text-amber-dark transition-colors">市場相場</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{p['name_ja']}×{b['name_ja']}</span></li>
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

          <h2>3. 状態別の業界目安（パーセンテージ）</h2>
          <p>市場相場（Yahoo中央値）を基準（100%）とした業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>状態</th><th>業界目安（市場相場対比）</th></tr></thead>
              <tbody>{state_rows_html}</tbody>
            </table>
          </div>

          <h2>4. {p['name_ja']}で{b['name_ja']}を売る — 業者の選び方と査定取得先</h2>
          <p>{p['name_ja']}で{b['name_ja']}を売却する際の業者は大きく2タイプに分かれます。最高値を引き出すには、両方から相見積もりを取るのが鉄則です。</p>

          <h3 className="!mt-6">4-1. {p['name_ja']}の地元・対応買取業者</h3>
          <p>{p['region']}地方を出張・店頭・宅配でカバーしている業者です。地域密着の専門知識と、足の早い対応が強み。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody>{dealer_rows}</tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※対応状況は変動する場合があります。事前に公式サイトで確認するか、複数業者へ同時に査定依頼を出すのがおすすめです。</p>

          <h3 className="!mt-6">4-2. 全国対応の主要4業者（最新査定額の取得先）</h3>
          <p>本サイトでは買取額の固定値は提示せず、各業者の最新の査定額・キャンペーン情報を以下の公式ページから直接確認できます。地元業者と合わせて、最低 3〜5 社で相見積もりするのが推奨です。</p>
          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> — 総合買取の大手、お酒査定にも対応</li>
            <li><a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">JOYLAB</a> — お酒買取専門、希少銘柄の鑑定査定に強み</li>
          </ul>

          <h2>5. {p['name_ja']}で{b['name_ja']}を高く売る5つのコツ</h2>
          <ol>
            <li><strong>複数業者で相見積もり</strong>: 最低3社、できれば5社（地元業者+全国業者）の見積もりで最高値を選ぶ</li>
            <li><strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書を揃えて業界目安として10〜20%の差</li>
            <li><strong>{p['region']}地方の需要期に売る</strong>: 年末年始・お中元・お歳暮シーズン、新生活前の3月</li>
            <li><strong>地域密着業者と全国業者を比較</strong>: {p['name_ja']}の地元業者は専門知識・足の早さ、全国業者は競争力ある提示が強み</li>
            <li><strong>出張買取の場合は事前予約</strong>: {b['name_ja']}は{b['rarity']}クラスの銘柄のため、専門査定士の同行を依頼</li>
          </ol>

          <h2>6. {p['name_ja']}の{b['name_ja']}買取で注意すべき点</h2>
          <ul>
            <li><strong>身分証必須</strong>: 古物営業法により本人確認が必要（運転免許証・マイナンバーカード等）</li>
            <li><strong>未成年（18歳未満）は売却不可</strong>: 親権者の同意も不可</li>
            <li><strong>偽物・贋作リスク</strong>: {b['name_ja']}のような銘柄は、専門査定士の鑑定推奨</li>
            <li><strong>輸送リスク</strong>: 宅配買取の場合、緩衝材を十分に</li>
            <li><strong>業者の評判確認</strong>: クチコミ・Googleレビュー・実績件数を事前にチェック</li>
          </ul>

          <h2>7. よくある質問</h2>
          {faq_html}

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/{slug}-kaitori/" className="text-amber-dark hover:text-burgundy underline">{b['name_ja']}の市場相場（全国版）</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー市場相場一覧</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {b['yahoo_date']}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。本ページは noindex 設定（検索エンジン非収録）です。</p>
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
