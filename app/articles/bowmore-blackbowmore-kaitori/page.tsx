import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/bowmore-blackbowmore.json";

export const metadata: Metadata = {
  title: 'ブラックボウモアとは？全6種の違いと買取相場【2026年10月最新】29年〜50年・DB5',
  description: 'ブラックボウモア（1964年蒸留）の全6種＝29年・30年・31年ファイナル・42年・50年・DB5の発売年・度数・本数の違いと見分け方、買取店の掲示価格・買取実績（出典・確認日付き）、海外オークションの結果を掲載しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'ブラックボウモアの市場相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": 'ブラックボウモアは「ブラックボウモア 700ml」でヤフオクを検索すると、ミニチュアや空き瓶の出品が混ざって中央値が実際の価格とかけ離れるため、当サイトでは落札中央値を掲載していません。2026-10-16 に確認した買取店の公開情報では、LINXAS が42年（箱あり）を参考買取価格〜1,500,000円（2026-01-26更新）、ストックラボが1993年瓶詰めのボトルを1,050,000円で買取（実績）、ウイスキー王国が未開封・箱付きの1964を993,000円で買取（実績）と掲載しています。エディションにより価格が変わるため、29年・30年・31年・42年・50年のいずれかを確認してから査定に出してください。' } }, { "@type": "Question", "name": 'ブラックボウモアを高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' } }, { "@type": "Question", "name": '開封済みのブラックボウモアでも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' } }, { "@type": "Question", "name": 'ブラックボウモアは箱なしでも買取してもらえますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' } }, { "@type": "Question", "name": 'ブラックボウモアに偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' } }, { "@type": "Question", "name": 'ブラックボウモアの保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' } }, { "@type": "Question", "name": 'ブラックボウモアは税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'かかる場合があります。国税庁（タックスアンサー No.3105）は、生活に通常必要な動産の売却は課税しないとする一方、「貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるもの」は除くとしています。ウイスキーがこれに当たるかは同ページに記載されていませんが、ブラックボウモアは1本で30万円を超える額で取引されるため、非課税と判断せず確認が必要です。課税される場合は総合課税の譲渡所得で、売却額−（取得費＋譲渡費用）から特別控除50万円を引き、保有期間が5年を超える場合は2分の1が課税対象です（No.3152）。給与を1か所から受けている会社員の方は、給与以外の所得が20万円を超えると確定申告が必要です（No.1900）。個別の判断については、税務署・税理士にご確認ください。' } }, { "@type": "Question", "name": 'ブラックボウモアは何種類ありますか？', "acceptedAnswer": { "@type": "Answer", "text": '1964年蒸留の原酒を使用したボトルは6種です。1993年の29年（ファーストエディション・50%・2,000本）、1994年の30年（セカンド・50%・2,000本）、1995年の31年（ファイナルエディション・49%・1,812本）、2007年の42年（40.5%・827本）、2016年の50年（40.9%・159本）、2020年のアストンマーティンとのコラボ「DB5 1964」（31年・49.6%・27本）です（出典: サザビーズ 2020-11-12 発表、Suntory Global Spirits、Aston Martin、土屋守氏のコラム、LINXAS）。' } }, { "@type": "Question", "name": 'ブラックボウモアの発売当時の値段はいくらでしたか？', "acceptedAnswer": { "@type": "Answer", "text": '1993年のファーストエディションは1本100ポンド（当時約2万円）と土屋守氏のコラムにあり、Dave Broom 氏の記事は80〜110ポンドとしています。42年は2,400ポンド、50年は16,000ポンド（米国の希望小売価格は25,000ドル）、DB5 1964は50,000ポンドで発売されました。' } }, { "@type": "Question", "name": 'ブラックボウモアを売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" } }, { "@type": "Question", "name": 'ブラックボウモアと他の銘柄は、どちらを先に売るべきですか？', "acceptedAnswer": { "@type": "Answer", "text": '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. ブラックボウモアの概要" },
  { id: "editions", label: "1-2. 全エディションの違い（発売年・度数・本数）" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "store-prices", label: "4-2. 買取店の掲示価格・買取実績" },
  { id: "state-price", label: "5. 状態別の業界目安" },
  { id: "price-reasons", label: "6. 価格を左右する要因" },
  { id: "auction", label: "7. オークション落札データ" },
  { id: "auction-results", label: "7-2. 海外オークション結果" },
  { id: "takaku-uru", label: "8. 高く売るための7つのポイント" },
  { id: "fake", label: "9. 偽物・贋作の見分け方" },
  { id: "edition-check", label: "9-2. エディションの確認方法" },
  { id: "partners", label: "10. おすすめ買取業者3社" },
  { id: "process", label: "11. 売却プロセス5ステップ" },
  { id: "faq", label: "12. よくある質問" },
];

export default function BowmoreBlackbowmoreKaitoriPage() {
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
            <li><span className="text-foreground">ブラックボウモア</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/bowmore-blackbowmore.png" alt="ブラックボウモアの買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ブラックボウモアとは？全6種の違いと買取相場・業者比較【2026年10月】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-19 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

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

          <h2 id="summary">1. ブラックボウモアの概要</h2>

          <p>ブラックボウモア（Black Bowmore）は、アイラ島のボウモア蒸溜所で<strong>1964年に蒸留した原酒</strong>を、オロロソシェリー樽で熟成させたシングルモルトのシリーズ名です。黒糖のように濃い色から「ブラック」と名付けられ、1993年の29年物から2020年のアストンマーティンとのコラボ「DB5 1964」まで、<strong>熟成年数・度数・本数の違う6種</strong>がリリースされています。一つの銘柄に複数のボトルがあるため、売却の際はまず<strong>どのエディションか</strong>を確認することが大切です。</p>

          

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 年代表記のないボウモア（No.1・スモールバッチ等）をお探しの方はこちら → <Link href="/articles/bowmore-nv-kaitori/" className="text-amber-dark underline font-bold">ボウモアの年代指定なし(NV)買取相場</Link></p>
          </div>


          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。ブラックボウモアは希少度<strong>ウルトラレア</strong>クラスに分類しています。1990年代の3本は各2,000本前後、42年は827本、50年は159本、DB5は27本と本数が限られ、日本の買取店でも100万円前後の買取実績・掲示価格が公開されている銘柄です（下記の表を参照）。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>スコッチウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>ボウモア蒸溜所（スコットランド・アイラ島）</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>29年〜50年熟成（エディションにより異なる）</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>40.5〜50%（エディションにより異なる）</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml（50年の米国向けは750ml）</td></tr>
                <tr><td><strong>希少度</strong></td><td>ウルトラレア</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>市場相場データ集計中</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h3 id="editions">ブラックボウモアは全6種｜エディション別の発売年・度数・本数</h3>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">エディション</th><th className="py-2 pr-3">発売</th><th className="py-2 pr-3">熟成</th><th className="py-2 pr-3">度数</th><th className="py-2 pr-3">本数</th><th className="py-2 pr-3">発売時の価格</th><th className="py-2">見分けるポイント</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 align-top">ファーストエディション</td><td className="py-2 pr-3 align-top whitespace-nowrap">1993年</td><td className="py-2 pr-3 align-top whitespace-nowrap">29年</td><td className="py-2 pr-3 align-top whitespace-nowrap">50%</td><td className="py-2 pr-3 align-top">2,000本</td><td className="py-2 pr-3 align-top">£80〜110</td><td className="py-2 pr-3 align-top">黒ラベル・木箱</td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 align-top">セカンドエディション</td><td className="py-2 pr-3 align-top whitespace-nowrap">1994年</td><td className="py-2 pr-3 align-top whitespace-nowrap">30年</td><td className="py-2 pr-3 align-top whitespace-nowrap">50%</td><td className="py-2 pr-3 align-top">2,000本</td><td className="py-2 pr-3 align-top">£90〜</td><td className="py-2 pr-3 align-top">「BOTTLED 1994」の表記・木箱</td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 align-top">ファイナルエディション（3作目）</td><td className="py-2 pr-3 align-top whitespace-nowrap">1995年</td><td className="py-2 pr-3 align-top whitespace-nowrap">31年</td><td className="py-2 pr-3 align-top whitespace-nowrap">49%</td><td className="py-2 pr-3 align-top">1,812本 ※</td><td className="py-2 pr-3 align-top">£100〜150</td><td className="py-2 pr-3 align-top">「FINAL EDITION」「BOTTLED 1995」の表記・木箱</td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 align-top">42年</td><td className="py-2 pr-3 align-top whitespace-nowrap">2007年</td><td className="py-2 pr-3 align-top whitespace-nowrap">42年</td><td className="py-2 pr-3 align-top whitespace-nowrap">40.5%</td><td className="py-2 pr-3 align-top">827本</td><td className="py-2 pr-3 align-top">£2,400</td><td className="py-2 pr-3 align-top">下部ラベルに「AGED 42 YEARS」・化粧箱と木箱。ホワイト／ゴールドボウモアとの3部作の1本</td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 align-top">50年（ラストカスク）</td><td className="py-2 pr-3 align-top whitespace-nowrap">2016年</td><td className="py-2 pr-3 align-top whitespace-nowrap">50年</td><td className="py-2 pr-3 align-top whitespace-nowrap">40.9%</td><td className="py-2 pr-3 align-top">159本</td><td className="py-2 pr-3 align-top">£16,000（米国希望小売 $25,000）</td><td className="py-2 pr-3 align-top">木箱に「AGED 50 YEARS」</td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 align-top">DB5 1964（アストンマーティン）</td><td className="py-2 pr-3 align-top whitespace-nowrap">2020年</td><td className="py-2 pr-3 align-top whitespace-nowrap">31年</td><td className="py-2 pr-3 align-top whitespace-nowrap">49.6%</td><td className="py-2 pr-3 align-top">27本（うち販売25本）</td><td className="py-2 pr-3 align-top">£50,000</td><td className="py-2 pr-3 align-top">ボトルにDB5のピストンを封入・カーフスキンの箱</td></tr></tbody>
            </table>
          </div>
          <p className="text-sm">※ファイナルエディションの本数は、ボウモア蒸溜所とサザビーズの発表（2020年）と土屋守氏のコラムが1,812本、Dave Broom 氏の記事（scotchwhisky.com 2016年）が1,182本で、資料によって異なります。発売時価格は英国での価格で、出典ごとに幅があります（ファーストは土屋氏コラムで1本100ポンド＝当時約2万円）。2007年の42年と2016年の50年は、度数が40%台まで下がっている点で1990年代の3本（49〜50%）と区別できます。</p>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.sothebys.com/en/press/sothebys-to-offer-rare-opportunity-to-acquire-the-complete-black-bowmore-whisky-collection-direct-from-the-bowmore-distillery" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サザビーズ プレスリリース（2020-11-12・発売年/熟成年数/本数）</a>・<a href="https://www.suntoryglobalspirits.com/news/black-bowmorer-1964-last-cask-be-rediscovered-arrives-us" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">Suntory Global Spirits（2017-06-12・50年の度数/本数/米国価格）</a>・<a href="https://www.astonmartin.com/en/our-world/news/2020/8/5/-strong-bowmore-strong-strong-and-aston-martin-unveil-first-collaboration-strong-" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">Aston Martin（2020-08・DB5の熟成/度数/本数/価格）</a>・<a href="https://scotchwhisky.com/magazine/in-depth/11657/black-bowmore-from-cask-to-cult-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">scotchwhisky.com Dave Broom（2016-11-07・発売時価格）</a>・<a href="https://www.toplot.jp/column/%E3%83%9C%E3%82%A6%E3%83%A2%E3%82%A2%E3%81%AE%E5%90%8D%E5%89%8D%E3%82%92%E4%B8%96%E7%95%8C%E4%B8%AD%E3%81%AB%E7%9F%A5%E3%82%89%E3%81%97%E3%82%81%E3%81%9F%E5%B9%BB%E3%81%AE%E3%83%96%E3%83%A9%E3%83%83/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">TOPLOT 土屋守（29〜31年の度数・本数）</a>・<a href="https://linxas.shop/whiskey/bowmore/blackbowmore42years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（42年の度数・各ボトルのラベル表記）</a>（2026年10月16日確認）</p>

          <h2 id="distillery">2. ボウモア蒸溜所（スコットランド・アイラ島）の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-scotch.png" alt="ボウモア蒸溜所（スコットランド・アイラ島）の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>スコットランド西海岸のアイラ島は、ピートを効かせたウイスキーの産地として知られています。ボウモア・ラフロイグ・アードベッグ・ラガヴーリンなど、スモーキーな味わいで知られる蒸溜所があります。</p>

          <p>ウイスキー評論家の土屋守氏のコラム（TOPLOT）によると、ボウモアは1779年創業の、アイラ島で最も古い蒸溜所です。1964年蒸留の原酒は、ファーストフィルのオロロソシェリーバット（500リットル）に詰められ、海に面した第1熟成庫「No.1ヴォルツ」に置かれていました（出典: <a href="https://www.toplot.jp/column/%E3%83%9C%E3%82%A6%E3%83%A2%E3%82%A2%E3%81%AE%E5%90%8D%E5%89%8D%E3%82%92%E4%B8%96%E7%95%8C%E4%B8%AD%E3%81%AB%E7%9F%A5%E3%82%89%E3%81%97%E3%82%81%E3%81%9F%E5%B9%BB%E3%81%AE%E3%83%96%E3%83%A9%E3%83%83/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">TOPLOT「ボウモアの名前を世界中に知らしめた幻のブラックボウモア」</a>）。サントリーグローバルスピリッツの発表では、蒸留日は1964年11月5日です（出典: <a href="https://www.suntoryglobalspirits.com/news/black-bowmorer-1964-last-cask-be-rediscovered-arrives-us" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">Suntory Global Spirits 2017-06-12</a>）。</p>

          <p>ボウモア蒸溜所（スコットランド・アイラ島）のスコッチウイスキーは、二次流通市場で継続的に取引されています。蒸溜所の歴史と製法は、ブラックボウモアのような銘柄の市場価値に影響しています。</p>

          <p>同じ蒸溜所の他の銘柄や同年代の銘柄と比べることで、ブラックボウモアの市場における位置付けを確認できます。他のグレード・他の蒸溜所の銘柄は、ページ下部の関連銘柄のリンクからご覧いただけます。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          

          <p>公式のテイスティングノートはエディションごとに異なり、このページでは転載していません。参考として、買取店のLINXASは42年について「ドライフルーツやビターチョコレート、オークの深み」「シェリー由来の甘みとスパイス、穏やかなピート」と紹介しています（出典: <a href="https://linxas.shop/whiskey/bowmore/blackbowmore42years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS ブラックボウモア42年</a>）。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合は、開栓せずに保管することが価値を保つための基本です。開栓すると、香味の揮発と空気との接触による酸化が進み、二次流通市場での評価が大きく下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>ブラックボウモアの市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>市場相場データ集計中</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=82件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、<strong>3社以上、できれば4社以上で相見積もり</strong>を取ることをおすすめします。</p>

          <p>当サイトでは、以下の3業者のページへのリンクを参考として掲載しています（各社の最新の査定額・キャンペーンは、各社のページでご確認ください）。</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています</li>
          </ul>

          <h3 id="store-prices">ブラックボウモアの買取店の掲示価格（店舗別比較・2026年10月16日確認）</h3>

          <p>各店が自社サイトに掲載しているブラックボウモアの参考買取価格・買取実績を、PeatBid編集部が 2026-10-16 に各ページで確認した値です。どのエディションか（29年・30年・31年・42年など）で価格が変わるため、店舗の表記をそのまま掲載しています。「店舗側の更新日」は各ページに記載されている日付で、記載がない場合は「記載なし」としています。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">ブラックボウモア42年 700ml<br /><span className="text-warm-gray text-xs">参考買取価格・箱あり</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜1,500,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-01-26</td><td className="py-2"><a href="https://linxas.shop/whiskey/bowmore/blackbowmore42years/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ストックラボ</td><td className="py-2 pr-3">ブラックボウモア 1964 ファイナルエディション 1st 1964-1993（店の表記のまま）<br /><span className="text-warm-gray text-xs">買取実績（新宿本社）</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">1,050,000円</td><td className="py-2 pr-3 whitespace-nowrap">記載なし</td><td className="py-2"><a href="https://stock-lab.net/whisky/bowmore/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ウイスキー王国</td><td className="py-2 pr-3">ブラック ボウモア 1964 700ml<br /><span className="text-warm-gray text-xs">買取実績・未開封・箱付き</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">993,000円</td><td className="py-2 pr-3 whitespace-nowrap">買取日「8月19日」（年の記載なし）</td><td className="py-2"><a href="https://whisky-oukoku.com/item/whisky/2078/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">買取センター.com</td><td className="py-2 pr-3">ブラックボウモア 30年<br /><span className="text-warm-gray text-xs">最高買取価格（上限の目安）</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">〜900,000円</td><td className="py-2 pr-3 whitespace-nowrap">記載なし</td><td className="py-2"><a href="https://kaitorisake.com/hinmoku/whisky/scotch-single-whisky/%E3%83%9C%E3%82%A6%E3%83%A2%E3%82%A2-2/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ヒカカク！</td><td className="py-2 pr-3">ブラックボウモア 42年 シェリーカスク 40度 木箱付 1964年蒸溜 700ml<br /><span className="text-warm-gray text-xs">最高買取相場</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">450,000円</td><td className="py-2 pr-3 whitespace-nowrap">記載なし</td><td className="py-2"><a href="https://hikakaku.com/category/all-category/maker-brand/BOWMORE/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">おたからや</td><td className="py-2 pr-3">ブラックボウモア 1964 アイラシングルモルト スコッチ<br /><span className="text-warm-gray text-xs">参考買取価格</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">ASK（金額の掲載なし）</td><td className="py-2 pr-3 whitespace-nowrap">2022-01-26時点</td><td className="py-2"><a href="https://www.otakaraya.jp/result/liquor/whiskey/bowmore/121100/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          
          <p>同じ「ブラックボウモア」でも、店舗によって掲載しているエディションが異なります（LINXAS・ヒカカク！は42年、買取センター.comは30年、ストックラボは1993年瓶詰めのボトル）。金額の差はエディションの差でもあるので、手元のボトルの熟成年数（29・30・31・42・50年）と瓶詰め年をラベルで確認してから比較してください。ヒカカク！は42年の度数を「40度」と表記していますが、LINXASの表では40.5%です。なお、お酒買取のライフバケーションは自社サイトで「2012年に買取させて頂いた時は25万円でしたが2016年現在、付属品が付いた場合で60万円以上」と記載しています（出典: <a href="https://www.lv-liquor.com/whiskey/bowmore.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ライフバケーション ボウモアの買取</a>・2026-10-16確認）。</p>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>ブラックボウモアの査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。<strong>実際の査定額は業者により異なります</strong>ので、最終的な金額は各業者のページでご確認ください。</p>

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
                <tr><th>状態</th><th>付属品</th><th>業界目安（市場相場対比）</th></tr>
              </thead>
              <tbody>
                <tr><td>未開封・付属品完備</td><td>箱・冊子・カートン揃い</td><td><strong>市場相場の95〜100%程度</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td><strong>市場相場の80〜90%程度</strong></td></tr>
                <tr><td>未開封・冊子なし</td><td>外箱あり</td><td><strong>市場相場の85〜95%程度</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td><strong>市場相場の75〜88%程度</strong></td></tr>
                <tr><td>未開封・ラベル損傷</td><td>付属あり</td><td><strong>市場相場の60〜75%程度</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td><strong>市場相場の55〜70%程度</strong></td></tr>
                <tr><td>開封済み・9割以上残</td><td>付属あり</td><td><strong>市場相場の30〜40%程度</strong></td></tr>
                <tr><td>開封済み・半分以下残</td><td>付属あり</td><td><strong>市場相場の15〜25%程度</strong></td></tr>
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

          <h3 id="hako-nashi-souba">ブラックボウモアを箱なし・付属品なしで売る場合の買取相場</h3>

          <p>箱や付属品がない場合の目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度</strong>です。外箱・冊子の揃った完品と比べて1〜2割の減額が目安のため、<strong>箱がない場合でも売却は可能です</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって異なります。箱なしの場合は特に<strong>複数業者での相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品が残っている場合は、あわせて査定に出してください</strong>（一部でも評価の対象になります）</li>
            <li>詳しくは<Link href="/articles/bowmore-blackbowmore-hako-nashi/" className="text-amber-dark hover:underline">ブラックボウモアを箱なしで売る場合の解説</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. ブラックボウモアの価格を左右する要因</h2>

          <p>ブラックボウモアの二次流通価格を左右する主な要因は、次の5つです。</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果は、日本の買取業者の仕入れ価格の基準の一つとなっています</li>
            <li><strong>需給バランスと供給制限</strong> — 29〜50年熟成（1964年蒸留）の銘柄は供給量が限られており、需要が拡大すると価格が上昇しやすい傾向があります</li>
            <li><strong>為替レートの影響</strong> — 円安の局面では海外の購入者の購買力が高まり、国内相場も連動して上昇する傾向があります</li>
            <li><strong>ボウモア蒸溜所（スコットランド・アイラ島）の国際的評価</strong> — World Whiskies Awards、ISC等の品評会での評価は、国際的な需要に影響します</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮の時期に需要が高まり、相場が上昇する傾向があります</li>
          </ol>

          <p>売却の時期は、上記の要因と市場の動向を確認したうえでご判断ください。将来の価格は保証されるものではありません。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、ブラックボウモアと同じ価格帯の銘柄が継続的に取引されています。主なオークションと、それぞれの特徴は以下のとおりです。</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催され、高額銘柄が中心です。<br/><strong>Bonhams（香港・ロンドン）</strong>: 高額銘柄が中心です。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次のオンラインオークションで、中価格帯の銘柄まで幅広く扱っています。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次で開催されています。<br/><strong>Whisky Hammer（UK）</strong>: 月次のオンラインオークションです。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」で閲覧できます。日本の買取業者の査定額は、海外の落札データに加え、輸送コスト・関税・業者の利益を考慮して算出されるのが一般的です。</p>



          <h3 id="auction-results">ブラックボウモアの海外オークション結果（出典付き）</h3>
          <p>海外では、ブラックボウモアは次の価格で取引されています。いずれもオークションの結果や予想価格で、日本の買取店がその値段で買い取るという意味ではありません。</p>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">時期</th><th className="py-2 pr-3">ボトル</th><th className="py-2 pr-3">結果</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap align-top">2018年1月</td><td className="py-2 pr-3 align-top">セカンドエディション（30年）1本</td><td className="py-2 pr-3 align-top font-bold">約12,000ポンド弱で落札（「almost £12,000」）</td><td className="py-2 align-top"><a href="https://scotchwhisky.com/magazine/in-depth/11657/black-bowmore-from-cask-to-cult-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">scotchwhisky.com</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap align-top">2021年初め</td><td className="py-2 pr-3 align-top">DB5 1964 1本</td><td className="py-2 pr-3 align-top font-bold">81,000ポンドで落札</td><td className="py-2 align-top"><a href="https://www.australianwhiskyauctions.com.au/news/1964-1995-black-bowmore-final-edition" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">Australian Whisky Auctions（2022-09-24の記事）</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap align-top">2022年8月頃</td><td className="py-2 pr-3 align-top">1993・1994・1995年の3本セット</td><td className="py-2 pr-3 align-top font-bold">40,000ポンドで落札（英国。2022年9月24日の記事で「先月」）</td><td className="py-2 align-top"><a href="https://www.australianwhiskyauctions.com.au/news/1964-1995-black-bowmore-final-edition" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">Australian Whisky Auctions</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3 whitespace-nowrap align-top">2021年春（香港）</td><td className="py-2 pr-3 align-top">5作（29・30・31・42・50年）を収めた蒸溜所の「Archive Cabinet」</td><td className="py-2 pr-3 align-top font-bold">予想価格 HK$4,000,000（US$500,000／£400,000）※落札額ではありません</td><td className="py-2 align-top"><a href="https://www.sothebys.com/en/press/sothebys-to-offer-rare-opportunity-to-acquire-the-complete-black-bowmore-whisky-collection-direct-from-the-bowmore-distillery" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">サザビーズ プレスリリース 2020-11-12</a></td></tr></tbody>
            </table>
          </div>

          <h2 id="takaku-uru">8. ブラックボウモアを高く売るための7つのポイント</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを揃える</strong> — 付属品の有無により、査定額が10〜20%変動する場合があります。シミ・破れがあると、さらに評価が下がります</li>
            <li><strong>未開封の状態を保つ</strong> — 開封済みの場合、査定額は大幅に下がります（20〜40%）。コレクション目的の場合は開栓しないことをおすすめします</li>
            <li><strong>複数の業者で相見積もりを取る</strong> — 同じボトルでも、業者により数万〜数十万円の差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です</li>
            <li><strong>適切な保管環境を保つ</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置きで保管してください。湿度・温度の急激な変化は避けてください</li>
            <li><strong>売却の時期を検討する</strong> — 年末年始・お中元・お歳暮の時期は高値の傾向があります。海外オークションの結果が出た直後も、相場が上昇しやすい時期です</li>
            <li><strong>ボトリングの年代を業者に伝える</strong> — 古いラベル・ロット番号は、希少価値として評価される場合があります</li>
            <li><strong>状態を写真で記録する</strong> — 事前に複数の角度から撮影しておくと、業者の比較やトラブルの防止に役立ちます</li>
          </ol>

          <h2 id="fake">9. ブラックボウモアの偽物・贋作の見分け方</h2>

          <p>ブラックボウモアのような取引価格の高い銘柄には、贋作・偽造ボトルのリスクがあります。真贋の確認には、以下の5点のチェックが有効です。</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で、色ずれがありません。贋作では、にじみ・かすれ・書体の違いが見られます</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリーの山崎・響等にはホログラムシールが貼付されています。贋作では光の反射が不均一な場合があります</li>
            <li><strong>液色と液面の状態</strong> — 正規品は均一な琥珀色で、透明感があります。贋作では色むら・濁り・沈殿物が見られる場合があります</li>
            <li><strong>瓶の形状と底面の刻印</strong> — 正規品は底面にロット番号・製造所コードがあります。贋作では刻印がない、または不自然な場合があります</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークションで購入したものは信頼性が高いと考えられます。個人間取引（メルカリ・ヤフオク）で購入したものは注意が必要です</li>
          </ol>

          <div className="bg-burgundy/5 border border-burgundy/30 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">売却前の真贋確認については、次のページをご覧ください → <Link href="/articles/bowmore-blackbowmore-nisemono-mikata/" className="kaitori-to-shingan text-amber-dark underline font-bold">ブラックボウモアを売る前に｜本物チェックと今の買取相場（3分チェック）</Link></p>
          </div>

          <p>疑わしい場合は、お酒の買取専門店に<strong>鑑定査定</strong>を依頼することをおすすめします。</p>

          <h3 id="edition-check">ブラックボウモアのエディションの確認方法（ラベルと箱）</h3>
          <p>ブラックボウモアは外観の似たボトルが多いため、真贋の確認の前に、どのエディションかをラベルで確認すると査定が円滑に進みます。各ボトルの手がかりは次のとおりです（エディション一覧の表も参照）。</p>
          <ul><li><strong>熟成年数と瓶詰め年</strong>: 42年は29年・30年と外観が似ていますが、下部のラベルに「AGED 42 YEARS」と表記されています。30年は「BOTTLED 1994」、31年は「FINAL EDITION」「BOTTLED 1995」と表記されています（LINXAS）。</li><li><strong>度数</strong>: 1993〜1995年の3本は50%・50%・49%、42年は40.5%、50年は40.9%、DB5は49.6%です。ラベルの度数とエディションが一致しているかをご確認ください。</li><li><strong>箱・ケース</strong>: 1990年代の3本と50年は木箱、42年は化粧箱と木箱（LINXAS）、DB5はカーフスキンの専用ケース（Aston Martin）です。箱が揃っているかどうかで査定額が変わります。</li><li><strong>シリアル番号</strong>: 数百〜2,000本の限定品のため、ボトル番号の記載を確認し、査定時にお伝えください。</li></ul>
          <p>ボウモアやアストンマーティンの公式には、一般向けの真贋の見分け方は公開されていません。上記の項目はボトルの種類を確認するためのものであり、正規品であることを保証するものではありません。数十万円以上の取引になるため、ブラックボウモアを扱った実績を公開している専門店で、写真査定ではなく実物の査定を受けてください。</p>

          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が、ブラックボウモアと同じ価格帯の銘柄に対応している買取業者を選定しました。それぞれ得意とする領域が異なるため、目的に応じてご利用ください。</p>

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

          <p>ブラックボウモアを売却する際の標準的な流れを、5つのステップにまとめました。</p>

          <ol>
            <li><strong>状態確認・付属品の準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃えます</li>
            <li><strong>相場の確認</strong> — 当サイトなどで現在の相場を確認し、お持ちのボトルの目安価格を把握します</li>
            <li><strong>複数の業者への見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒の買取専門店に個別で2〜3社、合計5〜8社から見積もりを取得します</li>
            <li><strong>査定額の比較・業者の選定</strong> — 査定額だけでなく、手数料・キャンセル料・送料・支払い方法を含めて判断します</li>
            <li><strong>売却契約・入金の確認</strong> — 売却契約後、店頭買取では即日現金、宅配買取では1〜3営業日での銀行振込が一般的です</li>
          </ol>

          <p>全体の所要期間は<strong>1〜2週間</strong>が目安です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">ブラックボウモアの無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">12. ブラックボウモアに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'ブラックボウモアの市場相場はいくらですか？', a: 'ブラックボウモアは「ブラックボウモア 700ml」でヤフオクを検索すると、ミニチュアや空き瓶の出品が混ざって中央値が実際の価格とかけ離れるため、当サイトでは落札中央値を掲載していません。2026-10-16 に確認した買取店の公開情報では、LINXAS が42年（箱あり）を参考買取価格〜1,500,000円（2026-01-26更新）、ストックラボが1993年瓶詰めのボトルを1,050,000円で買取（実績）、ウイスキー王国が未開封・箱付きの1964を993,000円で買取（実績）と掲載しています。エディションにより価格が変わるため、29年・30年・31年・42年・50年のいずれかを確認してから査定に出してください。' }, { q: 'ブラックボウモアを高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' }, { q: '開封済みのブラックボウモアでも買取できますか？', a: 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' }, { q: 'ブラックボウモアは箱なしでも買取してもらえますか？', a: 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' }, { q: 'ブラックボウモアに偽物・贋作はありますか？', a: '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' }, { q: 'ブラックボウモアの保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' }, { q: 'ブラックボウモアは税金がかかりますか？', a: 'かかる場合があります。国税庁（タックスアンサー No.3105）は、生活に通常必要な動産の売却は課税しないとする一方、「貴金属や宝石、書画、骨とうなどで、1個または1組の価額が30万円を超えるもの」は除くとしています。ウイスキーがこれに当たるかは同ページに記載されていませんが、ブラックボウモアは1本で30万円を超える額で取引されるため、非課税と判断せず確認が必要です。課税される場合は総合課税の譲渡所得で、売却額−（取得費＋譲渡費用）から特別控除50万円を引き、保有期間が5年を超える場合は2分の1が課税対象です（No.3152）。給与を1か所から受けている会社員の方は、給与以外の所得が20万円を超えると確定申告が必要です（No.1900）。個別の判断については、税務署・税理士にご確認ください。' }, { q: 'ブラックボウモアは何種類ありますか？', a: '1964年蒸留の原酒を使用したボトルは6種です。1993年の29年（ファーストエディション・50%・2,000本）、1994年の30年（セカンド・50%・2,000本）、1995年の31年（ファイナルエディション・49%・1,812本）、2007年の42年（40.5%・827本）、2016年の50年（40.9%・159本）、2020年のアストンマーティンとのコラボ「DB5 1964」（31年・49.6%・27本）です（出典: サザビーズ 2020-11-12 発表、Suntory Global Spirits、Aston Martin、土屋守氏のコラム、LINXAS）。' }, { q: 'ブラックボウモアの発売当時の値段はいくらでしたか？', a: '1993年のファーストエディションは1本100ポンド（当時約2万円）と土屋守氏のコラムにあり、Dave Broom 氏の記事は80〜110ポンドとしています。42年は2,400ポンド、50年は16,000ポンド（米国の希望小売価格は25,000ドル）、DB5 1964は50,000ポンドで発売されました。' }, { q: 'ブラックボウモアを売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" }, { q: 'ブラックボウモアと他の銘柄は、どちらを先に売るべきですか？', a: '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' }].map((faq) => (
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

          <h2>ブラックボウモアに関するその他の解説</h2>
          <p>ブラックボウモアに関するテーマ別の解説は、以下のページをご覧ください。</p>
          <ul>
              <li><Link href="/articles/bowmore-nisemono-mikata/" className="text-amber-dark hover:underline font-bold">ボウモア（全種）の偽物の見分け方</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-takaku-uru/" className="text-amber-dark hover:underline">ブラックボウモアの高価売却のポイント</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-nisemono-mikata/" className="text-amber-dark hover:underline">ブラックボウモアの売る前チェック（真贋と相場）</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-ranking/" className="text-amber-dark hover:underline">ブラックボウモアの買取業者ランキング</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-rekishi/" className="text-amber-dark hover:underline">ブラックボウモアの歴史と特徴</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-kihaku/" className="text-amber-dark hover:underline">ブラックボウモアの希少性・投資価値</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-auction-suii/" className="text-amber-dark hover:underline">ブラックボウモアのオークション推移</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-kaifu-zumi/" className="text-amber-dark hover:underline">ブラックボウモアの開封済みボトルの買取</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-hako-nashi/" className="text-amber-dark hover:underline">ブラックボウモアの箱なしボトルの買取</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-label-yogore/" className="text-amber-dark hover:underline">ブラックボウモアのラベル汚れがある場合の査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/macallan-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">マッカラン30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 396,000円</p></Link>
            <Link href="/articles/macallan-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">マッカラン25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 205,000円</p></Link>
            <Link href="/articles/springbank-21-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">スプリングバンク21年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 101,611円</p></Link>
            <Link href="/articles/bowmore-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">ボウモア25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 67,499円</p></Link>
            <Link href="/articles/laphroaig-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">ラフロイグ25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 66,000円</p></Link>
            <Link href="/articles/glenfiddich-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">グレンフィディック30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 60,610円</p></Link>
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

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-19）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
