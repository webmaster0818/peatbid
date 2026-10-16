import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/balvenie-portwood-21.json";

export const metadata: Metadata = {
  title: 'バルヴェニー ポートウッド 21年の偽物・贋作の見分け方【2026年10月最新】本物との違い5点（ラベル・キャップ・液面）と売却前チェック',
  description: 'バルヴェニー ポートウッド 21年の偽物・贋作を見分けるポイントを解説しています。ラベル・キャップ・液色・ホログラム・購入経路の5つの確認方法と、被害に遭った場合の対処法を掲載しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'バルヴェニー ポートウッド 21年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じバルヴェニー ポートウッド 21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'バルヴェニー ポートウッド 21年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'バルヴェニー ポートウッド 21年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function BalveniePortwood21NisemonoMikataPage() {
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
            <li><Link href="/articles/balvenie-portwood-21-kaitori/" className="hover:text-amber-dark transition-colors">バルヴェニー ポートウッド 21年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">偽物・贋作の見分け方</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/balvenie-portwood-21.png" alt='バルヴェニー ポートウッド 21年の偽物・贋作の見分け方' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">バルヴェニー ポートウッド 21年の偽物・贋作の見分け方</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-12 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">バルヴェニー ポートウッド 21年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / スペイサイド / 21年熟成 / 希少度 ミッド / 市場相場 市場相場データ集計中</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/balvenie-portwood-21-kaitori/" className="text-amber-dark underline">バルヴェニー ポートウッド 21年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. バルヴェニー ポートウッド 21年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 贋作市場の実情</a></li>
              <li><a href="#section-2" className="hover:underline">3. チェック1: ラベルの印刷品質</a></li>
              <li><a href="#section-3" className="hover:underline">4. チェック2: キャップ・封蝋・ホログラム</a></li>
              <li><a href="#section-4" className="hover:underline">5. チェック3: 液色と液面の状態</a></li>
              <li><a href="#section-5" className="hover:underline">6. チェック4: 瓶の形状・刻印</a></li>
              <li><a href="#section-6" className="hover:underline">7. チェック5: 購入経路の信頼性</a></li>
              <li><a href="#section-7" className="hover:underline">8. 不審なボトルを見つけた場合の対処法</a></li>
            </ol>
          </div>

          <p>バルヴェニー ポートウッド 21年のような高額のウイスキーには、贋作のリスクがあります。海外を中心に、精巧な贋作が流通する例も報告されています。本記事では、バルヴェニー ポートウッド 21年の偽物を見分ける5つのチェックポイントと、不審なボトルへの対処法を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">バルヴェニー ポートウッド 21年は二次流通の落札データが十分ではないため、本記事の金額は同じ価格帯の銘柄を参考にした一般的な目安です。最新の実勢は各買取業者の査定でご確認ください。</p>
          </div>


          <h2 id="section-0">1. バルヴェニー ポートウッド 21年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>バルヴェニー ポートウッド 21年</strong>はスコッチウイスキー（スペイサイド）の21年熟成、度数40%、希少度は中程度の希少度に分類される銘柄です。</p><p>本銘柄は二次流通の落札サンプルが少ないため、実勢中央値は掲載していません。相場が定まりにくいため、複数の業者の査定で実際の金額をご確認ください。</p><p>スコッチは蒸溜所・地域（スペイサイド）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気により査定額に差が出るため、銘柄ごとの相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 贋作市場の実情</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ジャパニーズウイスキーブーム以降、海外の二次流通市場では<strong>贋作ボトルの流通が確認</strong>されています。特に山崎・響・白州・軽井沢・羽生など希少銘柄では、精巧に作られた贋作が個人間取引で流通する例があります。</p><p>中国・東南アジアの一部地域では、本物の空き瓶に別の液体を詰めて販売する手口も報告されています。高額帯の銘柄では、5つのチェックを確実に行うことが必要です。</p>` }} />

          <h2 id="section-2">3. チェック1: ラベルの印刷品質</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>正規品はラベルの文字が<strong>鮮明で均一</strong>です。書体・字間・色合いがメーカー公式のものと一致します。一方、贋作には以下の特徴が見られます。</p><ol><li>文字のにじみ・かすれ</li><li>書体の違い（似ているが異なる字形）</li><li>色ずれ・色むら</li><li>ラベルの紙質や光沢の違い</li><li>印刷位置の微妙なずれ

10倍ルーペでラベル全体を確認し、メーカー公式画像と細部まで比較してください。</li></ol>` }} />

          <h2 id="section-3">4. チェック2: キャップ・封蝋・ホログラム</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>サントリー山崎・響、白州、マッカランなどは<strong>ホログラムシール</strong>が貼付されています。正規品のホログラムは光の角度で色が変化し、立体感のある印刷が施されています。

贋作の特徴は以下のとおりです。</p><ol><li>ホログラムの粗さ</li><li>光の反射が均一（本物は不均一）</li><li>印刷が平面的（立体感に欠ける）</li><li>シールの貼り方が不正確

