import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/glenfiddich-30.json";

export const metadata: Metadata = {
  title: 'グレンフィディック30年はラベル汚れ・破れでも売れる?【2026年7月最新】状態別の買取査定額',
  description: 'グレンフィディック30年のラベル汚れ・破れ・剥がれ・水濡れ跡がある場合の買取査定額を詳細解説。状態別の価格目安、ラベル保護の保管方法、業者選定まで完全ガイド。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'グレンフィディック30年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じグレンフィディック30年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'グレンフィディック30年の売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'グレンフィディック30年を売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function Glenfiddich30LabelYogorePage() {
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
            <li><Link href="/articles/glenfiddich-30-kaitori/" className="hover:text-amber-dark transition-colors">グレンフィディック30年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">ラベル汚れでも査定</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/glenfiddich-30.png" alt='グレンフィディック30年のラベル汚れ・破れがあっても売れる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンフィディック30年のラベル汚れ・破れがあっても売れる？</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-29 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">グレンフィディック30年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / スペイサイド / 30年熟成 / 希少度 ハイ / 市場相場 68,005円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/glenfiddich-30-kaitori/" className="text-amber-dark underline">グレンフィディック30年の買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. グレンフィディック30年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. ラベル状態の判定基準</a></li>
              <li><a href="#section-2" className="hover:underline">3. ラベル状態別の査定額目安（グレンフィディック30年）</a></li>
              <li><a href="#section-3" className="hover:underline">4. ラベル損傷が起きやすい原因</a></li>
              <li><a href="#section-4" className="hover:underline">5. ラベルを保護する7つの保管方法</a></li>
              <li><a href="#section-5" className="hover:underline">6. ラベル汚れがある状態での売却戦略</a></li>
              <li><a href="#section-6" className="hover:underline">7. やってはいけないラベル「修復」</a></li>
              <li><a href="#section-7" className="hover:underline">8. ラベル損傷でも売れる業者ランキング</a></li>
            </ol>
          </div>

          <p>長期保管したグレンフィディック30年のラベルが汚れた、破れた、水濡れ跡がついた——そんな場合でも、買取は可能です。本記事では、ラベルの状態が査定額にどう影響するか、状態別の価格目安と対処法を完全解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではグレンフィディック30年の落札が約32件確認でき、落札額の中央値は68,005円でした。流通量がやや限定的で希少性が高めの銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
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

          <h2 id="section-0">1. グレンフィディック30年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>グレンフィディック30年</strong>はスコッチウイスキー（スペイサイド）の30年熟成、度数40%、希少度は希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>68,005円</strong>（流通サンプル32件、当サイト独自集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定が上下しやすく、コンディション管理が効きます。</p><p>流通量は<strong>少なめ</strong>の水準です。流通はやや限定的で、コンディション次第で査定が伸びやすい傾向です。</p><p>スコッチは蒸溜所・地域（スペイサイド）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気度で査定差が出るため、銘柄固有の相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. ラベル状態の判定基準</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ラベルは「コレクター品の顔」とも言える重要な要素です。買取査定では以下の状態を確認:</p><ol><li><strong>新品同様</strong> — 印刷鮮明、シワ・汚れ・破れなし</li><li><strong>軽度の汚れ</strong> — 表面の埃・指紋・若干の変色</li><li><strong>シミ・水濡れ跡</strong> — 液体接触の痕跡</li><li><strong>破れ・欠け・剥がれ</strong> — 物理的損傷</li><li><strong>強い退色</strong> — 直射日光や蛍光灯による色あせ</li><li><strong>カビ・カビ跡</strong> — 湿度過多による劣化</li><li><strong>粘着テープ跡</strong> — 不適切な貼付・剥離跡</li></ol>` }} />

          <h2 id="section-2">3. ラベル状態別の査定額目安（グレンフィディック30年）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>グレンフィディック30年の実勢中央値<strong>68,005円</strong>（新品同様=100%）に対し、ラベル状態でこう変動します:</p><ol><li><strong>新品同様</strong>: 68,005円（100%）</li><li><strong>軽度の汚れ</strong>: 約61,200円（90%程度）</li><li><strong>シミ・水濡れ跡</strong>: 約54,400円（80%程度）</li><li><strong>破れ・欠け</strong>: 約44,200円（65%程度）</li><li><strong>強い退色・大きな損傷</strong>: 約34,000円（50%程度）</li><li><strong>ラベル剥がれ（残あり）</strong>: 約27,200円（40%程度）</li><li><strong>ラベル完全消失</strong>: 約13,600円（20%程度、ヴィンテージ価値あれば例外）</li></ol>` }} />

          <h2 id="section-3">4. ラベル損傷が起きやすい原因</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>主な原因</strong>:</p><ol><li><strong>直射日光・蛍光灯</strong> — 退色・脆化</li><li><strong>湿度の高い場所</strong> — シミ・カビ</li><li><strong>段ボール直置き</strong> — シミ・吸湿</li><li><strong>粘着テープの貼り付け</strong> — 剥がし跡</li><li><strong>タンスや棚の埃</strong> — 表面汚れ</li><li><strong>指で頻繁に触る</strong> — 油脂による変色</li><li><strong>温度変化</strong> — ラベルの剥がれ</li><li><strong>化学物質の接触</strong> — 洗剤・芳香剤の蒸気</li></ol>` }} />

          <h2 id="section-4">5. ラベルを保護する7つの保管方法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>直射日光を完全に避ける</strong> — カーテン・遮光カバーを活用</li><li><strong>室温15〜20℃、湿度50〜70%</strong> — 急激な温湿度変化を避ける</li><li><strong>外箱に入れて保管</strong> — 多くの劣化を防ぐ</li><li><strong>専用のディスプレイケース</strong> — コレクター品ならガラスケース</li><li><strong>直接触れない</strong> — 必要なら手袋着用</li><li><strong>化学物質を遠ざける</strong> — キッチン・浴室・芳香剤付近はNG</li><li><strong>定期的な点検</strong> — 3ヶ月に1度状態確認</li></ol>` }} />

          <h2 id="section-5">6. ラベル汚れがある状態での売却戦略</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>「もう価値はない」と諦める前に、複数業者で見積もりを取りましょう。<strong>業者により、ラベル汚れの評価基準が異なります</strong>。

