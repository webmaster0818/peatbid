import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/miyagikyo-12.json";

export const metadata: Metadata = {
  title: '宮城峡12年は箱なしでも買取できる?【2026年10月最新】査定額への影響と対策',
  description: '宮城峡12年を箱なしで売る場合の査定額への影響と、買取を依頼する際の注意点を解説しています。査定額の目安、売却方法、外箱を探す方法を掲載しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '宮城峡12年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じ宮城峡12年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '宮城峡12年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '宮城峡12年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function Miyagikyo12HakoNashiPage() {
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
            <li><Link href="/articles/miyagikyo-12-kaitori/" className="hover:text-amber-dark transition-colors">宮城峡12年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">箱なしボトルの買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/miyagikyo-12.png" alt='宮城峡12年が箱なしでも買取できる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">宮城峡12年が箱なしでも買取できる？</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-12 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">宮城峡12年</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / 宮城峡蒸溜所 / 12年熟成 / 希少度 ミッド / 市場相場 37,398円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/miyagikyo-12-kaitori/" className="text-amber-dark underline">宮城峡12年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 宮城峡12年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 箱なしによる査定額の影響</a></li>
              <li><a href="#section-2" className="hover:underline">3. 外箱が査定に影響する理由</a></li>
              <li><a href="#section-3" className="hover:underline">4. 箱を失った場合の対応策</a></li>
              <li><a href="#section-4" className="hover:underline">5. 箱なしでも高く売る7つのコツ</a></li>
              <li><a href="#section-5" className="hover:underline">6. 箱なしボトルの査定に対応している買取業者</a></li>
              <li><a href="#section-6" className="hover:underline">7. 代用品の箱を使うことについて</a></li>
              <li><a href="#section-7" className="hover:underline">8. 箱を新規購入できるか</a></li>
            </ol>
          </div>

          <p>外箱を処分した場合や、箱なしで購入した場合でも、宮城峡12年は買取の対象となります。ただし、付属品の有無により査定額は大きく変動します。本記事では、箱なしの場合の査定額への影響と売却方法を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは宮城峡12年の落札が約22件確認でき、落札額の中央値は37,398円でした。流通量がやや限られ、希少性が比較的高い銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-5 not-prose">
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-perfect.png" alt="未開封・付属品完備" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>付属品完備</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-no-box.png" alt="未開封・箱なし" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>箱なし</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-label-dirty.png" alt="ラベル汚れ" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">ラベル<br/>汚れ</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-low-liquid.png" alt="液面減少" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">液面<br/>減少</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-opened.png" alt="開封済み" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">開封済み</p>
            </div>
          </div>

          <h2 id="section-0">1. 宮城峡12年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>宮城峡12年</strong>はジャパニーズウイスキー（宮城峡蒸溜所）の12年熟成、度数45%、希少度は中程度の希少度に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>37,398円</strong>（流通サンプル22件、当サイトの集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定額が変動しやすく、状態の管理が査定額に影響します。</p><p>流通量は<strong>少なめ</strong>の水準です。流通はやや限られており、状態によっては査定額が高くなる傾向があります。</p><p>ジャパニーズウイスキーは世界的な評価の高まりにより需要が強く、特に終売・長期熟成の銘柄は中長期で価格が上昇しやすい傾向があります。一方で、短期的には為替やオークションの結果により変動するため、売却の時期の判断が重要です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 箱なしによる査定額の影響</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>宮城峡12年の場合、実勢中央値<strong>37,398円</strong>を基準（付属品フル揃い=100%）として、付属品の有無で査定額は次のように変動します。</p><ol><li><strong>箱・冊子・カートン揃い</strong>: 37,398円（100%）</li><li><strong>箱あり・冊子なし</strong>: 約31,790〜35,530円（85〜95%）</li><li><strong>箱なし・冊子あり</strong>: 約31,790〜34,410円（85〜92%）</li><li><strong>箱なし・ラベル良好</strong>: 約29,920〜33,660円（80〜90%）</li><li><strong>箱・冊子なし</strong>: 約28,050〜31,790円（75〜85%）

付属品の有無だけで、最大で<strong>約9,350円（相場の約25%）の差</strong>が生じる場合があります。</li></ol>` }} />

          <h2 id="section-2">3. 外箱が査定に影響する理由</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>外箱は包装であると同時に、<strong>コレクター品として揃っていること</strong>を示す要素です。</p><ol><li><strong>二次流通市場での評価</strong> — 海外のコレクターは特に付属品が揃っていることを重視します</li><li><strong>真贋判定の手がかり</strong> — 箱と本体が一致していることが確認材料になります</li><li><strong>保管時の保護</strong> — 直射日光・摩擦・埃からボトルを守ります</li><li><strong>付属品の収納</strong> — 冊子・カートンをまとめて保管できます</li><li><strong>贈答品としての価値</strong> — 箱なしは贈答品としての再販が難しくなります

これらの理由から、外箱を保管していたかどうかで、ボトル本体の状態以上に査定額が変わる場合があります。</li></ol>` }} />

          <h2 id="section-3">4. 箱を失った場合の対応策</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>外箱がない場合の4つの対応</strong></p><ol><li><strong>クローゼット・倉庫・収納を確認する</strong> — 保管場所から見つかる場合があります</li><li><strong>メーカーに問い合わせる</strong> — まれに空箱の販売・配布がある銘柄もあります</li><li><strong>オークション・フリマで空箱を購入する</strong> — コレクターが空箱を出品している場合があります</li><li><strong>箱なしで売却する</strong> — 状態が良ければ、十分な査定額となる場合があります

