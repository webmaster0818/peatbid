import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/yamazaki-25.json";

export const metadata: Metadata = {
  title: '山崎25年の買取価格・相場【2026年10月最新】新型79〜82万円・旧型80〜86万円｜6店比較・シール有無別',
  description: '山崎25年の買取価格を6店の掲示価格で比較（2026年10月23日確認）。新型（ホログラムシール有り・完品）790,000〜820,000円、旧型（完品）800,000〜860,000円。シールの有無・リミテッドエディション・ベロアケースの価格、定価の推移、買取実績、ヤフオク落札中央値（毎週更新）も掲載。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '山崎25年の市場相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": '山崎25年の市場相場は854,149円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=30、取得日 2026-10-26）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' } }, { "@type": "Question", "name": '山崎25年の買取価格は店舗によって異なりますか？', "acceptedAnswer": { "@type": "Answer", "text": '異なります。2026-10-23 に各店の公開ページで確認した掲示価格は、大黒屋 800,000円（山崎 25年 新型 ホログラムシール有 山崎(QRコード)シール付・2026-10-19更新）、LINXAS（リンクサス） 820,000円（山崎25年新型 ホログラム緑シール付き・2026-10-13更新）、ストックラボ 790,000円〜791,000円（山崎 25年 新型 ホログラムシール有り・2026-10-21更新）、リカスタ 820,000円（山崎 25年 現行品 完備品・日付表記なし更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' } }, { "@type": "Question", "name": '山崎25年を高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' } }, { "@type": "Question", "name": '開封済みの山崎25年でも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' } }, { "@type": "Question", "name": '山崎25年は箱なしでも買取してもらえますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約683,320〜768,730円）で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' } }, { "@type": "Question", "name": '山崎25年に偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' } }, { "@type": "Question", "name": '山崎25年の保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' } }, { "@type": "Question", "name": '山崎25年は税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'かかる場合があります。国税庁（タックスアンサー No.3105）は、家具・衣服など生活に通常必要な動産の売却は課税しないとする一方、「貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるもの」は除くとしています。ウイスキーがこの「書画、骨とうなど」に当たるかは同ページに記載されていませんが、山崎25年は1本で30万円を超えて取引されるため、非課税と判断せず確認が必要です。課税される場合は総合課税の譲渡所得で、売却額−(取得費＋譲渡費用)から特別控除50万円（その年の譲渡益の合計から）を引き、保有期間が5年を超える場合は2分の1が課税対象です（No.3152）。給与を1か所から受けている会社員の方は給与・退職所得以外の所得の合計が20万円を超えると確定申告が必要です（No.1900）。個別の判断は税務署・税理士にご確認ください（2026-10-23確認）。' } }, { "@type": "Question", "name": '山崎25年は新型と旧型のどちらが高く売れますか？', "acceptedAnswer": { "@type": "Answer", "text": '2026-10-23 に確認した掲示価格では、旧型（完品）が 800,000〜860,000円、新型（ホログラムシール有り・完品）が 790,000〜820,000円 で、旧型を同じか高く掲示している店がほとんどです（大黒屋 旧型 840,000円／新型 800,000円、LINXAS 860,000円／820,000円、ストックラボ 800,000〜801,000円／790,000〜791,000円、買取エリート 上限 860,000円／800,000円）。' } }, { "@type": "Question", "name": 'ホログラムシールが無い山崎25年は偽物ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'シールが無いことだけでは判断できません。サントリーは、ホログラムシールの貼付は22年2月以降（キャップシール）・24年3月以降製造分（ラベル上部）を目途に始めたもので、シールのない商品・1種類のみ・2種類貼付の商品が市場に混在しており、この取り組みは「真贋判定を目的としたものではありません」と案内しています。ただし買取店の掲示価格はシールの有無で分かれており、新型の完品でシール無しは 700,000〜771,000円、シール有りは 790,000〜820,000円 です（2026-10-23 確認）。' } }, { "@type": "Question", "name": '山崎25年の定価はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": 'サントリーの商品情報ページの希望小売価格は 415,000円（税別、2026-10-23 確認）です。希望小売価格は、2022年4月に 125,000円 → 160,000円、2024年4月に 360,000円 に改定され、2026年4月1日出荷分からも価格改定が行われています（サントリー ニュースリリース No.14030・No.14499・No.14932）。買取店の掲示価格（新型・完品で 790,000〜820,000円）は、税込の希望小売価格 456,500円 を上回っています。' } }, { "@type": "Question", "name": '山崎25年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" } }, { "@type": "Question", "name": '山崎25年と他の銘柄は、どちらを先に売るべきですか？', "acceptedAnswer": { "@type": "Answer", "text": '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. 山崎25年の概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "store-prices", label: "4-2. 買取店の掲示価格・推移・定価" },
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

