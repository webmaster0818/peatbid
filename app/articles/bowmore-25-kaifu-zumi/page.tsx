import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/bowmore-25.json";

export const metadata: Metadata = {
  title: 'ボウモア25年は開封済みでも売れる?【2026年7月最新】残量別の買取査定額と売却法',
  description: 'ボウモア25年を開封済みで売る場合の査定額と注意点。残量別の価格目安、状態保持のコツ、開封済み歓迎の買取業者、売却前の準備まで完全解説。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'ボウモア25年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じボウモア25年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'ボウモア25年の売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'ボウモア25年を売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function Bowmore25KaifuZumiPage() {
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
            <li><Link href="/articles/bowmore-25-kaitori/" className="hover:text-amber-dark transition-colors">ボウモア25年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">開封済みでも売れる</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/bowmore-25.png" alt='ボウモア25年が開封済みでも売れる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ボウモア25年が開封済みでも売れる？</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-29 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">ボウモア25年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / アイラ / 25年熟成 / 希少度 ハイ / 市場相場 61,000円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/bowmore-25-kaitori/" className="text-amber-dark underline">ボウモア25年の買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. ボウモア25年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 開封済みボウモア25年の査定額の目安</a></li>
              <li><a href="#section-2" className="hover:underline">3. 開封済みの査定で重視される5要素</a></li>
              <li><a href="#section-3" className="hover:underline">4. 開封済みでも価値が高くなる条件</a></li>
              <li><a href="#section-4" className="hover:underline">5. 売却までの保管のコツ</a></li>
              <li><a href="#section-5" className="hover:underline">6. 開封済みを買取してくれる業者</a></li>
              <li><a href="#section-6" className="hover:underline">7. 開封済みを高く売る5つのコツ</a></li>
              <li><a href="#section-7" className="hover:underline">8. 売れない場合の対処法</a></li>
            </ol>
          </div>

          <p>「ボウモア25年を開けてしまった……もう売れない？」と諦めている方、ご安心ください。開封済みでも、状態と残量次第で買取は可能です。本記事では、開封済みのボウモア25年を最大限の価格で売る方法を完全解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではボウモア25年の落札が約80件確認でき、落札額の中央値は61,000円でした。一定の流通があり比較的換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
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

          <h2 id="section-0">1. ボウモア25年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>ボウモア25年</strong>はスコッチウイスキー（アイラ）の25年熟成、度数43%、希少度は希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>61,000円</strong>（流通サンプル80件、当サイト独自集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定が上下しやすく、コンディション管理が効きます。</p><p>流通量は<strong>標準的</strong>の水準です。一定の流通量があり相場が形成されやすいため、複数業者の比較で適正額を見極めやすい銘柄です。</p><p>スコッチは蒸溜所・地域（アイラ）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気度で査定差が出るため、銘柄固有の相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 開封済みボウモア25年の査定額の目安</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>未開封・箱付きの実勢中央値<strong>61,000円</strong>を基準として、開封済みは残量・状態により以下のレンジで査定されます:</p><ol><li><strong>9割以上残</strong>: 約18,300〜24,400円（30〜40%）</li><li><strong>7割以上残</strong>: 約15,250〜21,350円（25〜35%）</li><li><strong>5割以上残</strong>: 約12,200〜18,300円（20〜30%）</li><li><strong>3割以上残</strong>: 約6,100〜12,200円（10〜20%）</li><li><strong>1割以下残</strong>: 買取不可の場合あり、もしくは空ボトルとして数千円

開封済みは未開封と比べ大きく下がるため、コレクション品は開けないのが鉄則です。</li></ol>` }} />

          <h2 id="section-2">3. 開封済みの査定で重視される5要素</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>開封済みボトルの査定では、以下の5要素が総合的に評価されます:</p><ol><li><strong>残量</strong> — 多いほど評価額アップ。9割以上が査定の分かれ目</li><li><strong>保管状態</strong> — コルク劣化・香味揮発の度合い</li><li><strong>付属品</strong> — 外箱・冊子・カートンの有無</li><li><strong>ラベル状態</strong> — 美しさは未開封同様に評価される</li><li><strong>キャップ・栓の状態</strong> — しっかり閉まっているか、隙間からの揮発は無いか

各業者は独自の基準で評価しますが、上記5要素は共通の判断材料です。</li></ol>` }} />

          <h2 id="section-3">4. 開封済みでも価値が高くなる条件</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>以下のようなボウモア25年は、開封済みでも高めの査定が期待できます:</p><ol><li><strong>終売・希少銘柄</strong>（流通量が極小）</li><li><strong>古いボトリング</strong>（ヴィンテージ価値）</li><li><strong>外箱・冊子が完全保存</strong></li><li><strong>残量が9割以上で蓋がしっかり閉まっている</strong></li><li><strong>特殊な限定品・記念ボトル</strong></li><li><strong>海外コレクター需要が高い銘柄</strong></li><li><strong>正規流通店での購入証明あり</strong></li></ol>` }} />

          <h2 id="section-4">5. 売却までの保管のコツ</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>開封後のボウモア25年は、なるべく早く売却するか、適切に保管しましょう:</p><ol><li><strong>立てて保管</strong>（横置きはコルク劣化）</li><li><strong>直射日光なし、室温20℃以下</strong></li><li><strong>可能なら未開封同等の場所で</strong></li><li><strong>売却まで開けない、注ぎ足しはしない</strong></li><li><strong>キャップをしっかり閉める</strong></li><li><strong>湿度50〜70%を維持</strong></li><li><strong>振動・衝撃を避ける</strong>

適切な保管により、開封後数年間は香味・品質を保持できます。</li></ol>` }} />

          <h2 id="section-5">6. 開封済みを買取してくれる業者</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid推奨の4社（ヒカカク・バイセル・JOYLAB・リカスタ）は、いずれも開封済みでも査定対応可能です。

