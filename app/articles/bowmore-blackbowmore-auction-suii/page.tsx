import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/bowmore-blackbowmore.json";

export const metadata: Metadata = {
  title: 'ブラックボウモアのオークション相場推移と買取価格【2026年11月最新】ヤフオク落札データ',
  description: 'ブラックボウモアは、ヤフオクの落札件数が集計の基準に満たない等の理由で、中央値と推移を掲載していません。集計の方法と海外オークションの扱いをご説明します。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'ブラックボウモアを売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じブラックボウモアでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'ブラックボウモアの売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'ブラックボウモアを売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。' } }] }) }} />;
}

export default function BowmoreBlackbowmoreAuctionSuiiPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/" className="hover:text-amber-dark transition-colors">銘柄一覧</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/bowmore-blackbowmore-kaitori/" className="hover:text-amber-dark transition-colors">ブラックボウモア</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">オークション相場推移</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/bowmore-blackbowmore.png" alt='ブラックボウモアのオークション相場推移' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ブラックボウモアのオークション相場推移</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-11-09 / 編集: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">ブラックボウモア</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / ボウモア蒸溜所（スコットランド・アイラ島） / 29〜50年熟成（1964年蒸留） / 希少度 ウルトラレア / 市場相場 市場相場データ集計中</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/bowmore-blackbowmore-kaitori/" className="text-amber-dark underline">ブラックボウモアの買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. ブラックボウモアの市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 週次の落札中央値の推移</a></li>
              <li><a href="#section-2" className="hover:underline">3. 落札中央値の集計方法</a></li>
              <li><a href="#section-3" className="hover:underline">4. 海外オークションの扱い</a></li>
              <li><a href="#section-4" className="hover:underline">5. 国内と海外での売却の違い</a></li>
            </ol>
          </div>

          <p>ブラックボウモアは、ヤフオクの落札結果から集計できる件数が基準に満たない等の理由で、中央値と推移を掲載していません。実際の金額は、複数の業者の査定でご確認ください。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">ブラックボウモアは二次流通の落札データが十分ではないため、本記事の金額は同じ価格帯の銘柄を参考にした一般的な目安です。最新の実勢は各買取業者の査定でご確認ください。</p>
          </div>


          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/auction-scene.png" alt="ウイスキーのオークションのイメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <h2 id="section-0">1. ブラックボウモアの市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>ブラックボウモア</strong>はスコッチウイスキー（ボウモア蒸溜所（スコットランド・アイラ島））の29〜50年熟成（1964年蒸留）、度数40.5〜50%（エディションにより異なる）、希少度は超希少に分類される銘柄です。</p><p>本銘柄は二次流通の落札サンプルが少ないため、実勢中央値は掲載していません。相場が定まりにくいため、複数の業者の査定で実際の金額をご確認ください。</p><p>スコッチは蒸溜所・地域（ボウモア蒸溜所（スコットランド・アイラ島））やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気により査定額に差が出るため、銘柄ごとの相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 週次の落札中央値の推移</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ブラックボウモアは、落札件数が基準（20件）に満たない、または別の商品の混入を除き切れないため、中央値と推移を掲載していません。</p>` }} />

          <h2 id="section-2">3. 落札中央値の集計方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>集計の手順は、以下のとおりです（<a href="/methodology/">算出方法</a>）。</p><ol><li>銘柄ごとに定めた検索語で、700mlボトルの落札結果を取得します</li><li>第1・第3四分位から四分位範囲の1.5倍を超えて離れた値を、外れ値として除外します</li><li>残った落札価格の中央値と件数を算出します</li><li>件数が20件未満の場合は、データ不足として中央値を掲載しません</li></ol>` }} />

          <h2 id="section-3">4. 海外オークションの扱い</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>海外オークションの落札結果は、相場の集計には使用していません。一部の記事で、落札額と出典を確認できた個別の結果のみ、出典URLとともに掲載しています。</p><p>ブラックボウモアの個別の結果は、<a href="/articles/bowmore-blackbowmore-kaitori/#auction-results">ブラックボウモアの買取相場ガイド</a>に出典とともに掲載しています。</p><p>海外オークションの結果をお調べになる場合は、各オークション会社の公式サイトをご確認ください。</p>` }} />

          <h2 id="section-4">5. 国内と海外での売却の違い</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>国内の買取業者に売却する場合は、業者と直接やり取りでき、国際輸送や関税の手続きは不要です。</p><p>海外オークションに出品する場合は、国際輸送費・関税・手数料が発生し、為替の影響も受けます。手数料や出品の条件は、各オークション会社の公式サイトでご確認ください。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">ブラックボウモアの無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>ブラックボウモアに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'ブラックボウモアを売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じブラックボウモアでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'ブラックボウモアの売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'ブラックボウモアを売る時期はいつがよいですか？', a: '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。' }].map((faq) => (
              <details key={faq.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              </details>
            ))}
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/bowmore-blackbowmore-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">ブラックボウモアの高価売却のポイント</p></Link>
            <Link href="/articles/bowmore-blackbowmore-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売る前チェック（真贋と相場）</span><p className="text-sm font-bold mt-1">ブラックボウモアの売る前チェック（真贋と相場）</p></Link>
            <Link href="/articles/bowmore-blackbowmore-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">ブラックボウモアの買取業者ランキング</p></Link>
            <Link href="/articles/bowmore-blackbowmore-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">ブラックボウモアの歴史と特徴</p></Link>
            <Link href="/articles/bowmore-blackbowmore-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">ブラックボウモアの希少性・投資価値</p></Link>
            <Link href="/articles/bowmore-blackbowmore-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">ブラックボウモアの開封済みボトルの買取</p></Link>
            <Link href="/articles/bowmore-blackbowmore-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">ブラックボウモアの箱なしボトルの買取</p></Link>
            <Link href="/articles/bowmore-blackbowmore-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">ブラックボウモアのラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/bowmore-blackbowmore-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">ブラックボウモアの買取相場ガイド</p></Link>
            <Link href="/articles/bowmore-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋の確認</span><p className="text-sm font-bold mt-1">ボウモア（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-11-09）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
