import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-17 新規「バランタイン 12年 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    区分は出品タイトルの表記（容量・ゴールドシール・ベリーオールド・赤青の旗／紋章・ロイヤルブルー・ピュアモルト）で分けた。
//    17年・21年・30年・ファイネスト・グレンバーギー等の別ボトル、2本以上のセット、ミニ、ラベル・箱の傷み等の表記がある出品は除外。
// 製品・ブランドの情報は Pernod Ricard 公式のブランドページと、サントリーの PR TIMES リリース（2026/10/6）のみ。
// ballantines.com・suntory.co.jp は 403 のため使っていない。日本の希望小売価格・国内の容量は公式で確認できないため書かない。

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
const y700 = Y["12-700"];
const yGs = Y["12-goldseal-750"];
const yVo = Y["12-veryold-750"];
const yAka = Y["12-akaao"];
const y1000 = Y["12-1000"];
const yRb = Y["royal-blue"];
const yPm = Y["pure-malt"];
const bd700 = y700?.label_breakdown;
const bdRb = yRb?.label_breakdown;
const fetchedAt = y700?.fetched_at ?? "2026-11-17";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `バランタイン12年の買取相場【2026年11月】700ml ${med("12-700") ?? "集計中"}・1000ml ${med("12-1000") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `バランタイン12年の買取相場を、ヤフオクの落札データで掲載しています。700ml・40%の落札中央値は${med("12-700") ?? "集計中"}（n=${y700?.filtered_n ?? 0}件）、1000mlは${med("12-1000") ?? "集計中"}。ゴールドシール・ベリーオールドなど表記別の落札額と公式情報もまとめています。`,
  alternates: { canonical: "/articles/ballantines-12-kaitori/" },
};

const faqs = [
  {
    q: "バランタイン12年の買取相場はいくらですか？",
    a: ok(y700)
      ? `当サイトの集計では、出品タイトルに「700ml」「40%」とあるバランタイン12年のヤフオク落札中央値は${med("12-700")}です（n=${y700.filtered_n}件・中央の半数は${yenFmt(y700.q1 as number)}〜${yenFmt(y700.q3 as number)}・取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "ゴールドシールやベリーオールドは高く売れますか？",
    a: `750ml・43%のゴールドシールは中央値${med("12-goldseal-750") ?? "（20件未満）"}（n=${yGs?.filtered_n ?? 0}件）、ベリーオールド（750ml・760ml）は中央値${med("12-veryold-750") ?? "（20件未満）"}（n=${yVo?.filtered_n ?? 0}件）で、700mlの出品と大きな差はありませんでした。ただし、ベリーオールドのうち出品タイトルに「赤青旗」「赤青紋章」などと書かれた出品は${yAka?.filtered_n ?? 0}件が${range(yAka)}で落札されており、高い価格帯です。`,
  },
  {
    q: "1000mlのバランタイン12年はいくらですか？",
    a: ok(y1000)
      ? `1000mlの出品は${y1000.filtered_n}件で、落札中央値は${med("12-1000")}でした（中央の半数は${yenFmt(y1000.q1 as number)}〜${yenFmt(y1000.q3 as number)}）。大半はタイトルに「ゴールドシール」とある出品です。`
      : `1000mlの出品は${Y["12-1000"]?.filtered_n ?? 0}件・${range(Y["12-1000"])}でした。件数が20件に満たないため、中央値は出していません。`,
  },
  {
    q: "ロイヤルブルーやピュアモルトの12年も売れますか？",
    a: `出品タイトルに「ロイヤルブルー」とある12年は${yRb?.filtered_n ?? 0}件で${range(yRb)}、「ピュアモルト」の12年（700ml）は${yPm?.filtered_n ?? 0}件で${range(yPm)}でした。いずれも20件に満たないため、中央値は出していません。700ml・40%の出品より高い価格で落札された例が多く見られました。`,
  },
  {
    q: "バランタイン12年の定価はいくらですか？",
    a: "当サイトでは、日本国内の希望小売価格を公式の情報で確認できていないため、掲載していません。購入時の価格は販売店のレシートや記録でご確認ください。",
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
  { id: "label", label: "2. ラベル表記別の落札額" },
  { id: "about", label: "3. バランタイン12年とは（公式情報）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "12-700", name: "12年", spec: "700ml・40%" },
  { key: "12-1000", name: "12年", spec: "1000ml" },
  { key: "12-goldseal-750", name: "12年 ゴールドシール", spec: "750ml" },
  { key: "12-veryold-750", name: "12年 ベリーオールド", spec: "750ml・760ml" },
  { key: "12-akaao", name: "12年「赤青旗」「赤青紋章」等の表記", spec: "750ml・760ml" },
  { key: "royal-blue", name: "12年 ロイヤルブルー", spec: "700ml・1000ml" },
  { key: "pure-malt", name: "12年 ピュアモルト", spec: "700ml" },
];

const bdLabel700: Record<string, string> = {
  plain: "「ゴールドシール」「ブルーラベル」のどちらの表記もない出品",
  goldseal: "「ゴールドシール」表記",
  bluelabel: "「ブルーラベル」表記",
};

export default function Ballantines12KaitoriPage() {
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
            <li><span className="text-foreground">バランタイン12年 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">バランタイン12年の買取相場｜ヤフオク落札中央値とゴールドシール・ベリーオールドの価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y700) && <li><strong>12年（700ml・40%）</strong>のヤフオク落札中央値は<strong>{med("12-700")}</strong>です（n={y700.filtered_n}件・中央の半数は{yenFmt(y700.q1 as number)}〜{yenFmt(y700.q3 as number)}）。</li>}
              {ok(y1000) && <li><strong>1000ml</strong>は中央値<strong>{med("12-1000")}</strong>（n={y1000.filtered_n}件）、750ml・43%の<strong>ゴールドシール</strong>は{med("12-goldseal-750") ?? "20件未満"}、<strong>ベリーオールド</strong>は{med("12-veryold-750") ?? "20件未満"}でした。</li>}
              <li>出品タイトルに<strong>「赤青旗」「赤青紋章」</strong>などとあるベリーオールドは{yAka?.filtered_n ?? 0}件が<strong>{range(yAka)}</strong>で落札されており、ほかの12年より高い価格帯です。</li>
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
            ヤフオクの落札済みオークションを7つの検索語（「バランタイン 12年」「バランタイン 12年 ゴールドシール」「バランタイン 12年 ベリーオールド」など）で検索し、重複を除いた{y700?.raw_n}件の出品タイトルを1件ずつ確認しました。
            容量（700ml・750ml／760ml・1000ml）と、タイトルに書かれたラベルの表記で区分を分けています。
            17年・30年・ファイネストなどの他のボトルが含まれる出品、2本以上のセット、ミニボトル、「難あり」やラベル・箱の傷みの記載がある出品は除きました。
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、区分ごとに集計期間が異なります（終了日の範囲を参照）。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          <p>
            700ml・750ml・1000mlの中央値はいずれも2,000円前後で、容量やラベル表記による差は数百円の範囲でした。
            一方で、出品タイトルに「1970年代流通品」「赤青紋章」などと書かれた古いボトルは、別の価格帯で落札されています（次の節）。
          </p>

          <h2 id="label">2. ラベル表記別の落札額</h2>
          <p>12年（700ml・40%）の出品は、タイトルの表記で次のように分かれていました。</p>
          {bd700 && (
            <ul>
              {(["plain", "goldseal", "bluelabel"] as const).map((g) =>
                bd700[g] ? (
                  <li key={g}>
                    <strong>{bdLabel700[g]}</strong>: {bd700[g].n}件・{range(bd700[g])}
                    {bd700[g].median ? `（中央値 ${yenFmt(bd700[g].median as number)}）` : "（20件未満のため中央値なし）"}
                  </li>
                ) : null
              )}
            </ul>
          )}
          <ul>
            <li>
              <strong>ベリーオールド（750ml・760ml）</strong>: 「赤青旗」「赤青紋章」などの表記がない出品は{yVo?.filtered_n ?? 0}件・{range(yVo)}（中央値 {med("12-veryold-750") ?? "20件未満"}）でした。
              外れ値として除いた出品の中には、760mlで4,785円〜8,500円の落札が6件ありました。
            </li>
            <li>
              <strong>「赤青旗」「赤青紋章」「青赤紋章」などの表記</strong>: {yAka?.title_filtered_n ?? 0}件のうち外れ値を除いた{yAka?.filtered_n ?? 0}件が{range(yAka)}でした。
              タイトルに「1970年代流通品」と書かれた出品も含まれます。このほか、13,200円・12,300円の落札が各1件ありました（外れ値として除外）。
            </li>
            <li>
              <strong>ロイヤルブルー</strong>: {bdRb?.["1000ml"] ? `1000mlが${bdRb["1000ml"].n}件・${range(bdRb["1000ml"])}` : ""}
              {bdRb?.["700ml"] ? `、700mlが${bdRb["700ml"].n}件・${range(bdRb["700ml"])}` : ""}でした。
            </li>
            <li>
              <strong>ピュアモルト 12年（700ml）</strong>: {yPm?.filtered_n ?? 0}件・{range(yPm)}でした。ブレンデッドの12年とは別の商品として出品されています。
            </li>
          </ul>
          <p>
            タイトルに「特級」と書かれた出品は10件で、ほとんどがベリーオールドでした。
            「ゴールドシール」「ベリーオールド」「赤青旗」「ロイヤルブルー」「ピュアモルト」はいずれも出品タイトルの表記で、Pernod Ricard の公式ページには記載がありません。
            ボトルの年代は、出品者の記載以外に確認できる情報がないため、当サイトでは判断していません。
          </p>

          <h2 id="about">3. バランタイン12年とは（公式情報）</h2>
          <ul>
            <li><strong>味わい</strong>: Pernod Ricard の公式ページでは、「Ballantine&apos;s 12 Year Old」は蜂蜜のような甘さに、オークとバニラの香りが調和したウイスキーと紹介されています。</li>
            <li><strong>原材料</strong>: スコッチウイスキー（穀物とモルトの蒸留液、水）、着色料としてカラメル（plain caramel）と記載されています。栄養成分は、アルコール度数40%と43%の2通りで掲載されています。</li>
            <li><strong>ブランド</strong>: 欧州で1位のスコッチウイスキーと紹介されています。スペイサイド、ハイランド、アイラ、ローランドのシングルモルトとグレーンウイスキーをブレンドしており、歴史は1827年にさかのぼります。2005年から Pernod Ricard グループのブランドです。</li>
            <li><strong>日本での販売</strong>: サントリーは2026年10月6日に「バランタイン シングルモルト グレンバーギー 16年」「同 21年」を11月4日から全国で数量限定発売すると発表しています。同じリリースでは、バランタインをハイランド、ローランド、スペイサイド、アイラの4つの地方のモルト原酒とグレーン原酒を使用したブレンデッドウイスキーと説明しています。</li>
          </ul>
          <p className="text-xs text-warm-gray">
            ※Pernod Ricard 公式サイトのブランドページ（英語）と、サントリーのリリース（PR TIMES・2026年10月6日）より（{off.checked_at}確認）。
            日本国内の希望小売価格と容量は、公式の情報で確認できなかったため掲載していません。
          </p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>容量と度数を確認する</strong>: 700ml・40%、750ml／760ml・43%、1000mlで区分が分かれます。ラベルの表示をそのまま査定の申込みに書いてください。</li>
            <li><strong>ラベルの表記を確認する</strong>: 「GOLD SEAL」「VERY OLD」「ROYAL BLUE」「PURE MALT」の表記や、首元・ラベルの紋章の色は、落札額が分かれる手がかりになります。写真を添えて査定を依頼してください。</li>
            <li><strong>状態を伝える</strong>: 今回の集計では、ラベル・箱の傷みや液面低下の記載がある出品を除いています。該当する場合は、掲載額より低くなる可能性があります。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>と<Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーの売り方ガイド</Link>にまとめています。</li>
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
            <li>Pernod Ricard「<a href={off.pernod} className={linkCls} rel="noopener" target="_blank">Ballantine&apos;s</a>」（{off.checked_at}確認・英語）</li>
            <li>サントリー「<a href={off.suntory_prtimes} className={linkCls} rel="noopener" target="_blank">「バランタイン シングルモルト」２種 数量限定新発売</a>」（PR TIMES・2026年10月6日・{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y700?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/chivas-regal-18-kaitori/" className={linkCls}>シーバスリーガル18年の買取相場</Link></li>
              <li><Link href="/articles/royal-salute-kaitori/" className={linkCls}>ロイヤルサルートの買取相場</Link></li>
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/white-horse-kaitori/" className={linkCls}>ホワイトホースの買取相場</Link></li>
              <li><Link href="/articles/grants-kaitori/" className={linkCls}>グランツの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
