import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";

export const metadata: Metadata = {
  title: "【2026年最新】白州の市場相場 — Yahoo中央値で見る全グレード",
  description:
    "白州の市場相場（Yahoo Auctions 過去180日落札中央値）を全グレード網羅。最新数値、状態別の業界目安、業者比較リンクを掲載。",
};

type Brand = {
  slug: string;
  name_ja: string;
  origin: string;
  yahoo_median_jpy_180d: number | null;
  yahoo_sample_n: number;
  yahoo_fetched_at: string | null;
};

const brands = (brandsData as Brand[]).filter((b) => b.origin === '白州蒸溜所');
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
      { "@type": "Question", name: "白州の市場相場はいくらですか？", acceptedAnswer: { "@type": "Answer", text: "本サイトでは Yahoo Auctions 過去180日の落札中央値（IQR外れ値除去後）を市場相場として公開しています。グレードごとに大きく異なるため、各銘柄ページで最新値をご確認ください。業者の買取査定額は LINXAS / バイセル / 福ちゃん / JOYLAB など各社ページでご確認ください。" } },
      { "@type": "Question", name: "白州を高く売るには？", acceptedAnswer: { "@type": "Answer", text: "(1)付属品（箱・冊子・カートン）を揃える、(2)未開封のまま売る、(3)複数業者で見積もりを取る、(4)直射日光を避け縦置きで保管、の4つが基本です。" } },
      { "@type": "Question", name: "白州の状態別査定はどう変わりますか？", acceptedAnswer: { "@type": "Answer", text: "業界一般の目安として、未開封・箱なしは市場相場の80〜90%程度、開封済みは市場相場の20〜40%程度に下がる傾向があります。実際の査定額は業者により異なるため各業者ページでご確認ください。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function HakushuKaitoriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u767d\u5dde\u306e\u5e02\u5834\u76f8\u5834\u3068\u696d\u8005\u6bd4\u8f03\u30ac\u30a4\u30c9\", \"description\": \"\u767d\u5dde\u306e\u5e02\u5834\u76f8\u5834\uff08Yahoo Auctions \u904e\u53bb180\u65e5\u843d\u672d\u4e2d\u592e\u5024\uff09\u3092\u5168\u30b0\u30ec\u30fc\u30c9\u7db2\u7f85\u3002\u6700\u65b0\u6570\u5024\u3001\u72b6\u614b\u5225\u306e\u696d\u754c\u76ee\u5b89\u3001\u696d\u8005\u6bd4\u8f03\u30ea\u30f3\u30af\u3092\u63b2\u8f09\u3002\", \"url\": \"https://peatbid.com/articles/hakushu-kaitori/\", \"datePublished\": \"2026-05-14T00:00:00+09:00\", \"dateModified\": \"2026-05-18T00:00:00+09:00\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\", \"url\": \"https://peatbid.com/editorial/\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\", \"url\": \"https://peatbid.com\"}, \"mainEntityOfPage\": {\"@type\": \"WebPage\", \"@id\": \"https://peatbid.com/articles/hakushu-kaitori/\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"\u30db\u30fc\u30e0\", \"item\": \"https://peatbid.com/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"\u767d\u5dde\u306e\u5e02\u5834\u76f8\u5834\"}]}" }} />
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">白州の市場相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt="白州の市場相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州の市場相場と業者比較ガイド</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: {latestFetch}（週次自動取得）</p>

          <p>サントリー白州は、1973年創業の山梨県北杜市・南アルプス山系の麓に位置するモルトウイスキー蒸溜所。「森のウイスキー」と称される爽やかで軽快な味わいで、山崎と並ぶサントリーの主力銘柄として国際的評価が確立しています。</p>

          <p>この記事では、白州全グレードの<strong>市場相場（Yahoo Auctions 過去180日落札中央値、IQR外れ値除去後）</strong>と、最高入札を引き出すためのポイントを解説します。</p>

          <h2>白州の市場相場一覧</h2>

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
                {brands.map((b) => {
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

          <p className="text-xs text-warm-gray">※市場相場は Yahoo Auctions 過去180日の落札データ中央値（IQR外れ値除去後）。業者の買取査定額はこの市場相場をベースに各社の在庫・キャンペーン・状態評価で算出されます。最新の業者査定額は各業者ページでご確認ください。</p>

          <h2>白州の歴史と市場価値</h2>

          <h3>1. 2018年6月の白州12年休売</h3>
          <p>2018年に白州12年の休売が発表され、市場流通量が激減。終売前の2倍以上の価格で取引されるようになり、コレクター市場でのプレミア化が進行しました。</p>
          <h3>2. 「森のウイスキー」としての国際評価</h3>
          <p>ピーティで爽やかなフェノール香、フレッシュなフルーツの香味で、世界の主要品評会で度々受賞。海外市場でも高く評価されています。</p>
          <h3>3. 白州25年の希少性</h3>
          <p>長期熟成原酒の希少性と需要の高さで、白州25年は二次流通市場で極めて高い水準で取引されています。</p>
          <h3>4. 国際的需要の継続的拡大</h3>
          <p>中華圏・欧米のコレクター需要が継続的に拡大し、Sotheby's等の海外オークションでも定期的に出品・落札される人気銘柄となっています。</p>

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

          <h2>白州を高く売る4つのポイント</h2>

          <ol>
            <li><strong>付属品をすべて揃える</strong> — 外箱・冊子・カートン・ホログラムシールの有無で査定額は業界目安として10〜20%変動します。購入時の状態を維持しましょう。</li>
            <li><strong>未開封のままで売却</strong> — 開封済みは査定額が大幅に下がります。コレクション目的で購入したものは未開封維持が鉄則です。</li>
            <li><strong>複数業者で相見積もり</strong> — 同じ白州でも業者により<strong>数万〜数十万円</strong>の差が出ます。複数社で比較しましょう。</li>
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

          
        <h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4 text-foreground">都道府県別に売る</h2>
        <p className="text-warm-gray text-sm mb-4">お住まいの地域での年式別買取相場をご確認ください。47都道府県 × 各銘柄ごとに地元業者・地域別査定額傾向を解説しています。</p>

        <div className="not-prose space-y-3 mb-8">

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>北海道・東北（7都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">北海道</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">青森県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aomori/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岩手県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/iwate/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮城県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyagi/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">秋田県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/akita/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山形県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamagata/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukushima/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>関東（7都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">茨城県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">栃木県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tochigi/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">群馬県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gunma/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">埼玉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saitama/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">千葉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/chiba/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">東京都</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokyo/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">神奈川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>中部（9都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">新潟県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/niigata/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">富山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/toyama/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">石川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福井県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukui/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山梨県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長野県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagano/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岐阜県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gifu/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">静岡県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aichi/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>近畿（7都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">三重県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/mie/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">滋賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shiga/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">京都府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kyoto/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大阪府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/osaka/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">兵庫県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hyogo/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">奈良県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nara/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">和歌山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/wakayama/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>中国・四国（9都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">鳥取県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tottori/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">島根県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shimane/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岡山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okayama/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">広島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山口県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">徳島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokushima/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">香川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagawa/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛媛県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ehime/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">高知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kochi/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>九州・沖縄（8都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福岡県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">佐賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saga/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">熊本県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大分県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/oita/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">鹿児島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">沖縄県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okinawa/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/hakushu-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/hakushu-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/hakushu-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">白州25年</Link></li></ul>
              </div>
            </div>
          </details>

        </div>

        <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">山崎の市場相場ガイド</p>
            </Link>
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">響の市場相場ガイド</p>
            </Link>
            <Link href="/articles/macallan-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">マッカランの市場相場ガイド</p>
            </Link>
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">相場情報</span>
              <p className="text-sm font-bold mt-1">ウイスキー市場相場一覧</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {latestFetch}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
