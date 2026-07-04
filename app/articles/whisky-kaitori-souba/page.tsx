import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";

export const metadata: Metadata = {
  title: "【2026年最新】ウイスキー市場相場一覧 — 主要50銘柄のYahoo中央値",
  description:
    "ジャパニーズ・スコッチ主要50銘柄のウイスキー市場相場をYahoo Auctions過去180日落札中央値で公開。山崎・響・白州・マッカランなど人気銘柄を一覧で確認。",
};

type Brand = {
  slug: string;
  name_ja: string;
  category: string;
  rarity_tier: string;
  yahoo_median_jpy_180d: number | null;
  yahoo_sample_n: number;
  yahoo_fetched_at: string | null;
};

const brands = brandsData as Brand[];
const japanese = brands.filter((b) => b.category === "japanese-whisky");
const scotch = brands.filter((b) => b.category === "scotch-whisky");

const fetchedDates = brands
  .map((b) => b.yahoo_fetched_at)
  .filter((d): d is string => !!d)
  .sort();
const latestFetch = fetchedDates[fetchedDates.length - 1] ?? "—";

function formatJPY(n: number | null, sufficient: boolean): string {
  if (!sufficient || n == null) return "市場相場データ蓄積中";
  return `¥${n.toLocaleString("ja-JP")}`;
}

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "ウイスキー市場相場はどう決まりますか？", acceptedAnswer: { "@type": "Answer", text: "本サイトでは Yahoo Auctions 過去180日の落札データを集計し、IQR外れ値除去後の中央値を市場相場として公開しています。業者の買取査定額はこれをベースに、各社の在庫状況・キャンペーン・状態評価で算出されます。" } },
      { "@type": "Question", name: "未開封と開封済みでどれくらい価格が変わりますか？", acceptedAnswer: { "@type": "Answer", text: "業界一般の目安として、未開封は市場相場の100%、開封済みは状態により市場相場の20〜40%程度まで下がる傾向があります（業者により評価基準が異なります）。実際の査定額は各業者ページでご確認ください。" } },
      { "@type": "Question", name: "箱や付属品がないと買取価格はいくら下がりますか？", acceptedAnswer: { "@type": "Answer", text: "業界一般の目安として、箱なしは市場相場の80〜90%程度、冊子なしで-5〜10%程度の傾向があります。希少銘柄ほど付属品の有無が査定に影響します。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function WhiskyKaitoriSoubaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u30102026\u5e74\u6700\u65b0\u3011\u30a6\u30a4\u30b9\u30ad\u30fc\u5e02\u5834\u76f8\u5834\u4e00\u89a7\", \"description\": \"\u30b8\u30e3\u30d1\u30cb\u30fc\u30ba\u30fb\u30b9\u30b3\u30c3\u30c1\u4e3b\u898150\u9298\u67c4\u306e\u30a6\u30a4\u30b9\u30ad\u30fc\u5e02\u5834\u76f8\u5834\u3092Yahoo Auctions\u904e\u53bb180\u65e5\u843d\u672d\u4e2d\u592e\u5024\u3067\u516c\u958b\u3002\u5c71\u5d0e\u30fb\u97ff\u30fb\u767d\u5dde\u30fb\u30de\u30c3\u30ab\u30e9\u30f3\u306a\u3069\u4eba\u6c17\u9298\u67c4\u3092\u4e00\u89a7\u3067\u78ba\u8a8d\u3002\", \"url\": \"https://peatbid.com/articles/whisky-kaitori-souba/\", \"datePublished\": \"2026-05-14T00:00:00+09:00\", \"dateModified\": \"2026-05-18T00:00:00+09:00\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\", \"url\": \"https://peatbid.com/editorial/\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\", \"url\": \"https://peatbid.com\"}, \"mainEntityOfPage\": {\"@type\": \"WebPage\", \"@id\": \"https://peatbid.com/articles/whisky-kaitori-souba/\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"\u30db\u30fc\u30e0\", \"item\": \"https://peatbid.com/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u5e02\u5834\u76f8\u5834\u4e00\u89a7\"}]}" }} />
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">ウイスキー市場相場一覧</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-souba.png" alt="ウイスキー市場相場一覧" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">【2026年最新】ウイスキー市場相場一覧</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: {latestFetch}（週次自動取得）</p>

          <p>PeatBid編集部が、ジャパニーズ・スコッチを中心に主要50銘柄の<strong>市場相場（Yahoo Auctions 過去180日落札中央値、IQR外れ値除去後）</strong>を一覧で公開します。業者の買取査定額はこの市場相場をベースに各社が在庫・状態・キャンペーンで算出するため、最新の業者査定額は <a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> / <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> / <a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> / <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">JOYLAB</a> など各業者ページで直接ご確認ください。</p>

          <h2>ジャパニーズウイスキー 市場相場（{japanese.length}銘柄）</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>銘柄</th>
                  <th>市場相場（Yahoo中央値）</th>
                  <th>サンプル数</th>
                </tr>
              </thead>
              <tbody>
                {japanese.map((b) => {
                  const sufficient = b.yahoo_median_jpy_180d != null && b.yahoo_sample_n >= 20;
                  return (
                    <tr key={b.slug}>
                      <td><Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:text-burgundy underline"><strong>{b.name_ja}</strong></Link></td>
                      <td>{formatJPY(b.yahoo_median_jpy_180d, sufficient)}</td>
                      <td className="text-xs text-warm-gray">{sufficient ? `n=${b.yahoo_sample_n}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2>スコッチウイスキー 市場相場（{scotch.length}銘柄）</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>銘柄</th>
                  <th>市場相場（Yahoo中央値）</th>
                  <th>サンプル数</th>
                </tr>
              </thead>
              <tbody>
                {scotch.map((b) => {
                  const sufficient = b.yahoo_median_jpy_180d != null && b.yahoo_sample_n >= 20;
                  return (
                    <tr key={b.slug}>
                      <td><Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:text-burgundy underline"><strong>{b.name_ja}</strong></Link></td>
                      <td>{formatJPY(b.yahoo_median_jpy_180d, sufficient)}</td>
                      <td className="text-xs text-warm-gray">{sufficient ? `n=${b.yahoo_sample_n}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

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

          <h2>相場を動かす5つの要因</h2>

          <ol>
            <li><strong>オークション落札データ</strong> — 国内外のオークションでの落札価格が業者の仕入れ価格の基準となります</li>
            <li><strong>需給バランス</strong> — 終売・休売銘柄は供給が断たれ価格が高騰します</li>
            <li><strong>為替レート</strong> — 海外バイヤー（中国・中東・米国）の参入により円安局面で価格上昇傾向</li>
            <li><strong>季節要因</strong> — 年末年始・お中元時期は需要増、相場が上がる傾向</li>
            <li><strong>業者の在庫状況</strong> — 同じボトルでも、業者の在庫量により提示額に差が出る</li>
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

          <div className="bg-cream/60 border border-amber/40 rounded-xl p-5 my-8 not-prose">
            <h3 className="font-bold text-base mb-2">📰 毎週の値動きは「週次相場レポート」で</h3>
            <p className="text-sm text-warm-gray mb-3">
              主要銘柄のヤフオク実落札中央値から算出する合成指数「PeatBid買取相場指数」の前週比と、
              今週上昇・下落した銘柄TOP5を毎週月曜に自動更新で公開しています。売り時の判断にご活用ください。
            </p>
            <Link href="/souba-report/" className="inline-block bg-white border border-amber/40 rounded-lg text-amber-dark text-sm font-semibold px-4 py-2 hover:bg-amber/10 transition-colors">
              ウイスキー買取相場レポート（毎週更新）を見る →
            </Link>
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">山崎の市場相場と業者比較</p>
            </Link>
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">響の市場相場ガイド</p>
            </Link>
            <Link href="/articles/whisky-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">売却ガイド</span>
              <p className="text-sm font-bold mt-1">ウイスキーを高く売る5つのコツ</p>
            </Link>
            <Link href="/faq/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">よくある質問</span>
              <p className="text-sm font-bold mt-1">ウイスキー買取FAQ</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {latestFetch}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
