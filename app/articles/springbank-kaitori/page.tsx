import type { Metadata } from "next";
import Link from "next/link";
import ranking from "@/data/souba-ranking.json";

export const metadata: Metadata = {
  title: 'スプリングバンク買取相場・買取価格｜10年〜30年・ローカルバーレイの店舗掲示価格と見分け方【2026年10月】',
  description: 'スプリングバンクの買取価格を年数別に整理（2026年10月26日確認）。10年 14,000〜17,000円・15年 27,000〜32,000円・18年 45,000〜48,000円・21年 70,000〜100,000円。LINXAS・キングラム・大黒屋・ファイブニーズの掲示価格と買取実績、ローカルバーレイ・旧ボトルも。',
};

type B = { slug: string; name: string; median: number };

const YEARS = [
  { slug: "springbank-15-kaitori", label: "スプリングバンク15年", key: "springbank-15" },
  { slug: "springbank-21-kaitori", label: "スプリングバンク21年", key: "springbank-21" },
];

function FaqSchema() {
  const d = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "年代（熟成年数）がわからないスプリングバンクはどう調べますか？", acceptedAnswer: { "@type": "Answer", text: "ボトル正面ラベルの中央〜下部に「AGED 15 YEARS」「15 YEARS OLD」などの年数表記があります。年数表記がない場合はローカルバーレイやCV（カスクストレングス）等のノンエイジ（NAS）ボトルの可能性があります。年数が確認できたら、その年代の買取ページで相場をご確認ください。" } },
      { "@type": "Question", name: "スプリングバンクの買取相場は年代でどれくらい違いますか？", acceptedAnswer: { "@type": "Answer", text: "熟成年数が上がるほど高くなる傾向があります。当サイトのヤフオク実落札中央値では、15年が約3.5万円、21年が約9.7万円が目安です（毎週更新）。ボトルの状態・付属品・流通量により変動します。" } },
      { "@type": "Question", name: "スプリングバンク10年・15年・18年の買取価格はいくらですか？", acceptedAnswer: { "@type": "Answer", text: "2026年10月24日に確認した LINXAS の掲示価格（2026年9月30日更新）は、10年 箱付 15,000円・箱無 14,000円、15年 箱付 30,000円・箱無 27,000円、18年 箱付 48,000円・箱無 45,000円 です。大黒屋は18年を 2026年5月28日に 45,000円、ファイブニーズは10年を 2026年8月30日に 14,000円 で買い取った実績を公開しています。" } },
      { "@type": "Question", name: "どの年代のスプリングバンクでも買取してもらえますか？", acceptedAnswer: { "@type": "Answer", text: "多くの買取業者は年代を問わず査定に対応しています。高額になりやすいのは長期熟成・終売・限定ボトルです。まず手元のボトルの年代を確認し、複数業者で相見積もりを取るのがおすすめです。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />;
}

export default function SpringbankKaitoriPage() {
  const brands = (ranking as { brands: B[] }).brands;
  const median = (key: string) => {
    const b = brands.find((x) => x.slug === key);
    return b ? `¥${Math.round(b.median).toLocaleString()}` : "公式で確認";
  };
  const updated = (ranking as { updated: string }).updated;

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
            <li><span className="text-foreground">スプリングバンク買取相場</span></li>
          </ol>
        </nav>

        <article className="prose max-w-none">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">スプリングバンク買取相場・買取価格｜年数別の店舗掲示価格と見分け方【2026年10月】</h1>
          <p className="text-warm-gray text-sm">最終更新: {updated}（ヤフオク中央値は毎週月曜更新・店舗の掲示価格は 2026-10-26 確認）</p>

          <div className="rounded-lg bg-cream/60 border border-amber-dark/20 p-4 my-6 not-prose">
            <p className="text-sm text-ink leading-relaxed">
              スプリングバンクは<strong>15年・18年・21年・25年</strong>などの年代ラインナップに加え、ローカルバーレイやCVといった年数表記のないボトルもあります。買取相場は<strong>年代・ボトルによって大きく異なる</strong>ため、まずお手元のボトルがどれかを確認し、該当ページで相場をご覧ください。
            </p>
          </div>

          <h2 id="store-prices">スプリングバンクの年数別 買取価格（店舗の掲示価格・2026年10月26日確認）</h2>
          <p>買取店が自社サイトに掲示しているスプリングバンクの参考買取価格と、日付付きで公開している買取実績を年数・ボトル別にまとめました。LINXAS は箱付・箱無で価格を分けて掲示しており、その差は 10年 1,000円・15年 3,000円・18年 3,000円 です。</p>
          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">年数・ボトル</th><th className="py-2 pr-3">店舗の掲示価格（店舗側の更新日）</th><th className="py-2">買取実績（買取日）</th></tr></thead>
              <tbody>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">8年（750ml）</th><td className="py-2 pr-3 align-top">LINXAS 箱あり <strong>18,000円</strong>（価格更新日 2025-10-01）</td><td className="py-2 align-top text-warm-gray">—</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">10年</th><td className="py-2 pr-3 align-top">キングラムリカー <strong>17,000円</strong>（10/21・買取強化中）／LINXAS 箱付 15,000円・箱無 14,000円（9/30）</td><td className="py-2 align-top text-warm-gray">ファイブニーズ 2026-08-30 14,000円／2026-07-01 1998-2009 Bar.アーガイル10周年記念ラベル 38,500円／2025-06-21 旧ボトル 46% 20,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">11年 ランドレッツ＆キルダキンズ</th><td className="py-2 pr-3 align-top">—</td><td className="py-2 align-top text-warm-gray">大黒屋 2026-08-20 2001-2012 60,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">12年 カスクストレングス</th><td className="py-2 pr-3 align-top">—（掲示なし）</td><td className="py-2 align-top text-warm-gray">ファイブニーズ 2026-06-21 29,500円（55.5%）／2025-05-04 旧ラベル 23,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">15年</th><td className="py-2 pr-3 align-top">キングラムリカー <strong>32,000円</strong>（10/21・買取強化中）／LINXAS 箱付 30,000円・箱無 27,000円（9/30）</td><td className="py-2 align-top text-warm-gray">ファイブニーズ 2025-01-20 23,500円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">17年 シェリーウッド</th><td className="py-2 pr-3 align-top">—</td><td className="py-2 align-top text-warm-gray">大黒屋 2026-10-23 箱付 65,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">18年</th><td className="py-2 pr-3 align-top">LINXAS 箱付 <strong>48,000円</strong>・箱無 45,000円（9/30）</td><td className="py-2 align-top text-warm-gray">大黒屋 2026-05-28 45,000円／2026-03-13 2006-2025 ウィスク・イー25周年記念ラベル シェリーカスク 70,000円／2026-01-19 40,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">21年</th><td className="py-2 pr-3 align-top">LINXAS リミテッドエディション <strong>70,000円</strong>・キャンベルタウンモルト 箱付き 100,000円（9/30）</td><td className="py-2 align-top text-warm-gray">大黒屋 2026-06-04 リミテッドエディション 100,000円／2026-04-26 箱付 100,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">25年</th><td className="py-2 pr-3 align-top">LINXAS リミテッドエディション 紙箱 <strong>140,000円</strong>・金 130,000円・木箱 200,000円、キャンベルタウンモルト 150,000円（9/30）／大黒屋 リミテッドエディション 木箱 200,000円（10/25）</td><td className="py-2 align-top text-warm-gray">LINXAS 2026年9月の最高額 203,000円（2本）</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">28年 ピュアモルト</th><td className="py-2 pr-3 align-top">LINXAS <strong>120,000円</strong>（総合価格表 10/26更新）</td><td className="py-2 align-top text-warm-gray">—</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">30年</th><td className="py-2 pr-3 align-top">LINXAS <strong>200,000円</strong>（9/30）</td><td className="py-2 align-top text-warm-gray">大黒屋 2026-04-05 リミテッドリリース 箱付 220,000円／LINXAS 2026年9月の最高額 180,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">35〜50年</th><td className="py-2 pr-3 align-top">LINXAS リミテッドエディション 35年 450,000円・40年 350,000円・45年 500,000円・50年 650,000円（9/30）</td><td className="py-2 align-top text-warm-gray">—</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">ローカルバーレイ</th><td className="py-2 pr-3 align-top">LINXAS 10年 2010-2020 <strong>80,000円</strong>（9/30）</td><td className="py-2 align-top text-warm-gray">大黒屋 2026-05-04 10年 2007-2017 箱付 45,000円／2026-02-12 10年 2011-2021 箱付 45,000円／2026-04-21 16年 1999-2016 箱付 110,000円</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">CV（年数表記なし）</th><td className="py-2 pr-3 align-top">LINXAS 箱あり 〜50,000円（2026-01-20）</td><td className="py-2 align-top text-warm-gray">—</td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left align-top whitespace-nowrap font-bold">旧ボトル・陶器</th><td className="py-2 pr-3 align-top">LINXAS 12年 陶器ボトル 20,000円・12年 175周年 35,000円（9/30）</td><td className="py-2 align-top text-warm-gray">ファイブニーズ 2026-05-02 12年 黒陶器 750ml 20,500円／大黒屋 2026-08-22 15年 ダンピー 木箱付 80,000円／2026-03-30 10年 1977-1987 250,000円</td></tr>
              </tbody>
            </table>
          </div>
          <p>10年・15年は、キングラムリカー（大阪・兵庫の店舗。価格表の更新日 2026年10月21日）が「買取強化中」として 17,000円・32,000円 を掲示しており、LINXAS（15,000円・30,000円）より 2,000円 高い水準です。LINXAS の買取ランキング（2026年10月）では、2026年9月に買い取った1本あたりの最高額は 25年 203,000円・30年 180,000円・21年リミテッドエディション 74,000円・21年 68,000円・10年ローカルバーレイ 35,000円・10年 15,000円 です。</p>
          <p>同じ年数でも、ローカルバーレイや旧ボトル（ダンピーボトル・1977-1987 など）、陶器ボトルは通常品と価格が大きく異なります。ラベルの年数表記に加えて、ボトルの形・ラベルのデザイン・蒸溜年（ヴィンテージ）を確認してから査定に出してください。年数表記の無いボトルは <Link href="/articles/springbank-nv-kaitori/" className="text-amber-dark underline">スプリングバンクの年代指定なし(NV)</Link> で詳しく整理しています。</p>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://linxas.shop/whiskey/springbank/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（スプリングバンクの買取価格表・最終更新 2026年9月30日）</a>・<a href="https://kaitori.e-daikoku.com/liquor/whisky/springbank/ex/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">大黒屋（スプリングバンクの買取実績）</a>・<a href="https://kaitori.e-daikoku.com/liquor/whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">大黒屋（ウイスキー買取強化ランキング）</a>・<a href="https://www.sakekaitori.com/whisky/scotch_whiskey/springbank_brand/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">ファイブニーズ（スプリングバンクの買取実績）</a>・<a href="https://kingram-liquor.jp/price-list/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">キングラムリカー（買取価格表・更新日 2026/10/21）</a>・<a href="https://linxas.shop/prices/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline hover:text-burgundy">LINXAS（総合価格表・2026年10月26日更新）</a>（PeatBid編集部が 2026-10-24・2026-10-26 に各ページで確認。掲示価格は各店の参考額で、実際の買取額は状態・付属品・査定時期で変わります）</p>

          <h2>スプリングバンクのボトルの確認方法</h2>
          <p>ボトル正面ラベルの中央〜下部に <strong>「AGED 15 YEARS」「15 YEARS OLD」</strong> などの年数表記があります。年数が確認できたら、下の年代別ページで相場・状態別査定・高く売るコツをご確認ください。年数表記がない場合は、ローカルバーレイやCV（カスクストレングス）などのノンエイジ（NAS）ボトルの可能性があります。</p>

          <h2>年代別の実勢買取相場（ヤフオク落札中央値・毎週更新）</h2>
          <div className="not-prose my-4 overflow-x-auto">
            <table className="w-full text-sm border border-warm-border rounded-lg overflow-hidden">
              <thead className="bg-amber-dark text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">年代</th>
                  <th className="px-4 py-3 text-left font-medium">中古中央値</th>
                  <th className="px-4 py-3 text-left font-medium">買取ページ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border">
                {YEARS.map((y) => (
                  <tr key={y.slug} className="bg-white even:bg-cream/40">
                    <td className="px-4 py-3">{y.label}</td>
                    <td className="px-4 py-3 tabular-nums">{median(y.key)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/articles/${y.slug}/`} className="text-amber-dark underline">相場・査定を見る →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自に集計したものです（毎週月曜更新）。18年・25年・限定ボトル等は流通量が少なく、実際の査定は各業者でご確認ください。</p>

          <h2>年数表記のない（年代指定なし）スプリングバンクの場合</h2>
          <p>年数表記のないローカルバーレイ・CV・ソサイエティボトルなどは、リリース年や度数、限定性によって相場が大きく変わります。年数表記がなく判断が難しい場合は、ボトルの正確な名称（例：Local Barley 10年、CV など）と度数・裏ラベルの情報を控えたうえで、専門知識のある買取業者で査定を受けるのが確実です。まずは複数業者での相見積もりをおすすめします。</p>
          <p>年代表記が見当たらないボトルの正体の整理と実勢価格の比較は、<Link href="/articles/springbank-nv-kaitori/" className="text-amber-dark underline">スプリングバンクの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格</Link> で詳しく解説しています。</p>

          <h2>スプリングバンクを高く売るには</h2>
          <ul>
            <li>外箱・冊子など付属品を揃える（完品ほど高評価）</li>
            <li>未開封のまま売る（開封済みは減額傾向）</li>
            <li>年代・ボトル名を正確に伝える（別ボトルとの取り違えを防ぐ）</li>
            <li>複数の業者で相見積もりを取り、最も高い査定額を提示した業者を選ぶ</li>
          </ul>

          <h2>よくある質問</h2>
          <div className="not-prose space-y-3">
            <div className="border border-warm-border rounded-lg p-4">
              <p className="font-bold text-ink mb-1">年代が分からないスプリングバンクの調べ方</p>
              <p className="text-sm text-warm-gray">ラベルの「AGED 15 YEARS」等の年数表記を確認します。表記がなければローカルバーレイ/CV等のノンエイジボトルの可能性があります。</p>
            </div>
            <div className="border border-warm-border rounded-lg p-4">
              <p className="font-bold text-ink mb-1">スプリングバンク10年・15年・18年の買取価格</p>
              <p className="text-sm text-warm-gray">LINXAS の掲示価格（2026年9月30日更新・10/24確認）は、10年 箱付 15,000円・箱無 14,000円、15年 箱付 30,000円・箱無 27,000円、18年 箱付 48,000円・箱無 45,000円 です。大黒屋は18年を 2026年5月28日に 45,000円 で買い取った実績を公開しています。</p>
            </div>
            <div className="border border-warm-border rounded-lg p-4">
              <p className="font-bold text-ink mb-1">年代による相場の違い</p>
              <p className="text-sm text-warm-gray">熟成年数が上がるほど高くなる傾向で、当サイト集計では15年 約3.5万円・21年 約9.7万円が目安です（毎週更新）。</p>
            </div>
          </div>

          <p className="text-xs text-warm-gray mt-8">
            本ページの相場は毎週月曜に更新しています。年代が特定できた方は各年代の買取ページ（
            <Link href="/articles/springbank-15-kaitori/" className="text-amber-dark underline">15年</Link>・
            <Link href="/articles/springbank-21-kaitori/" className="text-amber-dark underline">21年</Link>
            ）で、状態別の査定目安・業者比較・高く売るコツをご確認ください。
          </p>
        </article>
      </div>
    </>
  );
}
