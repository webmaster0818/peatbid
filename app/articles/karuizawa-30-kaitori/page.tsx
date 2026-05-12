import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "軽井沢30年の買取相場【2026年最新】800万円前後・状態別査定額と高く売る方法",
  description: "軽井沢30年（Karuizawa 30 Year）の最新買取相場と査定ポイント。軽井沢30年。閉鎖蒸溜所の長期熟成。状態別係数・付属品の影響・おすすめ買取業者まで完全ガイド。",
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": '軽井沢30年は今いくらで売れますか？', "acceptedAnswer": { "@type": "Answer", "text": '2026年5月現在、軽井沢30年（未開封・箱付き）の買取相場は約800万円前後です。状態・付属品の有無により上下します。' } },
      { "@type": "Question", "name": '軽井沢30年を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避けて縦置き保管、の4つが基本です。' } },
      { "@type": "Question", "name": '軽井沢30年の開封済みでも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、開封済みでも買取可能ですが、未開封の20〜40%程度の査定額となります。残量により評価が変わります。' } }
    ]
  }) }} />;
}

export default function Karuizawa30Page() {
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
            <li><span className="text-foreground">軽井沢30年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt="軽井沢30年の買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">軽井沢30年の買取相場と高く売る方法</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>軽井沢30年。閉鎖蒸溜所の長期熟成。本記事では、<strong>軽井沢30年（Karuizawa 30 Year）</strong>の最新買取相場・状態別査定額・付属品の影響・高く売るための具体策まで、PeatBid編集部の調査をもとに解説します。</p>

          <h2>軽井沢30年の銘柄プロファイル</h2>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>軽井沢蒸溜所</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>30年熟成</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>55%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>ULTRA-RARE</td></tr>
              </tbody>
            </table>
          </div>

          <p>ジャパニーズウイスキーは2010年代後半から世界的評価が一気に高まり、特に長期熟成・終売銘柄は二次流通市場で高値が定着しています。市場流通量が極小、または閉鎖蒸溜所のボトル。1本数百万〜数千万円の取引も珍しくありません。</p>

          <h2>軽井沢30年の状態別 買取相場</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>状態</th><th>付属品</th><th>査定額の目安</th></tr>
              </thead>
              <tbody>
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td><strong>800万円〜800万円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td><strong>640万円〜720万円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td><strong>640万円〜720万円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td><strong>440万円〜560万円</strong></td></tr>
                <tr><td>開封済み</td><td>残量による</td><td><strong>160万円〜320万円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <p>※相場は2026年5月12日時点の参考値。業者・タイミングにより上下します。</p>

          <h2>軽井沢30年の価格背景</h2>

          <p>軽井沢30年の現在の買取相場は、海外オークション（Sotheby&apos;s、Bonhams、Whisky Auctioneer等）の落札データと国内ジャパニーズウイスキー市場の需給で決まります。<strong>市場流通量が極小、または閉鎖蒸溜所のボトル。1本数百万〜数千万円の取引も珍しくありません。</strong></p>

          <p>特に未開封・箱付き・付属品揃いのコレクター品は、市場流通量が限られるため二次流通価格が継続的に高水準で推移しています。</p>

          <h2>軽井沢30年を高く売る4つのポイント</h2>

          <ol>
            <li><strong>付属品の有無で査定額が10〜20%変動</strong> — 外箱・冊子・カートン・ホログラムシールはすべて保管しておきましょう</li>
            <li><strong>未開封のままで売却する</strong> — 開封済みは査定額が大幅に下がる（基準価格の20〜40%まで）</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者によって数万〜数十万円の差が出ます</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光を避け、室温15〜20℃で縦置き保管が基本</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">軽井沢30年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>軽井沢30年に関するFAQ</h2>

          <div className="space-y-3 not-prose">
            {[
              { q: '軽井沢30年は今いくらで売れますか？', a: '2026年5月現在、軽井沢30年（未開封・箱付き）の買取相場は約800万円前後です。状態・付属品の有無により上下します。' },
              { q: '軽井沢30年を高く売るコツは？', a: '(1)外箱・冊子等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避けて縦置き保管、の4つが基本です。' },
              { q: '軽井沢30年の開封済みでも買取できますか？', a: 'はい、開封済みでも買取可能ですが、未開封の20〜40%程度の査定額となります。残量により評価が変わります。' },
            ].map((faq) => (
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

          <h2>関連銘柄</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-nv-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">山崎ノンエイジの買取相場</p></Link>
            <Link href="/articles/yamazaki-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">山崎12年の買取相場</p></Link>
            <Link href="/articles/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">山崎18年の買取相場</p></Link>
            <Link href="/articles/yamazaki-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">山崎25年の買取相場</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の相場は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
