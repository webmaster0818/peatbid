import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";

export const metadata: Metadata = {
  title: "【2026年最新】山崎の市場相場 — NV・12年・18年・25年・55年の Yahoo中央値",
  description:
    "サントリー山崎の市場相場（Yahoo Auctions 過去180日落札中央値）を全グレード網羅。NV・12年・18年・25年・55年の最新数値、状態別の業界目安、業者比較リンクを掲載。",
};

type Brand = {
  slug: string;
  name_ja: string;
  origin: string;
  yahoo_median_jpy_180d: number | null;
  yahoo_sample_n: number;
  yahoo_fetched_at: string | null;
};

const brands = (brandsData as Brand[]).filter((b) => b.origin === "山崎蒸溜所");
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
      { "@type": "Question", name: "山崎の市場相場はいくらですか？", acceptedAnswer: { "@type": "Answer", text: "本サイトでは Yahoo Auctions 過去180日の落札中央値（IQR外れ値除去後）を市場相場として公開しています。グレードごとに大きく異なるため、各銘柄ページで最新値をご確認ください。業者の買取査定額は LINXAS / バイセル / 福ちゃん / JOYLAB など各社ページでご確認ください。" } },
      { "@type": "Question", name: "山崎12年が高騰している理由は？", acceptedAnswer: { "@type": "Answer", text: "山崎12年は2018年前後の終売報道以降、供給が逼迫しプレミア化しました。国際的な品評会受賞も評価を後押ししています。" } },
      { "@type": "Question", name: "山崎を高く売るには？", acceptedAnswer: { "@type": "Answer", text: "(1)付属品（箱・冊子・カートン）を揃える、(2)未開封のまま売る、(3)複数業者で見積もりを取る、(4)直射日光を避け縦置きで保管、の4つが基本です。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function YamazakiKaitoriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u5c71\u5d0e\u306e\u5e02\u5834\u76f8\u5834\u3068\u696d\u8005\u6bd4\u8f03\u30ac\u30a4\u30c9\", \"description\": \"\u30b5\u30f3\u30c8\u30ea\u30fc\u5c71\u5d0e\u306e\u5e02\u5834\u76f8\u5834\uff08Yahoo Auctions \u904e\u53bb180\u65e5\u843d\u672d\u4e2d\u592e\u5024\uff09\u3092\u5168\u30b0\u30ec\u30fc\u30c9\u7db2\u7f85\u3002NV\u30fb12\u5e74\u30fb18\u5e74\u30fb25\u5e74\u30fb55\u5e74\u306e\u6700\u65b0\u6570\u5024\u3001\u72b6\u614b\u5225\u306e\u696d\u754c\u76ee\u5b89\u3001\u696d\u8005\u6bd4\u8f03\u30ea\u30f3\u30af\u3092\u63b2\u8f09\u3002\", \"url\": \"https://peatbid.com/articles/yamazaki-kaitori/\", \"datePublished\": \"2026-05-14T00:00:00+09:00\", \"dateModified\": \"2026-05-18T00:00:00+09:00\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\", \"url\": \"https://peatbid.com/editorial/\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\", \"url\": \"https://peatbid.com\"}, \"mainEntityOfPage\": {\"@type\": \"WebPage\", \"@id\": \"https://peatbid.com/articles/yamazaki-kaitori/\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"\u30db\u30fc\u30e0\", \"item\": \"https://peatbid.com/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"\u5c71\u5d0e\u306e\u5e02\u5834\u76f8\u5834\"}]}" }} />
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">山崎の市場相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt="山崎の市場相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">山崎の市場相場と業者比較ガイド</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: {latestFetch}（週次自動取得）</p>

          <p>サントリー山崎は、1923年に誕生した日本最初の本格モルトウイスキー蒸溜所のフラッグシップ銘柄です。<strong>ジャパニーズウイスキーの代名詞</strong>として国際的評価が確立し、二次流通市場でも極めて高い価格で取引されています。</p>

          <p>この記事では、山崎全グレード（NV・12年・18年・25年・55年）の<strong>市場相場（Yahoo Auctions 過去180日落札中央値、IQR外れ値除去後）</strong>と、最高入札を引き出すためのポイントを解説します。</p>

          <h2>山崎の市場相場一覧</h2>

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

          <h2>なぜ山崎はここまで高騰したのか</h2>

          <p>山崎25年を例にとると、2008年の発売当時は5〜7万円台で店頭に並んでいました。それが2026年現在では極めて高値で取引されています。背景には以下の構造的要因があります。</p>

          <h3>1. 国際的品評会での連続受賞</h3>
          <p>2003年のISC（インターナショナル・スピリッツ・チャレンジ）金賞を皮切りに、ワールド・ウイスキー・アワードで山崎18年・25年が複数回最高賞を受賞。日本国外での認知が一気に広がりました。</p>

          <h3>2. アジア富裕層・中国・中東からの需要</h3>
          <p>2010年代後半以降、中国・台湾・シンガポール・中東の富裕層によるコレクター需要が急増。海外オークション（Sotheby&apos;s、Bonhams、Whisky Auctioneer等）で日本のウイスキーが連日高値で落札される現象が定着しました。</p>

          <h3>3. 終売・休売による供給制限</h3>
          <p>2018年に山崎12年・白州12年の休売が報じられ、市場流通量が一気に減少。「いずれ買えなくなる」という心理が需要をさらに押し上げました。</p>

          <h3>4. 投資対象としての地位</h3>
          <p>ジャパニーズウイスキーは「飲むもの」から「投資対象」へと位置付けが変化。長期保管によりプレミアが乗るアセットとして、富裕層のポートフォリオに組み込まれるようになっています。</p>

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

          <h2>山崎を高く売る4つのポイント</h2>

          <ol>
            <li><strong>付属品をすべて揃える</strong> — 外箱・冊子・カートン・ホログラムシールの有無で査定額は業界目安として10〜20%変動します。購入時の状態を維持しましょう。</li>
            <li><strong>未開封のままで売却</strong> — 開封済みは査定額が大幅に下がります。コレクション目的で購入したものは未開封維持が鉄則です。</li>
            <li><strong>複数業者で相見積もり</strong> — 同じ山崎でも業者により<strong>数万〜数十万円</strong>の差が出ます。複数社で比較しましょう。</li>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">青森県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岩手県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮城県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">秋田県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山形県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">栃木県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">群馬県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">埼玉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">千葉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">東京都</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">神奈川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">富山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">石川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福井県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山梨県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長野県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岐阜県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">静岡県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">滋賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">京都府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大阪府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">兵庫県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">奈良県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">和歌山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">島根県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岡山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">広島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山口県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">徳島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">香川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛媛県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">高知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">佐賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">熊本県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大分県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">鹿児島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">沖縄県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
            </div>
          </details>

        </div>

        <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">響の市場相場ガイド</p>
            </Link>
            <Link href="/articles/hakushu-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">白州の市場相場ガイド</p>
            </Link>
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">相場情報</span>
              <p className="text-sm font-bold mt-1">ウイスキー市場相場一覧</p>
            </Link>
            <Link href="/articles/whisky-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">売却ガイド</span>
              <p className="text-sm font-bold mt-1">ウイスキーを高く売る5つのコツ</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {latestFetch}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
