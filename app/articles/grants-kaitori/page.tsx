import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-13 新規「グランツ 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    6つの検索語の結果（重複除去 277件）を合わせ、区分ごとに require/exclude で絞り込み。他銘柄との組み合わせ（「/」表記・他銘柄名）は除外。
//    中央値を出すのはロイヤル12年・21年・ファイネスト（n>=20）。18年・トリプルウッド各種は n<20 で件数と範囲のみ。
// 製品・蒸溜所の情報は Grant's 公式サイト（英語・/en/）の記載のみ（2026-11-13 確認）。日本語ページは無く、度数・容量の公式記載も無い。

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

const Y = data.yahoo as unknown as Record<string, Agg>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => (ok(Y[k]) ? yenFmt(Y[k].median as number) : null);
const range = (a: Agg | undefined) => (a && a.min && a.max ? `${yenFmt(a.min)}〜${yenFmt(a.max)}` : "—");
const yRoyal = Y["royal-12"];
const y21 = Y["21"];
const yFin = Y["finest"];
const y18 = Y["18"];
const yTw = Y["triple-wood"];
const yTw8 = Y["triple-wood-8"];
const yTw12 = Y["triple-wood-12"];
const yTwS = Y["triple-wood-smoky"];
const fetchedAt = yRoyal?.fetched_at ?? "2026-11-13";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `グランツの買取相場【2026年11月】ロイヤル12年 ${med("royal-12") ?? "集計中"}・21年 ${med("21") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `グランツ（Grant's）の買取相場を、ヤフオクの落札データで掲載しています。ロイヤル12年の落札中央値は${med("royal-12") ?? "集計中"}、21年（陶器ボトル）は${med("21") ?? "集計中"}、ファイネストは${med("finest") ?? "集計中"}。トリプルウッド・18年の落札例、公式サイトの製品情報、売る前の確認事項をまとめています。`,
  alternates: { canonical: "/articles/grants-kaitori/" },
};

