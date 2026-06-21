import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hakushu-nv.json";

export const metadata: Metadata = {
  title: '白州ノンエイジの買取おすすめ業者ランキング【2026年6月最新】査定額・スピードで徹底比較',
  description: '白州ノンエイジに強い買取業者をランキング形式で徹底比較。ヒカカク・バイセル・JOYLAB・リカスタの査定スピード・査定額・サポート・信頼性を多角的に評価し、目的別おすすめを提示。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '白州ノンエイジを売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じ白州ノンエイジでも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '白州ノンエイジの売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '白州ノンエイジを売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
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
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">白州ノンエイジ</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / 白州蒸溜所 / ノンエイジ / 希少度 コモン / 市場相場 9,900円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark underline">白州ノンエイジの買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 白州ノンエイジの市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. ランキングの選定基準</a></li>
              <li><a href="#section-2" className="hover:underline">3. 1位: ヒカカク！（一括査定で最高値発見）</a></li>
              <li><a href="#section-3" className="hover:underline">4. 2位: バイセル（東証グロース上場の安心感）</a></li>
              <li><a href="#section-4" className="hover:underline">5. 3位: JOYLAB（お酒買取専門の高単価）</a></li>
              <li><a href="#section-5" className="hover:underline">6. 4位: リカスタ（宅配買取で完結）</a></li>
              <li><a href="#section-6" className="hover:underline">7. 業者選びの最適戦略</a></li>
            </ol>
          </div>

          <p>白州ノンエイジを高く売るには、業者選びが最重要です。実勢中央値9,900円クラスのボトルでも、業者間で概算約500〜1,480円（相場の5〜15%）の査定差が生じ得ます。本記事ではPeatBid編集部が選定基準に基づいて選んだ白州ノンエイジに強い買取業者4社を、ランキング形式で比較します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは白州ノンエイジの落札が約210件確認でき、落札額の中央値は9,900円でした。取引が活発で換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <div className="table-wrapper not-prose my-6">
            <p className="text-sm font-bold mb-2 text-ink">業者比較表</p>
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr>
                  <th>業者</th>
                  <th>得意領域</th>
                  <th>査定スピード</th>
                  <th>査定額傾向</th>
                  <th>手数料</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>ヒカカク！</strong></td><td>一括査定（20社）</td><td>1〜2日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>バイセル</strong></td><td>大手の安心感</td><td>即日〜2日</td><td>★★★★</td><td>無料</td></tr>
                <tr><td><strong>JOYLAB</strong></td><td>お酒専門・希少銘柄</td><td>1〜3日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>リカスタ</strong></td><td>宅配買取</td><td>2〜5日</td><td>★★★★</td><td>無料</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="section-0">1. 白州ノンエイジの市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>白州ノンエイジ</strong>はジャパニーズウイスキー（白州蒸溜所）のノンエイジ（NV）、度数43%、希少度は標準的な流通量に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>9,900円</strong>（流通サンプル210件、当サイト独自集計）。価格帯としては<strong>実用帯</strong>にあたり、回転が速く、状態が良ければスムーズに売却しやすい価格帯です。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているぶん、付属品・状態の差が査定額に直結します。</p><p>ジャパニーズウイスキーは世界的評価の高まりで需要が強く、特に終売・長期熟成銘柄は中長期で価格が伸びやすい傾向です。一方で短期は為替やオークション結果で振れるため、売り時の見極めが重要になります。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. ランキングの選定基準</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid編集部の白州ノンエイジ買取業者選定基準（5項目）:</p><ol><li><strong>専門知識</strong> — お酒・ウイスキー専門の鑑定力があるか</li><li><strong>査定スピード</strong> — 見積もり〜入金までの所要日数</li><li><strong>査定額の透明性</strong> — 価格根拠・状態評価の説明があるか</li><li><strong>手数料・キャンセル料</strong> — 完全無料か</li><li><strong>信頼性</strong> — 上場・古物商許可・口コミ評判

以上の5項目を各業者ごとに10点満点で評価し、合計点でランキングを作成しました。</li></ol>` }} />

          <h2 id="section-2">3. 1位: ヒカカク！（一括査定で最高値発見）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>総合スコア: 47/50</strong></p><p>ヒカカク！は最大20社の買取業者へ一括で見積もりを依頼できる比較プラットフォーム。1サイトで業界最多級の見積もりが取得可能で、希少銘柄ほど業者間の査定差が大きいため、<strong>まずはヒカカクで相場感を把握する</strong>のが最短ルートです。</p><p><strong>強み</strong>: 業界最多級20社一括 / 完全無料 / 24時間Web依頼可能 / お酒・洋酒・ブランデー対応</p><p><strong>弱み</strong>: 一括査定なので業者から個別に連絡が来る / 一括査定後に専門店個別査定も推奨</p><p><strong>こんな人におすすめ</strong>: 最高値を効率的に狙いたい方、初めて買取を依頼する方</p>` }} />

          <h2 id="section-3">4. 2位: バイセル（東証グロース上場の安心感）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>総合スコア: 44/50</strong></p><p>東証グロース上場のBuySell Technologies運営。年間累計買取件数430万件超の大手で、お酒・ウイスキー買取に注力中。<strong>信頼性とスピードを両立</strong>したい場合に最適です。</p><p><strong>強み</strong>: 東証グロース上場で社会的信頼性◎ / 3チャネル対応（出張・店頭・宅配） / CM放映で知名度抜群 / 一律無料</p><p><strong>弱み</strong>: 一括査定よりは査定額がやや低めの場合あり / 出張買取はエリア限定</p><p><strong>こんな人におすすめ</strong>: 信頼性とスピードを両立したい方、大量にまとめて売りたい方</p>` }} />

          <h2 id="section-4">5. 3位: JOYLAB（お酒買取専門の高単価）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>総合スコア: 43/50</strong></p><p>JOYLABはお酒買取専門で、銘柄別の相場表をリアルタイム公開。<strong>ジャパニーズウイスキー強化中</strong>で、希少銘柄に対する専門知識と査定スピードに定評があります。</p><p><strong>強み</strong>: お酒買取専門の深い知識 / リアルタイム相場公開 / 海外オークション価格を反映した査定 / 希少銘柄に強い</p><p><strong>弱み</strong>: 大手チェーンと比較すると店舗数が少ない / 出張買取エリアが限定的</p><p><strong>こんな人におすすめ</strong>: 希少銘柄を専門店で売りたい方、当日の海外オークション価格を反映した査定を希望する方</p>` }} />

          <h2 id="section-5">6. 4位: リカスタ（宅配買取で完結）</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>総合スコア: 40/50</strong></p><p>リカスタは全国対応の宅配買取サービス。店舗に行く時間がない方、地方在住の方に最適。査定無料・キャンセル無料・送料・梱包キット無料で気軽に試せます。</p><p><strong>強み</strong>: 全国対応の宅配買取 / 査定・送料・キャンセル無料 / ジャパニーズウイスキーも積極買取 / Web完結</p><p><strong>弱み</strong>: 査定額は専門店比でやや低めのことがある / 即日現金化はできない（宅配のため）</p><p><strong>こんな人におすすめ</strong>: 宅配で完結したい方、地方在住の方、複数本まとめて宅配で売りたい方</p>` }} />

          <h2 id="section-6">7. 業者選びの最適戦略</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid編集部が推奨する<strong>3ステップ戦略</strong>:</p><ol><li><strong>まずヒカカクで一括査定</strong> — 最大20社の相場感を把握</li><li><strong>JOYLABで専門査定</strong> — お酒専門店の査定で本当の市場価値を確認</li><li><strong>最高値の業者で売却</strong> — 手取り額（手数料・送料込み）で比較し最終決定

この3ステップで、{name}の最高値を確実に引き出せます。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州ノンエイジの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>白州ノンエイジに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '白州ノンエイジを売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じ白州ノンエイジでも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '白州ノンエイジの売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '白州ノンエイジを売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/hakushu-nv-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">白州ノンエイジの高く売る方法</p></Link>
            <Link href="/articles/hakushu-nv-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">白州ノンエイジの偽物の見分け方</p></Link>
            <Link href="/articles/hakushu-nv-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">白州ノンエイジの歴史と特徴</p></Link>
            <Link href="/articles/hakushu-nv-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">白州ノンエイジの希少性・投資価値</p></Link>
            <Link href="/articles/hakushu-nv-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">白州ノンエイジのオークション推移</p></Link>
            <Link href="/articles/hakushu-nv-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">白州ノンエイジの開封済みでも売れる</p></Link>
            <Link href="/articles/hakushu-nv-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">白州ノンエイジの箱なしでも買取</p></Link>
            <Link href="/articles/hakushu-nv-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">白州ノンエイジのラベル汚れでも査定</p></Link>
            <Link href="/articles/hakushu-nv-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">白州ノンエイジの買取相場ガイド（完全版）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-15）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
