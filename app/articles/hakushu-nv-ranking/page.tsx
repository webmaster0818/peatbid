import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hakushu-nv.json";

export const metadata: Metadata = {
  title: '白州ノンエイジの買取おすすめ業者ランキング【2026年10月最新】査定額・スピードを比較',
  description: '白州ノンエイジの買取に対応している業者をランキング形式で比較しています。ヒカカク！・バイセル・リカスタの査定スピード・査定額・サポート・信頼性を評価し、目的別のおすすめを掲載しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '白州ノンエイジを売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じ白州ノンエイジでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '白州ノンエイジの売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '白州ノンエイジを売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function HakushuNvRankingPage() {
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
            <li><Link href="/articles/hakushu-nv-kaitori/" className="hover:text-amber-dark transition-colors">白州ノンエイジ</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">買取業者ランキング</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hakushu-nv.png" alt='白州ノンエイジの買取業者おすすめランキング' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州ノンエイジの買取業者おすすめランキング</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-12 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">白州ノンエイジ</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / 白州蒸溜所 / ノンエイジ / 希少度 コモン / 市場相場 10,051円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark underline">白州ノンエイジの買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 白州ノンエイジの市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. ランキングの選定基準</a></li>
              <li><a href="#section-2" className="hover:underline">3. 1位: ヒカカク！（一括査定）</a></li>
              <li><a href="#section-3" className="hover:underline">4. 2位: バイセル（東証グロース上場）</a></li>
              <li><a href="#section-4" className="hover:underline">5. 3位: リカスタ（宅配買取）</a></li>
              <li><a href="#section-5" className="hover:underline">6. 業者選びの手順</a></li>
            </ol>
          </div>

          <p>白州ノンエイジを高く売るためには、業者選びが重要です。実勢中央値10,051円クラスのボトルでも、業者間で概算約500〜1,510円（相場の5〜15%）の査定差が生じる場合があります。本記事では、PeatBid編集部が選定基準にもとづいて選んだ白州ノンエイジの買取に対応している業者3社を、ランキング形式で比較します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは白州ノンエイジの落札が約232件確認でき、落札額の中央値は10,051円でした。取引が活発で、換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>


          <div className="table-wrapper not-prose my-6">
            <p className="text-sm font-bold mb-2 text-ink">業者比較表</p>
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr>
                  <th>業者</th>
                  <th>得意領域</th>
                  <th>査定スピード（各社公式・2026年10月16日確認）</th>
                  <th>査定額傾向</th>
                  <th>手数料</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>ヒカカク！</strong></td><td>一括査定（最大20社）</td><td>査定結果メールは最短1日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>バイセル</strong></td><td>大手の安心感</td><td>出張は最短即日訪問・その場で査定</td><td>★★★★</td><td>無料</td></tr>
                <tr><td><strong>リカスタ</strong></td><td>宅配買取</td><td>査定の連絡は1営業日以内（本数により2営業日以上）</td><td>★★★★</td><td>無料</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="section-0">1. 白州ノンエイジの市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>白州ノンエイジ</strong>はジャパニーズウイスキー（白州蒸溜所）のノンエイジ（NV）、度数43%、希少度は標準的な流通量に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>10,051円</strong>（流通サンプル232件、当サイトの集計）。価格帯としては<strong>実用帯</strong>にあたり、取引が多く、状態が良ければ売却しやすい価格帯です。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているため、付属品・状態の差が査定額に直接影響します。</p><p>ジャパニーズウイスキーは世界的な評価の高まりにより需要が強く、特に終売・長期熟成の銘柄は中長期で価格が上昇しやすい傾向があります。一方で、短期的には為替やオークションの結果により変動するため、売却の時期の判断が重要です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. ランキングの選定基準</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid編集部による白州ノンエイジの買取業者の選定基準（5項目）は以下のとおりです。</p><ol><li><strong>専門知識</strong> — お酒・ウイスキー専門の鑑定力があるか</li><li><strong>査定スピード</strong> — 見積もり〜入金までの所要日数</li><li><strong>査定額の透明性</strong> — 価格根拠・状態評価の説明があるか</li><li><strong>手数料・キャンセル料</strong> — 無料か</li><li><strong>信頼性</strong> — 上場・古物商許可・口コミ評判

以上の5項目を各業者ごとに10点満点で評価し、合計点でランキングを作成しました。</li></ol>` }} />

          <h2 id="section-2">3. 1位: ヒカカク！（一括査定）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>総合スコア: 47/50</strong></p><p>ヒカカク！は、最大20社の買取業者に一括で見積もりを依頼できる比較サービスです。1回の申し込みで最大20社から査定結果が届きます。希少銘柄ほど業者間の査定差が大きいため、<strong>最初に相場を把握する手段</strong>として適しています。</p><p><strong>強み</strong>: 最大20社から一括査定 / 無料 / Webで24時間申し込み可能 / お酒・洋酒・ブランデーに対応</p><p><strong>留意点</strong>: 一括査定のため、各業者から個別に連絡があります / 一括査定の後に専門店の個別査定もおすすめします</p><p><strong>おすすめの方</strong>: 複数社の査定額を効率よく比較したい方、初めて買取を依頼する方</p>` }} />

          <h2 id="section-3">4. 2位: バイセル（東証グロース上場）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>総合スコア: 44/50</strong></p><p>東証グロース上場のBuySell Technologies運営。累計買取点数4,800万点以上（2015〜2025年の合計・公式）の買取大手で、お酒・ウイスキーの買取に対応しています。<strong>大手の業者に出張買取を依頼したい場合</strong>に適しています。</p><p><strong>強み</strong>: 東証グロース上場企業が運営 / 出張・店頭・宅配の3つの方式に対応 / テレビCMを放映 / 査定料等は無料</p><p><strong>留意点</strong>: 一括査定と比べて査定額がやや低い場合があります / 出張買取は離島が対象外です</p><p><strong>おすすめの方</strong>: 大手の業者に依頼したい方、まとめて売却したい方</p>` }} />

          <h2 id="section-4">5. 3位: リカスタ（宅配買取）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>総合スコア: 40/50</strong></p><p>リカスタは、全国から宅配買取を受け付けているお酒の買取サービスです。店舗に行く時間がない方、地方にお住まいの方に適しています。査定料・キャンセル料・送料・梱包キットは無料です。</p><p><strong>強み</strong>: 全国から宅配買取を受付 / 査定料・送料・キャンセル料は無料 / ジャパニーズウイスキーの買取に対応 / Webで申し込み可能</p><p><strong>留意点</strong>: 査定額が専門店と比べてやや低い場合があります / 店舗は大阪・新宿の2店のみです（ほかの地域は宅配または出張）</p><p><strong>おすすめの方</strong>: 宅配で売却したい方、地方にお住まいの方、複数本をまとめて宅配で売却したい方</p>` }} />

          <h2 id="section-5">6. 業者選びの手順</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid編集部が推奨する<strong>3つのステップ</strong>は以下のとおりです。</p><ol><li><strong>一括査定を依頼する</strong> — 最大20社の査定額で相場を把握します</li><li><strong>専門店に個別査定を依頼する</strong> — お酒の買取専門店の査定で市場価値を確認します</li><li><strong>査定額を比較して売却する</strong> — 手数料・送料を差し引いた受取額で比較し、売却先を決定します</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州ノンエイジの無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>白州ノンエイジに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '白州ノンエイジを売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じ白州ノンエイジでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '白州ノンエイジの売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '白州ノンエイジを売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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
            <Link href="/articles/hakushu-nv-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">白州ノンエイジの高価売却のポイント</p></Link>
            <Link href="/articles/hakushu-nv-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売る前チェック（真贋と相場）</span><p className="text-sm font-bold mt-1">白州ノンエイジの売る前チェック（真贋と相場）</p></Link>
            <Link href="/articles/hakushu-nv-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">白州ノンエイジの歴史と特徴</p></Link>
            <Link href="/articles/hakushu-nv-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">白州ノンエイジの希少性・投資価値</p></Link>
            <Link href="/articles/hakushu-nv-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">白州ノンエイジのオークション推移</p></Link>
            <Link href="/articles/hakushu-nv-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">白州ノンエイジの開封済みボトルの買取</p></Link>
            <Link href="/articles/hakushu-nv-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">白州ノンエイジの箱なしボトルの買取</p></Link>
            <Link href="/articles/hakushu-nv-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">白州ノンエイジのラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/hakushu-nv-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">白州ノンエイジの買取相場ガイド</p></Link>
            <Link href="/articles/hakushu-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋の確認</span><p className="text-sm font-bold mt-1">白州（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-12）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