const faqs = [
  {
    q: "グランツの買取相場はいくらですか？",
    a: ok(yRoyal) && ok(y21)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値はグランツ ロイヤル12年（750/760ml）が${med("royal-12")}（n=${yRoyal.filtered_n}件）、21年 陶器ボトル（750ml）が${med("21")}（n=${y21.filtered_n}件）です（取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "グランツで高く売れるのはどのボトルですか？",
    a: `当サイトが集計した区分では、21年の陶器ボトルが最も高く、落札額は${range(y21)}の範囲でした。18年は${range(y18)}（n=${y18?.filtered_n ?? 0}件）です。ロイヤル12年・ファイネストは1本あたり数百円〜数千円の水準でした。`,
  },
  {
    q: "グランツ トリプルウッドはいくらで売れますか？",
    a: `トリプルウッドの1本出品は、年数表記なし${yTw?.filtered_n ?? 0}件・8年${yTw8?.filtered_n ?? 0}件・12年${yTw12?.filtered_n ?? 0}件・スモーキー${yTwS?.filtered_n ?? 0}件と少なく、中央値は出していません。落札額は500円〜3,400円の範囲でした。現行品のため、ほかのお酒とまとめて査定に出すと手間が減ります。`,
  },
  {
    q: "「ファミリーリザーブ」と「トリプルウッド」は同じものですか？",
    a: "Grant's 公式サイトは、トリプルウッドについて「Formerly Family Reserve（旧ファミリーリザーブ）」と記載しています。ヤフオクには「ファミリーリザーブ」「スペシャル ファミリー リザーブ」表記の出品もありますが、1本出品が少ないため当サイトでは集計していません。",
  },
  {
    q: "特級表記の古いグランツも売れますか？",
    a: "ロイヤル12年・ファイネストの出品の多くは「特級」と表記された古いボトルで、今回の集計に含めています。紙封の付いたスタンドファスト ファイネストは3,000円・5,500円で落札された例がありました。液面の低下を記載した出品は集計から除いています。",
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
  { id: "current-price", label: "1. 落札価格の中央値（ロイヤル12年・21年・ファイネスト）" },
  { id: "triple-wood", label: "2. トリプルウッドの落札例" },
  { id: "about", label: "3. グランツとは（公式情報）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "royal-12", name: "ロイヤル 12年", spec: "750ml・760ml・43%" },
  { key: "21", name: "21年 陶器ボトル", spec: "750ml" },
  { key: "finest", name: "ファイネスト／スタンドファスト", spec: "750ml・760ml・43%" },
  { key: "18", name: "18年（クラシック含む）", spec: "700ml・40%／750ml・43%" },
];

const twRows: { key: string; name: string }[] = [
  { key: "triple-wood", name: "トリプルウッド（年数表記なし）" },
  { key: "triple-wood-8", name: "トリプルウッド 8年" },
  { key: "triple-wood-12", name: "トリプルウッド 12年" },
  { key: "triple-wood-smoky", name: "トリプルウッド スモーキー" },
];

export default function GrantsKaitoriPage() {
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
            <li><span className="text-foreground">グランツ 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グランツの買取相場｜ロイヤル12年・21年・ファイネストのヤフオク落札中央値</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y21) && <li><strong>21年 陶器ボトル（750ml）</strong>のヤフオク落札中央値は<strong>{med("21")}</strong>です（n={y21.filtered_n}件・中央の半数は{yenFmt(y21.q1 as number)}〜{yenFmt(y21.q3 as number)}）。</li>}
              {ok(yRoyal) && <li><strong>ロイヤル 12年（750/760ml）</strong>は<strong>{med("royal-12")}</strong>です（n={yRoyal.filtered_n}件・中央の半数は{yenFmt(yRoyal.q1 as number)}〜{yenFmt(yRoyal.q3 as number)}）。</li>}
              {ok(yFin) && <li><strong>ファイネスト／スタンドファスト（750/760ml）</strong>は<strong>{med("finest")}</strong>です（n={yFin.filtered_n}件）。</li>}
              <li><strong>18年</strong>・<strong>トリプルウッド</strong>は件数が少ないため中央値を出していません（18年の落札額は{range(y18)}）。</li>
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

          <h2 id="current-price">1. 落札価格の中央値（ロイヤル12年・21年・ファイネスト）</h2>
          <p>
            ヤフオクの落札済み出品を「グランツ ウイスキー」「グランツ ロイヤル」「グランツ 21年」などの6つの検索語で取得し、重複を除いた{yRoyal?.raw_n ?? 0}件のタイトルを1件ずつ確認しました。
            「グランツ」を含んでもウイスキー以外の出品（広告・グラスなど）、ほかの銘柄と組み合わせたセット、ミニボトル、液面の低下を記載した出品は除いています。
            区分ごとにIQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>落札中央値</th><th>件数</th><th>中央の半数／範囲</th><th>終了日の範囲</th></tr>
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
            ※取得日 {fetchedAt}。約6か月分の落札が集計対象です。容量・度数はヤフオクの出品表記によります（公式サイトに記載がないため）。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          <ul>
            <li><strong>ロイヤル12年</strong>: 出品の多くが「特級」表記の古いボトルです。「70年代」「80年代」と書かれた出品のうち2件は4,200円・3,500円で落札され、外れ値として中央値の計算から除いています。</li>
            <li><strong>21年</strong>: 「キャッスルグラント」「陶器ボトル」と書かれた出品が中心です。総重量（グラム）を記載した出品が多く見られました。</li>
            <li><strong>ファイネスト</strong>: 500円〜2,000円の出品が大半です。「スタンドファスト」表記の出品は671円〜6,655円と幅があり、紙封付きの2件は3,000円・5,500円でした。</li>
          </ul>

          <h2 id="triple-wood">2. トリプルウッドの落札例</h2>
          <p>
            公式サイトに掲載されている現行のトリプルウッドは、ヤフオクでの1本出品が少なく、どの区分も中央値は出していません。件数と落札額の範囲は以下のとおりです。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル（700ml・40%表記）</th><th>件数</th><th>落札額の範囲</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {twRows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong></td>
                      <td>n={a.filtered_n}件</td>
                      <td>{range(a)}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※スモーキーは「終売品」と書かれた1件（3,400円）を外れ値として除いています。スモーキーは公式サイトの製品一覧には掲載されていません（{off.checked_at}確認）。</p>

          <h2 id="about">3. グランツとは（公式情報）</h2>
          <ul>
            <li><strong>種類と所有</strong>: ブレンデッドスコッチウイスキーです。公式サイトは、5代続くスコットランドの家族経営の蒸溜酒メーカー William Grant &amp; Sons が全株式を保有するブランドと説明しています。</li>
            <li><strong>歴史</strong>: 1887年にウィリアム・グラントが7人の息子と2人の娘の助けを借りて最初の蒸溜所を開いたと記載されています。公式サイトは同社を「スコットランドで最も古くから家族経営を続けるブレンデッドウイスキーのつくり手」としています。</li>
            <li><strong>ガーヴァン蒸溜所</strong>: 1963年に9か月で建てられた蒸溜所です。1990年に最初の連続式蒸溜機（patent still）を導入し、ここでつくるグレーンウイスキーがすべてのグランツの中心にあると説明されています。公式サイトはグレンフィディックを「姉妹蒸溜所」と記載しています。</li>
            <li><strong>三角形のボトル</strong>: 1957年にハンス・シュレーガーがデザインしたもので、色を見せるだけでなく、輸出時に効率よく積み重ねて梱包できる形と説明されています。</li>
            <li><strong>規模</strong>: 公式サイトには「世界で3番目に大きいスコッチのブランド」と記載されています。</li>
          </ul>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>公式サイトの説明（要約）</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>トリプルウッド</strong></td><td>3種類の樽で熟成。ヴァージンオーク樽・アメリカンオーク樽・バーボンのリフィル樽を使用。旧名はファミリーリザーブ。</td></tr>
                <tr><td><strong>トリプルウッド 8年</strong></td><td>3種類の樽で熟成し、最低8年熟成。</td></tr>
                <tr><td><strong>トリプルウッド 12年</strong></td><td>シェリー樽・アメリカンオーク樽・バーボンのリフィル樽の3種類で熟成。</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※Grant&apos;s 公式サイト（英語）の各ページより（{off.checked_at}確認）。公式サイトの言語・地域の選択肢に日本語・日本向けのページはありません。ロイヤル12年・21年・ファイネスト・18年は公式サイトの現在の製品一覧に掲載がないため、ボトル名・容量・度数はヤフオクの出品表記で記載しています。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>ボトル名を確認する</strong>: 「ロイヤル」「ファイネスト」「スタンドファスト」「クラシック」「トリプルウッド」など、ラベルの名前と年数で落札額が異なります。容量・度数もあわせて控えてください。</li>
            <li><strong>21年の陶器ボトルは重さを量る</strong>: 中身が見えないため、ヤフオクでは総重量を記載した出品が多く見られます。査定を依頼する際にも伝えると話が早く進みます。</li>
            <li><strong>古いボトルは状態を伝える</strong>: 特級表記の古いボトルが多い銘柄です。液面の低下、ラベルのはがれ、紙封や箱の有無を事前に伝えてください。</li>
            <li><strong>まとめて出す</strong>: ロイヤル12年・ファイネスト・トリプルウッドは1本あたり数百円〜数千円の水準です。ほかのお酒と一緒に査定に出すと手間が減ります。</li>
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
            <li>Grant&apos;s 公式「<a href={off.top} className={linkCls} rel="noopener" target="_blank">Blended Scotch Whisky Collection</a>」「<a href={off.triple_wood} className={linkCls} rel="noopener" target="_blank">Triple Wood</a>」「<a href={off.triple_wood_8} className={linkCls} rel="noopener" target="_blank">Triple Wood 8</a>」「<a href={off.triple_wood_12} className={linkCls} rel="noopener" target="_blank">Triple Wood 12</a>」「<a href={off.distillery} className={linkCls} rel="noopener" target="_blank">Our Distillery</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yRoyal?.query}」（各最大150件・重複除去後{yRoyal?.raw_n ?? 0}件）。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/glenfiddich-kaitori/" className={linkCls}>グレンフィディックの買取価格</Link></li>
              <li><Link href="/articles/dewars-kaitori/" className={linkCls}>デュワーズの買取相場</Link></li>
              <li><Link href="/articles/100-pipers-kaitori/" className={linkCls}>ハンドレッドパイパーズ（100パイパーズ）の買取相場</Link></li>
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