<strong>各社の開封済み買取の特徴</strong>:</p><ol><li><strong>ヒカカク！</strong> — 一括査定で開封済みも受付業者を絞り込み可能</li><li><strong>バイセル</strong> — 残量9割以上を主に扱う、それ以下は要相談</li><li><strong>JOYLAB</strong> — お酒専門で開封済みも積極買取、状態評価が公平</li><li><strong>リカスタ</strong> — 宅配で開封済みも対応、ただし運送中の漏れに注意

業者によっては残量条件があるため、事前確認をおすすめします。</li></ol>` }} />

          <h2 id="section-6">7. 開封済みを高く売る5つのコツ</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>早めの売却</strong> — 時間経過で香味揮発・酸化が進み価値減</li><li><strong>外箱・冊子を必ず添付</strong> — 付属品の有無は査定に影響</li><li><strong>複数業者比較</strong> — 開封済みでも数千〜数万円の差</li><li><strong>保管状態の写真記録</strong> — 適切に保管していたことを証明</li><li><strong>正直な状態申告</strong> — 残量・状態を正確に伝える</li></ol>` }} />

          <h2 id="section-7">8. 売れない場合の対処法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>万一ボウモア25年が買取拒否された場合の選択肢:</p><ol><li><strong>別業者で再査定</strong> — 業者により判断基準が異なる</li><li><strong>個人売買（メルカリ・ヤフオク）</strong> — 業者買取より高値が出る可能性</li><li><strong>オークション出品</strong> — 希少銘柄なら入札競争で高値</li><li><strong>コレクター仲間との直接取引</strong> — ウイスキー愛好家のコミュニティで交渉</li><li><strong>空ボトル買取</strong> — ボトル本体・ラベル・箱に価値があれば数千円で買取可能

諦める前に、複数のチャネルを試してみることをおすすめします。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">ボウモア25年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>ボウモア25年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'ボウモア25年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じボウモア25年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'ボウモア25年の売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'ボウモア25年を売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/bowmore-25-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">ボウモア25年の高く売る方法</p></Link>
            <Link href="/articles/bowmore-25-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">ボウモア25年の偽物の見分け方</p></Link>
            <Link href="/articles/bowmore-25-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">ボウモア25年の買取業者ランキング</p></Link>
            <Link href="/articles/bowmore-25-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">ボウモア25年の歴史と特徴</p></Link>
            <Link href="/articles/bowmore-25-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">ボウモア25年の希少性・投資価値</p></Link>
            <Link href="/articles/bowmore-25-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">ボウモア25年のオークション推移</p></Link>
            <Link href="/articles/bowmore-25-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">ボウモア25年の箱なしでも買取</p></Link>
            <Link href="/articles/bowmore-25-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">ボウモア25年のラベル汚れでも査定</p></Link>
            <Link href="/articles/bowmore-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">ボウモア25年の買取相場ガイド（完全版）</p></Link>
            <Link href="/articles/bowmore-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋ハブ</span><p className="text-sm font-bold mt-1">ボウモア（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-29）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
