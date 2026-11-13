import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-12 新規「ワイルドターキー 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    8年は同じ「8年 700ml 50.5%」表記で 1,200〜4,200円 と 15,000円以上 に分かれ、タイトルから区別できないため中央値を出さず件数のみ。
//    レアブリードは現行の 58.4%（58%）表記の出品だけを集計（54〜56%台の旧ロットは除外）。12年は旧ボトル・限定品が大半のため集計しない。
// 製品・歴史の情報はワイルドターキー日本公式サイトの記載のみ（2026-11-12 確認）。

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
type Bimodal = Agg & { all_n: number; low_n: number; low_min: number; low_max: number; high_n: number; high_min: number; high_max: number };

const Y = data.yahoo as unknown as Record<string, Agg>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => (ok(Y[k]) ? yenFmt(Y[k].median as number) : null);
const y13 = Y["13"];
const yRb = Y["rare-breed-584"];
const y8 = Y["8"] as Bimodal;
const fetchedAt = y13?.fetched_at ?? "2026-11-12";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ワイルドターキーの買取相場【2026年11月】13年 ${med("13") ?? "集計中"}・レアブリード ${med("rare-breed-584") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `ワイルドターキーの買取相場を、ヤフオクの落札データで掲載しています。13年 ディスティラーズリザーブの落札中央値は${med("13") ?? "集計中"}、レアブリード（58.4%）は${med("rare-breed-584") ?? "集計中"}。8年の落札額の分布、公式サイトの希望小売価格、売る前の確認事項もまとめています。`,
  alternates: { canonical: "/articles/wild-turkey-kaitori/" },
};