export default function Yamazaki25KaitoriPage() {
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
            <li><span className="text-foreground">山崎25年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/yamazaki-25.png" alt="山崎25年の買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">山崎25年の買取価格・相場【2026年10月】6店の掲示価格と新型・旧型・ホログラムシールの差</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-26 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <section aria-labelledby="quick-price" className="bg-white border-2 border-amber/40 rounded-xl p-5 mb-8 not-prose">
            <h2 id="quick-price" className="text-lg font-bold text-ink mb-2">山崎25年の買取価格（2026年10月23日確認）</h2>
            <p className="text-sm text-ink mb-3">買取店が自社サイトに掲示している山崎25年（700ml・未開封）の買取価格を、ボトルの世代・シールの有無・付属品ごとにまとめました。店舗別の内訳と出典は <a href="#store-prices" className="text-amber-dark underline hover:text-burgundy">4-2. 買取店の掲示価格</a> にあります。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">ボトル・状態</th><th className="py-2 pr-3 text-right">買取価格（店舗の掲示）</th><th className="py-2">店舗・確認日</th></tr></thead>
                <tbody><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">新型・ホログラムシール有り・完品</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">790,000〜820,000円</td><td className="py-2 text-xs text-warm-gray">LINXAS 820,000円・リカスタ 820,000円・大黒屋（QRコードシール付）800,000円・ストックラボ 790,000〜791,000円・買取エリート（新型）〜800,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">新型・QRコードシール無し・完品</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">770,000〜780,000円</td><td className="py-2 text-xs text-warm-gray">大黒屋 780,000円・リカスタ 770,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">新型・ホログラムシール無し・完品</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">700,000〜771,000円</td><td className="py-2 text-xs text-warm-gray">ストックラボ 770,000〜771,000円・大黒屋 730,000円・LINXAS 700,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">旧型（2021年以前）・完品</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">800,000〜860,000円</td><td className="py-2 text-xs text-warm-gray">LINXAS 860,000円・買取エリート（旧型）〜860,000円・リカスタ 850,000円・大黒屋 840,000円・ストックラボ 800,000〜801,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">旧型・ボトルのみ（箱・付属品なし）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">700,000円</td><td className="py-2 text-xs text-warm-gray">リカスタ（新型のボトルのみは大黒屋・リカスタとも「お問い合わせ」）</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">リミテッドエディション</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">743,000〜850,000円</td><td className="py-2 text-xs text-warm-gray">LINXAS 850,000円・大黒屋 743,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">ベロアケース（1998〜2005年ボトルイン）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">お問い合わせ</td><td className="py-2 text-xs text-warm-gray">大黒屋</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">直近の買取実績（各店の公開分）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">780,000〜870,000円</td><td className="py-2 text-xs text-warm-gray">ファイブニーズ 2026-08-10 新ボトル 780,000円／ストックラボ 2025-11-29 4店 各870,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">参考: ヤフオク落札中央値（個人間の取引）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">854,149円</td><td className="py-2 text-xs text-warm-gray">PeatBid 集計・取得日 2026-10-26・毎週更新（店舗の買取額ではありません）</td></tr></tbody>
              </table>
            </div>
            <p className="text-[12px] text-warm-gray leading-relaxed mt-3">店舗側の価格の更新日: 買取エリート 2026-10-23・ストックラボ 2026-10-21・大黒屋 2026-10-19・LINXAS 2026-09-30〜10-13（行ごとに異なる）・リカスタ 記載なし。「完品」「完備品」「箱あり」は店舗ごとの表記をそのまま載せています。掲示価格は未開封・状態良好を前提にした参考額で、実際の買取額は査定で決まります。</p>
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

          <h2 id="summary">1. 山崎25年の概要</h2>

          <p>山崎25年はジャパニーズウイスキーの代表的な銘柄の一つで、山崎蒸溜所が手がける25年熟成のボトルです。山崎25年。プレミア中のプレミア。希少性極高。</p>

          

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 年代表記のない「山崎」（ノンエイジ／NV）をお探しの方はこちら → <Link href="/articles/yamazaki-nv-kaitori/" className="text-amber-dark underline font-bold">山崎ノンエイジの買取相場ガイド</Link></p>
          </div>


          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。山崎25年は希少度<strong>ウルトラ</strong>クラスに分類しています。極めて希少な長期熟成銘柄です。Sotheby's・Bonhamsなどの海外オークションの落札データが査定の基準となり、主な購入層は富裕層やコレクターです。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>山崎蒸溜所</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>25年熟成</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>43%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>ウルトラ</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>854,149円</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. 山崎蒸溜所の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-japanese.png" alt="山崎蒸溜所の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>1923年（大正12年）にサントリーが京都・山崎に開設した、日本最初の本格モルトウイスキー蒸溜所です。三方を山に囲まれた湿潤な気候のもと、千利休が茶の湯に使ったとされる湧水「離宮の水」を仕込み水に用いています。山崎は日本のウイスキー文化発祥の地とされ、国際的にも高く評価されています。</p>

          <p>山崎蒸溜所のジャパニーズウイスキーは、二次流通市場で継続的に取引されています。蒸溜所の歴史と製法は、山崎25年のような銘柄の市場価値に影響しています。</p>

          <p>同じ蒸溜所の他の銘柄や同年代の銘柄と比べることで、山崎25年の市場における位置付けを確認できます。他のグレード・他の蒸溜所の銘柄は、ページ下部の関連銘柄のリンクからご覧いただけます。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>山崎25年の味わいは、熟成期間中に樽から溶け出した成分と、山崎蒸溜所の蒸溜技術によって形成されています。</p>

          <p>シェリー樽由来のドライフルーツケーキ、ダークチョコレート、煙草の葉、ミズナラ樽由来のオリエンタルな香りがあります。複雑な味わいで、長いフィニッシュが続きます。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合は、開栓せずに保管することが価値を保つための基本です。開栓すると、香味の揮発と空気との接触による酸化が進み、二次流通市場での評価が大きく下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>山崎25年の市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>854,149円</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=30件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">山崎25年の買取相場 直近12週の推移（ヤフオク落札中央値・毎週更新）</p>
            <svg viewBox="0 0 640 210" role="img" aria-label="山崎25年のヤフオク落札中央値の週次推移グラフ" className="w-full h-auto">
              <line x1="66" y1="38.9" x2="622" y2="38.9" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="42.4" fontSize="10" fill="#807565" textAnchor="end">867,100</text>
              <line x1="66" y1="97.0" x2="622" y2="97.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="100.5" fontSize="10" fill="#807565" textAnchor="end">860,624</text>
              <line x1="66" y1="155.1" x2="622" y2="155.1" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="60" y="158.6" fontSize="10" fill="#807565" textAnchor="end">854,149</text>
              <polyline points="66.0,65.8 344.0,38.9 622.0,155.1" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66.0" cy="65.8" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-13: 864,100円（サンプル n=29件）</title></circle>
              <circle cx="344.0" cy="38.9" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-19: 867,100円（サンプル n=30件）</title></circle>
              <circle cx="622.0" cy="155.1" r="3.5" fill="#C9923D" stroke="#fff" strokeWidth="1.5"><title>2026-10-26: 854,149円（サンプル n=30件）</title></circle>
              <text x="618.0" y="145.1" fontSize="11" fontWeight="bold" fill="#8A5A18" textAnchor="end">854,149円</text>
              <text x="66.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">10/13</text>
              <text x="344.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">10/19</text>
              <text x="622.0" y="198" fontSize="10" fill="#807565" textAnchor="middle">10/26</text>
            </svg>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">期間 2026-10-13〜2026-10-26（週次3点・各点のサンプル数 n=29〜30件）。出典: ヤフオク実落札データの週次中央値（過去180日・IQR外れ値除去）・毎週月曜に更新。買取額を保証するものではありません。</p>
          </div>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、<strong>3社以上、できれば4社以上で相見積もり</strong>を取ることをおすすめします。</p>

          <p>当サイトでは、以下の3業者のページへのリンクを参考として掲載しています（各社の最新の査定額・キャンペーンは、各社のページでご確認ください）。</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています</li>
          </ul>

          <h3 id="store-prices">山崎25年の買取店の掲示価格（店舗別比較・2026年10月23日確認）</h3>

          <p>各店が自社サイトに公開している山崎25年の参考買取価格を、PeatBid編集部が 2026-10-23 に各ページで確認した値です。「店舗側の更新日」は、各ページに記載されている価格の更新日です。山崎25年は、新型（2021年以降の現行ボトル）・旧型・ホログラムシールの有無・リミテッドエディションで価格が分かれているため、行を分けて掲載しています。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">山崎 25年 新型 ホログラムシール有 山崎(QRコード)シール付<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">800,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">山崎 25年 新型 ホログラムシール有 山崎(QRコード)シール無<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">780,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">山崎 25年 新型 ホログラムシール無<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">730,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">山崎 25年 旧型<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">840,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">山崎 25年 リミテッドエディション<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">743,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">山崎 25年 1998〜2005ボトルイン（ベロアケース）<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">お問い合わせ</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">山崎25年新型 ホログラム緑シール付き<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">820,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-13</td><td className="py-2"><a href="https://linxas.shop/whiskey/yamazaki/yamazaki25years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">山崎25年新型 ホログラム無し<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">700,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-04</td><td className="py-2"><a href="https://linxas.shop/whiskey/yamazaki/yamazaki25years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">山崎25年旧型<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">860,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/yamazaki/yamazaki25years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">山崎25年リミテッドエディション<br /><span className="text-warm-gray text-xs">箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">850,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/yamazaki/yamazaki25years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ストックラボ</td><td className="py-2 pr-3">山崎 25年 新型 ホログラムシール有り<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">790,000円〜791,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-21</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/yamazaki/age25-2/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ストックラボ</td><td className="py-2 pr-3">山崎 25年 新型 ホログラムシール無し<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">770,000円〜771,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-21</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/yamazaki/age25-2/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ストックラボ</td><td className="py-2 pr-3">山崎 25年 旧型<br /><span className="text-warm-gray text-xs">完品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">800,000円〜801,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-21</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/yamazaki/age25-2/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">山崎 25年 現行品 完備品<br /><span className="text-warm-gray text-xs">完備品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">820,000円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/suntory-yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">山崎 25年 現行品 完備品 ※QRシールなし<br /><span className="text-warm-gray text-xs">完備品</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">770,000円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/suntory-yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">山崎 25年 旧ボトル 完備品 ※キャップ響ロゴあり／旧ボトル ボトルのみ<br /><span className="text-warm-gray text-xs">完備品／ボトルのみ</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">850,000円／700,000円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/suntory-yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">買取エリート</td><td className="py-2 pr-3">サントリー山崎 25年 新型／旧型<br /><span className="text-warm-gray text-xs">上限</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜800,000円／〜860,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-23</td><td className="py-2"><a href="https://kaitori-off.net/liquor/whisky/yamazaki/25years" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          <p>標準的な700mlボトルの掲示価格は <strong>790,000〜820,000円</strong> で、PeatBid が集計しているヤフオク落札中央値 <strong>854,149円</strong>（取得日 2026-10-26）の <strong>92〜96%</strong> にあたります。中央値は個人間の落札額、掲示価格は店舗が買い取る際の参考額であり、両者を比較することで店舗に売却した場合のおおよその金額を把握できます。</p>
          <p>新型でホログラムシールのある完品は、4店で 790,000〜820,000円（大黒屋 800,000円・LINXAS 820,000円・リカスタ 820,000円・ストックラボ 790,000〜791,000円）です。ホログラムシールの無い新型は 700,000〜771,000円（LINXAS 700,000円・大黒屋 730,000円・ストックラボ 770,000〜771,000円）で、シール有りより 2〜12万円 低く掲示されています。旧型の完品は 800,000〜860,000円（ストックラボ 800,000〜801,000円・大黒屋 840,000円・リカスタ 850,000円・LINXAS 860,000円・買取エリート 上限 860,000円）で、5店すべてが新型（シール有り）と同じか高い価格にしています。リミテッドエディションは 大黒屋 743,000円・LINXAS 850,000円 と店で差があります。箱・付属品の無い「ボトルのみ」は、リカスタ（旧ボトル 700,000円）以外は「お問い合わせ」です。</p>
          <p className="text-sm bg-cream/40 border border-amber/30 rounded-lg p-4 not-prose">「新型」「旧型」は、LINXAS・ストックラボの説明では2021年のリニューアルの前後を指します。LINXAS は「2021年7月よりボトルが大幅な変更」「2021年以前のボトルが旧型」、ストックラボは「ミズナラ布箱」の山崎25年を「2021年7月から販売」と説明しています。ホログラムシールの有無で価格を分けている店（大黒屋・LINXAS・ストックラボ）と、山崎のQRコードシールの有無で分けている店（大黒屋・リカスタ）があります。査定を依頼する際は、箱の種類（紙箱・布箱・ベロアケース）、ボトル裏面のホログラムシールとQRコードシールの有無を伝えると、店舗ごとの呼び方の違いによる行き違いを防げます。</p>

          <h3 id="store-trend">山崎25年（新型・ホログラムシール有り・完品）の買取価格の推移（ストックラボの買取実績・月別中央値）</h3>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">山崎25年（新型 ホログラムシール有り 完品）の買取実績の月次推移（ストックラボ掲示・2023年11月〜2025年6月）</p>
            <p className="text-[12px] text-warm-gray mb-2">買取実績の無い月は点がありません。同店のこのボトルの実績は2025年6月が最後で、2025年7月〜2026年9月は「買取実績なし」です。同店のグラフには2025年4月に 490,000円 の値がありますが、前後の月（2025年1月 955,000円・5月 885,000円）から大きく外れており、状態の内訳も記載されていないため、このグラフと表では除外しています。</p>
            <svg viewBox="0 0 640 205" role="img" aria-label="山崎25年の買取店掲示価格の月次推移グラフ" className="w-full h-auto">
              <line x1="70" y1="30.0" x2="622" y2="30.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="33.5" fontSize="10" fill="#807565" textAnchor="end">1,220,000</text>
              <line x1="70" y1="95.0" x2="622" y2="95.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="98.5" fontSize="10" fill="#807565" textAnchor="end">1,052,500</text>
              <line x1="70" y1="160.0" x2="622" y2="160.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="163.5" fontSize="10" fill="#807565" textAnchor="end">885,000</text>
              <polyline points="70.0,96.0 128.1,30.0 157.2,35.8 215.3,37.8 302.4,80.4 331.5,82.8 418.6,123.1 476.7,132.8 592.9,160.0 622.0,160.0" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="70.0" cy="96.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2023年11月: 1,050,000円</title></circle>
              <circle cx="128.1" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年1月: 1,220,000円</title></circle>
              <circle cx="157.2" cy="35.8" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年2月: 1,205,000円</title></circle>
              <circle cx="215.3" cy="37.8" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年4月: 1,200,000円</title></circle>
              <circle cx="302.4" cy="80.4" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年7月: 1,090,000円</title></circle>
              <circle cx="331.5" cy="82.8" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年8月: 1,084,000円</title></circle>
              <circle cx="418.6" cy="123.1" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年11月: 980,000円</title></circle>
              <circle cx="476.7" cy="132.8" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年1月: 955,000円</title></circle>
              <circle cx="592.9" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年5月: 885,000円</title></circle>
              <circle cx="622.0" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年6月: 885,000円</title></circle>
              <text x="70.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2023年11月</text>
              <text x="331.5" y="192" fontSize="10" fill="#807565" textAnchor="middle">2024年8月</text>
              <text x="622.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2025年6月</text>
              
            </svg>
            <p className="text-[12px] text-ink leading-relaxed mt-2">2023年11月 1,050,000円 → 2025年6月 885,000円（期間中の最高 1,220,000円・最低 885,000円）。</p>
            <details className="mt-2 text-[12px] text-warm-gray">
              <summary className="cursor-pointer">月別の数値を表で見る（10か月）</summary>
              <table className="mt-2"><tbody><tr><td className="py-1 pr-4">2023年11月</td><td className="py-1 text-right">1,050,000円</td></tr><tr><td className="py-1 pr-4">2024年1月</td><td className="py-1 text-right">1,220,000円</td></tr><tr><td className="py-1 pr-4">2024年2月</td><td className="py-1 text-right">1,205,000円</td></tr><tr><td className="py-1 pr-4">2024年4月</td><td className="py-1 text-right">1,200,000円</td></tr><tr><td className="py-1 pr-4">2024年7月</td><td className="py-1 text-right">1,090,000円</td></tr><tr><td className="py-1 pr-4">2024年8月</td><td className="py-1 text-right">1,084,000円</td></tr><tr><td className="py-1 pr-4">2024年11月</td><td className="py-1 text-right">980,000円</td></tr><tr><td className="py-1 pr-4">2025年1月</td><td className="py-1 text-right">955,000円</td></tr><tr><td className="py-1 pr-4">2025年5月</td><td className="py-1 text-right">885,000円</td></tr><tr><td className="py-1 pr-4">2025年6月</td><td className="py-1 text-right">885,000円</td></tr></tbody></table>
            </details>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: <a href="https://www.stock-lab.com/osake-kaitori/whiskey/yamazaki/age25-2/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ストックラボ「山崎25年（新型 ホログラムシール有り 完品）の買取実績」の価格推移グラフ</a>（同ページ掲載のグラフの値を転記）。ストックラボの買取実績にもとづく月ごとの中央値（税込換算・グラフの更新日 2026/10/07、2026-10-23 確認）であり、実際の買取額を保証するものではありません。</p>
          </div>

          <h3 id="store-records">山崎25年の買取実績（各店の公開分・日付付き）</h3>
          <p>各店が自社サイトに掲載している山崎25年の買取実績です。実績は、その日にその店舗で買い取った金額であり、ボトルの状態や付属品の有無の記載方法は店舗により異なります（2026年10月23日確認）。</p>

          <p className="text-sm font-bold mt-6">ファイブニーズ</p>
          <ul className="text-sm"><li>2026年8月10日　サントリー 山崎 25年 シングルモルト 新ボトル 700ml　<strong>780,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.sakekaitori.com/whisky/japanese_whiskey/yamazaki_brand/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズの掲載ページ</a>（同ページの買取実績から山崎25年を転記（2026-10-23 確認））</p>

          <p className="text-sm font-bold mt-6">ストックラボ</p>
          <ul className="text-sm"><li>2025年11月29日　山崎25年 700ml（高槻・成田・谷町九丁目・東大阪布施の各店）　<strong>各870,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.stock-lab.com/osake-kaitori/whiskey/yamazaki/age25-2/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ストックラボの掲載ページ</a>（同ページの「新着買取実績」を全件転記（2026-10-23 確認））</p>

          <h3 id="teika">山崎25年の定価（メーカー希望小売価格）の推移</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">期間</th><th className="py-2 pr-3 text-right">希望小売価格（税別）</th><th className="py-2 pr-3">内容</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">〜2022年3月</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">125,000円</td><td className="py-2 pr-3">山崎25年 700ml</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14030.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2022年4月〜2024年3月</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">160,000円</td><td className="py-2 pr-3">2022年4月1日出荷分から改定（発表 2021-11-29）</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14030.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2024年4月〜2026年3月</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">360,000円</td><td className="py-2 pr-3">2024年4月1日出荷分から改定（発表 2023-11-21）</td><td className="py-2"><a href="https://www.suntory.co.jp/news/article/14499.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap">2026年4月〜</td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">415,000円</td><td className="py-2 pr-3">2026年4月1日出荷分からの価格改定（発表 2025-11-04 No.14932）後の、サントリー商品情報ページの希望小売価格（税別・2026-10-23確認）。同ページは「年間生産本数千数百本の限定品」と記載</td><td className="py-2"><a href="https://products.suntory.co.jp/d/4901777347700/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー発表</a></td></tr></tbody>
            </table>
          </div>
          <p>現在の希望小売価格 415,000円（税別）は税込 456,500円です。ヤフオク落札中央値 854,149円 はその <strong>1.87倍</strong>。二次流通では、定価を上回る水準で取引されています。</p>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>山崎25年の査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。<strong>実際の査定額は業者により異なります</strong>ので、最終的な金額は各業者のページでご確認ください。</p>

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
                <tr><td>未開封・付属品完備</td><td>箱・冊子・カートン揃い</td><td>市場相場の95〜100%程度</td><td><strong>約811,440〜854,150円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>市場相場の80〜90%程度</td><td><strong>約683,320〜768,730円</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td>市場相場の85〜95%程度</td><td><strong>約726,030〜811,440円</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>市場相場の75〜88%程度</td><td><strong>約640,610〜751,650円</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td>市場相場の60〜75%程度</td><td><strong>約512,490〜640,610円</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>市場相場の55〜70%程度</td><td><strong>約469,780〜597,900円</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td>市場相場の30〜40%程度</td><td><strong>約256,240〜341,660円</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td>市場相場の15〜25%程度</td><td><strong>約128,120〜213,540円</strong></td></tr>
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

          <h3 id="hako-nashi-souba">山崎25年を箱なし・付属品なしで売る場合の買取相場</h3>

          <p>箱や付属品がない場合の目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度（約683,320〜768,730円）</strong>です。外箱・冊子の揃った完品と比べて1〜2割の減額が目安のため、<strong>箱がない場合でも売却は可能です</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって異なります。箱なしの場合は特に<strong>複数業者での相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品が残っている場合は、あわせて査定に出してください</strong>（一部でも評価の対象になります）</li>
            <li>詳しくは<Link href="/articles/yamazaki-25-hako-nashi/" className="text-amber-dark hover:underline">山崎25年を箱なしで売る場合の解説</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. 山崎25年の価格を左右する要因</h2>

          <p>山崎25年の二次流通価格を左右する主な要因は、次の5つです。</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果は、日本の買取業者の仕入れ価格の基準の一つとなっています</li>
            <li><strong>需給バランスと供給制限</strong> — 25年熟成の銘柄は供給量が限られており、需要が拡大すると価格が上昇しやすい傾向があります</li>
            <li><strong>為替レートの影響</strong> — 円安の局面では海外の購入者の購買力が高まり、国内相場も連動して上昇する傾向があります</li>
            <li><strong>山崎蒸溜所の国際的評価</strong> — World Whiskies Awards、ISC等の品評会での評価は、国際的な需要に影響します</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮の時期に需要が高まり、相場が上昇する傾向があります</li>
          </ol>

          <p>売却の時期は、上記の要因と市場の動向を確認したうえでご判断ください。将来の価格は保証されるものではありません。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、山崎25年と同じ価格帯の銘柄が継続的に取引されています。主なオークションと、それぞれの特徴は以下のとおりです。</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催され、高額銘柄が中心です。<br/><strong>Bonhams（香港・ロンドン）</strong>: 高額銘柄が中心です。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次のオンラインオークションで、中価格帯の銘柄まで幅広く扱っています。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次で開催されています。<br/><strong>Whisky Hammer（UK）</strong>: 月次のオンラインオークションです。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」で閲覧できます。日本の買取業者の査定額は、海外の落札データに加え、輸送コスト・関税・業者の利益を考慮して算出されるのが一般的です。</p>



          <h2 id="takaku-uru">8. 山崎25年を高く売るための7つのポイント</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを揃える</strong> — 付属品の有無により、査定額が10〜20%変動する場合があります。シミ・破れがあると、さらに評価が下がります</li>
            <li><strong>未開封の状態を保つ</strong> — 開封済みの場合、査定額は大幅に下がります（20〜40%）。コレクション目的の場合は開栓しないことをおすすめします</li>
            <li><strong>複数の業者で相見積もりを取る</strong> — 同じボトルでも、業者により数万〜数十万円の差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です</li>
            <li><strong>適切な保管環境を保つ</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置きで保管してください。湿度・温度の急激な変化は避けてください</li>
            <li><strong>売却の時期を検討する</strong> — 年末年始・お中元・お歳暮の時期は高値の傾向があります。海外オークションの結果が出た直後も、相場が上昇しやすい時期です</li>
            <li><strong>ボトリングの年代を業者に伝える</strong> — 古いラベル・ロット番号は、希少価値として評価される場合があります</li>
            <li><strong>状態を写真で記録する</strong> — 事前に複数の角度から撮影しておくと、業者の比較やトラブルの防止に役立ちます</li>
          </ol>

          <h2 id="fake">9. 山崎25年の偽物・贋作の見分け方</h2>

          <p>山崎25年のような取引価格の高い銘柄には、贋作・偽造ボトルのリスクがあります。真贋の確認には、以下の5点のチェックが有効です。</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で、色ずれがありません。贋作では、にじみ・かすれ・書体の違いが見られます</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリーの山崎・響等にはホログラムシールが貼付されています。贋作では光の反射が不均一な場合があります</li>
            <li><strong>液色と液面の状態</strong> — 正規品は均一な琥珀色で、透明感があります。贋作では色むら・濁り・沈殿物が見られる場合があります</li>
            <li><strong>瓶の形状と底面の刻印</strong> — 正規品は底面にロット番号・製造所コードがあります。贋作では刻印がない、または不自然な場合があります</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークションで購入したものは信頼性が高いと考えられます。個人間取引（メルカリ・ヤフオク）で購入したものは注意が必要です</li>
          </ol>

          <p>疑わしい場合は、お酒の買取専門店に<strong>鑑定査定</strong>を依頼することをおすすめします。</p>

          <h3 id="edition-check">山崎25年のエディションの確認方法（ラベルと箱）</h3>
          <p>山崎25年は、ボトルの世代・箱の種類・シールの有無で店舗の掲示価格が分かれています。査定に出す前に、次の点を確認してください。</p>
          <ul><li><strong>新型か旧型か</strong>: LINXAS は、2021年7月にボトルが大幅に変わり、それ以前のボトルを「旧型」と説明しています。ストックラボは、現行の「ミズナラ布箱」はミズナラ樽・スパニッシュオーク樽・アメリカンオーク樽を使った商品で2021年7月から販売、旧型の「紙箱」は最も生産本数が多いタイプと説明しています。</li><li><strong>ベロアケース</strong>: ストックラボは、ベロアケースの山崎25年は1998〜2005年に販売され、ラベルにボトリング年号やサントリーの金花が印字されたもの（年号入り）と、印字の無いもの（年号なし）があると説明しています。大黒屋は1998〜2005年のボトルインを年ごとに「お問い合わせ」で掲示しています。</li><li><strong>背面の刻印・ラベル</strong>: LINXAS は、旧型の初期はガラス瓶の刻印が「SUNTORY SINGLE MALT WHISKY」で、途中から「SUNTORY WHISKY」に変わったこと、2015年ごろに背面ラベルの社名がサントリー酒類（株）からサントリースピリッツ（株）に変わったことを、時期の目安として挙げています。</li><li><strong>ホログラムシール（サントリー公式）</strong>: サントリーは公式ページ「ブランドを守る取り組みについてのご案内」で、山崎25年を含む山崎の一部製品に2種類のホログラムシールを貼って出荷していると案内しています。①ボトル裏面のキャップシールのホログラムシール（22年2月以降を目途に出荷開始）、②ボトル裏面のラベル上部のホログラムシール（24年3月以降製造分を目途に出荷開始予定）。出荷時期の異なる商品が混在しているため「ホログラムシールのない商品・1種類のみ貼付商品・2種類貼付商品」があり、この取り組みは「真贋判定を目的としたものではありません」と明記しています。シールが無いことだけで偽物とは判断できません。</li><li><strong>QRコードシール</strong>: 大黒屋は「山崎(QRコード)シール付／無」、リカスタは「QRシールなし」を別の行で掲示しています。上記のサントリーの山崎のページには、QRコードシールについての記載はありません。</li><li><strong>リミテッドエディション</strong>: ストックラボは、空港限定販売の商品で長期熟成シェリー樽を使用した最後の商品と説明しています。通常品とは別の価格で扱われます（大黒屋 743,000円・LINXAS 850,000円）。</li></ul>
          <p>出典: <a href="https://www.suntory.co.jp/whisky/qrcodesticker/manual-yamazaki/?o20=true" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー「ブランドを守る取り組みについてのご案内」（山崎）</a>・<a href="https://products.suntory.co.jp/d/4901777347700/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サントリー 商品情報（山崎25年）</a>・<a href="https://linxas.shop/whiskey/yamazaki/yamazaki25years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a>・<a href="https://www.stock-lab.com/osake-kaitori/whiskey/yamazaki/age25-2/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ストックラボ</a>・<a href="https://kaitori.e-daikoku.com/liquor/whisky/yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">大黒屋</a>・<a href="https://www.licasta.com/item/whisky/suntory-yamazaki/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">リカスタ</a>（2026-10-23確認）。判別できない場合は、正面・背面・キャップ・箱の写真を添えて査定を依頼してください。</p>

          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が、山崎25年と同じ価格帯の銘柄に対応している買取業者を選定しました。それぞれ得意とする領域が異なるため、目的に応じてご利用ください。</p>

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

          <p>山崎25年を売却する際の標準的な流れを、5つのステップにまとめました。</p>

          <ol>
            <li><strong>状態確認・付属品の準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃えます</li>
            <li><strong>相場の確認</strong> — 当サイトなどで現在の相場を確認し、お持ちのボトルの目安価格を把握します</li>
            <li><strong>複数の業者への見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒の買取専門店に個別で2〜3社、合計5〜8社から見積もりを取得します</li>
            <li><strong>査定額の比較・業者の選定</strong> — 査定額だけでなく、手数料・キャンセル料・送料・支払い方法を含めて判断します</li>
            <li><strong>売却契約・入金の確認</strong> — 売却契約後、店頭買取では即日現金、宅配買取では1〜3営業日での銀行振込が一般的です</li>
          </ol>

          <p>全体の所要期間は<strong>1〜2週間</strong>が目安です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">山崎25年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">12. 山崎25年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '山崎25年の市場相場はいくらですか？', a: '山崎25年の市場相場は854,149円（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=30、取得日 2026-10-26）。業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動するため、最新の査定額は LINXAS / バイセル / 福ちゃん など各業者のページで直接ご確認ください。' }, { q: '山崎25年の買取価格は店舗によって異なりますか？', a: '異なります。2026-10-23 に各店の公開ページで確認した掲示価格は、大黒屋 800,000円（山崎 25年 新型 ホログラムシール有 山崎(QRコード)シール付・2026-10-19更新）、LINXAS（リンクサス） 820,000円（山崎25年新型 ホログラム緑シール付き・2026-10-13更新）、ストックラボ 790,000円〜791,000円（山崎 25年 新型 ホログラムシール有り・2026-10-21更新）、リカスタ 820,000円（山崎 25年 現行品 完備品・日付表記なし更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' }, { q: '山崎25年を高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' }, { q: '開封済みの山崎25年でも買取できますか？', a: 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' }, { q: '山崎25年は箱なしでも買取してもらえますか？', a: 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度（約683,320〜768,730円）で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' }, { q: '山崎25年に偽物・贋作はありますか？', a: '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' }, { q: '山崎25年の保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' }, { q: '山崎25年は税金がかかりますか？', a: 'かかる場合があります。国税庁（タックスアンサー No.3105）は、家具・衣服など生活に通常必要な動産の売却は課税しないとする一方、「貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるもの」は除くとしています。ウイスキーがこの「書画、骨とうなど」に当たるかは同ページに記載されていませんが、山崎25年は1本で30万円を超えて取引されるため、非課税と判断せず確認が必要です。課税される場合は総合課税の譲渡所得で、売却額−(取得費＋譲渡費用)から特別控除50万円（その年の譲渡益の合計から）を引き、保有期間が5年を超える場合は2分の1が課税対象です（No.3152）。給与を1か所から受けている会社員の方は給与・退職所得以外の所得の合計が20万円を超えると確定申告が必要です（No.1900）。個別の判断は税務署・税理士にご確認ください（2026-10-23確認）。' }, { q: '山崎25年は新型と旧型のどちらが高く売れますか？', a: '2026-10-23 に確認した掲示価格では、旧型（完品）が 800,000〜860,000円、新型（ホログラムシール有り・完品）が 790,000〜820,000円 で、旧型を同じか高く掲示している店がほとんどです（大黒屋 旧型 840,000円／新型 800,000円、LINXAS 860,000円／820,000円、ストックラボ 800,000〜801,000円／790,000〜791,000円、買取エリート 上限 860,000円／800,000円）。' }, { q: 'ホログラムシールが無い山崎25年は偽物ですか？', a: 'シールが無いことだけでは判断できません。サントリーは、ホログラムシールの貼付は22年2月以降（キャップシール）・24年3月以降製造分（ラベル上部）を目途に始めたもので、シールのない商品・1種類のみ・2種類貼付の商品が市場に混在しており、この取り組みは「真贋判定を目的としたものではありません」と案内しています。ただし買取店の掲示価格はシールの有無で分かれており、新型の完品でシール無しは 700,000〜771,000円、シール有りは 790,000〜820,000円 です（2026-10-23 確認）。' }, { q: '山崎25年の定価はいくらですか？', a: 'サントリーの商品情報ページの希望小売価格は 415,000円（税別、2026-10-23 確認）です。希望小売価格は、2022年4月に 125,000円 → 160,000円、2024年4月に 360,000円 に改定され、2026年4月1日出荷分からも価格改定が行われています（サントリー ニュースリリース No.14030・No.14499・No.14932）。買取店の掲示価格（新型・完品で 790,000〜820,000円）は、税込の希望小売価格 456,500円 を上回っています。' }, { q: '山崎25年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" }, { q: '山崎25年と他の銘柄は、どちらを先に売るべきですか？', a: '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' }].map((faq) => (
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

          <h2>山崎25年に関するその他の解説</h2>
          <p>山崎25年に関するテーマ別の解説は、以下のページをご覧ください。</p>
          <ul>
              <li><Link href="/articles/yamazaki-nisemono-mikata/" className="text-amber-dark hover:underline font-bold">山崎（全種）の偽物の見分け方</Link></li>
              <li><Link href="/articles/yamazaki-25-takaku-uru/" className="text-amber-dark hover:underline">山崎25年の高価売却のポイント</Link></li>
              <li><Link href="/articles/yamazaki-25-nisemono-mikata/" className="text-amber-dark hover:underline">山崎25年の偽物の見分け方</Link></li>
              <li><Link href="/articles/yamazaki-25-ranking/" className="text-amber-dark hover:underline">山崎25年の買取業者ランキング</Link></li>
              <li><Link href="/articles/yamazaki-25-rekishi/" className="text-amber-dark hover:underline">山崎25年の歴史と特徴</Link></li>
              <li><Link href="/articles/yamazaki-25-kihaku/" className="text-amber-dark hover:underline">山崎25年の希少性・投資価値</Link></li>
              <li><Link href="/articles/yamazaki-25-auction-suii/" className="text-amber-dark hover:underline">山崎25年のオークション推移</Link></li>
              <li><Link href="/articles/yamazaki-25-kaifu-zumi/" className="text-amber-dark hover:underline">山崎25年の開封済みボトルの買取</Link></li>
              <li><Link href="/articles/yamazaki-25-hako-nashi/" className="text-amber-dark hover:underline">山崎25年の箱なしボトルの買取</Link></li>
              <li><Link href="/articles/yamazaki-25-label-yogore/" className="text-amber-dark hover:underline">山崎25年のラベル汚れがある場合の査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/hibiki-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">響30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 534,000円</p></Link>
            <Link href="/articles/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市20年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 248,722円</p></Link>
            <Link href="/articles/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">竹鶴25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 193,600円</p></Link>
            <Link href="/articles/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎18年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 91,299円</p></Link>
            <Link href="/articles/yoichi-15-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市15年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 79,999円</p></Link>
            <Link href="/articles/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">軽井沢12年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 76,975円</p></Link>
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
