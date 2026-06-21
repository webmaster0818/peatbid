import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "相続・遺品のウイスキーを売る｜手順・確認チェックリスト・税金の注意点【2026年】",
  description:
    "相続や遺品整理で出てきたウイスキーを売る手順を解説。売る前の状態確認チェックリスト、まとめ売りで気をつけたい税金、高く売るための準備、複数業者の比較まで。価値の目安は実勢相場で確認。",
  alternates: { canonical: "/articles/whisky-souzoku-baikyaku/" },
};

const toc = [
  ["nagare", "相続・遺品のウイスキーを売る全体の流れ"],
  ["checklist", "売る前の確認チェックリスト"],
  ["takaku", "まとめ売りで損しないコツ"],
  ["zeikin", "相続・まとめ売りと税金の注意"],
  ["hikaku", "複数業者で比較する"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "古いウイスキーでも売れますか？",
    a: "未開封で状態が良ければ、古い銘柄でも売れることが多いです。終売・休売になった銘柄は希少価値が付くこともあります。一方で、開封済み・液面が大きく下がっている・ラベルがひどく劣化しているものは値が付きにくくなります。まずは銘柄と状態を確認しましょう。",
  },
  {
    q: "本数が多いのですが、まとめて売れますか？",
    a: "はい。出張買取や宅配買取に対応する業者なら、まとめて査定してもらえます。本数が多い場合は、利益の合計が譲渡所得の特別控除（年間50万円）を超えると課税対象になり得るため、何を・いくらで売ったかの記録を残しておくと安心です。",
  },
  {
    q: "箱や付属品がなくても売れますか？",
    a: "売れますが、化粧箱・冊子・カートンなどの付属品があると査定額が上がります。遺品整理では付属品が別の場所にあることも多いので、ボトルと一緒に探してみてください。",
  },
  {
    q: "価値がわからないボトルはどうすれば？",
    a: "ラベルの銘柄名・年数表記・容量を確認し、各銘柄の買取相場ページや相場ランキングで実勢の目安を調べられます。判断が難しい高額そうなボトルは、複数業者の無料査定にかけて比較するのが確実です。",
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
          <li><span className="text-foreground">相続・遺品のウイスキーを売る</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          相続・遺品のウイスキーを売る｜手順・チェックリスト・税金の注意
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>まず<strong>銘柄・年数・容量・状態（未開封か/液面/付属品）</strong>を確認。</li>
            <li>本数が多いなら<strong>出張・宅配買取</strong>でまとめて査定。</li>
            <li>利益の合計が大きい場合は<strong>税金（譲渡所得）</strong>に注意。<Link href="/articles/whisky-kaitori-zeikin/">税金の記事</Link>参照。</li>
            <li>価値の目安は<Link href="/souba-ranking/">相場ランキング</Link>で確認し、<strong>複数業者で比較</strong>。</li>
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

        <h2 id="nagare">相続・遺品のウイスキーを売る全体の流れ</h2>
        <ol>
          <li><strong>集める</strong>：保管場所（戸棚・押し入れ・倉庫）からボトルと付属品を集める。</li>
          <li><strong>確認する</strong>：下のチェックリストで銘柄・状態を確認。</li>
          <li><strong>相場を調べる</strong>：<Link href="/souba-ranking/">相場ランキング</Link>・各銘柄ページで目安を把握。</li>
          <li><strong>査定する</strong>：本数が多ければ出張・宅配買取でまとめて。複数業者で比較。</li>
          <li><strong>記録する</strong>：何を・いくらで売ったかを記録（税金の判断に必要）。</li>
        </ol>

        <h2 id="checklist">売る前の確認チェックリスト</h2>
        <p>査定額は状態で大きく変わります。次の点を確認しておくと、見積もりがスムーズです。</p>
        <ul>
          <li>☐ <strong>銘柄名・年数表記・容量</strong>（ラベルで確認。<Link href="/articles/whisky-nv-toha/">年数表記がないNV</Link>もあり）</li>
          <li>☐ <strong>未開封かどうか</strong>（開封済みは値が付きにくい）</li>
          <li>☐ <strong>液面の高さ</strong>（経年で下がる。極端に低いと減額）</li>
          <li>☐ <strong>ラベル・キャップの状態</strong>（破れ・汚れ・サビ）</li>
          <li>☐ <strong>付属品</strong>（化粧箱・冊子・カートンの有無）</li>
          <li>☐ <strong>本数</strong>（合計の概算額をメモ）</li>
        </ul>

        <h2 id="takaku">まとめ売りで損しないコツ</h2>
        <ul>
          <li><strong>付属品をそろえる</strong>：箱・冊子があるだけで査定額が上がります（<Link href="/articles/whisky-hokan-houhou/">保管方法</Link>）。</li>
          <li><strong>高額銘柄は個別に確認</strong>：<Link href="/articles/yamazaki-18-kaitori/">山崎18年</Link>・<Link href="/articles/hibiki-30-kaitori/">響30年</Link> など高額品が混じっていないか。まとめて二束三文にしない。</li>
          <li><strong>偽物が心配なら</strong>：<Link href="/articles/whisky-nisemono-miwakekata/">見分け方</Link>を確認し、不安なものは専門業者の査定へ。</li>
        </ul>

        <h2 id="zeikin">相続・まとめ売りと税金の注意</h2>
        <p>
          遺品のウイスキーを売って利益が出た場合、個人の単発売却は<strong>譲渡所得</strong>になることが多く、<strong>年間50万円の特別控除</strong>の範囲なら課税されないケースが一般的です。ただし<strong>まとめ売りで利益の合計が大きい場合や、1点30万円超の高額品</strong>は課税対象になり得ます。詳しくは <Link href="/articles/whisky-kaitori-zeikin/">ウイスキー買取の税金</Link> を参照し、判断に迷う場合は税務署・税理士にご確認ください。
        </p>
        <p className="text-sm text-warm-gray">※ 相続税（遺産そのものにかかる税）と、売却益にかかる所得税は別の論点です。相続税の要否は遺産全体で判断されます。</p>

        <h2 id="hikaku">複数業者で比較する</h2>
        <p>
          同じボトルでも業者によって査定額に差が出ます。本数が多い遺品整理では、<strong>出張買取・宅配買取に対応した複数の業者で相見積もり</strong>を取り、手取り額が最も高いところを選ぶのが基本です。
        </p>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">遺品のウイスキーをまとめて査定</p>
          <p className="text-sm text-warm-gray mb-4">無料一括査定で複数業者の入札を比較。出張・宅配対応の業者も見つかります。</p>
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
          ※ 本記事は一般的な情報整理であり、税務・法務の個別判断を保証するものではありません。税金の取り扱いは税務署・税理士にご確認ください。相場の目安は <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link> で確認できます。
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
