import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-17 新規「古いウイスキー 価値」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認して区分した。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    対象は出品タイトルに「特級」があり、容量 700/720/750/760ml の表記がある1本の出品。セット・ミニ・陶器・記念ボトル・ガロン・
//    液面低下等の状態難・ブランデー等は除外。n<20 の区分は中央値なし。
//    バーボン区分は 55件中54件が同一出品者の連続出品（11/15〜16終了）のため、中央値を出さない。
// 制度の記述は国税庁（酒のしおり 付表・税務大学校 租税史料）・財務省 財務総合政策研究所（財政史）・e-Gov（食品表示基準）のみ。
// 保管方法は whisky-hokan-houhou、相続・遺品の手順と税は whisky-souzoku-baikyaku、真贋は whisky-nisemono-miwakekata に任せ、ここでは重ねない。

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
  single_seller_n?: number;
};

const Y = data.yahoo as unknown as Record<string, Agg>;
const off = data.official;
const dist = data.distribution;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => {
  const a = Y[k];
  return ok(a) ? yenFmt(a.median as number) : null;
};
const range = (a: Agg | undefined) =>
  a && a.min && a.max ? (a.min === a.max ? yenFmt(a.min) : `${yenFmt(a.min)}〜${yenFmt(a.max)}`) : "—";
const pct = (n: number) => `${Math.round((n / dist.n) * 100)}%`;
const fetchedAt = Y["jp-all"]?.fetched_at ?? "2026-11-17";
const yJp = Y["jp-all"];
const ySc = Y["sc-all"];
const yYama = Y["jp-yamazaki"];
const yBo = Y["bourbon-all"];
const under5000 = dist.under3000 + dist["3000to5000"];

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `古いウイスキーに価値はある？特級表記の見分け方とヤフオク落札相場（中央値${med("jp-all") ?? "集計中"}）【2026年11月】`,
  description: `家にある古いウイスキーの価値を、ヤフオクの落札データで掲載しています。特級表記の国産1本（山崎を除く）は中央値${med("jp-all") ?? "集計中"}（n=${yJp?.filtered_n ?? 0}）、スコッチは${med("sc-all") ?? "集計中"}（n=${ySc?.filtered_n ?? 0}）。特級表記の意味と高値で落札された例もご説明します。`,
  alternates: { canonical: "/articles/furui-whisky-kachi/" },
};

