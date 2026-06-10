import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキー投資の始め方｜相場の見方・銘柄選び・注意点を初心者向けに解説【2026年】",
  description:
    "ウイスキー投資の始め方を初心者向けに解説。実勢相場の見方、値上がりしやすい銘柄の選び方、保管とリスク、売却（出口）まで。Yahoo!オークション落札データにもとづく当サイトの相場ランキングも活用できます。",
  alternates: { canonical: "/articles/whisky-toushi-hajimekata/" },
};

const toc = [
  ["what", "ウイスキー投資とは（なぜ値上がりするのか）"],
  ["souba", "相場の見方｜実勢中央値と流通量をチェック"],
  ["select", "投資に向く銘柄の選び方"],
  ["risk", "リスクと注意点（嗜好品ゆえの前提）"],
  ["steps", "始め方の5ステップ"],
  ["exit", "出口戦略｜どこで・いつ売るか"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "ウイスキー投資はいくらから始められますか？",
    a: "数千円〜数万円の流通量が多い定番銘柄から始める人が多いです。いきなり高額な終売・長期熟成品に手を出すより、まずは相場が形成されている銘柄で「相場の動き方」を体感するのがおすすめです。",
  },
  {
    q: "必ず儲かりますか？",
    a: "いいえ。ウイスキーは株式のような金融商品ではなく嗜好品で、相場は需給・為替・流行で上下します。値下がりや、売りたい時に買い手が付かないこともあります。余剰資金で、最悪飲んでも良いと思える範囲で楽しむのが基本です。",
  },
  {
    q: "本物かどうか、偽物が心配です。",
    a: "正規流通店・信頼できる店舗での購入が基本です。中古・オークションで買う場合は、ラベル・キャップシール・液面・購入証明を確認しましょう。各銘柄ページの「偽物の見分け方」も参考にしてください。",
  },
  {
    q: "保管はどうすればよいですか？",
    a: "未開封・立てて保管・直射日光と高温多湿を避けるのが原則です。外箱・冊子・カートンなどの付属品は売却時の評価に直結するため、購入時の状態で保管してください。",
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
          <li><span className="text-foreground">ウイスキー投資の始め方</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキー投資の始め方｜相場の見方・銘柄選び・注意点
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-09 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <p>
          近年、山崎・響・マッカランなどのウイスキーが「資産」として注目され、終売や長期熟成の希少銘柄は数年で価格が大きく上昇したものもあります。本記事では、<strong>ウイスキー投資の始め方</strong>を、相場の見方から銘柄選び、保管、出口（売却）まで初心者向けに解説します。数値は当サイトがYahoo!オークションの落札データから集計した実勢中央値にもとづく参考情報です。
        </p>

        <div className="not-prose bg-cream border border-amber/30 rounded-xl p-4 my-6">
          <p className="text-sm font-bold text-amber-dark mb-1">まず相場をチェック</p>
          <p className="text-sm text-ink/80">
            主要50銘柄の<strong>今週の値上がり/値下がり・実勢中央値</strong>は{" "}
            <Link href="/souba-ranking/" className="text-amber-dark underline font-semibold">相場ランキング・ダッシュボード</Link>{" "}
            で毎週更新しています。投資判断の出発点にどうぞ。
          </p>
        </div>

        <nav className="not-prose border border-warm-border rounded-xl p-5 my-8" aria-label="目次">
          <p className="font-bold text-ink mb-3">目次</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-amber-dark">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <h2 id="what">ウイスキー投資とは（なぜ値上がりするのか）</h2>
        <p>
          ウイスキー投資とは、希少性や需要の高いボトルを購入・保有し、価格が上がったタイミングで売却して差益を狙う考え方です。値上がりの背景には、<strong>①長期熟成・終売による供給の物理的な限界、②世界的なジャパニーズウイスキー人気、③コレクター・投資需要の拡大</strong>があります。一方で、飲まれて消費される嗜好品ゆえに「現存数が減り続ける」点も希少性を支えています。
        </p>

        <h2 id="souba">相場の見方｜実勢中央値と流通量をチェック</h2>
        <p>
          相場を見るときは、定価や希望価格ではなく<strong>「実際にいくらで取引されたか（実勢価格）」</strong>を見ます。当サイトでは、Yahoo!オークションの過去180日の落札データから外れ値を除いた<strong>実勢中央値</strong>と、<strong>落札件数（流通量）</strong>を毎週集計しています。
        </p>
        <ul>
          <li><strong>実勢中央値</strong>：その銘柄の「だいたいの取引価格」。週次の動きで値上がり/値下がりが分かります。</li>
          <li><strong>流通量（落札件数）</strong>：多いほど取引が活発＝換金しやすく相場も安定。少ない銘柄は希少だが売り時を逃すと次の出物まで時間がかかることも。</li>
        </ul>
        <p>
          銘柄ごとの数値と週次の推移は <Link href="/souba-ranking/">相場ランキング</Link> と各銘柄の買取相場ページで確認できます。
        </p>

        <h2 id="select">投資に向く銘柄の選び方</h2>
        <p>初心者がまず押さえたいのは、<strong>需要が安定して相場が形成されている定番</strong>と、<strong>供給が止まった終売・長期熟成の希少銘柄</strong>です。</p>
        <ul>
          <li><strong>定番（入りやすい）</strong>：<Link href="/articles/yamazaki-12-kaitori/">山崎12年</Link>・<Link href="/articles/hakushu-12-kaitori/">白州12年</Link> など。流通量が多く相場が読みやすい。</li>
          <li><strong>プレミア（上値を狙う）</strong>：<Link href="/articles/yamazaki-18-kaitori/">山崎18年</Link>・<Link href="/articles/hibiki-21-kaitori/">響21年</Link>・<Link href="/articles/macallan-25-kaitori/">マッカラン25年</Link> など長期熟成・高評価銘柄。</li>
        </ul>
        <p className="text-sm text-warm-gray">※ どの銘柄も値動きがあり、上がり続ける保証はありません。購入前に必ず最新の相場を確認してください。</p>

        <h2 id="risk">リスクと注意点（嗜好品ゆえの前提）</h2>
        <ul>
          <li><strong>価格変動</strong>：為替・流行・終売ニュースで上下。短期は振れやすい。</li>
          <li><strong>流動性</strong>：売りたい時にすぐ買い手が付くとは限らない（特に超高額・希少銘柄）。</li>
          <li><strong>真贋・状態</strong>：偽物や保管劣化のリスク。正規流通・適切な保管が前提。</li>
          <li><strong>コスト</strong>：保管スペース、売却時の手数料・税（譲渡所得）も考慮。</li>
        </ul>
        <p>金融商品ではないため、<strong>余剰資金で、最悪は自分で飲んでも良いと思える範囲</strong>で楽しむのが鉄則です。</p>

        <h2 id="steps">始め方の5ステップ</h2>
        <ol>
          <li><strong>相場を見る</strong>：<Link href="/souba-ranking/">相場ランキング</Link>で値動きと水準を把握。</li>
          <li><strong>予算と銘柄を決める</strong>：まずは流通量の多い定番から。</li>
          <li><strong>正規流通で購入</strong>：真贋リスクを避け、付属品を揃えて保管。</li>
          <li><strong>適切に保管</strong>：未開封・立て置き・直射日光と高温を避ける。</li>
          <li><strong>出口を準備</strong>：売却は複数業者で相見積り（下記）。</li>
        </ol>

        <h2 id="exit">出口戦略｜どこで・いつ売るか</h2>
        <p>
          売却は、<strong>相場が上がった局面</strong>かつ<strong>複数の買取業者で相見積り</strong>を取るのが基本です。同じボトルでも業者により数千〜数十万円の差が出ます。各銘柄ページの「高く売る方法」「買取業者ランキング」も参考にしてください。
        </p>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">手持ちのボトルの相場が気になったら</p>
          <p className="text-sm text-warm-gray mb-4">まずは無料一括査定で、複数業者の入札を比較しましょう。</p>
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
          ※ 本記事は公開情報・当サイトの相場集計にもとづく一般的な情報で、特定銘柄の購入・投資を推奨・保証するものではありません。価格は変動し、損失が生じる可能性があります。最新の相場は <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link> でご確認ください。
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
