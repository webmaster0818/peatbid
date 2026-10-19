import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/taketsuru-21.json";

export const metadata: Metadata = {
  title: '竹鶴21年を高く売るには？買取相場と査定額を上げる7つのポイント【2026年10月最新】',
  description: '竹鶴21年を高く売るためのガイドです。付属品・状態・売却時期・業者選び・保管方法・贋作対策・交渉の7つの観点から、査定額を上げる方法を解説しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '竹鶴21年を売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じ竹鶴21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '竹鶴21年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '竹鶴21年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function Taketsuru21TakakuUruPage() {
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
            <li><Link href="/articles/taketsuru-21-kaitori/" className="hover:text-amber-dark transition-colors">竹鶴21年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">高く売る方法</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/taketsuru-21.png" alt='竹鶴21年を高く売る方法 — 査定額を上げる7つのポイント' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">竹鶴21年を高く売る方法 — 査定額を上げる7つのポイント</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-19 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">竹鶴21年</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / ニッカ / 21年熟成 / 希少度 ハイ / 市場相場 63,798円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/taketsuru-21-kaitori/" className="text-amber-dark underline">竹鶴21年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 竹鶴21年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. ポイント1: 付属品を揃える</a></li>
              <li><a href="#section-2" className="hover:underline">3. ポイント2: 未開封の状態を保つ</a></li>
              <li><a href="#section-3" className="hover:underline">4. ポイント3: 複数の業者で相見積もりを取る</a></li>
              <li><a href="#section-4" className="hover:underline">5. ポイント4: 売却の時期を検討する</a></li>
              <li><a href="#section-5" className="hover:underline">6. ポイント5: 適切な保管環境</a></li>
              <li><a href="#section-6" className="hover:underline">7. ポイント6: 贋作対策と購入経路の証明</a></li>
              <li><a href="#section-7" className="hover:underline">8. ポイント7: 査定額の交渉</a></li>
            </ol>
          </div>

          <p>竹鶴21年はジャパニーズウイスキーの代表的な銘柄の一つで、コレクターの需要が高いボトルです。同じボトルでも、売り方によって査定額は大きく変わります。本記事では、PeatBid編集部が推奨する**7つのポイント**をもとに、竹鶴21年の査定額を上げる方法を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは竹鶴21年の落札が約262件確認でき、落札額の中央値は63,798円でした。取引が活発で、換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>


          <h2 id="section-0">1. 竹鶴21年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>竹鶴21年</strong>はジャパニーズウイスキー（ニッカ）の21年熟成、度数43%、希少度は希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>63,798円</strong>（流通サンプル262件、当サイトの集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定額が変動しやすく、状態の管理が査定額に影響します。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているため、付属品・状態の差が査定額に直接影響します。</p><p>ジャパニーズウイスキーは世界的な評価の高まりにより需要が強く、特に終売・長期熟成の銘柄は中長期で価格が上昇しやすい傾向があります。一方で、短期的には為替やオークションの結果により変動するため、売却の時期の判断が重要です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. ポイント1: 付属品を揃える</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>竹鶴21年の査定では、外箱・冊子・カートン・ホログラムシールの有無で<strong>査定額が10〜20%変動</strong>します。実勢中央値<strong>63,798円</strong>を基準とすると、付属品なしでは約51,040〜57,420円（相場の80〜90%）まで下がるのが一般的です。</p><p>外箱にシミ・破れ・水濡れ跡があると、さらに5〜10%下がる場合があります。付属品を揃えることで、約9,570円前後の差が生じる計算です。</p><p>売却の前に、付属品が残っていないかご確認ください。</p>` }} />

          <h2 id="section-2">3. ポイント2: 未開封の状態を保つ</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>竹鶴21年は開封済みになると査定額が大幅に下がり、未開封の30〜40%＝約19,140〜25,520円前後まで落ちます。未開封であれば63,798円前後で売却できる可能性があり、差は大きくなります。</p><p>コレクション目的のボトルは、開栓せずに保管することをおすすめします。</p><p>開封した場合は、香味の揮発・酸化が進む前に、早めに売却することをおすすめします。</p>` }} />

          <h2 id="section-3">4. ポイント3: 複数の業者で相見積もりを取る</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>同じ竹鶴21年でも、業者によって<strong>数万〜数十万円</strong>の査定差が生じる場合があります。1社だけで決めることはおすすめしません。</p><p>推奨する手順: (1)一括査定サービスで5社以上から見積もりを取得する、(2)お酒の買取専門店（リカスタ等）2〜3社に個別に見積もりを依頼する、(3)合計7〜8社の見積もりを比較する、(4)手数料・送料を差し引いた受取額で業者を選定する。</p><p>掲載している業者は、いずれも査定料・キャンセル料が無料です。</p>` }} />

          <h2 id="section-4">5. ポイント4: 売却の時期を検討する</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキーの相場は需給によって変動します。<strong>高値になりやすい時期</strong>は以下のとおりです。</p><ol><li>年末年始（12〜1月）— 正月の需要・賞与の時期</li><li>お中元・お歳暮の時期 — 贈答需要</li><li>海外オークションの直後 — Sotheby's・Bonhamsの落札データの反映</li><li>終売・休売の報道直後 — 供給制限による価格上昇</li><li>中華圏の旧正月の前後

一方、夏場（7〜8月）や経済的な混乱の直後は、需要が一時的に落ち込む傾向があります。急ぎでなければ、年末や終売報道後の数か月以内の売却をおすすめします。</li></ol>` }} />

          <h2 id="section-5">6. ポイント5: 適切な保管環境</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>保管環境はボトルの状態に影響します。<strong>推奨する保管条件</strong>は以下のとおりです。</p><ol><li>直射日光・蛍光灯を避ける（ラベルの退色防止）</li><li>室温15〜20℃、湿度50〜70%</li><li>縦置きで保管する（横置きはコルクの劣化につながります。ワインとは逆です）</li><li>外箱に入れて保管する（埃・摩擦からの保護）</li><li>振動の少ない場所に置く

