import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-12 新規「ハンドレッドパイパーズ 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    「ハンドレッドパイパーズ」の検索結果は2件のみ。出品名は「100パイパーズ」表記が大半のため、こちらで検索した。12年プレミアムは n<20 で中央値なし。
// ブランドの情報は Pernod Ricard 公式のブランドページのみ（100pipers.com は 11/12 時点で 403）。

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
const yDx = Y["deluxe"];
const y12 = Y["12"];
const fetchedAt = yDx?.fetched_at ?? "2026-11-12";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ハンドレッドパイパーズ（100パイパーズ）の買取相場【2026年11月】デラックス ${med("deluxe") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `ハンドレッドパイパーズ（100パイパーズ）の買取相場を、ヤフオクの落札データで掲載しています。デラックス（750/760ml）の落札中央値は${med("deluxe") ?? "集計中"}。12年プレミアムの落札例、Pernod Ricard の公式情報、売る前の確認事項をまとめています。`,
  alternates: { canonical: "/articles/100-pipers-kaitori/" },
};

const faqs = [
  {
    q: "ハンドレッドパイパーズの買取相場はいくらですか？",
    a: ok(yDx)
      ? `当サイトの集計では、ヤフオクで「100パイパーズ デラックス」（750ml・760ml）として落札された1本出品の中央値は${med("deluxe")}です（n=${yDx.filtered_n}件・取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "「シーグラム 100パイパーズ」と「100パイパーズ」は同じものですか？",
    a: "ヤフオクの出品名には「シーグラム（Seagram's）100パイパーズ」と書かれたものが多くあります。Pernod Ricard の公式ページによると、100パイパーズは2001年から同グループのブランドです。当サイトでは、どちらの表記の出品もデラックス（750/760ml）としてまとめて集計しています。",
  },
  {
    q: "100パイパーズ 12年はいくらですか？",
    a: `12年プレミアム（750ml・43%）の1本出品は、当サイトが確認した期間で${y12?.filtered_n ?? 0}件と少ないため中央値は出していません。落札額は${range(y12)}の範囲でした。`,
  },
  {
    q: "特級表記の古いボトルも売れますか？",
    a: "ヤフオクでは「特級」と表記された100パイパーズも落札されており、今回の集計に含めています。液面の低下を記載した出品は集計から除いています。液面やラベルの状態を伝えたうえで査定を依頼してください。",
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
  { id: "current-price", label: "1. 落札価格（デラックス・12年）" },
  { id: "about", label: "2. 100パイパーズとは（公式情報）" },
  { id: "uru-mae", label: "3. 売る前の確認事項" },
  { id: "faq", label: "4. よくある質問" },
  { id: "sources", label: "5. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "deluxe", name: "デラックス", spec: "750ml・760ml・43%" },
  { key: "12", name: "12年 プレミアム", spec: "750ml・43%" },
];

export default function HundredPipersKaitoriPage() {
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
            <li><span className="text-foreground">ハンドレッドパイパーズ 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ハンドレッドパイパーズ（100パイパーズ）の買取相場｜ヤフオク落札中央値と12年の落札例</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(yDx) && <li><strong>デラックス（750/760ml）</strong>のヤフオク落札中央値は<strong>{med("deluxe")}</strong>です（n={yDx.filtered_n}件・中央の半数は{yenFmt(yDx.q1 as number)}〜{yenFmt(yDx.q3 as number)}）。</li>}
              <li><strong>12年 プレミアム</strong>は件数が少ないため中央値を出していません（落札額は{range(y12)}）。</li>
              <li>ヤフオクでは「ハンドレッドパイパーズ」より<strong>「100パイパーズ」「シーグラム 100パイパーズ」</strong>の表記で出品されています。</li>
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

          <h2 id="current-price">1. 落札価格（デラックス・12年）</h2>
          <p>
            ヤフオクで「ハンドレッドパイパーズ」と検索すると、落札済みの出品は2件しかありませんでした。出品名の多くは「100パイパーズ」表記のため、こちらで検索し、タイトルを1件ずつ確認しています。
            ほかの銘柄と組み合わせたセット、ミニボトル、液面の低下を記載した出品は除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。
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
            ※取得日 {fetchedAt}。出品数が少ないため、約6か月分の落札が集計対象です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="about">2. 100パイパーズとは（公式情報）</h2>
          <ul>
            <li><strong>種類</strong>: ブレンデッドスコッチウイスキーです。Pernod Ricard の公式ページは、スペイサイド地方のモルトを中心に、厳選した25〜30種類のモルトウイスキーを使うと説明しています。</li>
            <li><strong>味わい</strong>: 公式ページでは、なめらかで、ほのかにスモーキーなウイスキーと紹介されています。</li>
            <li><strong>市場</strong>: アジアで2番目に売れているスコッチウイスキーであり、インドで首位のスコッチウイスキーと記載されています。</li>
            <li><strong>所属</strong>: 2001年から Pernod Ricard グループのブランドです。</li>
          </ul>
          <p className="text-xs text-warm-gray">※Pernod Ricard 公式サイトのブランドページより（{off.checked_at}確認・英語）。</p>

          <h2 id="uru-mae">3. 売る前の確認事項</h2>
          <ul>
            <li><strong>表記と容量を控える</strong>: デラックスは750mlと760mlの出品があり、12年プレミアムは別の価格帯です。ラベルの表記・容量・度数を控えてください。</li>
            <li><strong>ボトルの状態を伝える</strong>: 古いボトルが多い銘柄です。液面の低下やラベルの傷みは査定額に影響するため、事前に伝えてください。</li>
            <li><strong>まとめて出す</strong>: 1本あたりの落札額が1,000〜2,000円台の水準です。ほかのお酒と一緒に査定に出すと手間が減ります。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
          </ul>

          <h2 id="faq">4. よくある質問</h2>
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

          <h2 id="sources">5. 出典・集計方法</h2>
          <ul className="text-sm">
            <li>Pernod Ricard「<a href={off.pernod} className={linkCls} rel="noopener" target="_blank">100 Pipers</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yDx?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/dewars-kaitori/" className={linkCls}>デュワーズの買取相場</Link></li>
              <li><Link href="/articles/glenlivet-kaitori/" className={linkCls}>グレンリベットの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る手順</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
