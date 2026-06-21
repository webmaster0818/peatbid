import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキーはなぜ高い？高騰の理由とジャパニーズ人気の背景【2026年】",
  description:
    "ウイスキー、とくにジャパニーズウイスキーがなぜ高いのか、高騰の理由を解説。原酒不足・終売・世界的人気・投資需要・円安など価格を押し上げる要因を整理し、今後の売却判断に役立つ視点まで。",
  alternates: { canonical: "/articles/whisky-naze-takai/" },
};

const toc = [
  ["riyu", "ウイスキーが高い5つの理由"],
  ["japanese", "ジャパニーズウイスキーが特に高い背景"],
  ["meigara", "高くなりやすい銘柄の特徴"],
  ["uru", "高騰を売却にどう活かすか"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "なぜ日本のウイスキーは高いのですか？",
    a: "世界的な賞の受賞などで需要が急増した一方、ウイスキーは仕込みから出荷まで長い熟成期間が必要で供給をすぐ増やせません。この需給ギャップに加え、終売・休売による希少化、海外需要や円安が重なり、中古相場が押し上げられています。",
  },
  {
    q: "今後も値上がりし続けますか？",
    a: "保証はできません。相場は需給・流行・為替で上下し、下がる局面もあります。過去の傾向が将来を約束するものではないため、売却タイミングは最新の実勢相場を見て判断するのが現実的です。",
  },
  {
    q: "終売になると必ず高くなりますか？",
    a: "終売・休売は希少化の一因ですが、必ず高くなるとは限りません。もともとの人気・流通量・状態によります。需要の薄い銘柄は終売でも大きくは動かないこともあります。",
  },
  {
    q: "高い理由を知ると売却に役立ちますか？",
    a: "はい。価格を押し上げる要因（終売報道・受賞・円安など）を理解しておくと、相場が上がりやすい局面を捉えやすくなります。実勢の水準は相場ランキングで確認できます。",
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
          <li><span className="text-foreground">ウイスキーはなぜ高い？</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキーはなぜ高い？高騰の理由とジャパニーズ人気の背景
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>高い理由＝<strong>①長い熟成で供給を増やせない ②終売・休売で希少化 ③世界的人気 ④投資需要 ⑤円安</strong>。</li>
            <li>ジャパニーズは受賞で需要が急増した一方、原酒不足で供給が追いつかない。</li>
            <li>ただし<strong>値上がりの継続は保証されない</strong>（需給・為替で上下）。</li>
            <li>売り時は最新の<Link href="/souba-ranking/">相場ランキング</Link>で判断を。</li>
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

        <h2 id="riyu">ウイスキーが高い5つの理由</h2>
        <ol>
          <li><strong>熟成に時間がかかる</strong>：仕込みから出荷まで長い年月が必要で、需要が増えてもすぐ供給を増やせません。</li>
          <li><strong>終売・休売による希少化</strong>：原酒不足で年数表記品が休売・終売となり、中古に希少価値が乗ります（<Link href="/articles/whisky-nv-toha/">年代指定なしへの切替</Link>）。</li>
          <li><strong>世界的な人気</strong>：国際的な賞の受賞などでブランド評価が上昇。</li>
          <li><strong>投資・コレクター需要</strong>：資産として保有・売買する動きが価格を押し上げ。</li>
          <li><strong>円安・海外需要</strong>：海外からの需要が強い局面では国内相場も上がりやすい。</li>
        </ol>

        <h2 id="japanese">ジャパニーズウイスキーが特に高い背景</h2>
        <p>
          ジャパニーズウイスキーは、国際的な品評会での評価をきっかけに世界的な需要が急増しました。一方で熟成という時間の制約から原酒が不足し、メーカーは一部の年数表記品を休売・終売とせざるを得ませんでした。<strong>「需要急増 × 供給制約 × 希少化」</strong>が重なったことが、山崎・白州・響などの中古相場が高い背景です。
        </p>

        <h2 id="meigara">高くなりやすい銘柄の特徴</h2>
        <ul>
          <li><strong>長期熟成・高評価</strong>：<Link href="/articles/yamazaki-18-kaitori/">山崎18年</Link>・<Link href="/articles/hibiki-30-kaitori/">響30年</Link> など。</li>
          <li><strong>終売・限定</strong>：供給が止まった銘柄。</li>
          <li><strong>需要が厚く流通が安定</strong>：<Link href="/articles/yamazaki-nv-kaitori/">山崎NV</Link> など人気の定番。</li>
        </ul>
        <p>銘柄ごとの実勢中央値・流通量は <Link href="/souba-ranking/">相場ランキング</Link> で確認できます。</p>

        <h2 id="uru">高騰を売却にどう活かすか</h2>
        <p>
          価格を押し上げる要因（終売報道・受賞・円安など）が出た局面は、相場が上がりやすいタイミングです。手持ちの銘柄が当てはまるなら、<strong>実勢相場を確認したうえで複数業者の査定</strong>を取ると、高値を捉えやすくなります。詳しくは <Link href="/articles/whisky-souba-kimarikata/">買取相場の決まり方</Link> も参照してください。
        </p>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">相場が上がっている今、価値を確認</p>
          <p className="text-sm text-warm-gray mb-4">無料一括査定で、複数業者の入札を一度に比較できます。</p>
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
          ※ 本記事は公開情報・当サイトの相場集計にもとづく一般的な情報です。価格は変動し、将来の値上がりを保証するものではありません。最新の実勢は <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link> でご確認ください。
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
