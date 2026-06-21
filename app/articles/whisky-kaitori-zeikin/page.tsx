import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキー買取の税金｜確定申告は必要？課税されるケースを解説【2026年】",
  description:
    "ウイスキーを売ったときの税金（譲渡所得・特別控除50万円・1点30万円超の扱い・会社員の20万円ルール）を国税庁の考え方にもとづき整理。確定申告が必要になりやすいケースと、相場の確認方法まで。個別の判断は税務署・税理士へ。",
  alternates: { canonical: "/articles/whisky-kaitori-zeikin/" },
};

const toc = [
  ["kekka", "結論｜多くの個人売却は譲渡所得・控除内なら非課税が多い"],
  ["shotoku", "ウイスキー売却益はどの所得になるか"],
  ["kazei", "課税されやすい3つのケース"],
  ["keisan", "譲渡所得の計算と特別控除50万円"],
  ["kaishain", "会社員の「20万円ルール」"],
  ["junbi", "売る前に準備しておくこと"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "ウイスキーを売ったら必ず確定申告が必要ですか？",
    a: "いいえ、必ずではありません。個人が不用品として売る場合は譲渡所得にあたることが多く、譲渡所得には年間50万円の特別控除があります。利益（売却額−取得費−譲渡費用）が控除の範囲内なら課税されないケースが一般的です。ただし高額品・大量売却・営利的な反復売買は申告が必要になりやすいため、最終的な要否は国税庁の案内や税務署・税理士でご確認ください。",
  },
  {
    q: "1本30万円を超えると税金がかかりますか？",
    a: "生活に通常必要な動産の売却益は原則非課税ですが、1個または1組の価額が30万円を超える貴金属・書画骨董などはこの非課税の対象外とされています。高額なウイスキーはこれに準じて課税対象（譲渡所得）として扱われ得ます。30万円はあくまで非課税対象から外れる目安で、即「30万円の税金」という意味ではありません。",
  },
  {
    q: "買った時の値段（取得費）がわからない場合は？",
    a: "取得費が不明な場合、一般に売却価額の5%を取得費とみなす方法（概算取得費）が使われることがあります。購入時のレシート・明細が残っていれば実額で計上できるため、保管しておくと有利です。具体的な取り扱いは税務署・税理士にご確認ください。",
  },
  {
    q: "転売目的で何本も売っている場合は？",
    a: "営利を目的として継続的・反復的に売買している場合は、譲渡所得ではなく事業所得または雑所得として扱われ、規模により申告が必要になります。単発の不用品売却とは扱いが異なる点に注意してください。",
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
          <li><span className="text-foreground">ウイスキー買取の税金</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキー買取の税金｜確定申告は必要？課税されるケースを解説
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>個人が不用品として売る場合は<strong>譲渡所得</strong>になることが多い。</li>
            <li>譲渡所得には<strong>年間50万円の特別控除</strong>。利益が控除内なら課税されないことが多い。</li>
            <li><strong>1点30万円超の高額品・大量売却・転売目的の反復売買</strong>は申告が必要になりやすい。</li>
            <li>税額の最終判断は<strong>税務署・税理士</strong>へ。本記事は国税庁の一般的な考え方の整理です。</li>
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

        <h2 id="kekka">結論｜多くの個人売却は譲渡所得・控除内なら非課税が多い</h2>
        <p>
          ウイスキーを売って利益が出たとき、税金がかかるかどうかは<strong>「どんな立場で・いくらの利益が出たか」</strong>で変わります。会社員の方が自宅のコレクションを単発で手放す程度であれば、<strong>譲渡所得の特別控除（年間50万円）</strong>の範囲に収まり、結果として課税・申告が不要になるケースが少なくありません。一方で、高額銘柄や大量・継続的な売却は課税対象になりやすく、申告が必要です。以下で順に整理します。
        </p>

        <h2 id="shotoku">ウイスキー売却益はどの所得になるか</h2>
        <p>個人がウイスキーを売って得た利益は、状況により次のいずれかに分類されます。</p>
        <ul>
          <li><strong>譲渡所得</strong>：生活で使っていた物・コレクションを単発で売却した場合の基本。多くの個人売却がこれにあたります。</li>
          <li><strong>事業所得・雑所得</strong>：営利目的で継続的・反復的に売買している場合。いわゆる転売はこちら。</li>
        </ul>
        <p>
          なお「生活に通常必要な動産」の譲渡益は原則非課税ですが、<strong>1個または1組が30万円を超える貴金属・書画骨董など</strong>はこの非課税の対象外とされています。高額なウイスキーはこれに準じて<strong>譲渡所得として課税対象</strong>になり得ます。
        </p>

        <h2 id="kazei">課税されやすい3つのケース</h2>
        <ol>
          <li><strong>高額品（目安：1点30万円超）</strong>：<Link href="/articles/hibiki-30-kaitori/">響30年</Link>・<Link href="/articles/yamazaki-18-kaitori/">山崎18年</Link> など高額銘柄は、非課税の対象から外れ譲渡所得として扱われ得ます。</li>
          <li><strong>まとめ売り・大量売却</strong>：複数本の合計利益が特別控除（50万円）を超えると課税対象に。<Link href="/articles/whisky-souzoku-baikyaku/">相続・遺品でまとめて売る場合</Link>は特に注意。</li>
          <li><strong>転売目的の反復売買</strong>：継続的に売買して利益を得ていると、事業所得・雑所得として申告が必要になります。</li>
        </ol>
        <p>自分の売却額がこのラインに近いかは、まず<Link href="/souba-ranking/">相場ランキング</Link>や各銘柄の買取相場ページで<strong>実勢の水準</strong>を確認するのが第一歩です。</p>

        <h2 id="keisan">譲渡所得の計算と特別控除50万円</h2>
        <p>譲渡所得（総合課税）のおおまかな考え方は次のとおりです。</p>
        <ul>
          <li>譲渡益 ＝ <strong>売却価額 −（取得費＋譲渡費用）− 特別控除50万円</strong>（年間）</li>
          <li>取得費が不明なときは<strong>売却価額の5%（概算取得費）</strong>とする方法が用いられることがあります。</li>
          <li>所有期間が5年を超える長期譲渡所得は、課税対象となる金額が<strong>1/2</strong>になる扱いがあります。</li>
        </ul>
        <p className="text-sm text-warm-gray">※ 数式は一般的な考え方の概略です。実際の区分・控除・税率は他の所得との合算で決まるため、必ず国税庁の案内や税理士でご確認ください。</p>

        <h2 id="kaishain">会社員の「20万円ルール」</h2>
        <p>
          給与を1か所から受けている会社員で、給与所得・退職所得以外の所得（譲渡所得など）の合計が<strong>年間20万円以下</strong>であれば、所得税の確定申告が不要となる場合があります。ただし<strong>住民税の申告は別途必要</strong>になることがあり、医療費控除などで確定申告をする場合はこの20万円以下の所得も含めて申告します。
        </p>

        <h2 id="junbi">売る前に準備しておくこと</h2>
        <ul>
          <li><strong>購入時のレシート・明細</strong>：取得費を実額で計上でき、課税対象額を抑えられます。</li>
          <li><strong>売却額の記録</strong>：いつ・いくらで売ったかを残す（複数本なら合計を把握）。</li>
          <li><strong>付属品をそろえる</strong>：箱・冊子の有無で査定額が変わります（<Link href="/articles/whisky-hokan-houhou/">保管方法</Link>も参照）。</li>
        </ul>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">まずは売却額の目安を知る</p>
          <p className="text-sm text-warm-gray mb-4">課税ラインに近いかは実勢相場の把握から。無料一括査定で複数業者の入札を比較できます。</p>
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
          ※ 本記事は国税庁が公表する一般的な考え方にもとづく情報整理であり、個別の課税判断・税額計算を保証するものではありません。実際の申告要否・計算は、お住まいの税務署または税理士に必ずご確認ください。関連: <Link href="/articles/whisky-souzoku-baikyaku/" className="text-amber-dark underline">相続・遺品のウイスキーを売る</Link> ／ <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link>
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
