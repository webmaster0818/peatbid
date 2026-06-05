import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/mars-komagatake.json";

export const metadata: Metadata = {
  title: 'マルス駒ヶ岳の市場相場【2026年最新】8,327円・Yahoo中央値ベース完全ガイド',
  description: 'マルス駒ヶ岳（Mars Komagatake）の最新市場相場（Yahoo Auctions 過去180日落札中央値）。状態別の業界目安、業者比較リンク、蒸溜所の歴史、テイスティング、贋作リスクまで網羅。コレクター・オーナー必読の決定版ガイド。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'マルス駒ヶ岳の市場相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": 'マルス駒ヶ岳の市場相場は8,327円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=270、取得日 2026-06-01）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん / JOYLAB など各業者のページで直接ご確認ください。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳の開封済みでも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、可能です。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅減額となる傾向があります（業者により評価基準が異なります）。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。実際の査定額は各業者ページでご確認ください。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳に偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合は専門知識を持つ買取業者（JOYLAB等）で鑑定査定を依頼してください。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳の保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳は税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'マルス駒ヶ岳を売るタイミングはいつがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" } }, { "@type": "Question", "name": 'マルス駒ヶ岳と他の銘柄、どっちを先に売るべき？', "acceptedAnswer": { "@type": "Answer", "text": '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. マルス駒ヶ岳の概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "state-price", label: "5. 状態別の業界目安" },
  { id: "price-reasons", label: "6. なぜこの価格になるのか" },
  { id: "auction", label: "7. オークション落札データ" },
  { id: "takaku-uru", label: "8. 高く売る7つの実践テクニック" },
  { id: "fake", label: "9. 偽物・贋作の見分け方" },
  { id: "partners", label: "10. おすすめ買取業者4社" },
  { id: "process", label: "11. 売却プロセス5ステップ" },
  { id: "faq", label: "12. よくある質問" },
];

export default function MarsKomagatakeKaitoriPage() {
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
            <li><span className="text-foreground">マルス駒ヶ岳</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/mars-komagatake.png" alt="マルス駒ヶ岳の買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">マルス駒ヶ岳の市場相場と業者比較ガイド</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-01 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              {tocItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} className="hover:underline">{item.label}</a></li>
              ))}
            </ol>
          </div>

          <h2 id="summary">1. マルス駒ヶ岳の概要</h2>

          <p>マルス駒ヶ岳はジャパニーズウイスキーを代表する銘柄の1つで、信州マルス蒸溜所が手がけるノンエイジ（NV）のボトルです。マルス駒ヶ岳シングルモルト。</p>

          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。マルス駒ヶ岳は希少度<strong>コモン</strong>クラスに位置し、現行品として安定流通しているが、銘柄によってはプレミア化の兆しあり。市場価値は中位だが、コレクター入門品として安定需要を持つ。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>信州マルス蒸溜所</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>ノンエイジ（NV）</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>43%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>コモン</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>8,327円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. 信州マルス蒸溜所の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-japanese.png" alt="信州マルス蒸溜所の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>1949年創業の本坊酒造が運営する長野県の蒸溜所。標高800メートル超の高地・冷涼気候を活かした熟成が特徴。クラフトウイスキーの先駆者の一つ。</p>

          <p>信州マルス蒸溜所が生み出すジャパニーズウイスキーは、世界の主要品評会で度々受賞しており、二次流通市場でも継続的に高値で取引されています。蒸溜所の歴史と職人技術が、マルス駒ヶ岳のような銘柄の市場価値を支えています。</p>

          <p>同じ蒸溜所の他の銘柄や、同年代の他銘柄との関連性を知ることで、マルス駒ヶ岳の市場における立ち位置がより明確になります。下の関連銘柄リンクから他のグレード・他蒸溜所の銘柄も合わせてチェックすることをおすすめします。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>マルス駒ヶ岳の味わいは、ノンエイジ（NV）の熟成期間中に樽から溶け出した成分と、信州マルス蒸溜所独自の蒸溜技術が複雑に交差したものです。</p>

          <p>フレッシュなフルーツの香り、リンゴ・梨・洋ナシのアロマが軽快に広がる。バニラ・蜂蜜の柔らかな甘み。フィニッシュは短〜中で、初心者にも飲みやすい繊細さ。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合、ボトルを開けずに保管することが価値維持の鉄則です。一度開けると、香味の揮発と空気接触による酸化が進み、二次流通市場での評価が大幅に下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>マルス駒ヶ岳の市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>8,327円</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=270件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、**最低3社、できれば4社以上で相見積もり**を取ることをおすすめします。</p>

          <p>本サイトでは下記の4業者ページへのリンクを参考として提示しています（各社の最新の査定額・キャンペーンは直接ご確認ください）:</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 総合買取の大手、お酒査定にも対応</li>
            <li><a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">JOYLAB</a> — お酒買取専門、希少銘柄の鑑定査定に強み</li>
          </ul>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>マルス駒ヶ岳の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。**実際の査定額は業者により異なります**ので、最終的な金額は各業者のページからご確認ください。</p>

          {/* State condition gallery (5 images) */}
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
              <p className="text-[10px] text-warm-gray mt-1">ラベル<br/>軽度汚れ</p>
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

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>状態</th><th>付属品</th><th>業界目安（市場相場対比）</th><th>概算額（中央値基準）</th></tr>
              </thead>
              <tbody>
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td>市場相場の95〜100%程度</td><td><strong>約7,910〜8,330円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>市場相場の80〜90%程度</td><td><strong>約6,660〜7,490円</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td>市場相場の85〜95%程度</td><td><strong>約7,080〜7,910円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>市場相場の75〜88%程度</td><td><strong>約6,250〜7,330円</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td>市場相場の60〜75%程度</td><td><strong>約5,000〜6,250円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>市場相場の55〜70%程度</td><td><strong>約4,580〜5,830円</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td>市場相場の30〜40%程度</td><td><strong>約2,500〜3,330円</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td>市場相場の15〜25%程度</td><td><strong>約1,250〜2,080円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <p>未開封・完璧（箱・冊子・カートン揃い）を基準（100%）として、各状態の業界一般の目安は概ね上記の通りです。概算額は実勢中央値に各％を乗じた<strong>目安</strong>であり、<strong>業者により評価基準が異なる</strong>ため実際の査定額とは差が出ます。査定時には、業者が以下の要素を総合的に判断します:</p>

          <ul>
            <li>ボトル本体の傷・汚れ</li>
            <li>ラベルの褪色・破れ・汚れ</li>
            <li>キャップ・封蝋・ホログラムの状態</li>
            <li>液面の高さ（目減りの度合い）</li>
            <li>外箱・冊子・カートンの有無と状態</li>
            <li>製造ロット・ボトリング年代</li>
            <li>付属の保証書・購入レシート</li>
          </ul>

          <h2 id="price-reasons">6. なぜマルス駒ヶ岳はこの価格になるのか</h2>

          <p>マルス駒ヶ岳の二次流通価格を決定づける主要な要因は5つあります:</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果が、日本の買取業者の仕入れ価格の基準となっています</li>
            <li><strong>需給バランスと供給制限</strong> — ノンエイジ（NV）の長期熟成銘柄は供給量が物理的に限られており、需要拡大に応じて価格が上昇しやすい構造</li>
            <li><strong>為替レートの影響</strong> — 円安局面では海外バイヤー（アジア富裕層・中華圏コレクター）の購買力が拡大し、国内相場も連動して上昇する傾向</li>
            <li><strong>信州マルス蒸溜所の国際的評価</strong> — World Whiskies Awards、ISC等の品評会受賞歴が国際的需要を支え、長期保有のプレミアにつながる</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮シーズンに需要が高まり、相場が上昇する</li>
          </ol>

          <p>これらの要因を総合的に踏まえると、マルス駒ヶ岳はコモンクラスの希少度を持つため、<strong>中長期で見れば価格安定〜上昇基調</strong>が予想されます。短期的な売り急ぎは避け、市場動向を見ながら最適なタイミングで売却するのが合理的です。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、マルス駒ヶ岳クラスの銘柄が継続的に取引されています。主要オークションプラットフォームと、それぞれの特徴は以下の通りです:</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催、プレミアム銘柄中心。<br/><strong>Bonhams（香港・ロンドン）</strong>: 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次オンラインオークション、中位銘柄まで幅広く扱う。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次開催、コレクター向け。<br/><strong>Whisky Hammer（UK）</strong>: 月次オンライン、新興プレイヤー。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」アーカイブで閲覧可能です。日本の買取業者の査定額は、これらの海外データを基準に、輸送コスト・関税・業者マージンを考慮して算出されています。</p>

          <p>過去5年（2021〜2026年）のマルス駒ヶ岳の二次流通価格は、ジャパニーズウイスキーブーム・コレクター需要拡大により<strong>累積30〜80%の上昇</strong>を示しており、長期保有における資産価値も注目されています。</p>

          <h2 id="takaku-uru">8. マルス駒ヶ岳を高く売る7つの実践テクニック</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを必ず揃える</strong> — 付属品の有無で査定額が10〜20%変動。シミ・破れがあると更に評価減</li>
            <li><strong>未開封の状態を維持する</strong> — 開封済みは査定額が大幅減（20〜40%）。コレクション目的なら絶対に開けない</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により数万〜数十万円の差。ヒカカク等の一括査定+専門店個別査定の組み合わせが鉄則</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置き保管。湿度・温度の急激な変化はNG</li>
            <li><strong>売却タイミングを見極める</strong> — 年末年始・お中元・お歳暮シーズンが高値傾向。海外オークション結果直後も相場上昇のチャンス</li>
            <li><strong>ボトリング年代を業者に伝える</strong> — 古いラベル・ロット番号は希少価値が乗ることがある</li>
            <li><strong>状態を写真で記録</strong> — 事前に複数角度から撮影し、業者比較・トラブル防止に活用</li>
          </ol>

          <h2 id="fake">9. マルス駒ヶ岳の偽物・贋作の見分け方</h2>

          <p>マルス駒ヶ岳のような流通価値のある銘柄では、贋作・偽造ボトルのリスクが存在します。本物を見抜くには以下の5つのチェックが有効です:</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で色ズレなし。贋作はにじみ・かすれ・フォント違いが見られる</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリー山崎・響等はホログラムシール付き。贋作は光の反射が不均一</li>
            <li><strong>液色と液面の状態</strong> — 本物は均一な琥珀色（透明感あり）。贋作は色ムラ・濁り・沈殿物</li>
            <li><strong>瓶の形状と底面刻印</strong> — 正規品は底面にロット番号・製造所コードあり。贋作は刻印なし or 不自然</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークション経由は信頼度高。個人間取引（メルカリ・ヤフオク）は要注意</li>
          </ol>

          <p>怪しいと思ったら、お酒買取専門店（JOYLAB等）で**鑑定査定**を依頼するのが最も確実です。専門業者は本物・贋作の判定経験が豊富で、無料で見抜いてくれます。</p>

          <h2 id="partners">10. おすすめ買取業者4社の詳細レビュー</h2>

          <p>PeatBid編集部がマルス駒ヶ岳クラスの銘柄に強い買取業者を厳選しました。それぞれ得意領域が異なるため、目的別に使い分けるのがコツです。</p>

          {/* Comparison table */}
          <div className="table-wrapper not-prose mb-6">
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

          {/* Decision flowchart */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-6 not-prose">
            <p className="font-bold text-base mb-3 text-ink">🎯 どの業者を選ぶべきか</p>
            <ul className="space-y-2 text-sm text-ink/85">
              <li>✓ <strong>最高値を狙いたい</strong> → まずヒカカクで一括査定し、JOYLABで個別査定して比較</li>
              <li>✓ <strong>急いで現金化したい</strong> → バイセルの店頭買取（即日現金化）</li>
              <li>✓ <strong>地方在住・宅配で完結したい</strong> → リカスタの宅配買取</li>
              <li>✓ <strong>希少銘柄を専門家に見てほしい</strong> → JOYLABの専門査定</li>
              <li>✓ <strong>大手の安心感を優先</strong> → バイセル（東証グロース上場）</li>
            </ul>
          </div>

          <div className="not-prose">
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">1位: ヒカカク！</h3>
              <span className="text-xs text-amber-dark tracking-wider">一括査定</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>ヒカカク！は最大20社の買取業者へ一括で見積もりを依頼できる比較プラットフォーム。希少銘柄ほど業者間の査定差が大きく、まず<strong>相場感を把握する</strong>目的で最適です。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>最大20社一括査定（業界最多級）</li><li>完全無料・しつこい営業なし</li><li>ウイスキー・洋酒・ブランデー対応</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>こんな人におすすめ: <strong>最高値を狙いたい方</strong> / 初めての方</p>` }} className="mt-2 text-sm" />
            <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">ヒカカク！で無料査定する →</a>
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">2位: バイセル</h3>
              <span className="text-xs text-amber-dark tracking-wider">出張/店頭/宅配</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>東証グロース上場のBuySell Technologiesが運営。年間累計買取件数430万件超の大手で、お酒・ウイスキー買取に注力中。<strong>信頼性とスピードを両立</strong>したい場合に最適です。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>東証グロース上場で社会的信頼性◎</li><li>3チャネル対応（出張・店頭・宅配）</li><li>CMでも知名度抜群</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>こんな人におすすめ: <strong>信頼性とスピード</strong>を両立したい方</p>` }} className="mt-2 text-sm" />
            <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">バイセルで無料査定する →</a>
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">3位: JOYLAB</h3>
              <span className="text-xs text-amber-dark tracking-wider">店頭/宅配/出張</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>お酒買取専門で、銘柄ごとのリアルタイム相場表を公式サイトで公開。<strong>ジャパニーズウイスキー強化中</strong>で、希少銘柄に対する専門知識と査定スピードに定評があります。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>お酒買取専門の深い知識</li><li>リアルタイム相場公開</li><li>ジャパニーズウイスキー注力</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>こんな人におすすめ: <strong>希少銘柄を専門店で売りたい方</strong></p>` }} className="mt-2 text-sm" />
            <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">JOYLABで無料査定する →</a>
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">4位: リカスタ</h3>
              <span className="text-xs text-amber-dark tracking-wider">宅配/出張</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>全国対応の宅配買取サービス。<strong>店舗に行く時間がない方・地方在住の方</strong>に最適。査定無料・キャンセル無料で気軽に試せます。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>全国対応の宅配買取</li><li>査定無料・キャンセル無料</li><li>送料・梱包キット無料</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>こんな人におすすめ: <strong>宅配で完結したい方</strong> / 地方在住の方</p>` }} className="mt-2 text-sm" />
            <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">リカスタで無料査定する →</a>
          </div>
          </div>

          <h2 id="process">11. 売却プロセス5ステップ</h2>

          <p>マルス駒ヶ岳を売却する際の標準的なプロセスを5ステップでまとめました:</p>

          <ol>
            <li><strong>状態確認・付属品準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃える</li>
            <li><strong>事前相場リサーチ</strong> — PeatBidなどで現在の相場を確認し、自分のボトルの目安価格を把握</li>
            <li><strong>複数業者で見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒買取専門店（JOYLAB等）に個別で2〜3社、計5〜8社で見積もり取得</li>
            <li><strong>査定額比較・業者選定</strong> — 最高値だけでなく、手数料・キャンセル料・送料・支払い方法を総合判断</li>
            <li><strong>売却契約・入金確認</strong> — 売却契約後、店頭買取なら即日現金、宅配買取なら1〜3営業日で銀行振込</li>
          </ol>

          <p>このプロセス全体で<strong>1〜2週間</strong>を見込めば、最適なタイミングで売却できます。</p>

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

          <h2 id="faq">12. マルス駒ヶ岳に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'マルス駒ヶ岳の市場相場はいくらですか？', a: 'マルス駒ヶ岳の市場相場は8,327円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=270、取得日 2026-06-01）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん / JOYLAB など各業者のページで直接ご確認ください。' }, { q: 'マルス駒ヶ岳を高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' }, { q: 'マルス駒ヶ岳の開封済みでも買取できますか？', a: 'はい、可能です。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅減額となる傾向があります（業者により評価基準が異なります）。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。実際の査定額は各業者ページでご確認ください。' }, { q: 'マルス駒ヶ岳に偽物・贋作はありますか？', a: '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合は専門知識を持つ買取業者（JOYLAB等）で鑑定査定を依頼してください。' }, { q: 'マルス駒ヶ岳の保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' }, { q: 'マルス駒ヶ岳は税金がかかりますか？', a: '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'マルス駒ヶ岳を売るタイミングはいつがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" }, { q: 'マルス駒ヶ岳と他の銘柄、どっちを先に売るべき？', a: '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' }].map((faq) => (
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

          <h2>マルス駒ヶ岳の他の切り口で読む</h2>
          <p>マルス駒ヶ岳についてさらに詳しく知りたい方は、以下の切り口別解説も合わせてご覧ください。</p>
          <ul>
              <li><Link href="/articles/mars-komagatake-takaku-uru/" className="text-amber-dark hover:underline">マルス駒ヶ岳の高く売る方法</Link></li>
              <li><Link href="/articles/mars-komagatake-nisemono-mikata/" className="text-amber-dark hover:underline">マルス駒ヶ岳の偽物の見分け方</Link></li>
              <li><Link href="/articles/mars-komagatake-ranking/" className="text-amber-dark hover:underline">マルス駒ヶ岳の買取業者ランキング</Link></li>
              <li><Link href="/articles/mars-komagatake-rekishi/" className="text-amber-dark hover:underline">マルス駒ヶ岳の歴史と特徴</Link></li>
              <li><Link href="/articles/mars-komagatake-kihaku/" className="text-amber-dark hover:underline">マルス駒ヶ岳の希少性・投資価値</Link></li>
              <li><Link href="/articles/mars-komagatake-auction-suii/" className="text-amber-dark hover:underline">マルス駒ヶ岳のオークション推移</Link></li>
              <li><Link href="/articles/mars-komagatake-kaifu-zumi/" className="text-amber-dark hover:underline">マルス駒ヶ岳の開封済みでも売れる</Link></li>
              <li><Link href="/articles/mars-komagatake-hako-nashi/" className="text-amber-dark hover:underline">マルス駒ヶ岳の箱なしでも買取</Link></li>
              <li><Link href="/articles/mars-komagatake-label-yogore/" className="text-amber-dark hover:underline">マルス駒ヶ岳のラベル汚れでも査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/hibiki-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">響30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 550,000円</p></Link>
            <Link href="/articles/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市20年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 215,270円</p></Link>
            <Link href="/articles/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">竹鶴25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 184,800円</p></Link>
            <Link href="/articles/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎18年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 93,091円</p></Link>
            <Link href="/articles/yamazaki-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 92,400円</p></Link>
            <Link href="/articles/chichibu-the-first-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">秩父ザファースト の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 77,605円</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-01）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
