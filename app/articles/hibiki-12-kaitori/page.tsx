import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-28 新規「響 12年 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・IQR・n>=20 の規則（スクリプト本体は未変更）。
//    区分は出品タイトルの表記（トラベル エクスクルーシブ／免税店／意匠ボトル／花鳥風月 の有無・容量）で分けた。
//    17年・21年・30年・JAPANESE HARMONY・山崎・白州との混在、2本以上のセット、ミニ、記念ラベル、意匠カートン、
//    ラベル・箱の傷み等の表記がある出品は除外。
// 製品の情報は House of Suntory（Suntory Global Spirits）の製品ページと年表のみ。suntory.co.jp は 403 のため使っていない。
// 国内でかつて販売された響12年の発売・終売時期、日本の希望小売価格は公式で確認できないため書かない。

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
const range = (a: { min: number | null; max: number | null } | undefined) =>
  a && a.min && a.max ? (a.min === a.max ? yenFmt(a.min) : `${yenFmt(a.min)}〜${yenFmt(a.max)}`) : "—";
const yTe = Y["te-700"];
const yOld = Y["old-700"];
const y500 = Y["old-500"];
const fetchedAt = yTe?.fetched_at ?? "2026-11-28";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `響12年の買取相場【2026年11月】700ml ${med("old-700") ?? "集計中"}・免税店版 ${med("te-700") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `響12年の買取相場を、ヤフオクの落札データで掲載しています。700mlの落札中央値は${med("old-700") ?? "集計中"}（n=${yOld?.filtered_n ?? 0}件）、免税店向けの「TRAVEL EXCLUSIVE」は${med("te-700") ?? "集計中"}（n=${yTe?.filtered_n ?? 0}件）。500mlの落札額と公式情報もまとめています。`,
  alternates: { canonical: "/articles/hibiki-12-kaitori/" },
};

const faqs = [
  {
    q: "響12年の買取相場はいくらですか？",
    a: ok(yOld)
      ? `当サイトの集計では、出品タイトルに「700ml」とあり「トラベル エクスクルーシブ」等の表記がない響12年のヤフオク落札中央値は${med("old-700")}です（n=${yOld.filtered_n}件・中央の半数は${yenFmt(yOld.q1 as number)}〜${yenFmt(yOld.q3 as number)}・取得日 ${fetchedAt}）。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "免税店で買った響12年（TRAVEL EXCLUSIVE）も売れますか？",
    a: ok(yTe)
      ? `出品タイトルに「TRAVEL EXCLUSIVE」「免税店」「意匠ボトル」「花鳥風月」のいずれかがある700mlの出品は${yTe.filtered_n}件で、落札中央値は${med("te-700")}でした（中央の半数は${yenFmt(yTe.q1 as number)}〜${yenFmt(yTe.q3 as number)}）。表記のない700mlとの差は数百円で、今回の集計では大きな価格差はありませんでした。`
      : `該当する出品は${Y["te-700"]?.filtered_n ?? 0}件で、20件に満たないため中央値は出していません。`,
  },
  {
    q: "500mlの響12年はいくらですか？",
    a: `500mlの出品は${y500?.filtered_n ?? 0}件で、落札額は${range(y500)}でした。件数が20件に満たないため、中央値は出していません。`,
  },
  {
    q: "響12年は終売していますか？",
    a: "House of Suntory の製品ページでは、響12年は免税店（トラベルリテール）限定の商品と案内されています。国内でかつて一般に販売されていた響12年の発売・終売の時期は、当サイトでは公式の資料で確認できていないため掲載していません。",
  },
  {
    q: "響12年の定価はいくらですか？",
    a: "当サイトでは、日本国内の希望小売価格と免税店での販売価格を公式の情報で確認できていないため、掲載していません。購入時の価格は販売店のレシートや記録でご確認ください。",
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
  { id: "te", label: "2. 免税店版（TRAVEL EXCLUSIVE）と表記のない出品の比較" },
  { id: "about", label: "3. 響12年とは（公式情報）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "old-700", name: "響12年（免税店版の表記なし）", spec: "700ml" },
  { key: "te-700", name: "響12年「TRAVEL EXCLUSIVE」「免税店」「意匠ボトル」等の表記", spec: "700ml" },
  { key: "old-500", name: "響12年", spec: "500ml" },
];

export default function Hibiki12KaitoriPage() {
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
            <li><Link href="/articles/hibiki-kaitori/" className="hover:text-amber-dark transition-colors">響</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">響12年 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">響12年の買取相場｜ヤフオク落札中央値と免税店版（TRAVEL EXCLUSIVE）・500mlの価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(yOld) && <li><strong>響12年（700ml）</strong>のヤフオク落札中央値は<strong>{med("old-700")}</strong>です（n={yOld.filtered_n}件・中央の半数は{yenFmt(yOld.q1 as number)}〜{yenFmt(yOld.q3 as number)}）。</li>}
              {ok(yTe) && <li>免税店向けの<strong>「TRAVEL EXCLUSIVE」</strong>と書かれた700mlは中央値<strong>{med("te-700")}</strong>（n={yTe.filtered_n}件）で、表記のない700mlとほぼ同じ水準でした。</li>}
              <li><strong>500ml</strong>は{y500?.filtered_n ?? 0}件が{range(y500)}で落札されています（20件未満のため中央値なし）。</li>
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
            ヤフオクの落札済みオークションを4つの検索語（「響 12年」「響12年」「HIBIKI 12」「響 12年 700ml」）で検索し、重複を除いた{yOld?.raw_n}件の出品タイトルを1件ずつ確認しました。
            容量（700ml・500ml）と、タイトルに免税店向けの商品であることを示す表記があるかどうかで区分を分けています。
            17年・21年・JAPANESE HARMONY・山崎・白州などのほかのボトルが含まれる出品、2本以上のセット、ミニボトル、記念ラベルや意匠カートン入りの出品、「難あり」やラベル・箱の傷みの記載がある出品は除きました。
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

          <h2 id="te">2. 免税店版（TRAVEL EXCLUSIVE）と表記のない出品の比較</h2>
          <p>
            集計期間（2026年9月〜11月）の落札には、タイトルに「TRAVEL EXCLUSIVE」「トラベルエクスクルーシブ」「海外免税店限定」「意匠ボトル」「花鳥風月」などと書かれた700mlの出品が多く含まれていました。
            House of Suntory の製品ページでも、響12年は免税店限定の商品として案内されています（次の節）。
          </p>
          <ul>
            <li>
              <strong>免税店版の表記あり（700ml）</strong>: {yTe?.title_filtered_n ?? 0}件のうち外れ値を除いた{yTe?.filtered_n ?? 0}件が{range(yTe)}で、中央値は{med("te-700") ?? "20件未満"}でした。
            </li>
            <li>
              <strong>表記なし（700ml）</strong>: {yOld?.title_filtered_n ?? 0}件のうち外れ値を除いた{yOld?.filtered_n ?? 0}件が{range(yOld)}で、中央値は{med("old-700") ?? "20件未満"}でした。
              「終売品」「旧ラベル」「古酒」「クリアキャップ」と書かれた出品も含まれます。
            </li>
          </ul>
          <p>
            今回の集計では、両者の中央値の差は1,000円未満でした。
            ただし、表記のない出品の中にも免税店版が含まれている可能性があり、出品タイトルだけでは区別しきれません。
            お持ちのボトルがどちらに当たるかは、ボトルのデザイン（桜と水の流れを描いたものかどうか）と化粧箱の表記で確認し、写真を添えて査定を依頼してください。
          </p>

          <h2 id="about">3. 響12年とは（公式情報）</h2>
          <ul>
            <li><strong>販売の形態</strong>: House of Suntory の製品ページでは、「Hibiki 12 Years Old」は免税店でのみ購入できるトラベルリテール限定の商品と案内されています。</li>
            <li><strong>原酒の構成</strong>: 山崎のモルト原酒を中心に、アメリカンオーク樽の原酒がボディと温かみを、スパニッシュオーク樽の原酒が複雑さを、ミズナラ樽の原酒が長い余韻を与えると説明されています。</li>
            <li><strong>ボトルのデザイン</strong>: 「花鳥風月」と水をテーマに、桜と水の流れを描いたデザインと紹介されています。</li>
            <li><strong>テイスティングノート</strong>: 色はゴールデンアンバー。香りは柿・ジャスミン・カルダモン・オレンジ・白檀、味わいはスパイスを効かせたオレンジピール・シナモン・バタースコッチと記載されています。</li>
            <li><strong>受賞</strong>: International Spirits Challenge 2026 で金賞を受賞したと記載されています。</li>
            <li><strong>表示基準</strong>: 日本洋酒酒造組合のジャパニーズウイスキーの表示基準を満たす商品と記載されています。</li>
            <li><strong>ブランド</strong>: House of Suntory の年表では、響は1989年に発売されたと記載されています。</li>
          </ul>
          <p className="text-xs text-warm-gray">
            ※House of Suntory（英語）の製品ページ「Hibiki 12 Years Old」と年表のページより（{off.checked_at}確認）。
            アルコール度数・容量・販売価格、国内で以前販売されていた響12年の発売・終売時期は、公式の情報で確認できなかったため掲載していません。
            出品タイトルでは700ml・43%と書かれたものが大半でした。
          </p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>容量とボトルを確認する</strong>: 700ml・500ml・ミニボトルで区分が分かれます。免税店版かどうかは、ボトルのデザインと化粧箱で確認してください。</li>
            <li><strong>付属品をそろえる</strong>: 化粧箱・冊子の有無を伝えてください。箱がない場合の扱いは<Link href="/articles/hibiki-nv-hako-nashi/" className={linkCls}>響の箱なし買取</Link>の例をご覧ください。</li>
            <li><strong>状態を伝える</strong>: 今回の集計では、ラベル・箱の傷みや液面低下の記載がある出品を除いています。該当する場合は、掲載額より低くなる可能性があります。</li>
            <li><strong>真贋の確認</strong>: 響の偽物の見分け方は<Link href="/articles/hibiki-nisemono-mikata/" className={linkCls}>響の偽物・贋作の見分け方</Link>にまとめています。</li>
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
            <li>House of Suntory「<a href={off.house_of_suntory} className={linkCls} rel="noopener" target="_blank">Hibiki 12 Years Old</a>」（{off.checked_at}確認・英語）</li>
            <li>House of Suntory「<a href={off.heritage} className={linkCls} rel="noopener" target="_blank">Our History</a>」（{off.checked_at}確認・英語）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yOld?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/hibiki-kaitori/" className={linkCls}>響の買取相場（NV・17年・21年・30年）</Link></li>
              <li><Link href="/articles/hibiki-nv-kaitori/" className={linkCls}>響 JAPANESE HARMONY の買取相場</Link></li>
              <li><Link href="/articles/hibiki-17-kaitori/" className={linkCls}>響17年の買取相場</Link></li>
              <li><Link href="/articles/hibiki-21-kaitori/" className={linkCls}>響21年の買取相場</Link></li>
              <li><Link href="/articles/hibiki-blossom-harmony-kaitori/" className={linkCls}>響 ブロッサムハーモニーの買取相場</Link></li>
              <li><Link href="/articles/yoichi-12-kaitori/" className={linkCls}>余市12年の買取相場</Link></li>
              <li><Link href="/articles/japanese-whisky-kaitori/" className={linkCls}>ジャパニーズウイスキーの買取相場</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
