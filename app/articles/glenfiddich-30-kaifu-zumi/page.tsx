import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'グレンフィディック30年が開封済みでも売れる？【2026年最新】残量別の査定額と売却ガイド',
  description: 'グレンフィディック30年を開封済みで売る場合の査定額と注意点。残量別の価格目安、状態保持のコツ、開封済み歓迎の買取業者を解説。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '開封後どれくらいの期間で売却すべき？', "acceptedAnswer": { "@type": "Answer", "text": '蓋がしっかり閉まっていれば数年は品質保持可能ですが、酸化により香味が変化します。理想は開封後1年以内の売却。' } }, { "@type": "Question", "name": 'ほぼ空の{name}でも売れる？', "acceptedAnswer": { "@type": "Answer", "text": '残量1割以下は買取拒否される業者が多数。空き瓶として希少価値があれば（コレクター需要のあるボトル）、ボトルのみ買取に対応する業者もあります。' } }, { "@type": "Question", "name": '開封済みの{name}を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子を必ず添付、(2)早めに売却（時間経過で価値下落）、(3)複数業者比較。開封済みでも基本的な売却戦略は同じです。' } }] }) }} />;
}

export default function Glenfiddich30KaifuZumiPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/glenfiddich-30-kaitori/" className="hover:text-amber-dark transition-colors">グレンフィディック30年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">開封済みグレンフィディック30年の査定額の目安</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-hibiki.png" alt='グレンフィディック30年が開封済みでも売れる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンフィディック30年が開封済みでも売れる？</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>「グレンフィディック30年を開けてしまった……もう売れない？」と諦めている方、ご安心ください。開封済みでも、状態と残量次第で買取は可能です。本記事では、開封済みのグレンフィディック30年を最大限の価格で売る方法を解説します。</p>

          <h2>開封済みグレンフィディック30年の査定額の目安</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>未開封・箱付きが基準価格約180,000円に対し、開封済みは状態により以下のレンジで査定されます:<br/>- <strong>9割以上残</strong>: 基準の30〜40%（54,000円〜72,000円）<br/>- <strong>半分以上残</strong>: 基準の20〜30%（36,000円〜54,000円）<br/>- <strong>半分未満</strong>: 査定額が大きく下がる、買取不可の場合あり</p>` }} />

          <h2>開封済みの査定で重視される要素</h2>

          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>残量</strong>: 多いほど評価額アップ</li><li><strong>保管状態</strong>: コルク劣化・香味揮発の度合い</li><li><strong>付属品</strong>: 外箱・冊子の有無</li><li><strong>ラベル状態</strong>: 美しさは未開封同様に評価される</li><li><strong>キャップ・栓の状態</strong>: しっかり閉まっているか</li></ol>` }} />

          <h2>開封済みでも価値が高くなる条件</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>以下のようなグレンフィディック30年は、開封済みでも高めの査定が期待できます:<br/>- 終売・希少銘柄（流通量が極小）<br/>- 古いボトリング（ヴィンテージ価値）<br/>- 外箱・冊子が完全保存<br/>- 残量が9割以上で蓋がしっかり閉まっている</p>` }} />

          <h2>売却までの保管のコツ</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>開封後のグレンフィディック30年は、なるべく早く売却するか、適切に保管しましょう:<br/>- 立てて保管（横置きはコルク劣化）<br/>- 直射日光なし、室温20℃以下<br/>- できれば未開封同等の場所で<br/>- 売却まで開けない、注ぎ足しはしない</p>` }} />

          <h2>開封済みを買取してくれる業者</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid推奨の4社（ヒカカク・バイセル・JOYLAB・リカスタ）は、いずれも開封済みでも査定対応可能です。ただし業者によっては残量条件があるため、事前確認をおすすめします。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">グレンフィディック30年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>グレンフィディック30年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '開封後どれくらいの期間で売却すべき？', a: '蓋がしっかり閉まっていれば数年は品質保持可能ですが、酸化により香味が変化します。理想は開封後1年以内の売却。' }, { q: 'ほぼ空の{name}でも売れる？', a: '残量1割以下は買取拒否される業者が多数。空き瓶として希少価値があれば（コレクター需要のあるボトル）、ボトルのみ買取に対応する業者もあります。' }, { q: '開封済みの{name}を高く売るコツは？', a: '(1)外箱・冊子を必ず添付、(2)早めに売却（時間経過で価値下落）、(3)複数業者比較。開封済みでも基本的な売却戦略は同じです。' }].map((faq) => (
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
            <Link href="/articles/glenfiddich-30-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売却ガイド</span><p className="text-sm font-bold mt-1">グレンフィディック30年の高く売る方法</p></Link>
            <Link href="/articles/glenfiddich-30-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">真贋</span><p className="text-sm font-bold mt-1">グレンフィディック30年の偽物の見分け方</p></Link>
            <Link href="/articles/glenfiddich-30-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">業者選び</span><p className="text-sm font-bold mt-1">グレンフィディック30年の買取業者ランキング</p></Link>
            <Link href="/articles/glenfiddich-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">グレンフィディック30年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
