import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-13 新規「ロイヤル サルート 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    21年（700ml）は陶器ボトルの色（青・赤・緑・茶）を区別せず1区分。1000ml・38年 ストーン・オブ・デスティニー・ポロエディションは n<20 で中央値なし。
//    空き瓶・ハーフ/500ml/750ml・複数本セット・難あり/目減り/コルク破損・ザ モルト ブレンド・ハリスリード・フラゴン表記・黒陶器は除外。
// 製品・ブランドの情報は Pernod Ricard 公式のブランドページのみ（royalsalute.com・chivas.com は 11/13 時点で 403）。

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
type WithSig = Agg & { signature_titled?: { n: number; min: number; max: number } };

const Y = data.yahoo as unknown as Record<string, Agg>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => (ok(Y[k]) ? yenFmt(Y[k].median as number) : null);
const range = (a: Agg | undefined) => (a && a.min && a.max ? `${yenFmt(a.min)}〜${yenFmt(a.max)}` : "—");
const y21 = Y["21"] as WithSig;
const y1000 = Y["21-1000"];
const y38 = Y["38-stone"];
const yPolo = Y["21-polo"];
const sig = y21?.signature_titled;
const fetchedAt = y21?.fetched_at ?? "2026-11-13";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ロイヤルサルートの買取相場【2026年11月】21年 ${med("21") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `ロイヤルサルートの買取相場を、ヤフオクの落札データで掲載しています。21年（陶器ボトル・700ml）の落札中央値は${med("21") ?? "集計中"}（n=${y21?.filtered_n ?? 0}件）。1000ml・38年 ストーン・オブ・デスティニー・ポロエディションの落札額の範囲と、Pernod Ricard の公式情報もまとめています。`,
  alternates: { canonical: "/articles/royal-salute-kaitori/" },
};

