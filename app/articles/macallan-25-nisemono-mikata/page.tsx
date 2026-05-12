import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'マッカラン25年の偽物・贋作の見分け方【2026年最新】コレクター必須の5つのチェックポイント',
  description: 'マッカラン25年の偽物・贋作を見分ける具体的なポイントを徹底解説。ラベル・キャップ・液色・ホログラム・購入経路の5要素から本物を確実に判定する方法。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'マッカラン25年に贋作が多いのは本当？', "acceptedAnswer": { "@type": "Answer", "text": 'マッカラン25年のような高額銘柄は400,000円前後の流通価格があるため、贋作の経済合理性が成立しやすいです。特に未開封品で高値がつく銘柄は要注意です。' } }, { "@type": "Question", "name": '贋作を売ろうとしたらどうなる？', "acceptedAnswer": { "@type": "Answer", "text": '古物営業法・詐欺罪に問われる可能性があります。買取業者は専門知識で見抜くため、贋作の場合は買取拒否されます。' } }, { "@type": "Question", "name": '怪しいと思ったらどうすればいい？', "acceptedAnswer": { "@type": "Answer", "text": '信頼できる買取業者で**鑑定査定**を依頼してください。お酒買取専門店（JOYLAB等）は本物・贋作の判定経験が豊富です。' } }] }) }} />;
}

export default function Macallan25NisemonoMikataPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/macallan-25-kaitori/" className="hover:text-amber-dark transition-colors">マッカラン25年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">チェック1: ラベルの印刷品質</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-hibiki.png" alt='マッカラン25年の偽物・贋作の見分け方' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">マッカラン25年の偽物・贋作の見分け方</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>マッカラン25年のような高額ウイスキーは、贋作リスクが高まる銘柄です。特に未開封・箱付きで400,000円前後の流通価格を持つ銘柄は、海外を中心に巧妙な贋作が出回ることもあります。本記事では、マッカラン25年の偽物を見抜く具体的なチェックポイントを解説します。</p>

          <h2>チェック1: ラベルの印刷品質</h2>

          <p>正規品はラベルの文字が**鮮明・均一**。贋作はにじみ・かすれ・色ズレ・フォント違いが見られます。ラベルを拡大鏡で確認し、ロゴ・蒸溜所名・年数表記の細部までチェックしましょう。</p>

          <h2>チェック2: キャップ・封蝋・ホログラム</h2>

          <p>サントリー山崎・響、マッカランなどは**ホログラムシール**が貼付されています。贋作はホログラムが粗い、または偽造シール（光の反射が均一でない）が使われていることが多いです。キャップの密閉度・封蝋の状態も確認ポイントです。</p>

          <h2>チェック3: 液色と液面</h2>

          <p>本物のマッカラン25年は**均一な琥珀色**（透明感あり）。贋作は色ムラ・濁り・沈殿物が見られることがあります。また液面が肩口以下に下がっている古いボトルは要注意。</p>

          <h2>チェック4: 瓶の形状・刻印</h2>

          <p>公式ボトルは**底面に刻印**（ロット番号、製造所コード等）があります。贋作は刻印がない、または印字パターンが異なります。瓶の重量・厚みも正規品と微妙に違うことがあります。</p>

          <h2>チェック5: 購入経路の信頼性</h2>

          <p>**海外オークション・正規流通店・大手買取業者**で扱われている個体は信頼性が高いです。個人間取引（メルカリ、ヤフオク）・無名通販店経由は贋作リスクが高いため、慎重に判断しましょう。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">マッカラン25年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>マッカラン25年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'マッカラン25年に贋作が多いのは本当？', a: 'マッカラン25年のような高額銘柄は400,000円前後の流通価格があるため、贋作の経済合理性が成立しやすいです。特に未開封品で高値がつく銘柄は要注意です。' }, { q: '贋作を売ろうとしたらどうなる？', a: '古物営業法・詐欺罪に問われる可能性があります。買取業者は専門知識で見抜くため、贋作の場合は買取拒否されます。' }, { q: '怪しいと思ったらどうすればいい？', a: '信頼できる買取業者で**鑑定査定**を依頼してください。お酒買取専門店（JOYLAB等）は本物・贋作の判定経験が豊富です。' }].map((faq) => (
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
            <Link href="/articles/macallan-25-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売却ガイド</span><p className="text-sm font-bold mt-1">マッカラン25年の高く売る方法</p></Link>
            <Link href="/articles/macallan-25-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">業者選び</span><p className="text-sm font-bold mt-1">マッカラン25年の買取業者ランキング</p></Link>
            <Link href="/articles/macallan-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">マッカラン25年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
