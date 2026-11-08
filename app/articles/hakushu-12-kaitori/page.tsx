import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hakushu-12.json";

export const metadata: Metadata = {
  title: '白州12年の買取相場【2026年11月最新】20,680円｜箱なし・開封済みの査定額も',
  description: '白州12年の買取価格は5店の掲示で18,000〜20,000円、箱なしも18,800〜20,000円（2026年11月8日確認）。旧ラベル「ピュアモルト」は30,000〜40,000円。店別の表、シールの有無による差、買取実績も掲載。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '白州12年の市場相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": '白州12年の市場相場は20,680円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=222、取得日 2026-11-02）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' } }, { "@type": "Question", "name": '白州12年の買取価格は店舗によって異なりますか？', "acceptedAnswer": { "@type": "Answer", "text": '異なります。2026-11-08 に各店の公開ページで確認した掲示価格は、ストックラボ 19,000円〜20,000円（白州 12年／白州 12年 箱なし／白州 12年 100周年・2026-11-06更新）、LINXAS（リンクサス） 19,300円（白州12年 700ml・2026-10-04更新）、リカスタ 19,300円（白州 12年 現行品・日付表記なし更新）、大黒屋 19,000円（白州 12年 シングルモルト ホログラムシール有・2026-11-07更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' } }, { "@type": "Question", "name": '白州12年を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' } }, { "@type": "Question", "name": '開封済みの白州12年でも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' } }, { "@type": "Question", "name": '白州12年は箱なしでも買取してもらえますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取の対象です。2026-11-08 に各店の掲載ページで確認した箱なしの掲示は 18,800〜20,000円（LINXAS 18,800円・リカスタ 19,000円・大黒屋 19,000円・ストックラボ 19,000〜20,000円）で、箱ありとの差は 0〜500円 でした（大黒屋とストックラボは箱の有無で同額・同レンジ）。冊子やカートンが残っている場合はあわせて査定に出してください。' } }, { "@type": "Question", "name": '白州12年に偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' } }, { "@type": "Question", "name": '白州12年の保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' } }, { "@type": "Question", "name": '白州12年は税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'ラベルが「PURE MALT」の白州12年はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": '2026-11-08 に確認した掲示価格では、現行のシングルモルトとは別の行で 30,000〜40,000円 です（LINXAS 金フチ 箱あり 40,000円／箱なし 34,000円・響マーク 35,000円／30,000円、大黒屋 700ml 箱有 35,000円／箱無 32,000円・750ml 38,000円／35,000円、買取エリート 上限 33,000円）。' } }, { "@type": "Question", "name": '白州12年は終売したのですか？', "acceptedAnswer": { "@type": "Answer", "text": '終売ではありません。原酒不足で2018年に休売となり、サントリーは2021年3月30日に数量限定で全国再発売しています（グルメ Watch 2021-03-30）。' } }, { "@type": "Question", "name": '白州12年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。' } }, { "@type": "Question", "name": '白州12年と他の銘柄は、どちらを先に売るべきですか？', "acceptedAnswer": { "@type": "Answer", "text": '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. 白州12年の概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "store-prices", label: "4-2. 買取店の掲示価格・買取実績" },
  { id: "state-price", label: "5. 状態別の業界目安" },
  { id: "price-reasons", label: "6. 価格を左右する要因" },
  { id: "auction", label: "7. オークション落札データ" },
  { id: "takaku-uru", label: "8. 高く売るための7つのポイント" },
  { id: "fake", label: "9. 偽物・贋作の見分け方" },
  { id: "edition-check", label: "9-2. エディションの確認方法" },
  { id: "partners", label: "10. おすすめ買取業者3社" },
  { id: "process", label: "11. 売却プロセス5ステップ" },
  { id: "faq", label: "12. よくある質問" },
];

export default function Hakushu12KaitoriPage() {
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
            <li><span className="text-foreground">白州12年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hakushu-12.png" alt="白州12年の買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州12年の買取価格・相場【2026年11月】5店の掲示価格と箱なし・旧ラベルの差</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-11-08 / 編集: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <section aria-labelledby="quick-price" className="bg-white border-2 border-amber/40 rounded-xl p-5 mb-8 not-prose">
            <h2 id="quick-price" className="text-lg font-bold text-ink mb-2">白州12年の店舗別の買取価格（2026年11月8日確認）</h2>
            <p className="text-sm text-ink mb-3"><strong>白州12年（現行のシングルモルト・700ml・未開封）の買取価格は、5店の掲示で 18,000〜20,000円</strong> です（2026年11月8日に5店の掲載ページを確認）。<strong>箱なしでも 18,800〜20,000円</strong> で、箱の有無で価格を分けない店（大黒屋・ストックラボ）もあります。ラベルが「ピュアモルト」の旧ボトルは別の価格で 30,000〜40,000円 です。店ごとの出典リンクは <a href="#store-prices" className="text-amber-dark underline hover:text-burgundy">4-2. 買取店の掲示価格</a>、ラベル・シールの確認方法は <a href="#edition-check" className="text-amber-dark underline hover:text-burgundy">9-2. エディションの確認方法</a> にあります。年数表記のない白州は <Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy">白州ノンエイジの買取価格</Link>、全グレードは <Link href="/articles/hakushu-kaitori/" className="text-amber-dark underline hover:text-burgundy">白州の全グレード一覧</Link> へ。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3 text-right">買取価格（700ml・現行・掲示）</th><th className="py-2">箱なし・シールの条件・店舗側の更新日</th></tr></thead>
                <tbody><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">ストックラボ</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,000〜20,000円</td><td className="py-2 text-xs text-warm-gray">箱なし・100周年も同レンジ／最終更新 2026-11-06</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">LINXAS（リンクサス）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,300円</td><td className="py-2 text-xs text-warm-gray">箱あり。箱なし 18,800円／価格更新日 2026-10-04</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">リカスタ</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,300円</td><td className="py-2 text-xs text-warm-gray">現行品・箱付き。箱なし 19,000円・QRシールなし 18,500円・ホログラムシールなし 17,000円（100周年ラベル 19,500円）／日付表記なし</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">大黒屋</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,000円</td><td className="py-2 text-xs text-warm-gray">ホログラムシール有・箱有／箱無 同額（シール無 18,000円・旧品 17,000円・海外向けラベル 16,000円・100周年 19,000円）／更新日 2026-11-07</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">買取エリート</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜18,000円</td><td className="py-2 text-xs text-warm-gray">シングルモルトの買取上限価格／更新日 2026-11-08</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">旧ラベル「ピュアモルト」（参考）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">30,000〜40,000円</td><td className="py-2 text-xs text-warm-gray">LINXAS 金フチ 40,000円（箱なし 34,000円）・響マーク 35,000円（30,000円）・大黒屋 35,000円（箱無 32,000円）・買取エリート 〜33,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">買取実績（参考）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">15,500〜18,000円</td><td className="py-2 text-xs text-warm-gray">ファイブニーズ 18,000円（2026-08-05）・LINXAS 15,500円（2026-10-14）</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">参考: ヤフオク落札中央値（個人間の取引）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">20,680円</td><td className="py-2 text-xs text-warm-gray">PeatBid 集計・取得日 2026-11-02・毎週更新（店舗の買取額ではありません）</td></tr></tbody>
              </table>
            </div>
            <p className="text-[12px] text-warm-gray leading-relaxed mt-3">PeatBid編集部が 2026-11-08 に各店の掲載ページで確認した値です（店舗側の更新日は各ページの記載）。掲示価格は未開封・状態良好を前提にした参考額で、実際の買取額は査定で決まります。買取実績は掲示価格より低い例もあります。</p>
          </section>

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

          <h2 id="summary">1. 白州12年の概要</h2>

          <p>白州12年は、サントリーが白州蒸溜所（山梨県北杜市）で造るシングルモルトウイスキーで、酒齢12年以上のモルト原酒を使ったボトルです（700ml・43%）。原酒不足で2018年に休売となり、<strong>2021年3月30日に数量限定で全国再発売</strong>されています（終売ではありません。<a href="https://gourmet.watch.impress.co.jp/docs/news/1315154.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">グルメ Watch 2021-03-30</a>）。</p>

          

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 年代表記のない「白州」（ノンエイジ／NV）をお探しの方はこちら → <Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark underline font-bold">白州ノンエイジの買取相場ガイド</Link></p>
          </div>


          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。白州12年は希少度<strong>ミッド</strong>クラスに分類しています。終売・休売後の供給制限により、価格が上昇傾向にある銘柄帯です。市場の流通量は徐々に減少しており、二次流通価格は年単位で15〜30%上昇する傾向があります。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>白州蒸溜所</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>12年熟成</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>43%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>ミッド</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>20,680円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. 白州蒸溜所の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-japanese.png" alt="白州蒸溜所の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>1973年（昭和48年）にサントリーが山梨県北杜市・南アルプス山系の麓に開設した蒸溜所です。標高約700メートルの森林に囲まれた立地で、ミネラル分の少ない軟水を使用しています。「森のウイスキー」と称される、爽やかで軽快な味わいが特徴です。</p>

          <p>白州蒸溜所のジャパニーズウイスキーは、二次流通市場で継続的に取引されています。蒸溜所の歴史と製法は、白州12年のような銘柄の市場価値に影響しています。</p>

          <p>同じ蒸溜所の他の銘柄や同年代の銘柄と比べることで、白州12年の市場における位置付けを確認できます。他のグレード・他の蒸溜所の銘柄は、ページ下部の関連銘柄のリンクからご覧いただけます。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>白州12年の味わいは、熟成期間中に樽から溶け出した成分と、白州蒸溜所の蒸溜技術によって形成されています。</p>

          <p>リンゴ・洋ナシなどのフレッシュな果実の香りが軽やかに広がり、バニラ・蜂蜜の柔らかな甘みがあります。フィニッシュは短めから中程度で、飲みやすい味わいです。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合は、開栓せずに保管することが価値を保つための基本です。開栓すると、香味の揮発と空気との接触による酸化が進み、二次流通市場での評価が大きく下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>白州12年の市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>20,680円</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=222件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">白州12年の買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 640 210" role="img" aria-label="白州12年のヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              <line x1="66" y1="38.9" x2="622" y2="38.9" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="42.4" fontSize="10" fill="#807565" textAnchor="end">21,000</text>
              <line x1="66" y1="97.0" x2="622" y2="97.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="100.5" fontSize="10" fill="#807565" textAnchor="end">20,675</text>
              <line x1="66" y1="155.1" x2="622" y2="155.1" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="158.6" fontSize="10" fill="#807565" textAnchor="end">20,350</text>
              <polyline points="66.0,57.1 116.5,57.0 167.1,57.1 217.6,74.7 268.2,110.4 318.7,126.7 369.3,110.4 419.8,122.0 470.4,146.2 520.9,155.1 571.5,38.9 622.0,96.1" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66.0" cy="57.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-17: 20,898円（サンプル n=238件）</title></circle>
              <circle cx="116.5" cy="57.0" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-24: 20,899円（サンプル n=244件）</title></circle>
              <circle cx="167.1" cy="57.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-31: 20,898円（サンプル n=234件）</title></circle>
              <circle cx="217.6" cy="74.7" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-07: 20,800円（サンプル n=242件）</title></circle>
              <circle cx="268.2" cy="110.4" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-14: 20,600円（サンプル n=234件）</title></circle>
              <circle cx="318.7" cy="126.7" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-21: 20,509円（サンプル n=244件）</title></circle>
              <circle cx="369.3" cy="110.4" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-28: 20,600円（サンプル n=238件）</title></circle>
              <circle cx="419.8" cy="122.0" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-05: 20,535円（サンプル n=232件）</title></circle>
              <circle cx="470.4" cy="146.2" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-12: 20,400円（サンプル n=232件）</title></circle>
              <circle cx="520.9" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-19: 20,350円（サンプル n=232件）</title></circle>
              <circle cx="571.5" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-26: 21,000円（サンプル n=280件）</title></circle>
              <circle cx="622.0" cy="96.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-11-02: 20,680円（サンプル n=222件）</title></circle>
              <text x="618.0" y="86.1" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">20,680円</text>
              <text x="66.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">8/17</text>
              <text x="318.7" y="198" fontSize="10" fill="#807565" textAnchor="middle">9/21</text>
              <text x="622.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">11/2</text>
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">期間 2026-08-17〜2026-11-02（週次12点・各点のサンプル数 n=222〜280件）。出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜に更新。買取額を保証するものではありません。</p>
          </div>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、<strong>3社以上、できれば4社以上で相見積もり</strong>を取ることをおすすめします。</p>

          <p>当サイトでは、以下の3業者のページへのリンクを参考として掲載しています（各社の最新の査定額・キャンペーンは、各社のページでご確認ください）。</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています</li>
          </ul>

          <h3 id="store-prices">白州12年の買取店の掲示価格（店舗別比較・2026年11月8日確認）</h3>

          <p>各店が自社サイトに公開している白州12年の参考買取価格を、PeatBid編集部が 2026-11-08 に各ページで確認した値です。「店舗側の更新日」は、各ページに記載されている価格の更新日です。白州12年は、現行の「シングルモルト」と、ラベルが「ピュアモルト」の旧ボトルで価格が大きく違うため、行を分けて掲載しています。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ストックラボ</td><td className="py-2 pr-3">白州 12年／白州 12年 箱なし／白州 12年 100周年<br /><span className="text-warm-gray text-xs">3行とも同レンジ</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,000円〜20,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-06</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">白州12年 700ml<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,300円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-04</td><td className="py-2"><a href="https://linxas.shop/whiskey/hakushu/hakushu12years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">白州12年 700ml<br /><span className="text-warm-gray text-xs">箱なし</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">18,800円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-04</td><td className="py-2"><a href="https://linxas.shop/whiskey/hakushu/hakushu12years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">白州 12年 現行品<br /><span className="text-warm-gray text-xs">箱付き</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,300円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">白州 12年 現行品<br /><span className="text-warm-gray text-xs">箱なし</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,000円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">白州 12年 現行品 ※QRシールなし<br /><span className="text-warm-gray text-xs">箱付き</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">18,500円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">白州 12年 現行品 ※ホログラムシールなし<br /><span className="text-warm-gray text-xs">箱付き</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">17,000円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">白州 12年 100周年ラベル<br /><span className="text-warm-gray text-xs">箱付き／箱なし</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,500円／19,000円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">白州 12年 シングルモルト ホログラムシール有<br /><span className="text-warm-gray text-xs">箱有・箱無/箱ダメージ有 同額</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-07</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">白州 12年 シングルモルト ホログラムシール無<br /><span className="text-warm-gray text-xs">箱有・箱無 同額</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">18,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-07</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">白州 12年 シングルモルト 100周年記念ラベル<br /><span className="text-warm-gray text-xs">箱有・箱無 同額</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">19,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-07</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">白州 12年 シングルモルト 旧品<br /><span className="text-warm-gray text-xs">箱有・箱無 同額</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">17,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-07</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">白州 12年 シングルモルト 海外向けラベル<br /><span className="text-warm-gray text-xs">箱有・箱無 同額</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">16,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-07</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">買取エリート</td><td className="py-2 pr-3">サントリー白州 12年 シングルモルト<br /><span className="text-warm-gray text-xs">買取上限価格</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜18,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-08</td><td className="py-2"><a href="https://kaitori-off.net/liquor/whisky/hakushu/12years" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">白州12年 ピュアモルト金フチ（旧ラベル）<br /><span className="text-warm-gray text-xs">箱あり／箱なし</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">40,000円／34,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/hakushu/hakushu12years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">白州12年 ピュアモルト響マーク（旧ラベル）<br /><span className="text-warm-gray text-xs">箱あり／箱なし</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">35,000円／30,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/hakushu/hakushu12years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">白州 12年 ピュアモルト 700ml<br /><span className="text-warm-gray text-xs">箱有／箱無・箱ダメージ有</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">35,000円／32,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-07</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">白州 12年 ピュアモルト 旧ラベル 750ml<br /><span className="text-warm-gray text-xs">箱有／箱無・箱ダメージ有</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">38,000円／35,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-07</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/hakushu/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">買取エリート</td><td className="py-2 pr-3">サントリー白州 12年 ピュアモルト<br /><span className="text-warm-gray text-xs">買取上限価格</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜33,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-11-08</td><td className="py-2"><a href="https://kaitori-off.net/liquor/whisky/hakushu/12years" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          <p>標準的な700mlボトルの掲示価格は <strong>19,000〜20,000円</strong> で、PeatBid が集計しているヤフオク落札中央値 <strong>20,680円</strong>（取得日 2026-11-02）の <strong>92〜97%</strong> にあたります。中央値は個人間の落札額、掲示価格は店舗が買い取る際の参考額であり、両者を比較することで店舗に売却した場合のおおよその金額を把握できます。</p>
          <p>現行のシングルモルト（700ml・ホログラムシール有り・箱あり）の掲示は 19,000〜20,000円（大黒屋 19,000円・LINXAS 19,300円・リカスタ 19,300円・ストックラボ 19,000〜20,000円）で、買取エリートは上限 18,000円 です。<strong>箱なし</strong>は 18,800〜20,000円（LINXAS 18,800円・リカスタ 19,000円・大黒屋 19,000円＝箱有と同額・ストックラボ 19,000〜20,000円＝箱ありと同レンジ）で、箱の有無による差は 0〜500円 です。ホログラムシールの無いものは 大黒屋 18,000円・リカスタ 17,000円 と、シール有りより 1,000〜2,300円 低く掲示されています。ラベルが「ピュアモルト」の旧ボトルは 30,000〜40,000円（箱あり 35,000〜40,000円・箱なし 30,000〜35,000円）で、現行品の約2倍です。</p>

          <h3 id="store-records">白州12年の買取実績（各店の公開分・日付付き）</h3>
          <p>各店が自社サイトに掲載している白州12年の買取実績です。実績は、その日にその店舗で買い取った金額であり、ボトルの状態や付属品の有無の記載方法は店舗により異なります（2026年11月8日確認）。</p>

          <p className="text-sm font-bold mt-6">ファイブニーズ</p>
          <ul className="text-sm"><li>2026年8月5日　サントリー 白州 12年 シングルモルト 700ml　<strong>18,000円</strong></li><li>2026年5月11日　サントリー 白州 12年 シングルモルト 700ml　<strong>16,000円</strong></li><li>2026年5月10日　サントリー 白州 12年 シングルモルト 700ml　<strong>17,700円</strong></li><li>2025年11月3日　サントリー 白州 12年 シングルモルト 700ml　<strong>17,000円</strong></li><li>2024年11月25日　サントリー 白州 12年 シングルモルト 700ml　<strong>14,500円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.sakekaitori.com/whisky/japanese_whiskey/hakusyu_brand/hakusyu12/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズの掲載ページ</a>（同ページの買取実績を転記（2026-11-08 確認）。同ページの参考買取価格 24,500円 は「2024年3月25日時点」の表示のため掲示価格の表には入れていません）</p>

          <p className="text-sm font-bold mt-6">LINXAS（リンクサス）</p>
          <ul className="text-sm"><li>2026年10月14日　白州12年　<strong>15,500円</strong></li><li>2025年1月22日　白州12年 箱付き　<strong>17,500円</strong></li><li>2022年7月9日　白州12年 旧ボトル　<strong>39,000円</strong></li><li>2022年2月13日　白州12年 ピュアモルト 旧ラベル　<strong>60,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/hakushu/hakushu12years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（リンクサス）の掲載ページ</a>（同ページの買取実績を転記（2026-11-08 確認））</p>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>白州12年の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。<strong>実際の査定額は業者により異なります</strong>ので、最終的な金額は各業者のページでご確認ください。</p>

          {/* State condition gallery (5 images) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-5 not-prose">
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-perfect.png" alt="未開封・付属品完備" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>付属品完備</p>
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
                <tr><td>未開封・付属品完備</td><td>箱・冊子・カートン揃い</td><td>市場相場の95〜100%程度</td><td><strong>約19,650〜20,680円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>市場相場の80〜90%程度</td><td><strong>約16,540〜18,610円</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td>市場相場の85〜95%程度</td><td><strong>約17,580〜19,650円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>市場相場の75〜88%程度</td><td><strong>約15,510〜18,200円</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td>市場相場の60〜75%程度</td><td><strong>約12,410〜15,510円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>市場相場の55〜70%程度</td><td><strong>約11,370〜14,480円</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td>市場相場の30〜40%程度</td><td><strong>約6,200〜8,270円</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td>市場相場の15〜25%程度</td><td><strong>約3,100〜5,170円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <p>未開封・付属品完備（箱・冊子・カートン揃い）を基準（100%）として、各状態の業界一般の目安は概ね上記の通りです。概算額は実勢中央値に各％を乗じた<strong>目安</strong>であり、<strong>業者により評価基準が異なる</strong>ため実際の査定額とは差が生じます。査定時には、業者が以下の要素を総合的に判断します。</p>

          <ul>
            <li>ボトル本体の傷・汚れ</li>
            <li>ラベルの褪色・破れ・汚れ</li>
            <li>キャップ・封蝋・ホログラムの状態</li>
            <li>液面の高さ（目減りの度合い）</li>
            <li>外箱・冊子・カートンの有無と状態</li>
            <li>製造ロット・ボトリング年代</li>
            <li>付属の保証書・購入レシート</li>
          </ul>

          <h3 id="hako-nashi-souba">白州12年を箱なし・付属品なしで売る場合の買取相場</h3>

          <p>箱や付属品がない場合の目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度（約16,540〜18,610円）</strong>です。外箱・冊子の揃った完品と比べて1〜2割の減額が目安のため、<strong>箱がない場合でも売却は可能です</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって異なります。箱なしの場合は特に<strong>複数業者での相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品が残っている場合は、あわせて査定に出してください</strong>（一部でも評価の対象になります）</li>
            <li>詳しくは<Link href="/articles/hakushu-12-hako-nashi/" className="text-amber-dark hover:underline">白州12年を箱なしで売る場合の解説</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. 白州12年の価格を左右する要因</h2>

          <p>白州12年の二次流通価格を左右する主な要因は、次の4つです。</p>

          <ol>
            <li><strong>需給バランスと供給制限</strong> — 12年熟成の銘柄は供給量が限られており、需要が拡大すると価格が上昇しやすい傾向があります</li>
            <li><strong>為替レートの影響</strong> — 円安の局面では海外の購入者の購買力が高まり、国内相場も連動して上昇する傾向があります</li>
            <li><strong>白州蒸溜所の国際的評価</strong> — World Whiskies Awards、ISC等の品評会での評価は、国際的な需要に影響します</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮の時期に需要が高まり、相場が上昇する傾向があります</li>
          </ol>

          <p>売却の時期は、上記の要因と市場の動向を確認したうえでご判断ください。将来の価格は保証されるものではありません。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="ウイスキーのオークションのイメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>PeatBid の相場は、ヤフオクの落札結果を銘柄ごとに毎週集計した中央値です。海外オークションの落札結果は、相場の集計には使用していません（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">算出方法</Link>）。海外オークションの結果をお調べになる場合は、各オークション会社の公式サイトをご確認ください。</p>

          <p>PeatBid がヤフオク落札中央値の週次集計を始めた 2026-05-25 時点の白州12年は <strong>20,900円</strong>（n=242）、最新の 2026-11-02 は <strong>20,680円</strong>（n=222）で、この間の変化は <strong>-1.1%</strong> です（出典: PeatBid 集計・<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">算出方法</Link>）。集計期間が24週分のため、数年単位の値動きについては、このデータからは判断できません。</p>


          <h2 id="takaku-uru">8. 白州12年を高く売るための7つのポイント</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを揃える</strong> — 付属品の有無により、査定額が10〜20%変動する場合があります。シミ・破れがあると、さらに評価が下がります</li>
            <li><strong>未開封の状態を保つ</strong> — 開封済みの場合、査定額は大幅に下がります（20〜40%）。コレクション目的の場合は開栓しないことをおすすめします</li>
            <li><strong>複数の業者で相見積もりを取る</strong> — 同じボトルでも、業者により数万〜数十万円の差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です</li>
            <li><strong>適切な保管環境を保つ</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置きで保管してください。湿度・温度の急激な変化は避けてください</li>
            <li><strong>売却の時期を検討する</strong> — 年末年始・お中元・お歳暮の時期は高値の傾向があります</li>
            <li><strong>ボトリングの年代を業者に伝える</strong> — 古いラベル・ロット番号は、希少価値として評価される場合があります</li>
            <li><strong>状態を写真で記録する</strong> — 事前に複数の角度から撮影しておくと、業者の比較やトラブルの防止に役立ちます</li>
          </ol>

          <h2 id="fake">9. 白州12年の偽物・贋作の見分け方</h2>

          <p>白州12年のような取引価格の高い銘柄には、贋作・偽造ボトルのリスクがあります。真贋の確認には、以下の5点のチェックが有効です。</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で、色ずれがありません。贋作では、にじみ・かすれ・書体の違いが見られます</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリーの山崎・響等にはホログラムシールが貼付されています。贋作では光の反射が不均一な場合があります</li>
            <li><strong>液色と液面の状態</strong> — 正規品は均一な琥珀色で、透明感があります。贋作では色むら・濁り・沈殿物が見られる場合があります</li>
            <li><strong>瓶の形状と底面の刻印</strong> — 正規品は底面にロット番号・製造所コードがあります。贋作では刻印がない、または不自然な場合があります</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークションで購入したものは信頼性が高いと考えられます。個人間取引（メルカリ・ヤフオク）で購入したものは注意が必要です</li>
          </ol>

          <p>疑わしい場合は、お酒の買取専門店に<strong>鑑定査定</strong>を依頼することをおすすめします。</p>

          <h3 id="edition-check">白州12年のエディションの確認方法（ラベルと箱）</h3>
          <p>白州12年は、ラベルの表記とシールの有無で店舗の掲示価格が分かれています。査定に出す前に、次の点を確認してください。</p>
          <ul><li><strong>「SINGLE MALT」か「PURE MALT」か</strong>: 現行品はシングルモルトです。ラベルが「ピュアモルト」の旧ボトルは各店が別の行で掲示しており、30,000〜40,000円 と現行品の約2倍です（LINXAS は「金フチ」「響マーク」で分けています）。</li><li><strong>2021年の再発売品</strong>: サントリーは2021年3月30日の数量限定再発売で、ラベルの英字をブランドカラーの緑に変更したと説明しています（<a href="https://gourmet.watch.impress.co.jp/docs/news/1315154.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">グルメ Watch 2021-03-30</a>）。</li><li><strong>ホログラムシール</strong>: キャップ部分にシールを貼った製品は2022年2月以降に出荷されています（製品により時期は異なる。サントリーホールディングス広報への取材・通年品の一覧に白州12年 700ml。<a href="https://www.j-cast.com/trend/2022/06/17439568.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">J-CAST トレンド 2022-06-17</a>）、開封口とボトル背面の2か所のシールは<strong>2024年3月製造分から</strong>で、順次切り替えのため添付のない商品もしばらく流通するとされています（<a href="https://gourmet.watch.impress.co.jp/docs/news/1572716.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">グルメ Watch 2024-02-29</a>）。シールが無いことだけで偽物とは判断できませんが、掲示価格はシールの有無で分かれます（大黒屋 シール有 19,000円／無 18,000円）。</li><li><strong>100周年記念ラベル・海外向けラベル</strong>: 100周年記念ラベルは 大黒屋 19,000円・リカスタ 19,500円（箱なし 19,000円）・ストックラボ 19,000〜20,000円で現行品とほぼ同じ、海外向けラベルは大黒屋で 16,000円 です。</li></ul>
          <p>掲示価格は各店の参考額で、実際の買取額はボトルの状態や査定時期で変わります。手元のボトルの種類が分からない場合は、ラベル表・裏と箱の写真を送って店に確認してください。</p>

          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が、白州12年と同じ価格帯の銘柄に対応している買取業者を選定しました。それぞれ得意とする領域が異なるため、目的に応じてご利用ください。</p>

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
            <p className="font-bold text-base mb-3 text-ink">目的別の業者の選び方</p>
            <ul className="space-y-2 text-sm text-ink/85">
              <li>✓ <strong>複数社の査定額を比較したい</strong> → ヒカカク！で一括査定を依頼し、専門店の個別査定と比較</li>
              <li>✓ <strong>早く現金化したい</strong> → バイセルの出張買取（最短即日の訪問）</li>
              <li>✓ <strong>地方にお住まいの方・宅配で売却したい方</strong> → リカスタの宅配買取</li>
              <li>✓ <strong>希少銘柄を専門家に査定してほしい</strong> → お酒の買取専門店の個別査定</li>
              <li>✓ <strong>大手の業者に依頼したい</strong> → バイセル（東証グロース上場）</li>
            </ul>
          </div>

          <div className="not-prose">
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">1位: ヒカカク！</h3>
              <span className="text-xs text-amber-dark tracking-wider">一括査定</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>ヒカカク！は、最大20社の買取業者に一括で見積もりを依頼できる比較サービスです。希少銘柄ほど業者間の査定差が大きくなるため、<strong>相場の把握</strong>を目的とした利用に適しています。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>最大20社から一括査定（公式）</li><li>査定は無料で、査定額に納得できない場合は買取を依頼する必要はありません</li><li>ウイスキー・洋酒・ブランデーに対応</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>おすすめの方: <strong>複数社の査定額を比較したい方</strong> / 初めて売却する方</p>` }} className="mt-2 text-sm" />
            <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">ヒカカク！の無料査定を申し込む →</a>
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">2位: バイセル</h3>
              <span className="text-xs text-amber-dark tracking-wider">出張/店頭/宅配</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>東証グロース上場のBuySell Technologiesが運営。累計買取点数4,800万点以上（2015〜2025年の合計・公式）の買取大手で、お酒・ウイスキーの買取に対応しています。<strong>大手の業者に出張買取を依頼したい場合</strong>に適しています。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>東証グロース上場企業が運営</li><li>出張・店頭・宅配の3つの方式に対応</li><li>テレビCMを放映している大手</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>おすすめの方: <strong>大手の業者に依頼したい方</strong></p>` }} className="mt-2 text-sm" />
            <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">バイセルの無料査定を申し込む →</a>
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl font-semibold text-ink !border-l-0 !pl-0 !mt-0">3位: リカスタ</h3>
              <span className="text-xs text-amber-dark tracking-wider">宅配/出張/店頭</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `<p>宅配・出張・店頭で買取を受け付けているお酒の買取サービスです。<strong>店舗に行く時間がない方・地方にお住まいの方</strong>に適しています。査定料・キャンセル料は無料です。</p>` }} />
            <p className="text-sm font-bold mt-3 mb-2 text-ink">主な強み</p>
            <ul className="text-sm text-warm-gray list-disc list-inside"><li>全国から宅配買取を受付</li><li>査定料・キャンセル料は無料</li><li>送料・梱包キットは無料</li></ul>
            <div dangerouslySetInnerHTML={{ __html: `<p>おすすめの方: <strong>宅配で売却したい方</strong> / 地方にお住まいの方</p>` }} className="mt-2 text-sm" />
            <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-block mt-3 px-5 py-2 rounded-lg text-sm">リカスタの無料査定を申し込む →</a>
          </div>
          </div>

          <h2 id="process">11. 売却プロセス5ステップ</h2>

          <p>白州12年を売却する際の標準的な流れを、5つのステップにまとめました。</p>

          <ol>
            <li><strong>状態確認・付属品の準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃えます</li>
            <li><strong>相場の確認</strong> — 当サイトなどで現在の相場を確認し、お持ちのボトルの目安価格を把握します</li>
            <li><strong>複数の業者への見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒の買取専門店に個別で2〜3社、合計5〜8社から見積もりを取得します</li>
            <li><strong>査定額の比較・業者の選定</strong> — 査定額だけでなく、手数料・キャンセル料・送料・支払い方法を含めて判断します</li>
            <li><strong>売却契約・入金の確認</strong> — 売却契約後、店頭買取では即日現金、宅配買取では1〜3営業日での銀行振込が一般的です</li>
          </ol>

          <p>全体の所要期間は<strong>1〜2週間</strong>が目安です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州12年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">12. 白州12年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '白州12年の市場相場はいくらですか？', a: '白州12年の市場相場は20,680円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=222、取得日 2026-11-02）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' }, { q: '白州12年の買取価格は店舗によって異なりますか？', a: '異なります。2026-11-08 に各店の公開ページで確認した掲示価格は、ストックラボ 19,000円〜20,000円（白州 12年／白州 12年 箱なし／白州 12年 100周年・2026-11-06更新）、LINXAS（リンクサス） 19,300円（白州12年 700ml・2026-10-04更新）、リカスタ 19,300円（白州 12年 現行品・日付表記なし更新）、大黒屋 19,000円（白州 12年 シングルモルト ホログラムシール有・2026-11-07更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' }, { q: '白州12年を高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' }, { q: '開封済みの白州12年でも買取できますか？', a: 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' }, { q: '白州12年は箱なしでも買取してもらえますか？', a: 'はい、買取の対象です。2026-11-08 に各店の掲載ページで確認した箱なしの掲示は 18,800〜20,000円（LINXAS 18,800円・リカスタ 19,000円・大黒屋 19,000円・ストックラボ 19,000〜20,000円）で、箱ありとの差は 0〜500円 でした（大黒屋とストックラボは箱の有無で同額・同レンジ）。冊子やカートンが残っている場合はあわせて査定に出してください。' }, { q: '白州12年に偽物・贋作はありますか？', a: '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' }, { q: '白州12年の保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' }, { q: '白州12年は税金がかかりますか？', a: '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'ラベルが「PURE MALT」の白州12年はいくらですか？', a: '2026-11-08 に確認した掲示価格では、現行のシングルモルトとは別の行で 30,000〜40,000円 です（LINXAS 金フチ 箱あり 40,000円／箱なし 34,000円・響マーク 35,000円／30,000円、大黒屋 700ml 箱有 35,000円／箱無 32,000円・750ml 38,000円／35,000円、買取エリート 上限 33,000円）。' }, { q: '白州12年は終売したのですか？', a: '終売ではありません。原酒不足で2018年に休売となり、サントリーは2021年3月30日に数量限定で全国再発売しています（グルメ Watch 2021-03-30）。' }, { q: '白州12年を売る時期はいつがよいですか？', a: '需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。' }, { q: '白州12年と他の銘柄は、どちらを先に売るべきですか？', a: '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' }].map((faq) => (
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

          <h2>白州12年に関するその他の解説</h2>
          <p>白州12年に関するテーマ別の解説は、以下のページをご覧ください。</p>
          <ul>
              <li><Link href="/articles/hakushu-nisemono-mikata/" className="text-amber-dark hover:underline font-bold">白州（全種）の偽物の見分け方</Link></li>
              <li><Link href="/articles/hakushu-12-takaku-uru/" className="text-amber-dark hover:underline">白州12年の高価売却のポイント</Link></li>
              <li><Link href="/articles/hakushu-12-nisemono-mikata/" className="text-amber-dark hover:underline">白州12年の偽物の見分け方</Link></li>
              <li><Link href="/articles/hakushu-12-ranking/" className="text-amber-dark hover:underline">白州12年の買取業者ランキング</Link></li>
              <li><Link href="/articles/hakushu-12-rekishi/" className="text-amber-dark hover:underline">白州12年の歴史と特徴</Link></li>
              <li><Link href="/articles/hakushu-12-kihaku/" className="text-amber-dark hover:underline">白州12年の希少性・投資価値</Link></li>
              <li><Link href="/articles/hakushu-12-auction-suii/" className="text-amber-dark hover:underline">白州12年のオークション推移</Link></li>
              <li><Link href="/articles/hakushu-12-kaifu-zumi/" className="text-amber-dark hover:underline">白州12年の開封済みボトルの買取</Link></li>
              <li><Link href="/articles/hakushu-12-hako-nashi/" className="text-amber-dark hover:underline">白州12年の箱なしボトルの買取</Link></li>
              <li><Link href="/articles/hakushu-12-label-yogore/" className="text-amber-dark hover:underline">白州12年のラベル汚れがある場合の査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 857,199円</p></Link>
            <Link href="/articles/hibiki-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">響30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 536,525円</p></Link>
            <Link href="/articles/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市20年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 247,500円</p></Link>
            <Link href="/articles/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">竹鶴25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 193,600円</p></Link>
            <Link href="/articles/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎18年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 91,760円</p></Link>
            <Link href="/articles/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">軽井沢12年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 80,700円</p></Link>
          </div>

          <h2>年代指定なし・注目銘柄の買取相場</h2>
          <p>「年代指定なし（ノンエイジ／NV）」で検索されやすい主要銘柄の実勢買取相場です。ジャパニーズ・スコッチの銘柄を対象に、毎週更新しています。</p>
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
              <li><Link href="/articles/taketsuru-kaitori/" className="text-amber-dark hover:underline">竹鶴（ピュアモルト・12年〜35年の一覧）の買取相場</Link></li>
          </ul>

          <h2>熟成年数の表記がないボトルをお持ちの方へ</h2>
          <p>ラベルに「12年」「25年」などの表記がないボトルは、買取店では「年代指定なし」「ノンエイジ」「NV（ノンヴィンテージ）」と呼ばれ、年数表記のあるボトルとは別に相場が形成されます。銘柄ごとの相場は、以下のページに掲載しています。</p>
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

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-11-02）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
