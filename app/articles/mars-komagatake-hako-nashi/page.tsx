import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/mars-komagatake.json";

export const metadata: Metadata = {
  title: 'マルス駒ヶ岳は箱なしでも買取できる?【2026年7月最新】査定額への影響と対策',
  description: 'マルス駒ヶ岳を箱なしで売る場合の査定額への影響と買取依頼時の注意点。査定額の目安、代替戦略、賢い売却法、箱を探す方法まで完全解説。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'マルス駒ヶ岳を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じマルス駒ヶ岳でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳の売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳を売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function MarsKomagatakeHakoNashiPage() {
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
            <li><Link href="/articles/mars-komagatake-kaitori/" className="hover:text-amber-dark transition-colors">マルス駒ヶ岳</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">箱なしでも買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/mars-komagatake.png" alt='マルス駒ヶ岳が箱なしでも買取できる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">マルス駒ヶ岳が箱なしでも買取できる？</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-07-13 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">マルス駒ヶ岳</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / 信州マルス蒸溜所 / ノンエイジ / 希少度 コモン / 市場相場 7,975円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/mars-komagatake-kaitori/" className="text-amber-dark underline">マルス駒ヶ岳の買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. マルス駒ヶ岳の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 箱なしによる査定額の影響</a></li>
              <li><a href="#section-2" className="hover:underline">3. なぜ外箱が重要なのか</a></li>
              <li><a href="#section-3" className="hover:underline">4. 箱を失った場合の対応策</a></li>
              <li><a href="#section-4" className="hover:underline">5. 箱なしでも高く売る7つのコツ</a></li>
              <li><a href="#section-5" className="hover:underline">6. 箱なしでも歓迎の買取業者</a></li>
              <li><a href="#section-6" className="hover:underline">7. 代用品の箱を使うことについて</a></li>
              <li><a href="#section-7" className="hover:underline">8. 箱を新規購入できるか</a></li>
            </ol>
          </div>

          <p>「外箱を捨ててしまった」「最初から箱なしで購入した」——そんな状況でも、マルス駒ヶ岳の買取は可能です。ただし、付属品の有無で査定額は大きく変動します。本記事では、箱なしの場合の影響と賢い売却法を完全解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではマルス駒ヶ岳の落札が約262件確認でき、落札額の中央値は7,975円でした。取引が活発で換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-5 not-prose">
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-perfect.png" alt="未開封・箱付き完璧" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>完璧</p>
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

          <h2 id="section-0">1. マルス駒ヶ岳の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>マルス駒ヶ岳</strong>はジャパニーズウイスキー（信州マルス蒸溜所）のノンエイジ（NV）、度数43%、希少度は標準的な流通量に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>7,975円</strong>（流通サンプル262件、当サイト独自集計）。価格帯としては<strong>実用帯</strong>にあたり、回転が速く、状態が良ければスムーズに売却しやすい価格帯です。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているぶん、付属品・状態の差が査定額に直結します。</p><p>ジャパニーズウイスキーは世界的評価の高まりで需要が強く、特に終売・長期熟成銘柄は中長期で価格が伸びやすい傾向です。一方で短期は為替やオークション結果で振れるため、売り時の見極めが重要になります。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 箱なしによる査定額の影響</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>マルス駒ヶ岳の場合、実勢中央値<strong>7,975円</strong>を基準（付属品フル揃い=100%）として、付属品の有無で査定額は次のように変動します:</p><ol><li><strong>箱・冊子・カートン揃い</strong>: 7,975円（100%）</li><li><strong>箱あり・冊子なし</strong>: 約6,780〜7,580円（85〜95%）</li><li><strong>箱なし・冊子あり</strong>: 約6,780〜7,340円（85〜92%）</li><li><strong>箱なし・ラベル良好</strong>: 約6,380〜7,180円（80〜90%）</li><li><strong>箱・冊子なし</strong>: 約5,980〜6,780円（75〜85%）

つまり付属品の有無だけで、最大で<strong>約1,990円（相場の約25%）の差</strong>が生じ得ます。</li></ol>` }} />

          <h2 id="section-2">3. なぜ外箱が重要なのか</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>外箱は単なる包装ではなく、<strong>コレクター品の完全性</strong>を示す重要な要素です:</p><ol><li><strong>二次流通市場での評価</strong> — 海外コレクターは特にフルセット重視</li><li><strong>真贋判定の手がかり</strong> — 箱と本体の合致が本物の証</li><li><strong>保管時の保護機能</strong> — 直射日光・摩擦・埃から守る</li><li><strong>付属品の収納</strong> — 冊子・カートンの一括管理</li><li><strong>贈答品としての価値</strong> — 箱なしは贈り物として再販困難

これらの理由から、外箱を保管していたかどうかで、ボトル本体の状態以上に査定額が変わる場合があります。</li></ol>` }} />

          <h2 id="section-3">4. 箱を失った場合の対応策</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>外箱を取り戻す4つの方法</strong>:</p><ol><li><strong>クローゼット・倉庫・収納庫を徹底的に探す</strong> — 意外な場所から出てくることが多々あります</li><li><strong>メーカーに問い合わせ</strong> — ごく稀に空箱の販売・配布がある銘柄も</li><li><strong>オークション・フリマで空箱単体購入</strong> — コレクターが空箱を売っているケースあり</li><li><strong>諦めて箱なしで売却</strong> — 状態が良ければ十分な査定額が出ます

