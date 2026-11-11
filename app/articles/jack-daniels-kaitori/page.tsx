import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-11 新規「ジャックダニエル 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    Old No.7 は 700ml、シングルバレル セレクトは国内流通の 750ml／700ml を対象。10年は n<20 のため中央値を出さず落札例のみ。
// 製品情報はジャックダニエル公式サイト（日本語版）の記載のみ（2026-11-11 確認）。

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
const no7 = Y["old-no-7"];
const sbs = Y["single-barrel-select"];
const ten = Y["ten-year"];
const fetchedAt = no7?.fetched_at ?? "2026-11-11";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ジャックダニエルの買取相場【2026年11月】Old No.7 ${med("old-no-7") ?? "集計中"}・シングルバレル セレクト ${med("single-barrel-select") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `ジャックダニエルの買取相場を、ヤフオクの落札データで掲載しています。Old No.7（700ml）の落札中央値は${med("old-no-7") ?? "集計中"}、シングルバレル セレクトは${med("single-barrel-select") ?? "集計中"}。10年の落札例、公式サイトに記載された製法・ラインナップ、売る前の確認事項をまとめています。`,
  alternates: { canonical: "/articles/jack-daniels-kaitori/" },
};

const faqs = [
  {
    q: "ジャックダニエルの買取相場はいくらですか？",
    a: ok(no7) && ok(sbs)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値は Old No.7（700ml・1本出品）が${med("old-no-7")}（n=${no7.filtered_n}件）、シングルバレル セレクトが${med("single-barrel-select")}（n=${sbs.filtered_n}件）です（取得日 ${fetchedAt}）。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "Old No.7（ブラックラベル）は高く売れますか？",
    a: ok(no7)
      ? `Old No.7 は流通量の多い定番品で、落札価格の中央の半数は${yenFmt(no7.q1 as number)}〜${yenFmt(no7.q3 as number)}でした。1本では金額が小さいため、ほかのお酒とまとめて査定に出す方法もあります。`
      : "落札データの件数が不足しているため、中央値は掲載していません。",
  },
  {
    q: "ジャックダニエル 10年はいくらで売れますか？",
    a: `10年（700ml・48.5%）は、当サイトが確認した期間の1本出品が${ten?.filtered_n ?? 0}件と少ないため中央値は出していません。落札例は1万5,000円前後でした（4章）。公式サイトによると、10年はバッチ1（2021年）・バッチ2（2023年）が全米限定、バッチ3（2025年）が全米および一部の海外市場限定の数量発売です。`,
  },
  {
    q: "ジャックダニエルはバーボンですか？",
    a: "公式サイトでは、ジャックダニエルは「テネシーウイスキー」と表記されています。サトウカエデ（シュガーメープル）の炭で一滴ずつ濾過する「チャコール・メローイング」を経て、新しいホワイトオーク樽で熟成すると説明されています。",
  },
  {
    q: "開栓済みのボトルや箱のないボトルも売れますか？",
    a: "買取の可否は業者ごとに異なります。開栓済みは買取の対象外とする業者もあるため、事前に各業者の条件を確認してください。当サイトの集計は未開栓品と思われる出品が中心で、箱の有無による価格差は集計していません。",
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
  { id: "current-price", label: "1. 落札価格の中央値（Old No.7・シングルバレル セレクト）" },
  { id: "lineup", label: "2. 主なボトルと公式の説明" },
  { id: "about", label: "3. ジャックダニエルとは（公式情報）" },
  { id: "ten-year", label: "4. 10年の落札例" },
  { id: "uru-mae", label: "5. 売る前の確認事項" },
  { id: "faq", label: "6. よくある質問" },
  { id: "sources", label: "7. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "old-no-7", name: "Old No.7", spec: "700ml・40%" },
  { key: "single-barrel-select", name: "シングルバレル セレクト", spec: "750ml／700ml" },
  { key: "ten-year", name: "10年（バッチ表記）", spec: "700ml・48.5%" },
];

export default function JackDanielsKaitoriPage() {
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
            <li><span className="text-foreground">ジャックダニエル 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ジャックダニエルの買取相場｜Old No.7・シングルバレル セレクトの落札中央値と10年の落札例</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(no7) && <li><strong>Old No.7（700ml）</strong>のヤフオク落札中央値は<strong>{med("old-no-7")}</strong>です（n={no7.filtered_n}件・中央の半数は{yenFmt(no7.q1 as number)}〜{yenFmt(no7.q3 as number)}）。</li>}
              {ok(sbs) && <li><strong>シングルバレル セレクト</strong>は<strong>{med("single-barrel-select")}</strong>です（n={sbs.filtered_n}件）。</li>}
              <li><strong>10年</strong>は件数が少ないため中央値を出していませんが、1万5,000円前後の落札がありました（<a href="#ten-year" className={linkCls}>4章</a>）。</li>
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

          <h2 id="current-price">1. 落札価格の中央値（Old No.7・シングルバレル セレクト）</h2>
          <p>
            ヤフオクの落札済みオークションを検索し、出品タイトルを1件ずつ確認して、対象ボトルの1本出品だけを残しました。
            複数本のセット・まとめ出品、ミニボトル、空瓶、別のボトル（ハニー・ゴールド・ジェントルマンジャック等）を含む出品は除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
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
                      <td>{ok(a) ? `${yenFmt(a.q1 as number)}〜${yenFmt(a.q3 as number)}` : "—"}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、出品の多い Old No.7 は直近約1か月半、シングルバレル セレクトは約6か月分の落札です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="lineup">2. 主なボトルと公式の説明</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>公式サイトの説明（要約）</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Old No.7</strong></td><td>サトウカエデの炭で一滴ずつ濾過し、職人が組み上げた樽で熟成したテネシーウイスキー。熟成期間は日付ではなく、色・香り・味で判断すると説明されています。</td></tr>
                <tr><td><strong>シングルバレル セレクト</strong></td><td>アルコール度数47%で瓶詰めされたシングルバレル（ひと樽）の製品。シングルバレル コレクションは、バレルハウスの最上段で熟成させるために選んだ樽とされています。</td></tr>
                <tr><td><strong>ジェントルマンジャック</strong></td><td>10フィートのシュガーメープルチャコールによる濾過を二度行う製品。公式の歴史年表では1988年の発売です。</td></tr>
                <tr><td><strong>10年</strong></td><td>アメリカンホワイトオークの樽で10年熟成。ラベルに熟成年数を記載し、10年以上熟成のジャックダニエルの登場は「約120年ぶり」と記載されています。</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※ジャックダニエル公式サイト（日本語版）の各商品ページより（{off.checked_at}確認）。容量・度数は国や市場によって異なる場合があると公式サイトに記載されています。</p>

          <h2 id="about">3. ジャックダニエルとは（公式情報）</h2>
          <ul>
            <li><strong>創業</strong>: 公式の歴史年表では、1866年にジャックダニエル蒸留所が誕生し、「アメリカで初めて公式に登録された蒸留所」となったと記載されています。</li>
            <li><strong>所在地と水</strong>: テネシー州リンチバーグにある洞窟（ケイブスプリング・ホロー）から湧く、石灰岩を通った水を使うと説明されています。</li>
            <li><strong>原料</strong>: コーン・ライ麦・大麦のマッシュレシピで、創業者の配合は「今日まで一切変わっていない」と記載されています。</li>
            <li><strong>チャコール・メローイング</strong>: 高さ3メートル（10フィート）のシュガーメープルチャコールにウイスキーを滴らせて濾過する工程で、すべてのウイスキーがこの工程を通ると説明されています。</li>
            <li><strong>主な年表</strong>: 1904年 Old No.7 がセントルイス万博で金メダル、1988年 ジェントルマンジャック発売、1997年 シングルバレル セレクトの初代ボトル、2011年 テネシーハニー発売。</li>
          </ul>

          <h2 id="ten-year">4. 10年の落札例</h2>
          <p>
            10年（700ml・48.5%）の1本出品は、当サイトが確認した期間で{ten?.filtered_n ?? 0}件でした。件数が20件に満たないため中央値は出していません。以下は実際の落札例です（タイトルは要約）。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>出品タイトル（要約）</th><th>落札額</th><th>終了日</th></tr>
              </thead>
              <tbody>
                {data.ten_year_examples.map((e) => (
                  <tr key={`${e.title}-${e.end}-${e.price}`}>
                    <td>{e.title}</td>
                    <td>{yenFmt(e.price)}</td>
                    <td>{fmtDate(e.end)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            公式サイトでは、10年はバッチ1（2021年リリース・全米限定数量発売）、バッチ2（2023年・全米限定数量発売）、バッチ3（2025年・全米および一部の海外市場限定数量発売）と案内されています。
            ヤフオクの出品には「バッチ4（BATCH 04）」と表記されたボトルもあり、ラベルのバッチ番号を確認して業者に伝えてください。
          </p>

          <h2 id="uru-mae">5. 売る前の確認事項</h2>
          <ul>
            <li><strong>ボトルの種類を確認する</strong>: Old No.7・シングルバレル セレクト・10年・ジェントルマンジャック・フレーバー（ハニー等）で落札価格は大きく異なります。ラベルの商品名・容量・度数を控えてください。</li>
            <li><strong>シングルバレルのラベル情報</strong>: シングルバレルは樽ごとの製品のため、ラベルの記載（樽番号・瓶詰め日など）が分かるよう写真を撮っておくと、オンライン査定で伝えやすくなります。</li>
            <li><strong>まとめて査定に出す</strong>: Old No.7 は1本あたりの金額が小さいため、ほかのお酒と一緒に査定に出すと手間が減ります。</li>
            <li><strong>相見積もり</strong>: 業者ごとに在庫状況や販売先が異なるため、複数の業者で比較してください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
          </ul>

          <h2 id="faq">6. よくある質問</h2>
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

          <h2 id="sources">7. 出典・集計方法</h2>
          <ul className="text-sm">
            <li>ジャックダニエル公式「<a href={off.old_no_7} className={linkCls} rel="noopener" target="_blank">Old No. 7</a>」「<a href={off.single_barrel_select} className={linkCls} rel="noopener" target="_blank">Single Barrel Select</a>」「<a href={off.ten_year} className={linkCls} rel="noopener" target="_blank">10-Year-Old</a>」「<a href={off.gentleman_jack} className={linkCls} rel="noopener" target="_blank">Gentleman Jack</a>」（{off.checked_at}確認）</li>
            <li>ジャックダニエル公式「<a href={off.history} className={linkCls} rel="noopener" target="_blank">歴史</a>」「<a href={off.process} className={linkCls} rel="noopener" target="_blank">製法</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{no7?.query}」「{sbs?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/bookers-kaitori/" className={linkCls}>ブッカーズの買取相場</Link></li>
              <li><Link href="/articles/blantons-kaitori/" className={linkCls}>ブラントンの買取相場</Link></li>
              <li><Link href="/articles/four-roses-kaitori/" className={linkCls}>フォアローゼズの買取相場</Link></li>
              <li><Link href="/articles/dewars-kaitori/" className={linkCls}>デュワーズの買取相場</Link></li>
              <li><Link href="/articles/whisky-alcohol-dosu/" className={linkCls}>ウイスキーのアルコール度数</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る手順</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
