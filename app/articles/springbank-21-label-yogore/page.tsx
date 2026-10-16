import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/springbank-21.json";

export const metadata: Metadata = {
  title: 'スプリングバンク21年はラベル汚れ・破れでも売れる?【2026年10月最新】状態別の買取査定額',
  description: 'スプリングバンク21年のラベルに汚れ・破れ・剥がれ・水濡れ跡がある場合の買取査定額を解説しています。状態別の価格の目安、ラベルを保護する保管方法、業者の選び方を掲載しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'スプリングバンク21年を売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じスプリングバンク21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'スプリングバンク21年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'スプリングバンク21年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function Springbank21LabelYogorePage() {
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
            <li><Link href="/articles/springbank-21-kaitori/" className="hover:text-amber-dark transition-colors">スプリングバンク21年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">ラベル汚れがある場合の査定</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/springbank-21.png" alt='スプリングバンク21年のラベル汚れ・破れがあっても売れる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">スプリングバンク21年のラベル汚れ・破れがあっても売れる？</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-12 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">スプリングバンク21年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / キャンベルタウン / 21年熟成 / 希少度 ハイ / 市場相場 103,613円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/springbank-21-kaitori/" className="text-amber-dark underline">スプリングバンク21年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. スプリングバンク21年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. ラベル状態の判定基準</a></li>
              <li><a href="#section-2" className="hover:underline">3. ラベル状態別の査定額目安（スプリングバンク21年）</a></li>
              <li><a href="#section-3" className="hover:underline">4. ラベル損傷が起きやすい原因</a></li>
              <li><a href="#section-4" className="hover:underline">5. ラベルを保護する7つの保管方法</a></li>
              <li><a href="#section-5" className="hover:underline">6. ラベル汚れがある場合の売却方法</a></li>
              <li><a href="#section-6" className="hover:underline">7. 避けるべきラベルの「修復」</a></li>
              <li><a href="#section-7" className="hover:underline">8. ラベルに損傷がある場合の業者の選び方</a></li>
            </ol>
          </div>

          <p>長期保管したスプリングバンク21年のラベルに汚れ・破れ・水濡れ跡がある場合でも、買取の対象となります。本記事では、ラベルの状態が査定額に与える影響、状態別の価格の目安と対処法を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではスプリングバンク21年の落札が約60件確認でき、落札額の中央値は103,613円でした。一定の流通があり、比較的換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
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

          <h2 id="section-0">1. スプリングバンク21年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>スプリングバンク21年</strong>はスコッチウイスキー（キャンベルタウン）の21年熟成、度数46%、希少度は希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>103,613円</strong>（流通サンプル60件、当サイトの集計）。価格帯としては<strong>高額帯</strong>にあたり、業者間の査定差が金額として大きく表れるため、相見積もりの効果が高い価格帯です。</p><p>流通量は<strong>標準的</strong>の水準です。一定の流通量があり相場が形成されやすいため、複数の業者を比較することで適正な金額を判断しやすい銘柄です。</p><p>スコッチは蒸溜所・地域（キャンベルタウン）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気により査定額に差が出るため、銘柄ごとの相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. ラベル状態の判定基準</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ラベルは、コレクター品の評価において重要な要素です。買取査定では、以下の状態を確認します。</p><ol><li><strong>新品同様</strong> — 印刷が鮮明で、しわ・汚れ・破れがない</li><li><strong>軽度の汚れ</strong> — 表面の埃・指紋・若干の変色</li><li><strong>シミ・水濡れ跡</strong> — 液体接触の痕跡</li><li><strong>破れ・欠け・剥がれ</strong> — 物理的損傷</li><li><strong>強い退色</strong> — 直射日光や蛍光灯による色あせ</li><li><strong>カビ・カビ跡</strong> — 湿度過多による劣化</li><li><strong>粘着テープ跡</strong> — 不適切な貼付・剥離跡</li></ol>` }} />

          <h2 id="section-2">3. ラベル状態別の査定額目安（スプリングバンク21年）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>スプリングバンク21年の実勢中央値<strong>103,613円</strong>（新品同様=100%）に対し、ラベルの状態により次のように変動します。</p><ol><li><strong>新品同様</strong>: 103,613円（100%）</li><li><strong>軽度の汚れ</strong>: 約93,250円（90%程度）</li><li><strong>シミ・水濡れ跡</strong>: 約82,890円（80%程度）</li><li><strong>破れ・欠け</strong>: 約67,350円（65%程度）</li><li><strong>強い退色・大きな損傷</strong>: 約51,810円（50%程度）</li><li><strong>ラベル剥がれ（残あり）</strong>: 約41,450円（40%程度）</li><li><strong>ラベル完全消失</strong>: 約20,720円（20%程度。ヴィンテージとしての価値がある場合は例外）</li></ol>` }} />

          <h2 id="section-3">4. ラベル損傷が起きやすい原因</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>主な原因</strong></p><ol><li><strong>直射日光・蛍光灯</strong> — 退色・脆化</li><li><strong>湿度の高い場所</strong> — シミ・カビ</li><li><strong>段ボール直置き</strong> — シミ・吸湿</li><li><strong>粘着テープの貼り付け</strong> — 剥がし跡</li><li><strong>タンスや棚の埃</strong> — 表面汚れ</li><li><strong>指で頻繁に触る</strong> — 油脂による変色</li><li><strong>温度変化</strong> — ラベルの剥がれ</li><li><strong>化学物質の接触</strong> — 洗剤・芳香剤の蒸気</li></ol>` }} />

          <h2 id="section-4">5. ラベルを保護する7つの保管方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>直射日光を避ける</strong> — カーテン・遮光カバーを活用します</li><li><strong>室温15〜20℃、湿度50〜70%</strong> — 急激な温湿度変化を避ける</li><li><strong>外箱に入れて保管</strong> — 多くの劣化を防ぐ</li><li><strong>専用のディスプレイケース</strong> — コレクター品ならガラスケース</li><li><strong>直接触れない</strong> — 必要なら手袋着用</li><li><strong>化学物質を遠ざける</strong> — キッチン・浴室・芳香剤の付近は避けてください</li><li><strong>定期的に点検する</strong> — 3か月に1度、状態を確認します</li></ol>` }} />

          <h2 id="section-5">6. ラベル汚れがある場合の売却方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ラベルに汚れがある場合も、複数の業者で見積もりを取ることをおすすめします。<strong>ラベル汚れの評価基準は業者により異なります</strong>。

