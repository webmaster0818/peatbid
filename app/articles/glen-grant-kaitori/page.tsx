import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-12 新規「グレングラント 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    12年は 43% の通常品と 40% のオロロソシェリーカスクフィニッシュを別に集計。シェリー仕上げと18年は n<20 のため中央値を出さない。
// 製品・蒸溜所の情報は Campari Group の公式トレーニングサイト Campari Academy の記載のみ（glengrant.com は 11/12 時点で名前解決できず）。

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
const y10 = Y["10"];
const y12 = Y["12"];
const ySh = Y["12-sherry"];
const y18 = Y["18"];
const fetchedAt = y10?.fetched_at ?? "2026-11-12";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `グレングラントの買取相場【2026年11月】10年 ${med("10") ?? "集計中"}・12年 ${med("12") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `グレングラントの買取相場を、ヤフオクの落札データで掲載しています。10年（700ml）の落札中央値は${med("10") ?? "集計中"}、12年（43%）は${med("12") ?? "集計中"}。12年シェリーカスク仕上げと18年の落札例、蒸溜所の公式情報、売る前の確認事項をまとめています。`,
  alternates: { canonical: "/articles/glen-grant-kaitori/" },
};

const faqs = [
  {
    q: "グレングラントの買取相場はいくらですか？",
    a: ok(y10) && ok(y12)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値は10年（700ml）が${med("10")}（n=${y10.filtered_n}件）、12年（700ml・43%）が${med("12")}（n=${y12.filtered_n}件）です（取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "12年に「43%」と「40%」の2種類があるのはなぜですか？",
    a: `ヤフオクの出品では、12年は43%の通常品と、40%の「オロロソシェリーカスクフィニッシュ」に分かれていました。後者の落札額は${range(ySh)}（${ySh?.filtered_n ?? 0}件）で、通常品より高い水準です。件数が20件に満たないため中央値は出していません。ラベルの表記と度数を確認してから査定を依頼してください。`,
  },
  {
    q: "グレングラント18年はいくらで売れますか？",
    a: `18年（700ml・43%）の1本出品は、当サイトが確認した期間で${y18?.filtered_n ?? 0}件と少ないため中央値は出していません。落札額は${range(y18)}の範囲でした。`,
  },
  {
    q: "古いグレングラント（特級表記・5年など）も売れますか？",
    a: "旧ボトルは流通時期や状態による差が大きく、当サイトでは中央値を集計していません。今回の集計からも「特級」「旧」「古酒」と書かれた出品は除いています。複数の業者に個別の査定を依頼してください。",
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
  { id: "current-price", label: "1. 年数別の落札価格" },
  { id: "twelve", label: "2. 12年は2種類あります" },
  { id: "about", label: "3. グレングラント蒸溜所について（公式情報）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "10", name: "10年", spec: "700ml・40%" },
  { key: "12", name: "12年", spec: "700ml・43%" },
  { key: "12-sherry", name: "12年 オロロソシェリーカスクフィニッシュ", spec: "700ml・40%" },
  { key: "18", name: "18年", spec: "700ml・43%" },
];

export default function GlenGrantKaitoriPage() {
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
            <li><span className="text-foreground">グレングラント 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレングラントの買取相場｜10年・12年・18年のヤフオク落札価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y10) && <li><strong>10年（700ml）</strong>のヤフオク落札中央値は<strong>{med("10")}</strong>です（n={y10.filtered_n}件）。</li>}
              {ok(y12) && <li><strong>12年（43%）</strong>は<strong>{med("12")}</strong>です（n={y12.filtered_n}件・中央の半数は{yenFmt(y12.q1 as number)}〜{yenFmt(y12.q3 as number)}）。</li>}
              <li><strong>12年 シェリーカスク仕上げ</strong>と<strong>18年</strong>は件数が少ないため中央値を出していません（落札額はそれぞれ{range(ySh)}、{range(y18)}）。</li>
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

          <h2 id="current-price">1. 年数別の落札価格</h2>
          <p>
            ヤフオクの落札済みオークションを年数ごとに検索し、出品タイトルを1件ずつ確認して、対象ボトルの1本出品だけを残しました。
            セット・まとめ出品、ミニボトル、ほかの年数を含む出品、「特級」「旧」「古酒」と書かれた旧ボトルは除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。
            <strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
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
            ※取得日 {fetchedAt}。グレングラントは出品数が多くないため、約6か月分の落札が集計対象です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="twelve">2. 12年は2種類あります</h2>
          <p>
            ヤフオクで「グレングラント 12年」を検索すると、度数43%の通常品と、度数40%で「オロロソシェリーカスクフィニッシュ」と書かれたボトルの2種類が出品されています。
            今回の集計では、シェリーカスク仕上げの落札額は{range(ySh)}（{ySh?.filtered_n ?? 0}件）で、通常品の中央の半数（{ok(y12) ? `${yenFmt(y12.q1 as number)}〜${yenFmt(y12.q3 as number)}` : "—"}）を上回っていました。
            同じ「12年」でも価格帯が異なるため、ラベルの表記・度数・箱の有無を控えたうえで査定を依頼してください。
          </p>

          <h2 id="about">3. グレングラント蒸溜所について（公式情報）</h2>
          <ul>
            <li><strong>創業</strong>: 1840年、ジョン・グラントとジェームズ・グラントの兄弟がスペイサイドに蒸溜所を建てたと記載されています。スペイ川の支流バックバーンの岸辺にあります。</li>
            <li><strong>蒸溜器</strong>: 1872年に蒸溜所を継いだジェームズ・グラント（通称「ザ・メジャー」）が、背の高い細身のポットスチルと水冷式の精溜器（purifier）を早くに採り入れたと説明されています。</li>
            <li><strong>製造</strong>: オレゴンパイン製の木桶で発酵させ、石造りのダンネージ式熟成庫で熟成させています。蒸溜から瓶詰めまで敷地内で行うと記載されています。</li>
            <li><strong>マスターディスティラー</strong>: デニス・マルコム氏。スコットランドで最も在職期間の長い蒸溜責任者と紹介されています。</li>
            <li><strong>主な製品</strong>: アルボラリス（年数表記なし）・10年・12年・15年・18年。15年はファーストフィルのバーボン樽で熟成し、ノンチルフィルタードと記載されています。アルボラリス・10年・12年はバーボン樽とシェリー樽で熟成させます。</li>
          </ul>
          <p className="text-xs text-warm-gray">※Campari Group の公式トレーニングサイト Campari Academy のグレングラントのページより（{off.checked_at}確認・英語）。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>年数と度数を控える</strong>: 10年・12年・18年で落札価格は大きく異なります。12年は43%と40%（シェリーカスク仕上げ）で価格帯が分かれます。</li>
            <li><strong>旧ボトルは別に査定する</strong>: 「特級」表記やラベルの古いボトルは今回の集計対象外です。個別の査定を依頼してください。</li>
            <li><strong>10年・12年はまとめて出す</strong>: 1本あたりの落札額が数千円の銘柄です。ほかのお酒と一緒に査定に出すと手間が減ります。</li>
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
            <li>Campari Academy「<a href={off.campari_academy} className={linkCls} rel="noopener" target="_blank">Glen Grant&apos;s whiskey portfolio and history</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y10?.query}」「{y12?.query}」「{y18?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/glenlivet-kaitori/" className={linkCls}>グレンリベットの買取相場</Link></li>
              <li><Link href="/articles/glenfiddich-kaitori/" className={linkCls}>グレンフィディックの買取価格</Link></li>
              <li><Link href="/articles/dewars-kaitori/" className={linkCls}>デュワーズの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る手順</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
