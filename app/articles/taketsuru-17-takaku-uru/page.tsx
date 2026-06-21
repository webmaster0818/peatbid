import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/taketsuru-17.json";

export const metadata: Metadata = {
  title: '竹鶴17年を高く売るには？買取相場と査定額を最大化する7つのコツ【2026年6月最新】',
  description: '竹鶴17年を最高値で売るための実践ガイド。付属品・状態・売却タイミング・業者選び・保管方法・贋作対策・交渉術の7要素で査定額を最大化する具体策を完全解説。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '竹鶴17年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じ竹鶴17年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '竹鶴17年の売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '竹鶴17年を売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function Taketsuru17TakakuUruPage() {
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
            <li><Link href="/articles/taketsuru-17-kaitori/" className="hover:text-amber-dark transition-colors">竹鶴17年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">高く売る方法</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/taketsuru-17.png" alt='竹鶴17年を高く売る方法 — 査定額を最大化する完全ガイド' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">竹鶴17年を高く売る方法 — 査定額を最大化する完全ガイド</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">竹鶴17年</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / ニッカ / 17年熟成 / 希少度 ハイ / 市場相場 33,011円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/taketsuru-17-kaitori/" className="text-amber-dark underline">竹鶴17年の買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 竹鶴17年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. コツ1: 付属品をすべて揃える</a></li>
              <li><a href="#section-2" className="hover:underline">3. コツ2: 未開封の状態を維持</a></li>
              <li><a href="#section-3" className="hover:underline">4. コツ3: 複数業者で相見積もり</a></li>
              <li><a href="#section-4" className="hover:underline">5. コツ4: 売却タイミングを見極める</a></li>
              <li><a href="#section-5" className="hover:underline">6. コツ5: 適切な保管環境</a></li>
              <li><a href="#section-6" className="hover:underline">7. コツ6: 贋作対策と本物証明</a></li>
              <li><a href="#section-7" className="hover:underline">8. コツ7: 交渉術 — 業者を競わせる</a></li>
            </ol>
          </div>

          <p>竹鶴17年はジャパニーズウイスキーを代表する銘柄で、コレクター需要が高い1本。同じボトルでも、売り方ひとつで査定額が大きく変わります。本記事では、PeatBid編集部が推奨する**7つの実践テクニック**で竹鶴17年の査定額を最大化する方法を徹底解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは竹鶴17年の落札が約276件確認でき、落札額の中央値は33,011円でした。取引が活発で換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <h2 id="section-0">1. 竹鶴17年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>竹鶴17年</strong>はジャパニーズウイスキー（ニッカ）の17年熟成、度数43%、希少度は希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>33,011円</strong>（流通サンプル276件、当サイト独自集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定が上下しやすく、コンディション管理が効きます。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているぶん、付属品・状態の差が査定額に直結します。</p><p>ジャパニーズウイスキーは世界的評価の高まりで需要が強く、特に終売・長期熟成銘柄は中長期で価格が伸びやすい傾向です。一方で短期は為替やオークション結果で振れるため、売り時の見極めが重要になります。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. コツ1: 付属品をすべて揃える</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>竹鶴17年の査定では、外箱・冊子・カートン・ホログラムシールの有無で<strong>査定額が10〜20%変動</strong>します。実勢中央値<strong>33,011円</strong>を基準とすると、付属品なしでは約26,410〜29,710円（相場の80〜90%）まで下がるのが一般的です。</p><p>外箱にシミ・破れ・水濡れ跡があると更に-5〜10%。付属品を揃えるだけで約4,950円前後の差が出る計算です。</p><p>まず家中を徹底的に探し、すべての付属品を集めてから売却を検討してください。</p>` }} />

          <h2 id="section-2">3. コツ2: 未開封の状態を維持</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>竹鶴17年は開封済みになると査定額が大幅に下がり、未開封の30〜40%＝約9,900〜13,200円前後まで落ちます。未開封なら33,011円前後で売れる可能性があることを考えると、その差は歴然です。</p><p>コレクション目的のボトルは絶対に開けず保管を。「ちょっと味見」が大きな損失につながります。</p><p>万一開封した場合は、香味揮発・酸化が進む前にできるだけ早く売却するのが鉄則です。</p>` }} />

          <h2 id="section-3">4. コツ3: 複数業者で相見積もり</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>同じ竹鶴17年でも、業者によって<strong>数万〜数十万円</strong>の査定差が生じます。1社だけで決めるのは絶対に避けるべきです。</p><p>推奨フロー: (1)ヒカカク等の一括査定サイトで5社以上から見積もり取得、(2)お酒買取専門店（JOYLAB・リカスタ等）に個別で2〜3社から見積もり、(3)合計7〜8社の見積もりを比較、(4)手取り額（手数料・送料込み）で最高値の業者を選定。</p><p>査定無料・キャンセル無料の業者ばかりなので、複数比較のコストはゼロです。</p>` }} />

          <h2 id="section-4">5. コツ4: 売却タイミングを見極める</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキーの相場は需給で動きます。<strong>高値傾向のタイミング</strong>は以下の通り:</p><ol><li>年末年始（12〜1月）— お正月需要・ボーナス商戦</li><li>お中元・お歳暮シーズン — 贈答需要</li><li>海外オークション直後 — Sotheby's・Bonhamsの落札データ反映</li><li>終売・休売報道直後 — 供給制限による急騰局面</li><li>アジア富裕層のイベント前後 — 中華圏の旧正月など

逆に、夏場（7〜8月）や経済ショック直後は需要が一時的に冷える傾向。急ぎでなければ、年末や終売報道後の数ヶ月以内に売却するのが理想的です。</li></ol>` }} />

          <h2 id="section-5">6. コツ5: 適切な保管環境</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>保管環境はボトルの状態を左右します。<strong>理想の保管条件</strong>:</p><ol><li>直射日光・蛍光灯を完全に避ける（ラベル褪色防止）</li><li>室温15〜20℃、湿度50〜70%</li><li>縦置き保管（横置きはコルク劣化、ワインと逆）</li><li>外箱に入れて保管（埃・摩擦から保護）</li><li>振動の少ない場所（高層階の上階や交通量の多い道路沿いは避ける）

