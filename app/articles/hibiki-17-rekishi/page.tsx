import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hibiki-17.json";

export const metadata: Metadata = {
  title: '響17年の歴史・特徴と買取価値【2026年6月最新】なぜ高い?市場評価の根拠',
  description: '響17年の歴史的背景、サントリーのストーリー、味わいの特徴、世界的評価、市場価値が高い理由を専門ライターが徹底解説。コレクター・購入検討者必読の銘柄完全ガイド。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '響17年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じ響17年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '響17年の売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '響17年を売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function Hibiki17RekishiPage() {
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
            <li><Link href="/articles/hibiki-17-kaitori/" className="hover:text-amber-dark transition-colors">響17年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">歴史と特徴</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hibiki-17.png" alt='響17年の歴史と特徴' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">響17年の歴史と特徴</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-29 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">響17年</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / サントリー / 17年熟成 / 希少度 ハイ / 市場相場 48,974円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/hibiki-17-kaitori/" className="text-amber-dark underline">響17年の買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 響17年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. サントリーの創業と歴史</a></li>
              <li><a href="#section-2" className="hover:underline">3. 響17年の誕生背景</a></li>
              <li><a href="#section-3" className="hover:underline">4. 響17年の味わいプロファイル</a></li>
              <li><a href="#section-4" className="hover:underline">5. 世界的評価と受賞歴</a></li>
              <li><a href="#section-5" className="hover:underline">6. 二次流通市場での位置付け</a></li>
              <li><a href="#section-6" className="hover:underline">7. コレクター市場での需要動向</a></li>
              <li><a href="#section-7" className="hover:underline">8. 今後の市場見通し</a></li>
            </ol>
          </div>

          <p>響17年はジャパニーズウイスキーを代表する銘柄の1つで、サントリーが手がける17年熟成のボトル。本記事では、銘柄の誕生背景、蒸溜所のストーリー、味わいの個性、世界的評価、そして二次流通市場で高値が定着している理由を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは響17年の落札が約272件確認でき、落札額の中央値は48,974円でした。取引が活発で換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/distillery-japanese.png" alt="サントリーの蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <h2 id="section-0">1. 響17年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>響17年</strong>はジャパニーズウイスキー（サントリー）の17年熟成、度数43%、希少度は希少に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>48,974円</strong>（流通サンプル272件、当サイト独自集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定が上下しやすく、コンディション管理が効きます。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているぶん、付属品・状態の差が査定額に直結します。</p><p>ジャパニーズウイスキーは世界的評価の高まりで需要が強く、特に終売・長期熟成銘柄は中長期で価格が伸びやすい傾向です。一方で短期は為替やオークション結果で振れるため、売り時の見極めが重要になります。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. サントリーの創業と歴史</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>サントリーはジャパニーズウイスキー業界で長い歴史を持つ蒸溜所/メーカー。創業以来、伝統的な製法と現代の品質管理を融合し、響17年を含む数々の名作を世に送り出しています。</p><p>ジャパニーズウイスキーの場合は1923年の山崎蒸溜所創設以降、スコッチの場合は18〜19世紀に遡る歴史を持つ銘柄も多数あります。各蒸溜所が独自の蒸溜方法・水・樽選びで個性を表現し、それが今日の市場価値につながっています。</p>` }} />

          <h2 id="section-2">3. 響17年の誕生背景</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>響17年は、サントリーの長年の研究と職人技術の結晶。17年熟成の長期にわたる樽熟成を経て、樽材から溶け出した成分と原酒が複雑に交差し、唯一無二の味わいが生まれます。</p><p>発売当時はジャパニーズウイスキーの品質を世界に示すフラッグシップ的位置付けで、限定的な生産量と高い品質基準により、コレクターや愛好家から絶大な支持を集めました。</p>` }} />

          <h2 id="section-3">4. 響17年の味わいプロファイル</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキーの味わいは、原料・水・蒸溜方法・熟成樽・熟成期間で決まります。