const faqs = [
  {
    q: "古いウイスキーには価値がありますか？",
    a: `銘柄によって大きく異なります。当サイトの集計では、出品タイトルに「特級」とある国産（山崎を除く）とスコッチの1本出品${dist.n}件のうち、${under5000}件（${pct(under5000)}）が5,000円未満、10,000円以上は${dist["10000plus"]}件（${pct(dist["10000plus"])}）でした（ヤフオク落札・取得日 ${fetchedAt}）。普及価格帯の銘柄は数千円の落札が中心で、山崎のピュアモルトや一部のスコッチのように数万円以上で落札される銘柄もあります。`,
  },
  {
    q: "「特級」と書かれたウイスキーはいつ頃のものですか？",
    a: "国税庁「酒のしおり」の付表によると、級別制度は平成元年（1989年）4月の酒税法等の改正で廃止されました。財務省 財務総合政策研究所の財政史は、この改正で清酒やウイスキーの級別制度が廃止されたと記載しています。そのため、ラベルに「特級」とあるウイスキーは、原則として級別制度があった平成元年3月以前に出荷されたボトルと考えられます。正確な製造年は、ボトルだけでは判断できない場合があります。",
  },
  {
    q: "賞味期限が書かれていませんが、飲めますか？",
    a: "食品表示基準（内閣府令）第3条第3項の表では、酒類は「消費期限又は賞味期限」の表示を省略できる食品とされています。期限の表示がないこと自体は、古いボトルでも珍しいことではありません。ただし、飲めるかどうか・風味が保たれているかは保管状態や栓の状態によって異なり、当サイトでは判断できません。液面の低下や栓の劣化があるボトルは、無理に飲まず、状態を業者に伝えて査定を受けてください。",
  },
  {
    q: "自分でヤフオクやフリマに出品してもよいですか？",
    a: "国税庁「お酒に関するQ&A【販売業免許関係】」Q5では、継続して酒類を出品・販売する場合は酒類販売業免許が必要で、家庭で不要になった酒類を出品するような、通常継続的な販売に当たらない場合は免許は必要ないとされています。本数が多い場合や、継続的に出品する予定がある場合は、所轄の税務署に確認するか、買取業者への売却をご検討ください。",
  },
  {
    q: "いくらで売れるかを調べるには、どうすればよいですか？",
    a: "ラベルの銘柄名・容量・度数、「特級」「従価」の表記を控え、ボトル全体・ラベル・キャップの写真を用意したうえで、複数の買取業者に査定を依頼してください。本ページの落札額は市場で落札された価格であり、業者の買取額はここから手数料等を引いた水準になります。",
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
  { id: "kachi", label: "1. 古いウイスキーの落札価格の分布" },
  { id: "meigara", label: "2. 銘柄別の落札価格" },
  { id: "tokkyu", label: "3. 「特級」表記とは（制度の経緯）" },
  { id: "takane", label: "4. 高値で落札されていたボトルの例" },
  { id: "nomeru", label: "5. 賞味期限と状態について" },
  { id: "uru-mae", label: "6. 売る前の確認事項" },
  { id: "faq", label: "7. よくある質問" },
  { id: "sources", label: "8. 出典・集計方法" },
];

const rows: { key: string; group: string; name: string }[] = [
  { key: "jp-all", group: "国産", name: "国産ウイスキー全体（山崎を除く）" },
  { key: "jp-old", group: "国産", name: "サントリー オールド" },
  { key: "jp-kingsland", group: "国産", name: "ニッカ キングスランド" },
  { key: "jp-royal", group: "国産", name: "サントリー ローヤル" },
  { key: "jp-supernikka", group: "国産", name: "スーパーニッカ" },
  { key: "jp-kaku", group: "国産", name: "サントリー 角瓶" },
  { key: "jp-reserve", group: "国産", name: "サントリー スペシャルリザーブ" },
  { key: "jp-yamazaki", group: "国産", name: "サントリー 山崎（ピュアモルト）" },
  { key: "sc-all", group: "スコッチ", name: "スコッチ全体" },
  { key: "sc-jw-black", group: "スコッチ", name: "ジョニーウォーカー 黒ラベル" },
  { key: "sc-jw-red", group: "スコッチ", name: "ジョニーウォーカー 赤ラベル" },
  { key: "sc-parr", group: "スコッチ", name: "オールドパー" },
];

const distRows: { label: string; n: number }[] = [
  { label: "3,000円未満", n: dist.under3000 },
  { label: "3,000〜5,000円未満", n: dist["3000to5000"] },
  { label: "5,000〜10,000円未満", n: dist["5000to10000"] },
  { label: "10,000円以上", n: dist["10000plus"] },
];

export default function FuruiWhiskyKachiPage() {
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
            <li><span className="text-foreground">古いウイスキーの価値</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">古いウイスキーの価値｜特級表記のボトルはいくらで売れるか（ヤフオク落札データ）</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(yJp) && <li>出品タイトルに「特級」とある<strong>国産ウイスキー</strong>（山崎を除く・1本）のヤフオク落札中央値は<strong>{med("jp-all")}</strong>です（n={yJp.filtered_n}件）。</li>}
              {ok(ySc) && <li>同じく<strong>スコッチ</strong>（1本）の落札中央値は<strong>{med("sc-all")}</strong>です（n={ySc.filtered_n}件）。</li>}
              <li>国産（山崎を除く）とスコッチを合わせた{dist.n}件のうち、<strong>{pct(under5000)}が5,000円未満</strong>、10,000円以上は{pct(dist["10000plus"])}（{dist["10000plus"]}件）でした。</li>
              {yYama && <li>一方、<strong>山崎のピュアモルト</strong>（特級表記・760ml）は{yYama.filtered_n}件が{range(yYama)}で落札されていました（件数不足のため中央値なし）。</li>}
              <li>「特級」の表記は、平成元年（1989年）4月に廃止された級別制度によるものです（国税庁・財務省の資料）。</li>
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

          <h2 id="kachi">1. 古いウイスキーの落札価格の分布</h2>
          <p>
            「古いウイスキー」は年代も銘柄もさまざまで、ひとくちに相場を示すことはできません。
            そこで当サイトでは、年代の手がかりがラベルに残る<strong>「特級」表記のボトル</strong>に絞り、ヤフオクで実際に落札された価格を集計しました。
            国産（山崎を除く）とスコッチの1本出品{dist.n}件の落札額の分布は、次のとおりです（外れ値を除く前の件数）。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>落札額</th><th>件数</th><th>割合</th></tr>
              </thead>
              <tbody>
                {distRows.map((r) => (
                  <tr key={r.label}><td>{r.label}</td><td>{r.n}件</td><td>{pct(r.n)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            普及価格帯のブレンデッドウイスキーは、特級表記があっても数千円での落札が中心でした。
            古いことだけで高値になるわけではなく、<strong>銘柄と状態によって価格が大きく変わる</strong>点にご注意ください。
          </p>

          <h2 id="meigara">2. 銘柄別の落札価格</h2>
          <p>
            ヤフオクの落札済みオークションを12の検索語（「特級 ウイスキー」「ウイスキー 古酒」「サントリー オールド 特級」など）で検索し、重複を除いた{yJp?.raw_n}件の出品タイトルを確認しました。
            出品タイトルに「特級」があり、容量（700・720・750・760ml）の記載がある1本の出品だけを対象とし、セット・ミニボトル・陶器や記念ボトル・ガロンボトル、
            「液面低下」「目減り」「状態難」などの表記がある出品、ブランデー等の他の酒類は除いています。
            IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>区分（特級表記・1本）</th><th>落札中央値</th><th>件数</th><th>中央の半数／範囲</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong>（{r.group}）</td>
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、区分により約1〜6か月分の落札です。
            「国産ウイスキー全体」「スコッチ全体」には、表の銘柄別の区分の出品も含まれます。
            ニッカ キングスランドは、同じ出品者による同一ボトルの連続出品（6件）を含みます。
            「特級」は出品タイトルの表記で、当サイトがボトルを確認したものではありません。
          </p>
          {yBo && (
            <p>
              なお、特級表記の<strong>バーボン</strong>（1本）は{yBo.title_filtered_n}件が落札されていましたが、そのうち{yBo.single_seller_n ?? 0}件が同じ出品者の連続出品（{fmtDate(yBo.end_date_from)}〜{fmtDate(yBo.end_date_to)}終了）でした。
              市場全体の傾向を表さないおそれがあるため、中央値は掲載していません（外れ値を除いた範囲は{range(yBo)}）。
            </p>
          )}
          <p>
            銘柄ごとの詳しい落札額は、<Link href="/articles/white-horse-kaitori/" className={linkCls}>ホワイトホース</Link>、
            <Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカー</Link>、
            <Link href="/articles/yamazaki-12-kaitori/" className={linkCls}>山崎12年</Link>の各ページにも掲載しています。
          </p>

          <h2 id="tokkyu">3. 「特級」表記とは（制度の経緯）</h2>
          <p>
            かつての酒税法では、清酒やウイスキーに「級別制度」があり、級ごとに異なる税率が適用されていました。
            国税庁 税務大学校の租税史料は、級別制度は昭和18年に導入され、太平洋戦争後に「特級」「一級」「二級」の3段階に変更されたと説明しています。
          </p>
          <ul>
            <li><strong>廃止の時期</strong>: 国税庁「酒のしおり」（令和7年7月）の付表「我が国における酒税制度等の沿革（概要）」に、平成元年4月の「酒税法等の大幅改正（級別制度の廃止、従価税制度の廃止、酒類の種類間の税率の見直し等、酒類の表示基準制度の創設）」と記載されています。</li>
            <li><strong>ウイスキーも対象</strong>: 財務省 財務総合政策研究所の財政史は、この改正で「清酒やウイスキーで定められていた級別制度」が廃止されたと記載しています。清酒の級別区分は段階的に廃止され（平成4年度末まで）、ウイスキーとは時期が異なります。</li>
            <li><strong>廃止の背景</strong>: 同じ財政史によると、昭和62年11月にガット（GATT）で採択された是正勧告が背景の一つで、勧告にはウイスキー等の級別制度が輸入ウイスキー等を不利に扱っているという内容が含まれていました。</li>
            <li><strong>「従価」の表記</strong>: 同じ資料は、清酒特級やウイスキーなどの「高級酒」には従量税に上乗せして従価税が課されており、平成元年の改正で廃止されたと説明しています。古いボトルのラベルや出品タイトルに見られる「従価」は、この制度に関連する表記とみられます。</li>
          </ul>
          <p>
            このため、ラベルに「特級」とあるウイスキーは、原則として<strong>平成元年（1989年）3月以前に出荷されたボトル</strong>と考えられます。
            ただし、出荷から長い年月がたっていることは、それだけで価格を押し上げる要因にはなっていませんでした（第1節の分布を参照）。
          </p>

          <h2 id="takane">4. 高値で落札されていたボトルの例</h2>
          <p>
            第2節の中央値は外れ値を除いた値です。外れ値として除いた出品の中には、次のような高値の落札がありました。
            いずれも<strong>1件ごとの落札結果</strong>であり、同じ銘柄が同じ価格で売れることを示すものではありません。
          </p>
          <ul>
            {data.examples_high.map((e) => (
              <li key={e.name}>{e.name}: {"note" in e && e.note ? e.note : yenFmt(e.price)}（{fmtDate(e.end)}終了）</li>
            ))}
            {yYama && <li>サントリー 山崎（ピュアモルト・特級表記・760ml）: {yYama.filtered_n}件が{range(yYama)}</li>}
          </ul>
          <p>
            同じ「特級」表記でも、銘柄によって価格帯は数百円台から数万円以上まで大きく異なりました。
            古いボトルが複数ある場合は、まとめて処分する前に、1本ずつ銘柄を確認して査定を受けることをおすすめします。
          </p>

          <h2 id="nomeru">5. 賞味期限と状態について</h2>
          <p>
            食品表示基準（平成27年内閣府令第10号）第3条第3項の表では、酒類は「消費期限又は賞味期限」の表示を省略できる食品とされています。
            古いウイスキーに期限の記載がないのは、この規定によるものです。
          </p>
          <p>
            ただし、期限の表示がないことは、どの状態でも飲めることを意味しません。風味や安全性は保管状態や栓の状態によって異なり、当サイトでは判断できません。
            今回の集計では、「液面低下」「目減り」「封印劣化」などの状態に関する表記がある出品は、状態による価格差が混ざらないよう対象から外しています。
            保管の基本は<Link href="/articles/whisky-hokan-houhou/" className={linkCls}>ウイスキーの保管方法</Link>をご覧ください。
          </p>

          <h2 id="uru-mae">6. 売る前の確認事項</h2>
          <ul>
            <li><strong>ラベルの表記を控える</strong>: 銘柄名、容量（ml）、度数、「特級」「従価」の表記、年数表記の有無を確認してください。</li>
            <li><strong>写真を用意する</strong>: ボトル全体・ラベル・キャップや封の写真があると、業者が年代と状態を判断しやすくなります。</li>
            <li><strong>1本ずつ内訳を伝える</strong>: ヤフオクでは複数本のセット出品も多く見られました（当サイトの集計からは除いています）。まとめて売る場合も、銘柄と本数を伝えてください。</li>
            <li><strong>相続・遺品の場合</strong>: 手順や税金の注意点は<Link href="/articles/whisky-souzoku-baikyaku/" className={linkCls}>相続・遺品のウイスキーを売る方法</Link>にまとめています。</li>
            <li><strong>真贋が気になる場合</strong>: 高値の銘柄は<Link href="/articles/whisky-nisemono-miwakekata/" className={linkCls}>偽物の見分け方</Link>もご確認ください。</li>
            <li><strong>自分で出品する場合</strong>: 国税庁のQ&Aでは、継続して出品・販売する場合は酒類販売業免許が必要とされています（家庭で不要になった酒類を継続的でなく出品する場合は不要）。税金については<Link href="/articles/whisky-kaitori-zeikin/" className={linkCls}>ウイスキー買取と税金</Link>をご覧ください。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
          </ul>

          <h2 id="faq">7. よくある質問</h2>
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

          <h2 id="sources">8. 出典・集計方法</h2>
          <ul className="text-sm">
            <li>国税庁「<a href={off.nta_shiori_index} className={linkCls} rel="noopener" target="_blank">酒のしおり（令和7年7月）</a>」付表「<a href={off.nta_shiori} className={linkCls} rel="noopener" target="_blank">我が国における酒税制度等の沿革（概要）</a>」（{off.checked_at}確認）</li>
            <li>国税庁 税務大学校「<a href={off.nta_sozei} className={linkCls} rel="noopener" target="_blank">4. 戦後の酒と酒税</a>」（租税史料特別展示・{off.checked_at}確認）</li>
            <li>財務省 財務総合政策研究所「<a href={off.mof_history} className={linkCls} rel="noopener" target="_blank">財政史 平成元年度〜12年度 第2章第7節 間接税（消費税以外）</a>」（PDF・{off.checked_at}確認）</li>
            <li>e-Gov 法令検索「<a href={off.egov_hyoji} className={linkCls} rel="noopener" target="_blank">食品表示基準</a>」（平成27年内閣府令第10号）第3条第3項（{off.checked_at}確認）</li>
            <li>国税庁「<a href={off.nta_qa_hanbai} className={linkCls} rel="noopener" target="_blank">お酒に関するQ&A【販売業免許関係】</a>」Q5（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yJp?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/whisky-souzoku-baikyaku/" className={linkCls}>相続・遺品のウイスキーを売る方法</Link></li>
              <li><Link href="/articles/whisky-nisemono-miwakekata/" className={linkCls}>ウイスキーの偽物の見分け方</Link></li>
              <li><Link href="/articles/whisky-hokan-houhou/" className={linkCls}>ウイスキーの保管方法</Link></li>
              <li><Link href="/articles/white-horse-kaitori/" className={linkCls}>ホワイトホースの買取相場（特級表記の旧ボトル）</Link></li>
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/japanese-whisky-kaitori/" className={linkCls}>ジャパニーズウイスキーの買取相場</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る前に知るべき基礎ガイド</Link></li>
              <li><Link href="/articles/whisky-akibin-kaitori/" className={linkCls}>ウイスキーの空き瓶は売れる？</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