クローゼットの暗所、専用ディスプレイケース、ワインセラーの低温帯などが適切です。キッチン・浴室付近は湿度・温度変化が激しいためNG。</li></ol>` }} />

          <h2 id="section-6">7. コツ6: 贋作対策と本物証明</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>高額銘柄では、贋作・偽造ボトルの存在が査定に影響する場合があります。<strong>購入経路の正当性を証明</strong>できる材料を揃えておくと、査定がスムーズです:</p><p>- 購入時のレシート・領収書<br/>- 正規流通店の保証書<br/>- 海外オークションの落札証明<br/>- 開封・封蝋の写真記録</p><p>業者によっては、本物と判定するために蛍光X線分析（XRF）等の精密検査を行います。事前に証明書類を揃えておくと、その手間がカットされ、最終査定額にも好影響です。</p>` }} />

          <h2 id="section-7">8. コツ7: 交渉術 — 業者を競わせる</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>最高値を引き出す最後のテクニックが<strong>交渉</strong>です。複数業者の見積もりを取った後、最高値の業者に対して:</p><p>「他社では{name}に対して◯◯円の査定が出ています。これ以上の金額を提示できますか？」</p><p>と率直に伝えてみてください。多くの業者は最終手段として価格上乗せに応じる可能性があります。</p><p>特に希少銘柄や複数本のまとめ売りは交渉余地が大きく、5〜10%の上乗せも珍しくありません。<strong>遠慮せず、毅然と交渉</strong>することが最後の数万円を引き出すコツです。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">竹鶴17年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>竹鶴17年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '竹鶴17年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じ竹鶴17年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '竹鶴17年の売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '竹鶴17年を売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/taketsuru-17-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">竹鶴17年の偽物の見分け方</p></Link>
            <Link href="/articles/taketsuru-17-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">竹鶴17年の買取業者ランキング</p></Link>
            <Link href="/articles/taketsuru-17-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">竹鶴17年の歴史と特徴</p></Link>
            <Link href="/articles/taketsuru-17-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">竹鶴17年の希少性・投資価値</p></Link>
            <Link href="/articles/taketsuru-17-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">竹鶴17年のオークション推移</p></Link>
            <Link href="/articles/taketsuru-17-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">竹鶴17年の開封済みでも売れる</p></Link>
            <Link href="/articles/taketsuru-17-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">竹鶴17年の箱なしでも買取</p></Link>
            <Link href="/articles/taketsuru-17-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">竹鶴17年のラベル汚れでも査定</p></Link>
            <Link href="/articles/taketsuru-17-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">竹鶴17年の買取相場ガイド（完全版）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-15）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