売却の前に、保管場所をご確認ください。</li></ol>` }} />

          <h2 id="section-4">5. 箱なしでも高く売る7つのコツ</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>ボトル本体・ラベル・キャップを良好な状態で保管する</strong></li><li><strong>冊子・ホログラム・購入レシート等の付属品があれば添付する</strong></li><li><strong>複数の業者で見積もりを取る</strong> — 箱なしの評価額は業者により異なります</li><li><strong>写真を撮影する</strong> — 査定前にボトルの状態を記録します</li><li><strong>保管環境を整える</strong> — ラベル・キャップの状態を保ちます</li><li><strong>状態を正確に申告する</strong> — 事実と異なる申告はトラブルの原因になります</li><li><strong>早めに売却する</strong> — 時間の経過とともにラベルが劣化するリスクが高まります</li></ol>` }} />

          <h2 id="section-5">6. 箱なしボトルの査定に対応している買取業者</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>当サイトで掲載している3社は、いずれも箱なしのボトルの査定に対応しています。</p><ol><li><strong>ヒカカク！</strong> — 一括査定で、箱なしに対応する業者を比較できます</li><li><strong>バイセル</strong> — 大手の業者で、箱なしでも査定を受けられます</li><li><strong>リカスタ</strong> — 宅配買取で、箱なしにも対応しています

査定額は業者により異なるため、3社以上で見積もりを取ることをおすすめします。</li></ol>` }} />

          <h2 id="section-6">7. 代用品の箱を使うことについて</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>代用品の外箱（汎用の箱や別銘柄の箱）は使用しないでください</strong>。

理由は以下のとおりです。</p><ol><li>査定時に正規の付属品ではないと判定されます</li><li>業者からの信頼を損ないます</li><li>査定額がかえって下がる可能性があります</li><li>場合によっては詐欺と見なされます

正規の外箱が見つからない場合は、箱なしであることを申告したうえで売却してください。</li></ol>` }} />

          <h2 id="section-7">8. 箱を新規購入できるか</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>一部のコレクター・買取業者は、空き箱を単体で販売することがあります。<strong>主な入手経路</strong></p><ol><li><strong>メルカリ・ヤフオク</strong> — 「宮城峡12年 箱」で検索します</li><li><strong>海外オークション</strong> — Whisky Auctioneerなどにまれに出品されます</li><li><strong>コレクターのSNS</strong> — X（旧Twitter）・Instagramで交換相手を探します</li><li><strong>ウイスキー専門店</strong> — 店舗に在庫がある場合があります

空き箱の価格は数千円〜数万円程度です。査定額の上昇幅と比較して、購入するかどうかをご判断ください。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">宮城峡12年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>宮城峡12年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '宮城峡12年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じ宮城峡12年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '宮城峡12年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '宮城峡12年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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
            <Link href="/articles/miyagikyo-12-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">宮城峡12年の高価売却のポイント</p></Link>
            <Link href="/articles/miyagikyo-12-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">宮城峡12年の偽物の見分け方</p></Link>
            <Link href="/articles/miyagikyo-12-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">宮城峡12年の買取業者ランキング</p></Link>
            <Link href="/articles/miyagikyo-12-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">宮城峡12年の歴史と特徴</p></Link>
            <Link href="/articles/miyagikyo-12-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">宮城峡12年の希少性・投資価値</p></Link>
            <Link href="/articles/miyagikyo-12-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">宮城峡12年のオークション推移</p></Link>
            <Link href="/articles/miyagikyo-12-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">宮城峡12年の開封済みボトルの買取</p></Link>
            <Link href="/articles/miyagikyo-12-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">宮城峡12年のラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/miyagikyo-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">宮城峡12年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-12）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
