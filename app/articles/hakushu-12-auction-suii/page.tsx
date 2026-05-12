import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "白州12年のオークション相場推移【2026年最新】Sotheby's/Bonhams/海外オークション落札データ",
  description: "白州12年の国内外オークション相場推移を徹底分析。Sotheby's・Bonhams・Whisky Auctioneerの落札データから読み解く価格動向と今後の見通し。",
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '白州12年は国内と海外、どちらで売る方が高い？', "acceptedAnswer": { "@type": "Answer", "text": 'ボトルとタイミングによりますが、高額銘柄は海外オークション経由で高値がつくケースが多数。ただし国際輸送・関税・代行業者手数料を考慮した手取り比較が必要です。' } }, { "@type": "Question", "name": 'オークションでの落札価格は誰が見れる？', "acceptedAnswer": { "@type": "Answer", "text": "Sotheby's、Bonhams、Whisky Auctioneer等は公式サイトで Past Results を公開。月額有料サービス（Whisky Stats等）はより詳細なデータを提供しています。" } }, { "@type": "Question", "name": '個人でも海外オークションに出品できる？', "acceptedAnswer": { "@type": "Answer", "text": '可能ですが、酒類の国際輸送ライセンス・手数料・送料が発生します。国内買取業者経由の方が手続き面で簡単です。' } }] }) }} />;
}

export default function Hakushu12AuctionSuiiPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/hakushu-12-kaitori/" className="hover:text-amber-dark transition-colors">白州12年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">過去5年の価格推移</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt='白州12年のオークション相場推移' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州12年のオークション相場推移</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>白州12年の国内買取相場は、海外オークションの落札結果に強く連動します。本記事では、Sotheby's、Bonhams、Whisky Auctioneer等の主要オークションで取引された価格データから、相場の動向と今後の見通しを分析します。</p>

          <h2>過去5年の価格推移</h2>

          <p>白州12年の二次流通価格は、過去5年で大きく上昇しています。2020〜2026年にかけて、ジャパニーズウイスキーは世界的需要拡大により価格が継続上昇。現在の参考買取価格は約40,000円前後で推移しています。</p>

          <h2>主要オークションでの取引状況</h2>

          <p>**Sotheby's（ニューヨーク・香港・ロンドン）**: 月次〜四半期ごとに開催、プレミアム銘柄中心。
**Bonhams（香港・ロンドン）**: 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。
**Whisky Auctioneer（UK）**: 月次オンラインオークション、中位銘柄まで幅広く扱う。
**Just Whisky Auctions**: UK中心、月次開催。</p>

          <h2>価格を動かす5つの要因</h2>

          <p>1. **海外オークション落札データ**（最も影響大）
2. **円安・円高の為替動向**（円安で海外バイヤー有利）
3. **終売・限定リリースのニュース**
4. **アジア富裕層の参入度合い**
5. **季節要因（年末年始・お中元）**</p>

          <h2>今後の見通し</h2>

          <p>白州12年の中長期見通しは、(1)世界的需要の継続、(2)供給制限、(3)新興市場の参入 の3要因が支え、高値推移が予想されます。ただし短期は需給の振れにより上下動も発生します。</p>

          <h2>オークションデータの確認方法</h2>

          <p>**Whisky Auctioneer の Past Results 検索**、**Sotheby's の Whisky Department アーカイブ**、**Whisky Stats（whiskystats.net）** などで過去落札データを確認可能です。PeatBidは毎日これらのデータを集計しています。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州12年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>白州12年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '白州12年は国内と海外、どちらで売る方が高い？', a: 'ボトルとタイミングによりますが、高額銘柄は海外オークション経由で高値がつくケースが多数。ただし国際輸送・関税・代行業者手数料を考慮した手取り比較が必要です。' }, { q: 'オークションでの落札価格は誰が見れる？', a: "Sotheby's、Bonhams、Whisky Auctioneer等は公式サイトで Past Results を公開。月額有料サービス（Whisky Stats等）はより詳細なデータを提供しています。" }, { q: '個人でも海外オークションに出品できる？', a: '可能ですが、酒類の国際輸送ライセンス・手数料・送料が発生します。国内買取業者経由の方が手続き面で簡単です。' }].map((faq) => (
              <details key={faq.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/hakushu-12-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売却ガイド</span><p className="text-sm font-bold mt-1">白州12年の高く売る方法</p></Link>
            <Link href="/articles/hakushu-12-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">真贋</span><p className="text-sm font-bold mt-1">白州12年の偽物の見分け方</p></Link>
            <Link href="/articles/hakushu-12-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">業者選び</span><p className="text-sm font-bold mt-1">白州12年の買取業者ランキング</p></Link>
            <Link href="/articles/hakushu-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">白州12年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
