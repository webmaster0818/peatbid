import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/macallan-30.json";

export const metadata: Metadata = {
  title: 'マッカラン30年のオークション相場推移と買取価格【2026年10月最新】国内外データ分析',
  description: "マッカラン30年の国内外のオークション相場の推移を解説しています。Sotheby's・Bonhams・Whisky Auctioneerの落札データにもとづく価格動向、過去5年の推移、今後の見通しを掲載しています。",
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'マッカラン30年を売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じマッカラン30年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'マッカラン30年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'マッカラン30年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
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
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-19 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">マッカラン30年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / スペイサイド / 30年熟成 / 希少度 ウルトラ / 市場相場 396,000円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/macallan-30-kaitori/" className="text-amber-dark underline">マッカラン30年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. マッカラン30年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 過去5年の価格推移</a></li>
              <li><a href="#section-2" className="hover:underline">3. 主要オークションプラットフォーム</a></li>
              <li><a href="#section-3" className="hover:underline">4. 価格を動かす5つの要因</a></li>
              <li><a href="#section-4" className="hover:underline">5. 地域別の価格特性</a></li>
              <li><a href="#section-5" className="hover:underline">6. 今後の見通し（中長期）</a></li>
              <li><a href="#section-6" className="hover:underline">7. オークションデータの確認方法</a></li>
              <li><a href="#section-7" className="hover:underline">8. 国内と海外での売却の比較</a></li>
            </ol>
          </div>

          <p>マッカラン30年の国内の買取相場は、海外オークションの落札結果に連動する傾向があります。本記事では、Sotheby's、Bonhams、Whisky Auctioneer等の主要オークションで取引された価格データから、相場の動向と今後の見通しを分析します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではマッカラン30年の落札が約54件確認でき、落札額の中央値は396,000円でした。一定の流通があり、比較的換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>


          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <h2 id="section-0">1. マッカラン30年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>マッカラン30年</strong>はスコッチウイスキー（スペイサイド）の30年熟成、度数43%、希少度は超希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>396,000円</strong>（流通サンプル54件、当サイトの集計）。価格帯としては<strong>超高額帯（1本数十万円規模）</strong>にあたり、真贋・状態の評価が特に厳しい価格帯で、専門知識を持つ業者ほど適正に評価する傾向があります。</p><p>流通量は<strong>標準的</strong>の水準です。一定の流通量があり相場が形成されやすいため、複数の業者を比較することで適正な金額を判断しやすい銘柄です。</p><p>スコッチは蒸溜所・地域（スペイサイド）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気により査定額に差が出るため、銘柄ごとの相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 過去5年の価格推移</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>マッカラン30年の二次流通価格は、過去5年で大きく上昇しています。

<strong>年別推移の目安</strong>:</p><ol><li>2020年: コロナ禍で一時減速、年末から回復</li><li>2021年: アジア富裕層の参入加速、年間+30〜50%</li><li>2022年: 価格急騰、年間+50〜80%</li><li>2023年: 上昇ペース緩和、年間+10〜20%</li><li>2024〜2025年: 安定推移、+5〜15%</li><li>2026年: 高値維持、現在は実勢の中央値前後

この5年間の累計では<strong>約3〜5倍</strong>の上昇となっています。</li></ol>` }} />

          <h2 id="section-2">3. 主要オークションプラットフォーム</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>マッカラン30年と同じ価格帯の銘柄が取引される主なオークションは、以下のとおりです。</p><ol><li><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong> — 月次〜四半期ごとに開催され、高額銘柄が中心です。</li><li><strong>Bonhams（香港・ロンドン）</strong> — 高額銘柄が中心です。</li><li><strong>Whisky Auctioneer（UK）</strong> — 月次のオンラインオークションで、中価格帯の銘柄まで幅広く扱っています。</li><li><strong>Just Whisky Auctions（UK）</strong> — 月次で開催されています。</li><li><strong>Whisky Hammer（UK）</strong> — 月次のオンラインオークションです。</li><li><strong>Acker Wines（香港・ニューヨーク）</strong> — 高額ボトルが中心です。</li></ol>` }} />

          <h2 id="section-3">4. 価格を動かす5つの要因</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>1. 海外オークションの落札データ</strong> — 影響が最も大きく、月次の落札結果が業者の仕入れ価格の基準の一つとなります<br/><strong>2. 為替の動向</strong> — 円安の局面では海外の購入者に有利となり、国内価格が上昇する傾向があります<br/><strong>3. 終売・限定リリースの報道</strong> — 供給制限により価格が上昇する場合があります<br/><strong>4. アジアの富裕層の需要</strong> — 中華圏の経済動向と連動する傾向があります<br/><strong>5. 季節要因（年末年始・お中元）</strong> — 贈答需要により価格が上昇する傾向があります</p>` }} />

          <h2 id="section-4">5. 地域別の価格特性</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>地域別の価格水準</strong></p><ol><li><strong>香港・シンガポール</strong> — 富裕層が多く、価格水準が高い地域です</li><li><strong>ニューヨーク</strong> — 高額銘柄の取引が中心です</li><li><strong>ロンドン</strong> — ウイスキー取引の中心地の一つです</li><li><strong>東京</strong> — 国内取引の中心です</li><li><strong>上海・北京</strong> — 需要が拡大している地域です

同じマッカラン30年でも、地域によって5〜15%の価格差が生じます。海外オークションのほうが高値となる場合があり、輸送・関税を考慮しても国内での売却より有利な例もあります。</li></ol>` }} />

          <h2 id="section-5">6. 今後の見通し（中長期）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>マッカラン30年の中長期の価格を支える要因として、以下の3点が挙げられます。</p><ol><li>世界的需要の継続（コレクター層拡大）</li><li>供給制限（長期熟成銘柄の物理的限界）</li><li>新興市場の参入（インド、中東、東南アジア）

