import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/miyagikyo-nv.json";

export const metadata: Metadata = {
  title: '宮城峡の買取価格・相場【2026年10月最新】NV（ノンエイジ）2,500〜5,000円・10年/12年/15年｜5店比較・月別推移',
  description: '宮城峡NV（ノンエイジ・年数表記なし）の買取相場は5店の掲示価格で2,500〜5,000円（2026年10月23日確認）。箱なしの扱い、新旧ラベル、ピーテッド等の限定品との違い、10年・12年・15年の買取価格、ストックラボの月別推移と各店の買取実績も掲載。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '宮城峡ノンエイジの市場相場はいくらですか？', "acceptedAnswer": { "@type": "Answer", "text": 'ヤフオクの過去180日の落札データが20件に満たないため、落札中央値は掲載していません。代わりに、買取店の掲示価格（2026-10-23 確認）は、大黒屋 2,500円・リカスタ 3,400円（旧ラベル 3,300円）・LINXAS 3,700円（箱付・箱無とも）・ファイブニーズ 4,000円・ストックラボ 4,000〜5,000円 で、5店で 2,500〜5,000円 の幅があります。ストックラボの買取実績の月別中央値は、2023年10月の 3,100円 から、2026年9月は 4,000円 です。' } }, { "@type": "Question", "name": '宮城峡ノンエイジの買取価格は店舗によって異なりますか？', "acceptedAnswer": { "@type": "Answer", "text": '異なります。2026-10-23 に各店の公開ページで確認した掲示価格は、大黒屋 2,500円（宮城峡 シングルモルト（年数表記なし）・2026-10-19更新）、リカスタ 3,400円／3,300円（宮城峡 シングルモルト 新ラベル／旧ラベル・日付表記なし更新）、LINXAS（リンクサス） 3,700円／3,700円（宮城峡NV・2026-09-30更新）、ファイブニーズ 4,000円（宮城峡 NV（参考買取価格）・日付表記なし更新）、ストックラボ 4,000円〜5,000円（宮城峡 NV・2026-10-21更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' } }, { "@type": "Question", "name": '「宮城峡 年代指定なし」と宮城峡ノンエイジは同じものですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、同じものです。「宮城峡 年代指定なし」「宮城峡 NV」は、熟成年数の表記がないボトル（宮城峡ノンエイジ）を指す別の表記です。本ページの相場（市場相場データ集計中）を目安としてご利用いただけます。' } }, { "@type": "Question", "name": '宮城峡ノンエイジを高く売るコツは？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' } }, { "@type": "Question", "name": '開封済みの宮城峡ノンエイジでも買取できますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' } }, { "@type": "Question", "name": '宮城峡ノンエイジは箱なしでも買取してもらえますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' } }, { "@type": "Question", "name": '宮城峡ノンエイジに偽物・贋作はありますか？', "acceptedAnswer": { "@type": "Answer", "text": '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' } }, { "@type": "Question", "name": '宮城峡ノンエイジの保管方法は？', "acceptedAnswer": { "@type": "Answer", "text": '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' } }, { "@type": "Question", "name": '宮城峡ノンエイジは税金がかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '宮城峡NVは箱なしでも買取価格は変わりませんか？', "acceptedAnswer": { "@type": "Answer", "text": '店舗によって異なります。LINXAS は箱付・箱無とも 3,700円（2026-09-30更新）と同額で掲示しています。一方、ストックラボは「宮城峡は箱の有無によっても買取価格が変わる」と説明しています。箱がある場合は、あわせて査定に出してください。' } }, { "@type": "Question", "name": '宮城峡NVの買取価格は上がっていますか？', "acceptedAnswer": { "@type": "Answer", "text": 'ストックラボの買取実績の月別中央値（2026-10-23 確認）では、2023年10月 3,100円 → 2024年5月 4,600円（期間中の最高）→ 2026年9月 4,000円 です。2025年7月以降はおおむね 3,700〜4,000円 で推移しています。LINXAS の買取実績の年ごとの中央値は 2025年 3,500円・2026年 2,800円 で、店舗によって動きが異なります。' } }, { "@type": "Question", "name": '宮城峡10年は終売ですか？', "acceptedAnswer": { "@type": "Answer", "text": '2015年以前に出ていた宮城峡10年（旧ボトル）は流通在庫のみです。アサヒビールは2025年9月9日に「2015年以来10年ぶり」の熟成年数表記品として、シングルモルト宮城峡10年（700ml・45%・参考小売価格 税込13,200円・国内9,000本の数量限定）を発表し、システム障害による延期のあと2026年2月3日から順次発売しています。買取店の掲示価格は新ラベルと旧ラベルで異なり、5店で 18,000〜25,000円（2026-10-24確認・大黒屋は新 18,000円／旧 22,000円）です。店舗別の内訳は宮城峡12年のページにあります。' } }, { "@type": "Question", "name": '宮城峡ノンエイジを売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" } }, { "@type": "Question", "name": '宮城峡ノンエイジと他の銘柄は、どちらを先に売るべきですか？', "acceptedAnswer": { "@type": "Answer", "text": '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' } }] }) }} />;
}

