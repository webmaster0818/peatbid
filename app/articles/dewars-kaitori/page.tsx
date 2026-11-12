import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-11 新規「デュワーズ 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    12年は 700ml、18年は 750ml（ヤフオクの出品はほぼ 750ml）。12年ミズナラは n<20 のため中央値を出さない。
// 製品情報は Dewar's 公式サイト（英語）の記載のみ（2026-11-11 確認）。

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
const y12 = Y["12"];
const y18 = Y["18"];
const miz = Y["12-mizunara"];
const fetchedAt = y12?.fetched_at ?? "2026-11-11";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `デュワーズの買取相場【2026年11月】12年 ${med("12") ?? "集計中"}・18年 ${med("18") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `デュワーズの買取相場を、ヤフオクの落札データで掲載しています。12年（700ml）の落札中央値は${med("12") ?? "集計中"}、18年（750ml）は${med("18") ?? "集計中"}。公式サイトに記載された製法、12年ミズナラの落札例、売る前の確認事項をまとめています。`,
  alternates: { canonical: "/articles/dewars-kaitori/" },
};

const faqs = [
  {
    q: "デュワーズの買取相場はいくらですか？",
    a: ok(y12) && ok(y18)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値は12年（700ml・1本出品）が${med("12")}（n=${y12.filtered_n}件）、18年（750ml）が${med("18")}（n=${y18.filtered_n}件）です（取得日 ${fetchedAt}）。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "デュワーズ12年は1本でも買い取ってもらえますか？",
    a: "買取の可否は業者ごとに異なります。12年は落札価格が2,000円前後のため、ほかのお酒とまとめて査定に出すと手間が減ります。",
  },
  {
    q: "デュワーズ12年 ミズナラはいくらですか？",
    a: `12年 ミズナラ（700ml）の1本出品は、当サイトが確認した期間で${miz?.filtered_n ?? 0}件と少ないため中央値は出していません。落札額は${miz?.min ? yenFmt(miz.min) : "—"}〜${miz?.max ? yenFmt(miz.max) : "—"}の範囲でした。`,
  },
  {
    q: "デュワーズの「ダブルエイジ」とは何ですか？",
    a: "Dewar's 公式サイトは、12年・18年などを「二段階の熟成（two-stage ageing）」で造ると説明しています。12年はその後にファーストフィルのバーボン樽で仕上げると記載されています。ヤフオクの出品名にある「ダブルエイジ（ド）」はこの製法を指す表記です。",
  },
  {
    q: "古いデュワーズ（特級表記など）は高く売れますか？",
    a: "旧ボトルの価格は銘柄・状態ごとの差が大きく、当サイトでは中央値を集計していません。古いボトルは複数の業者に個別に査定を依頼してください。",
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
  { id: "current-price", label: "1. 落札価格の中央値（12年・18年）" },
  { id: "about", label: "2. デュワーズとは（公式情報）" },
  { id: "lineup", label: "3. 主なボトルと公式の説明" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "12", name: "12年", spec: "700ml・40%" },
  { key: "18", name: "18年", spec: "750ml・40%" },
  { key: "12-mizunara", name: "12年 ミズナラ", spec: "700ml・40%" },
];

export default function DewarsKaitoriPage() {
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
            <li><span className="text-foreground">デュワーズ 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">デュワーズの買取相場｜12年・18年のヤフオク落札中央値と12年ミズナラの落札例</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y12) && <li><strong>12年（700ml）</strong>のヤフオク落札中央値は<strong>{med("12")}</strong>です（n={y12.filtered_n}件・中央の半数は{yenFmt(y12.q1 as number)}〜{yenFmt(y12.q3 as number)}）。</li>}
              {ok(y18) && <li><strong>18年（750ml）</strong>は<strong>{med("18")}</strong>です（n={y18.filtered_n}件）。</li>}
              <li><strong>12年 ミズナラ</strong>は件数が少ないため中央値を出していません（落札額は{miz?.min ? yenFmt(miz.min) : "—"}〜{miz?.max ? yenFmt(miz.max) : "—"}）。</li>
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

          <h2 id="current-price">1. 落札価格の中央値（12年・18年）</h2>
          <p>
            ヤフオクの落札済みオークションを検索し、出品タイトルを1件ずつ確認して、対象ボトルの1本出品だけを残しました。
            複数本のセット・まとめ出品、ミニボトル、空瓶、他の年数（8年・15年など）やホワイトラベルを含む出品は除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。
            12年はミズナラ（ジャパニーズスムース）と「旧」表記の出品を別扱いにしています。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、出品の多い12年は直近約2か月、18年は約6か月分の落札です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="about">2. デュワーズとは（公式情報）</h2>
          <ul>
            <li><strong>種類</strong>: ブレンデッドスコッチウイスキーです。公式サイトは、ホワイトラベル・12年を「最大30種類のシングルモルトとグレーンウイスキー」から造ると説明しています。</li>
            <li><strong>ホワイトラベル</strong>: 公式サイトに「1899年に初めてブレンドされた」と記載されており、ブランドの基本となる製品とされています。</li>
            <li><strong>製法</strong>: 12年・18年は「二段階の熟成（two-stage ageing）」で造ると説明されています。12年はその後、ファーストフィルのバーボン樽で仕上げます。</li>
            <li><strong>度数</strong>: 公式サイトの記載では、ホワイトラベル・12年・18年・ジャパニーズスムース8年はいずれも40%です。</li>
          </ul>

          <h2 id="lineup">3. 主なボトルと公式の説明</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>公式サイトの説明（要約）</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>ホワイトラベル</strong></td><td>1899年に初めてブレンド。蒸溜所5か所の熟成原酒を使える、ブランドの基本となる製品。</td></tr>
                <tr><td><strong>12年</strong></td><td>二段階の熟成の後、ファーストフィルのバーボン樽で仕上げ。2024年の International Whisky Competition で Best Blended Scotch 12 Year Old に選ばれたと記載。</td></tr>
                <tr><td><strong>18年</strong></td><td>長期熟成の原酒を二段階の熟成で仕上げ。2024年の International Spirits Challenge で金賞と記載。</td></tr>
                <tr><td><strong>8年 ジャパニーズスムース</strong></td><td>8年以上熟成の原酒をミズナラ樽で仕上げた製品。ヤフオクには「12年 ミズナラ」と表記された別のボトルも出品されています。</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※Dewar&apos;s 公式サイト（英語）の各商品ページより（{off.checked_at}確認）。国内の容量は、ヤフオクの出品では12年が700ml、18年が750mlでした。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>年数と仕上げを確認する</strong>: 12年・15年・18年、ミズナラ・ジャパニーズスムースなどで落札価格は異なります。ラベルの年数・商品名・容量を控えてください。</li>
            <li><strong>まとめて査定に出す</strong>: 12年は1本あたりの金額が小さいため、ほかのお酒と一緒に査定に出すと手間が減ります。</li>
            <li><strong>18年の箱・缶</strong>: ヤフオクでは「箱付き」「缶箱付」と書かれた18年の出品が多くありました（付属品の有無による価格差は集計していません）。</li>
            <li><strong>相見積もり</strong>: 業者ごとに在庫状況や販売先が異なるため、複数の業者で比較してください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
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
            <li>Dewar&apos;s 公式「<a href={off.white_label} className={linkCls} rel="noopener" target="_blank">White Label</a>」「<a href={off.y12} className={linkCls} rel="noopener" target="_blank">12 Year Old</a>」「<a href={off.y18} className={linkCls} rel="noopener" target="_blank">18 Year Old</a>」「<a href={off.japanese_smooth} className={linkCls} rel="noopener" target="_blank">Japanese Smooth</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y12?.query}」「{y18?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/glenfiddich-kaitori/" className={linkCls}>グレンフィディックの買取価格</Link></li>
              <li><Link href="/articles/glenmorangie-kaitori/" className={linkCls}>グレンモーレンジの買取価格</Link></li>
              <li><Link href="/articles/jack-daniels-kaitori/" className={linkCls}>ジャックダニエルの買取相場</Link></li>
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る手順</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
