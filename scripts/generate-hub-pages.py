#!/usr/bin/env python3
"""
Generate the 5 hub pages (Plan A compliant) that aren't covered by v3 brand/angle generators.

- yamazaki-kaitori / hibiki-kaitori / hakushu-kaitori / macallan-kaitori (brand hubs)
- whisky-takaku-uru (sell-tips hub)

whisky-kaitori-souba is handcrafted (Yahoo medians from all 50 brands) and yamazaki-kaitori
was rewritten manually as the template. This script generates the other 3 brand hubs
and the takaku-uru hub.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "app" / "articles"


def brand_hub(slug: str, brand_name: str, origin: str, intro_paragraph: str, historical_notes: list[tuple[str, str]]):
    """Render a brand-hub page (Yahoo中央値ベース)."""
    component_name = "".join(part.capitalize() for part in slug.replace("-", " ").split()) + "Page"
    notes_html = "\n".join(
        f'''          <h3>{i+1}. {h}</h3>
          <p>{b}</p>'''
        for i, (h, b) in enumerate(historical_notes)
    )
    related_other = [s for s in [
        ("yamazaki-kaitori", "山崎"),
        ("hibiki-kaitori", "響"),
        ("hakushu-kaitori", "白州"),
        ("macallan-kaitori", "マッカラン"),
    ] if s[0] != slug]
    related_html = "\n".join(
        f'''            <Link href="/articles/{s[0]}/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">{s[1]}の市場相場ガイド</p>
            </Link>'''
        for s in related_other[:3]
    )

    return f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";

export const metadata: Metadata = {{
  title: "【2026年最新】{brand_name}の市場相場 — Yahoo中央値で見る全グレード",
  description:
    "{brand_name}の市場相場（Yahoo Auctions 過去180日落札中央値）を全グレード網羅。最新数値、状態別の業界目安、業者比較リンクを掲載。",
}};

type Brand = {{
  slug: string;
  name_ja: string;
  origin: string;
  yahoo_median_jpy_180d: number | null;
  yahoo_sample_n: number;
  yahoo_fetched_at: string | null;
}};

const brands = (brandsData as Brand[]).filter((b) => b.origin === {repr(origin)});
const fetchedDates = brands
  .map((b) => b.yahoo_fetched_at)
  .filter((d): d is string => !!d)
  .sort();
const latestFetch = fetchedDates[fetchedDates.length - 1] ?? "—";

function formatJPY(n: number | null, sufficient: boolean): string {{
  if (!sufficient || n == null) return "市場相場データ蓄積中";
  return `¥${{n.toLocaleString("ja-JP")}}`;
}}

function FaqSchema() {{
  const faqData = {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {{ "@type": "Question", name: "{brand_name}の市場相場はいくらですか？", acceptedAnswer: {{ "@type": "Answer", text: "本サイトでは Yahoo Auctions 過去180日の落札中央値（IQR外れ値除去後）を市場相場として公開しています。グレードごとに大きく異なるため、各銘柄ページで最新値をご確認ください。業者の買取査定額は LINXAS / バイセル / 福ちゃん / JOYLAB など各社ページでご確認ください。" }} }},
      {{ "@type": "Question", name: "{brand_name}を高く売るには？", acceptedAnswer: {{ "@type": "Answer", text: "(1)付属品（箱・冊子・カートン）を揃える、(2)未開封のまま売る、(3)複数業者で見積もりを取る、(4)直射日光を避け縦置きで保管、の4つが基本です。" }} }},
      {{ "@type": "Question", name: "{brand_name}の状態別査定はどう変わりますか？", acceptedAnswer: {{ "@type": "Answer", text: "業界一般の目安として、未開封・箱なしは市場相場の80〜90%程度、開封済みは市場相場の20〜40%程度に下がる傾向があります。実際の査定額は業者により異なるため各業者ページでご確認ください。" }} }},
    ],
  }};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify(faqData) }}}} />;
}}

export default function {component_name}() {{
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{brand_name}の市場相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-{brand_name_to_image(brand_name)}.png" alt="{brand_name}の市場相場" width={{1200}} height={{400}} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{brand_name}の市場相場と業者比較ガイド</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: {{latestFetch}}（週次自動取得）</p>

          <p>{intro_paragraph}</p>

          <p>この記事では、{brand_name}全グレードの<strong>市場相場（Yahoo Auctions 過去180日落札中央値、IQR外れ値除去後）</strong>と、最高入札を引き出すためのポイントを解説します。</p>

          <h2>{brand_name}の市場相場一覧</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>グレード</th>
                  <th>市場相場（Yahoo中央値）</th>
                  <th>サンプル数</th>
                </tr>
              </thead>
              <tbody>
                {{brands.map((b) => {{
                  const sufficient = b.yahoo_median_jpy_180d != null && b.yahoo_sample_n >= 20;
                  return (
                    <tr key={{b.slug}}>
                      <td><Link href={{`/articles/${{b.slug}}-kaitori/`}} className="text-amber-dark hover:text-burgundy underline"><strong>{{b.name_ja}}</strong></Link></td>
                      <td>{{formatJPY(b.yahoo_median_jpy_180d, sufficient)}}</td>
                      <td className="text-xs text-warm-gray">{{sufficient ? `n=${{b.yahoo_sample_n}}` : "—"}}</td>
                    </tr>
                  );
                }})}}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※市場相場は Yahoo Auctions 過去180日の落札データ中央値（IQR外れ値除去後）。業者の買取査定額はこの市場相場をベースに各社の在庫・キャンペーン・状態評価で算出されます。最新の業者査定額は各業者ページでご確認ください。</p>

          <h2>{brand_name}の歴史と市場価値</h2>

{notes_html}

          <h2>状態別の業界目安（パーセンテージ）</h2>

          <p>市場相場（Yahoo中央値）を基準（100%）とした、業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>状態</th>
                  <th>付属品</th>
                  <th>業界目安（市場相場対比）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td><strong>市場相場の95〜100%程度</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td><strong>市場相場の80〜90%程度</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td><strong>市場相場の75〜88%程度</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td><strong>市場相場の55〜70%程度</strong></td></tr>
                <tr><td>開封済み</td><td>残量による</td><td><strong>市場相場の20〜40%程度</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2>{brand_name}を高く売る4つのポイント</h2>

          <ol>
            <li><strong>付属品をすべて揃える</strong> — 外箱・冊子・カートン・ホログラムシールの有無で査定額は業界目安として10〜20%変動します。購入時の状態を維持しましょう。</li>
            <li><strong>未開封のままで売却</strong> — 開封済みは査定額が大幅に下がります。コレクション目的で購入したものは未開封維持が鉄則です。</li>
            <li><strong>複数業者で相見積もり</strong> — 同じ{brand_name}でも業者により<strong>数万〜数十万円</strong>の差が出ます。複数社で比較しましょう。</li>
            <li><strong>適切な保管環境</strong> — 直射日光を避け、室温（15〜20℃）で縦置き保管。ラベルの色あせや液面の目減りを防ぎます。</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">参考買取相場（各業者公式ページ）</h3>
            <p className="text-sm text-warm-gray text-center mb-4">業者買取額は各社の在庫状況・キャンペーンにより変動します。最新の査定額は各業者ページで直接ご確認ください。</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">LINXAS →</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">バイセル →</a>
              <a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">福ちゃん →</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">JOYLAB →</a>
            </div>
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
{related_html}
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">相場情報</span>
              <p className="text-sm font-bold mt-1">ウイスキー市場相場一覧</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {{latestFetch}}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}}
'''


def brand_name_to_image(brand_name: str) -> str:
    return {
        "山崎": "yamazaki",
        "響": "hibiki",
        "白州": "yamazaki",  # fallback - article-hakushu doesn't exist, use yamazaki
        "マッカラン": "macallan",
    }.get(brand_name, "souba")


def main():
    pages = [
        ("hibiki-kaitori", "響", "サントリー", "サントリー響は、1989年に登場した日本を代表するブレンデッドウイスキー。山崎・白州・知多の3つの蒸溜所原酒をブレンドしたフラッグシップで、国際的評価が極めて高く、二次流通市場でも安定した高値で取引されています。", [
            ("国際的品評会での連続受賞", "響17年・21年・30年はISC・WSCで最高賞を複数回受賞。日本ウイスキー文化を象徴する存在として、世界中のコレクター需要を集めています。"),
            ("2018年の休売による供給制限", "2018年に響17年の休売が報じられ、市場流通量が一気に減少。コレクター・投資需要が殺到し、終売前の数倍の価格で取引されるようになりました。"),
            ("アジア富裕層の参入", "中国・台湾・シンガポール・中東の富裕層によるコレクター需要が継続的に拡大し、海外オークションでの落札価格が国内相場を押し上げる構造が定着しています。"),
            ("投資対象としての地位", "ウイスキーが「液体資産」として国際的に認知され、響もポートフォリオの一部として保有される対象となっています。"),
        ]),
        ("hakushu-kaitori", "白州", "白州蒸溜所", "サントリー白州は、1973年創業の山梨県北杜市・南アルプス山系の麓に位置するモルトウイスキー蒸溜所。「森のウイスキー」と称される爽やかで軽快な味わいで、山崎と並ぶサントリーの主力銘柄として国際的評価が確立しています。", [
            ("2018年6月の白州12年休売", "2018年に白州12年の休売が発表され、市場流通量が激減。終売前の2倍以上の価格で取引されるようになり、コレクター市場でのプレミア化が進行しました。"),
            ("「森のウイスキー」としての国際評価", "ピーティで爽やかなフェノール香、フレッシュなフルーツの香味で、世界の主要品評会で度々受賞。海外市場でも高く評価されています。"),
            ("白州25年の希少性", "長期熟成原酒の希少性と需要の高さで、白州25年は二次流通市場で極めて高い水準で取引されています。"),
            ("国際的需要の継続的拡大", "中華圏・欧米のコレクター需要が継続的に拡大し、Sotheby's等の海外オークションでも定期的に出品・落札される人気銘柄となっています。"),
        ]),
        ("macallan-kaitori", "マッカラン", "スペイサイド", "マッカランは、1824年創業のスコットランド・スペイサイドの伝統蒸溜所。「シェリー樽熟成の王」と称され、世界で最も高い評価を受けるシングルモルトの一つです。コレクター市場・投資市場の両方で確固たる地位を築いています。", [
            ("シェリー樽熟成の伝統", "マッカランはスペインからシェリー樽を直接輸入し、徹底した熟成管理で「シェリー樽熟成の王」と称される独自のスタイルを確立しています。"),
            ("ファイン&レア・コレクションの伝説", "マッカランのファイン&レア・コレクションは、海外オークションで数百万円〜数千万円で落札される世界的伝説銘柄。1926年ボトリングは2019年に約2億円で落札されました。"),
            ("国際的投資対象としての地位", "Knight Frank Luxury Investment Indexでもウイスキー部門の代表銘柄として認知され、富裕層のポートフォリオに組み込まれています。"),
            ("中華圏・中東市場の需要拡大", "アジア富裕層・中東の超富裕層によるコレクター需要が拡大し、特に長期熟成シェリーオークシリーズは継続的に高値で取引されています。"),
        ]),
    ]
    for slug, name, origin, intro, notes in pages:
        path = APP_DIR / slug / "page.tsx"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(brand_hub(slug, name, origin, intro, notes), encoding="utf-8")
        print(f"  ✓ {slug}")


if __name__ == "__main__":
    main()
