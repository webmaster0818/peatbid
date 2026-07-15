import type { Metadata } from "next";
import Link from "next/link";
import ranking from "@/data/souba-ranking.json";

export const metadata: Metadata = {
  title: 'スプリングバンク買取相場｜年代別（15年・21年ほか）の相場と見分け方【2026年7月】',
  description: 'スプリングバンクの買取相場を年代別に整理。年数表記のない・年代がわからないボトルの見分け方、15年・21年など各年代の実勢中央値（毎週更新）と、該当する買取ページへの分岐まで。まずどのスプリングバンクかを確認できる総合ガイド。',
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
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">スプリングバンク買取相場｜年代別の相場と見分け方【2026年7月】</h1>
          <p className="text-warm-gray text-sm">最終更新: {updated}（相場は毎週月曜更新）</p>

          <div className="rounded-lg bg-cream/60 border border-amber-dark/20 p-4 my-6 not-prose">
            <p className="text-sm text-ink leading-relaxed">
              スプリングバンクは<strong>15年・18年・21年・25年</strong>などの年代ラインナップに加え、ローカルバーレイやCVといった年数表記のないボトルもあります。買取相場は<strong>年代・ボトルによって大きく異なる</strong>ため、まずお手元のボトルがどれかを確認し、該当ページで相場をご覧ください。
            </p>
          </div>

          <h2>まず「どのスプリングバンクか」を確認しましょう</h2>
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
          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自集計したもの（毎週月曜更新）。18年・25年・限定ボトル等は流通量が少なく、実際の査定は各業者でご確認ください。</p>

          <h2>年数表記のない（年代指定なし）スプリングバンクの場合</h2>
          <p>年数表記のないローカルバーレイ・CV・ソサイエティボトルなどは、リリース年や度数、限定性によって相場が大きく変わります。年数表記がなく判断が難しい場合は、ボトルの正確な名称（例：Local Barley 10年、CV など）と度数・裏ラベルの情報を控えたうえで、専門知識のある買取業者で査定を受けるのが確実です。まずは複数業者での相見積もりをおすすめします。</p>
          <p>年代表記が見当たらないボトルの正体の整理と実勢価格の比較は、<Link href="/articles/springbank-nv-kaitori/" className="text-amber-dark underline">スプリングバンクの年代指定なし(NV)買取相場｜ボトルの見分け方と実勢価格</Link> で詳しく解説しています。</p>

          <h2>スプリングバンクを高く売るには</h2>
          <ul>
            <li>外箱・冊子など付属品を揃える（完品ほど高評価）</li>
            <li>未開封のまま売る（開封済みは減額傾向）</li>
            <li>年代・ボトル名を正確に伝える（別ボトルとの取り違えを防ぐ）</li>
            <li>複数業者で相見積もりを取り、最高値の業者を選ぶ</li>
          </ul>

          <h2>よくある質問</h2>
          <div className="not-prose space-y-3">
            <div className="border border-warm-border rounded-lg p-4">
              <p className="font-bold text-ink mb-1">年代がわからないスプリングバンクはどう調べる？</p>
              <p className="text-sm text-warm-gray">ラベルの「AGED 15 YEARS」等の年数表記を確認します。表記がなければローカルバーレイ/CV等のノンエイジボトルの可能性があります。</p>
            </div>
            <div className="border border-warm-border rounded-lg p-4">
              <p className="font-bold text-ink mb-1">年代でどれくらい相場が違う？</p>
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
