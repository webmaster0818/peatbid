import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hibiki-30.json";

export const metadata: Metadata = {
  title: '響30年の買取相場【2026年10月最新】535,125円｜8店の価格比較・新型/旧型/有田焼別',
  description: '響30年の買取相場は535,125円が目安（Yahoo Auctions 過去180日落札中央値ベース）。箱なし・開封済み等の状態別の買取価格目安、買取業者3社の比較、高く売るコツ、贋作リスクまで網羅。響30年を売る前に読む決定版ガイド。8店の掲示価格・実績、有田焼/九谷焼、空き瓶、税金も掲載。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '響30年の市場相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": '響30年の市場相場は535,125円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=124、取得日 2026-10-12）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' } }, { "@type": "Question", "name": '響30年の買取価格はお店によって違いますか？', "acceptedAnswer": { "@type": "Answer", "text": '違います。2026-10-15 に各店の公開ページで確認した掲示価格は、LINXAS（リンクサス） 530,000円（響30年 新型 ホログラム緑シール付き・2026-09-30更新）、ファイブニーズ 527,000円（響30年 700ml・2026-09-30更新）、サケウル（STOCK LAB） 475,000〜476,000円（響30年 ホログラムシールあり・2026-10-15更新）でした。ボトルの仕様や付属品、店の在庫状況でも変わるため、売る前に複数の店で査定を取って比べてください。' } }, { "@type": "Question", "name": '響30年を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' } }, { "@type": "Question", "name": '響30年の開封済みでも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、可能です。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅減額となる傾向があります（業者により評価基準が異なります）。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。実際の査定額は各業者ページでご確認ください。' } }, { "@type": "Question", "name": '響30年は箱無しでも買取してもらえますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約428,100〜481,610円）で、完品と比べ1〜2割の減額にとどまります。冊子やカートンが部分的に残っている場合は一緒に査定に出すと評価されます。減額幅は業者により異なるため、箱なしの場合こそ複数社の相見積もりがおすすめです。' } }, { "@type": "Question", "name": '響30年に偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合はお酒買取の専門知識を持つ業者で鑑定査定を依頼してください。' } }, { "@type": "Question", "name": '響30年の保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' } }, { "@type": "Question", "name": '響30年は税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'かかる場合があります。国税庁（タックスアンサー No.3105）は、家具・衣服など生活に通常必要な動産の売却は課税しないとする一方、「貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるもの」は除くとしています。ウイスキーがこの「書画、骨とうなど」に当たるかは同ページに書かれていませんが、響30年は1本で30万円を超えて取引されるため、非課税と決めつけず確認が必要です。課税される場合は総合課税の譲渡所得で、売却額−(取得費＋譲渡費用)から特別控除50万円（その年の譲渡益の合計から）を引き、5年を超えて持っていた分は半分だけが課税対象です（No.3152）。会社員（給与1か所）は給与・退職所得以外の所得の合計が20万円を超えると確定申告が必要です（No.1900）。個別の判断は税務署・税理士にご確認ください。' } }, { "@type": "Question", "name": '響30年の空き瓶や空箱だけでも売れますか？', "acceptedAnswer": { "@type": "Answer", "text": '店によります。LINXAS は響30年の空き瓶の買取実績を公開しており、2022-03-10〜2025-09-05 の7件で 2,500円〜20,000円でした（観音開きの空き瓶 20,000円、箱付きの空き瓶 12,000円など）。一方、バイセルは開封済みの響は基本的に買取が難しいとしています。空き瓶の実績を公開している店に事前に確認してください。' } }, { "@type": "Question", "name": '響30年の有田焼・九谷焼ボトルはいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": '陶器ボトルは通常のボトルと別の限定品で、バイセルは有田焼ボトルを〜998,700円（2025年11月時点の上限目安）、買取大吉は有田焼90万〜120万円・九谷焼110万円以上（日付表記なし・記事公開2025-12-31）としています。専門店の響30年ページには陶器ボトルの掲示価格が無く、時点の古い値なので、個別に査定を取ってください。' } }, { "@type": "Question", "name": '響30年を売るタイミングはいつがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" } }, { "@type": "Question", "name": '響30年と他の銘柄、どっちを先に売るべき？', "acceptedAnswer": { "@type": "Answer", "text": '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. 響30年の概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "store-prices", label: "4-2. 買取店の掲示価格・推移・定価" },
  { id: "toki-bottle", label: "4-3. 有田焼・九谷焼ボトル" },
  { id: "state-price", label: "5. 状態別の業界目安" },
  { id: "price-reasons", label: "6. なぜこの価格になるのか" },
  { id: "auction", label: "7. オークション落札データ" },
  { id: "takaku-uru", label: "8. 高く売る7つの実践テクニック" },
  { id: "fake", label: "9. 偽物・贋作の見分け方" },
  { id: "shinkyu", label: "9-2. 新型・旧型の見分け方" },
  { id: "partners", label: "10. おすすめ買取業者3社" },
  { id: "process", label: "11. 売却プロセス5ステップ" },
  { id: "akibin", label: "11-2. 空き瓶・空箱の買取" },
  { id: "zeikin", label: "11-3. 売ったときの税金" },
  { id: "faq", label: "12. よくある質問" },
];

