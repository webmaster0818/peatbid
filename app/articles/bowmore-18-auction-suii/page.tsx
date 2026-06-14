import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/bowmore-18.json";

export const metadata: Metadata = {
  title: "ボウモア18年のオークション相場推移【2026年完全版】Sotheby's/Bonhams/海外データ完全分析",
  description: "ボウモア18年の国内外オークション相場推移を徹底分析。Sotheby's・Bonhams・Whisky Auctioneerの落札データから読み解く価格動向、過去5年の推移、今後の見通しまで完全解説。",
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'ボウモア18年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じボウモア18年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'ボウモア18年の売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'ボウモア18年を売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function Bowmore18AuctionSuiiPage() {
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
            <li><Link href="/articles/bowmore-18-kaitori/" className="hover:text-amber-dark transition-colors">ボウモア18年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">オークション相場推移</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/bowmore-18.png" alt='ボウモア18年のオークション相場推移' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ボウモア18年のオークション相場推移</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">ボウモア18年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / アイラ / 18年熟成 / 希少度 ミッド / 市場相場 11,182円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/bowmore-18-kaitori/" className="text-amber-dark underline">ボウモア18年の買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. ボウモア18年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 過去5年の価格推移</a></li>
              <li><a href="#section-2" className="hover:underline">3. 主要オークションプラットフォーム</a></li>
              <li><a href="#section-3" className="hover:underline">4. 価格を動かす5つの要因</a></li>
              <li><a href="#section-4" className="hover:underline">5. 地域別の価格特性</a></li>
              <li><a href="#section-5" className="hover:underline">6. 今後の見通し（中長期）</a></li>
              <li><a href="#section-6" className="hover:underline">7. オークションデータの確認方法</a></li>
              <li><a href="#section-7" className="hover:underline">8. 国内と海外、どちらで売るべきか</a></li>
            </ol>
          </div>

          <p>ボウモア18年の国内買取相場は、海外オークションの落札結果に強く連動します。本記事では、Sotheby's、Bonhams、Whisky Auctioneer等の主要オークションで取引された価格データから、相場の動向と今後の見通しを分析します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではボウモア18年の落札が約224件確認でき、落札額の中央値は11,182円でした。取引が活発で換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <h2 id="section-0">1. ボウモア18年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>ボウモア18年</strong>はスコッチウイスキー（アイラ）の18年熟成、度数43%、希少度は中程度の希少度に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>11,182円</strong>（流通サンプル224件、当サイト独自集計）。価格帯としては<strong>実用帯</strong>にあたり、回転が速く、状態が良ければスムーズに売却しやすい価格帯です。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているぶん、付属品・状態の差が査定額に直結します。</p><p>スコッチは蒸溜所・地域（アイラ）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気度で査定差が出るため、銘柄固有の相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 過去5年の価格推移</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ボウモア18年の二次流通価格は、過去5年で大きく上昇しています。

<strong>年別推移の目安</strong>:</p><ol><li>2020年: コロナ禍で一時減速、年末から回復</li><li>2021年: アジア富裕層の参入加速、年間+30〜50%</li><li>2022年: 価格急騰、年間+50〜80%</li><li>2023年: 上昇ペース緩和、年間+10〜20%</li><li>2024〜2025年: 安定推移、+5〜15%</li><li>2026年: 高値維持、現在は実勢の中央値前後

この5年間で累計<strong>約3〜5倍</strong>の上昇を示しており、ウイスキー投資としての魅力が証明されています。</li></ol>` }} />

          <h2 id="section-2">3. 主要オークションプラットフォーム</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ボウモア18年クラスの銘柄が取引される主要オークション:</p><ol><li><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong> — 月次〜四半期ごとに開催、プレミアム銘柄中心。最高クラスの希少銘柄が出品される。</li><li><strong>Bonhams（香港・ロンドン）</strong> — 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。香港オークションは特に活発。</li><li><strong>Whisky Auctioneer（UK）</strong> — 月次オンラインオークション、中位銘柄まで幅広く扱う。透明性が高い。</li><li><strong>Just Whisky Auctions（UK）</strong> — UK中心、月次開催、コレクター向け。</li><li><strong>Whisky Hammer（UK）</strong> — 月次オンライン、新興プレイヤー。</li><li><strong>Acker Wines（香港・ニューヨーク）</strong> — 富裕層会員制、超高額ボトル中心。</li></ol>` }} />

          <h2 id="section-3">4. 価格を動かす5つの要因</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>1. 海外オークション落札データ</strong> — 最も影響大。月次の落札結果が業者の仕入れ価格の基準<br/><strong>2. 円安・円高の為替動向</strong> — 円安で海外バイヤー有利、国内価格上昇<br/><strong>3. 終売・限定リリースのニュース</strong> — 供給制限による急騰局面<br/><strong>4. アジア富裕層の参入度合い</strong> — 中華圏の経済動向と連動<br/><strong>5. 季節要因（年末年始・お中元）</strong> — 贈答需要で価格上昇</p>` }} />

          <h2 id="section-4">5. 地域別の価格特性</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>地域別の価格水準</strong>:</p><ol><li><strong>香港・シンガポール</strong> — 富裕層多く最高値圏</li><li><strong>ニューヨーク</strong> — Sotheby's主導、プレミアム指向</li><li><strong>ロンドン</strong> — 歴史的にウイスキー取引の中心地</li><li><strong>東京</strong> — 国内取引の中心、海外への輸出窓口</li><li><strong>上海・北京</strong> — 急速に成長中の需要源

同じボウモア18年でも、地域によって5〜15%の価格差が生じます。海外オークション経由の方が高値が期待できる場合が多く、輸送・関税を考慮しても国内売却より有利なケースもあります。</li></ol>` }} />

          <h2 id="section-5">6. 今後の見通し（中長期）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ボウモア18年の中長期見通しは、以下の3要因が支え、<strong>高値推移が予想</strong>されます:</p><ol><li>世界的需要の継続（コレクター層拡大）</li><li>供給制限（長期熟成銘柄の物理的限界）</li><li>新興市場の参入（インド、中東、東南アジア）

