import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-14 新規「シーバスリーガル 18年 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    18年（700ml）は 40% の出品のみ（43%・プレミアム／インペリアル表記は別区分）。ミズナラ カスク フィニッシュは 700ml と 1000ml を分けた。
//    12年・25年・アルティス・ブルーシグネチャー・ロイヤルサルート等の別銘柄、複数本セット、ミニ、難あり等は除外。
// 製品情報は発表元（ペルノ・リカール・ジャパン）の PR TIMES リリースと Pernod Ricard 公式のブランドページのみ（chivas.com は 403）。

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
type Breakdown = Record<string, { n: number; min: number; max: number; median: number | null }>;
type WithBd = Agg & { label_breakdown?: Breakdown };

const Y = data.yahoo as unknown as Record<string, WithBd>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => (ok(Y[k]) ? yenFmt(Y[k].median as number) : null);
const range = (a: { min: number | null; max: number | null } | undefined) =>
  a && a.min && a.max ? (a.min === a.max ? yenFmt(a.min) : `${yenFmt(a.min)}〜${yenFmt(a.max)}`) : "—";
const y18 = Y["18"];
const yMz = Y["18-mizunara"];
const yMz1000 = Y["18-mizunara-1000"];
const y750 = Y["18-750"];
const y43 = Y["18-43"];
const bd = y18?.label_breakdown;
const fetchedAt = y18?.fetched_at ?? "2026-11-14";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `シーバスリーガル18年の買取相場【2026年11月】${med("18") ?? "集計中"}・ミズナラ ${med("18-mizunara") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `シーバスリーガル18年の買取相場を、ヤフオクの落札データで掲載しています。18年（700ml）の落札中央値は${med("18") ?? "集計中"}（n=${y18?.filtered_n ?? 0}件）、18年 ミズナラ カスク フィニッシュは${med("18-mizunara") ?? "集計中"}。2024年のパッケージ刷新と参考小売価格もまとめています。`,
  alternates: { canonical: "/articles/chivas-regal-18-kaitori/" },
};

const faqs = [
  {
    q: "シーバスリーガル18年の買取相場はいくらですか？",
    a: ok(y18)
      ? `当サイトの集計では、シーバスリーガル18年（700ml・40%）のヤフオク落札価格の中央値は${med("18")}です（n=${y18.filtered_n}件・中央の半数は${yenFmt(y18.q1 as number)}〜${yenFmt(y18.q3 as number)}・取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "18年 ミズナラ カスク フィニッシュはいくらですか？",
    a: ok(yMz)
      ? `18年 ミズナラ カスク フィニッシュ（700ml）の落札中央値は${med("18-mizunara")}でした（n=${yMz.filtered_n}件・中央の半数は${yenFmt(yMz.q1 as number)}〜${yenFmt(yMz.q3 as number)}）。通常の18年より高い価格帯です。1000mlの出品は${yMz1000?.filtered_n ?? 0}件で${range(yMz1000)}でした。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "旧パッケージと新パッケージで買取価格は変わりますか？",
    a: "2024年10月から出荷されている新パッケージは、背が高くスリムなボトルです（ペルノ・リカール・ジャパンの発表）。今回のヤフオクの集計期間には、出品タイトルで新パッケージと明記した1本出品が見当たらなかったため、新旧の価格差は算出していません。出品の大半はタイトルに「ゴールドシグネチャー」と書かれたボトルでした。",
  },
  {
    q: "750mlのシーバスリーガル18年も売れますか？",
    a: ok(y750)
      ? `750mlの18年は${y750.filtered_n}件で、落札中央値は${med("18-750")}でした（中央の半数は${yenFmt(y750.q1 as number)}〜${yenFmt(y750.q3 as number)}）。700mlとほぼ同じ価格帯です。`
      : `750mlの18年は${Y["18-750"]?.filtered_n ?? 0}件・${range(Y["18-750"])}でした。件数が20件に満たないため、中央値は出していません。`,
  },
  {
    q: "シーバスリーガル18年の定価はいくらですか？",
    a: "ペルノ・リカール・ジャパンの2024年11月28日の発表では、新パッケージの「シーバスリーガル 18年」はオープン価格で、参考小売価格は11,314円（税込・700ml・40度）です。「シーバスリーガル18年 ミズナラ カスク フィニッシュ」の参考小売価格は12,463円（税込・700ml・43度）です。",
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
  { id: "label", label: "2. 出品タイトルの表記別の落札額" },
  { id: "package", label: "3. 2024年のパッケージ刷新（公式発表）" },
  { id: "about", label: "4. シーバスリーガルとは（公式情報）" },
  { id: "uru-mae", label: "5. 売る前の確認事項" },
  { id: "faq", label: "6. よくある質問" },
  { id: "sources", label: "7. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "18", name: "18年", spec: "700ml・40%" },
  { key: "18-750", name: "18年", spec: "750ml" },
  { key: "18-43", name: "18年 プレミアム／インペリアル表記", spec: "700ml・43%" },
  { key: "18-mizunara", name: "18年 ミズナラ カスク フィニッシュ", spec: "700ml" },
  { key: "18-mizunara-1000", name: "18年 ミズナラ", spec: "1000ml・48%表記" },
];

const bdLabel: Record<string, string> = {
  gs: "「ゴールドシグネチャー」表記",
  rare: "「レアオールド」表記",
  plain: "どちらの表記もない出品",
};

export default function ChivasRegal18KaitoriPage() {
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
            <li><span className="text-foreground">シーバスリーガル18年 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">シーバスリーガル18年の買取相場｜ヤフオク落札中央値とミズナラ カスク フィニッシュの価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y18) && <li><strong>18年（700ml・40%）</strong>のヤフオク落札中央値は<strong>{med("18")}</strong>です（n={y18.filtered_n}件・中央の半数は{yenFmt(y18.q1 as number)}〜{yenFmt(y18.q3 as number)}）。</li>}
              {ok(yMz) && <li><strong>18年 ミズナラ カスク フィニッシュ（700ml）</strong>は中央値<strong>{med("18-mizunara")}</strong>（n={yMz.filtered_n}件）でした。</li>}
              <li>2024年11月の発表では、新パッケージの18年の<strong>参考小売価格は11,314円（税込）</strong>、ミズナラ カスク フィニッシュは<strong>12,463円（税込）</strong>です（いずれもオープン価格）。</li>
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
            ヤフオクの落札済みオークションを「{y18?.query}」で検索し、重複を除いた{y18?.raw_n}件の出品タイトルを1件ずつ確認しました。
            通常の18年とミズナラ カスク フィニッシュ、容量（700ml・750ml・1000ml）、度数43%の表記がある出品を分けて集計しています。
            12年・25年・アルティスなどの他のボトルが含まれる出品、2本以上のセット、ミニボトル、「難あり」「目減り」などの表記がある出品は除きました。
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、出品の多い18年（700ml）は約1か月分、ミズナラ カスク フィニッシュは約5か月分の落札です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          <p>
            今回の集計では、18年（700ml）の落札中央値は参考小売価格（11,314円・税込）の半分以下でした。
            ミズナラ カスク フィニッシュも参考小売価格（12,463円・税込）を下回っています。未開栓・箱付きでも購入時の価格を下回る可能性があるため、複数の業者の査定額を比べてください。
          </p>

          <h2 id="label">2. 出品タイトルの表記別の落札額</h2>
          <p>18年（700ml・40%）の出品は、タイトルの表記で次のように分かれていました。</p>
          {bd && (
            <ul>
              {(["gs", "rare", "plain"] as const).map((g) =>
                bd[g] ? (
                  <li key={g}>
                    <strong>{bdLabel[g]}</strong>: {bd[g].n}件・{range(bd[g])}
                    {bd[g].median ? `（中央値 ${yenFmt(bd[g].median as number)}）` : "（20件未満のため中央値なし）"}
                  </li>
                ) : null
              )}
            </ul>
          )}
          <p>
            表記による大きな価格差は見られませんでした。このほか、度数43%で「プレミアム」「インペリアル」と表記された18年が{y43?.filtered_n ?? 0}件（{range(y43)}）ありました。
            「ゴールドシグネチャー」「レアオールド」「プレミアム」「インペリアル」はいずれも出品タイトルの表記で、2024年の公式発表には記載がありません。
          </p>

          <h2 id="package">3. 2024年のパッケージ刷新（公式発表）</h2>
          <p>ペルノ・リカール・ジャパンは2024年11月28日に、「シーバスリーガル 18年」と「シーバスリーガル18年 ミズナラ カスク フィニッシュ」のパッケージ刷新を発表しました。</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>商品名</th><th>新パッケージへの切り替え</th><th>参考小売価格（税込）</th><th>容量・度数</th></tr>
              </thead>
              <tbody>
                <tr><td>シーバスリーガル 18年</td><td>ボトルのみ 2024年10月21日、個装箱入り 2024年11月1日から出荷</td><td>11,314円（オープン価格）</td><td>700ml・40度</td></tr>
                <tr><td>シーバスリーガル18年 ミズナラ カスク フィニッシュ</td><td>2024年11月下旬から順次移行</td><td>12,463円（オープン価格）</td><td>700ml・43度</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>ボトルの形</strong>: 背が高くスリムな形状に大幅に変更され、肩の丸みが特徴と説明されています。</li>
            <li><strong>細部</strong>: ストッパーに文様が彫り込まれ、ボトルには槍とフラッグのエンボス加工、底部にはロゴ「ラッケンブース」のガラス細工が施されています。</li>
            <li><strong>個装箱（18年）</strong>: 天面がゴールドメタリックで、コバルト／ダークブルーを配したデザインです。マスターブレンダー サンディ・ヒスロップのサインがゴールドで入っています。</li>
            <li><strong>ミズナラ カスク フィニッシュ</strong>: 日本市場限定の商品で、2020年に発売されました。18年以上熟成したモルトとグレーンウイスキーをブレンドし、ミズナラ樽でフィニッシュしています。新パッケージの個装箱には「水楢」の文字がエンボス加工されています。</li>
          </ul>
          <p>ボトルの形と箱のデザインは、査定の際に新旧どちらのパッケージかを伝える手がかりになります。</p>

          <h2 id="about">4. シーバスリーガルとは（公式情報）</h2>
          <ul>
            <li><strong>歴史</strong>: 1801年にアバディーンで開業した高級食料品店の事業をシーバス兄弟が引き継ぎ、1909年の「シーバスリーガル 25年」の発売でブランドが誕生しました。1938年に「シーバスリーガル 12年」として復活しています。</li>
            <li><strong>キーモルト</strong>: 1786年創業、ハイランド地方キースの「ストラスアイラ蒸留所」で造られています。</li>
            <li><strong>日本での展開</strong>: 12年、ミズナラ 12年、18年、18年 ミズナラ カスク フィニッシュ、アルティス 20年、25年、アイコンの7アイテムを主に展開していると記載されています（2024年11月時点）。</li>
            <li><strong>グループ</strong>: Pernod Ricard の公式ページでは、2001年から同グループのブランドと紹介されています。</li>
          </ul>
          <p className="text-xs text-warm-gray">※ペルノ・リカール・ジャパンのリリース（PR TIMES・2024年11月28日）と Pernod Ricard 公式サイトのブランドページより（{off.checked_at}確認）。</p>

          <h2 id="uru-mae">5. 売る前の確認事項</h2>
          <ul>
            <li><strong>通常の18年かミズナラかを確認する</strong>: ミズナラ カスク フィニッシュは通常の18年より高い価格帯で落札されていました。ラベルの「MIZUNARA」表記と箱を確認してください。</li>
            <li><strong>容量を確認する</strong>: 700ml・750ml・1000mlで区分が分かれます。1000mlのミズナラは出品が少なく、個別の査定が必要です。</li>
            <li><strong>個装箱をそろえる</strong>: 2024年の新パッケージは個装箱にもデザインの特徴があります。箱がある場合は一緒に査定に出してください（箱の有無による価格差は集計していません）。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
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
            <li>ペルノ・リカール・ジャパン「<a href={off.prtimes} className={linkCls} rel="noopener" target="_blank">ブレンデッドスコッチウイスキー「シーバスリーガル 18年」と「シーバスリーガル18年 ミズナラ カスク フィニッシュ」がパッケージデザインを一新</a>」（PR TIMES・2024年11月28日・{off.checked_at}確認）</li>
            <li>Pernod Ricard「<a href={off.pernod} className={linkCls} rel="noopener" target="_blank">Chivas Regal</a>」（{off.checked_at}確認・英語）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y18?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/royal-salute-kaitori/" className={linkCls}>ロイヤルサルートの買取相場</Link></li>
              <li><Link href="/articles/white-horse-kaitori/" className={linkCls}>ホワイトホースの買取相場</Link></li>
              <li><Link href="/articles/glenlivet-kaitori/" className={linkCls}>グレンリベットの買取相場</Link></li>
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
