import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: '秩父ザファーストのラベル汚れ・破れがあっても売れる？【2026年最新】状態別の査定額目安',
  description: '秩父ザファーストのラベル汚れ・破れ・剥がれ・水濡れ跡がある場合の買取査定額を解説。状態別の価格目安と、ラベルを保護する保管方法。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'ラベルが完全に剥がれている{name}でも売れる？', "acceptedAnswer": { "@type": "Answer", "text": '売れますが、査定額は基準の30〜50%程度まで下がります。剥がれたラベルが保管されていれば、一緒に持ち込みましょう。' } }, { "@type": "Question", "name": 'ラベルの汚れを自分で拭き取っていい？', "acceptedAnswer": { "@type": "Answer", "text": '**絶対にNG**です。水・洗剤での清掃はラベル素材を傷める可能性大。気になる場合は乾いた柔らかい布で軽く埃を払う程度に。' } }, { "@type": "Question", "name": 'シミがついたラベルは復元できる？', "acceptedAnswer": { "@type": "Answer", "text": '市販の方法では復元困難です。修復を専門業者に依頼すると、修復費用が査定額を上回る場合があるため、現状のまま売却が現実的です。' } }] }) }} />;
}

export default function ChichibuTheFirstLabelYogorePage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/chichibu-the-first-kaitori/" className="hover:text-amber-dark transition-colors">秩父ザファースト</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">ラベル状態の判定基準</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt='秩父ザファーストのラベル汚れ・破れがあっても売れる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">秩父ザファーストのラベル汚れ・破れがあっても売れる？</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>長期保管した秩父ザファーストのラベルが汚れた、破れた、水濡れ跡がついた——そんな場合でも、買取は可能です。本記事では、ラベルの状態が査定額にどう影響するか、状態別の価格目安を解説します。</p>

          <h2>ラベル状態の判定基準</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>ラベルは「コレクター品の顔」とも言える重要な要素です。買取査定では以下の状態を確認:<br/>- <strong>新品同様</strong>: 印刷鮮明、シワ・汚れ・破れなし<br/>- <strong>軽度の汚れ</strong>: 表面の埃・指紋・若干の変色<br/>- <strong>シミ・水濡れ跡</strong>: 液体接触の痕跡<br/>- <strong>破れ・欠け・剥がれ</strong>: 物理的損傷<br/>- <strong>強い退色</strong>: 直射日光や蛍光灯による色あせ</p>` }} />

          <h2>ラベル状態別の査定額目安</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>秩父ザファーストの基準価格 350万円に対し、ラベル状態でこう変動します:<br/>- <strong>新品同様</strong>: 350万円（100%）<br/>- <strong>軽度の汚れ</strong>: 315万円（90%程度）<br/>- <strong>シミ・水濡れ跡</strong>: 280万円（80%程度）<br/>- <strong>破れ・欠け</strong>: 227万円（65%程度）<br/>- <strong>強い退色・大きな損傷</strong>: 175万円（50%程度）</p>` }} />

          <h2>ラベル損傷が起きやすい原因</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>- <strong>直射日光・蛍光灯</strong>: 退色・脆化<br/>- <strong>湿度の高い場所</strong>: シミ・カビ<br/>- <strong>段ボール直置き</strong>: シミ・吸湿<br/>- <strong>粘着テープの貼り付け</strong>: 剥がし跡<br/>- <strong>タンスや棚の埃</strong>: 表面汚れ</p>` }} />

          <h2>ラベルを保護する保管方法</h2>

          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>直射日光を完全に避ける</strong>: カーテン・遮光カバーを活用</li><li><strong>室温15〜20℃、湿度50〜70%</strong>: 急激な温湿度変化を避ける</li><li><strong>外箱に入れて保管</strong>: 多くの劣化を防ぐ</li><li><strong>専用のディスプレイケース</strong>: コレクター品ならガラスケース</li><li><strong>直接触れない</strong>: 必要なら手袋着用</li></ol>` }} />

          <h2>ラベル汚れがある状態での売却</h2>

          <div dangerouslySetInnerHTML={{ __html: `<p>「もう価値はない」と諦める前に、複数業者で見積もりを取りましょう。業者により、ラベル汚れの評価基準が異なります。<strong>JOYLAB・リカスタ</strong>等の専門店は、ラベル以外の総合状態で判断してくれます。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">秩父ザファーストの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>秩父ザファーストに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'ラベルが完全に剥がれている{name}でも売れる？', a: '売れますが、査定額は基準の30〜50%程度まで下がります。剥がれたラベルが保管されていれば、一緒に持ち込みましょう。' }, { q: 'ラベルの汚れを自分で拭き取っていい？', a: '**絶対にNG**です。水・洗剤での清掃はラベル素材を傷める可能性大。気になる場合は乾いた柔らかい布で軽く埃を払う程度に。' }, { q: 'シミがついたラベルは復元できる？', a: '市販の方法では復元困難です。修復を専門業者に依頼すると、修復費用が査定額を上回る場合があるため、現状のまま売却が現実的です。' }].map((faq) => (
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
            <Link href="/articles/chichibu-the-first-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売却ガイド</span><p className="text-sm font-bold mt-1">秩父ザファーストの高く売る方法</p></Link>
            <Link href="/articles/chichibu-the-first-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">真贋</span><p className="text-sm font-bold mt-1">秩父ザファーストの偽物の見分け方</p></Link>
            <Link href="/articles/chichibu-the-first-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">業者選び</span><p className="text-sm font-bold mt-1">秩父ザファーストの買取業者ランキング</p></Link>
            <Link href="/articles/chichibu-the-first-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">秩父ザファーストの買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
