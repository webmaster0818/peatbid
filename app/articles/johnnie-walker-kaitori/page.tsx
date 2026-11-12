import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-12 新規「ジョニーウォーカー 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    ブルーは 750ml のみ（1L・限定デザイン・オールデスト・キングジョージ5世等は除外）。18年はプラチナ/アルティメット/ゴールド18年が混在するため集計しない。
// 製品・歴史の情報はジョニーウォーカー日本公式サイトの記載のみ（2026-11-12 確認）。

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
const yBlue = Y["blue"];
const yBlack = Y["black"];
const yGold = Y["gold-reserve"];
const fetchedAt = yBlue?.fetched_at ?? "2026-11-12";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ジョニーウォーカーの買取相場【2026年11月】ブルーラベル ${med("blue") ?? "集計中"}・ブラックラベル ${med("black") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `ジョニーウォーカーの買取相場を、ヤフオクの落札データで掲載しています。ブルーラベル（750ml）の落札中央値は${med("blue") ?? "集計中"}、ブラックラベル12年は${med("black") ?? "集計中"}、ゴールドラベル リザーブは${med("gold-reserve") ?? "集計中"}。公式サイトの製品情報と売る前の確認事項もまとめています。`,
  alternates: { canonical: "/articles/johnnie-walker-kaitori/" },
};

const faqs = [
  {
    q: "ジョニーウォーカーの買取相場はいくらですか？",
    a: ok(yBlue) && ok(yBlack)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値はブルーラベル（750ml）が${med("blue")}（n=${yBlue.filtered_n}件）、ブラックラベル12年（700ml）が${med("black")}（n=${yBlack.filtered_n}件）です（取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "ブルーラベルが高いのはなぜですか？",
    a: "日本公式サイトは、ブルーラベルについて「1万樽のうちわずか1樽を厳選」し、長く閉鎖された蒸溜所の原酒も含むと説明しています。ラベルの色ごとに価格帯は大きく異なり、当サイトの集計でもブルーラベルの中央値はブラックラベル12年の約10倍でした。",
  },
  {
    q: "限定デザインのブルーラベルや1Lボトルはいくらですか？",
    a: "干支デザイン・キングジョージ5世・1Lボトルなどは、通常の750mlと価格帯が異なるため今回の集計から除いています。件数が少なく中央値は出していません。複数の業者に個別の査定を依頼してください。",
  },
  {
    q: "ジョニーウォーカー18年はいくらですか？",
    a: "ヤフオクの「18年」は、プラチナラベル・アルティメット・ゴールドラベル18年など名称の異なるボトルが混在しています。1つの中央値にまとめると誤解を招くため、当サイトでは集計していません。",
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
  { id: "current-price", label: "1. ラベル別の落札価格" },
  { id: "about", label: "2. ジョニーウォーカーとは（公式情報）" },
  { id: "uru-mae", label: "3. 売る前の確認事項" },
  { id: "faq", label: "4. よくある質問" },
  { id: "sources", label: "5. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "blue", name: "ブルーラベル", spec: "750ml" },
  { key: "gold-reserve", name: "ゴールドラベル リザーブ", spec: "700ml・40%" },
  { key: "black", name: "ブラックラベル 12年", spec: "700ml・40%" },
];

export default function JohnnieWalkerKaitoriPage() {
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
            <li><span className="text-foreground">ジョニーウォーカー 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ジョニーウォーカーの買取相場｜ブルー・ゴールド・ブラックラベルのヤフオク落札中央値</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(yBlue) && <li><strong>ブルーラベル（750ml）</strong>のヤフオク落札中央値は<strong>{med("blue")}</strong>です（n={yBlue.filtered_n}件・中央の半数は{yenFmt(yBlue.q1 as number)}〜{yenFmt(yBlue.q3 as number)}）。</li>}
              {ok(yGold) && <li><strong>ゴールドラベル リザーブ</strong>は<strong>{med("gold-reserve")}</strong>です（n={yGold.filtered_n}件）。</li>}
              {ok(yBlack) && <li><strong>ブラックラベル12年</strong>は<strong>{med("black")}</strong>です（n={yBlack.filtered_n}件）。</li>}
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

          <h2 id="current-price">1. ラベル別の落札価格</h2>
          <p>
            ラベルごとにヤフオクの落札済みオークションを検索し、出品タイトルを1件ずつ確認しました。
            ブルーラベルは750mlの通常品だけを残し、1Lボトル、干支などの限定デザイン、オールデスト、キングジョージ5世、カスクエディションは除いています。
            ブラックラベルはダブルブラック・シェリーエディション・地域限定品（スペイサイド オリジン等）と旧ボトルを除きました。
            いずれもセット・ミニボトルを除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、出品の多いブルーラベルは直近約1か月、ブラックラベルは約2週間、ゴールドラベル リザーブは約2か月分の落札です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="about">2. ジョニーウォーカーとは（公式情報）</h2>
          <ul>
            <li><strong>はじまり</strong>: 日本公式サイトによると、1820年にジョン・ウォーカーがスコットランドのキルマーノックで食料品店を開き、シングルモルトをブレンドして品質の安定したウイスキーを売り出したのが始まりです。1857年に亡くなった後、事業は息子のアレクサンダーが継ぎました。</li>
            <li><strong>ブラックラベル 12年</strong>: スコットランド各地の、樽で12年以上熟成させたシングルモルトとグレーンウイスキーのみを使うと説明されています。日本公式サイトの表記は700ml・40%です。</li>
            <li><strong>ブルーラベル</strong>: 長く閉鎖された蒸溜所の原酒を含め、1万樽のうちわずか1樽を厳選すると説明されています。表記は750ml・40%です。</li>
          </ul>
          <p className="text-xs text-warm-gray">※ジョニーウォーカー日本公式サイトの各ページより（{off.checked_at}確認）。ゴールドラベル リザーブは日本公式サイトの定番品一覧に掲載がないため、ヤフオクの出品表記（700ml・40%）で記載しています。</p>

          <h2 id="uru-mae">3. 売る前の確認事項</h2>
          <ul>
            <li><strong>ラベルの色と容量を確認する</strong>: ブルーラベルは750mlと1Lで価格帯が異なります。限定デザインは通常品と別に査定されます。</li>
            <li><strong>ブルーラベルは付属品をそろえる</strong>: ヤフオクでは箱付きの出品が多くありました（付属品の有無による価格差は集計していません）。</li>
            <li><strong>ブラックラベルはまとめて出す</strong>: 1本あたり1,000〜2,000円台の水準のため、ほかのお酒と一緒に査定に出すと手間が減ります。</li>
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
            <li>ジョニーウォーカー日本公式「<a href={off.story} className={linkCls} rel="noopener" target="_blank">ジョニーウォーカーの物語</a>」「<a href={off.black} className={linkCls} rel="noopener" target="_blank">ブラックラベル</a>」「<a href={off.blue} className={linkCls} rel="noopener" target="_blank">ブルーラベル</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yBlue?.query}」「{yBlack?.query}」「{yGold?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/dewars-kaitori/" className={linkCls}>デュワーズの買取相場</Link></li>
              <li><Link href="/articles/100-pipers-kaitori/" className={linkCls}>100パイパーズの買取相場</Link></li>
              <li><Link href="/articles/jack-daniels-kaitori/" className={linkCls}>ジャックダニエルの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る手順</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
