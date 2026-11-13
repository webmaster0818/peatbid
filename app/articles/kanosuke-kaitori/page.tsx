import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-13 新規「シングルモルト嘉之助 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    5区分（シングルモルト48%・ピーテッド・シェリーカスク ヴァッテッド・ダブルディスティラリー・HIOKI POT STILL）は n>=20。
//    鹿児島限定・IPA・2026 LIMITED・Artist Edition #002 は n<20 のため件数と範囲のみ（examples）。
// 製品・蒸溜所の情報は嘉之助蒸溜所の公式サイト kanosuke.com の記載のみ（2026-11-13 確認。/collections・/products は 429 で取得できず、トップの製品欄を使用）。

type Agg = {
  label: string;
  query: string;
  fetched_at: string;
  end_date_from: string | null;
  end_date_to: string | null;
  raw_n: number;
  title_filtered_n: number;
  filtered_n: number;
  median: number | null;
  q1: number | null;
  q3: number | null;
  min: number | null;
  max: number | null;
  insufficient: boolean;
};
type Ex = { label: string; n: number; min: number | null; max: number | null; end_date_from: string | null; end_date_to: string | null };

const Y = data.yahoo as unknown as Record<string, Agg>;
const E = data.examples as unknown as Record<string, Ex>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => (ok(Y[k]) ? yenFmt(Y[k].median as number) : null);
const range = (a: { min: number | null; max: number | null } | undefined) => (a && a.min && a.max ? `${yenFmt(a.min)}〜${yenFmt(a.max)}` : "—");
const ySm = Y["single-malt"];
const yPt = Y["peated"];
const ySh = Y["sherry"];
const fetchedAt = ySm?.fetched_at ?? "2026-11-13";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `シングルモルト嘉之助の買取相場【2026年11月】落札中央値 ${med("single-malt") ?? "集計中"}・ピーテッド ${med("peated") ?? "集計中"}｜ヤフオク実績`,
  description: `シングルモルト嘉之助（700ml・48%）の買取相場を、ヤフオクの落札データで掲載しています。落札中央値は${med("single-malt") ?? "集計中"}、ピーテッドは${med("peated") ?? "集計中"}、シェリーカスク ヴァッテッドは${med("sherry") ?? "集計中"}。ダブルディスティラリー・HIOKI POT STILL、限定品の落札例、蒸溜所の公式情報もまとめています。`,
  alternates: { canonical: "/articles/kanosuke-kaitori/" },
};

const faqs = [
  {
    q: "シングルモルト嘉之助の買取相場はいくらですか？",
    a: ok(ySm)
      ? `当サイトの集計では、シングルモルト嘉之助（700ml・48%）のヤフオク落札価格の中央値は${med("single-malt")}です（n=${ySm.filtered_n}件・中央の半数は${yenFmt(ySm.q1 as number)}〜${yenFmt(ySm.q3 as number)}・取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "ピーテッドやシェリーカスクは通常のシングルモルトより高く売れますか？",
    a: ok(yPt) && ok(ySh) && ok(ySm)
      ? `当サイトの集計では、落札中央値はピーテッド（48%表記）が${med("peated")}（n=${yPt.filtered_n}件）、シェリーカスク ヴァッテッドが${med("sherry")}（n=${ySh.filtered_n}件）で、通常のシングルモルト（${med("single-malt")}）を上回っていました。ラベルの名称を確認してから査定を依頼してください。`
      : "一部の区分は件数が20件に満たないため、中央値を比較できません。",
  },
  {
    q: "鹿児島限定やアーティストエディションはいくらで売れますか？",
    a: `限定品は1本ごとの出品数が少ないため、当サイトでは中央値を出していません。確認した範囲では、鹿児島限定（KAGOSHIMA EXCLUSIVE）が${E["kagoshima-exclusive"]?.n ?? 0}件で${range(E["kagoshima-exclusive"])}、Artist Edition #002 が${E["artist-002"]?.n ?? 0}件で${range(E["artist-002"])}でした。限定品は種類ごとに価格帯が大きく異なるため、個別に査定を依頼してください。`,
  },
  {
    q: "ボトルの中に白い浮遊物（澱）がありますが、売れますか？",
    a: "公式サイトのよくある質問では、ウイスキー原酒に由来する「澱（おり）」の可能性が高く、冷却濾過を最小限に抑えた製法のため保管環境や度数によって生じる場合があると説明されています。ヤフオクでも「オリあり」と明記された出品が落札されており、当サイトの集計に含めています。査定の際は澱があることを事前に伝えてください。",
  },
  {
    q: "箱を捨ててしまいました。箱だけ手に入れることはできますか？",
    a: "公式サイトのよくある質問では、化粧箱のみの販売は行っていないと案内されています。箱は後から入手できないため、売却を考えている場合は箱・冊子を保管しておいてください。",
  },
];