const tocItems = [
  { id: "summary", label: "1. 宮城峡ノンエイジの概要" },
  { id: "distillery", label: "2. 蒸溜所の歴史と特徴" },
  { id: "tasting", label: "3. テイスティングノート" },
  { id: "current-price", label: "4. 現在の市場相場（Yahoo中央値）" },
  { id: "store-prices", label: "4-2. 買取店の掲示価格・推移・買取実績" },
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

export default function MiyagikyoNvKaitoriPage() {
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
            <li><span className="text-foreground">宮城峡ノンエイジ</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/miyagikyo-nv.png" alt="宮城峡ノンエイジの買取相場" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">宮城峡買取｜NV（ノンエイジ）・10年・12年・15年の買取価格【2026年10月】5店の掲示価格・買取実績・月別推移</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-26 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <section aria-labelledby="quick-price" className="bg-white border-2 border-amber/40 rounded-xl p-5 mb-8 not-prose">
            <h2 id="quick-price" className="text-lg font-bold text-ink mb-2">宮城峡NVと年数別（10年・12年・15年）の買取価格（2026年10月23日・24日確認）</h2>
            <p className="text-sm text-ink mb-3">「宮城峡」の買取価格・買取相場を、年数表記の無いNVを先頭に年数別にまとめました。NV（700ml・未開封）は 5店の掲示で 2,500〜5,000円 です。店舗別の内訳と出典は <a href="#store-prices" className="text-amber-dark underline hover:text-burgundy">4-2. 買取店の掲示価格</a> にあります。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">ボトル・状態</th><th className="py-2 pr-3 text-right">買取価格（店舗の掲示）</th><th className="py-2">店舗・確認日</th></tr></thead>
                <tbody><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">宮城峡NV（700ml）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">2,500〜5,000円</td><td className="py-2 text-xs text-warm-gray">大黒屋 2,500円・リカスタ 3,400円・LINXAS 3,700円・ファイブニーズ 4,000円・ストックラボ 4,000〜5,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">箱なし</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">3,700円</td><td className="py-2 text-xs text-warm-gray">LINXAS（箱付・箱無とも同額）。他の4店は箱の有無を分けずに掲示</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">旧ラベル（発売当初の縦書きラベル等）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">3,300円</td><td className="py-2 text-xs text-warm-gray">リカスタ（新ラベルは 3,400円）</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">年数表記の無い限定品（ピーテッド・グランデ）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">7,000〜10,000円</td><td className="py-2 text-xs text-warm-gray">大黒屋 ピーテッド 8,000円・グランデ 7,000円・LINXAS ピーテッド 10,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">直近の買取実績・月別中央値</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">2,800〜4,000円</td><td className="py-2 text-xs text-warm-gray">LINXAS 2026-09-28 2,800円（2026年9月の最高額 3,700円・37本）／ストックラボ 2026年9月の月別中央値 4,000円</td></tr><tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">年数表記のある宮城峡（<Link href="/articles/miyagikyo-12-kaitori/" className="text-amber-dark underline hover:text-burgundy">10年・12年</Link>／<Link href="/articles/miyagikyo-15-kaitori/" className="text-amber-dark underline hover:text-burgundy">15年</Link>）</th><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">18,000〜25,000円／28,000〜32,000円／52,000〜63,000円</td><td className="py-2 text-xs text-warm-gray">5店の掲示価格（2026-10-24確認）。10年・12年は「宮城峡12年の買取価格」、15年は「宮城峡15年の買取価格」に店舗別の内訳</td></tr></tbody>
              </table>
            </div>
            <p className="text-[12px] text-warm-gray leading-relaxed mt-3">店舗側の価格の更新日: ストックラボ 2026-10-21・大黒屋 2026-10-19・LINXAS 2026-09-30・リカスタ／ファイブニーズ 記載なし。ヤフオクの落札データは過去180日で2件のため、落札中央値は出していません。掲示価格は未開封・状態良好を前提にした参考額で、実際の買取額は査定で決まります。</p>
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

          <h2 id="summary">1. 宮城峡ノンエイジの概要</h2>

          <p>宮城峡ノンエイジはジャパニーズウイスキーの代表的な銘柄の一つで、宮城峡蒸溜所が手がけるノンエイジ（NV）のボトルです。ニッカ宮城峡。仙台ふもとの蒸溜所。</p>

          <p>なお、宮城峡ノンエイジはラベルに熟成年数の表記がないボトルで、オークションや買取店では「<strong>宮城峡 年代指定なし</strong>」「<strong>宮城峡 NV（ノンヴィンテージ）</strong>」とも表記されます。いずれも本ページの相場を目安としてご利用いただけます。</p>

          <div className="bg-cream/40 border border-amber/40 rounded-xl p-4 my-5 not-prose">
            <p className="text-sm text-ink">🔀 「12年」など熟成年数の表記がある宮城峡をお探しの方はこちら → <Link href="/articles/miyagikyo-12-kaitori/" className="text-amber-dark underline font-bold">宮城峡12年の買取相場ガイド</Link></p>
          </div>


          <p>本記事の市場相場は <strong>Yahoo Auctions 過去180日の落札データを集計した中央値</strong>（IQR外れ値除去後）に基づきます。宮城峡ノンエイジは希少度<strong>コモン</strong>クラスに分類しています。現行品として安定して流通している銘柄帯です。銘柄によってはプレミア価格が付く場合があり、コレクターの入門品として安定した需要があります。</p>

          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><td><strong>カテゴリ</strong></td><td>ジャパニーズウイスキー</td></tr>
                <tr><td><strong>蒸溜所/メーカー</strong></td><td>宮城峡蒸溜所</td></tr>
                <tr><td><strong>熟成年数</strong></td><td>ノンエイジ（NV）</td></tr>
                <tr><td><strong>アルコール度数</strong></td><td>45%</td></tr>
                <tr><td><strong>容量</strong></td><td>700ml</td></tr>
                <tr><td><strong>希少度</strong></td><td>コモン</td></tr>
                <tr><td><strong>市場相場（Yahoo中央値）</strong></td><td><strong>市場相場データ集計中</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="distillery">2. 宮城峡蒸溜所の歴史と特徴</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/distillery-japanese.png" alt="宮城峡蒸溜所の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <p>1969年（昭和44年）にニッカウヰスキーが宮城県仙台市・新川渓谷に開設した、同社2番目の蒸溜所です。穏やかな気候と軟水による、フルーティで華やかな味わいが特徴です。余市とは対照的な、軽やかなモルト原酒を生産しています。</p>

          <p>宮城峡蒸溜所のジャパニーズウイスキーは、二次流通市場で継続的に取引されています。蒸溜所の歴史と製法は、宮城峡ノンエイジのような銘柄の市場価値に影響しています。</p>

          <p>同じ蒸溜所の他の銘柄や同年代の銘柄と比べることで、宮城峡ノンエイジの市場における位置付けを確認できます。他のグレード・他の蒸溜所の銘柄は、ページ下部の関連銘柄のリンクからご覧いただけます。</p>

          <h2 id="tasting">3. テイスティングノート</h2>

          <p>宮城峡ノンエイジの味わいは、熟成期間中に樽から溶け出した成分と、宮城峡蒸溜所の蒸溜技術によって形成されています。</p>

          <p>リンゴ・洋ナシなどのフレッシュな果実の香りが軽やかに広がり、バニラ・蜂蜜の柔らかな甘みがあります。フィニッシュは短めから中程度で、飲みやすい味わいです。</p>

          <p>飲用ではなくコレクション・投資目的で保有する場合は、開栓せずに保管することが価値を保つための基本です。開栓すると、香味の揮発と空気との接触による酸化が進み、二次流通市場での評価が大きく下がります。</p>

          <h2 id="current-price">4. 現在の市場相場（Yahoo中央値）</h2>

          <p>宮城峡ノンエイジの市場相場は、本記事冒頭の <strong>市場相場カード</strong> に記載の通り <strong>市場相場データ集計中</strong> です。これは Yahoo Auctions の過去180日の落札データから IQR 外れ値を除去した上で算出した中央値（n=2件）であり、特定の業者の買取価格ではなく、二次流通市場の実勢値を反映しています。</p>

          <p>業者の<strong>買取査定額</strong>は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。同じボトルでも業者により査定額が<strong>10〜20%</strong>異なることもあるため、<strong>3社以上、できれば4社以上で相見積もり</strong>を取ることをおすすめします。</p>

          <p>当サイトでは、以下の3業者のページへのリンクを参考として掲載しています（各社の最新の査定額・キャンペーンは、各社のページでご確認ください）。</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています</li>
          </ul>

          <h3 id="store-prices">宮城峡ノンエイジの買取店の掲示価格（店舗別比較・2026年10月23日確認）</h3>

          <p>各店が自社サイトに公開している宮城峡NV（年数表記のないシングルモルト宮城峡・700ml）の参考買取価格を、PeatBid編集部が 2026-10-23 に各ページで確認した値です。「店舗側の更新日」は、各ページに記載されている価格の更新日です。大黒屋は「宮城峡 シングルモルト」、リカスタは「宮城峡 シングルモルト 新ラベル／旧ラベル」という名前で掲示しており、いずれも年数表記の無いボトルの行です。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">店舗</th><th className="py-2 pr-3">ボトル・条件</th><th className="py-2 pr-3 text-right">掲示価格</th><th className="py-2 pr-3">店舗側の更新日</th><th className="py-2">出典</th></tr></thead>
              <tbody><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">宮城峡 シングルモルト（年数表記なし）<br /><span className="text-warm-gray text-xs">完品の参考上限</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">2,500円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">リカスタ</td><td className="py-2 pr-3">宮城峡 シングルモルト 新ラベル／旧ラベル<br /><span className="text-warm-gray text-xs">新ラベル／旧ラベル</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">3,400円／3,300円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.licasta.com/item/whisky/nikka-miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">宮城峡NV<br /><span className="text-warm-gray text-xs">箱付／箱無</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">3,700円／3,700円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/nikka-miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ファイブニーズ</td><td className="py-2 pr-3">宮城峡 NV（参考買取価格）<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">4,000円</td><td className="py-2 pr-3 whitespace-nowrap">日付表記なし</td><td className="py-2"><a href="https://www.sakekaitori.com/whisky/japanese_whiskey/miyagikyo_brand/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">ストックラボ</td><td className="py-2 pr-3">宮城峡 NV<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">4,000円〜5,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-21</td><td className="py-2"><a href="https://www.stock-lab.com/osake-kaitori/whiskey/miyagikyo/miyagikyo-nv/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">大黒屋</td><td className="py-2 pr-3">宮城峡 ピーテッド／グランデ（年数表記のない限定品）<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">8,000円／7,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-10-19</td><td className="py-2"><a href="https://kaitori.e-daikoku.com/liquor/whisky/miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr><tr className="border-b border-warm-border/60"><td className="py-2 pr-3">LINXAS（リンクサス）</td><td className="py-2 pr-3">宮城峡ピーテッド<br /><span className="text-warm-gray text-xs">—</span></td><td className="py-2 pr-3 text-right font-bold whitespace-nowrap">10,000円</td><td className="py-2 pr-3 whitespace-nowrap">2026-09-30</td><td className="py-2"><a href="https://linxas.shop/whiskey/nikka-miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">掲載ページ</a></td></tr></tbody>
            </table>
          </div>
          
          <p>宮城峡NVの掲示価格は、5店で 2,500〜5,000円 の幅があります（最も低いのは大黒屋 2,500円、最も高いのはストックラボの上限 5,000円）。箱の有無で価格を分けているのは LINXAS だけで、箱付・箱無とも 3,700円 です。リカスタは新ラベル 3,400円・旧ラベル 3,300円 と、ラベルの新旧で 100円 の差をつけています。ピーテッドやグランデなど年数表記の無い限定品は、通常の宮城峡NVとは別の価格（7,000〜10,000円）で扱われます。10年・12年・15年は別の銘柄で、5店の掲示価格は 10年 18,000〜25,000円・12年 28,000〜32,000円・15年 52,000〜63,000円 です（2026-10-24確認）。宮城峡10年は新ラベルと旧ラベルで価格が異なります（大黒屋 新 18,000円・旧 22,000円）。年数表記のあるボトルは <Link href="/articles/miyagikyo-12-kaitori/" className="text-amber-dark underline hover:text-burgundy">宮城峡12年の買取相場</Link>・<Link href="/articles/miyagikyo-15-kaitori/" className="text-amber-dark underline hover:text-burgundy">宮城峡15年の買取相場</Link> をご覧ください。</p>

          <h3 id="store-trend">宮城峡NVの買取価格の推移（ストックラボの買取実績・月別中央値）</h3>

          <div className="bg-white border border-warm-border rounded-xl p-5 my-6 not-prose">
            <p className="text-sm font-bold text-ink mb-3">宮城峡NVの買取実績の月次推移（ストックラボ掲示・2023年10月〜2026年9月）</p>
            <p className="text-[12px] text-warm-gray mb-2">2023年10月から2026年9月まで、36か月すべてに値があります。</p>
            <svg viewBox="0 0 640 205" role="img" aria-label="宮城峡ノンエイジの買取店掲示価格の月次推移グラフ" className="w-full h-auto">
              <line x1="70" y1="30.0" x2="622" y2="30.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="33.5" fontSize="10" fill="#807565" textAnchor="end">4,600</text>
              <line x1="70" y1="95.0" x2="622" y2="95.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="98.5" fontSize="10" fill="#807565" textAnchor="end">3,850</text>
              <line x1="70" y1="160.0" x2="622" y2="160.0" stroke="#E5DCC4" strokeDasharray="3 3" strokeWidth="1" /><text x="64" y="163.5" fontSize="10" fill="#807565" textAnchor="end">3,100</text>
              <polyline points="70.0,160.0 85.8,160.0 101.5,160.0 117.3,142.7 133.1,125.3 148.9,125.3 164.6,64.7 180.4,30.0 196.2,30.0 211.9,38.7 227.7,64.7 243.5,82.0 259.3,125.3 275.0,125.3 290.8,125.3 306.6,125.3 322.3,125.3 338.1,125.3 353.9,125.3 369.7,82.0 385.4,125.3 401.2,82.0 417.0,82.0 432.7,82.0 448.5,82.0 464.3,82.0 480.1,82.0 495.8,82.0 511.6,108.0 527.4,82.0 543.1,82.0 558.9,82.0 574.7,82.0 590.5,99.3 606.2,82.0 622.0,82.0" fill="none" stroke="#C9923D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="70.0" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2023年10月: 3,100円</title></circle>
              <circle cx="85.8" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2023年11月: 3,100円</title></circle>
              <circle cx="101.5" cy="160.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2023年12月: 3,100円</title></circle>
              <circle cx="117.3" cy="142.7" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年1月: 3,300円</title></circle>
              <circle cx="133.1" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年2月: 3,500円</title></circle>
              <circle cx="148.9" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年3月: 3,500円</title></circle>
              <circle cx="164.6" cy="64.7" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年4月: 4,200円</title></circle>
              <circle cx="180.4" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年5月: 4,600円</title></circle>
              <circle cx="196.2" cy="30.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年6月: 4,600円</title></circle>
              <circle cx="211.9" cy="38.7" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年7月: 4,500円</title></circle>
              <circle cx="227.7" cy="64.7" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年8月: 4,200円</title></circle>
              <circle cx="243.5" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年9月: 4,000円</title></circle>
              <circle cx="259.3" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年10月: 3,500円</title></circle>
              <circle cx="275.0" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年11月: 3,500円</title></circle>
              <circle cx="290.8" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2024年12月: 3,500円</title></circle>
              <circle cx="306.6" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年1月: 3,500円</title></circle>
              <circle cx="322.3" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年2月: 3,500円</title></circle>
              <circle cx="338.1" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年3月: 3,500円</title></circle>
              <circle cx="353.9" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年4月: 3,500円</title></circle>
              <circle cx="369.7" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年5月: 4,000円</title></circle>
              <circle cx="385.4" cy="125.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年6月: 3,500円</title></circle>
              <circle cx="401.2" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年7月: 4,000円</title></circle>
              <circle cx="417.0" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年8月: 4,000円</title></circle>
              <circle cx="432.7" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年9月: 4,000円</title></circle>
              <circle cx="448.5" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年10月: 4,000円</title></circle>
              <circle cx="464.3" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年11月: 4,000円</title></circle>
              <circle cx="480.1" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2025年12月: 4,000円</title></circle>
              <circle cx="495.8" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年1月: 4,000円</title></circle>
              <circle cx="511.6" cy="108.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年2月: 3,700円</title></circle>
              <circle cx="527.4" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年3月: 4,000円</title></circle>
              <circle cx="543.1" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年4月: 4,000円</title></circle>
              <circle cx="558.9" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年5月: 4,000円</title></circle>
              <circle cx="574.7" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年6月: 4,000円</title></circle>
              <circle cx="590.5" cy="99.3" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年7月: 3,800円</title></circle>
              <circle cx="606.2" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年8月: 4,000円</title></circle>
              <circle cx="622.0" cy="82.0" r="3" fill="#8A5A18" stroke="#fff" strokeWidth="1"><title>2026年9月: 4,000円</title></circle>
              <text x="70.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2023年10月</text>
              <text x="353.9" y="192" fontSize="10" fill="#807565" textAnchor="middle">2025年4月</text>
              <text x="622.0" y="192" fontSize="10" fill="#807565" textAnchor="middle">2026年9月</text>
              
            </svg>
            <p className="text-[12px] text-ink leading-relaxed mt-2">2023年10月 3,100円 → 2026年9月 4,000円（期間中の最高 4,600円・最低 3,100円）。</p>
            <details className="mt-2 text-[12px] text-warm-gray">
              <summary className="cursor-pointer">月別の数値を表で見る（36か月）</summary>
              <table className="mt-2"><tbody><tr><td className="py-1 pr-4">2023年10月</td><td className="py-1 text-right">3,100円</td></tr><tr><td className="py-1 pr-4">2023年11月</td><td className="py-1 text-right">3,100円</td></tr><tr><td className="py-1 pr-4">2023年12月</td><td className="py-1 text-right">3,100円</td></tr><tr><td className="py-1 pr-4">2024年1月</td><td className="py-1 text-right">3,300円</td></tr><tr><td className="py-1 pr-4">2024年2月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2024年3月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2024年4月</td><td className="py-1 text-right">4,200円</td></tr><tr><td className="py-1 pr-4">2024年5月</td><td className="py-1 text-right">4,600円</td></tr><tr><td className="py-1 pr-4">2024年6月</td><td className="py-1 text-right">4,600円</td></tr><tr><td className="py-1 pr-4">2024年7月</td><td className="py-1 text-right">4,500円</td></tr><tr><td className="py-1 pr-4">2024年8月</td><td className="py-1 text-right">4,200円</td></tr><tr><td className="py-1 pr-4">2024年9月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2024年10月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2024年11月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2024年12月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2025年1月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2025年2月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2025年3月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2025年4月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2025年5月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2025年6月</td><td className="py-1 text-right">3,500円</td></tr><tr><td className="py-1 pr-4">2025年7月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2025年8月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2025年9月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2025年10月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2025年11月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2025年12月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2026年1月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2026年2月</td><td className="py-1 text-right">3,700円</td></tr><tr><td className="py-1 pr-4">2026年3月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2026年4月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2026年5月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2026年6月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2026年7月</td><td className="py-1 text-right">3,800円</td></tr><tr><td className="py-1 pr-4">2026年8月</td><td className="py-1 text-right">4,000円</td></tr><tr><td className="py-1 pr-4">2026年9月</td><td className="py-1 text-right">4,000円</td></tr></tbody></table>
            </details>
            <p className="text-[11px] text-warm-gray leading-relaxed mt-2">出典: <a href="https://www.stock-lab.com/osake-kaitori/whiskey/miyagikyo/miyagikyo-nv/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ストックラボ「宮城峡NVの買取実績」の価格推移グラフ</a>（同ページ掲載のグラフの値を転記）。ストックラボの買取実績にもとづく月ごとの中央値（税込換算・グラフの更新日 2026/10/07、2026-10-23 確認）であり、実際の買取額を保証するものではありません。</p>
          </div>

          <h3 id="store-records">宮城峡ノンエイジの買取実績（各店の公開分・日付付き）</h3>
          <p>各店が自社サイトに掲載している宮城峡ノンエイジの買取実績です。実績は、その日にその店舗で買い取った金額であり、ボトルの状態や付属品の有無の記載方法は店舗により異なります（2026年10月23日確認）。</p>

          <p className="text-sm font-bold mt-6">LINXAS（リンクサス）</p>
          <ul className="text-sm"><li>2026年9月28日　宮城峡NV　<strong>2,800円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/nikka-miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（リンクサス）の掲載ページ</a>（同ページの買取実績から宮城峡NVを転記。同ページは、2026年9月に宮城峡 ノンエイジを37本買い取り、1本あたりの最高額は3,700円、同店の買取実績の年ごとの中央値は2025年 3,500円・2026年 2,800円と公開しています（2026-10-23 確認））</p>

          <p className="text-sm font-bold mt-6">ストックラボ</p>
          <ul className="text-sm"><li>2025年7月18日　宮城峡 NV（梅田・なんば・千葉・甲府の各店）　<strong>各4,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.stock-lab.com/osake-kaitori/whiskey/miyagikyo/miyagikyo-nv/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ストックラボの掲載ページ</a>（同ページの「新着買取実績」を全件転記（2026-10-23 確認））</p>

          <p className="text-sm font-bold mt-6">ファイブニーズ</p>
          <ul className="text-sm"><li>2024年10月7日　ニッカ シングルモルト宮城峡 700ml　<strong>3,000円</strong></li></ul>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://www.sakekaitori.com/whisky/japanese_whiskey/miyagikyo_brand/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズの掲載ページ</a>（同ページの買取実績から、年数表記の無いシングルモルト宮城峡 700ml を転記（2026-10-23 確認））</p>

          <h2 id="state-price">5. 状態別の業界目安（パーセンテージ）</h2>

          <p>宮城峡ノンエイジの査定額は、ボトルの状態と付属品の有無により大きく変動します。以下は <strong>業界一般の目安（％）</strong> で、市場相場（Yahoo中央値）を基準とした概算レンジです。<strong>実際の査定額は業者により異なります</strong>ので、最終的な金額は各業者のページでご確認ください。</p>

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

          <h3 id="hako-nashi-souba">宮城峡ノンエイジを箱なし・付属品なしで売る場合の買取相場</h3>

          <p>箱や付属品がない場合の目安です。未開封・箱なし（ラベル良好）の場合、業界一般の目安は<strong>市場相場の80〜90%程度</strong>です。外箱・冊子の揃った完品と比べて1〜2割の減額が目安のため、<strong>箱がない場合でも売却は可能です</strong>。</p>

          <ul>
            <li>減額幅は業者の評価基準によって異なります。箱なしの場合は特に<strong>複数業者での相見積もり</strong>が有効です</li>
            <li>冊子・カートンなど<strong>一部の付属品が残っている場合は、あわせて査定に出してください</strong>（一部でも評価の対象になります）</li>
            <li>詳しくは<Link href="/articles/miyagikyo-nv-hako-nashi/" className="text-amber-dark hover:underline">宮城峡ノンエイジを箱なしで売る場合の解説</Link>をご覧ください</li>
          </ul>

          <h2 id="price-reasons">6. 宮城峡ノンエイジの価格を左右する要因</h2>

          <p>宮城峡ノンエイジの二次流通価格を左右する主な要因は、次の5つです。</p>

          <ol>
            <li><strong>海外オークション落札データの動向</strong> — Sotheby's・Bonhams・Whisky Auctioneer等の落札結果は、日本の買取業者の仕入れ価格の基準の一つとなっています</li>
            <li><strong>需給バランスと供給制限</strong> — ノンエイジ（NV）の銘柄は供給量が限られており、需要が拡大すると価格が上昇しやすい傾向があります</li>
            <li><strong>為替レートの影響</strong> — 円安の局面では海外の購入者の購買力が高まり、国内相場も連動して上昇する傾向があります</li>
            <li><strong>宮城峡蒸溜所の国際的評価</strong> — World Whiskies Awards、ISC等の品評会での評価は、国際的な需要に影響します</li>
            <li><strong>季節要因・贈答需要</strong> — 年末年始・お中元・お歳暮の時期に需要が高まり、相場が上昇する傾向があります</li>
          </ol>

          <p>売却の時期は、上記の要因と市場の動向を確認したうえでご判断ください。将来の価格は保証されるものではありません。</p>

          <h2 id="auction">7. オークション落札データ</h2>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden mb-5 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <p>海外の主要オークションでは、宮城峡ノンエイジと同じ価格帯の銘柄が継続的に取引されています。主なオークションと、それぞれの特徴は以下のとおりです。</p>

          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's（ニューヨーク・香港・ロンドン）</strong>: 月次〜四半期ごとに開催され、高額銘柄が中心です。<br/><strong>Bonhams（香港・ロンドン）</strong>: 高額銘柄が中心です。<br/><strong>Whisky Auctioneer（UK）</strong>: 月次のオンラインオークションで、中価格帯の銘柄まで幅広く扱っています。<br/><strong>Just Whisky Auctions（UK）</strong>: 月次で開催されています。<br/><strong>Whisky Hammer（UK）</strong>: 月次のオンラインオークションです。</p>` }} />

          <p>これらのオークションの落札データは、各サイトの「Past Results」で閲覧できます。日本の買取業者の査定額は、海外の落札データに加え、輸送コスト・関税・業者の利益を考慮して算出されるのが一般的です。</p>



          <h2 id="takaku-uru">8. 宮城峡ノンエイジを高く売るための7つのポイント</h2>

          <ol>
            <li><strong>外箱・冊子・カートンを揃える</strong> — 付属品の有無により、査定額が10〜20%変動する場合があります。シミ・破れがあると、さらに評価が下がります</li>
            <li><strong>未開封の状態を保つ</strong> — 開封済みの場合、査定額は大幅に下がります（20〜40%）。コレクション目的の場合は開栓しないことをおすすめします</li>
            <li><strong>複数の業者で相見積もりを取る</strong> — 同じボトルでも、業者により数万〜数十万円の差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です</li>
            <li><strong>適切な保管環境を保つ</strong> — 直射日光・蛍光灯を避け、室温15〜20℃で縦置きで保管してください。湿度・温度の急激な変化は避けてください</li>
            <li><strong>売却の時期を検討する</strong> — 年末年始・お中元・お歳暮の時期は高値の傾向があります。海外オークションの結果が出た直後も、相場が上昇しやすい時期です</li>
            <li><strong>ボトリングの年代を業者に伝える</strong> — 古いラベル・ロット番号は、希少価値として評価される場合があります</li>
            <li><strong>状態を写真で記録する</strong> — 事前に複数の角度から撮影しておくと、業者の比較やトラブルの防止に役立ちます</li>
          </ol>

          <h2 id="fake">9. 宮城峡ノンエイジの偽物・贋作の見分け方</h2>

          <p>宮城峡ノンエイジのような取引価格の高い銘柄には、贋作・偽造ボトルのリスクがあります。真贋の確認には、以下の5点のチェックが有効です。</p>

          <ol>
            <li><strong>ラベルの印刷品質</strong> — 正規品は文字が鮮明で、色ずれがありません。贋作では、にじみ・かすれ・書体の違いが見られます</li>
            <li><strong>キャップ・封蝋・ホログラム</strong> — サントリーの山崎・響等にはホログラムシールが貼付されています。贋作では光の反射が不均一な場合があります</li>
            <li><strong>液色と液面の状態</strong> — 正規品は均一な琥珀色で、透明感があります。贋作では色むら・濁り・沈殿物が見られる場合があります</li>
            <li><strong>瓶の形状と底面の刻印</strong> — 正規品は底面にロット番号・製造所コードがあります。贋作では刻印がない、または不自然な場合があります</li>
            <li><strong>購入経路の信頼性</strong> — 正規流通店・大手買取業者・海外オークションで購入したものは信頼性が高いと考えられます。個人間取引（メルカリ・ヤフオク）で購入したものは注意が必要です</li>
          </ol>

          <p>疑わしい場合は、お酒の買取専門店に<strong>鑑定査定</strong>を依頼することをおすすめします。</p>

          <h3 id="edition-check">宮城峡ノンエイジのエディションの確認方法（ラベルと箱）</h3>
          <p>「宮城峡NV」は、ラベルに熟成年数の表記が無いシングルモルト宮城峡のことです。店舗によって「NV」「ノンエイジ」「シングルモルト」と呼び方が異なります。査定に出す前に、次の点を確認してください。</p>
          <ul><li><strong>年数表記</strong>: ラベルに「10」「12」「15」などの年数が無いか。年数表記のあるボトルは別の銘柄で、店舗の掲示価格も大きく異なります（大黒屋は10年 新ラベル 18,000円・12年 29,000円・15年 57,000円、2026-10-19更新）。</li><li><strong>宮城峡10年の新旧</strong>: 熟成年数表記のある「シングルモルト宮城峡」は2015年以降は出ておらず、アサヒビールは「2015年以来10年ぶり」の年数表記品として<strong>シングルモルト宮城峡10年</strong>（700ml・45%・参考小売価格 税込13,200円・国内9,000本）を発表、システム障害による延期のあと<strong>2026年2月3日から数量限定で順次発売</strong>しています（<a href="https://www.asahibeer.co.jp/news/2025/0909_2.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">アサヒビール 2025年9月9日発表</a>）。新ボトルは和紙のラベルで、キャップシールとラベルの一部が深緑色です。買取店も新旧を分けて掲示しています（大黒屋 新ラベル 18,000円・旧ラベル 22,000円、2026-10-19更新）。</li><li><strong>ラベルの新旧</strong>: ストックラボは、年数表記の無い宮城峡は2008年3月に発売され、発売当初のラベルは「宮城峡」の文字が縦に配置されたデザインで、現行品とはラベルが大きく異なると説明しています。リカスタは新ラベル 3,400円・旧ラベル 3,300円 と分けて掲示しています。</li><li><strong>限定品との違い</strong>: 「ピーテッド」「グランデ」「アロマティックイースト」や各種ウッドフィニッシュ、「シェリーカスク」は年数表記が無くても通常の宮城峡NVとは別の商品で、店舗の掲示価格も別です（大黒屋 ピーテッド 8,000円・グランデ 7,000円・シェリーカスク 55,000円）。</li><li><strong>蒸溜所限定のブレンデッド</strong>: 宮城峡蒸溜所限定のブレンデッドウイスキー（500ml）は、シングルモルトの宮城峡NVとは別の商品です。ファイブニーズの買取実績は 2,500円（2025-05-26）・1,500円（2024-12-17）です。</li><li><strong>箱の有無</strong>: LINXAS は箱付・箱無とも 3,700円 と同額で掲示しています。ストックラボは「箱の有無によっても買取価格が変わる」と説明しており、店舗により扱いが異なります。</li></ul>
          <p>出典: <a href="https://www.stock-lab.com/osake-kaitori/whiskey/miyagikyo/miyagikyo-nv/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ストックラボ</a>・<a href="https://www.licasta.com/item/whisky/nikka-miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">リカスタ</a>・<a href="https://kaitori.e-daikoku.com/liquor/whisky/miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">大黒屋</a>・<a href="https://linxas.shop/whiskey/nikka-miyagikyo/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS</a>・<a href="https://www.sakekaitori.com/whisky/japanese_whiskey/miyagikyo_brand/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズ</a>（2026-10-23確認）。判別できない場合は、正面・背面のラベルと箱の写真を添えて査定を依頼してください。</p>

          <h2 id="partners">10. おすすめ買取業者3社の詳細レビュー</h2>

          <p>PeatBid編集部が、宮城峡ノンエイジと同じ価格帯の銘柄に対応している買取業者を選定しました。それぞれ得意とする領域が異なるため、目的に応じてご利用ください。</p>

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

          <p>宮城峡ノンエイジを売却する際の標準的な流れを、5つのステップにまとめました。</p>

          <ol>
            <li><strong>状態確認・付属品の準備</strong> — ボトル本体の状態を確認し、外箱・冊子・カートン等の付属品を揃えます</li>
            <li><strong>相場の確認</strong> — 当サイトなどで現在の相場を確認し、お持ちのボトルの目安価格を把握します</li>
            <li><strong>複数の業者への見積もり依頼</strong> — ヒカカク！の一括査定で3〜5社、お酒の買取専門店に個別で2〜3社、合計5〜8社から見積もりを取得します</li>
            <li><strong>査定額の比較・業者の選定</strong> — 査定額だけでなく、手数料・キャンセル料・送料・支払い方法を含めて判断します</li>
            <li><strong>売却契約・入金の確認</strong> — 売却契約後、店頭買取では即日現金、宅配買取では1〜3営業日での銀行振込が一般的です</li>
          </ol>

          <p>全体の所要期間は<strong>1〜2週間</strong>が目安です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">宮城峡ノンエイジの無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">12. 宮城峡ノンエイジに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '宮城峡ノンエイジの市場相場はいくらですか？', a: 'ヤフオクの過去180日の落札データが20件に満たないため、落札中央値は掲載していません。代わりに、買取店の掲示価格（2026-10-23 確認）は、大黒屋 2,500円・リカスタ 3,400円（旧ラベル 3,300円）・LINXAS 3,700円（箱付・箱無とも）・ファイブニーズ 4,000円・ストックラボ 4,000〜5,000円 で、5店で 2,500〜5,000円 の幅があります。ストックラボの買取実績の月別中央値は、2023年10月の 3,100円 から、2026年9月は 4,000円 です。' }, { q: '宮城峡ノンエイジの買取価格は店舗によって異なりますか？', a: '異なります。2026-10-23 に各店の公開ページで確認した掲示価格は、大黒屋 2,500円（宮城峡 シングルモルト（年数表記なし）・2026-10-19更新）、リカスタ 3,400円／3,300円（宮城峡 シングルモルト 新ラベル／旧ラベル・日付表記なし更新）、LINXAS（リンクサス） 3,700円／3,700円（宮城峡NV・2026-09-30更新）、ファイブニーズ 4,000円（宮城峡 NV（参考買取価格）・日付表記なし更新）、ストックラボ 4,000円〜5,000円（宮城峡 NV・2026-10-21更新）でした。ボトルの仕様や付属品、店舗の在庫状況によっても変わるため、売却前に複数の店舗で査定を受けて比較してください。' }, { q: '「宮城峡 年代指定なし」と宮城峡ノンエイジは同じものですか？', a: 'はい、同じものです。「宮城峡 年代指定なし」「宮城峡 NV」は、熟成年数の表記がないボトル（宮城峡ノンエイジ）を指す別の表記です。本ページの相場（市場相場データ集計中）を目安としてご利用いただけます。' }, { q: '宮城峡ノンエイジを高く売るコツは？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)未開封のまま売る、(3)複数の業者で相見積もりを取る、(4)直射日光を避けて縦置きで保管する、(5)売却の時期を年末年始・お中元の時期に合わせる、の5点が基本です。' }, { q: '開封済みの宮城峡ノンエイジでも買取できますか？', a: 'はい、買取の対象となる場合があります。業界一般の目安として、残量9割以上の場合は市場相場の30〜40%程度、半分以下では大幅な減額となる傾向があります（評価基準は業者により異なります）。蓋が確実に閉まっており、ラベル・付属品の状態が良好であれば、査定額が高くなる傾向があります。実際の査定額は各業者のページでご確認ください。' }, { q: '宮城峡ノンエイジは箱なしでも買取してもらえますか？', a: 'はい、買取可能です。未開封・箱なし（ラベル良好）の業界一般の目安は市場相場の80〜90%程度で、完品と比べて1〜2割の減額が目安です。冊子やカートンが一部でも残っている場合は、あわせて査定に出すと評価の対象になります。減額幅は業者により異なるため、箱なしの場合は特に複数社での相見積もりをおすすめします。' }, { q: '宮城峡ノンエイジに偽物・贋作はありますか？', a: '高額銘柄ほど贋作のリスクが高くなります。**ラベルの印刷品質・キャップとホログラム・液色・瓶の刻印・購入経路の信頼性**の5点で確認します。疑わしい場合は、お酒の買取に関する専門知識を持つ業者に鑑定査定をご依頼ください。' }, { q: '宮城峡ノンエイジの保管方法は？', a: '(1)直射日光・蛍光灯を避ける、(2)室温15〜20℃・湿度50〜70%を保つ、(3)縦置きで保管する（横置きはコルクの劣化につながります）、(4)外箱に入れて保管する、(5)振動の少ない場所に置く、の5点が基本です。長期保有の場合は、保険への加入もご検討ください。' }, { q: '宮城峡ノンエイジは税金がかかりますか？', a: '年間の売却益が50万円を超え、給与所得者の場合に他の所得と合わせて20万円を超えると、譲渡所得として確定申告が必要です。保有期間5年超の場合、長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '宮城峡NVは箱なしでも買取価格は変わりませんか？', a: '店舗によって異なります。LINXAS は箱付・箱無とも 3,700円（2026-09-30更新）と同額で掲示しています。一方、ストックラボは「宮城峡は箱の有無によっても買取価格が変わる」と説明しています。箱がある場合は、あわせて査定に出してください。' }, { q: '宮城峡NVの買取価格は上がっていますか？', a: 'ストックラボの買取実績の月別中央値（2026-10-23 確認）では、2023年10月 3,100円 → 2024年5月 4,600円（期間中の最高）→ 2026年9月 4,000円 です。2025年7月以降はおおむね 3,700〜4,000円 で推移しています。LINXAS の買取実績の年ごとの中央値は 2025年 3,500円・2026年 2,800円 で、店舗によって動きが異なります。' }, { q: '宮城峡10年は終売ですか？', a: '2015年以前に出ていた宮城峡10年（旧ボトル）は流通在庫のみです。アサヒビールは2025年9月9日に「2015年以来10年ぶり」の熟成年数表記品として、シングルモルト宮城峡10年（700ml・45%・参考小売価格 税込13,200円・国内9,000本の数量限定）を発表し、システム障害による延期のあと2026年2月3日から順次発売しています。買取店の掲示価格は新ラベルと旧ラベルで異なり、5店で 18,000〜25,000円（2026-10-24確認・大黒屋は新 18,000円／旧 22,000円）です。店舗別の内訳は宮城峡12年のページにあります。' }, { q: '宮城峡ノンエイジを売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。また、終売・休売の報道直後にプレミア価格が上昇する場合もあります。" }, { q: '宮城峡ノンエイジと他の銘柄は、どちらを先に売るべきですか？', a: '市場の流動性・価格の安定性・ご自身の保有目的を踏まえてご判断ください。希少度が高い銘柄ほど長期保有でプレミア価格が付く傾向があるため、**急ぎでなければ希少銘柄は保有を続け、流通量の多い銘柄から先に売却する**方法があります。' }].map((faq) => (
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

          <h2>宮城峡ノンエイジに関するその他の解説</h2>
          <p>宮城峡ノンエイジに関するテーマ別の解説は、以下のページをご覧ください。</p>
          <ul>
              <li><Link href="/articles/miyagikyo-nv-takaku-uru/" className="text-amber-dark hover:underline">宮城峡ノンエイジの高価売却のポイント</Link></li>
              <li><Link href="/articles/miyagikyo-nv-nisemono-mikata/" className="text-amber-dark hover:underline">宮城峡ノンエイジの偽物の見分け方</Link></li>
              <li><Link href="/articles/miyagikyo-nv-ranking/" className="text-amber-dark hover:underline">宮城峡ノンエイジの買取業者ランキング</Link></li>
              <li><Link href="/articles/miyagikyo-nv-rekishi/" className="text-amber-dark hover:underline">宮城峡ノンエイジの歴史と特徴</Link></li>
              <li><Link href="/articles/miyagikyo-nv-kihaku/" className="text-amber-dark hover:underline">宮城峡ノンエイジの希少性・投資価値</Link></li>
              <li><Link href="/articles/miyagikyo-nv-auction-suii/" className="text-amber-dark hover:underline">宮城峡ノンエイジのオークション推移</Link></li>
              <li><Link href="/articles/miyagikyo-nv-kaifu-zumi/" className="text-amber-dark hover:underline">宮城峡ノンエイジの開封済みボトルの買取</Link></li>
              <li><Link href="/articles/miyagikyo-nv-hako-nashi/" className="text-amber-dark hover:underline">宮城峡ノンエイジの箱なしボトルの買取</Link></li>
              <li><Link href="/articles/miyagikyo-nv-label-yogore/" className="text-amber-dark hover:underline">宮城峡ノンエイジのラベル汚れがある場合の査定</Link></li>
          </ul>

          <h2>関連銘柄の買取相場</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 854,149円</p></Link>
            <Link href="/articles/hibiki-30-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">響30年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 534,000円</p></Link>
            <Link href="/articles/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市20年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 248,722円</p></Link>
            <Link href="/articles/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">竹鶴25年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 193,600円</p></Link>
            <Link href="/articles/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">山崎18年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 91,299円</p></Link>
            <Link href="/articles/yoichi-15-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">関連銘柄</span><p className="text-sm font-bold mt-1">余市15年 の買取相場</p><p className="text-xs text-warm-gray mt-1">市場相場 79,999円</p></Link>
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
