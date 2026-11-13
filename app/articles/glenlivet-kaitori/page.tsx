import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-12 新規「グレンリベット 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    12年はダブルオーク表記の出品が大半のため、ダブルオークを主区分にした。ダブルオーク以外の12年（記念ボトル等を除く）は n<20 で中央値なし。
// 製品・ブランドの情報は Pernod Ricard 公式のブランドページのみ（theglenlivet.com は 11/12 時点で 403）。

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
const y12 = Y["12-double-oak"];
const y18 = Y["18"];
const yfr = Y["founders"];
const y12o = Y["12"];
const fetchedAt = y18?.fetched_at ?? "2026-11-12";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `グレンリベットの買取相場【2026年11月】12年 ${med("12-double-oak") ?? "集計中"}・18年 ${med("18") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `グレンリベットの買取相場を、ヤフオクの落札データで掲載しています。12年 ダブルオークの落札中央値は${med("12-double-oak") ?? "集計中"}、18年は${med("18") ?? "集計中"}、ファウンダーズリザーブは${med("founders") ?? "集計中"}。Pernod Ricard の公式情報と売る前の確認事項もまとめています。`,
  alternates: { canonical: "/articles/glenlivet-kaitori/" },
};

const faqs = [
  {
    q: "グレンリベットの買取相場はいくらですか？",
    a: ok(y12) && ok(y18)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値は12年 ダブルオーク（700ml）が${med("12-double-oak")}（n=${y12.filtered_n}件）、18年（700ml）が${med("18")}（n=${y18.filtered_n}件）です（取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "18年が「バッチリザーブ」と書かれているのは何ですか？",
    a: "ヤフオクの出品では、18年の多くに「バッチリザーブ（BATCH RESERVE）」の表記がありました。当サイトでは18年の1本出品をまとめて集計しており、バッチリザーブ表記の有無による価格差は分けていません。",
  },
  {
    q: "ファウンダーズリザーブとは何ですか？",
    a: `Pernod Ricard の公式ページは、ファウンダーズリザーブを創業者ジョージ・スミスの構想に敬意を表した年数表記のないシングルモルトと説明しています。ヤフオクでの落札中央値は${med("founders") ?? "（集計中）"}でした（n=${yfr?.filtered_n ?? 0}件）。`,
  },
  {
    q: "200周年記念ボトルや限定品はいくらですか？",
    a: "記念ボトル・限定品は出品数が少なく、当サイトでは中央値を集計していません。今回の12年の集計からも除いています。複数の業者に個別の査定を依頼してください。",
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
  { id: "current-price", label: "1. 落札価格の中央値" },
  { id: "about", label: "2. グレンリベットとは（公式情報）" },
  { id: "uru-mae", label: "3. 売る前の確認事項" },
  { id: "faq", label: "4. よくある質問" },
  { id: "sources", label: "5. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "founders", name: "ファウンダーズリザーブ", spec: "700ml・40%" },
  { key: "12-double-oak", name: "12年 ダブルオーク", spec: "700ml" },
  { key: "12", name: "12年（ダブルオーク表記なし）", spec: "700ml" },
  { key: "18", name: "18年", spec: "700ml" },
];

export default function GlenlivetKaitoriPage() {
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
            <li><span className="text-foreground">グレンリベット 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンリベットの買取相場｜12年・18年・ファウンダーズリザーブのヤフオク落札中央値</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y18) && <li><strong>18年</strong>のヤフオク落札中央値は<strong>{med("18")}</strong>です（n={y18.filtered_n}件・中央の半数は{yenFmt(y18.q1 as number)}〜{yenFmt(y18.q3 as number)}）。</li>}
              {ok(y12) && <li><strong>12年 ダブルオーク</strong>は<strong>{med("12-double-oak")}</strong>です（n={y12.filtered_n}件）。</li>}
              {ok(yfr) && <li><strong>ファウンダーズリザーブ</strong>は<strong>{med("founders")}</strong>です（n={yfr.filtered_n}件）。</li>}
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

          <h2 id="current-price">1. 落札価格の中央値</h2>
          <p>
            ヤフオクの落札済みオークションを検索し、出品タイトルを1件ずつ確認して、対象ボトルの1本出品だけを残しました。
            12年は「ダブルオーク」と書かれた出品が多かったため、これを1つの区分にしています。
            度数48%の「ライセンスド・ドラム」、ファーストフィル表記品、200周年記念ボトル、ボトラーズ（他社が瓶詰めした製品）、セット・ミニボトル、「特級」「旧」「古酒」表記の出品は除きました。
            IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、出品の多い12年・18年は直近1〜3か月、ファウンダーズリザーブは約6か月分の落札です。
            ダブルオーク表記のない12年は{y12o?.filtered_n ?? 0}件のみでした。これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="about">2. グレンリベットとは（公式情報）</h2>
          <ul>
            <li><strong>歴史</strong>: Pernod Ricard の公式ページは「1824年からスコットランドのハイランドで造られている」と記載しています。12年は創業者ジョージ・スミスの原点となる味わいを受け継ぐ製品と紹介されています。</li>
            <li><strong>製法</strong>: スペイサイドのモルトとケアンゴームズ国立公園のミネラル水を、伝統的なランタン型のポットスチルで蒸溜し、オーク樽で熟成させると説明されています。</li>
            <li><strong>位置づけ</strong>: 世界で2番目に売れているシングルモルトと記載されています。2001年から Pernod Ricard グループのブランドです。</li>
            <li><strong>主な製品</strong>: 12年・ファウンダーズリザーブ（年数表記なし）・カリビアンリザーブ（40%）などが紹介されています。</li>
          </ul>
          <p className="text-xs text-warm-gray">※Pernod Ricard 公式サイトのブランドページより（{off.checked_at}確認・英語）。</p>

          <h2 id="uru-mae">3. 売る前の確認事項</h2>
          <ul>
            <li><strong>ラベルの表記を確認する</strong>: 同じ12年でも、ダブルオーク・ライセンスド・ドラム・記念ボトルで落札額が異なります。商品名と度数を控えてください。</li>
            <li><strong>18年は箱の有無を伝える</strong>: ヤフオクでは箱付きの出品が多くありました（付属品の有無による価格差は集計していません）。</li>
            <li><strong>12年・ファウンダーズリザーブはまとめて出す</strong>: 1本あたり数千円の水準のため、ほかのお酒と一緒に査定に出すと手間が減ります。</li>
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
            <li>Pernod Ricard「<a href={off.pernod} className={linkCls} rel="noopener" target="_blank">The Glenlivet</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y12?.query}」「{y18?.query}」「{yfr?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/glen-grant-kaitori/" className={linkCls}>グレングラントの買取相場</Link></li>
              <li><Link href="/articles/glenfiddich-kaitori/" className={linkCls}>グレンフィディックの買取価格</Link></li>
              <li><Link href="/articles/macallan-kaitori/" className={linkCls}>マッカランの買取価格</Link></li>
              <li><Link href="/articles/100-pipers-kaitori/" className={linkCls}>100パイパーズの買取相場</Link></li>
              <li><Link href="/articles/royal-salute-kaitori/" className={linkCls}>ロイヤルサルートの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
