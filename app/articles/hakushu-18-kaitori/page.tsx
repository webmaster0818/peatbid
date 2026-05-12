import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "白州18年の買取相場【2026年最新】250,000円前後・状態別査定額と高く売る完全ガイド",
  description: "白州18年（Hakushu 18 Year）の最新買取相場、状態別査定額、蒸溜所の歴史、テイスティング、希少性、贋作リスク、おすすめ買取業者4社比較まで完全解説。コレクター・オーナー必読の決定版ガイド。",
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '白州18年は今いくらで売れますか？', "acceptedAnswer": { "@type": "Answer", "text": '2026年5月現在、白州18年（未開封・箱付き）の買取相場は約250,000円前後です。状態・付属品・タイミングにより上下します。最高値を狙うなら**複数業者で相見積もり**が鉄則です。' } }, { "@type": "Question", "name": '白州18年を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' } }, { "@type": "Question", "name": '白州18年の開封済みでも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、可能です。残量9割以上で約75,000円〜100,000円、半分以下では大幅減額となります。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。' } }, { "@type": "Question", "name": '白州18年に偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合は専門知識を持つ買取業者（JOYLAB等）で鑑定査定を依頼してください。' } }, { "@type": "Question", "name": '白州18年の保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' } }, { "@type": "Question", "name": '白州18年は税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '白州18年を売るタイミングはいつがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" } }, { "@type": "Question", "name": '白州18年と他の銘柄、どっちを先に売るべき？', "acceptedAnswer": { "@type": "Answer", "text": '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. 白州18年の概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の買取相場" },
  { id: "state-price", label: "5. 状態別の査定額" },
  { id: "price-reasons", label: "6. なぜこの価格になるのか" },
  { id: "auction", label: "7. オークション落札データ" },
  { id: "takaku-uru", label: "8. 高く売る7つの実践テクニック" },
  { id: "fake", label: "9. 偽物・贋作の見分け方" },
  { id: "partners", label: "10. おすすめ買取業者4社" },
  { id: "process", label: "11. 売却プロセス5ステップ" },
  { id: "faq", label: "12. よくある質問" },
];