クローゼットの暗所、専用のディスプレイケース、ワインセラーの低温帯などが適しています。キッチン・浴室の付近は湿度・温度の変化が大きいため、避けてください。</li></ol>` }} />

          <h2 id="section-6">7. ポイント6: 贋作対策と購入経路の証明</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>高額銘柄では、贋作・偽造ボトルの存在が査定に影響する場合があります。<strong>購入経路の正当性を示す</strong>資料を揃えておくと、査定が円滑に進みます。</p><p>- 購入時のレシート・領収書<br/>- 正規流通店の保証書<br/>- 海外オークションの落札証明<br/>- 開封・封蝋の写真記録</p><p>業者によっては、本物と判定するために蛍光X線分析（XRF）等の精密検査を行います。事前に証明書類を揃えておくと、査定の手間が省け、査定額にも良い影響があります。</p>` }} />

          <h2 id="section-7">8. ポイント7: 査定額の交渉</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>最後のポイントは<strong>交渉</strong>です。複数の業者から見積もりを取った後、最も高い査定額を提示した業者に対して、次のようにお伝えください。</p><p>「他社では{name}に対して◯◯円の査定が出ています。これ以上の金額を提示できますか？」</p><p>業者によっては、価格の上乗せに応じる場合があります。</p><p>特に希少銘柄や複数本のまとめ売りは交渉の余地が大きく、5〜10%上乗せされる例もあります。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">竹鶴21年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>竹鶴21年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '竹鶴21年を売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じ竹鶴21年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '竹鶴21年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '竹鶴21年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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
            <Link href="/articles/taketsuru-21-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">竹鶴21年の偽物の見分け方</p></Link>
            <Link href="/articles/taketsuru-21-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">竹鶴21年の買取業者ランキング</p></Link>
            <Link href="/articles/taketsuru-21-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">竹鶴21年の歴史と特徴</p></Link>
            <Link href="/articles/taketsuru-21-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">竹鶴21年の希少性・投資価値</p></Link>
            <Link href="/articles/taketsuru-21-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">竹鶴21年のオークション推移</p></Link>
            <Link href="/articles/taketsuru-21-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">竹鶴21年の開封済みボトルの買取</p></Link>
            <Link href="/articles/taketsuru-21-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">竹鶴21年の箱なしボトルの買取</p></Link>
            <Link href="/articles/taketsuru-21-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">竹鶴21年のラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/taketsuru-21-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">竹鶴21年の買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-19）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