<strong>主要な構成要素</strong>:</p><ol><li>原料の麦芽（モルト）の質</li><li>仕込み水のミネラル成分</li><li>発酵に使う酵母の種類</li><li>ポットスチルの形状・蒸溜方法</li><li>熟成樽の種類（シェリー樽・バーボン樽・ミズナラ樽等）</li><li>熟成環境（温度・湿度）

これら全ての要素が組み合わさり、{age_label}の時間をかけて醸成されたのが{name}の味わいです。</li></ol>` }} />

          <h2 id="section-4">5. 世界的評価と受賞歴</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>響17年を含むサントリーの銘柄は、以下の国際品評会で度々受賞しています:</p><ol><li>ISC（インターナショナル・スピリッツ・チャレンジ）</li><li>ワールド・ウイスキー・アワード（WWA）</li><li>サンフランシスコ・ワールド・スピリッツ・コンペティション</li><li>ジム・マーレイ氏のウイスキー・バイブル</li><li>ウイスキー・マガジン・アワード

この国際的評価が、二次流通市場での高値を支えています。受賞歴・専門家評価が「投資する価値のあるボトル」という認識を醸成しているのです。</li></ol>` }} />

          <h2 id="section-5">6. 二次流通市場での位置付け</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's、Bonhams、Whisky Auctioneer</strong>等の海外オークションで、響17年は定期的に取引されており、落札データが国内買取相場の指標となっています。</p><p>特に終売や限定リリースの場合は、希少性プレミアが大きく乗ります。コレクター・投資需要が三つ巴で価格を支え、長期的な値上がり期待を生んでいます。</p><p>アジア富裕層・欧米コレクター・国内コレクターが市場参加者として競合する中、響17年の価値は中長期で見て高水準を維持する見通しです。</p>` }} />

          <h2 id="section-6">7. コレクター市場での需要動向</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>響17年の需要は以下の層から支えられています:</p><ol><li><strong>アジア富裕層</strong>（中国・香港・台湾・シンガポール）— ジャパニーズウイスキーブームの主要バイヤー</li><li><strong>欧米コレクター</strong>（米・英・独）— Sotheby's・Bonhamsの主要顧客</li><li><strong>国内コレクター・愛好家</strong>— SNS・ウイスキーバー文化の普及で増加中</li><li><strong>投資家・ファンド</strong>— 「液体資産」としての保有が増加

この多様な需要構造が、響17年の市場価値を安定的に支えています。</li></ol>` }} />

          <h2 id="section-7">8. 今後の市場見通し</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>響17年を含むジャパニーズウイスキーの中長期見通しは、(1)世界的需要の継続、(2)供給制限、(3)新興市場の参入 の3要因が支え、<strong>高値推移が予想</strong>されます。</p><p>ただし短期は需給の振れにより上下動も発生します。「自分にとっての納得価格になったら売る」のが実践的な判断軸です。</p><p>長期保有を視野に入れる場合は、適切な保管と保険加入を検討し、5〜10年スパンでの値上がり期待を持つのが現実的です。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">響17年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>響17年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '響17年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じ響17年でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '響17年の売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '響17年を売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/hibiki-17-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">響17年の高く売る方法</p></Link>
            <Link href="/articles/hibiki-17-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">響17年の偽物の見分け方</p></Link>
            <Link href="/articles/hibiki-17-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">響17年の買取業者ランキング</p></Link>
            <Link href="/articles/hibiki-17-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">響17年の希少性・投資価値</p></Link>
            <Link href="/articles/hibiki-17-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">響17年のオークション推移</p></Link>
            <Link href="/articles/hibiki-17-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">響17年の開封済みでも売れる</p></Link>
            <Link href="/articles/hibiki-17-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">響17年の箱なしでも買取</p></Link>
            <Link href="/articles/hibiki-17-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">響17年のラベル汚れでも査定</p></Link>
            <Link href="/articles/hibiki-17-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">響17年の買取相場ガイド（完全版）</p></Link>
            <Link href="/articles/hibiki-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋ハブ</span><p className="text-sm font-bold mt-1">響（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-29）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
