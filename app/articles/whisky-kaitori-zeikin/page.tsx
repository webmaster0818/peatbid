import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキー買取の税金｜確定申告は必要？1本30万円・50万円控除・20万円の基準【2026年】",
  description:
    "ウイスキーを売ったときの税金を国税庁の案内で整理（2026年11月6日確認）。生活用動産の非課税と1個30万円超の扱い、譲渡所得の50万円控除、会社員の20万円基準、確定申告が必要になりやすいケースを早見表で示します。個別の判断は税務署・税理士へ。",
  alternates: { canonical: "/articles/whisky-kaitori-zeikin/" },
};

const toc = [
  ["kekka", "結論｜生活用動産は非課税、それ以外は50万円控除のあとで課税"],
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
    a: "いいえ、必ずではありません。国税庁の案内では、生活に通常必要な動産の売却による所得は非課税で、確定申告も不要です。課税される場合でも、総合課税の譲渡所得には年間50万円の特別控除があり、譲渡益の合計が50万円以下なら所得は残りません。給与を1か所から受けていて全部が源泉徴収の対象の人は、給与所得・退職所得以外の所得金額の合計が20万円以下なら原則として確定申告は不要です。国税庁の案内にウイスキーは明記されていないため、最終的な要否は税務署・税理士でご確認ください。",
  },
  {
    q: "1本30万円を超えると税金がかかりますか？",
    a: "国税庁の案内では、貴金属や宝石、書画、骨とうなどで1個または1組の価額が30万円を超えるものは、生活用動産の非課税から除かれます。ウイスキーはこの例示に明記がなく、30万円を超えるボトルがこれにあたるかは個別の判断になります。課税される場合も、30万円を超えたら直ちに税金が発生するわけではなく、譲渡益の合計から50万円の特別控除を引いたあとの金額が所得になります。",
  },
  {
    q: "買った時の値段（取得費）がわからない場合は？",
    a: "国税庁の案内（No.3258）は、土地建物について、取得費が分からない場合に売った金額の5%を取得費とできると説明しています。ウイスキーなど土地建物以外の資産に同じ方法を使えるかは、この案内には書かれていないため、税務署・税理士にご確認ください。購入時のレシート・明細があれば、購入代金を取得費として計算できます。",
  },
  {
    q: "転売目的で何本も売っている場合は？",
    a: "国税庁の案内では、相当の期間にわたり継続的に資産を売っている場合の所得は、譲渡所得ではなく事業所得または雑所得になります。ネットオークションやフリマアプリの個人取引による所得も、一般的には雑所得です（生活の用に供している資産の売却は非課税）。単発の不用品売却とは扱いが異なります。",
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
          ウイスキー買取の税金｜確定申告の要否・課税されるケースを解説
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-11-06 ／ 編集: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <section aria-labelledby="quick-tax" className="not-prose bg-white border-2 border-amber/40 rounded-xl p-5 my-6">
          <h2 id="quick-tax" className="text-lg font-bold text-ink mb-2">ウイスキーを売ったときの税金の早見表（国税庁の案内を2026年11月6日に確認）</h2>
          <p className="text-sm text-ink mb-3"><strong>生活に通常必要な動産の売却は非課税で、確定申告も不要です。課税される場合も、譲渡益の合計から年間50万円を引けます。</strong>ただし国税庁の案内にウイスキーは明記されていないため、高額なボトルや集めたボトルの扱いは税務署・税理士に確認してください。</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">売り方・品物</th><th className="py-2 pr-3">所得の区分</th><th className="py-2 pr-3">税金・申告</th><th className="py-2">国税庁</th></tr></thead>
              <tbody>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">生活に通常必要な動産（1個・1組30万円を超える貴金属・書画・骨とうなどを除く）</th><td className="py-2 pr-3">非課税</td><td className="py-2 pr-3 font-bold">所得税なし・確定申告不要</td><td className="py-2 text-xs"><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3105.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3105</a>・<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1906.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.1906</a></td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">1個・1組30万円超の貴金属・宝石・書画・骨とうなど</th><td className="py-2 pr-3">譲渡所得（総合課税）</td><td className="py-2 pr-3 font-bold">譲渡益の合計−50万円。所有5年超はその2分の1</td><td className="py-2 text-xs"><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3105.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3105</a>・<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3152.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3152</a></td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">相当の期間にわたり継続的に売る</th><td className="py-2 pr-3">事業所得・雑所得</td><td className="py-2 pr-3 font-bold">譲渡所得とは別の計算</td><td className="py-2 text-xs"><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3105.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3105</a></td></tr>
                <tr className="border-b border-warm-border/60"><th scope="row" className="py-2 pr-3 text-left font-normal">給与1か所・全部が源泉徴収の対象の会社員</th><td className="py-2 pr-3">—</td><td className="py-2 pr-3 font-bold">給与・退職所得以外の所得金額の合計が20万円を超えると確定申告が必要（還付を受ける人を除く）</td><td className="py-2 text-xs"><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.1900</a></td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-warm-gray leading-relaxed mt-3">国税庁の案内が例に挙げているのは、生活用動産が「家具、じゅう器、通勤用の自動車、衣服など」、30万円の基準の対象が「貴金属や宝石、書画、骨とうなど」です。ウイスキーの記載はありません。税額の最終判断は税務署・税理士へ。本記事は国税庁の一般的な案内の整理です。</p>
        </section>

        <nav className="not-prose border border-warm-border rounded-xl p-5 my-8" aria-label="目次">
          <p className="font-bold text-ink mb-3">目次</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-amber-dark">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <h2 id="kekka">結論｜生活用動産は非課税、それ以外は50万円控除のあとで課税</h2>
        <p>
          ウイスキーを売って利益が出たとき、税金がかかるかどうかは<strong>「どんな品物を・どんな立場で・いくらの利益で売ったか」</strong>で変わります。生活に通常必要な動産にあたれば非課税です。課税される場合でも、会社員の方がコレクションを単発で手放す程度であれば、<strong>譲渡所得の特別控除（年間50万円）</strong>の範囲に収まり、結果として税金・申告が不要になることがあります。一方で、継続的に売っている場合は扱いが変わります。以下で順に整理します。
        </p>

        <h2 id="shotoku">ウイスキー売却益はどの所得になるか</h2>
        <p>個人がウイスキーを売って得た利益は、状況により次のいずれかになります。</p>
        <ul>
          <li><strong>非課税（生活用動産）</strong>：生活に通常必要な動産の売却による所得です。</li>
          <li><strong>譲渡所得（総合課税）</strong>：生活用動産にあたらない資産を売った場合です。給与所得などと合わせて課税されます。</li>
          <li><strong>事業所得・雑所得</strong>：相当の期間にわたり継続的に売っている場合です。いわゆる転売はこちらです。</li>
        </ul>
        <p>
          なお<strong>1個または1組が30万円を超える貴金属や宝石、書画、骨とうなど</strong>は、生活用動産の非課税から除かれます。国税庁の案内にウイスキーの記載はなく、高額なボトルがこれにあたるかは個別の判断です。
        </p>

        <h2 id="kazei">課税されやすい3つのケース</h2>
        <ol>
          <li><strong>高額品（1本30万円超）</strong>：ストックラボの掲示（2026-11-06）で <Link href="/articles/hibiki-30-kaitori/">響30年</Link> 520,000〜521,000円・<Link href="/articles/yamazaki-25-kaitori/">山崎25年</Link> 790,000〜791,000円は30万円を超えます。<Link href="/articles/yamazaki-18-kaitori/">山崎18年</Link> は 88,000〜89,000円で超えません。判定は1個または1組ごとです。</li>
          <li><strong>高額品を複数本売る</strong>：課税される品の譲渡益の合計が特別控除（50万円）を超えると、超えた分が所得になります。<Link href="/articles/whisky-souzoku-baikyaku/">相続・遺品でまとめて売る場合</Link>はご注意ください。</li>
          <li><strong>継続的な売買</strong>：相当の期間にわたり継続的に売っていると、事業所得・雑所得になります。</li>
        </ol>
        <p>自分の売却額がこのラインに近いかは、まず<Link href="/souba-ranking/">相場ランキング</Link>や各銘柄の買取相場ページで<strong>実勢の水準</strong>を確認するのが第一歩です。</p>

        <h2 id="keisan">譲渡所得の計算と特別控除50万円</h2>
        <p>国税庁の案内（<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3152.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3152</a>）にある、総合課税の譲渡所得の計算式です。</p>
        <ul>
          <li>譲渡所得の金額 ＝ <strong>譲渡価額 −（取得費＋譲渡費用）− 50万円</strong>（特別控除は年間の譲渡益の合計に対して50万円）</li>
          <li>取得費は、一般に購入代金です（購入手数料なども含みます）。譲渡費用は、売るために直接かかった費用です。</li>
          <li>所有期間が5年以内なら全額、<strong>5年を超えるとその2分の1</strong>が総合課税の対象です。</li>
          <li>譲渡益の合計が50万円以下なら、その金額までしか控除できません（所得は残りません）。</li>
        </ul>
        <p><strong>計算の例（数字は説明用）</strong>：10万円で買ったボトルを80万円で売った場合（譲渡費用なし）、譲渡益は70万円で、50万円を引いた20万円が譲渡所得の金額です。所有5年以内なら20万円全額、5年超なら10万円が総合課税の対象です。</p>
        <p>取得費が分からない場合の5%の扱いについて、国税庁の<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3258.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3258</a>が説明しているのは土地建物です。ウイスキーに使えるかは税務署・税理士にご確認ください。</p>
        <p className="text-sm text-warm-gray">※ 実際の区分・控除・税率は他の所得との合算で決まるため、必ず国税庁の案内や税理士でご確認ください。</p>

        <h2 id="kaishain">会社員の「20万円ルール」</h2>
        <p>
          給与を1か所から受けていて、その全部が源泉徴収の対象となる会社員は、給与所得・退職所得以外の所得金額の合計が<strong>20万円を超える</strong>と確定申告が必要です（確定申告をすれば税金が還付される人を除く。<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.1900</a>）。ネットオークションやフリマアプリの個人取引による所得も一般的には雑所得としてこの合計に入りますが、生活の用に供している資産の売却は非課税で申告不要です（<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1906.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.1906</a>）。20万円以下でも<strong>住民税の申告は別途必要</strong>になることがあり、医療費控除などで確定申告をする場合はこの20万円以下の所得も含めて申告します。
        </p>

        <h2 id="junbi">売る前に準備しておくこと</h2>
        <ul>
          <li><strong>購入時のレシート・明細</strong>：取得費を実額で計上でき、課税対象額を抑えられます。</li>
          <li><strong>売却額の記録</strong>：いつ・いくらで売ったかを記録します（複数本の場合は合計を把握します）。</li>
          <li><strong>付属品をそろえる</strong>：箱・冊子の有無で査定額が変わります（<Link href="/articles/whisky-hokan-houhou/">保管方法</Link>も参照）。</li>
        </ul>
        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">まずは売却額の目安を知る</p>
          <p className="text-sm text-warm-gray mb-4">課税の基準に近いかどうかは、実勢相場を把握したうえでご判断ください。無料一括査定で複数業者の入札を比較できます。</p>
          <p className="text-xs text-warm-gray mb-3"><span className="inline-block align-middle border border-warm-gray/50 rounded px-1.5 py-0.5 mr-2 text-[11px] font-bold tracking-wide">PR</span>ヒカカク！（買取価格比較サイト・最大20社に一括査定）</p>
          <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow sponsored" className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm">無料一括査定で相場を調べる →</a>
        </div>

        <h2 id="faq">よくある質問</h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-4">
            <p className="font-bold text-ink mb-1">Q. {f.q}</p>
            <p className="text-sm leading-relaxed text-ink/80">A. {f.a}</p>
          </div>
        ))}

        <p className="text-xs text-warm-gray not-prose border-t border-warm-border pt-4 mt-8">
          ※ 出典: 国税庁タックスアンサー <a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3105.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3105</a>（譲渡所得の対象となる資産と課税方法）・<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3152.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3152</a>（譲渡所得の計算のしかた）・<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.1900</a>（給与所得者で確定申告が必要な人）・<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1906.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.1906</a>（給与所得者がネットオークション等により副収入を得た場合）・<a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/joto/3258.htm" target="_blank" rel="noopener noreferrer" className="text-amber-dark underline">No.3258</a>（取得費が分からないとき）。いずれも令和8年4月1日現在法令等の表示を2026年11月6日に確認しました。本記事は国税庁が公表する一般的な考え方にもとづく情報整理であり、個別の課税判断・税額計算を保証するものではありません。実際の申告要否・計算は、お住まいの税務署または税理士に必ずご確認ください。関連: <Link href="/articles/whisky-souzoku-baikyaku/" className="text-amber-dark underline">相続・遺品のウイスキーを売る</Link> ／ <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link>
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
