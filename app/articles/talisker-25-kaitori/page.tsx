import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/talisker-25.json";

export const metadata: Metadata = {
  title: 'タリスカー25年の買取価格・相場【2026年10月最新】ボトリング年別の買取実績｜タリスカー10年・18年の実績も',
  description: 'タリスカー25年の買取価格を店舗の掲示価格と買取実績で確認（2026年10月25日）。大黒屋の掲示95,000円（1975-2001 ナチュラルカスクストレングス）、買取実績24,000〜82,400円。タリスカー10年（マップラベル旧ボトル）・18年の買取実績、ヤフオク落札中央値（毎週更新）も掲載。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'タリスカー25年の市場相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": 'タリスカー25年の市場相場は49,249円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=32、取得日 2026-10-26）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' } }, { "@type": "Question", "name": 'タリスカー25年の買取価格は店舗によって異なりますか？', "acceptedAnswer": { "@type": "Answer", "text": '異なります。2026-10-26 に各店の公開ページで確認した掲示価格は、大黒屋 95,000円（タリスカー 25年 1975-2001 ナチュラルカスクストレングス・2026-10-25更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' } }, { "@type": "Question", "name": 'タリスカー25年を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' } }, { "@type": "Question", "name": '開封済みのタリスカー25年でも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' } }, { "@type": "Question", "name": 'タリスカー25年は箱なしでも買取してもらえますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約39,400〜44,320円）で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' } }, { "@type": "Question", "name": 'タリスカー25年に偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' } }, { "@type": "Question", "name": 'タリスカー25年の保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' } }, { "@type": "Question", "name": 'タリスカー25年は税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'タリスカー25年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" } }, { "@type": "Question", "name": 'タリスカー25年と他の銘柄は、どちらを先に売るべきですか？', "acceptedAnswer": { "@type": "Answer", "text": '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. タリスカー25年の概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "store-prices", label: "4-2. 買取店の掲示価格・推移・定価" },
  { id: "state-price", label: "5. 状態別の業界目安" },
  { id: "price-reasons", label: "6. 価格を左右する要因" },
  { id: "auction", label: "7. オークション落札データ" },
  { id: "takaku-uru", label: "8. 高く売るための7つのポイント" },
  { id: "fake", label: "9. 偽物・贋作の見分け方" },
  { id: "partners", label: "10. おすすめ買取業者3社" },
  { id: "process", label: "11. 売却プロセス5ステップ" },
  { id: "faq", label: "12. よくある質問" },
];

export default function Talisker25KaitoriPage() {
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
            <li><span className="text-foreground">タリスカー25年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/talisker-25.png" alt="タリスカー25年の買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">タリスカー25年の買取相場と業者比較ガイド【2026年10月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-26 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <section aria-labelledby="quick-price" className="bg-white border-2 border-amber/40 rounded-xl p-5 mb-8 not-prose">
            <h2 id="quick-price" className="text-lg font-bold text-ink mb-2">タリスカー25年の買取価格（2026年10月25日確認）</h2>
            <p className="text-sm text-ink mb-3">タリスカー25年を価格表に掲示しているのは大黒屋のみ（1975-2001 ナチュラルカスクストレングス 95,000円）です。買取実績は 24,000〜82,400円 と、ボトリング年・表記で大きく違います。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">ボトル・状態</th><th className="py-2 pr-3 text-right">買取価格（店舗の掲示）</th><th className="py-2">店舗・確認日</th></tr></thead>
                <tbody><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">25年 ナチュラルカスクストレングス（1975-2001／1978-2004）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">60,000〜95,000円</td><td className="py-2 text-xs text-warm-gray">大黒屋 掲示 1975-2001 95,000円（10/19）／実績 1978-2004 箱付 82,400円（2026-07-13）・1975-2001 箱付 60,000円（2025-02-05）</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">25年 シングルモルト（ボトリング年表記なし）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">24,000〜65,000円</td><td className="py-2 text-xs text-warm-gray">大黒屋 実績 アイル・オブ・スカイ 65,000円（2025-02-22）・箱付 24,000円（2024-01-14）</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">【参考】10年・18年・年数表記なし</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">2,000〜40,000円</td><td className="py-2 text-xs text-warm-gray">価格表の掲示なし。実績：10年 2,000円・マップラベル旧ボトル 38,000〜40,000円・18年 17,000円・ワイルダー・シーズ 4,000〜6,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">【参考】ジョニーウォーカーラベルの旧ボトル（8年・12年 750ml）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">90,000〜95,000円</td><td className="py-2 text-xs text-warm-gray">LINXAS 8年 95,000円・12年 90,000円（2026-10-26更新）／大黒屋 実績 12年 55,000円（2020-06-22）</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">参考: ヤフオク落札中央値（個人間の取引）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">49,249円</td><td className="py-2 text-xs text-warm-gray">PeatBid 集計・取得日 2026-10-26・毎週更新（店舗の買取額ではありません）</td></tr></tbody>
              </table>
            </div>
            <p className="text-[12px] text-warm-gray leading-relaxed mt-3">掲示価格・実績は各店の参考額で、実際の買取額は状態・付属品・査定時期で変わります。</p>
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

          <h2 id="summary">1. タリスカー25年の概要</h2>

          <p>タリスカー25年はスコッチウイスキーの代表的な銘柄の一つで、スカイが手がける25年熟成のボトルです。タリスカー25年。</p>

          

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 年代表記のないタリスカー（ストーム・スカイ等）をお探しの方はこちら → <Link href="/articles/talisker-nv-kaitori/" className="text-amber-dark underline font-bold">タリスカーの年代指定なし(NV)買取相場</Link></p>
          </div>


          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。タリスカー25年は希少度<strong>ミッド</strong>クラスに分類しています。終売・休売後の供給制限により、価格が上昇傾向にある銘柄帯です。市場の流通量は徐々に減少しており、二次流通価格は年単位で15〜30%上昇する傾向があります。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>スコッチウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>スカイ</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>25年熟成</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>45.8%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>ミッド</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>49,249円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. スカイの歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-scotch.png" alt="スカイの蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>スコットランド西海岸のスカイ島です。タリスカー蒸溜所が代表的なシングルモルト蒸溜所として知られ、スモーキーで力強い味わいが特徴です。</p>

          <p>スカイのスコッチウイスキーは、二次流通市場で継続的に取引されています。蒸溜所の歴史と製法は、タリスカー25年のような銘柄の市場価値に影響しています。</p>

          <p>同じ蒸溜所の他の銘柄や同年代の銘柄と比べることで、タリスカー25年の市場における位置付けを確認できます。他のグレード・他の蒸溜所の銘柄は、ページ下部の関連銘柄のリンクからご覧いただけます。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>タリスカー25年の味わいは、熟成期間中に樽から溶け出した成分と、スカイの蒸溜技術によって形成されています。</p>

          <p>長期熟成による複雑な味わいです。シェリー由来のダークフルーツ、ピート由来のスモーキーさ、樽材のオーク・タンニンが一体となっています。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合は、開栓せずに保管することが価値を保つための基本です。開栓すると、香味の揮発と空気との接触による酸化が進み、二次流通市場での評価が大きく下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>タリスカー25年の市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>49,249円</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=32件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">タリスカー25年の買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 640 210" role="img" aria-label="タリスカー25年のヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              <line x1="66" y1="38.9" x2="622" y2="38.9" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="42.4" fontSize="10" fill="#807565" textAnchor="end">50,425</text>
              <line x1="66" y1="97.0" x2="622" y2="97.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="100.5" fontSize="10" fill="#807565" textAnchor="end">49,616</text>
              <line x1="66" y1="155.1" x2="622" y2="155.1" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="158.6" fontSize="10" fill="#807565" textAnchor="end">48,808</text>
              <polyline points="66.0,38.9 116.5,65.9 167.1,74.8 217.6,74.8 268.2,74.8 318.7,74.8 369.3,92.7 419.8,101.4 470.4,155.1 520.9,155.1 571.5,155.1 622.0,123.4" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66.0" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-10: 50,425円（サンプル n=44件）</title></circle>
              <circle cx="116.5" cy="65.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-17: 50,050円（サンプル n=42件）</title></circle>
              <circle cx="167.1" cy="74.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-24: 49,925円（サンプル n=44件）</title></circle>
              <circle cx="217.6" cy="74.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-08-31: 49,925円（サンプル n=44件）</title></circle>
              <circle cx="268.2" cy="74.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-07: 49,925円（サンプル n=44件）</title></circle>
              <circle cx="318.7" cy="74.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-14: 49,925円（サンプル n=44件）</title></circle>
              <circle cx="369.3" cy="92.7" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-21: 49,677円（サンプル n=40件）</title></circle>
              <circle cx="419.8" cy="101.4" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-09-28: 49,555円（サンプル n=38件）</title></circle>
              <circle cx="470.4" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-05: 48,808円（サンプル n=26件）</title></circle>
              <circle cx="520.9" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-12: 48,808円（サンプル n=26件）</title></circle>
              <circle cx="571.5" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-19: 48,808円（サンプル n=26件）</title></circle>
              <circle cx="622.0" cy="123.4" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-26: 49,249円（サンプル n=32件）</title></circle>
              <text x="618.0" y="113.4" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">49,249円</text>
              <text x="66.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">8/10</text>
              <text x="318.7" y="198" fontSize="10" fill="#807565" textAnchor="middle">9/14</text>
              <text x="622.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">10/26</text>
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">期間 2026-08-10〜2026-10-26（週次12点・各点のサンプル数 n=26〜44件）。出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜に更新。買取額を保証するものではありません。</p>
          </div>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、<strong>3社以上、できれば4社以上で相見積もり</strong>を取ることをおすすめします。</p>

          <p>当サイトでは、以下の3業者のページへのリンクを参考として掲載しています（各社の最新の査定額・キャンペーンは、各社のページでご確認ください）。</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています</li>
          </ul>

          <h3 id="store-prices">タリスカー25年の買取店の掲示価格（店舗別比較・2026年10月26日確認）</h3>

          <p>各店が自社サイトに公開しているタリスカー25年の参考買取価格と買取実績を、PeatBid編集部が 2026-10-26 に各ページで確認した値です。2026-10-26 時点で、タリスカー25年の行を価格表に掲示しているのは大黒屋（ウイスキー買取強化ランキング）のみで、その行は 1975-2001 ボトリングのナチュラルカスクストレングスです。LINXAS は総合価格表（2026-10-26更新）にタリスカーの旧ボトル・ボトラーズ品の3行（8年・12年 ジョニーウォーカーラベル、ゴードン＆マクファイル 1956）を掲示していますが、25年と現行の10年・18年の行はありません。ストックラボ・ファイブニーズ・リカスタはタリスカーの価格表を掲示していません（ファイブニーズ・LINXAS・大黒屋は買取実績を公開）。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">タリスカー 25年 1975-2001 ナチュラルカスクストレングス<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">95,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-25</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">【参考】タリスカー 8年 ジョニーウォーカーラベル 750ml<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">95,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-26</td><td className="py-2"><a href="https://linxas.shop/prices/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">【参考】タリスカー 12年 ジョニーウォーカーラベル 750ml<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">90,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-26</td><td className="py-2"><a href="https://linxas.shop/prices/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">【参考】ゴードン＆マクファイル タリスカー 1956 オリジナルカスク<br /><span className="text-warm-gray text-xs">ボトラーズ</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">350,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-26</td><td className="py-2"><a href="https://linxas.shop/prices/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          <p>標準的な700mlボトルの掲示価格は <strong>95,000〜95,000円</strong> で、PeatBid が集計しているヤフオク落札中央値 <strong>49,249円</strong>（取得日 2026-10-26）の <strong>193〜193%</strong> にあたります。中央値は個人間の落札額、掲示価格は店舗が買い取る際の参考額であり、両者を比較することで店舗に売却した場合のおおよその金額を把握できます。</p>
          <p>店舗の掲示価格は大黒屋の 95,000円（タリスカー 25年 1975-2001 ナチュラルカスクストレングス・2026-10-19 更新）のみです。大黒屋の買取実績では、25年は 1978-2004 ナチュラルカスクストレングス 箱付 82,400円（2026-07-13）、25年 シングルモルト アイル・オブ・スカイ 65,000円（2025-02-22）、1975-2001 ナチュラルカスクストレングス 箱付 60,000円（2025-02-05）、25年 シングルモルト 箱付 24,000円（2024-01-14）と、ボトリング年・表記で大きく違います。年数表記なし（ストーム・スカイ・ポートリー・ダークストーム等）と10年・18年は、どの店も価格表に行がありません（2026-10-25 確認）。買取実績では 10年 2,000円（ファイブニーズ 2026-08-06）、10年 マップラベル旧ボトル 40,000円（大黒屋 2026-10-02 箱付）・38,000円（ファイブニーズ 2026-07-17）、18年 17,000円（ファイブニーズ 2025-04-27）、ワイルダー・シーズ パーレイ 4,000〜6,000円 です。<br />年数表記のないタリスカーは <Link href="/articles/talisker-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy">タリスカーの年代指定なし（NV）買取相場</Link> をご覧ください。</p>

          <h3 id="store-records">タリスカー25年の買取実績（各店の公開分・日付付き）</h3>
          <p>各店が自社サイトに掲載しているタリスカー25年の買取実績です。実績は、その日にその店舗で買い取った金額であり、ボトルの状態や付属品の有無の記載方法は店舗により異なります（2026年10月26日確認）。</p>

          <p className="text-sm font-bold mt-6">大黒屋</p>
          <ul className="text-sm"><li>2026年7月13日　タリスカー 25年 1978-2004 ナチュラルカスクストレングス 箱付　<strong>82,400円</strong></li><li>2025年2月22日　タリスカー 25年 シングルモルト アイル・オブ・スカイ　<strong>65,000円</strong></li><li>2025年2月5日　タリスカー 25年 1975-2001 ナチュラルカスクストレングス 箱付　<strong>60,000円</strong></li><li>2024年1月14日　タリスカー 25年 シングルモルト 箱付　<strong>24,000円</strong></li><li>2019年11月18日　タリスカー 25年 1978-2004 ナチュラルカスクストレングス 箱　<strong>34,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://kaitori.e-daikoku.com/liquor/whisky/talisker/ex/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">大黒屋の掲載ページ</a>（タリスカー買取実績（買取参考価格）から25年の行を転記）</p>

          <p className="text-sm font-bold mt-6">大黒屋</p>
          <ul className="text-sm"><li>2026年10月2日　【参考】タリスカー 10年 マップラベル 旧ボトル 箱付　<strong>40,000円</strong></li><li>2026年3月10日　【参考】タリスカー 30年 シングルモルト 700ml 45.8% 箱付　<strong>65,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://kaitori.e-daikoku.com/liquor/whisky/talisker/ex/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">大黒屋の掲載ページ</a>（【参考】25年以外の行）</p>

          <p className="text-sm font-bold mt-6">ファイブニーズ</p>
          <ul className="text-sm"><li>2026年8月13日　【参考】タリスカー ワイルダー シーズ パーレイ 700ml　<strong>4,000円</strong></li><li>2026年8月6日　【参考】タリスカー 10年 700ml　<strong>2,000円</strong></li><li>2026年7月17日　【参考】タリスカー 10年 旧ボトル マップラベル 700ml　<strong>38,000円</strong></li><li>2025年6月11日　【参考】タリスカー 8年 スペシャルリリース 2024 ナチュラル カスク ストレングス 700ml　<strong>8,000円</strong></li><li>2025年4月27日　【参考】タリスカー シングルモルト スコッチウイスキー 18年 45.8％ 700ml　<strong>17,000円</strong></li><li>2023年12月18日　【参考】タリスカー 10年 シングルモルト 旧ラベル 700ml　<strong>2,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.sakekaitori.com/whisky/scotch_whiskey/talisker_brand/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズの掲載ページ</a>（【参考】タリスカーの買取実績（25年の行はなし））</p>

          <p className="text-sm font-bold mt-6">LINXAS（リンクサス）</p>
          <ul className="text-sm"><li>2026年3月22日　【参考】タリスカー×パーレイ ワイルダー・シーズ　<strong>6,000円</strong></li><li>2024年10月28日　【参考】タリスカーワイルダーシーズパーレイ　<strong>4,500円</strong></li><li>2024年7月1日　【参考】タリスカーワイルダーシーズ　<strong>6,000円</strong></li><li>2023年9月8日　【参考】タリスカー8年　<strong>9,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/talisker/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（リンクサス）の掲載ページ</a>（【参考】タリスカーの買取実績（価格表の掲示なし・25年の行なし））</p>

          <p className="text-sm font-bold mt-6">大黒屋</p>
          <ul className="text-sm"><li>2025年3月18日　タリスカー 45年 グレイシャルエッジ パーレイ フォー ジ オーシャンズ 完品　<strong>300,000円</strong></li><li>2024年9月30日　タリスカー 43年 エクスペディションシリーズ 箱/冊子付　<strong>300,000円</strong></li><li>2021年8月15日　タリスカー 30年 シングルモルト 700ml 45.8% 箱付　<strong>45,000円</strong></li><li>2020年6月22日　タリスカー 12年 旧ボトル ジョニーウォーカーラベル　<strong>55,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://kaitori.e-daikoku.com/liquor/whisky/talisker/ex/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">大黒屋の掲載ページ</a>（タリスカーの買取実績のうち、25年以外の長期熟成・旧ボトル（2026-10-26 確認））</p>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>タリスカー25年の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。<strong>実際の査定額は業者により異なります</strong>ので、最終的な金額は各業者のページでご確認ください。</p>

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
                <tr><td>未開封・付属品完備</td><td>箱・冊子・カートン揃い</td><td>市場相場の95〜100%程度</td><td><strong>約46,790〜49,250円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>市場相場の80〜90%程度</td><td><strong>約39,400〜44,320円</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td>市場相場の85〜95%程度</td><td><strong>約41,860〜46,790円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>市場相場の75〜88%程度</td><td><strong>約36,940〜43,340円</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td>市場相場の60〜75%程度</td><td><strong>約29,550〜36,940円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>市場相場の55〜70%程度</td><td><strong>約27,090〜34,470円</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td>市場相場の30〜40%程度</td><td><strong>約14,770〜19,700円</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td>市場相場の15〜25%程度</td><td><strong>約7,390〜12,310円</strong></td></tr>
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

          <h3 id="hako-nashi-souba">タリスカー25年を箱なし・付属品なしで売る場合の買取相場</h3>

          <p>箱や付属品がない場合の目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度（約39,400〜44,320円）</strong>です。外箱・冊子の揃った完品と比べて1〜2割の減額が目安のため、<strong>箱がない場合でも売却は可能です</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって異なります。箱なしの場合は特に<strong>複数業者での相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品が残っている場合は、あわせて査定に出してください</strong>（一部でも評価の対象になります）</li>
            <li>詳しくは<Link href="/articles/talisker-25-hako-nashi/" className="text-amber-dark hover:underline">タリスカー25年を箱なしで売る場合の解説</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. タリスカー25年の価格を左右する要因</h2>

          <p>タリスカー25年の二次流通価格を左右する主な要因は、次の5つです。</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果は、日本の買取業者の仕入れ価格の基準の一つとなっています</li>
            <li><strong>需給バランスと供給制限</strong> — 25年熟成の銘柄は供給量が限られており、需要が拡大すると価格が上昇しやすい傾向があります</li>
            <li><strong>為替レートの影響</strong> — 円安の局面では海外の購入者の購買力が高まり、国内相場も連動して上昇する傾向があります</li>
            <li><strong>スカイの国際的評価</strong> — World Whiskies Awards、ISC等の品評会での評価は、国際的な需要に影響します</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮の時期に需要が高まり、相場が上昇する傾向があります</li>
          </ol>

          <p>売却の時期は、上記の要因と市場の動向を確認したうえでご判断ください。将来の価格は保証されるものではありません。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、タリスカー25年と同じ価格帯の銘柄が継続的に取引されています。主なオークションと、それぞれの特徴は以下のとおりです。</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催され、高額銘柄が中心です。<br/><strong>Bonhams（香港・ロンドン）</strong>: 高額銘柄が中心です。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次のオンラインオークションで、中価格帯の銘柄まで幅広く扱っています。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次で開催されています。<br/><strong>Whisky Hammer（UK）</strong>: 月次のオンラインオークションです。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」で閲覧できます。日本の買取業者の査定額は、海外の落札データに加え、輸送コスト・関税・業者の利益を考慮して算出されるのが一般的です。</p>

          <p>PeatBid がヤフオク落札中央値の週次集計を始めた 2026-05-25 時点のタリスカー25年は <strong>7,785円</strong>（n=88）、最新の 2026-10-26 は <strong>49,249円</strong>（n=32）で、この間の変化は <strong>+532.6%</strong> です（出典: PeatBid 集計・<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">算出方法</Link>）。集計期間が23週分のため、数年単位の値動きについては、このデータからは判断できません。</p>


          <h2 id="takaku-uru">8. タリスカー25年を高く売るための7つのポイント</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを揃える</strong> — 付属品の有無により、査定額が10〜20%変動する場合があります。シミ・破れがあると、さらに評価が下がります</li>
            <li><strong>未開封の状態を保つ</strong> — 開封済みの場合、査定額は大幅に下がります（20〜40%）。コレクション目的の場合は開栓しないことをおすすめします</li>
            <li><strong>複数の業者で相見積もりを取る</strong> — 同じボトルでも、業者により数万〜数十万円の差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です</li>
            <li><strong>適切な保管環境を保つ</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置きで保管してください。湿度・温度の急激な変化は避けてください</li>
            <li><strong>売却の時期を検討する</strong> — 年末年始・お中元・お歳暮の時期は高値の傾向があります。海外オークションの結果が出た直後も、相場が上昇しやすい時期です</li>
            <li><strong>ボトリングの年代を業者に伝える</strong> — 古いラベル・ロット番号は、希少価値として評価される場合があります</li>
            <li><strong>状態を写真で記録する</strong> — 事前に複数の角度から撮影しておくと、業者の比較やトラブルの防止に役立ちます</li>
          </ol>

          <h2 id="fake">9. タリスカー25年の偽物・贋作の見分け方</h2>

          <p>タリスカー25年のような取引価格の高い銘柄には、贋作・偽造ボトルのリスクがあります。真贋の確認には、以下の5点のチェックが有効です。</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で、色ずれがありません。贋作では、にじみ・かすれ・書体の違いが見られます</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリーの山崎・響等にはホログラムシールが貼付されています。贋作では光の反射が不均一な場合があります</li>
            <li><strong>液色と液面の状態</strong> — 正規品は均一な琥珀色で、透明感があります。贋作では色むら・濁り・沈殿物が見られる場合があります</li>
            <li><strong>瓶の形状と底面の刻印</strong> — 正規品は底面にロット番号・製造所コードがあります。贋作では刻印がない、または不自然な場合があります</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークションで購入したものは信頼性が高いと考えられます。個人間取引（メルカリ・ヤフオク）で購入したものは注意が必要です</li>
          </ol>

          <p>疑わしい場合は、お酒の買取専門店に<strong>鑑定査定</strong>を依頼することをおすすめします。</p>

          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が、タリスカー25年と同じ価格帯の銘柄に対応している買取業者を選定しました。それぞれ得意とする領域が異なるため、目的に応じてご利用ください。</p>

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

          <p>タリスカー25年を売却する際の標準的な流れを、5つのステップにまとめました。</p>

          <ol>
            <li><strong>状態確認・付属品の準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃えます</li>
            <li><strong>相場の確認</strong> — 当サイトなどで現在の相場を確認し、お持ちのボトルの目安価格を把握します</li>
            <li><strong>複数の業者への見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒の買取専門店に個別で2〜3社、合計5〜8社から見積もりを取得します</li>
            <li><strong>査定額の比較・業者の選定</strong> — 査定額だけでなく、手数料・キャンセル料・送料・支払い方法を含めて判断します</li>
            <li><strong>売却契約・入金の確認</strong> — 売却契約後、店頭買取では即日現金、宅配買取では1〜3営業日での銀行振込が一般的です</li>
          </ol>

          <p>全体の所要期間は<strong>1〜2週間</strong>が目安です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">タリスカー25年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">12. タリスカー25年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'タリスカー25年の市場相場はいくらですか？', a: 'タリスカー25年の市場相場は49,249円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=32、取得日 2026-10-26）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' }, { q: 'タリスカー25年の買取価格は店舗によって異なりますか？', a: '異なります。2026-10-26 に各店の公開ページで確認した掲示価格は、大黒屋 95,000円（タリスカー 25年 1975-2001 ナチュラルカスクストレングス・2026-10-25更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' }, { q: 'タリスカー25年を高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' }, { q: '開封済みのタリスカー25年でも買取できますか？', a: 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' }, { q: 'タリスカー25年は箱なしでも買取してもらえますか？', a: 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約39,400〜44,320円）で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' }, { q: 'タリスカー25年に偽物・贋作はありますか？', a: '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' }, { q: 'タリスカー25年の保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' }, { q: 'タリスカー25年は税金がかかりますか？', a: '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'タリスカー25年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" }, { q: 'タリスカー25年と他の銘柄は、どちらを先に売るべきですか？', a: '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' }].map((faq) => (
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

          <h2>タリスカー25年に関するその他の解説</h2>
          <p>タリスカー25年に関するテーマ別の解説は、以下のページをご覧ください。</p>
          <ul>
              <li><Link href="/articles/talisker-25-takaku-uru/" className="text-amber-dark hover:underline">タリスカー25年の高価売却のポイント</Link></li>
              <li><Link href="/articles/talisker-25-nisemono-mikata/" className="text-amber-dark hover:underline">タリスカー25年の偽物の見分け方</Link></li>
              <li><Link href="/articles/talisker-25-ranking/" className="text-amber-dark hover:underline">タリスカー25年の買取業者ランキング</Link></li>
              <li><Link href="/articles/talisker-25-rekishi/" className="text-amber-dark hover:underline">タリスカー25年の歴史と特徴</Link></li>
              <li><Link href="/articles/talisker-25-kihaku/" className="text-amber-dark hover:underline">タリスカー25年の希少性・投資価値</Link></li>
              <li><Link href="/articles/talisker-25-auction-suii/" className="text-amber-dark hover:underline">タリスカー25年のオークション推移</Link></li>
              <li><Link href="/articles/talisker-25-kaifu-zumi/" className="text-amber-dark hover:underline">タリスカー25年の開封済みボトルの買取</Link></li>
              <li><Link href="/articles/talisker-25-hako-nashi/" className="text-amber-dark hover:underline">タリスカー25年の箱なしボトルの買取</Link></li>
              <li><Link href="/articles/talisker-25-label-yogore/" className="text-amber-dark hover:underline">タリスカー25年のラベル汚れがある場合の査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/macallan-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">マッカラン30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 350,543円</p></Link>
            <Link href="/articles/macallan-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">マッカラン25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 210,874円</p></Link>
            <Link href="/articles/springbank-21-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">スプリングバンク21年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 103,613円</p></Link>
            <Link href="/articles/laphroaig-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">ラフロイグ25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 66,750円</p></Link>
            <Link href="/articles/bowmore-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">ボウモア25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 66,000円</p></Link>
            <Link href="/articles/glenfiddich-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">グレンフィディック30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 61,856円</p></Link>
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

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-26）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
