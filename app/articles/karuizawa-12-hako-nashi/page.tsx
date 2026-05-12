import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: '軽井沢12年が箱なしでも買取できる？【2026年最新】査定額の影響と賢い売却法',
  description: '軽井沢12年を箱なしで売る場合の査定額への影響と、買取を依頼する際の注意点。査定額の目安、付属品代替策、賢い売却戦略を解説。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '箱を捨ててしまった軽井沢12年でも売れる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、売れます。査定額は10〜20%下がりますが、未開封でラベル状態が良ければ十分な価格がつきます。' } }, { "@type": "Question", "name": '代用品の箱（汎用箱）を作って売却するのは？', "acceptedAnswer": { "@type": "Answer", "text": '正規品でない箱は査定額に影響しません。むしろ正規品でない外箱は混乱を招くため、添付しない方が良いです。' } }, { "@type": "Question", "name": 'ホログラムシールが箱だけにある場合は？', "acceptedAnswer": { "@type": "Answer", "text": 'ホログラムシールがボトルにも貼られている場合は問題なし。ただし、確認方法は業者により異なるため、事前に相談しましょう。' } }] }) }} />;
}

export default function Karuizawa12HakoNashiPage() {
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
            <li><span className="text-foreground">箱なしによる査定額の影響</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt='軽井沢12年が箱なしでも買取できる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">軽井沢12年が箱なしでも買取できる？</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>「外箱を捨ててしまった」「最初から箱なしで購入した」——そんな状況でも、軽井沢12年の買取は可能です。ただし、付属品の有無で査定額は大きく変動します。本記事では、箱なしの場合の影響と賢い売却法を解説します。</p>

          <h2>箱なしによる査定額の影響</h2>

          <p>軽井沢12年の場合、外箱の有無で査定額が**10〜20%**変動します:
- **箱・冊子・カートン揃い**: 基準価格 150万円
- **箱なし、ラベル良好**: 120万円〜135万円
- **箱なし、冊子なし**: 112万円〜127万円</p>

          <h2>外箱の重要性</h2>

          <p>外箱は単なる包装ではなく、**コレクター品の完全性**を示す重要な要素です。海外コレクターは特に**フルセット（Box+Bottle+Booklet）**を重視するため、外箱なしのボトルは二次流通市場での評価が下がる傾向にあります。</p>

          <h2>箱を失った場合の対応策</h2>

          <p>1. **クローゼット・倉庫を徹底的に探す**: 意外な場所から出てくることが多々あります
2. **メーカーに問い合わせ**: ごく稀に空箱の販売・配布がある銘柄も
3. **オークション・フリマで空箱単体購入**: コレクターが空箱を売っているケースあり
4. **諦めて箱なしで売却**: 状態が良ければ十分な査定額が出ます</p>

          <h2>箱なしでも高く売るコツ</h2>

          <p>- **ボトル本体・ラベル・キャップを完璧な状態で保管**
- **冊子・ホログラム・購入レシート等、他の付属品があれば必ず添付**
- **複数業者で見積もり**: 業者により箱なしの評価額に差があります
- **写真撮影**: 査定前にボトルの状態を記録しておく</p>

          <h2>箱なしでも歓迎の買取業者</h2>

          <p>PeatBid推奨の4社はすべて箱なしでも査定対応可能。特に**ヒカカク・JOYLAB**は、お酒の専門知識があるためボトルの状態を正しく評価してくれます。</p>

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
            {[{ q: '箱を捨ててしまった軽井沢12年でも売れる？', a: 'はい、売れます。査定額は10〜20%下がりますが、未開封でラベル状態が良ければ十分な価格がつきます。' }, { q: '代用品の箱（汎用箱）を作って売却するのは？', a: '正規品でない箱は査定額に影響しません。むしろ正規品でない外箱は混乱を招くため、添付しない方が良いです。' }, { q: 'ホログラムシールが箱だけにある場合は？', a: 'ホログラムシールがボトルにも貼られている場合は問題なし。ただし、確認方法は業者により異なるため、事前に相談しましょう。' }].map((faq) => (
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
            <Link href="/articles/karuizawa-12-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">業者選び</span><p className="text-sm font-bold mt-1">軽井沢12年の買取業者ランキング</p></Link>
            <Link href="/articles/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">軽井沢12年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
