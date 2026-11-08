import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/taketsuru-21.json";

export const metadata: Metadata = {
  title: '竹鶴21年のオークション相場推移と買取価格【2026年11月最新】ヤフオク落札データ',
  description: '竹鶴21年のヤフオク落札価格の推移を、毎週月曜に集計した中央値で掲載しています。集計の対象はヤフオクの過去180日の落札結果で、海外オークションの結果は含みません。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '竹鶴21年を売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じ竹鶴21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '竹鶴21年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '竹鶴21年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。' } }] }) }} />;
}

export default function Taketsuru21AuctionSuiiPage() {
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
            <li><Link href="/articles/taketsuru-21-kaitori/" className="hover:text-amber-dark transition-colors">竹鶴21年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">オークション相場推移</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/taketsuru-21.png" alt='竹鶴21年のオークション相場推移' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">竹鶴21年のオークション相場推移</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-11-09 / 編集: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">竹鶴21年</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / ニッカ / 21年熟成 / 希少度 ハイ / 市場相場 63,800円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/taketsuru-21-kaitori/" className="text-amber-dark underline">竹鶴21年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 竹鶴21年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 週次の落札中央値の推移</a></li>
              <li><a href="#section-2" className="hover:underline">3. 落札中央値の集計方法</a></li>
              <li><a href="#section-3" className="hover:underline">4. 海外オークションの扱い</a></li>
              <li><a href="#section-4" className="hover:underline">5. 国内と海外での売却の違い</a></li>
            </ol>
          </div>

          <p>竹鶴21年の相場の動きを、ヤフオクの落札結果から毎週集計した中央値で掲載します。個人間取引の落札価格であり、買取店の査定額とは異なります。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは竹鶴21年の落札が約258件確認でき、落札額の中央値は63,800円でした。取引が活発で、換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">竹鶴21年の買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 640 210" role="img" aria-label="竹鶴21年のヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              <line x1="66" y1="38.9" x2="622" y2="38.9" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="42.4" fontSize="10" fill="#807565" textAnchor="end">63,800</text>
              <line x1="66" y1="97.0" x2="622" y2="97.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="100.5" fontSize="10" fill="#807565" textAnchor="end">63,624</text>
              <line x1="66" y1="155.1" x2="622" y2="155.1" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="158.6" fontSize="10" fill="#807565" textAnchor="end">63,449</text>
              <polyline points="66.0,39.6 116.5,38.9 167.1,39.6 217.6,39.6 268.2,38.9 318.7,38.9 369.3,39.2 419.8,39.2 470.4,39.6 520.9,155.1 571.5,38.9 622.0,38.9" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66.0" cy="39.6" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-24: 63,798円（サンプル n=274件）</title></circle>
              <circle cx="116.5" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-31: 63,800円（サンプル n=268件）</title></circle>
              <circle cx="167.1" cy="39.6" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-07: 63,798円（サンプル n=270件）</title></circle>
              <circle cx="217.6" cy="39.6" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-14: 63,798円（サンプル n=266件）</title></circle>
              <circle cx="268.2" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-21: 63,800円（サンプル n=266件）</title></circle>
              <circle cx="318.7" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-28: 63,800円（サンプル n=266件）</title></circle>
              <circle cx="369.3" cy="39.2" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-05: 63,799円（サンプル n=264件）</title></circle>
              <circle cx="419.8" cy="39.2" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-12: 63,799円（サンプル n=264件）</title></circle>
              <circle cx="470.4" cy="39.6" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-19: 63,798円（サンプル n=262件）</title></circle>
              <circle cx="520.9" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-26: 63,449円（サンプル n=260件）</title></circle>
              <circle cx="571.5" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-11-02: 63,800円（サンプル n=260件）</title></circle>
              <circle cx="622.0" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-11-09: 63,800円（サンプル n=258件）</title></circle>
              <text x="618.0" y="28.9" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">63,800円</text>
              <text x="66.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">8/24</text>
              <text x="318.7" y="198" fontSize="10" fill="#807565" textAnchor="middle">9/28</text>
              <text x="622.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">11/9</text>
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">期間 2026-08-24〜2026-11-09（週次12点・各点のサンプル数 n=258〜274件）。出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜に更新。買取額を保証するものではありません。</p>
          </div>


          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/auction-scene.png" alt="ウイスキーのオークションのイメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <h2 id="section-0">1. 竹鶴21年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>竹鶴21年</strong>はジャパニーズウイスキー（ニッカ）の21年熟成、度数43%、希少度は希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>63,800円</strong>（流通サンプル258件、当サイトの集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定額が変動しやすく、状態の管理が査定額に影響します。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているため、付属品・状態の差が査定額に直接影響します。</p><p>ジャパニーズウイスキーは世界的な評価の高まりにより需要が強く、特に終売・長期熟成の銘柄は中長期で価格が上昇しやすい傾向があります。一方で、短期的には為替やオークションの結果により変動するため、売却の時期の判断が重要です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 週次の落札中央値の推移</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid がヤフオク落札中央値の週次集計を始めた 2026-05-25 の竹鶴21年は <strong>62,549円</strong>（n=272件）、最新の 2026-11-09 は <strong>63,800円</strong>（n=258件）で、この間の変化は <strong>+2.0%</strong> です。</p><p>集計した25週のうち、最も高い週は <strong>63,800円</strong>（2026-08-17）、最も低い週は <strong>62,549円</strong>（2026-05-25）です。</p><p>各週の値は過去180日分の落札結果の集計のため、週ごとの変化は緩やかに表れます。集計期間が25週分のため、数年単位の値動きについては、このデータからは判断できません。</p>` }} />

          <h2 id="section-2">3. 落札中央値の集計方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>集計の手順は、以下のとおりです（<a href="/methodology/">算出方法</a>）。</p><ol><li>銘柄ごとに定めた検索語で、700mlボトルの落札結果を取得します</li><li>第1・第3四分位から四分位範囲の1.5倍を超えて離れた値を、外れ値として除外します</li><li>残った落札価格の中央値と件数を算出します</li><li>件数が20件未満の場合は、データ不足として中央値を掲載しません</li></ol>` }} />

          <h2 id="section-3">4. 海外オークションの扱い</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>海外オークションの落札結果は、相場の集計には使用していません。一部の記事で、落札額と出典を確認できた個別の結果のみ、出典URLとともに掲載しています。</p><p>海外オークションの結果をお調べになる場合は、各オークション会社の公式サイトをご確認ください。</p>` }} />

          <h2 id="section-4">5. 国内と海外での売却の違い</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>国内の買取業者に売却する場合は、業者と直接やり取りでき、国際輸送や関税の手続きは不要です。</p><p>海外オークションに出品する場合は、国際輸送費・関税・手数料が発生し、為替の影響も受けます。手数料や出品の条件は、各オークション会社の公式サイトでご確認ください。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">竹鶴21年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>竹鶴21年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '竹鶴21年を売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じ竹鶴21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '竹鶴21年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '竹鶴21年を売る時期はいつがよいですか？', a: '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。' }].map((faq) => (
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
            <Link href="/articles/taketsuru-21-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">竹鶴21年の高価売却のポイント</p></Link>
            <Link href="/articles/taketsuru-21-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">竹鶴21年の偽物の見分け方</p></Link>
            <Link href="/articles/taketsuru-21-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">竹鶴21年の買取業者ランキング</p></Link>
            <Link href="/articles/taketsuru-21-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">竹鶴21年の歴史と特徴</p></Link>
            <Link href="/articles/taketsuru-21-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">竹鶴21年の希少性・投資価値</p></Link>
            <Link href="/articles/taketsuru-21-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">竹鶴21年の開封済みボトルの買取</p></Link>
            <Link href="/articles/taketsuru-21-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">竹鶴21年の箱なしボトルの買取</p></Link>
            <Link href="/articles/taketsuru-21-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">竹鶴21年のラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/taketsuru-21-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">竹鶴21年の買取相場ガイド</p></Link>
            <Link href="/articles/taketsuru-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ブランド一覧</span><p className="text-sm font-bold mt-1">竹鶴の買取価格一覧（全ボトル）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-11-09）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