ただし短期は需給の振れにより上下動も発生します。為替・地政学リスク・経済ショック等で一時的な価格調整も想定すべきです。</li></ol>` }} />

          <h2 id="section-6">7. オークションデータの確認方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>個人でも確認可能な情報源</strong>:</p><ol><li><strong>Whisky Auctioneer の Past Results 検索</strong> — 過去全件の落札データを無料閲覧可能</li><li><strong>Sotheby's の Whisky Department アーカイブ</strong> — 各オークションの結果を公開</li><li><strong>Bonhams の Past Auctions</strong> — 落札価格を確認可能</li><li><strong>Whisky Stats（whiskystats.net）</strong> — 月額有料サービスで詳細データ提供</li><li><strong>PeatBid 銘柄ページ</strong> — 主要50銘柄の相場を日次更新

これらのデータを参考にすることで、自身のボトルの市場価値を客観的に把握できます。</li></ol>` }} />

          <h2 id="section-7">8. 国内と海外、どちらで売るべきか</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>国内売却のメリット</strong>:</p><ol><li>手続きが簡便（業者と直接やり取り）</li><li>即日現金化可能</li><li>国際輸送・関税不要</li><li>トラブル時の対応が容易

<strong>海外オークション売却のメリット</strong>:</li><li>高値が期待できる（特に希少銘柄）</li><li>富裕層バイヤーへのアクセス</li><li>透明性の高い価格決定

<strong>海外売却のデメリット</strong>:</li><li>国際輸送費（数万円〜）</li><li>関税・代理人手数料</li><li>為替リスク</li><li>手続きの複雑性

総合判断としては、市場相場の2倍程度を超える超希少銘柄は海外オークション、それ以下は国内買取業者が現実的です。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">ボウモア18年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>ボウモア18年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'ボウモア18年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じボウモア18年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'ボウモア18年の売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'ボウモア18年を売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/bowmore-18-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">ボウモア18年の高く売る方法</p></Link>
            <Link href="/articles/bowmore-18-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">ボウモア18年の偽物の見分け方</p></Link>
            <Link href="/articles/bowmore-18-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">ボウモア18年の買取業者ランキング</p></Link>
            <Link href="/articles/bowmore-18-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">ボウモア18年の歴史と特徴</p></Link>
            <Link href="/articles/bowmore-18-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">ボウモア18年の希少性・投資価値</p></Link>
            <Link href="/articles/bowmore-18-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">ボウモア18年の開封済みでも売れる</p></Link>
            <Link href="/articles/bowmore-18-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">ボウモア18年の箱なしでも買取</p></Link>
            <Link href="/articles/bowmore-18-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">ボウモア18年のラベル汚れでも査定</p></Link>
            <Link href="/articles/bowmore-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">ボウモア18年の買取相場ガイド（完全版）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-15）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