export default function Hakushu18KaitoriPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/whisky-kaitori-souba/" className="hover:text-amber-dark transition-colors">買取相場</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">白州18年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt="白州18年の買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州18年の買取相場と高く売る完全ガイド</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026年5月13日 / 監修: PeatBid編集部</p>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              {tocItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} className="hover:underline">{item.label}</a></li>
              ))}
            </ol>
          </div>

          <h2 id="summary">1. 白州18年の概要</h2>

          <p>白州18年はジャパニーズウイスキーを代表する銘柄の1つで、白州蒸溜所が手がける18年熟成のボトルです。白州18年。希少性増加中。</p>

          <p>2026年5月現在、白州18年（未開封・箱付き）の買取相場は<strong>約250,000円前後</strong>。希少度は<strong>ハイ</strong>クラスに位置し、希少性と国際的評価により、二次流通市場で高値が定着している銘柄帯。コレクター・投資需要が支え、長期保有での価値増大が期待できる。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>白州蒸溜所</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>18年熟成</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>43%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>ハイ</td></tr>
                <tr><td><strong>参考買取価格（未開封・箱付き）</strong></td><td><strong>250,000円前後</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. 白州蒸溜所の歴史と特徴</h2>

          <p>1973年（昭和48年）創業、サントリーが山梨県北杜市・南アルプス山系の麓に開設した蒸溜所。標高約700メートルの森林に囲まれた立地と、ミネラル分の少ない軟水を使用。「森のウイスキー」と称される爽やかで軽快な味わいが特徴。</p>

          <p>白州蒸溜所が生み出すジャパニーズウイスキーは、世界の主要品評会で度々受賞しており、二次流通市場でも継続的に高値で取引されています。蒸溜所の歴史と職人技術が、白州18年のような銘柄の市場価値を支えています。</p>

          <p>同じ蒸溜所の他の銘柄や、同年代の他銘柄との関連性を知ることで、白州18年の市場における立ち位置がより明確になります。下の関連銘柄リンクから他のグレード・他蒸溜所の銘柄も合わせてチェックすることをおすすめします。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>白州18年の味わいは、18年熟成の熟成期間中に樽から溶け出した成分と、白州蒸溜所独自の蒸溜技術が複雑に交差したものです。</p>

          <p>熟成感のあるドライフルーツ（レーズン・プラム）、シナモン・クローブのスパイス、ミズナラ樽からくる伽羅・白檀の和の香り。ふくよかな甘みと長いフィニッシュ。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合、ボトルを開けずに保管することが価値維持の鉄則です。一度開けると、香味の揮発と空気接触による酸化が進み、二次流通市場での評価が大幅に下がります。</p>

          <h2 id="current-price">4. 現在の買取相場</h2>

          <p>2026年5月時点での白州18年の買取相場は<strong>212,500円〜250,000円</strong>のレンジで推移しています（未開封・箱付きの場合）。この相場は、以下の市場データの集約から算出しています:</p>

          <ol>
            <li>国内主要買取業者（大黒屋・JOYLAB・ウイスキー王国等）の公開買取価格</li>
            <li>海外オークション（Sotheby's、Bonhams、Whisky Auctioneer、Just Whisky Auctions）の落札データ</li>
            <li>個人間二次流通（ヤフオク、メルカリ）の取引価格</li>
            <li>百貨店・正規流通店の小売価格（参考）</li>
          </ol>

          <p>業者間の査定差は、同じ未開封ボトルでも<strong>5〜15%</strong>変動するのが一般的です。最高値を引き出すには、**最低3社、できれば5社以上で相見積もり**を取ることが必須です。</p>

          <h2 id="state-price">5. 状態別の査定額</h2>

          <p>白州18年の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下が状態別の査定額の目安です:</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>状態</th><th>付属品</th><th>査定額の目安</th></tr>
              </thead>
              <tbody>
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td><strong>237,500円〜250,000円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td><strong>200,000円〜225,000円</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td><strong>212,500円〜237,500円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td><strong>187,500円〜220,000円</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td><strong>150,000円〜187,500円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td><strong>137,500円〜175,000円</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td><strong>75,000円〜100,000円</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td><strong>37,500円〜62,500円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <p>未開封・完璧（箱・冊子・カートン揃い）を基準（100%）として、各状態の係数は概ね上記の通りです。査定時には、業者が以下の要素を総合的に判断します:</p>

          <ul>
            <li>ボトル本体の傷・汚れ</li>
            <li>ラベルの褪色・破れ・汚れ</li>
            <li>キャップ・封蝋・ホログラムの状態</li>
            <li>液面の高さ（目減りの度合い）</li>
            <li>外箱・冊子・カートンの有無と状態</li>
            <li>製造ロット・ボトリング年代</li>
            <li>付属の保証書・購入レシート</li>
          </ul>

          <h2 id="price-reasons">6. なぜ白州18年はこの価格になるのか</h2>

          <p>白州18年の二次流通価格を決定づける主要な要因は5つあります:</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果が、日本の買取業者の仕入れ価格の基準となっています</li>
            <li><strong>需給バランスと供給制限</strong> — 18年熟成の長期熟成銘柄は供給量が物理的に限られており、需要拡大に応じて価格が上昇しやすい構造</li>
            <li><strong>為替レートの影響</strong> — 円安局面では海外バイヤー（アジア富裕層・中華圏コレクター）の購買力が拡大し、国内相場も連動して上昇する傾向</li>
            <li><strong>白州蒸溜所の国際的評価</strong> — World Whiskies Awards、ISC等の品評会受賞歴が国際的需要を支え、長期保有のプレミアにつながる</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮シーズンに需要が高まり、相場が上昇する</li>
          </ol>

          <p>これらの要因を総合的に踏まえると、白州18年はハイクラスの希少度を持つため、<strong>中長期で見れば価格安定〜上昇基調</strong>が予想されます。短期的な売り急ぎは避け、市場動向を見ながら最適なタイミングで売却するのが合理的です。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <p>海外の主要オークションでは、白州18年クラスの銘柄が継続的に取引されています。主要オークションプラットフォームと、それぞれの特徴は以下の通りです:</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催、プレミアム銘柄中心。<br/><strong>Bonhams（香港・ロンドン）</strong>: 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次オンラインオークション、中位銘柄まで幅広く扱う。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次開催、コレクター向け。<br/><strong>Whisky Hammer（UK）</strong>: 月次オンライン、新興プレイヤー。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」アーカイブで閲覧可能です。日本の買取業者の査定額は、これらの海外データを基準に、輸送コスト・関税・業者マージンを考慮して算出されています。</p>

          <p>過去5年（2021〜2026年）の白州18年の二次流通価格は、ジャパニーズウイスキーブーム・コレクター需要拡大により<strong>累積30〜80%の上昇</strong>を示しており、長期保有における資産価値も注目されています。</p>

          <h2 id="takaku-uru">8. 白州18年を高く売る7つの実践テクニック</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを必ず揃える</strong> — 付属品の有無で査定額が10〜20%変動。シミ・破れがあると更に評価減</li>
            <li><strong>未開封の状態を維持する</strong> — 開封済みは査定額が大幅減（20〜40%）。コレクション目的なら絶対に開けない</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により数万〜数十万円の差。ヒカカク等の一括査定+専門店個別査定の組み合わせが鉄則</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置き保管。湿度・温度の急激な変化はNG</li>
            <li><strong>売却タイミングを見極める</strong> — 年末年始・お中元・お歳暮シーズンが高値傾向。海外オークション結果直後も相場上昇のチャンス</li>
            <li><strong>ボトリング年代を業者に伝える</strong> — 古いラベル・ロット番号は希少価値が乗ることがある</li>
            <li><strong>状態を写真で記録</strong> — 事前に複数角度から撮影し、業者比較・トラブル防止に活用</li>
          </ol>

          <h2 id="fake">9. 白州18年の偽物・贋作の見分け方</h2>

          <p>250,000円クラスの高額銘柄では、贋作・偽造ボトルのリスクが存在します。本物を見抜くには以下の5つのチェックが有効です:</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で色ズレなし。贋作はにじみ・かすれ・フォント違いが見られる</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリー山崎・響等はホログラムシール付き。贋作は光の反射が不均一</li>
            <li><strong>液色と液面の状態</strong> — 本物は均一な琥珀色（透明感あり）。贋作は色ムラ・濁り・沈殿物</li>
            <li><strong>瓶の形状と底面刻印</strong> — 正規品は底面にロット番号・製造所コードあり。贋作は刻印なし or 不自然</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークション経由は信頼度高。個人間取引（メルカリ・ヤフオク）は要注意</li>
          </ol>

          <p>怪しいと思ったら、お酒買取専門店（JOYLAB等）で**鑑定査定**を依頼するのが最も確実です。専門業者は本物・贋作の判定経験が豊富で、無料で見抜いてくれます。</p>

          <h2 id="partners">10. おすすめ買取業者4社の詳細レビュー</h2>

          <p>PeatBid編集部が白州18年クラスの銘柄に強い買取業者を厳選しました。それぞれ得意領域が異なるため、目的別に使い分けるのがコツです。</p>

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

          <p>白州18年を売却する際の標準的なプロセスを5ステップでまとめました:</p>

          <ol>
            <li><strong>状態確認・付属品準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃える</li>
            <li><strong>事前相場リサーチ</strong> — PeatBidなどで現在の相場を確認し、自分のボトルの目安価格を把握</li>
            <li><strong>複数業者で見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒買取専門店（JOYLAB等）に個別で2〜3社、計5〜8社で見積もり取得</li>
            <li><strong>査定額比較・業者選定</strong> — 最高値だけでなく、手数料・キャンセル料・送料・支払い方法を総合判断</li>
            <li><strong>売却契約・入金確認</strong> — 売却契約後、店頭買取なら即日現金、宅配買取なら1〜3営業日で銀行振込</li>
          </ol>

          <p>このプロセス全体で<strong>1〜2週間</strong>を見込めば、最適なタイミングで売却できます。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州18年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">12. 白州18年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '白州18年は今いくらで売れますか？', a: '2026年5月現在、白州18年（未開封・箱付き）の買取相場は約250,000円前後です。状態・付属品・タイミングにより上下します。最高値を狙うなら**複数業者で相見積もり**が鉄則です。' }, { q: '白州18年を高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' }, { q: '白州18年の開封済みでも買取できますか？', a: 'はい、可能です。残量9割以上で約75,000円〜100,000円、半分以下では大幅減額となります。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。' }, { q: '白州18年に偽物・贋作はありますか？', a: '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合は専門知識を持つ買取業者（JOYLAB等）で鑑定査定を依頼してください。' }, { q: '白州18年の保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' }, { q: '白州18年は税金がかかりますか？', a: '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '白州18年を売るタイミングはいつがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" }, { q: '白州18年と他の銘柄、どっちを先に売るべき？', a: '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' }].map((faq) => (
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

          <h2>白州18年の他の切り口で読む</h2>
          <p>白州18年についてさらに詳しく知りたい方は、以下の切り口別解説も合わせてご覧ください。</p>
          <ul>
              <li><Link href="/articles/hakushu-18-takaku-uru/" className="text-amber-dark hover:underline">白州18年の高く売る方法</Link></li>
              <li><Link href="/articles/hakushu-18-nisemono-mikata/" className="text-amber-dark hover:underline">白州18年の偽物の見分け方</Link></li>
              <li><Link href="/articles/hakushu-18-ranking/" className="text-amber-dark hover:underline">白州18年の買取業者ランキング</Link></li>
              <li><Link href="/articles/hakushu-18-rekishi/" className="text-amber-dark hover:underline">白州18年の歴史と特徴</Link></li>
              <li><Link href="/articles/hakushu-18-kihaku/" className="text-amber-dark hover:underline">白州18年の希少性・投資価値</Link></li>
              <li><Link href="/articles/hakushu-18-auction-suii/" className="text-amber-dark hover:underline">白州18年のオークション推移</Link></li>
              <li><Link href="/articles/hakushu-18-kaifu-zumi/" className="text-amber-dark hover:underline">白州18年の開封済みでも売れる</Link></li>
              <li><Link href="/articles/hakushu-18-hako-nashi/" className="text-amber-dark hover:underline">白州18年の箱なしでも買取</Link></li>
              <li><Link href="/articles/hakushu-18-label-yogore/" className="text-amber-dark hover:underline">白州18年のラベル汚れでも査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-55-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎55年 の買取相場</p><p className="text-xs text-warm-gray mt-1">参考 3,000万円</p></Link>
            <Link href="/articles/hanyu-card-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">羽生カードシリーズ の買取相場</p><p className="text-xs text-warm-gray mt-1">参考 3,000万円</p></Link>
            <Link href="/articles/ichirosu-card-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">イチローズモルト カードシリーズ の買取相場</p><p className="text-xs text-warm-gray mt-1">参考 1,500万円</p></Link>
            <Link href="/articles/karuizawa-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">軽井沢30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">参考 800万円</p></Link>
            <Link href="/articles/chichibu-the-first-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">秩父ザファースト の買取相場</p><p className="text-xs text-warm-gray mt-1">参考 350万円</p></Link>
            <Link href="/articles/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">軽井沢12年 の買取相場</p><p className="text-xs text-warm-gray mt-1">参考 150万円</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の相場は2026年5月13日時点の参考値です。最新の査定額は各業者にお問い合わせください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
