import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-11 新規「フォアローゼス 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    検索は「フォアローゼズ」「フォアローゼス」の2表記を合算（同じオークションIDは1件）。シングルバレル・イエロー・リミテッドは n<20 のため中央値を出さない。
// 製品・歴史の情報は Four Roses 公式サイト（英語）の記載のみ（2026-11-11 確認）。

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
const black = Y["black"];
const plat = Y["platinum"];
const sb = Y["single-barrel"];
const yellow = Y["yellow"];
const fetchedAt = black?.fetched_at ?? "2026-11-11";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `フォアローゼス（フォアローゼズ）の買取相場【2026年11月】プラチナ ${med("platinum") ?? "集計中"}・ブラック ${med("black") ?? "集計中"}｜落札中央値`,
  description: `フォアローゼス（フォアローゼズ）の買取相場を、ヤフオクの落札データで掲載しています。プラチナ（750ml）の落札中央値は${med("platinum") ?? "集計中"}、ブラック（700ml）は${med("black") ?? "集計中"}。リミテッドエディション・旧ボトルの落札例と公式の製法情報もまとめています。`,
  alternates: { canonical: "/articles/four-roses-kaitori/" },
};

const faqs = [
  {
    q: "フォアローゼスの買取相場はいくらですか？",
    a: ok(plat) && ok(black)
      ? `当サイトの集計では、ヤフオクの落札価格の中央値はプラチナ（スーパープレミアム・750ml・1本出品）が${med("platinum")}（n=${plat.filtered_n}件）、ブラック（700ml）が${med("black")}（n=${black.filtered_n}件）です（取得日 ${fetchedAt}）。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たない区分があるため、一部の中央値は掲載していません。",
  },
  {
    q: "「フォアローゼス」と「フォアローゼズ」は同じですか？",
    a: "同じブランド（Four Roses）のカタカナ表記の違いです。ヤフオクの出品にも両方の表記があるため、当サイトは両方の検索結果を合算して集計しています。",
  },
  {
    q: "スモールバッチ リミテッドエディションは高く売れますか？",
    a: "当サイトが確認した期間では、2014年版・2016年版・2017年版が4万〜5万円台、2024年版が3万円台で落札されていました（4章）。件数が少ないため中央値は出していません。発売年をラベルで確認して業者に伝えてください。",
  },
  {
    q: "シングルバレルはいくらですか？",
    a: `シングルバレルの1本出品は、当サイトが確認した期間で${sb?.filtered_n ?? 0}件と20件に満たないため中央値は出していません。50%表記の出品は3,000〜5,000円台の落札が中心でした。`,
  },
  {
    q: "古いフォアローゼス（特級・6年・ボトルドインボンド）は売れますか？",
    a: "当サイトが確認した期間では、「特級」「6年」「BOTTLED IN BOND」と書かれた旧ボトルが2万〜5万円台で落札された例がありました（4章）。状態と付属品で価格は大きく変わるため、複数の業者に個別に査定を依頼してください。",
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
  { id: "current-price", label: "1. 落札価格の中央値（ボトル別）" },
  { id: "about", label: "2. フォアローゼスとは（公式情報）" },
  { id: "recipe", label: "3. 10種類のレシピとシングルバレル" },
  { id: "examples", label: "4. リミテッドエディション・旧ボトルの落札例" },
  { id: "uru-mae", label: "5. 売る前の確認事項" },
  { id: "faq", label: "6. よくある質問" },
  { id: "sources", label: "7. 出典・集計方法" },
];

const rows: { key: string; name: string }[] = [
  { key: "platinum", name: "プラチナ（スーパープレミアム）750ml" },
  { key: "black", name: "ブラック（ブラックラベル）700ml" },
  { key: "single-barrel", name: "シングルバレル 700ml／750ml" },
  { key: "yellow", name: "イエローラベル（スタンダード）700ml" },
];

export default function FourRosesKaitoriPage() {
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
            <li><span className="text-foreground">フォアローゼス 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">フォアローゼス（フォアローゼズ）の買取相場｜プラチナ・ブラックの落札中央値とリミテッドエディションの落札例</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(plat) && <li><strong>プラチナ（750ml）</strong>のヤフオク落札中央値は<strong>{med("platinum")}</strong>です（n={plat.filtered_n}件・中央の半数は{yenFmt(plat.q1 as number)}〜{yenFmt(plat.q3 as number)}）。</li>}
              {ok(black) && <li><strong>ブラック（700ml）</strong>は<strong>{med("black")}</strong>です（n={black.filtered_n}件）。</li>}
              <li><strong>スモールバッチ リミテッドエディション</strong>や「特級」表記の旧ボトルは、3万〜5万円台で落札された例がありました（<a href="#examples" className={linkCls}>4章</a>）。</li>
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

          <h2 id="current-price">1. 落札価格の中央値（ボトル別）</h2>
          <p>
            ヤフオクの落札済みオークションを「フォアローゼズ」「フォアローゼス」の2表記で検索し（重複は1件として扱い、合計{black?.raw_n}件）、出品タイトルを1件ずつ確認して対象ボトルの1本出品だけを残しました。
            セット・まとめ出品、ミニボトル、空瓶、グラスやライターなどのノベルティは除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
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
                      <td><strong>{r.name}</strong></td>
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
            ※取得日 {fetchedAt}。イエローラベルの落札額は{yellow?.min ? yenFmt(yellow.min) : "—"}〜{yellow?.max ? yenFmt(yellow.max) : "—"}（n={yellow?.filtered_n ?? 0}件）でした。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="about">2. フォアローゼスとは（公式情報）</h2>
          <ul>
            <li><strong>始まり</strong>: 公式サイトによると、ポール・ジョーンズ・ジュニアが1884年にケンタッキー州ルイビルへ事業を移し、その4年後（1888年）に「Four Roses」の名称を商標登録しました。</li>
            <li><strong>日本との関わり</strong>: シーグラム社の時代に米国内での販売をやめ、ヨーロッパとアジアの市場に移り、ヨーロッパと日本で売れ筋のバーボンになったと記載されています。2002年2月にキリンビールがブランドと製造設備を取得し、その後米国での販売が再開されました。</li>
            <li><strong>水</strong>: ケンタッキー州ローレンスバーグのソルト川の、石灰岩を含む水を使うと説明されています。</li>
          </ul>

          <h2 id="recipe">3. 10種類のレシピとシングルバレル</h2>
          <p>
            公式サイトでは、2種類のマッシュビル（原料配合）と5種類の酵母を組み合わせた10種類のレシピでバーボンを造ると説明されています。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>マッシュビル</th><th>コーン</th><th>ライ麦</th><th>大麦</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>B</strong></td><td>60%</td><td>35%</td><td>5%</td></tr>
                <tr><td><strong>E</strong></td><td>75%</td><td>20%</td><td>5%</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>Four Roses Bourbon</strong>: 10種類すべてのレシピのブレンド。最低5年熟成（米国の商品ページの記載）。</li>
            <li><strong>Small Batch</strong>: 4種類のレシピ・6〜7年熟成・90プルーフ（45%）。</li>
            <li><strong>Small Batch Select</strong>: 6種類のレシピ・6〜7年熟成・104プルーフ（52%）・ノンチルフィルター。</li>
            <li><strong>Single Barrel</strong>: レシピ OBSV（マッシュビルB×酵母V）・7〜9年熟成・100プルーフ（50%）。マスターディスティラーが選んだひと樽から瓶詰め。</li>
          </ul>
          <p className="text-xs text-warm-gray">※公式サイト（米国向け・英語）の記載です（{off.checked_at}確認）。国内で流通するブラック・プラチナ・イエローラベルの仕様は、公式サイトの米国向けページには掲載されていません。</p>

          <h2 id="examples">4. リミテッドエディション・旧ボトルの落札例</h2>
          <p>
            スモールバッチ リミテッドエディションや「特級」「6年」表記の旧ボトルは件数が少なく、ボトルごとの差も大きいため中央値は出していません。以下は実際の落札例です（タイトルは要約）。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>出品タイトル（要約）</th><th>落札額</th><th>終了日</th></tr>
              </thead>
              <tbody>
                {data.limited_examples.map((e) => (
                  <tr key={`${e.title}-${e.end}-${e.price}`}>
                    <td>{e.title}</td>
                    <td>{yenFmt(e.price)}</td>
                    <td>{fmtDate(e.end)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="uru-mae">5. 売る前の確認事項</h2>
          <ul>
            <li><strong>ラベルの色と商品名</strong>: イエロー・ブラック・プラチナ・シングルバレル・スモールバッチで落札価格は大きく異なります。ラベルの商品名・容量・度数を控えてください。</li>
            <li><strong>リミテッドエディションの発売年</strong>: 年ごとに落札価格が違うため、ラベルの年を業者に伝えてください。</li>
            <li><strong>まとめて査定に出す</strong>: イエローラベルやブラックは1本あたりの金額が小さいため、ほかのお酒と一緒に査定に出すと手間が減ります。</li>
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
            <li>Four Roses 公式「<a href={off.heritage} className={linkCls} rel="noopener" target="_blank">Our Story</a>」「<a href={off.process} className={linkCls} rel="noopener" target="_blank">Our Process</a>」（{off.checked_at}確認）</li>
            <li>Four Roses 公式 商品ページ「<a href={off.bourbon} className={linkCls} rel="noopener" target="_blank">Four Roses Bourbon</a>」「<a href={off.small_batch} className={linkCls} rel="noopener" target="_blank">Small Batch</a>」「<a href={off.small_batch_select} className={linkCls} rel="noopener" target="_blank">Small Batch Select</a>」「<a href={off.single_barrel} className={linkCls} rel="noopener" target="_blank">Single Barrel</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索「フォアローゼズ」「フォアローゼス」（取得日 {fetchedAt}）。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/blantons-kaitori/" className={linkCls}>ブラントンの買取相場</Link></li>
              <li><Link href="/articles/bookers-kaitori/" className={linkCls}>ブッカーズの買取相場</Link></li>
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
