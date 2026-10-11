import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hakushu-nv.json";

export const metadata: Metadata = {
  title: '【毎週更新】白州ノンエイジの買取価格｜ヤフオク落札中央値10,051円基準【2026年10月】',
  description: '白州ノンエイジの買取相場は10,051円が目安（毎週月曜更新・ヤフオク実落札の中央値・過去180日のIQR外れ値除去後、n=230件）。箱なし・開封済み等の状態別の査定目安、買取業者3社の比較、高く売るコツまで実データで解説。買取店3社の掲示価格比較と2年分の買取価格推移も掲載。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '今の白州ノンエイジの買取相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": '白州ノンエイジのヤフオク実落札（過去180日・IQR外れ値除去）の中央値は10,051円です（サンプル数 n=230、取得日 2026-10-05・毎週月曜に自動更新）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' } }, { "@type": "Question", "name": '白州ノンエイジの買取価格はお店によって違いますか？', "acceptedAnswer": { "@type": "Answer", "text": '違います。2026-10-11 に各店の公開ページで確認した掲示価格は、LINXAS（リンクサス） 9,700円（白州ノンエイジ 700ml・2026-06-06更新）、ファイブニーズ 9,500円（白州NV 700ml・2026-09-30更新）、サケウル（STOCK LAB） 9,000〜10,000円（白州 NV／NV 100周年・2026-10-09更新）でした。ボトルの仕様や付属品、店の在庫状況でも変わるため、売る前に複数の店で査定を取って比べてください。' } }, { "@type": "Question", "name": '「白州 年代指定なし」と白州ノンエイジは同じものですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、同じものです。「白州 年代指定なし」「白州 NV」は、熟成年数の表記がないボトル＝白州ノンエイジを指す表記ゆれです。本ページの相場（10,051円）がそのまま目安になります。' } }, { "@type": "Question", "name": '白州ノンエイジを高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' } }, { "@type": "Question", "name": '白州ノンエイジの開封済みでも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、可能です。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅減額となる傾向があります（業者により評価基準が異なります）。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。実際の査定額は各業者ページでご確認ください。' } }, { "@type": "Question", "name": '白州ノンエイジは箱無しでも買取してもらえますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約8,040〜9,050円）で、完品と比べ1〜2割の減額にとどまります。冊子やカートンが部分的に残っている場合は一緒に査定に出すと評価されます。減額幅は業者により異なるため、箱なしの場合こそ複数社の相見積もりがおすすめです。' } }, { "@type": "Question", "name": '白州ノンエイジに偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合はお酒買取の専門知識を持つ業者で鑑定査定を依頼してください。' } }, { "@type": "Question", "name": '白州ノンエイジの保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' } }, { "@type": "Question", "name": '白州ノンエイジは税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '白州ノンエイジを売るタイミングはいつがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" } }, { "@type": "Question", "name": '白州ノンエイジと他の銘柄、どっちを先に売るべき？', "acceptedAnswer": { "@type": "Answer", "text": '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. 白州ノンエイジの概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "store-prices", label: "4-2. 買取店の掲示価格・推移・定価" },
  { id: "state-price", label: "5. 状態別の業界目安" },
  { id: "price-reasons", label: "6. なぜこの価格になるのか" },
  { id: "auction", label: "7. オークション落札データ" },
  { id: "takaku-uru", label: "8. 高く売る7つの実践テクニック" },
  { id: "fake", label: "9. 偽物・贋作の見分け方" },
  { id: "partners", label: "10. おすすめ買取業者3社" },
  { id: "process", label: "11. 売却プロセス5ステップ" },
  { id: "faq", label: "12. よくある質問" },
];

export default function HakushuNvKaitoriPage() {
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
            <li><span className="text-foreground">白州ノンエイジ</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hakushu-nv.png" alt="白州ノンエイジの買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州ノンエイジの買取相場と業者比較ガイド【2026年10月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-05 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

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

          <h2 id="summary">1. 白州ノンエイジの概要</h2>

          <p>白州ノンエイジはジャパニーズウイスキーを代表する銘柄の1つで、白州蒸溜所が手がけるノンエイジ（NV）のボトルです。白州ノンエイジ。森のウイスキー。</p>

          <p>なお、白州ノンエイジはラベルに熟成年数の表記がないボトルで、オークションや買取店では「<strong>白州 年代指定なし</strong>」「<strong>白州 NV（ノンヴィンテージ）</strong>」とも表記されます。いずれも本ページの相場が目安になります。</p>

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 「12年」など熟成年数の表記がある白州をお探しの方はこちら → <Link href="/articles/hakushu-12-kaitori/" className="text-amber-dark underline font-bold">白州12年の買取相場ガイド</Link></p>
          </div>


          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。白州ノンエイジは希少度<strong>コモン</strong>クラスに位置し、現行品として安定流通しているが、銘柄によってはプレミア化の兆しあり。市場価値は中位だが、コレクター入門品として安定需要を持つ。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>白州蒸溜所</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>ノンエイジ（NV）</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>43%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>コモン</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>10,051円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. 白州蒸溜所の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-japanese.png" alt="白州蒸溜所の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>1973年（昭和48年）創業、サントリーが山梨県北杜市・南アルプス山系の麓に開設した蒸溜所。標高約700メートルの森林に囲まれた立地と、ミネラル分の少ない軟水を使用。「森のウイスキー」と称される爽やかで軽快な味わいが特徴。</p>

          <p>白州蒸溜所が生み出すジャパニーズウイスキーは、世界の主要品評会で度々受賞しており、二次流通市場でも継続的に高値で取引されています。蒸溜所の歴史と職人技術が、白州ノンエイジのような銘柄の市場価値を支えています。</p>

          <p>同じ蒸溜所の他の銘柄や、同年代の他銘柄との関連性を知ることで、白州ノンエイジの市場における立ち位置がより明確になります。下の関連銘柄リンクから他のグレード・他蒸溜所の銘柄も合わせてチェックすることをおすすめします。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>白州ノンエイジの味わいは、ノンエイジ（NV）の熟成期間中に樽から溶け出した成分と、白州蒸溜所独自の蒸溜技術が複雑に交差したものです。</p>

          <p>フレッシュなフルーツの香り、リンゴ・梨・洋ナシのアロマが軽快に広がる。バニラ・蜂蜜の柔らかな甘み。フィニッシュは短〜中で、初心者にも飲みやすい繊細さ。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合、ボトルを開けずに保管することが価値維持の鉄則です。一度開けると、香味の揮発と空気接触による酸化が進み、二次流通市場での評価が大幅に下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>白州ノンエイジの市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>10,051円</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=230件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">白州ノンエイジの買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 640 210" role="img" aria-label="白州ノンエイジのヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              <line x1="66" y1="38.9" x2="622" y2="38.9" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="42.4" fontSize="10" fill="#807565" textAnchor="end">10,051</text>
              <line x1="66" y1="97.0" x2="622" y2="97.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="100.5" fontSize="10" fill="#807565" textAnchor="end">9,976</text>
              <line x1="66" y1="155.1" x2="622" y2="155.1" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="158.6" fontSize="10" fill="#807565" textAnchor="end">9,900</text>
              <polyline points="66.0,155.1 116.5,155.1 167.1,155.1 217.6,95.8 268.2,78.2 318.7,78.2 369.3,70.5 419.8,38.9 470.4,38.9 520.9,38.9 571.5,38.9 622.0,38.9" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66.0" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-07-20: 9,900円（サンプル n=190件）</title></circle>
              <circle cx="116.5" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-07-27: 9,900円（サンプル n=198件）</title></circle>
              <circle cx="167.1" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-03: 9,900円（サンプル n=204件）</title></circle>
              <circle cx="217.6" cy="95.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-10: 9,977円（サンプル n=212件）</title></circle>
              <circle cx="268.2" cy="78.2" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-17: 10,000円（サンプル n=218件）</title></circle>
              <circle cx="318.7" cy="78.2" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-24: 10,000円（サンプル n=220件）</title></circle>
              <circle cx="369.3" cy="70.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-31: 10,010円（サンプル n=220件）</title></circle>
              <circle cx="419.8" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-07: 10,051円（サンプル n=242件）</title></circle>
              <circle cx="470.4" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-14: 10,051円（サンプル n=230件）</title></circle>
              <circle cx="520.9" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-21: 10,051円（サンプル n=218件）</title></circle>
              <circle cx="571.5" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-28: 10,051円（サンプル n=228件）</title></circle>
              <circle cx="622.0" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-05: 10,051円（サンプル n=230件）</title></circle>
              <text x="618.0" y="28.9" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">10,051円</text>
              <text x="66.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">7/20</text>
              <text x="318.7" y="198" fontSize="10" fill="#807565" textAnchor="middle">8/24</text>
              <text x="622.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">10/5</text>
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">期間 2026-07-20〜2026-10-05（週次12点・各点のサンプル数 n=190〜242件）。出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜自動更新。買取額を保証するものではありません。</p>
          </div>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、**最低3社、できれば4社以上で相見積もり**を取ることをおすすめします。</p>

          <p>本サイトでは下記の3業者ページへのリンクを参考として提示しています（各社の最新の査定額・キャンペーンは直接ご確認ください）:</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 総合買取の大手、お酒査定にも対応</li>
          </ul>

          <h3 id="store-prices">白州ノンエイジの買取店の掲示価格（店舗別比較・2026年10月11日確認）</h3>

          <p>各店が自社サイトに公開している白州ノンエイジの参考買取価格を、PeatBid編集部が 2026-10-11 に各ページで確認した値です。「店舗側の更新日」は各ページに書かれている価格の更新日です。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">白州ノンエイジ 700ml<br /><span className="text-warm-gray text-xs">箱あり・箱なし同額</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">9,700円</td><td className="py-2 pr-3 whitespace-nowrap">2026-06-06</td><td className="py-2"><a href="https://linxas.shop/whiskey/hakushu/hakushunon-age/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ファイブニーズ</td><td className="py-2 pr-3">白州NV 700ml<br /><span className="text-warm-gray text-xs">参考買取価格</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">9,500円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hakusyu_brand/hakusyunv/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">サケウル（STOCK LAB）</td><td className="py-2 pr-3">白州 NV／NV 100周年<br /><span className="text-warm-gray text-xs">2種とも同レンジ</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">9,000〜10,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-09</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">白州ノンエイジ 180ml<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">1,800円</td><td className="py-2 pr-3 whitespace-nowrap">2026-02-14</td><td className="py-2"><a href="https://linxas.shop/whiskey/hakushu/hakushunon-age/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          <p>標準的な700mlボトルの掲示価格は <strong>9,000〜10,000円</strong> で、PeatBid が集計しているヤフオク落札中央値 <strong>10,051円</strong>（取得日 2026-10-05）の <strong>90〜99%</strong> にあたります。中央値は個人間の落札額、掲示価格は店がその場で買い取る額なので、両方を並べると「店に売るといくらになりそうか」の見当がつきます。</p>
          

          <h3 id="store-trend">白州ノンエイジの買取価格の推移（店舗の掲示価格・約2年分）</h3>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">白州NV 700ml 参考買取価格の月次推移（ファイブニーズ掲示・2024年7月〜2026年9月）</p>
            <svg viewBox="0 0 640 205" role="img" aria-label="白州ノンエイジの買取店掲示価格の月次推移グラフ" className="w-full h-auto">
              <line x1="70" y1="30.0" x2="622" y2="30.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="33.5" fontSize="10" fill="#807565" textAnchor="end">9,500</text>
              <line x1="70" y1="95.0" x2="622" y2="95.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="98.5" fontSize="10" fill="#807565" textAnchor="end">9,000</text>
              <line x1="70" y1="160.0" x2="622" y2="160.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="163.5" fontSize="10" fill="#807565" textAnchor="end">8,500</text>
              <polyline points="70.0,30.0 91.2,30.0 112.5,95.0 133.7,95.0 154.9,95.0 176.2,95.0 197.4,95.0 218.6,95.0 239.8,121.0 261.1,121.0 282.3,95.0 303.5,160.0 324.8,160.0 346.0,134.0 367.2,121.0 388.5,134.0 409.7,121.0 430.9,95.0 452.2,121.0 473.4,121.0 494.6,95.0 515.8,95.0 537.1,95.0 558.3,95.0 579.5,30.0 600.8,30.0 622.0,30.0" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="70.0" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年7月: 9,500円</title></circle>
              <circle cx="91.2" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年8月: 9,500円</title></circle>
              <circle cx="112.5" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年9月: 9,000円</title></circle>
              <circle cx="133.7" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年10月: 9,000円</title></circle>
              <circle cx="154.9" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年11月: 9,000円</title></circle>
              <circle cx="176.2" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年12月: 9,000円</title></circle>
              <circle cx="197.4" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年1月: 9,000円</title></circle>
              <circle cx="218.6" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年2月: 9,000円</title></circle>
              <circle cx="239.8" cy="121.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年3月: 8,800円</title></circle>
              <circle cx="261.1" cy="121.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年4月: 8,800円</title></circle>
              <circle cx="282.3" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年5月: 9,000円</title></circle>
              <circle cx="303.5" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年6月: 8,500円</title></circle>
              <circle cx="324.8" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年7月: 8,500円</title></circle>
              <circle cx="346.0" cy="134.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年8月: 8,700円</title></circle>
              <circle cx="367.2" cy="121.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年9月: 8,800円</title></circle>
              <circle cx="388.5" cy="134.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年10月: 8,700円</title></circle>
              <circle cx="409.7" cy="121.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年11月: 8,800円</title></circle>
              <circle cx="430.9" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年12月: 9,000円</title></circle>
              <circle cx="452.2" cy="121.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年1月: 8,800円</title></circle>
              <circle cx="473.4" cy="121.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年2月: 8,800円</title></circle>
              <circle cx="494.6" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年3月: 9,000円</title></circle>
              <circle cx="515.8" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年4月: 9,000円</title></circle>
              <circle cx="537.1" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年5月: 9,000円</title></circle>
              <circle cx="558.3" cy="95.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年6月: 9,000円</title></circle>
              <circle cx="579.5" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年7月: 9,500円</title></circle>
              <circle cx="600.8" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年8月: 9,500円</title></circle>
              <circle cx="622.0" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年9月: 9,500円</title></circle>
              <text x="70.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2024年7月</text>
              <text x="346.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2025年8月</text>
              <text x="622.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2026年9月</text>
              
            </svg>
            <p className="text-[12px] text-ink leading-relaxed mt-2">2024年7月 9,500円 → 2026年9月 9,500円（期間中の最高 9,500円・最低 8,500円）。</p>
            <details className="mt-2 text-[12px] text-warm-gray">
              <summary className="cursor-pointer">月別の数値を表で見る（27か月）</summary>
              <table className="mt-2"><tbody><tr><td className="py-1 pr-4">2024年7月</td><td className="py-1 text-right">9,500円</td></tr><tr><td className="py-1 pr-4">2024年8月</td><td className="py-1 text-right">9,500円</td></tr><tr><td className="py-1 pr-4">2024年9月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2024年10月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2024年11月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2024年12月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2025年1月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2025年2月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2025年3月</td><td className="py-1 text-right">8,800円</td></tr><tr><td className="py-1 pr-4">2025年4月</td><td className="py-1 text-right">8,800円</td></tr><tr><td className="py-1 pr-4">2025年5月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2025年6月</td><td className="py-1 text-right">8,500円</td></tr><tr><td className="py-1 pr-4">2025年7月</td><td className="py-1 text-right">8,500円</td></tr><tr><td className="py-1 pr-4">2025年8月</td><td className="py-1 text-right">8,700円</td></tr><tr><td className="py-1 pr-4">2025年9月</td><td className="py-1 text-right">8,800円</td></tr><tr><td className="py-1 pr-4">2025年10月</td><td className="py-1 text-right">8,700円</td></tr><tr><td className="py-1 pr-4">2025年11月</td><td className="py-1 text-right">8,800円</td></tr><tr><td className="py-1 pr-4">2025年12月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2026年1月</td><td className="py-1 text-right">8,800円</td></tr><tr><td className="py-1 pr-4">2026年2月</td><td className="py-1 text-right">8,800円</td></tr><tr><td className="py-1 pr-4">2026年3月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2026年4月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2026年5月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2026年6月</td><td className="py-1 text-right">9,000円</td></tr><tr><td className="py-1 pr-4">2026年7月</td><td className="py-1 text-right">9,500円</td></tr><tr><td className="py-1 pr-4">2026年8月</td><td className="py-1 text-right">9,500円</td></tr><tr><td className="py-1 pr-4">2026年9月</td><td className="py-1 text-right">9,500円</td></tr></tbody></table>
            </details>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: <a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hakusyu_brand/hakusyunv/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズ「白州NV 700ml 参考買取価格」の価格推移グラフ</a>（同ページ掲載のグラフの値を転記）。店舗の参考価格であり、実際の買取額を保証するものではありません。</p>
          </div>

          <p className="text-sm font-bold mt-6">ファイブニーズが公開している買取実績（抜粋）</p>
          <ul className="text-sm"><li>2026年5月25日　白州 NV 100周年記念蒸溜所ラベル 700ml　<strong>8,500円</strong></li><li>2025年8月27日　白州 NV 700ml　<strong>8,300円</strong></li><li>2025年7月9日　白州 NV 100周年記念蒸溜所ラベル 700ml　<strong>7,500円</strong></li><li>2025年4月12日　白州 NV 700ml　<strong>8,400円</strong></li><li>2024年11月9日　白州 NV 700ml　<strong>8,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hakusyu_brand/hakusyunv/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズの掲載ページ</a>（掲載されている実績のうち日付の新しいもの・価格差が分かるものを抜粋）</p>

          <h3 id="teika">白州ノンエイジの定価（メーカー希望小売価格）の推移</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">期間</th><th className="py-2 pr-3 text-right">希望小売価格（税別）</th><th className="py-2 pr-3">内容</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2024年4月〜2026年3月</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">7,000円</td><td className="py-2 pr-3">シングルモルト 白州 700ml（2024年4月1日出荷分から改定）</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14499.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2026年4月〜</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">7,500円</td><td className="py-2 pr-3">同上（2026年4月1日出荷分から改定・発表 2025-11-04 No.14932）</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14932.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr></tbody>
            </table>
          </div>
          <p>現在の希望小売価格 7,500円（税別）は税込 8,250円です。ヤフオク落札中央値 10,051円 はその <strong>1.22倍</strong>。定価で手に入れたボトルでも、売れば定価を上回る水準で取引されているということです。</p>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>白州ノンエイジの査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。**実際の査定額は業者により異なります**ので、最終的な金額は各業者のページからご確認ください。</p>

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
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td>市場相場の95〜100%程度</td><td><strong>約9,550〜10,050円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>市場相場の80〜90%程度</td><td><strong>約8,040〜9,050円</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td>市場相場の85〜95%程度</td><td><strong>約8,540〜9,550円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>市場相場の75〜88%程度</td><td><strong>約7,540〜8,840円</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td>市場相場の60〜75%程度</td><td><strong>約6,030〜7,540円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>市場相場の55〜70%程度</td><td><strong>約5,530〜7,040円</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td>市場相場の30〜40%程度</td><td><strong>約3,020〜4,020円</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td>市場相場の15〜25%程度</td><td><strong>約1,510〜2,510円</strong></td></tr>
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

          <h3 id="hako-nashi-souba">白州ノンエイジを箱なし・付属品なしで売る場合の買取相場</h3>

          <p>「白州ノンエイジ 買取 箱無し」とお調べの方向けの目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度（約8,040〜9,050円）</strong>。外箱・冊子の揃った完品と比べて1〜2割の減額にとどまるため、<strong>箱がなくても売却を諦める必要はありません</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって差が出ます。箱なしの場合こそ<strong>複数業者の相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品だけでも残っていれば一緒に査定へ</strong>（部分的でも評価されます）</li>
            <li>詳しくは<Link href="/articles/hakushu-nv-hako-nashi/" className="text-amber-dark hover:underline">白州ノンエイジは箱なしでも買取してもらえるかの徹底ガイド</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. なぜ白州ノンエイジはこの価格になるのか</h2>

          <p>白州ノンエイジの二次流通価格を決定づける主要な要因は5つあります:</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果が、日本の買取業者の仕入れ価格の基準となっています</li>
            <li><strong>需給バランスと供給制限</strong> — ノンエイジ（NV）の長期熟成銘柄は供給量が物理的に限られており、需要拡大に応じて価格が上昇しやすい構造</li>
            <li><strong>為替レートの影響</strong> — 円安局面では海外バイヤー（アジア富裕層・中華圏コレクター）の購買力が拡大し、国内相場も連動して上昇する傾向</li>
            <li><strong>白州蒸溜所の国際的評価</strong> — World Whiskies Awards、ISC等の品評会受賞歴が国際的需要を支え、長期保有のプレミアにつながる</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮シーズンに需要が高まり、相場が上昇する</li>
          </ol>

          <p>これらの要因を総合的に踏まえると、白州ノンエイジはコモンクラスの希少度を持つため、<strong>中長期で見れば価格安定〜上昇基調</strong>が予想されます。短期的な売り急ぎは避け、市場動向を見ながら最適なタイミングで売却するのが合理的です。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、白州ノンエイジクラスの銘柄が継続的に取引されています。主要オークションプラットフォームと、それぞれの特徴は以下の通りです:</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催、プレミアム銘柄中心。<br/><strong>Bonhams（香港・ロンドン）</strong>: 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次オンラインオークション、中位銘柄まで幅広く扱う。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次開催、コレクター向け。<br/><strong>Whisky Hammer（UK）</strong>: 月次オンライン、新興プレイヤー。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」アーカイブで閲覧可能です。日本の買取業者の査定額は、これらの海外データを基準に、輸送コスト・関税・業者マージンを考慮して算出されています。</p>

          <p>PeatBid がヤフオク落札中央値の週次集計を始めた 2026-05-25 時点の白州ノンエイジは <strong>10,001円</strong>（n=290）、最新の 2026-10-05 は <strong>10,051円</strong>（n=230）で、この間の変化は <strong>+0.5%</strong> です（出典: PeatBid 集計・<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">算出方法</Link>）。集計期間が20週分のため、数年単位の値動きはこのデータからは言えません。</p>


          <h2 id="takaku-uru">8. 白州ノンエイジを高く売る7つの実践テクニック</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを必ず揃える</strong> — 付属品の有無で査定額が10〜20%変動。シミ・破れがあると更に評価減</li>
            <li><strong>未開封の状態を維持する</strong> — 開封済みは査定額が大幅減（20〜40%）。コレクション目的なら絶対に開けない</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により数万〜数十万円の差。ヒカカク等の一括査定+専門店個別査定の組み合わせが鉄則</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置き保管。湿度・温度の急激な変化はNG</li>
            <li><strong>売却タイミングを見極める</strong> — 年末年始・お中元・お歳暮シーズンが高値傾向。海外オークション結果直後も相場上昇のチャンス</li>
            <li><strong>ボトリング年代を業者に伝える</strong> — 古いラベル・ロット番号は希少価値が乗ることがある</li>
            <li><strong>状態を写真で記録</strong> — 事前に複数角度から撮影し、業者比較・トラブル防止に活用</li>
          </ol>

          <h2 id="fake">9. 白州ノンエイジの偽物・贋作の見分け方</h2>

          <p>白州ノンエイジのような流通価値のある銘柄では、贋作・偽造ボトルのリスクが存在します。本物を見抜くには以下の5つのチェックが有効です:</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で色ズレなし。贋作はにじみ・かすれ・フォント違いが見られる</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリー山崎・響等はホログラムシール付き。贋作は光の反射が不均一</li>
            <li><strong>液色と液面の状態</strong> — 本物は均一な琥珀色（透明感あり）。贋作は色ムラ・濁り・沈殿物</li>
            <li><strong>瓶の形状と底面刻印</strong> — 正規品は底面にロット番号・製造所コードあり。贋作は刻印なし or 不自然</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークション経由は信頼度高。個人間取引（メルカリ・ヤフオク）は要注意</li>
          </ol>

          <div className="bg-burgundy/5 border border-burgundy/30 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔍 売却前の真贋確認はこちら → <Link href="/articles/hakushu-nv-nisemono-mikata/" className="kaitori-to-shingan text-amber-dark underline font-bold">白州ノンエイジを売る前に｜本物チェックと今の買取相場（3分チェック）</Link></p>
          </div>

          <p>怪しいと思ったら、お酒買取の専門店で**鑑定査定**を依頼するのが最も確実です。専門業者は本物・贋作の判定経験が豊富で、無料で見抜いてくれます。</p>

          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が白州ノンエイジクラスの銘柄に強い買取業者を厳選しました。それぞれ得意領域が異なるため、目的別に使い分けるのがコツです。</p>

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
                <tr><td><strong>リカスタ</strong></td><td>宅配買取</td><td>2〜5日</td><td>★★★★</td><td>無料</td></tr>
              </tbody>
            </table>
          </div>

          {/* Decision flowchart */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-6 not-prose">
            <p className="font-bold text-base mb-3 text-ink">🎯 どの業者を選ぶべきか</p>
            <ul className="space-y-2 text-sm text-ink/85">
              <li>✓ <strong>最高値を狙いたい</strong> → まずヒカカクで一括査定し、専門店で個別査定して比較</li>
              <li>✓ <strong>急いで現金化したい</strong> → バイセルの店頭買取（即日現金化）</li>
              <li>✓ <strong>地方在住・宅配で完結したい</strong> → リカスタの宅配買取</li>
              <li>✓ <strong>希少銘柄を専門家に見てほしい</strong> → お酒買取専門店の個別査定</li>
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
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">3位: リカスタ</h3>
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

          <p>白州ノンエイジを売却する際の標準的なプロセスを5ステップでまとめました:</p>

          <ol>
            <li><strong>状態確認・付属品準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃える</li>
            <li><strong>事前相場リサーチ</strong> — PeatBidなどで現在の相場を確認し、自分のボトルの目安価格を把握</li>
            <li><strong>複数業者で見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒買取の専門店に個別で2〜3社、計5〜8社で見積もり取得</li>
            <li><strong>査定額比較・業者選定</strong> — 最高値だけでなく、手数料・キャンセル料・送料・支払い方法を総合判断</li>
            <li><strong>売却契約・入金確認</strong> — 売却契約後、店頭買取なら即日現金、宅配買取なら1〜3営業日で銀行振込</li>
          </ol>

          <p>このプロセス全体で<strong>1〜2週間</strong>を見込めば、最適なタイミングで売却できます。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州ノンエイジの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">12. 白州ノンエイジに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '今の白州ノンエイジの買取相場はいくらですか？', a: '白州ノンエイジのヤフオク実落札（過去180日・IQR外れ値除去）の中央値は10,051円です（サンプル数 n=230、取得日 2026-10-05・毎週月曜に自動更新）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' }, { q: '白州ノンエイジの買取価格はお店によって違いますか？', a: '違います。2026-10-11 に各店の公開ページで確認した掲示価格は、LINXAS（リンクサス） 9,700円（白州ノンエイジ 700ml・2026-06-06更新）、ファイブニーズ 9,500円（白州NV 700ml・2026-09-30更新）、サケウル（STOCK LAB） 9,000〜10,000円（白州 NV／NV 100周年・2026-10-09更新）でした。ボトルの仕様や付属品、店の在庫状況でも変わるため、売る前に複数の店で査定を取って比べてください。' }, { q: '「白州 年代指定なし」と白州ノンエイジは同じものですか？', a: 'はい、同じものです。「白州 年代指定なし」「白州 NV」は、熟成年数の表記がないボトル＝白州ノンエイジを指す表記ゆれです。本ページの相場（10,051円）がそのまま目安になります。' }, { q: '白州ノンエイジを高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' }, { q: '白州ノンエイジの開封済みでも買取できますか？', a: 'はい、可能です。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅減額となる傾向があります（業者により評価基準が異なります）。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。実際の査定額は各業者ページでご確認ください。' }, { q: '白州ノンエイジは箱無しでも買取してもらえますか？', a: 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約8,040〜9,050円）で、完品と比べ1〜2割の減額にとどまります。冊子やカートンが部分的に残っている場合は一緒に査定に出すと評価されます。減額幅は業者により異なるため、箱なしの場合こそ複数社の相見積もりがおすすめです。' }, { q: '白州ノンエイジに偽物・贋作はありますか？', a: '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合はお酒買取の専門知識を持つ業者で鑑定査定を依頼してください。' }, { q: '白州ノンエイジの保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' }, { q: '白州ノンエイジは税金がかかりますか？', a: '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '白州ノンエイジを売るタイミングはいつがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" }, { q: '白州ノンエイジと他の銘柄、どっちを先に売るべき？', a: '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' }].map((faq) => (
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

          <h2>白州ノンエイジの他の切り口で読む</h2>
          <p>白州ノンエイジについてさらに詳しく知りたい方は、以下の切り口別解説も合わせてご覧ください。</p>
          <ul>
              <li><Link href="/articles/hakushu-nisemono-mikata/" className="text-amber-dark hover:underline font-bold">白州（全種）の偽物の見分け方・真贋ハブ</Link></li>
              <li><Link href="/articles/hakushu-nv-takaku-uru/" className="text-amber-dark hover:underline">白州ノンエイジの高く売る方法</Link></li>
              <li><Link href="/articles/hakushu-nv-nisemono-mikata/" className="text-amber-dark hover:underline">白州ノンエイジの売る前チェック（真贋と相場）</Link></li>
              <li><Link href="/articles/hakushu-nv-ranking/" className="text-amber-dark hover:underline">白州ノンエイジの買取業者ランキング</Link></li>
              <li><Link href="/articles/hakushu-nv-rekishi/" className="text-amber-dark hover:underline">白州ノンエイジの歴史と特徴</Link></li>
              <li><Link href="/articles/hakushu-nv-kihaku/" className="text-amber-dark hover:underline">白州ノンエイジの希少性・投資価値</Link></li>
              <li><Link href="/articles/hakushu-nv-auction-suii/" className="text-amber-dark hover:underline">白州ノンエイジのオークション推移</Link></li>
              <li><Link href="/articles/hakushu-nv-kaifu-zumi/" className="text-amber-dark hover:underline">白州ノンエイジの開封済みでも売れる</Link></li>
              <li><Link href="/articles/hakushu-nv-hako-nashi/" className="text-amber-dark hover:underline">白州ノンエイジの箱なしでも買取</Link></li>
              <li><Link href="/articles/hakushu-nv-label-yogore/" className="text-amber-dark hover:underline">白州ノンエイジのラベル汚れでも査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/hibiki-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">響30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 536,800円</p></Link>
            <Link href="/articles/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市20年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 221,100円</p></Link>
            <Link href="/articles/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">竹鶴25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 192,300円</p></Link>
            <Link href="/articles/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎18年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 92,400円</p></Link>
            <Link href="/articles/yoichi-15-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市15年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 80,000円</p></Link>
            <Link href="/articles/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">軽井沢12年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 76,975円</p></Link>
          </div>

          <h2>年代指定なし・注目銘柄の買取相場</h2>
          <p>「年代指定なし（ノンエイジ／NV）」で検索されやすい主要銘柄の実勢買取相場です。ジャパニーズ・スコッチを横断して毎週更新しています。</p>
          <ul>
              <li><Link href="/articles/yamazaki-nv-kaitori/" className="text-amber-dark hover:underline">山崎ノンエイジ（NV・年代指定なし）の買取相場</Link></li>
              <li><Link href="/articles/glenfarclas-105-kaitori/" className="text-amber-dark hover:underline">グレンファークラス105（カスクストレングス・年代指定なし）の買取相場</Link></li>
              <li><Link href="/articles/glenfarclas-nv-kaitori/" className="text-amber-dark hover:underline">グレンファークラスの年代指定なし（NV）の買取相場</Link></li>
              <li><Link href="/articles/springbank-nv-kaitori/" className="text-amber-dark hover:underline">スプリングバンクの年代指定なし（NV）の買取相場</Link></li>
              <li><Link href="/articles/bowmore-nv-kaitori/" className="text-amber-dark hover:underline">ボウモアの年代指定なし（NV）の買取相場</Link></li>
              <li><Link href="/articles/ardbeg-nv-kaitori/" className="text-amber-dark hover:underline">アードベッグの年代指定なし（NV）の買取相場</Link></li>
              <li><Link href="/articles/talisker-nv-kaitori/" className="text-amber-dark hover:underline">タリスカーの年代指定なし（NV）の買取相場</Link></li>
              <li><Link href="/articles/laphroaig-nv-kaitori/" className="text-amber-dark hover:underline">ラフロイグの年代指定なし（NV）の買取相場</Link></li>
              <li><Link href="/articles/glenfiddich-30-kaitori/" className="text-amber-dark hover:underline">グレンフィディック30年の買取相場</Link></li>
              <li><Link href="/articles/glenfiddich-kaitori/" className="text-amber-dark hover:underline">グレンフィディック（年代別の一覧）の買取相場</Link></li>
              <li><Link href="/articles/glenmorangie-kaitori/" className="text-amber-dark hover:underline">グレンモーレンジ（ラインナップ別の一覧）の買取相場</Link></li>
          </ul>

          <h2>熟成年数の表記がないボトルをお持ちの方へ</h2>
          <p>ラベルに「12年」「25年」などの表記がないボトルは、買取店では「年代指定なし」「ノンエイジ」「NV（ノンヴィンテージ）」と呼ばれ、年数入りのボトルとは相場が別に付きます。銘柄ごとの相場は下記のページにまとめています。</p>
          <ul>
              <li><Link href="/articles/yamazaki-nv-kaitori/" className="text-amber-dark hover:underline">山崎の年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/hibiki-nv-kaitori/" className="text-amber-dark hover:underline">響の年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/yoichi-nv-kaitori/" className="text-amber-dark hover:underline">余市の年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/miyagikyo-nv-kaitori/" className="text-amber-dark hover:underline">宮城峡の年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/bowmore-nv-kaitori/" className="text-amber-dark hover:underline">ボウモアの年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/ardbeg-nv-kaitori/" className="text-amber-dark hover:underline">アードベッグの年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/laphroaig-nv-kaitori/" className="text-amber-dark hover:underline">ラフロイグの年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/talisker-nv-kaitori/" className="text-amber-dark hover:underline">タリスカーの年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/glenfarclas-nv-kaitori/" className="text-amber-dark hover:underline">グレンファークラスの年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/springbank-nv-kaitori/" className="text-amber-dark hover:underline">スプリングバンクの年代指定なし（ノンエイジ／NV）買取相場</Link></li>
              <li><Link href="/articles/taketsuru-pure-kaitori/" className="text-amber-dark hover:underline">竹鶴の年代指定なし（ノンエイジ／NV）買取相場</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-05）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
