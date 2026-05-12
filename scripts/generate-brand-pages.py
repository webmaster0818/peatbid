#!/usr/bin/env python3
"""
Generate individual brand pages (50 銘柄) for PeatBid.
Reads data/brands.csv, writes app/articles/{slug}-kaitori/page.tsx.

Each page includes:
- Hero + breadcrumb + meta
- Brand overview (蒸溜所, 度数, 容量, 希少度)
- State-by-state buyback price table
- Why this price (varies by rarity_tier and category)
- How to sell tips (varies by category)
- 4 partners CTA
- FAQ with Schema.org FAQPage (3 questions, varies per brand)
- Related brands (3-4 from same category)
- Disclaimer
"""
import csv
import os
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA = ROOT / "data" / "brands.csv"
OUT_DIR = ROOT / "app" / "articles"

# Load all brands
with open(DATA, "r", encoding="utf-8") as f:
    BRANDS = list(csv.DictReader(f))


def format_price(jpy):
    n = int(jpy)
    if n >= 10_000_000:
        return f"{n//10000:,}万円"
    if n >= 1_000_000:
        return f"{n//10000}万円"
    return f"{n:,}円"


def state_table_rows(base_price):
    """Generate state-by-state price rows from base (unopened, full set)."""
    p = int(base_price)
    rows = [
        ("未開封・完璧", "箱・冊子・カートン揃い", p, p),
        ("未開封・箱なし", "ラベル良好", int(p * 0.80), int(p * 0.90)),
        ("未開封・ラベル軽度汚れ", "付属あり", int(p * 0.80), int(p * 0.90)),
        ("未開封・液面減少", "やや進行", int(p * 0.55), int(p * 0.70)),
        ("開封済み", "残量による", int(p * 0.20), int(p * 0.40)),
    ]
    return rows


CATEGORY_LABEL = {
    "japanese-whisky": "ジャパニーズウイスキー",
    "scotch-whisky": "スコッチウイスキー",
}


CATEGORY_OVERVIEW = {
    "japanese-whisky": "ジャパニーズウイスキーは2010年代後半から世界的評価が一気に高まり、特に長期熟成・終売銘柄は二次流通市場で高値が定着しています。",
    "scotch-whisky": "スコッチウイスキーは世界の蒸留酒の王道。スペイサイド・アイラ・ハイランドなど産地ごとの個性と、長期熟成のシェリーオーク・バーボン樽が高値の指標です。",
}


RARITY_CONTEXT = {
    "common": "現行品として流通しているため、需給は安定的。ただしプレミア化が始まっているケースも多く、定期的なチェックが重要です。",
    "mid": "終売・休売後の供給制限により、価格が上昇中の銘柄帯です。タイミング次第で大きく値が動きます。",
    "high": "希少性と国際的評価により、二次流通市場で高値が定着している銘柄帯。コレクター・投資需要が支えています。",
    "ultra": "極めて希少な長期熟成銘柄。海外オークションでの落札データが査定の基準となります。",
    "ultra-rare": "市場流通量が極小、または閉鎖蒸溜所のボトル。1本数百万〜数千万円の取引も珍しくありません。",
}


CATEGORY_TIPS = {
    "japanese-whisky": [
        ("付属品の有無で査定額が10〜20%変動", "外箱・冊子・カートン・ホログラムシールはすべて保管しておきましょう"),
        ("未開封のままで売却する", "開封済みは査定額が大幅に下がる（基準価格の20〜40%まで）"),
        ("複数業者で相見積もり", "同じボトルでも業者によって数万〜数十万円の差が出ます"),
        ("適切な保管環境を維持", "直射日光を避け、室温15〜20℃で縦置き保管が基本"),
    ],
    "scotch-whisky": [
        ("ボトリング年（瓶詰め年）を業者に伝える", "同じ銘柄でも年代でプレミアが変わることがあります"),
        ("外箱・冊子の保存状態", "シェリー樽熟成銘柄は箱の保存状態が査定に強く影響"),
        ("未開封の維持", "シェリー・バーボン熟成の風味は開封で揮発するため、未開封の価値が高い"),
        ("洋酒専門店で見積もり", "海外オークション相場を反映できる専門業者で差が出ます"),
    ],
}


def make_faqs(b):
    base = int(b["reference_price_jpy_2026_05"])
    return [
        {
            "q": f"{b['name_ja']}は今いくらで売れますか？",
            "a": f"2026年5月現在、{b['name_ja']}（未開封・箱付き）の買取相場は約{format_price(base)}前後です。状態・付属品の有無により上下します。",
        },
        {
            "q": f"{b['name_ja']}を高く売るコツは？",
            "a": "(1)外箱・冊子等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避けて縦置き保管、の4つが基本です。",
        },
        {
            "q": f"{b['name_ja']}の開封済みでも買取できますか？",
            "a": f"はい、開封済みでも買取可能ですが、未開封の20〜40%程度の査定額となります。残量により評価が変わります。",
        },
    ]


def get_related(b, all_brands, limit=4):
    """Pick related brands from the same category."""
    same_cat = [x for x in all_brands if x["category"] == b["category"] and x["slug"] != b["slug"]]
    return same_cat[:limit]