const faqs = [
  {
    q: "ロイヤルサルートの買取相場はいくらですか？",
    a: ok(y21)
      ? `当サイトの集計では、ロイヤルサルート21年（陶器ボトル・700ml）のヤフオク落札価格の中央値は${med("21")}です（n=${y21.filtered_n}件・中央の半数は${yenFmt(y21.q1 as number)}〜${yenFmt(y21.q3 as number)}・取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "ボトルの色（青・赤・緑・茶）で価格は変わりますか？",
    a: "ヤフオクの21年の出品には、青・赤・緑・茶の陶器ボトルが混在していました。色ごとの件数が少ないため、当サイトでは色を区別せずに集計しています。色による価格差は確認していません。",
  },
  {
    q: "1000ml（1L）のロイヤルサルート21年はいくらですか？",
    a: `1000mlの21年は${y1000?.filtered_n ?? 0}件で、落札額は${range(y1000)}でした（${fmtDate(y1000?.end_date_from ?? null)}〜${fmtDate(y1000?.end_date_to ?? null)}）。20件に満たないため、中央値は出していません。`,
  },
  {
    q: "38年 ストーン・オブ・デスティニーは高く売れますか？",
    a: `約5か月分の落札のうち、空き瓶・訳あり品・ラベル不良品を除いた${y38?.filtered_n ?? 0}件は${range(y38)}でした（500mlと700mlを含みます）。件数が20件に満たないため、中央値は出していません。21年とは価格帯が大きく異なるため、個別に査定を依頼してください。`,
  },
  {
    q: "空き瓶でも売れますか？",
    a: "ヤフオクでは21年や38年の空き瓶も出品・落札されていましたが、中身の入ったボトルとは別の商品のため、当サイトの集計からは除いています。",
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
  { id: "other", label: "2. 1000ml・38年・ポロエディションの落札額" },
  { id: "about", label: "3. ロイヤルサルートとは（公式情報）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "21", name: "21年", spec: "陶器ボトル・700ml" },
  { key: "21-1000", name: "21年", spec: "陶器ボトル・1000ml" },
  { key: "38-stone", name: "38年 ストーン・オブ・デスティニー", spec: "500ml・700ml" },
  { key: "21-polo", name: "21年 ポロエディション各種", spec: "700ml・750ml" },
];

export default function RoyalSaluteKaitoriPage() {
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
            <li><span className="text-foreground">ロイヤルサルート 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ロイヤルサルートの買取相場｜21年のヤフオク落札中央値と38年・ポロエディションの落札額</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(y21) && <li><strong>21年（陶器ボトル・700ml）</strong>のヤフオク落札中央値は<strong>{med("21")}</strong>です（n={y21.filtered_n}件・中央の半数は{yenFmt(y21.q1 as number)}〜{yenFmt(y21.q3 as number)}）。</li>}
              {y38 && <li><strong>38年 ストーン・オブ・デスティニー</strong>は{y38.filtered_n}件が{range(y38)}で落札されていました（件数不足のため中央値なし）。</li>}
              {y1000 && <li><strong>21年 1000ml</strong>は{y1000.filtered_n}件・{range(y1000)}、<strong>ポロエディション</strong>は{yPolo?.filtered_n ?? 0}件・{range(yPolo)}でした（いずれも中央値なし）。</li>}
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
            ヤフオクの落札済みオークションを「{y21?.query}」で検索し、出品タイトルを1件ずつ確認して、21年の1本出品だけを残しました。
            21年は青・赤・緑・茶の陶器ボトルの出品が混在しており、色ごとの件数が少ないため、色を区別せず1つの区分にしています。
            空き瓶、ハーフボトル（375ml）・500ml・750ml、2本以上のセット・ミニボトル、「難あり」「目減り」「コルク破損」の表記がある出品、「ザ モルト ブレンド」「ハリスリード エディション」、フラゴン名の表記がある出品、黒い陶器ボトルは除きました。
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、出品の多い21年は直近約2週間、38年・ポロエディションは約5〜6か月分の落札です。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          {sig && (
            <p>
              21年のうち、出品タイトルに「シグネチャーブレンド」と書かれた出品は{sig.n}件で、落札額は{yenFmt(sig.min)}〜{yenFmt(sig.max)}でした。
              件数が少ないため区分を分けていませんが、21年全体の中央値より高い落札が多く見られました。ボトルや箱の表記は、査定の際に業者へ伝えてください。
            </p>
          )}

          <h2 id="other">2. 1000ml・38年・ポロエディションの落札額</h2>
          <ul>
            {y1000 && <li><strong>21年 1000ml</strong>: {fmtDate(y1000.end_date_from)}〜{fmtDate(y1000.end_date_to)}に{y1000.filtered_n}件、{range(y1000)}。同じ期間の700mlより高い価格帯でした。</li>}
            {y38 && <li><strong>38年 ストーン・オブ・デスティニー</strong>: 「{y38.query}」で検索した{y38.raw_n}件のうち、空き瓶・訳あり品・ラベル不良品を除いた{y38.filtered_n}件が{range(y38)}（{fmtDate(y38.end_date_from)}〜{fmtDate(y38.end_date_to)}・500mlと700mlを含む）。</li>}
            {yPolo && <li><strong>21年 ポロエディション</strong>: ジョードプル、マイアミ、スノー、ワールド、ビーチなど複数のエディションが出品されていました。キーワードを詰め込んだ出品を除き、IQRで外れ値を除いた{yPolo.filtered_n}件が{range(yPolo)}（{fmtDate(yPolo.end_date_from)}〜{fmtDate(yPolo.end_date_to)}）。エディションごとに度数（40%・43%・46.5%の表記）や容量が異なります。</li>}
          </ul>
          <p>いずれも20件に満たないため、中央値は掲載していません。限定品は1本ごとに状態や付属品の差が大きいため、複数の業者に個別の査定を依頼してください。</p>

          <h2 id="about">3. ロイヤルサルートとは（公式情報）</h2>
          <ul>
            <li><strong>歴史</strong>: Pernod Ricard の公式ページは、ロイヤルサルートを1953年に若きエリザベス王女の戴冠を祝う贈り物として造られたブランドと説明しています。</li>
            <li><strong>原酒</strong>: ブレンドには熟成21年以上のウイスキーだけを使ってきたと記載されています。非公式のモットーとして「We Begin Where Others End」が紹介されています。</li>
            <li><strong>21年 シグネチャーブレンド</strong>: 1953年から変わらないクラシックと紹介されています。栄養成分表示には「Royal Salute 21YO Signature Blend, 40% ABV」とあります。</li>
            <li><strong>ザ・ストーン・オブ・デスティニー</strong>: 伝説の「運命の石（Stone of Destiny）」を称えて造られたブレンドと紹介され、度数は40%と表示されています。</li>
            <li><strong>その他の製品</strong>: 「62 Gun Salute」も紹介されています。</li>
            <li><strong>グループ</strong>: 2001年から Pernod Ricard グループのブランドです。</li>
          </ul>
          <p className="text-xs text-warm-gray">※Pernod Ricard 公式サイトのブランドページより（{off.checked_at}確認・英語）。「38年」「陶器ボトル」「ボトルの色」はヤフオクの出品タイトルの表記で、公式ページには記載がありません。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>年数・容量・エディション名を確認する</strong>: 21年の700ml・1000ml、38年、ポロエディションで落札額が大きく異なります。ラベルと箱の表記を控えてください。</li>
            <li><strong>付属品をそろえる</strong>: ヤフオクでは箱や巾着袋が付いた出品が多くありました（付属品の有無による価格差は集計していません）。</li>
            <li><strong>陶器ボトルは中身の量が外から見えない</strong>: 出品タイトルに重量を書いている出品が多く見られました。未開栓でも、重量を量っておくと業者に状態を伝えやすくなります。</li>
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
            <li>Pernod Ricard「<a href={off.pernod} className={linkCls} rel="noopener" target="_blank">Royal Salute</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{y21?.query}」「{y38?.query}」「{yPolo?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/glenlivet-kaitori/" className={linkCls}>グレンリベットの買取相場</Link></li>
              <li><Link href="/articles/dewars-kaitori/" className={linkCls}>デュワーズの買取相場</Link></li>
              <li><Link href="/articles/100-pipers-kaitori/" className={linkCls}>100パイパーズの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