export default function Hibiki30KaitoriPage() {
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
            <li><span className="text-foreground">響30年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hibiki-30.png" alt="響30年の買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">響30年の買取相場と業者比較ガイド【2026年10月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-15 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

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

          <h2 id="summary">1. 響30年の概要</h2>

          <p>響30年はジャパニーズウイスキーを代表する銘柄の1つで、サントリーが手がける30年熟成のボトルです。響30年。ジャパニーズウイスキーの最高峰の一本。</p>

          

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 年代表記のない「響」（Japanese Harmony等のNV）をお探しの方はこちら → <Link href="/articles/hibiki-nv-kaitori/" className="text-amber-dark underline font-bold">響ノンエイジの買取相場ガイド</Link></p>
          </div>


          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。響30年は希少度<strong>ウルトラ</strong>クラスに位置し、極めて希少な長期熟成銘柄。Sotheby's・Bonhamsなどの海外オークションでの落札データが査定の基準となり、富裕層・コレクターの主要ターゲット。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>サントリー</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>30年熟成</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>43%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>ウルトラ</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>535,125円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. サントリーの歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-japanese.png" alt="サントリーの蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>1899年創業のサントリーホールディングスは、日本最大のウイスキーメーカー。山崎・白州・知多の3つの蒸溜所を運営し、響をはじめとするブレンデッドウイスキーで国際的評価を確立している。</p>

          <p>サントリーが生み出すジャパニーズウイスキーは、世界の主要品評会で度々受賞しており、二次流通市場でも継続的に高値で取引されています。蒸溜所の歴史と職人技術が、響30年のような銘柄の市場価値を支えています。</p>

          <p>同じ蒸溜所の他の銘柄や、同年代の他銘柄との関連性を知ることで、響30年の市場における立ち位置がより明確になります。下の関連銘柄リンクから他のグレード・他蒸溜所の銘柄も合わせてチェックすることをおすすめします。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>響30年の味わいは、30年熟成の熟成期間中に樽から溶け出した成分と、サントリー独自の蒸溜技術が複雑に交差したものです。</p>

          <p>深いシェリー樽由来のドライフルーツケーキ、ダークチョコレート、煙草の葉、ミズナラ独特のオリエンタルな香り。複雑性が極まり、フィニッシュは数分続く。長期熟成の真髄。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合、ボトルを開けずに保管することが価値維持の鉄則です。一度開けると、香味の揮発と空気接触による酸化が進み、二次流通市場での評価が大幅に下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>響30年の市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>535,125円</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=124件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">響30年の買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 640 210" role="img" aria-label="響30年のヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              <line x1="66" y1="38.9" x2="622" y2="38.9" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="42.4" fontSize="10" fill="#807565" textAnchor="end">537,350</text>
              <line x1="66" y1="97.0" x2="622" y2="97.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="100.5" fontSize="10" fill="#807565" textAnchor="end">534,325</text>
              <line x1="66" y1="155.1" x2="622" y2="155.1" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="158.6" fontSize="10" fill="#807565" textAnchor="end">531,300</text>
              <polyline points="66.0,70.6 116.5,70.6 167.1,155.1 217.6,86.9 268.2,129.2 318.7,49.5 369.3,54.8 419.8,38.9 470.4,49.5 520.9,49.5 571.5,49.5 622.0,81.6" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66.0" cy="70.6" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-07-27: 535,700円（サンプル n=62件）</title></circle>
              <circle cx="116.5" cy="70.6" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-03: 535,700円（サンプル n=62件）</title></circle>
              <circle cx="167.1" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-10: 531,300円（サンプル n=82件）</title></circle>
              <circle cx="217.6" cy="86.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-17: 534,850円（サンプル n=80件）</title></circle>
              <circle cx="268.2" cy="129.2" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-24: 532,650円（サンプル n=84件）</title></circle>
              <circle cx="318.7" cy="49.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-31: 536,800円（サンプル n=90件）</title></circle>
              <circle cx="369.3" cy="54.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-07: 536,525円（サンプル n=92件）</title></circle>
              <circle cx="419.8" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-14: 537,350円（サンプル n=104件）</title></circle>
              <circle cx="470.4" cy="49.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-21: 536,800円（サンプル n=106件）</title></circle>
              <circle cx="520.9" cy="49.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-28: 536,800円（サンプル n=120件）</title></circle>
              <circle cx="571.5" cy="49.5" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-05: 536,800円（サンプル n=116件）</title></circle>
              <circle cx="622.0" cy="81.6" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-12: 535,125円（サンプル n=124件）</title></circle>
              <text x="618.0" y="71.6" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">535,125円</text>
              <text x="66.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">7/27</text>
              <text x="318.7" y="198" fontSize="10" fill="#807565" textAnchor="middle">8/31</text>
              <text x="622.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">10/12</text>
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">期間 2026-07-27〜2026-10-12（週次12点・各点のサンプル数 n=62〜124件）。出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜自動更新。買取額を保証するものではありません。</p>
          </div>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、**最低3社、できれば4社以上で相見積もり**を取ることをおすすめします。</p>

          <p>本サイトでは下記の3業者ページへのリンクを参考として提示しています（各社の最新の査定額・キャンペーンは直接ご確認ください）:</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 総合買取の大手、お酒査定にも対応</li>
          </ul>

          <h3 id="store-prices">響30年の買取店の掲示価格（店舗別比較・2026年10月15日確認）</h3>

          <p>各店が自社サイトに公開している響30年の参考買取価格を、PeatBid編集部が 2026-10-15 に各ページで確認した値です。「店舗側の更新日」は各ページに書かれている価格の更新日です。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">響30年 新型 ホログラム緑シール付き<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">530,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">響30年 新型 ホログラム無し<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">470,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">響30年 旧型<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">400,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">響30年 観音開き<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">600,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">響30年 花鳥風月<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">660,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ファイブニーズ</td><td className="py-2 pr-3">響30年 700ml<br /><span className="text-warm-gray text-xs">参考買取価格</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">527,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hibiki_brand/hibiki30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">サケウル（STOCK LAB）</td><td className="py-2 pr-3">響30年 ホログラムシールあり<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">475,000〜476,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-15</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/hibiki/hibiki-age30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">サケウル（STOCK LAB）</td><td className="py-2 pr-3">響30年 ホログラムシールなし<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">460,000〜461,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-15</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/hibiki/hibiki-age30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">サケウル（STOCK LAB）</td><td className="py-2 pr-3">響30年<br /><span className="text-warm-gray text-xs">付属品欠如 or ダメージあり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">422,000〜423,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-15</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/hibiki/hibiki-age30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">JOYLAB（ジョイラボ）</td><td className="py-2 pr-3">響30年<br /><span className="text-warm-gray text-xs">ページ上部の買取価格＝2026/09/11 名古屋店の買取実績</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">525,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-11</td><td className="py-2"><a href="https://joylab.jp/japanwhiskey/suntory/hibiki/aged-30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">Life Vacation</td><td className="py-2 pr-3">響30年（種類の区別なし）<br /><span className="text-warm-gray text-xs">買取価格推移表の最新値・参考価格</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">530,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026年6月</td><td className="py-2"><a href="https://www.lv-liquor.com/whiskey/hibiki30nennkaitori.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">バイセル</td><td className="py-2 pr-3">響30年 現行商品<br /><span className="text-warm-gray text-xs">上限の目安・未開封の未使用品を想定</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜391,000円</td><td className="py-2 pr-3 whitespace-nowrap">2025年11月時点</td><td className="py-2"><a href="https://buysell-kaitori.com/column/liquor-hibiki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">バイセル</td><td className="py-2 pr-3">響30年 旧ボトル（通称：観音開き）<br /><span className="text-warm-gray text-xs">上限の目安・未開封の未使用品を想定</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜467,500円</td><td className="py-2 pr-3 whitespace-nowrap">2025年11月時点</td><td className="py-2"><a href="https://buysell-kaitori.com/column/liquor-hibiki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          <p>標準的な700mlボトルの掲示価格は <strong>475,000〜530,000円</strong> で、PeatBid が集計しているヤフオク落札中央値 <strong>535,125円</strong>（取得日 2026-10-12）の <strong>89〜99%</strong> にあたります。中央値は個人間の落札額、掲示価格は店がその場で買い取る額なので、両方を並べると「店に売るといくらになりそうか」の見当がつきます。</p>
          <p>同じ店でも、ボトルの仕様（新型のホログラムシールの有無・旧型・観音開きの金箱・免税店向けの花鳥風月）と付属品で掲示価格が分かれています。LINXAS の掲示では、新型ホログラム付き 530,000円 と ホログラム無し 470,000円 で 60,000円、旧型 400,000円 とは 130,000円 の差があります。バイセルの値は2025年11月時点の上限目安で、他店（2026年9〜10月更新）とは時点が違います。</p>
          <p className="text-sm bg-cream/40 border border-amber/30 rounded-lg p-4 not-prose">「旧型」「旧ボトル」が指すものは店によって違います。LINXAS は「旧型」（400,000円）と「観音開き」（600,000円）を別の行で掲示しており、LINXAS の旧型は観音開きとは別の扱いです。一方、バイセルは「旧ボトル（通称：観音開き）」、買取大吉は「旧ボトル（金箱・観音開き）」と、旧ボトル＝金色の観音開きの箱として価格を出しています。さらにファイブニーズは新モデルの外箱も「茶色の観音開き箱」と説明しています。査定を頼むときは「旧型」という言葉ではなく、箱の色と形・キャップの刻印・ホログラムシールの有無を伝えると、店ごとの呼び方の違いで話が食い違うのを防げます。</p>

          <h3 id="store-trend">響30年の買取価格の推移（店舗の掲示価格・約2年分）</h3>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">響30年 700ml 参考買取価格の月次推移（ファイブニーズ掲示・2024年7月〜2026年9月）</p>
            <svg viewBox="0 0 640 205" role="img" aria-label="響30年の買取店掲示価格の月次推移グラフ" className="w-full h-auto">
              <line x1="70" y1="30.0" x2="622" y2="30.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="33.5" fontSize="10" fill="#807565" textAnchor="end">620,000</text>
              <line x1="70" y1="95.0" x2="622" y2="95.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="98.5" fontSize="10" fill="#807565" textAnchor="end">555,000</text>
              <line x1="70" y1="160.0" x2="622" y2="160.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="163.5" fontSize="10" fill="#807565" textAnchor="end">490,000</text>
              <polyline points="70.0,30.0 91.2,30.0 112.5,50.0 133.7,60.0 154.9,60.0 176.2,70.0 197.4,80.0 218.6,90.0 239.8,130.0 261.1,150.0 282.3,160.0 303.5,110.0 324.8,120.0 346.0,130.0 367.2,140.0 388.5,150.0 409.7,130.0 430.9,130.0 452.2,125.0 473.4,125.0 494.6,120.0 515.8,120.0 537.1,120.0 558.3,120.0 579.5,125.0 600.8,125.0 622.0,123.0" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="70.0" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年7月: 620,000円</title></circle>
              <circle cx="91.2" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年8月: 620,000円</title></circle>
              <circle cx="112.5" cy="50.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年9月: 600,000円</title></circle>
              <circle cx="133.7" cy="60.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年10月: 590,000円</title></circle>
              <circle cx="154.9" cy="60.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年11月: 590,000円</title></circle>
              <circle cx="176.2" cy="70.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年12月: 580,000円</title></circle>
              <circle cx="197.4" cy="80.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年1月: 570,000円</title></circle>
              <circle cx="218.6" cy="90.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年2月: 560,000円</title></circle>
              <circle cx="239.8" cy="130.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年3月: 520,000円</title></circle>
              <circle cx="261.1" cy="150.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年4月: 500,000円</title></circle>
              <circle cx="282.3" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年5月: 490,000円</title></circle>
              <circle cx="303.5" cy="110.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年6月: 540,000円</title></circle>
              <circle cx="324.8" cy="120.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年7月: 530,000円</title></circle>
              <circle cx="346.0" cy="130.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年8月: 520,000円</title></circle>
              <circle cx="367.2" cy="140.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年9月: 510,000円</title></circle>
              <circle cx="388.5" cy="150.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年10月: 500,000円</title></circle>
              <circle cx="409.7" cy="130.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年11月: 520,000円</title></circle>
              <circle cx="430.9" cy="130.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年12月: 520,000円</title></circle>
              <circle cx="452.2" cy="125.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年1月: 525,000円</title></circle>
              <circle cx="473.4" cy="125.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年2月: 525,000円</title></circle>
              <circle cx="494.6" cy="120.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年3月: 530,000円</title></circle>
              <circle cx="515.8" cy="120.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年4月: 530,000円</title></circle>
              <circle cx="537.1" cy="120.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年5月: 530,000円</title></circle>
              <circle cx="558.3" cy="120.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年6月: 530,000円</title></circle>
              <circle cx="579.5" cy="125.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年7月: 525,000円</title></circle>
              <circle cx="600.8" cy="125.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年8月: 525,000円</title></circle>
              <circle cx="622.0" cy="123.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年9月: 527,000円</title></circle>
              <text x="70.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2024年7月</text>
              <text x="346.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2025年8月</text>
              <text x="622.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2026年9月</text>
              
            </svg>
            <p className="text-[12px] text-ink leading-relaxed mt-2">2024年7月 620,000円 → 2026年9月 527,000円（期間中の最高 620,000円・最低 490,000円）。</p>
            <details className="mt-2 text-[12px] text-warm-gray">
              <summary className="cursor-pointer">月別の数値を表で見る（27か月）</summary>
              <table className="mt-2"><tbody><tr><td className="py-1 pr-4">2024年7月</td><td className="py-1 text-right">620,000円</td></tr><tr><td className="py-1 pr-4">2024年8月</td><td className="py-1 text-right">620,000円</td></tr><tr><td className="py-1 pr-4">2024年9月</td><td className="py-1 text-right">600,000円</td></tr><tr><td className="py-1 pr-4">2024年10月</td><td className="py-1 text-right">590,000円</td></tr><tr><td className="py-1 pr-4">2024年11月</td><td className="py-1 text-right">590,000円</td></tr><tr><td className="py-1 pr-4">2024年12月</td><td className="py-1 text-right">580,000円</td></tr><tr><td className="py-1 pr-4">2025年1月</td><td className="py-1 text-right">570,000円</td></tr><tr><td className="py-1 pr-4">2025年2月</td><td className="py-1 text-right">560,000円</td></tr><tr><td className="py-1 pr-4">2025年3月</td><td className="py-1 text-right">520,000円</td></tr><tr><td className="py-1 pr-4">2025年4月</td><td className="py-1 text-right">500,000円</td></tr><tr><td className="py-1 pr-4">2025年5月</td><td className="py-1 text-right">490,000円</td></tr><tr><td className="py-1 pr-4">2025年6月</td><td className="py-1 text-right">540,000円</td></tr><tr><td className="py-1 pr-4">2025年7月</td><td className="py-1 text-right">530,000円</td></tr><tr><td className="py-1 pr-4">2025年8月</td><td className="py-1 text-right">520,000円</td></tr><tr><td className="py-1 pr-4">2025年9月</td><td className="py-1 text-right">510,000円</td></tr><tr><td className="py-1 pr-4">2025年10月</td><td className="py-1 text-right">500,000円</td></tr><tr><td className="py-1 pr-4">2025年11月</td><td className="py-1 text-right">520,000円</td></tr><tr><td className="py-1 pr-4">2025年12月</td><td className="py-1 text-right">520,000円</td></tr><tr><td className="py-1 pr-4">2026年1月</td><td className="py-1 text-right">525,000円</td></tr><tr><td className="py-1 pr-4">2026年2月</td><td className="py-1 text-right">525,000円</td></tr><tr><td className="py-1 pr-4">2026年3月</td><td className="py-1 text-right">530,000円</td></tr><tr><td className="py-1 pr-4">2026年4月</td><td className="py-1 text-right">530,000円</td></tr><tr><td className="py-1 pr-4">2026年5月</td><td className="py-1 text-right">530,000円</td></tr><tr><td className="py-1 pr-4">2026年6月</td><td className="py-1 text-right">530,000円</td></tr><tr><td className="py-1 pr-4">2026年7月</td><td className="py-1 text-right">525,000円</td></tr><tr><td className="py-1 pr-4">2026年8月</td><td className="py-1 text-right">525,000円</td></tr><tr><td className="py-1 pr-4">2026年9月</td><td className="py-1 text-right">527,000円</td></tr></tbody></table>
            </details>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: <a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hibiki_brand/hibiki30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズ「響30年 700ml 参考買取価格」の価格推移グラフ</a>（同ページ掲載のグラフの値を転記）。店舗の参考価格であり、実際の買取額を保証するものではありません。</p>
          </div>

          <details className="my-4 text-sm">
            <summary className="cursor-pointer text-amber-dark">もう1店の推移: サケウル（STOCK LAB）の響30年（ホログラムシールあり 完品）の月別買取相場（同店の買取実績の月中央値・実績のない月は除外）（21か月分）</summary>
            <table className="mt-2 text-[13px]"><tbody><tr><td className="py-1 pr-4">2023年10月</td><td className="py-1 text-right">580,000円</td></tr><tr><td className="py-1 pr-4">2023年11月</td><td className="py-1 text-right">580,000円</td></tr><tr><td className="py-1 pr-4">2023年12月</td><td className="py-1 text-right">613,000円</td></tr><tr><td className="py-1 pr-4">2024年1月</td><td className="py-1 text-right">625,000円</td></tr><tr><td className="py-1 pr-4">2024年2月</td><td className="py-1 text-right">635,000円</td></tr><tr><td className="py-1 pr-4">2024年3月</td><td className="py-1 text-right">680,000円</td></tr><tr><td className="py-1 pr-4">2024年4月</td><td className="py-1 text-right">675,000円</td></tr><tr><td className="py-1 pr-4">2024年5月</td><td className="py-1 text-right">650,000円</td></tr><tr><td className="py-1 pr-4">2024年9月</td><td className="py-1 text-right">535,000円</td></tr><tr><td className="py-1 pr-4">2024年11月</td><td className="py-1 text-right">535,000円</td></tr><tr><td className="py-1 pr-4">2025年1月</td><td className="py-1 text-right">520,000円</td></tr><tr><td className="py-1 pr-4">2025年3月</td><td className="py-1 text-right">480,000円</td></tr><tr><td className="py-1 pr-4">2025年4月</td><td className="py-1 text-right">697,500円</td></tr><tr><td className="py-1 pr-4">2025年6月</td><td className="py-1 text-right">477,000円</td></tr><tr><td className="py-1 pr-4">2025年9月</td><td className="py-1 text-right">490,000円</td></tr><tr><td className="py-1 pr-4">2025年10月</td><td className="py-1 text-right">485,000円</td></tr><tr><td className="py-1 pr-4">2025年11月</td><td className="py-1 text-right">470,000円</td></tr><tr><td className="py-1 pr-4">2025年12月</td><td className="py-1 text-right">495,000円</td></tr><tr><td className="py-1 pr-4">2026年2月</td><td className="py-1 text-right">490,000円</td></tr><tr><td className="py-1 pr-4">2026年3月</td><td className="py-1 text-right">500,000円</td></tr><tr><td className="py-1 pr-4">2026年6月</td><td className="py-1 text-right">520,000円</td></tr></tbody></table>
            <p className="text-[11px] text-warm-gray mt-2">出典: <a href="https://www.stock-lab.com/osake-kaitori/whiskey/hibiki/hibiki-age30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サケウル（STOCK LAB）の掲載ページ</a></p>
          </details>

          <h3 id="longterm">長期の価格推移（2016〜2026年・店舗の買取価格表から）</h3>
          <p>同店の表では、2016年12月の170,000円から2022年6月の790,000円まで上がり、その後は下がって2025年7月に490,000円、2026年6月は530,000円です。</p>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="text-sm"><thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-1 pr-4">時期</th><th className="py-1 text-right">買取価格（Life Vacation掲載）</th></tr></thead><tbody><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2016年12月</td><td className="py-1 text-right">170,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2018年12月</td><td className="py-1 text-right">350,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2020年12月</td><td className="py-1 text-right">380,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2021年12月</td><td className="py-1 text-right">600,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2022年6月</td><td className="py-1 text-right">790,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2022年12月</td><td className="py-1 text-right">690,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2024年6月</td><td className="py-1 text-right">550,000〜640,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2025年7月</td><td className="py-1 text-right">490,000円</td></tr><tr className="border-b border-warm-border/60"><td className="py-1 pr-4">2026年6月</td><td className="py-1 text-right">530,000円</td></tr></tbody></table>
          </div>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.lv-liquor.com/whiskey/hibiki30nennkaitori.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">Life Vacation「響30年の買取」の価格推移表</a>（全17点から要点を抜粋。同店は参考価格で、金額を保証するものではないとしています）</p>
          <p>PeatBid の自前データはヤフオク落札中央値の週次集計で、範囲は 2026-05-25〜2026-10-12（21点）です。それより前の値動きはこのデータからは言えないため、上の店舗の表（出典つき）を参考に載せています。</p>
          <p>あわせて、LINXAS の実績にも2022年5〜7月の「完備」810,000〜840,000円・「観音開き 完備」1,050,000円が並んでいます（上の買取実績）。同じ時期にサントリーの希望小売価格は2022年4月出荷分から125,000円→160,000円（税別）に改定されています（下の定価の表）。</p>

          <h3 id="store-records">響30年の買取実績（各店の公開分・日付つき）</h3>
          <p>各店が自社サイトに載せている響30年の買取実績です。実績は「その日にその店で買い取った額」で、ボトルの状態や付属品が揃っているかは店によって書き方が違います（2026年10月15日確認）。</p>

          <p className="text-sm font-bold mt-6">JOYLAB（ジョイラボ）</p>
          <ul className="text-sm"><li>2026年9月11日　名古屋店　<strong>525,000円</strong></li><li>2026年9月8日　渋谷店　<strong>520,000円</strong></li><li>2026年7月31日　浅草店　<strong>507,000円</strong></li><li>2025年12月17日　梅田店　<strong>448,000円</strong></li><li>2025年11月11日　札幌店　<strong>520,000円</strong></li><li>2025年10月3日　新宿店　<strong>495,000円</strong></li><li>2024年10月27日　心斎橋店　<strong>511,000円</strong></li><li>2024年8月26日　福岡天神店　<strong>605,000円</strong></li><li>2024年7月27日　仙台店　<strong>605,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://joylab.jp/japanwhiskey/suntory/hibiki/aged-30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">JOYLAB（ジョイラボ）の掲載ページ</a>（店舗名つきの実績9件（同ページ掲載分すべて。箱などの状態は記載なし））</p>

          <p className="text-sm font-bold mt-6">LINXAS（リンクサス）</p>
          <ul className="text-sm"><li>2025年2月3日　ホログラム付き 完備　<strong>540,000円</strong></li><li>2022年7月20日　観音開き 完備　<strong>1,050,000円</strong></li><li>2022年6月17日　完備　<strong>810,000円</strong></li><li>2022年6月12日　花鳥風月 完備　<strong>870,000円</strong></li><li>2022年6月1日　花鳥風月（箱・冊子付き）　<strong>910,000円</strong></li><li>2022年5月30日　完備　<strong>840,000円</strong></li><li>2022年2月10日　観音開き　<strong>900,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（リンクサス）の掲載ページ</a>（中身入りの実績7件（空き瓶の実績は下の「空き瓶・空箱」に分けて掲載））</p>

          <p className="text-sm font-bold mt-6">ファイブニーズ</p>
          <ul className="text-sm"><li>2025年8月31日　700ml　<strong>440,000円</strong></li><li>2025年6月19日　700ml　<strong>470,500円</strong></li><li>2025年1月20日　700ml　<strong>500,000円</strong></li><li>2024年8月20日　観音開き 700ml 箱付き　<strong>680,000円</strong></li><li>2024年8月5日　700ml 箱付き　<strong>600,000円</strong></li><li>2023年12月25日　700ml　<strong>615,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hibiki_brand/hibiki30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズの掲載ページ</a>（実績6件（店舗名の記載なし））</p>

          <p className="text-sm font-bold mt-6">サケウル（STOCK LAB）</p>
          <ul className="text-sm"><li>2025年10月23日　茨城日立／神戸六甲道／東大阪布施／谷町九丁目（各1件）　<strong>各475,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.stock-lab.com/osake-kaitori/whiskey/hibiki/hibiki-age30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サケウル（STOCK LAB）の掲載ページ</a>（「新着買取実績」4件（店舗の地域名はページの表記））</p>

          <h3 id="toki-bottle">有田焼・九谷焼ボトルの響30年の買取価格</h3>
          <p>有田焼・九谷焼のボトルは、通常のクリスタルボトルとは別の限定品です。まねきやは有田焼を「免税店でのみ取り扱われていた限定品」（木箱入り・黒を基調としたボトル）、九谷焼を「青華鳳凰宝相華」のデザインとして紹介し、バイセルは「免税店向けなどに限定生産された」陶器ボトルとしています。</p>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル</th><th className="py-2 pr-3 text-right">掲載の価格</th><th className="py-2 pr-3">時点・注記</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">バイセル</td><td className="py-2 pr-3">有田焼ボトル</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜998,700円</td><td className="py-2 pr-3 text-xs">2025年11月時点（上限の目安・未開封想定）</td><td className="py-2"><a href="https://buysell-kaitori.com/column/liquor-hibiki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">買取大吉</td><td className="py-2 pr-3">有田焼</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">90万〜120万円</td><td className="py-2 pr-3 text-xs">日付表記なし（記事公開 2025-12-31）。オークション等の買取市場全体で取引された金額と注記</td><td className="py-2"><a href="https://daikichi-kaitori.jp/column/hibiki30nenkaitori/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">買取大吉</td><td className="py-2 pr-3">九谷焼</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">110万円以上</td><td className="py-2 pr-3 text-xs">同上</td><td className="py-2"><a href="https://daikichi-kaitori.jp/column/hibiki30nenkaitori/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">まねきや</td><td className="py-2 pr-3">有田焼</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">900,000〜1,200,000円</td><td className="py-2 pr-3 text-xs">基準日の記載なし（記事公開 2024-12-19）</td><td className="py-2"><a href="https://manekiya.com/alcohol/column/60887" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">まねきや</td><td className="py-2 pr-3">九谷焼（限定ボトル）</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">1,100,000円以上</td><td className="py-2 pr-3 text-xs">同上</td><td className="py-2"><a href="https://manekiya.com/alcohol/column/60887" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          <p>PeatBid が確認した範囲では、LINXAS・ファイブニーズ・サケウル（STOCK LAB）・JOYLAB の響30年のページに陶器ボトルの掲示価格はありませんでした（2026-10-15確認）。上の値はいずれも1年近く前、または基準日のない記事の値で、出品数も少ない品です。ヤフオク中央値（このページの集計）も通常の700mlボトルが対象で、陶器ボトルは含めていません。売る場合は、陶器ボトルを扱った実績のある店で個別に査定を取ってください。</p>

          <h3 id="teika">響30年の定価（メーカー希望小売価格）の推移</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">期間</th><th className="py-2 pr-3 text-right">希望小売価格（税別）</th><th className="py-2 pr-3">内容</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">〜2022年3月</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">125,000円</td><td className="py-2 pr-3">響30年 700ml</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14030.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2022年4月〜2024年3月</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">160,000円</td><td className="py-2 pr-3">2022年4月1日出荷分から改定</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14030.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2024年4月〜2026年3月</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">360,000円</td><td className="py-2 pr-3">2024年4月1日出荷分から改定</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14499.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2026年4月〜</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">415,000円</td><td className="py-2 pr-3">2026年4月1日出荷分から改定（発表 2025-11-04 No.14932）</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14932.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr></tbody>
            </table>
          </div>
          <p>現在の希望小売価格 415,000円（税別）は税込 456,500円です。ヤフオク落札中央値 535,125円 はその <strong>1.17倍</strong>。定価で手に入れたボトルでも、売れば定価を上回る水準で取引されているということです。</p>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>響30年の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。**実際の査定額は業者により異なります**ので、最終的な金額は各業者のページからご確認ください。</p>

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
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td>市場相場の95〜100%程度</td><td><strong>約508,370〜535,120円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>市場相場の80〜90%程度</td><td><strong>約428,100〜481,610円</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td>市場相場の85〜95%程度</td><td><strong>約454,860〜508,370円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>市場相場の75〜88%程度</td><td><strong>約401,340〜470,910円</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td>市場相場の60〜75%程度</td><td><strong>約321,080〜401,340円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>市場相場の55〜70%程度</td><td><strong>約294,320〜374,590円</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td>市場相場の30〜40%程度</td><td><strong>約160,540〜214,050円</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td>市場相場の15〜25%程度</td><td><strong>約80,270〜133,780円</strong></td></tr>
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

          <h3 id="hako-nashi-souba">響30年を箱なし・付属品なしで売る場合の買取相場</h3>

          <p>「響30年 買取 箱無し」とお調べの方向けの目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度（約428,100〜481,610円）</strong>。外箱・冊子の揃った完品と比べて1〜2割の減額にとどまるため、<strong>箱がなくても売却を諦める必要はありません</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって差が出ます。箱なしの場合こそ<strong>複数業者の相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品だけでも残っていれば一緒に査定へ</strong>（部分的でも評価されます）</li>
            <li>詳しくは<Link href="/articles/hibiki-30-hako-nashi/" className="text-amber-dark hover:underline">響30年は箱なしでも買取してもらえるかの徹底ガイド</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. なぜ響30年はこの価格になるのか</h2>

          <p>響30年の二次流通価格を決定づける主要な要因は5つあります:</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果が、日本の買取業者の仕入れ価格の基準となっています</li>
            <li><strong>需給バランスと供給制限</strong> — 30年熟成の長期熟成銘柄は供給量が物理的に限られており、需要拡大に応じて価格が上昇しやすい構造</li>
            <li><strong>為替レートの影響</strong> — 円安局面では海外バイヤー（アジア富裕層・中華圏コレクター）の購買力が拡大し、国内相場も連動して上昇する傾向</li>
            <li><strong>サントリーの国際的評価</strong> — World Whiskies Awards、ISC等の品評会受賞歴が国際的需要を支え、長期保有のプレミアにつながる</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮シーズンに需要が高まり、相場が上昇する</li>
          </ol>

          <p>これらの要因を総合的に踏まえると、響30年はウルトラクラスの希少度を持つため、<strong>中長期で見れば価格安定〜上昇基調</strong>が予想されます。短期的な売り急ぎは避け、市場動向を見ながら最適なタイミングで売却するのが合理的です。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、響30年クラスの銘柄が継続的に取引されています。主要オークションプラットフォームと、それぞれの特徴は以下の通りです:</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催、プレミアム銘柄中心。<br/><strong>Bonhams（香港・ロンドン）</strong>: 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次オンラインオークション、中位銘柄まで幅広く扱う。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次開催、コレクター向け。<br/><strong>Whisky Hammer（UK）</strong>: 月次オンライン、新興プレイヤー。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」アーカイブで閲覧可能です。日本の買取業者の査定額は、これらの海外データを基準に、輸送コスト・関税・業者マージンを考慮して算出されています。</p>

          <p>PeatBid がヤフオク落札中央値の週次集計を始めた 2026-05-25 時点の響30年は <strong>549,503円</strong>（n=72）、最新の 2026-10-12 は <strong>535,125円</strong>（n=124）で、この間の変化は <strong>-2.6%</strong> です（出典: PeatBid 集計・<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">算出方法</Link>）。集計期間が21週分のため、数年単位の値動きはこのデータからは言えません。</p>


          <h2 id="takaku-uru">8. 響30年を高く売る7つの実践テクニック</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを必ず揃える</strong> — 付属品の有無で査定額が10〜20%変動。シミ・破れがあると更に評価減</li>
            <li><strong>未開封の状態を維持する</strong> — 開封済みは査定額が大幅減（20〜40%）。コレクション目的なら絶対に開けない</li>
            <li><strong>複数業者で相見積もり</strong> — 同じボトルでも業者により数万〜数十万円の差。ヒカカク等の一括査定+専門店個別査定の組み合わせが鉄則</li>
            <li><strong>適切な保管環境を維持</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置き保管。湿度・温度の急激な変化はNG</li>
            <li><strong>売却タイミングを見極める</strong> — 年末年始・お中元・お歳暮シーズンが高値傾向。海外オークション結果直後も相場上昇のチャンス</li>
            <li><strong>ボトリング年代を業者に伝える</strong> — 古いラベル・ロット番号は希少価値が乗ることがある</li>
            <li><strong>状態を写真で記録</strong> — 事前に複数角度から撮影し、業者比較・トラブル防止に活用</li>
          </ol>

          <h2 id="fake">9. 響30年の偽物・贋作の見分け方</h2>

          <p>響30年のような流通価値のある銘柄では、贋作・偽造ボトルのリスクが存在します。本物を見抜くには以下の5つのチェックが有効です:</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で色ズレなし。贋作はにじみ・かすれ・フォント違いが見られる</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリー山崎・響等はホログラムシール付き。贋作は光の反射が不均一</li>
            <li><strong>液色と液面の状態</strong> — 本物は均一な琥珀色（透明感あり）。贋作は色ムラ・濁り・沈殿物</li>
            <li><strong>瓶の形状と底面刻印</strong> — 正規品は底面にロット番号・製造所コードあり。贋作は刻印なし or 不自然</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークション経由は信頼度高。個人間取引（メルカリ・ヤフオク）は要注意</li>
          </ol>

          <p>怪しいと思ったら、お酒買取の専門店で**鑑定査定**を依頼するのが最も確実です。専門業者は本物・贋作の判定経験が豊富で、無料で見抜いてくれます。</p>

          <h3 id="shinkyu">響30年の新型（現行）と旧型（金色の観音開き箱）の見分け方</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">見る場所</th><th className="py-2 pr-3">現行ボトル（新型）</th><th className="py-2">旧ボトル（〜2007年頃・金色の観音開き箱）</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><th className="py-2 pr-3 text-left align-top whitespace-nowrap">外箱</th><td className="py-2 pr-3 align-top">革張りの化粧箱（LINXAS・バイセル）。ファイブニーズは「茶色の観音開き箱」、買取大吉は「白箱・茶色のケース」と説明</td><td className="py-2 align-top">金色の観音開きの化粧箱（LINXAS・バイセル・買取大吉・ファイブニーズ）。2007年頃までの流通とされる</td></tr><tr className="border-b border-warm-border/60"><th className="py-2 pr-3 text-left align-top whitespace-nowrap">キャップ天面</th><td className="py-2 pr-3 align-top">「響」のロゴ（ファイブニーズは「SUNTORY WHISKEY HIBIKI 響」の表記と説明）</td><td className="py-2 align-top">サントリーの花のマーク（通称「響マーク」）</td></tr><tr className="border-b border-warm-border/60"><th className="py-2 pr-3 text-left align-top whitespace-nowrap">キャップフィルム・ラベル</th><td className="py-2 pr-3 align-top">「HIBIKI」の表記がある（LINXAS はラベルに、買取大吉・ファイブニーズはキャップフィルムに「HIBIKI」）</td><td className="py-2 align-top">「HIBIKI」の表記がない（ファイブニーズはキャップフィルムが「SUNTORY」表記と説明）</td></tr><tr className="border-b border-warm-border/60"><th className="py-2 pr-3 text-left align-top whitespace-nowrap">ホログラムシール</th><td className="py-2 pr-3 align-top">時期によって有り・無しがある（下記）</td><td className="py-2 align-top">無し</td></tr></tbody>
            </table>
          </div>
          <p className="text-sm font-bold">ホログラムシールの有無について</p>
          <p>サントリー広報は、偽造防止対策として「高酒齢」商品にホログラムシールを貼っていることを認めており、シール付きの製品は2022年2月以降に出荷されています（J-CAST ニュース 2022-06-17。対象に響30年を含む）。</p><p>さらにサントリーは2024年2月29日、複製や再貼付が難しい特殊加工のホログラムシールを「開封口」と「ボトル背面」の2か所に付けると発表しました。対象は響21年・響30年と山崎・白州の12/18/25年で、2024年3月製造分から。順次の切り替えのため、シールの無い商品もしばらく流通するとしています（グルメ Watch 2024-02-29）。</p><p>つまり、現行ボトルでもシールの無いものは正規に存在します。シールが無いことだけで偽物とは判断できず、LINXAS・サケウルが「ホログラム有り／無し」で別の価格を掲示しているのはこの違いです。</p>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a>・<a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hibiki_brand/hibiki30/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズ</a>・<a href="https://buysell-kaitori.com/column/liquor-hibiki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a>・<a href="https://daikichi-kaitori.jp/column/hibiki30nenkaitori/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">買取大吉</a>の各ページ（2026-10-15確認）、<a href="https://www.j-cast.com/trend/2022/06/17439568.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">J-CAST ニュース（2022-06-17）</a>・<a href="https://gourmet.watch.impress.co.jp/docs/news/1572716.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">グルメ Watch（2024-02-29）</a></p>
          <p>上の特徴は、各店の説明文とサントリーの発表をもとに文章でまとめたものです（画像は転載していません）。花鳥風月はラベルの無いクリスタルボトルに彫刻を施した免税店向けの限定品（LINXAS・まねきや）で、上の新旧どちらとも別に査定されます。</p>

          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が響30年クラスの銘柄に強い買取業者を厳選しました。それぞれ得意領域が異なるため、目的別に使い分けるのがコツです。</p>

          {/* Comparison table */}
          <div className="table-wrapper not-prose mb-6">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr>
                  <th>業者</th>
                  <th>得意領域</th>
                  <th>査定スピード（各社公式・2026年10月16日確認）</th>
                  <th>査定額傾向</th>
                  <th>手数料</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>ヒカカク！</strong></td><td>一括査定（最大20社）</td><td>査定結果メールは最短1日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>バイセル</strong></td><td>大手の安心感</td><td>出張は最短即日訪問・その場で査定</td><td>★★★★</td><td>無料</td></tr>
                <tr><td><strong>リカスタ</strong></td><td>宅配買取</td><td>査定の連絡は1営業日以内（本数により2営業日以上）</td><td>★★★★</td><td>無料</td></tr>
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
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>最大20社から一括査定（公式）</li><li>査定は完全無料・納得できなければ買取依頼しなくてOK</li><li>ウイスキー・洋酒・ブランデー対応</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>こんな人におすすめ: <strong>最高値を狙いたい方</strong> / 初めての方</p>` }} className="mt-2 text-sm" />
            <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">ヒカカク！で無料査定する →</a>
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">2位: バイセル</h3>
              <span className="text-xs text-amber-dark tracking-wider">出張/店頭/宅配</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>東証グロース上場のBuySell Technologiesが運営。累計買取点数4,800万点以上（2015〜2025年の合計・公式）の大手で、お酒・ウイスキー買取に注力中。<strong>信頼性とスピードを両立</strong>したい場合に最適です。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>東証グロース上場で社会的信頼性◎</li><li>3チャネル対応（出張・店頭・宅配）</li><li>CMでも知名度抜群</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>こんな人におすすめ: <strong>信頼性とスピード</strong>を両立したい方</p>` }} className="mt-2 text-sm" />
            <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">バイセルで無料査定する →</a>
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">3位: リカスタ</h3>
              <span className="text-xs text-amber-dark tracking-wider">宅配/出張/店頭</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>全国対応の宅配買取サービス。<strong>店舗に行く時間がない方・地方在住の方</strong>に最適。査定無料・キャンセル無料で気軽に試せます。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>全国対応の宅配買取</li><li>査定無料・キャンセル無料</li><li>送料・梱包キット無料</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>こんな人におすすめ: <strong>宅配で完結したい方</strong> / 地方在住の方</p>` }} className="mt-2 text-sm" />
            <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">リカスタで無料査定する →</a>
          </div>
          </div>

          <h2 id="process">11. 売却プロセス5ステップ</h2>

          <p>響30年を売却する際の標準的なプロセスを5ステップでまとめました:</p>

          <ol>
            <li><strong>状態確認・付属品準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃える</li>
            <li><strong>事前相場リサーチ</strong> — PeatBidなどで現在の相場を確認し、自分のボトルの目安価格を把握</li>
            <li><strong>複数業者で見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒買取の専門店に個別で2〜3社、計5〜8社で見積もり取得</li>
            <li><strong>査定額比較・業者選定</strong> — 最高値だけでなく、手数料・キャンセル料・送料・支払い方法を総合判断</li>
            <li><strong>売却契約・入金確認</strong> — 売却契約後、店頭買取なら即日現金、宅配買取なら1〜3営業日で銀行振込</li>
          </ol>

          <p>このプロセス全体で<strong>1〜2週間</strong>を見込めば、最適なタイミングで売却できます。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">響30年の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h3 id="akibin">響30年の空き瓶・空箱は売れる？</h3>
          <p>売れる店があります。LINXAS（リンクサス）は響30年の空き瓶の買取実績を公開しており、次の7件が載っています。</p>
          <ul className="text-sm"><li>2025年9月5日　空き瓶　<strong>2,500円</strong></li><li>2024年7月7日　空き瓶　<strong>2,500円</strong></li><li>2024年3月22日　箱なし 空き瓶　<strong>2,500円</strong></li><li>2023年10月5日　箱付き（空き瓶）　<strong>12,000円</strong></li><li>2023年10月3日　【空き瓶】観音開き　<strong>8,000円</strong></li><li>2022年9月22日　観音 空瓶　<strong>20,000円</strong></li><li>2022年3月10日　空き瓶 完備　<strong>8,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/hibiki/hibiki30years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（リンクサス）の掲載ページ</a>（空き瓶の実績をすべて転記・2026年10月15日確認）</p>
          <p>買取大吉は、中身が空でも「数千～数万円と高値で取引されています」とし、理由にボトルがカガミクリスタル製であること、ボトルだけを集めるコレクターがいること、箱や冊子を後から揃えたい需要を挙げています（記事公開 2025-12-31）。（出典: <a href="https://daikichi-kaitori.jp/column/hibiki30nenkaitori/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">買取大吉</a>）</p>
          <p>一方で、バイセルの同じ記事は開封済みの響を「基本的に買取が難しい」としており、空き瓶・空箱を買い取るかどうかは店によって違います。空き瓶を売るなら、LINXAS のように空き瓶の実績を公開している店に、箱・冊子の有無と瓶の状態（キャップ・ラベル）を伝えて事前に確認してください。</p>

          <h3 id="zeikin">響30年を売ったときの税金</h3>
          <p>国税庁のタックスアンサー <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3105.htm" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">No.3105 譲渡所得の対象となる資産と課税方法</a> は、「家具、じゅう器、通勤用の自動車、衣服などの生活に通常必要な動産の譲渡による所得」を課税しない所得としたうえで、「ただし、貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるものの譲渡による所得は除きます」としています（令和8年4月1日現在法令等）。</p>
          <p>ウイスキーがこの「書画、骨とうなど」に当たるかは同ページに書かれていません。ただ、響30年は1本で30万円を超える価格で取引されている（このページの店舗掲示価格・ヤフオク中央値）ため、「生活用品の売却だから非課税」と決めつけず、課税される前提で計算しておくのが安全です。</p>
          <p>課税される場合は総合課税の譲渡所得で、計算は次のとおりです（<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3152.htm" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">No.3152 譲渡所得の計算のしかた（総合課税）</a>）。</p>
          <ul>
            <li>譲渡所得の金額 ＝ 譲渡価額 −（取得費 ＋ 譲渡費用）− 50万円（特別控除。その年の譲渡益の合計から差し引く）</li>
            <li>持っていた期間が5年以内なら短期（全額が課税対象）、5年を超えれば長期（半分だけが課税対象）</li>
          </ul>
          <p>会社員で給与を1か所から受けている人は、給与所得・退職所得以外の所得の合計が20万円を超えると確定申告が必要です（<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">No.1900 給与所得者で確定申告が必要な人</a>）。</p>
          <p>計算例（仮定の数字）: 定価125,000円（税別・2022年3月まで）の響30年を税込137,500円で買って5年を超えて持ち、530,000円で1本売った（譲渡費用0円）場合、譲渡益は392,500円で、特別控除50万円の範囲に収まるため譲渡所得は0円です。同じ年にほかの高額品も売った場合は合計で判定します。購入時のレシートなど取得費が分かる資料は保管しておいてください。</p>
          <p>相続したボトルや、繰り返し売買している場合などは扱いが変わることがあります。くわしくは <Link href="/articles/whisky-kaitori-zeikin/" className="text-amber-dark underline hover:text-burgundy">ウイスキー買取の税金</Link> の記事にまとめています。個別の判断は税務署・税理士に確認してください。</p>

          <h2 id="faq">12. 響30年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '響30年の市場相場はいくらですか？', a: '響30年の市場相場は535,125円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=124、取得日 2026-10-12）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' }, { q: '響30年の買取価格はお店によって違いますか？', a: '違います。2026-10-15 に各店の公開ページで確認した掲示価格は、LINXAS（リンクサス） 530,000円（響30年 新型 ホログラム緑シール付き・2026-09-30更新）、ファイブニーズ 527,000円（響30年 700ml・2026-09-30更新）、サケウル（STOCK LAB） 475,000〜476,000円（響30年 ホログラムシールあり・2026-10-15更新）でした。ボトルの仕様や付属品、店の在庫状況でも変わるため、売る前に複数の店で査定を取って比べてください。' }, { q: '響30年を高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置き保管、(5)売却タイミングを年末年始・お中元シーズンに合わせる、の5つが基本です。' }, { q: '響30年の開封済みでも買取できますか？', a: 'はい、可能です。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅減額となる傾向があります（業者により評価基準が異なります）。蓋がしっかり閉まっており、ラベル・付属品の状態が良好であれば、より高い査定が期待できます。実際の査定額は各業者ページでご確認ください。' }, { q: '響30年は箱無しでも買取してもらえますか？', a: 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約428,100〜481,610円）で、完品と比べ1〜2割の減額にとどまります。冊子やカートンが部分的に残っている場合は一緒に査定に出すと評価されます。減額幅は業者により異なるため、箱なしの場合こそ複数社の相見積もりがおすすめです。' }, { q: '響30年に偽物・贋作はありますか？', a: '高額銘柄ほど贋作リスクが高まります。**ラベル印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5要素で本物・偽物を判断します。怪しい場合はお酒買取の専門知識を持つ業者で鑑定査定を依頼してください。' }, { q: '響30年の保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃で湿度50〜70%、(3)縦置きで保管（横置きはコルク劣化）、(4)外箱に入れて保管、(5)振動の少ない場所で。長期保有の場合、ボトル保険の加入も検討に値します。' }, { q: '響30年は税金がかかりますか？', a: 'かかる場合があります。国税庁（タックスアンサー No.3105）は、家具・衣服など生活に通常必要な動産の売却は課税しないとする一方、「貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるもの」は除くとしています。ウイスキーがこの「書画、骨とうなど」に当たるかは同ページに書かれていませんが、響30年は1本で30万円を超えて取引されるため、非課税と決めつけず確認が必要です。課税される場合は総合課税の譲渡所得で、売却額−(取得費＋譲渡費用)から特別控除50万円（その年の譲渡益の合計から）を引き、5年を超えて持っていた分は半分だけが課税対象です（No.3152）。会社員（給与1か所）は給与・退職所得以外の所得の合計が20万円を超えると確定申告が必要です（No.1900）。個別の判断は税務署・税理士にご確認ください。' }, { q: '響30年の空き瓶や空箱だけでも売れますか？', a: '店によります。LINXAS は響30年の空き瓶の買取実績を公開しており、2022-03-10〜2025-09-05 の7件で 2,500円〜20,000円でした（観音開きの空き瓶 20,000円、箱付きの空き瓶 12,000円など）。一方、バイセルは開封済みの響は基本的に買取が難しいとしています。空き瓶の実績を公開している店に事前に確認してください。' }, { q: '響30年の有田焼・九谷焼ボトルはいくらですか？', a: '陶器ボトルは通常のボトルと別の限定品で、バイセルは有田焼ボトルを〜998,700円（2025年11月時点の上限目安）、買取大吉は有田焼90万〜120万円・九谷焼110万円以上（日付表記なし・記事公開2025-12-31）としています。専門店の響30年ページには陶器ボトルの掲示価格が無く、時点の古い値なので、個別に査定を取ってください。' }, { q: '響30年を売るタイミングはいつがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。また、終売・休売報道直後はプレミアが急上昇する局面もあります。" }, { q: '響30年と他の銘柄、どっちを先に売るべき？', a: '市場流動性・価格安定性・自身の保有目的を総合的に判断。希少度が高い銘柄ほど長期保有でプレミアが乗る傾向があるため、**急ぎでなければ希少銘柄は保有継続、流通量の多い銘柄から先に売却**するのが一つの戦略です。' }].map((faq) => (
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

          <h2>響30年の他の切り口で読む</h2>
          <p>響30年についてさらに詳しく知りたい方は、以下の切り口別解説も合わせてご覧ください。</p>
          <ul>
              <li><Link href="/articles/hibiki-nisemono-mikata/" className="text-amber-dark hover:underline font-bold">響（全種）の偽物の見分け方・真贋ハブ</Link></li>
              <li><Link href="/articles/hibiki-30-takaku-uru/" className="text-amber-dark hover:underline">響30年の高く売る方法</Link></li>
              <li><Link href="/articles/hibiki-30-nisemono-mikata/" className="text-amber-dark hover:underline">響30年の偽物の見分け方</Link></li>
              <li><Link href="/articles/hibiki-30-ranking/" className="text-amber-dark hover:underline">響30年の買取業者ランキング</Link></li>
              <li><Link href="/articles/hibiki-30-rekishi/" className="text-amber-dark hover:underline">響30年の歴史と特徴</Link></li>
              <li><Link href="/articles/hibiki-30-kihaku/" className="text-amber-dark hover:underline">響30年の希少性・投資価値</Link></li>
              <li><Link href="/articles/hibiki-30-auction-suii/" className="text-amber-dark hover:underline">響30年のオークション推移</Link></li>
              <li><Link href="/articles/hibiki-30-kaifu-zumi/" className="text-amber-dark hover:underline">響30年の開封済みでも売れる</Link></li>
              <li><Link href="/articles/hibiki-30-hako-nashi/" className="text-amber-dark hover:underline">響30年の箱なしでも買取</Link></li>
              <li><Link href="/articles/hibiki-30-label-yogore/" className="text-amber-dark hover:underline">響30年のラベル汚れでも査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 864,100円</p></Link>
            <Link href="/articles/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市20年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 220,550円</p></Link>
            <Link href="/articles/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">竹鶴25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 192,300円</p></Link>
            <Link href="/articles/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎18年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 92,005円</p></Link>
            <Link href="/articles/yoichi-15-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市15年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 80,000円</p></Link>
            <Link href="/articles/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">軽井沢12年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 76,975円</p></Link>
          </div>

          <h2>年代指定なし・注目銘柄の買取相場</h2>
          <p>「年代指定なし（ノンエイジ／NV）」で検索されやすい主要銘柄の実勢買取相場です。ジャパニーズ・スコッチを横断して毎週更新しています。</p>
          <ul>
              <li><Link href="/articles/yamazaki-nv-kaitori/" className="text-amber-dark hover:underline">山崎ノンエイジ（NV・年代指定なし）の買取相場</Link></li>
              <li><Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark hover:underline">白州ノンエイジ（NV・年代指定なし）の買取相場</Link></li>
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
              <li><Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark hover:underline">白州の年代指定なし（ノンエイジ／NV）買取相場</Link></li>
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

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-12）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