特に1番目（家中を探す）は意外と見つかることが多いので、売却前に徹底チェックしてください。</li></ol>` }} />

          <h2 id="section-4">5. 箱なしでも高く売る7つのコツ</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>ボトル本体・ラベル・キャップを完璧な状態で保管</strong></li><li><strong>冊子・ホログラム・購入レシート等、他の付属品があれば必ず添付</strong></li><li><strong>複数業者で見積もり</strong> — 業者により箱なしの評価額に差がある</li><li><strong>写真撮影</strong> — 査定前にボトルの状態を記録</li><li><strong>保管環境の整備</strong> — ラベル・キャップの状態を維持</li><li><strong>正直な状態申告</strong> — 嘘の申告は信頼を失い結果的に損</li><li><strong>早めの売却</strong> — 時間経過でラベル劣化リスクが増加</li></ol>` }} />

          <h2 id="section-5">6. 箱なしでも歓迎の買取業者</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid推奨の4社はすべて箱なしでも査定対応可能。<strong>特に推奨される業者</strong>:</p><ol><li><strong>ヒカカク！</strong> — 一括査定で箱なし対応業者を比較</li><li><strong>JOYLAB</strong> — お酒専門で柔軟な評価、希少銘柄に強い</li><li><strong>バイセル</strong> — 大手の安心感、箱なしでも査定可</li><li><strong>リカスタ</strong> — 宅配買取で箱なしも対応

各業者で査定額が異なるため、3社以上で見積もりを取ることが必須です。</li></ol>` }} />

          <h2 id="section-6">7. 代用品の箱を使うことについて</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>代用品の外箱（汎用箱や別銘柄の箱）は使うべきではありません</strong>。

理由:</p><ol><li>査定時に「正規品ではない」と判定される</li><li>業者の信頼を失う</li><li>査定額がむしろ下がる可能性</li><li>場合によっては詐欺と見なされる

本物の外箱が見つからない場合は、箱なしで正直に売却するのが正解です。</li></ol>` }} />

          <h2 id="section-7">8. 箱を新規購入できるか</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>一部のコレクター・買取業者は、空き箱を単体で販売することがあります。<strong>入手経路</strong>:</p><ol><li><strong>メルカリ・ヤフオク</strong> — 「マルス駒ヶ岳 箱」で検索</li><li><strong>海外オークション</strong> — Whisky Auctioneerなどで稀に出品</li><li><strong>コレクターSNS</strong> — Twitter・Instagramで交換相手を探す</li><li><strong>ウイスキー専門店</strong> — 店舗に在庫がある場合あり

空き箱の価格は数千円〜数万円程度。査定額アップ幅と比較して、投資価値があるか判断してください。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">マルス駒ヶ岳の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>マルス駒ヶ岳に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'マルス駒ヶ岳を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じマルス駒ヶ岳でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'マルス駒ヶ岳の売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'マルス駒ヶ岳を売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/mars-komagatake-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳の高く売る方法</p></Link>
            <Link href="/articles/mars-komagatake-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳の偽物の見分け方</p></Link>
            <Link href="/articles/mars-komagatake-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳の買取業者ランキング</p></Link>
            <Link href="/articles/mars-komagatake-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳の歴史と特徴</p></Link>
            <Link href="/articles/mars-komagatake-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳の希少性・投資価値</p></Link>
            <Link href="/articles/mars-komagatake-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳のオークション推移</p></Link>
            <Link href="/articles/mars-komagatake-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳の開封済みでも売れる</p></Link>
            <Link href="/articles/mars-komagatake-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳のラベル汚れでも査定</p></Link>
            <Link href="/articles/mars-komagatake-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">マルス駒ヶ岳の買取相場ガイド（完全版）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-07-13）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