キャップの締まり具合・封蝋の状態も確認してください。正規品は精密に封蝋されているのに対し、贋作は封蝋に隙間や不自然な点がある場合が多く見られます。</li></ol>` }} />

          <h2 id="section-4">5. チェック3: 液色と液面の状態</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>本物のバルヴェニー ポートウッド 21年は<strong>均一な琥珀色</strong>で透明感があります。贋作の特徴は以下のとおりです。</p><ol><li>色むら・濁り</li><li>沈殿物の存在</li><li>不自然に濃い/薄い色</li><li>気泡が永久に残る</li><li>振った時の液体の動きが不自然（粘度が異なる）

また、液面の高さも重要な確認項目です。正規品のバルヴェニー ポートウッド 21年は通常、肩口（首の付け根）の少し下まで液体があります。極端に液面が下がっている場合は、長期保管による「目減り」か、贋作の可能性があります。</li></ol>` }} />

          <h2 id="section-5">6. チェック4: 瓶の形状・刻印</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>正規品のボトルには<strong>底面に刻印</strong>（ロット番号、製造所コード等）があります。贋作の場合、この刻印に以下の特徴が見られます。</p><ol><li>存在しない</li><li>印字パターンが異なる</li><li>不自然な深さ</li><li>ロット番号がメーカーの規則に合わない

また、瓶の重量・厚みも正規品と微妙に違うことがあります。同じ銘柄を複数本所有している場合は、重さを比較してみてください。</li></ol>` }} />

          <h2 id="section-6">7. チェック5: 購入経路の信頼性</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>信頼性の高い購入経路</strong></p><ol><li>海外オークション（Sotheby's、Bonhams、Whisky Auctioneer）</li><li>正規流通店・百貨店リカーショップ</li><li>国内大手買取業者の販売部門</li><li>信頼できる個人コレクターの直接取引

<strong>リスクが高い購入経路</strong></li><li>個人間取引（メルカリ、ヤフオク）の無名出品者</li><li>海外（特に中華圏）の無名通販店</li><li>SNS・LINEでの個人取引</li><li>相場より極端に安い出品

相場より20%以上安いバルヴェニー ポートウッド 21年には注意が必要です。「他では入手できない」と購入を急がせる業者・個人も、贋作販売によく見られる例です。</li></ol>` }} />

          <h2 id="section-7">8. 不審なボトルを見つけた場合の対処法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>自身が保有するバルヴェニー ポートウッド 21年が不審に見える場合、または購入を検討中のボトルに不審な点がある場合は、以下の手順で対処してください。</p><ol><li><strong>写真記録</strong> — ボトル全体・ラベル各角度・キャップ・底面の刻印を高解像度で撮影</li><li><strong>専門業者で鑑定査定</strong> — お酒買取の専門店で無料鑑定を依頼</li><li><strong>メーカーへの問い合わせ</strong> — サントリー・ニッカ等の公式お客様窓口にロット番号を伝えて真贋確認</li><li><strong>購入経路を遡る</strong> — 不正流通の可能性が高い場合は購入元に返品交渉</li><li><strong>警察への相談</strong> — 詐欺の可能性がある場合は最寄りの警察署で相談

贋作と判明した場合、買取業者は買取を拒否します。また、贋作と知りながら売却することは詐欺罪に該当する可能性があるため、誠実な対応が必要です。</li></ol>` }} />

          <div className="bg-burgundy/5 border-2 border-burgundy/30 rounded-xl p-6 my-8 not-prose">
            <p className="text-xs text-burgundy font-bold tracking-wider mb-2">真贋の確認後の手順</p>
            <h3 className="font-display text-xl font-semibold text-ink mb-3 !mt-0 !border-none">バルヴェニー ポートウッド 21年の現在の買取相場</h3>
            <p className="text-sm text-warm-gray leading-relaxed mb-4">バルヴェニー ポートウッド 21年は落札サンプルが少ないため、実勢中央値を掲載していません。最新の状況は相場ページでご確認ください。売却の際は、次の3つのステップをご確認ください。</p>
            <ol className="space-y-2 text-sm text-ink mb-4 list-none pl-0">
              <li><span className="font-bold text-burgundy">STEP 1</span>　相場の詳細を見る → <Link href="/articles/balvenie-portwood-21-kaitori/" className="shingan-to-kaitori text-amber-dark underline">バルヴェニー ポートウッド 21年の買取相場ガイド</Link></li>
              <li><span className="font-bold text-burgundy">STEP 2</span>　高く売るためのポイント → <Link href="/articles/balvenie-portwood-21-takaku-uru/" className="shingan-to-kaitori text-amber-dark underline">査定額を上げる7つのポイント</Link></li>
              <li><span className="font-bold text-burgundy">STEP 3</span>　複数の業者を比較して申し込む（下記の無料一括査定）</li>
            </ol>
            <p className="text-xs text-warm-gray">※相場は変動します。複数の業者の査定額を比較することをおすすめします。査定料・キャンセル料は無料です。</p>
          </div>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">バルヴェニー ポートウッド 21年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>バルヴェニー ポートウッド 21年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'バルヴェニー ポートウッド 21年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じバルヴェニー ポートウッド 21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'バルヴェニー ポートウッド 21年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'バルヴェニー ポートウッド 21年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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
            <Link href="/articles/balvenie-portwood-21-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年の高価売却のポイント</p></Link>
            <Link href="/articles/balvenie-portwood-21-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年の買取業者ランキング</p></Link>
            <Link href="/articles/balvenie-portwood-21-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年の歴史と特徴</p></Link>
            <Link href="/articles/balvenie-portwood-21-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年の希少性・投資価値</p></Link>
            <Link href="/articles/balvenie-portwood-21-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年のオークション推移</p></Link>
            <Link href="/articles/balvenie-portwood-21-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年の開封済みボトルの買取</p></Link>
            <Link href="/articles/balvenie-portwood-21-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年の箱なしボトルの買取</p></Link>
            <Link href="/articles/balvenie-portwood-21-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年のラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/balvenie-portwood-21-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">バルヴェニー ポートウッド 21年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-12）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
