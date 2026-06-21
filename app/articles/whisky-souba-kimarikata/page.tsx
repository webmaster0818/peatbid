import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキー買取相場の決まり方｜査定額が決まる6つの要素【2026年】",
  description:
    "ウイスキーの買取相場・査定額がどう決まるかを6つの要素（銘柄人気・熟成/希少性・流通量・状態・付属品・需要と為替）で解説。なぜ店ごとに金額が違うのか、実勢中央値の読み方、高く売るための要点まで。",
  alternates: { canonical: "/articles/whisky-souba-kimarikata/" },
};

const toc = [
  ["kihon", "買取相場の基本｜「実勢価格」で見る"],
  ["yoso", "査定額が決まる6つの要素"],
  ["chigai", "なぜ店ごとに査定額が違うのか"],
  ["yomikata", "実勢中央値・流通量の読み方"],
  ["takaku", "相場を踏まえて高く売るには"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "買取相場と定価・中古価格は何が違いますか？",
    a: "定価はメーカー希望小売価格、中古価格は店頭やオークションで取引される価格、買取相場は業者が買い取る価格です。買取価格は再販コストや利益を見込むため、一般に中古の実勢価格より低くなります。当サイトの実勢中央値は『実際の落札価格』なので、買取額の上限の目安として使えます。",
  },
  {
    q: "同じ銘柄なのに業者で金額が違うのはなぜですか？",
    a: "業者ごとに販売ルート・在庫状況・得意ジャンル・手数料が異なるためです。あるボトルを高く売りたい業者もあれば、在庫過多で安くしか出せない業者もあります。だからこそ複数業者の相見積もりが有効です。",
  },
  {
    q: "状態で査定額はどれくらい変わりますか？",
    a: "銘柄や状態の程度によりますが、未開封か開封済みか、箱や付属品の有無、液面・ラベルの状態で大きく変わります。一般に付属品なし・状態難があると、良品より査定額が下がります。具体的な下げ幅は銘柄ごとに異なります。",
  },
  {
    q: "相場はどこで確認できますか？",
    a: "当サイトの相場ランキングと各銘柄の買取相場ページで、Yahoo!オークションの落札データにもとづく実勢中央値・流通量・週次の値動きを確認できます。数値は目安で、特定の買取額を保証するものではありません。",
  },
];

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/articles/" className="hover:text-amber-dark">記事一覧</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">買取相場の決まり方</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキー買取相場の決まり方｜査定額が決まる6つの要素
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>査定額は<strong>①銘柄人気 ②熟成/希少性 ③流通量 ④状態 ⑤付属品 ⑥需要・為替</strong>で決まる。</li>
            <li>買取価格は再販コストを引くため、<strong>中古の実勢価格より低め</strong>になる。</li>
            <li>店ごとに金額が違うのは<strong>販売ルート・在庫・手数料の差</strong>。だから相見積もりが有効。</li>
            <li>実勢の目安は<Link href="/souba-ranking/">相場ランキング</Link>で確認。</li>
          </ul>
        </div>

        <nav className="not-prose border border-warm-border rounded-xl p-5 my-8" aria-label="目次">
          <p className="font-bold text-ink mb-3">目次</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-amber-dark">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <h2 id="kihon">買取相場の基本｜「実勢価格」で見る</h2>
        <p>
          買取相場を考えるときは、定価や希望価格ではなく<strong>「実際にいくらで取引されたか（実勢価格）」</strong>が出発点です。買取業者は仕入れたボトルを再販して利益を出すため、買取価格は<strong>中古の実勢価格よりやや低め</strong>に設定されます。したがって実勢中央値は「買取額の上限の目安」として使うのが現実的です。
        </p>

        <h2 id="yoso">査定額が決まる6つの要素</h2>
        <ol>
          <li><strong>銘柄の人気</strong>：山崎・白州・響などのジャパニーズや人気スコッチは需要が厚く高値。</li>
          <li><strong>熟成年数・希少性</strong>：長期熟成・終売・限定は希少価値が乗る（<Link href="/articles/whisky-nv-toha/">年数表記の意味</Link>）。</li>
          <li><strong>流通量</strong>：出回りが多いほど換金しやすく相場も安定。少ないと希少だが売り時を逃すと次の出物まで時間がかかる。</li>
          <li><strong>状態</strong>：未開封・液面・ラベル・キャップの状態（<Link href="/articles/whisky-hokan-houhou/">保管方法</Link>）。</li>
          <li><strong>付属品</strong>：化粧箱・冊子・カートンの有無で査定額が変動。</li>
          <li><strong>需要・為替</strong>：海外需要や円安局面では高値傾向になりやすい。</li>
        </ol>

        <h2 id="chigai">なぜ店ごとに査定額が違うのか</h2>
        <p>
          同じボトルでも業者によって査定額に差が出ます。理由は<strong>販売ルート・在庫状況・得意ジャンル・手数料</strong>の違いです。そのボトルを高く売れる販路を持つ業者は強気の査定ができ、在庫過多の業者は安めになります。<strong>1社だけで決めず複数業者で相見積もり</strong>を取るのが、相場を踏まえた売り方の基本です。
        </p>

        <h2 id="yomikata">実勢中央値・流通量の読み方</h2>
        <p>
          当サイトは、Yahoo!オークションの過去180日の落札データから外れ値を除いた<strong>実勢中央値</strong>と<strong>落札件数（流通量）</strong>を毎週集計しています。
        </p>
        <ul>
          <li><strong>実勢中央値</strong>：その銘柄のだいたいの取引価格。買取額の上限の目安。</li>
          <li><strong>流通量</strong>：多い＝換金しやすく相場が安定。少ない＝希少だが値が振れやすい。</li>
        </ul>
        <p>銘柄ごとの数値と週次の値動きは <Link href="/souba-ranking/">相場ランキング</Link> と各銘柄の買取相場ページで確認できます。</p>

        <h2 id="takaku">相場を踏まえて高く売るには</h2>
        <ul>
          <li><strong>付属品をそろえる</strong>・<strong>良い状態で保管</strong>して減額要因を減らす。</li>
          <li><strong>需要が高い局面</strong>で売る（終売報道・円安など）。</li>
          <li><strong>複数業者で相見積もり</strong>を取り、手取り額で比較する。</li>
        </ul>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">相場を踏まえて最高値で売る</p>
          <p className="text-sm text-warm-gray mb-4">無料一括査定なら、複数業者の入札を一度に比較できます。</p>
          <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm">無料一括査定で最高値を調べる →</a>
        </div>

        <h2 id="faq">よくある質問</h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-4">
            <p className="font-bold text-ink mb-1">Q. {f.q}</p>
            <p className="text-sm leading-relaxed text-ink/80">A. {f.a}</p>
          </div>
        ))}

        <p className="text-xs text-warm-gray not-prose border-t border-warm-border pt-4 mt-8">
          ※ 本記事は公開情報・当サイトの相場集計にもとづく一般的な情報です。価格は変動し、特定の買取額を保証するものではありません。最新の実勢は <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link> でご確認ください。
        </p>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
