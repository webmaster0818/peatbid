import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/macallan-30.json";

export const metadata: Metadata = {
  title: 'マッカラン30年のオークション相場推移と買取価格【2026年11月最新】ヤフオク落札データ',
  description: 'マッカラン30年のヤフオク落札価格の推移を、毎週月曜に集計した中央値で掲載しています。集計の対象はヤフオクの過去180日の落札結果で、海外オークションの結果は含みません。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'マッカラン30年を売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じマッカラン30年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'マッカラン30年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'マッカラン30年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。' } }] }) }} />;
}

export default function Macallan30AuctionSuiiPage() {
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
            <li><Link href="/articles/macallan-30-kaitori/" className="hover:text-amber-dark transition-colors">マッカラン30年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">オークション相場推移</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/macallan-30.png" alt='マッカラン30年のオークション相場推移' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">マッカラン30年のオークション相場推移</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-11-09 / 編集: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">マッカラン30年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / スペイサイド / 30年熟成 / 希少度 ウルトラ / 市場相場 380,000円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/macallan-30-kaitori/" className="text-amber-dark underline">マッカラン30年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. マッカラン30年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 週次の落札中央値の推移</a></li>
              <li><a href="#section-2" className="hover:underline">3. 落札中央値の集計方法</a></li>
              <li><a href="#section-3" className="hover:underline">4. 海外オークションの扱い</a></li>
              <li><a href="#section-4" className="hover:underline">5. 国内と海外での売却の違い</a></li>
            </ol>
          </div>

          <p>マッカラン30年の相場の動きを、ヤフオクの落札結果から毎週集計した中央値で掲載します。個人間取引の落札価格であり、買取店の査定額とは異なります。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではマッカラン30年の落札が約46件確認でき、落札額の中央値は380,000円でした。流通量がやや限られ、希少性が比較的高い銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">マッカラン30年の買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 640 210" role="img" aria-label="マッカラン30年のヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              <line x1="66" y1="38.9" x2="622" y2="38.9" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="42.4" fontSize="10" fill="#807565" textAnchor="end">402,009</text>
              <line x1="66" y1="97.0" x2="622" y2="97.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="100.5" fontSize="10" fill="#807565" textAnchor="end">357,804</text>
              <line x1="66" y1="155.1" x2="622" y2="155.1" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="158.6" fontSize="10" fill="#807565" textAnchor="end">313,599</text>
              <polyline points="66.0,135.5 116.5,155.1 167.1,105.9 217.6,105.9 268.2,105.9 318.7,105.9 369.3,38.9 419.8,38.9 470.4,46.8 520.9,106.5 571.5,106.5 622.0,67.8" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66.0" cy="135.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-24: 328,500円（サンプル n=36件）</title></circle>
              <circle cx="116.5" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-31: 313,599円（サンプル n=40件）</title></circle>
              <circle cx="167.1" cy="105.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-07: 351,000円（サンプル n=42件）</title></circle>
              <circle cx="217.6" cy="105.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-14: 351,000円（サンプル n=50件）</title></circle>
              <circle cx="268.2" cy="105.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-21: 351,000円（サンプル n=50件）</title></circle>
              <circle cx="318.7" cy="105.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-28: 351,000円（サンプル n=50件）</title></circle>
              <circle cx="369.3" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-05: 402,009円（サンプル n=46件）</title></circle>
              <circle cx="419.8" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-12: 402,009円（サンプル n=50件）</title></circle>
              <circle cx="470.4" cy="46.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-19: 396,000円（サンプル n=54件）</title></circle>
              <circle cx="520.9" cy="106.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-26: 350,543円（サンプル n=48件）</title></circle>
              <circle cx="571.5" cy="106.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-11-02: 350,543円（サンプル n=48件）</title></circle>
              <circle cx="622.0" cy="67.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-11-09: 380,000円（サンプル n=46件）</title></circle>
              <text x="618.0" y="57.8" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">380,000円</text>
              <text x="66.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">8/24</text>
              <text x="318.7" y="198" fontSize="10" fill="#807565" textAnchor="middle">9/28</text>
              <text x="622.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">11/9</text>
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">期間 2026-08-24〜2026-11-09（週次12点・各点のサンプル数 n=36〜54件）。出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜に更新。買取額を保証するものではありません。</p>
          </div>


          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/auction-scene.png" alt="ウイスキーのオークションのイメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <h2 id="section-0">1. マッカラン30年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>マッカラン30年</strong>はスコッチウイスキー（スペイサイド）の30年熟成、度数43%、希少度は超希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>380,000円</strong>（流通サンプル46件、当サイトの集計）。価格帯としては<strong>超高額帯（1本数十万円規模）</strong>にあたり、真贋・状態の評価が特に厳しい価格帯で、専門知識を持つ業者ほど適正に評価する傾向があります。</p><p>流通量は<strong>少なめ</strong>の水準です。流通はやや限られており、状態によっては査定額が高くなる傾向があります。</p><p>スコッチは蒸溜所・地域（スペイサイド）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気により査定額に差が出るため、銘柄ごとの相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 週次の落札中央値の推移</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid がヤフオク落札中央値の週次集計を始めた 2026-05-25 のマッカラン30年は <strong>396,000円</strong>（n=78件）、最新の 2026-11-09 は <strong>380,000円</strong>（n=46件）で、この間の変化は <strong>-4.0%</strong> です。</p><p>集計した25週のうち、最も高い週は <strong>402,009円</strong>（2026-10-05）、最も低い週は <strong>313,599円</strong>（2026-08-31）です。</p><p>各週の値は過去180日分の落札結果の集計のため、週ごとの変化は緩やかに表れます。集計期間が25週分のため、数年単位の値動きについては、このデータからは判断できません。</p>` }} />

          <h2 id="section-2">3. 落札中央値の集計方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>集計の手順は、以下のとおりです（<a href="/methodology/">算出方法</a>）。</p><ol><li>銘柄ごとに定めた検索語で、700mlボトルの落札結果を取得します</li><li>第1・第3四分位から四分位範囲の1.5倍を超えて離れた値を、外れ値として除外します</li><li>残った落札価格の中央値と件数を算出します</li><li>件数が20件未満の場合は、データ不足として中央値を掲載しません</li></ol>` }} />

          <h2 id="section-3">4. 海外オークションの扱い</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>海外オークションの落札結果は、相場の集計には使用していません。一部の記事で、落札額と出典を確認できた個別の結果のみ、出典URLとともに掲載しています。</p><p>海外オークションの結果をお調べになる場合は、各オークション会社の公式サイトをご確認ください。</p>` }} />

          <h2 id="section-4">5. 国内と海外での売却の違い</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>国内の買取業者に売却する場合は、業者と直接やり取りでき、国際輸送や関税の手続きは不要です。</p><p>海外オークションに出品する場合は、国際輸送費・関税・手数料が発生し、為替の影響も受けます。手数料や出品の条件は、各オークション会社の公式サイトでご確認ください。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">マッカラン30年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>マッカラン30年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'マッカラン30年を売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じマッカラン30年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'マッカラン30年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'マッカラン30年を売る時期はいつがよいですか？', a: '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。' }].map((faq) => (
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
            <Link href="/articles/macallan-30-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">マッカラン30年の高価売却のポイント</p></Link>
            <Link href="/articles/macallan-30-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">マッカラン30年の偽物の見分け方</p></Link>
            <Link href="/articles/macallan-30-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">マッカラン30年の買取業者ランキング</p></Link>
            <Link href="/articles/macallan-30-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">マッカラン30年の歴史と特徴</p></Link>
            <Link href="/articles/macallan-30-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">マッカラン30年の希少性・投資価値</p></Link>
            <Link href="/articles/macallan-30-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">マッカラン30年の開封済みボトルの買取</p></Link>
            <Link href="/articles/macallan-30-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">マッカラン30年の箱なしボトルの買取</p></Link>
            <Link href="/articles/macallan-30-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">マッカラン30年のラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/macallan-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">マッカラン30年の買取相場ガイド</p></Link>
            <Link href="/articles/macallan-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ブランド一覧</span><p className="text-sm font-bold mt-1">マッカランの買取価格一覧（全ボトル）</p></Link>
            <Link href="/articles/macallan-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋の確認</span><p className="text-sm font-bold mt-1">マッカラン（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-11-09）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