function FaqSchema() {
  return (
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
  );
}

const tocItems = [
  { id: "current-price", label: "1. ボトル別の落札価格の中央値" },
  { id: "limited", label: "2. 限定品の落札例" },
  { id: "about", label: "3. 嘉之助蒸溜所と主なボトル（公式情報）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "single-malt", name: "シングルモルト嘉之助", spec: "700ml・48%" },
  { key: "peated", name: "シングルモルト嘉之助 ピーテッド", spec: "700ml・48%表記" },
  { key: "sherry", name: "シングルモルト嘉之助 シェリーカスク ヴァッテッド", spec: "700ml・48%表記" },
  { key: "double-distillery", name: "嘉之助 DOUBLE DISTILLERY", spec: "700ml・53%" },
  { key: "hioki-pot-still", name: "嘉之助 HIOKI POT STILL", spec: "700ml・51%" },
];

const exRows = ["kagoshima-exclusive", "ipa", "limited-2026", "artist-002"];

export default function KanosukeKaitoriPage() {
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
            <li><span className="text-foreground">シングルモルト嘉之助 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">シングルモルト嘉之助の買取相場｜ピーテッド・シェリーカスク・限定品のヤフオク落札価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(ySm) && <li><strong>シングルモルト嘉之助（700ml・48%）</strong>のヤフオク落札中央値は<strong>{med("single-malt")}</strong>です（n={ySm.filtered_n}件・中央の半数は{yenFmt(ySm.q1 as number)}〜{yenFmt(ySm.q3 as number)}）。</li>}
              {ok(yPt) && ok(ySh) && <li><strong>ピーテッド</strong>は<strong>{med("peated")}</strong>、<strong>シェリーカスク ヴァッテッド</strong>は<strong>{med("sherry")}</strong>で、通常のシングルモルトより高い水準でした。</li>}
              <li>鹿児島限定・IPAカスクフィニッシュ・Artist Edition などの限定品は件数が少ないため、中央値ではなく落札額の範囲を掲載しています。</li>
              <li>掲載額は<strong>落札された市場価格</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className={linkCls}>{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="current-price">1. ボトル別の落札価格の中央値</h2>
          <p>
            ヤフオクの落札済みオークションをボトルごとに検索し、出品タイトルを1件ずつ確認して、対象ボトルの700ml・1本出品だけを残しました。
            「シングルモルト嘉之助」は48%と表記された出品に限り、ピーテッド・シェリーカスク・IPA・限定品・記念ボトル・プライベートボトルを含む出品は除いています。
            セット・まとめ出品、200mlなどの小容量、ジャンク品も除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>落札中央値</th><th>件数</th><th>中央の半数</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong>（{r.spec}）</td>
                      <td>{med(r.key) ?? "データ不足（n<20）"}</td>
                      <td>n={a.filtered_n}件</td>
                      <td>{ok(a) ? `${yenFmt(a.q1 as number)}〜${yenFmt(a.q3 as number)}` : `範囲 ${range(a)}`}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}。検索結果は新しい順に最大150件までのため、区分ごとに集計期間が異なります（約4〜6か月分）。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          <p>
            5つの区分の中央値は6,000円台〜8,000円弱に収まっており、現行の通年品どうしで大きな差はありません。
            一方で、同じ「シングルモルト 48%」の表記でも、鹿児島限定・JAL限定などのラベルは、通常品より高い落札額が多く見られました。ラベルの名称を確認してから査定を依頼してください。
          </p>

          <h2 id="limited">2. 限定品の落札例</h2>
          <p>
            以下は件数が20件に満たないため、中央値ではなく、確認できた落札件数と落札額の範囲のみを掲載しています。
            同じ名称でもロットや付属品によって価格が変わるため、目安としてご覧ください。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル（出品タイトルの表記）</th><th>件数</th><th>落札額の範囲</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {exRows.map((k) => {
                  const x = E[k];
                  if (!x) return null;
                  return (
                    <tr key={k}>
                      <td>{x.label}</td>
                      <td>{x.n}件</td>
                      <td>{range(x)}</td>
                      <td>{fmtDate(x.end_date_from)}〜{fmtDate(x.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※度数は出品タイトルの表記です。蒸溜所限定の200mlボトル、ウイスキーイベントの記念ボトル、シングルカスク、酒販店・バーのプライベートボトルは種類が多く件数が分散するため、集計していません。
          </p>

          <h2 id="about">3. 嘉之助蒸溜所と主なボトル（公式情報）</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>公式サイトの記載（要約）</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>シングルモルト嘉之助</strong></td><td>700ml・ABV 48%。KANOSUKEのフラッグシップとなるシングルモルト・ジャパニーズウイスキー。</td></tr>
                <tr><td><strong>嘉之助 HIOKI POT STILL</strong></td><td>700ml・ABV 51%。「日置蒸溜蔵」から生まれたポットスチルウイスキー。</td></tr>
                <tr><td><strong>嘉之助 DOUBLE DISTILLERY</strong></td><td>700ml・ABV 53%。ブレンデッド・ジャパニーズウイスキー。</td></tr>
                <tr><td><strong>嘉之助メローブレンド</strong></td><td>700ml・アルコール分43%。嘉之助蒸溜所と日置蒸溜蔵の自社原酒のみを使った通年販売のブレンデッド。2026年11月27日発売、希望小売価格4,235円（税込）。</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            公式サイトの製品一覧には、このほか「SHERRY CASKS VATTED」「IPA CASK FINISH」「2026 LIMITED EDITION」「Artist Edition #005」が掲載されています（{off.checked_at}時点）。
            ピーテッドは今回確認した公式ページに掲載がなかったため、度数はヤフオクの出品表記（48%）で記載しています。
          </p>
          <ul>
            <li><strong>蒸溜所</strong>: 鹿児島県日置市日吉町神之川にあり、東シナ海に面した吹上浜のほとりに位置します。2017年11月に小正醸造のウイスキー製造所として設立され、2021年8月に分社化して小正嘉之助蒸溜所株式会社となりました。</li>
            <li><strong>名前の由来</strong>: 焼酎造りを営む小正家の2代目、小正嘉之助氏の名前です。嘉之助氏は1957年に米焼酎をオーク樽で6年間寝かせた「メローコヅル」を発売し、蒸溜所建設のために吹上浜のほとりの土地を入手していました。4代目の小正芳嗣氏がこの土地に蒸溜所を創立したと説明されています。</li>
            <li><strong>製法</strong>: ネックの形状とラインアームの角度が異なる3基のポットスチルを使い分けて蒸留します。樽貯蔵米焼酎に使った樽を焼き直した「焼酎リチャー樽」やバーボン樽などで、海辺から半地下まで環境の異なる熟成庫で熟成させています。寒暖差の大きい土地のため熟成が早く進むと記載されています。</li>
          </ul>
          <p className="text-xs text-warm-gray">※嘉之助蒸溜所 公式サイトのトップ・「KANOSUKEを知る」・会社情報・ニュース・よくある質問より（{off.checked_at}確認）。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>ラベルの名称を確認する</strong>: 通常のシングルモルト・ピーテッド・シェリーカスク・鹿児島限定は、いずれも700ml・48%前後の表記で外観が似ています。ラベルの英字表記（PEATED、SHERRY CASKS VATTED、KAGOSHIMA EXCLUSIVE など）を控えてください。</li>
            <li><strong>箱・冊子を保管する</strong>: 公式サイトでは化粧箱のみの販売は行っていないと案内されています。Artist Edition などでは、箱・冊子付きと明記した出品も見られました。</li>
            <li><strong>澱は事前に伝える</strong>: 公式サイトでは原酒由来の成分と説明されています。ヤフオクでも「オリあり」と明記した出品が落札されています。</li>
            <li><strong>通年品はまとめて出す</strong>: 通年品の落札中央値は6,000〜8,000円前後です。ほかのお酒と一緒に査定に出すと手間が減ります。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
          </ul>

          <h2 id="faq">5. よくある質問</h2>
          <div className="space-y-3 not-prose">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{f.q}</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>

          <h2 id="sources">6. 出典・集計方法</h2>
          <ul className="text-sm">
            <li>嘉之助蒸溜所 公式サイト「<a href={off.top} className={linkCls} rel="noopener" target="_blank">トップ（製品）</a>」「<a href={off.about} className={linkCls} rel="noopener" target="_blank">KANOSUKEを知る</a>」「<a href={off.company} className={linkCls} rel="noopener" target="_blank">会社情報</a>」「<a href={off.mellow_blend} className={linkCls} rel="noopener" target="_blank">「嘉之助メローブレンド」発売のお知らせ</a>」「<a href={off.faq} className={linkCls} rel="noopener" target="_blank">よくある質問</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「嘉之助」「嘉之助 シングルモルト 48%」「嘉之助 ピーテッド」「嘉之助 シェリー」「嘉之助 ダブルディスティラリー」「嘉之助 ポットスティル」の結果を合わせ、同じ出品の重複を除いたうえでタイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/japanese-whisky-kaitori/" className={linkCls}>ジャパニーズウイスキーの買取相場</Link></li>
              <li><Link href="/articles/akkeshi-kaitori/" className={linkCls}>厚岸ウイスキーの買取相場</Link></li>
              <li><Link href="/articles/mars-komagatake-kaitori/" className={linkCls}>マルス 駒ヶ岳の買取価格</Link></li>
              <li><Link href="/articles/chichibu-the-first-kaitori/" className={linkCls}>秩父 ザ・ファーストの買取価格</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