const faqs = [
  {
    q: "ワイルドターキーの買取相場はいくらですか？",
    a: ok(y13) && ok(yRb)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値は13年 ディスティラーズリザーブ（700ml）が${med("13")}（n=${y13.filtered_n}件）、レアブリード（58.4%表記・700ml）が${med("rare-breed-584")}（n=${yRb.filtered_n}件）です（取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "ワイルドターキー8年はいくらで売れますか？",
    a: `8年（700ml・50.5%）の1本出品${y8?.all_n ?? 0}件のうち、${y8?.low_n ?? 0}件は${y8 ? yenFmt(y8.low_min) : "—"}〜${y8 ? yenFmt(y8.low_max) : "—"}、${y8?.high_n ?? 0}件は${y8 ? yenFmt(y8.high_min) : "—"}〜${y8 ? yenFmt(y8.high_max) : "—"}で落札されていました。出品タイトルだけではボトルの違いを区別できないため、中央値は出していません。公式サイトの希望小売価格は700mlで4,378円（税込）です。`,
  },
  {
    q: "レアブリードの度数が58%ではないボトルは何ですか？",
    a: "ヤフオクには54%台・56.4%などと表記されたレアブリードも出品されていました。現行品の公式表記は58.4%（裏ラベルは58%）です。度数の異なるボトルは今回の集計から除いており、落札額も現行品より高い水準でした。個別に査定を依頼してください。",
  },
  {
    q: "ワイルドターキー12年は高く売れますか？",
    a: "ヤフオクの「12年」は、旧ボトルやリミテッドエディション（ゴールドラベル）などの出品が大半で、落札額は1万円台から数十万円まで開きがあります。ボトルの種類ごとの件数が少ないため、当サイトでは中央値を集計していません。",
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
  { id: "eight", label: "2. 8年の落札額は2つの価格帯に分かれます" },
  { id: "about", label: "3. 主なボトルと公式の説明" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "13", name: "13年 ディスティラーズリザーブ", spec: "700ml・45.5%" },
  { key: "rare-breed-584", name: "レアブリード", spec: "700ml・58.4%表記" },
];

export default function WildTurkeyKaitoriPage() {
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
            <li><span className="text-foreground">ワイルドターキー 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ワイルドターキーの買取相場｜13年・レアブリード・8年のヤフオク落札価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y13) && <li><strong>13年 ディスティラーズリザーブ</strong>のヤフオク落札中央値は<strong>{med("13")}</strong>です（n={y13.filtered_n}件・中央の半数は{yenFmt(y13.q1 as number)}〜{yenFmt(y13.q3 as number)}）。</li>}
              {ok(yRb) && <li><strong>レアブリード（58.4%表記）</strong>は<strong>{med("rare-breed-584")}</strong>です（n={yRb.filtered_n}件）。</li>}
              {y8 && <li><strong>8年</strong>は{y8.all_n}件中{y8.low_n}件が{yenFmt(y8.low_min)}〜{yenFmt(y8.low_max)}、{y8.high_n}件が{yenFmt(y8.high_min)}以上でした。価格帯が2つに分かれるため中央値は出していません。</li>}
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
            ヤフオクの落札済みオークションをボトルごとに検索し、出品タイトルを1件ずつ確認して、対象ボトルの1本出品だけを残しました。
            レアブリードは公式表記と同じ58.4%（58%）と書かれた出品に限り、13年は「フリーダム（7〜13年）」を除いています。
            セット・ミニボトル・ジャンク品を除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
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
            ※取得日 {fetchedAt}。13年・レアブリードは約5〜6か月分の落札です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="eight">2. 8年の落札額は2つの価格帯に分かれます</h2>
          {y8 && (
            <p>
              「ワイルドターキー 8年」（700ml・50.5%）の1本出品を{fmtDate(y8.end_date_from)}〜{fmtDate(y8.end_date_to)}の範囲で確認したところ、{y8.all_n}件のうち{y8.low_n}件が{yenFmt(y8.low_min)}〜{yenFmt(y8.low_max)}、{y8.high_n}件が{yenFmt(y8.high_min)}〜{yenFmt(y8.high_max)}でした。
              同じ年数・容量・度数の表記でも落札額に3倍以上の開きがあり、出品タイトルからはボトルの違いを判別できません。
              このため当サイトでは中央値を掲載していません。参考として、公式サイトに記載された現行品の希望小売価格は700mlで4,378円（税込）です。
              ラベルや瓶の形が現行品と異なる場合は、個別に査定を依頼してください。
            </p>
          )}

          <h2 id="about">3. 主なボトルと公式の説明</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>公式サイトの説明（要約）</th><th>希望小売価格（税込）</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>スタンダード</strong></td><td>6年・7年・8年熟成の原酒をブレンド。アルコール分40.5%（裏ラベルは40%）。</td><td>700ml 2,926円</td></tr>
                <tr><td><strong>8年</strong></td><td>ブランドのフラッグシップ。101プルーフ（50.5%）で8年熟成。内側を強く焦がした「アリゲーターチャー」の樽を使用。</td><td>700ml 4,378円／1000ml 5,258円</td></tr>
                <tr><td><strong>レアブリード</strong></td><td>6年・8年・12年熟成の原酒をブレンドし、加水せずに瓶詰めする樽出し原酒。アルコール分58.4%（裏ラベルは58%）。</td><td>700ml 6,798円（2022年10月3日以降）</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>蒸溜所</strong>: ケンタッキー州ローレンスバーグにあります。公式サイトは、リッピー兄弟が家族経営の蒸溜所を開いたことを起源とし、蒸溜所のオーナーが七面鳥狩りで友人に振る舞ったバーボンが名前の由来と説明しています。</li>
            <li><strong>マスターディスティラー</strong>: ジミー・ラッセル氏が3代目のマスターディスティラーを務め、息子のエディー・ラッセル氏が2015年にマスターディスティラーになったと記載されています。</li>
          </ul>
          <p className="text-xs text-warm-gray">※ワイルドターキー日本公式サイトの各ページより（{off.checked_at}確認）。13年 ディスティラーズリザーブは日本公式サイトの製品一覧に掲載がないため、ヤフオクの出品表記（700ml・45.5%）で記載しています。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>年数と度数を確認する</strong>: 8年・13年・レアブリードで落札額が大きく異なります。レアブリードは度数の表記でロットが分かれます。</li>
            <li><strong>旧ボトル・限定品は別に査定する</strong>: 12年や古いラベルの8年は、現行品と価格帯が異なります。ラベルの写真を添えて複数の業者に問い合わせてください。</li>
            <li><strong>スタンダード・8年はまとめて出す</strong>: 現行品は1本あたり数千円の水準のため、ほかのお酒と一緒に査定に出すと手間が減ります。</li>
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
            <li>ワイルドターキー日本公式「<a href={off.y8} className={linkCls} rel="noopener" target="_blank">ワイルドターキー 8年</a>」「<a href={off.rare_breed} className={linkCls} rel="noopener" target="_blank">レアブリード</a>」「<a href={off.standard} className={linkCls} rel="noopener" target="_blank">スタンダード</a>」「<a href={off.heritage} className={linkCls} rel="noopener" target="_blank">ヘリテージ</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y13?.query}」「{yRb?.query}」「{y8?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/bookers-kaitori/" className={linkCls}>ブッカーズの買取相場</Link></li>
              <li><Link href="/articles/blantons-kaitori/" className={linkCls}>ブラントンの買取相場</Link></li>
              <li><Link href="/articles/four-roses-kaitori/" className={linkCls}>フォアローゼスの買取相場</Link></li>
              <li><Link href="/articles/jack-daniels-kaitori/" className={linkCls}>ジャックダニエルの買取相場</Link></li>
              <li><Link href="/articles/makers-mark-kaitori/" className={linkCls}>メーカーズマークの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