推奨する方法は以下のとおりです。</p><ol><li><strong>リカスタ</strong> 等の専門店は、ラベル以外の状態も含めて総合的に判断する傾向があります</li><li><strong>ヒカカク！</strong> の一括査定で、複数社の評価を比較できます</li><li><strong>状態を正確に申告する</strong> ことで、査定後のトラブルを避けられます</li><li><strong>写真を添付して</strong>、事前に業者に状態を確認してもらいます</li></ol>` }} />

          <h2 id="section-6">7. 避けるべきラベルの「修復」</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>避けるべき行為</strong></p><ol><li>水・洗剤での清掃 — ラベルの素材を傷める可能性が高くなります</li><li>ラベルの「補修」 — 査定額がさらに下がります</li><li>剥がれかけたラベルを糊で貼り直す — 状態が悪化します</li><li>アイロンや熱でしわを伸ばす — ラベルが変色します</li><li>漂白剤での「シミ抜き」 — ラベルが大きく損傷します

気になる場合は、<strong>乾いた柔らかい布で軽く埃を払う程度</strong>にとどめてください。それ以上の修復は、価値を下げる原因となります。</li></ol>` }} />

          <h2 id="section-7">8. ラベルに損傷がある場合の業者の選び方</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>ヒカカク！</strong>（一括査定で、対応できる業者を比較できます）</li><li><strong>リカスタ</strong>（宅配買取で幅広く対応しています）</li><li><strong>バイセル</strong>（大手の業者です）

いずれの業者も査定料・キャンセル料は無料のため、3社以上で見積もりを比較することをおすすめします。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">スプリングバンク21年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>スプリングバンク21年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'スプリングバンク21年を売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じスプリングバンク21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'スプリングバンク21年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'スプリングバンク21年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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
            <Link href="/articles/springbank-21-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">スプリングバンク21年の高価売却のポイント</p></Link>
            <Link href="/articles/springbank-21-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">スプリングバンク21年の偽物の見分け方</p></Link>
            <Link href="/articles/springbank-21-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">スプリングバンク21年の買取業者ランキング</p></Link>
            <Link href="/articles/springbank-21-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">スプリングバンク21年の歴史と特徴</p></Link>
            <Link href="/articles/springbank-21-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">スプリングバンク21年の希少性・投資価値</p></Link>
            <Link href="/articles/springbank-21-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">スプリングバンク21年のオークション推移</p></Link>
            <Link href="/articles/springbank-21-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">スプリングバンク21年の開封済みボトルの買取</p></Link>
            <Link href="/articles/springbank-21-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">スプリングバンク21年の箱なしボトルの買取</p></Link>
            <Link href="/articles/springbank-21-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">スプリングバンク21年の買取相場ガイド</p></Link>
            <Link href="/articles/springbank-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋の確認</span><p className="text-sm font-bold mt-1">スプリングバンク（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-12）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