ただし、短期的には需給により価格が上下します。為替・地政学リスク・経済情勢などにより、一時的に価格が下落する可能性もあります。</li></ol>` }} />

          <h2 id="section-6">7. オークションデータの確認方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>個人でも確認できる情報源</strong></p><ol><li><strong>Whisky Auctioneer の Past Results 検索</strong> — 過去の落札データを無料で閲覧できます</li><li><strong>Sotheby's の Whisky Department アーカイブ</strong> — 各オークションの結果を公開しています</li><li><strong>Bonhams の Past Auctions</strong> — 落札価格を確認できます</li><li><strong>Whisky Stats（whiskystats.net）</strong> — 月額有料のサービスで、詳細なデータを提供しています</li><li><strong>PeatBid 銘柄ページ</strong> — 主要50銘柄の相場を毎週更新しています

これらのデータを参考にすることで、お持ちのボトルの市場価値を客観的に把握できます。</li></ol>` }} />

          <h2 id="section-7">8. 国内と海外での売却の比較</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>国内売却のメリット</strong>:</p><ol><li>手続きが簡便（業者と直接やり取り）</li><li>即日現金化可能</li><li>国際輸送・関税不要</li><li>トラブル時の対応が容易

<strong>海外オークション売却のメリット</strong>:</li><li>高値が期待できる（特に希少銘柄）</li><li>富裕層バイヤーへのアクセス</li><li>透明性の高い価格決定

<strong>海外売却のデメリット</strong>:</li><li>国際輸送費（数万円〜）</li><li>関税・代理人手数料</li><li>為替リスク</li><li>手続きの複雑性

一般的には、特に希少な銘柄は海外オークション、それ以外は国内の買取業者の利用が現実的です。</li></ol>` }} />

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
            {[{ q: 'マッカラン30年を売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じマッカラン30年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'マッカラン30年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'マッカラン30年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-19）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