推奨アプローチ:</p><ol><li><strong>JOYLAB・リカスタ</strong> 等の専門店は、ラベル以外の総合状態で判断してくれる傾向</li><li><strong>ヒカカク！</strong> の一括査定で複数社の評価を比較</li><li><strong>正直な状態申告</strong> が最終的に最良の結果を生む</li><li><strong>写真添付</strong> で事前に状態を業者に確認してもらう</li></ol>` }} />

          <h2 id="section-6">7. やってはいけないラベル「修復」</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>❌ <strong>絶対にNGの行為</strong>:</p><ol><li>水・洗剤での清掃 — ラベル素材を傷める可能性大</li><li>ラベルの「補修」 — 査定価値が更に下がる</li><li>剥がれかけのラベルを糊で貼り直す — 状態悪化</li><li>アイロンや熱でシワ伸ばし — ラベル変色</li><li>漂白剤での「シミ抜き」 — 致命的損傷

気になる場合は、<strong>乾いた柔らかい布で軽く埃を払う程度</strong>にとどめてください。それ以上の修復は専門業者でないと、価値を下げるだけです。</li></ol>` }} />

          <h2 id="section-7">8. ラベル損傷でも売れる業者ランキング</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>JOYLAB</strong>（お酒専門の柔軟な評価）</li><li><strong>ヒカカク！</strong>（一括査定で柔軟な業者を発見）</li><li><strong>リカスタ</strong>（宅配買取で広く対応）</li><li><strong>バイセル</strong>（大手で安定査定）

どの業者も査定無料・キャンセル無料なので、3社以上で見積もり比較が鉄則です。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">グレンフィディック30年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>グレンフィディック30年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'グレンフィディック30年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じグレンフィディック30年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'グレンフィディック30年の売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'グレンフィディック30年を売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/glenfiddich-30-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">グレンフィディック30年の高く売る方法</p></Link>
            <Link href="/articles/glenfiddich-30-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">グレンフィディック30年の偽物の見分け方</p></Link>
            <Link href="/articles/glenfiddich-30-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">グレンフィディック30年の買取業者ランキング</p></Link>
            <Link href="/articles/glenfiddich-30-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">グレンフィディック30年の歴史と特徴</p></Link>
            <Link href="/articles/glenfiddich-30-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">グレンフィディック30年の希少性・投資価値</p></Link>
            <Link href="/articles/glenfiddich-30-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">グレンフィディック30年のオークション推移</p></Link>
            <Link href="/articles/glenfiddich-30-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">グレンフィディック30年の開封済みでも売れる</p></Link>
            <Link href="/articles/glenfiddich-30-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">グレンフィディック30年の箱なしでも買取</p></Link>
            <Link href="/articles/glenfiddich-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">グレンフィディック30年の買取相場ガイド（完全版）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-29）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
