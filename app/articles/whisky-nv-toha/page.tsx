import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキーの「年代指定なし(NV)」とは？買取での扱いと相場の見方【2026年】",
  description:
    "ウイスキーの「年代指定なし（ノンエイジ/NV）」の意味と、年数表記ありとの違い、買取査定での扱いを解説。山崎・白州・響・グレンファークラス・ボウモアなどのNVボトルの相場の見方と、高く売るための確認ポイントまで。",
  alternates: { canonical: "/articles/whisky-nv-toha/" },
};

const toc = [
  ["toha", "年代指定なし（NV/ノンエイジ）とは"],
  ["chigai", "年数表記ありとの違い"],
  ["satei", "買取査定で見られるポイント"],
  ["souba", "NVボトルの相場の見方"],
  ["meigara", "代表的なNVボトルと買取相場ページ"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "「年代指定なし」と「ノンエイジ」「NV」は同じ意味ですか？",
    a: "ほぼ同じ意味で使われます。NVはNon-Vintage／No Age Statement（熟成年数の表記がない）の略で、日本語では「ノンエイジ」「年代（年数）指定なし」と呼ばれます。ラベルに「12年」などの数字がないボトルが該当します。",
  },
  {
    q: "年数表記がないと価値は低いのですか？",
    a: "一概には言えません。年数表記は『使用原酒のうち最も若いものの熟成年数』を示すルールのため、年数がない＝品質が低いという意味ではありません。山崎・白州・響のノンエイジのように、需要が高く中古相場が安定しているNVボトルも多くあります。価値は銘柄の人気・流通量・状態で決まります。",
  },
  {
    q: "なぜノンエイジのボトルが増えたのですか？",
    a: "人気の高まりで長期熟成の原酒が不足し、メーカーが年数表記品を休売・終売し、ノンエイジへ切り替える動きが広がったためです。これにより一部の年数表記ボトルが希少化し、中古相場が上昇する一因にもなっています。",
  },
  {
    q: "ノンエイジでも高く売れますか？",
    a: "人気銘柄のノンエイジは中古需要が安定しており、未開封・箱付き・良好な状態であれば相応の価格が付きます。実際の水準は銘柄ごとに異なるため、各銘柄の買取相場ページと相場ランキングで実勢中央値を確認してください。",
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
          <li><span className="text-foreground">年代指定なし(NV)とは</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキーの「年代指定なし(NV)」とは？買取での扱いと相場の見方
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>「年代指定なし(NV/ノンエイジ)」＝ラベルに<strong>熟成年数の表記がない</strong>ボトル。</li>
            <li>年数表記は「最も若い原酒の年数」を示すルール。<strong>NV＝低品質ではない</strong>。</li>
            <li>査定額は年数の有無より<strong>銘柄の人気・流通量・状態</strong>で決まる。</li>
            <li>山崎・白州・響などの人気NVは中古相場が安定。実勢は<Link href="/souba-ranking/">相場ランキング</Link>で確認。</li>
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

        <h2 id="toha">年代指定なし（NV/ノンエイジ）とは</h2>
        <p>
          「年代指定なし」とは、ラベルに<strong>「12年」「18年」などの熟成年数表記がない</strong>ウイスキーのことです。<strong>NV（Non-Vintage / No Age Statement）</strong>、<strong>ノンエイジ</strong>とも呼ばれます。複数の原酒をブレンドして造られ、年数を表示しない代わりに、ブレンダーが目指す味わいに仕上げているのが特徴です。
        </p>

        <h2 id="chigai">年数表記ありとの違い</h2>
        <p>
          ウイスキーの年数表記には<strong>「ボトルに使われた原酒のうち、最も若いものの熟成年数を表示する」</strong>という国際的なルールがあります。つまり「12年」は最低12年熟成の原酒を使っているという意味で、それ以上長熟の原酒が混ざっていることもあります。
        </p>
        <ul>
          <li><strong>年数表記あり</strong>：熟成年数が保証され、長熟ほど希少・高値になりやすい。</li>
          <li><strong>年代指定なし(NV)</strong>：年数の縛りがなく安定供給しやすい。人気銘柄は中古需要も高い。</li>
        </ul>
        <p>近年は原酒不足を背景に年数表記品が休売・終売となり、NVへ切り替わる例が増えました。これが一部の年数表記ボトルの希少化・相場上昇の一因にもなっています。</p>

        <h2 id="satei">買取査定で見られるポイント</h2>
        <p>NVボトルでも、査定で見られる基本は年数表記品と同じです。</p>
        <ul>
          <li><strong>銘柄の人気・需要</strong>：山崎・白州・響などのジャパニーズNVは需要が安定。</li>
          <li><strong>状態</strong>：未開封・液面の高さ・ラベルの状態。</li>
          <li><strong>付属品</strong>：化粧箱・冊子の有無で査定額が変動（<Link href="/articles/whisky-hokan-houhou/">保管方法</Link>参照）。</li>
          <li><strong>流通量</strong>：出回りが少ないNVは希少価値が乗ることも。</li>
        </ul>

        <h2 id="souba">NVボトルの相場の見方</h2>
        <p>
          相場は定価ではなく<strong>実勢価格（実際に取引された価格）</strong>で見ます。当サイトはYahoo!オークションの過去180日の落札データから外れ値を除いた<strong>実勢中央値</strong>を毎週集計しています。NVと年数表記品の価格差も、サンプルが十分な銘柄であれば各買取相場ページで比較できます（数値は目安で、価格を保証するものではありません）。
        </p>

        <h2 id="meigara">代表的なNVボトルと買取相場ページ</h2>
        <ul>
          <li><Link href="/articles/yamazaki-nv-kaitori/">山崎 ノンエイジ（NV）</Link></li>
          <li><Link href="/articles/hakushu-nv-kaitori/">白州 ノンエイジ（NV）</Link></li>
          <li><Link href="/articles/hibiki-nv-kaitori/">響 ノンエイジ（Japanese Harmony等）</Link></li>
          <li><Link href="/articles/yoichi-nv-kaitori/">余市 ノンエイジ（NV）</Link></li>
          <li><Link href="/articles/miyagikyo-nv-kaitori/">宮城峡 ノンエイジ（NV）</Link></li>
          <li><Link href="/articles/glenfarclas-105-kaitori/">グレンファークラス105（年代指定なし）</Link></li>
          <li><Link href="/articles/glenfarclas-nv-kaitori/">グレンファークラス 年代指定なし（105等のボトルの見分け方と実勢価格）</Link></li>
          <li><Link href="/articles/bowmore-nv-kaitori/">ボウモア 年代指定なし（No.1・スモールバッチ等）</Link></li>
          <li><Link href="/articles/talisker-nv-kaitori/">タリスカー 年代指定なし（ストーム・スカイ・ポートリー等）</Link></li>
          <li><Link href="/articles/laphroaig-nv-kaitori/">ラフロイグ 年代指定なし（セレクト・クォーターカスク等）</Link></li>
          <li><Link href="/articles/springbank-kaitori/">スプリングバンク 年代指定なし</Link></li>
          <li><Link href="/articles/springbank-nv-kaitori/">スプリングバンク 年代指定なし（ボトルの見分け方と実勢価格）</Link></li>
        </ul>
        <p>銘柄ごとの実勢中央値・流通量は <Link href="/souba-ranking/">相場ランキング</Link> でまとめて確認できます。</p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">手持ちのNVボトルの相場を知る</p>
          <p className="text-sm text-warm-gray mb-4">年数表記がなくても人気銘柄なら相応の価格が付きます。無料一括査定で複数業者を比較。</p>
          <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm">無料一括査定で相場を調べる →</a>
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
