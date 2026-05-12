import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: '軽井沢12年の買取業者おすすめランキング【2026年最新】査定額比較TOP4',
  description: '軽井沢12年に強い買取業者を徹底比較。ヒカカク・バイセル・JOYLAB・リカスタの査定スピード・価格・サポートを評価し、目的別おすすめを提示。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '何社で見積もりを取るべき？', "acceptedAnswer": { "@type": "Answer", "text": '最低3社、できれば5社以上で相見積もりを取ることをおすすめします。一括査定+専門店個別査定の組み合わせが最強です。' } }, { "@type": "Question", "name": '査定無料の業者だけ選ぶべき？', "acceptedAnswer": { "@type": "Answer", "text": 'はい。PeatBid掲載の4社はすべて査定無料・キャンセル料無料です。「手数料がかかる」「キャンセル料を取る」業者は避けてください。' } }, { "@type": "Question", "name": '出張買取・宅配買取は安全？', "acceptedAnswer": { "@type": "Answer", "text": '信頼できる業者（ここで紹介した4社）は補償付き配送・身分証確認等の安全対策が完備。古物営業法も遵守されています。' } }] }) }} />;
}

export default function Karuizawa12RankingPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/karuizawa-12-kaitori/" className="hover:text-amber-dark transition-colors">軽井沢12年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">1位: ヒカカク！（一括査定で最高値発見）</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt='軽井沢12年の買取業者おすすめランキング' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">軽井沢12年の買取業者おすすめランキング</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>軽井沢12年を高く売るには、業者選びが最重要。同じ150万円クラスのボトルでも、業者により**数万〜数十万円**の査定差が生まれます。本記事ではPeatBid編集部が選んだ軽井沢12年に強い買取業者4社を、目的別に比較します。</p>

          <h2>1位: ヒカカク！（一括査定で最高値発見）</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>ヒカカクは最大20社の買取業者に一括で見積もりを依頼できる比較サイト。軽井沢12年のような希少銘柄は業者間で査定差が大きいため、<strong>まずはヒカカクで相場感を掴む</strong>のが最短ルートです。登録は無料、しつこい営業もなし。</p>` }} />

          <h2>2位: バイセル（東証グロース上場の安心感）</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>バイセルは東証グロース上場のBuySell Technologies運営。お酒・ウイスキー買取に注力中で、出張・宅配・店頭の3チャネル対応。軽井沢12年クラスの希少ボトルでも、信頼性と査定スピードを両立した買取が可能です。</p>` }} />

          <h2>3位: JOYLAB（お酒買取専門の高単価)</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>JOYLABはお酒買取専門で、銘柄別の相場表をリアルタイム公開。軽井沢12年のように相場が大きく動く銘柄に対し、当日の海外オークション価格を反映した査定が期待できます。ジャパニーズウイスキー強化中。</p>` }} />

          <h2>4位: リカスタ（宅配買取で完結）</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>リカスタは全国対応の宅配買取サービス。店舗に行く時間がない方、地方在住の方に最適。査定無料・キャンセル無料で気軽に試せます。ジャパニーズウイスキーも積極買取中。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">軽井沢12年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>軽井沢12年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '何社で見積もりを取るべき？', a: '最低3社、できれば5社以上で相見積もりを取ることをおすすめします。一括査定+専門店個別査定の組み合わせが最強です。' }, { q: '査定無料の業者だけ選ぶべき？', a: 'はい。PeatBid掲載の4社はすべて査定無料・キャンセル料無料です。「手数料がかかる」「キャンセル料を取る」業者は避けてください。' }, { q: '出張買取・宅配買取は安全？', a: '信頼できる業者（ここで紹介した4社）は補償付き配送・身分証確認等の安全対策が完備。古物営業法も遵守されています。' }].map((faq) => (
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
            <Link href="/articles/karuizawa-12-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売却ガイド</span><p className="text-sm font-bold mt-1">軽井沢12年の高く売る方法</p></Link>
            <Link href="/articles/karuizawa-12-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">真贋</span><p className="text-sm font-bold mt-1">軽井沢12年の偽物の見分け方</p></Link>
            <Link href="/articles/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">軽井沢12年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