def render_page(b, related):
    slug = b["slug"]
    name_ja = b["name_ja"]
    name_en = b["name_en"]
    category = b["category"]
    cat_label = CATEGORY_LABEL.get(category, "ウイスキー")
    origin = b["origin"]
    age = int(b["age_years"]) if b["age_years"] else 0
    abv = b["abv"]
    bottle_size = b["bottle_size_ml"]
    rarity = b["rarity_tier"]
    base_price = int(b["reference_price_jpy_2026_05"])
    description = b["description"]
    age_label = f"{age}年熟成" if age > 0 else "ノンエイジ"
    rows = state_table_rows(base_price)
    faqs = make_faqs(b)
    tips = CATEGORY_TIPS.get(category, CATEGORY_TIPS["japanese-whisky"])
    cat_overview = CATEGORY_OVERVIEW.get(category, "")
    rarity_ctx = RARITY_CONTEXT.get(rarity, "")

    # Pick image based on rarity / category
    if "yamazaki" in slug or "hakushu" in slug or "yoichi" in slug or "miyagikyo" in slug or "ichirosu" in slug or "karuizawa" in slug or "hanyu" in slug or "chichibu" in slug or "mars" in slug or "taketsuru" in slug:
        hero_image = "/images/article-yamazaki.png"
    elif "hibiki" in slug:
        hero_image = "/images/article-hibiki.png"
    elif "macallan" in slug or "bowmore" in slug or "springbank" in slug or "laphroaig" in slug or "ardbeg" in slug or "glenfiddich" in slug or "glenfarclas" in slug or "talisker" in slug or "balvenie" in slug or "glenmorangie" in slug:
        hero_image = "/images/article-hibiki.png"  # use as scotch placeholder
    else:
        hero_image = "/images/article-souba.png"

    related_links = "\n".join(
        f'            <Link href="/articles/{r["slug"]}-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">{r["name_ja"]}の買取相場</p></Link>'
        for r in related[:4]
    )

    faq_schema = """{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [""" + ",".join(
        f'''
      {{ "@type": "Question", "name": {repr(f["q"])}, "acceptedAnswer": {{ "@type": "Answer", "text": {repr(f["a"])} }} }}'''
        for f in faqs
    ) + """
    ]
  }"""

    rows_html = "\n".join(
        f'                <tr><td>{r[0]}</td><td>{r[1]}</td><td><strong>{format_price(r[2])}〜{format_price(r[3])}</strong></td></tr>'
        for r in rows
    )

    tips_html = "\n".join(
        f'            <li><strong>{t[0]}</strong> — {t[1]}</li>'
        for t in tips
    )

    return f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {{
  title: "{name_ja}の買取相場【2026年最新】{format_price(base_price)}前後・状態別査定額と高く売る方法",
  description: "{name_ja}（{name_en}）の最新買取相場と査定ポイント。{description}。状態別係数・付属品の影響・おすすめ買取業者まで完全ガイド。",
}};

function FaqSchema() {{
  return <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({faq_schema}) }}}} />;
}}

export default function {slug.replace("-", " ").title().replace(" ", "")}Page() {{
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/whisky-kaitori-souba/" className="hover:text-amber-dark transition-colors">買取相場</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{name_ja}</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="{hero_image}" alt="{name_ja}の買取相場" width={{1200}} height={{440}} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{name_ja}の買取相場と高く売る方法</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>{description}。本記事では、<strong>{name_ja}（{name_en}）</strong>の最新買取相場・状態別査定額・付属品の影響・高く売るための具体策まで、PeatBid編集部の調査をもとに解説します。</p>

          <h2>{name_ja}の銘柄プロファイル</h2>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>{cat_label}</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>{origin}</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>{age_label}</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>{abv}%</td></tr>
                <tr><td><strong>容量</strong></td><td>{bottle_size}ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>{rarity.upper()}</td></tr>
              </tbody>
            </table>
          </div>

          <p>{cat_overview}{rarity_ctx}</p>

          <h2>{name_ja}の状態別 買取相場</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>状態</th><th>付属品</th><th>査定額の目安</th></tr>
              </thead>
              <tbody>
{rows_html}
              </tbody>
            </table>
          </div>

          <p>※相場は2026年5月12日時点の参考値。業者・タイミングにより上下します。</p>

          <h2>{name_ja}の価格背景</h2>

          <p>{name_ja}の現在の買取相場は、海外オークション（Sotheby&apos;s、Bonhams、Whisky Auctioneer等）の落札データと国内ジャパニーズウイスキー市場の需給で決まります。<strong>{rarity_ctx}</strong></p>

          <p>特に未開封・箱付き・付属品揃いのコレクター品は、市場流通量が限られるため二次流通価格が継続的に高水準で推移しています。</p>

          <h2>{name_ja}を高く売る4つのポイント</h2>

          <ol>
{tips_html}
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">{name_ja}の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>{name_ja}に関するFAQ</h2>

          <div className="space-y-3 not-prose">
            {{[
              {{ q: {repr(faqs[0]["q"])}, a: {repr(faqs[0]["a"])} }},
              {{ q: {repr(faqs[1]["q"])}, a: {repr(faqs[1]["a"])} }},
              {{ q: {repr(faqs[2]["q"])}, a: {repr(faqs[2]["a"])} }},
            ].map((faq) => (
              <details key={{faq.q}} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{{faq.q}}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{{faq.a}}</div>
              </details>
            ))}}
          </div>

          <h2>関連銘柄</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
{related_links}
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の相場は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}}
'''


def main():
    count = 0
    for b in BRANDS:
        slug = b["slug"]
        target_slug = f"{slug}-kaitori"
        # skip if existing top 4 brands already have dedicated pages (yamazaki, hibiki, hakushu, macallan)
        # We will generate non-overlapping ones (the existing 4 articles)
        if slug in ("yamazaki-25", "hibiki-nv", "hakushu-nv", "macallan-12"):
            # These match generic existing pages, skip basic ones
            pass

        page_dir = OUT_DIR / target_slug
        page_dir.mkdir(parents=True, exist_ok=True)
        related = get_related(b, BRANDS)
        content = render_page(b, related)
        (page_dir / "page.tsx").write_text(content, encoding="utf-8")
        count += 1
    print(f"✓ Generated {count} brand pages")


if __name__ == "__main__":
    main()
