import type { Metadata } from "next";
import Link from "next/link";
import yahoo from "./data.json";

// 「厚岸 買取」の受け皿（2026-11-07 新設・手書き）。
// 製品情報は厚岸蒸溜所（堅展実業株式会社）公式サイトの記載のみ（2026-11-07 確認）:
//   商品情報 https://akkeshi-distillery.com/brand/products.html（度数・容量・希望小売価格・シリーズ完結の記載）
//   蒸溜所の歩み https://akkeshi-distillery.com/company/history/（発売年月・第◯弾）
//   蒸溜所設備と熟成環境 https://akkeshi-distillery.com/company/overview/（所有者・設立年・設備）
// 落札中央値は ./data.json（ヤフオク過去180日・タイトル目視確認済み）。n<20 は中央値を出さない。

type Bottle = {
  name: string;
  sekki: string;
  median: number | null;
  filtered_n: number;
  insufficient: boolean;
  fetched_at: string;
  query: string;
};
const bottles = (yahoo as unknown as { bottles: Record<string, Bottle> }).bottles;
const b = (slug: string): Bottle | null => bottles[slug] ?? null;
const yen = (v: number): string => `${Math.round(v).toLocaleString("ja-JP")}円`;
const med = (slug: string): string | null => {
  const r = b(slug);
  return r && !r.insufficient && typeof r.median === "number" && r.filtered_n >= 20 ? yen(r.median) : null;
};
const fetchedAt = b("kanro")?.fetched_at ?? "2026-11-07";
const UPDATED = "2026-11-07";

const OFFICIAL_PRODUCTS = "https://akkeshi-distillery.com/brand/products.html";
const OFFICIAL_HISTORY = "https://akkeshi-distillery.com/company/history/";
const OFFICIAL_OVERVIEW = "https://akkeshi-distillery.com/company/overview/";

// 二十四節気シリーズ（発売順）。発売年月・第◯弾＝公式「蒸溜所の歩み」、種別・度数・希望小売価格（税別）＝公式「商品情報」。容量はすべて700ml。
type Release = { no: number; sekki: string; ym: string; type: string; abv: number; price: number; slug?: string };
const releases: Release[] = [
  { no: 1, sekki: "寒露", ym: "2020年10月", type: "シングルモルト", abv: 55, price: 21000, slug: "kanro" },
  { no: 2, sekki: "雨水", ym: "2021年2月", type: "ブレンデッド", abv: 48, price: 15000, slug: "usui" },
  { no: 3, sekki: "芒種", ym: "2021年5月", type: "シングルモルト", abv: 55, price: 21000, slug: "boshu" },
  { no: 4, sekki: "処暑", ym: "2021年8月", type: "ブレンデッド", abv: 48, price: 15000 },
  { no: 5, sekki: "立冬", ym: "2021年11月", type: "シングルモルト", abv: 55, price: 21000, slug: "ritto" },
  { no: 6, sekki: "大寒", ym: "2022年2月", type: "ブレンデッド", abv: 48, price: 15000, slug: "daikan" },
  { no: 7, sekki: "清明", ym: "2022年5月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 8, sekki: "大暑", ym: "2022年8月", type: "ブレンデッド", abv: 48, price: 15000 },
  { no: 9, sekki: "大雪", ym: "2022年12月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 10, sekki: "啓蟄", ym: "2023年2月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 11, sekki: "小満", ym: "2023年5月", type: "ブレンデッド", abv: 48, price: 15000 },
  { no: 12, sekki: "白露", ym: "2023年8月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 13, sekki: "小雪", ym: "2023年11月", type: "ブレンデッド", abv: 48, price: 15000 },
  { no: 14, sekki: "立春", ym: "2024年2月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 15, sekki: "穀雨", ym: "2024年5月", type: "ブレンデッド", abv: 48, price: 15000 },
  { no: 16, sekki: "小暑", ym: "2024年8月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 17, sekki: "霜降", ym: "2024年11月", type: "ブレンデッド", abv: 48, price: 15000 },
  { no: 18, sekki: "冬至", ym: "2025年2月", type: "シングルブレンデッド", abv: 48, price: 27000 },
  { no: 19, sekki: "立夏", ym: "2025年5月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 20, sekki: "立秋", ym: "2025年8月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 21, sekki: "小寒", ym: "2025年11月", type: "シングルモルト", abv: 55, price: 21000 },
  { no: 22, sekki: "春分", ym: "2026年3月", type: "シングルモルト", abv: 55, price: 27000 },
  { no: 23, sekki: "夏至", ym: "2026年5月", type: "シングルブレンデッド", abv: 48, price: 27000 },
  { no: 24, sekki: "秋分", ym: "2026年8月", type: "シングルモルト", abv: 55, price: 27000 },
];
const relOf = (slug: string) => releases.find((r) => r.slug === slug);

// 落札中央値 ÷ 希望小売価格（税込＝税別×1.1）
const ratio = (slug: string): string | null => {
  const r = b(slug);
  const rel = relOf(slug);
  if (!r || !rel || r.insufficient || typeof r.median !== "number" || r.filtered_n < 20) return null;
  return `${(r.median / (rel.price * 1.1)).toFixed(2)}倍`;
};

const priceSlugs = ["kanro", "usui", "daikan", "boshu", "ritto"];

export const metadata: Metadata = {
  title: "厚岸ウイスキーの買取相場【2026年11月】寒露・雨水・大寒の落札中央値と二十四節気シリーズ全24本一覧",
  description: `厚岸蒸溜所のウイスキーの買取相場を、ヤフオク過去180日の落札中央値で掲載しています。寒露${med("kanro") ?? "集計中"}・雨水${med("usui") ?? "集計中"}・大寒${med("daikan") ?? "集計中"}。二十四節気シリーズ全24本の発売年月・度数・希望小売価格を公式情報で一覧にしています。`,
  alternates: { canonical: "/articles/akkeshi-kaitori/" },
};

const faqs = [
  {
    q: "厚岸ウイスキーの買取相場はいくらですか？",
    a: med("kanro")
      ? `銘柄によって異なります。当サイト集計（ヤフオク過去180日の落札価格・IQR外れ値除去後の中央値・取得日 ${fetchedAt}）では、二十四節気シリーズ第一弾の寒露が${med("kanro")}（n=${b("kanro")?.filtered_n}）、第二弾の雨水が${med("usui") ?? "集計中"}、第六弾の大寒が${med("daikan") ?? "集計中"}です。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "実勢データは現在集計中です。",
  },
  {
    q: "二十四節気シリーズは何本ありますか？シリーズは終了したのですか？",
    a: "厚岸蒸溜所の公式サイト「蒸溜所の歩み」には、2020年10月発売の寒露（第一弾）から2026年8月発売の秋分（第二十四弾）まで、24本の発売が記載されています。また、公式の商品情報では秋分の紹介文に「6年に亘った二十四節気シリーズも、大団円のうちに幕を閉じることが出来ます」と記載されています。",
  },
  {
    q: "シリーズの中で高く売れやすいのはどのボトルですか？",
    a: med("kanro")
      ? `当サイトで中央値を算出できた3本の中では、第一弾の寒露が${med("kanro")}と最も高く、希望小売価格（税込23,100円）の${ratio("kanro")}でした。ブレンデッドの雨水・大寒は希望小売価格（税込16,500円）に近い水準です。芒種・立冬は落札件数が20件未満のため中央値を掲載していません。そのほかのボトルは今回集計していません。`
      : "実勢データは現在集計中です。",
  },
  {
    q: "シングルモルトとブレンデッドはラベルのどこで見分けられますか？",
    a: "公式の商品名に「シングルモルト」「ブレンデッド」「シングルブレンデッド」の別が入っています。二十四節気シリーズでは、シングルモルトはアルコール分55%、ブレンデッドとシングルブレンデッドは48%と公式に記載されています（容量はいずれも700ml）。ラベルの商品名と度数を確認したうえで、買取業者に伝えてください。",
  },
  {
    q: "200mlのボトル（NEW BORN・サロルンカムイ）も買い取ってもらえますか？",
    a: "買取の可否は業者ごとに異なるため、各社にお問い合わせください。なお、当サイトの落札中央値は700mlの単品のみを対象としており、200mlのボトルは集計に含めていません。",
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
  { id: "current-price", label: "1. ボトル別の落札中央値（ヤフオク過去180日）" },
  { id: "sekki", label: "2. 二十四節気シリーズ全24本の一覧（公式情報）" },
  { id: "other", label: "3. 二十四節気シリーズ以外の主なボトル" },
  { id: "distillery", label: "4. 厚岸蒸溜所の概要" },
  { id: "sell", label: "5. 売却前に確認すること" },
  { id: "faq", label: "6. よくある質問" },
  { id: "sources", label: "7. 出典と集計方法" },
];

const linkCls = "text-amber-dark underline hover:text-burgundy";

export default function AkkeshiKaitoriPage() {
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
            <li><span className="text-foreground">厚岸 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">厚岸ウイスキーの買取相場｜二十四節気シリーズ全24本と寒露・雨水・大寒の落札中央値</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {UPDATED} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">厚岸ウイスキーの買取相場（{fetchedAt} 集計）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {med("kanro") && <li>二十四節気シリーズ第一弾 <strong>寒露（2020年10月発売）：{med("kanro")}</strong>（希望小売価格 税込23,100円の{ratio("kanro")}）</li>}
              {med("usui") && <li>第二弾 <strong>雨水（2021年2月発売）：{med("usui")}</strong>／第六弾 <strong>大寒（2022年2月発売）：{med("daikan") ?? "集計中"}</strong></li>}
              <li>いずれも<strong>ヤフオク過去180日の落札中央値（700ml・単品）</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
              <li>二十四節気シリーズは<strong>2026年8月発売の秋分（第二十四弾）で24本</strong>となり、公式の商品情報に「幕を閉じる」と記載されています（<a href="#sekki" className={linkCls}>2章</a>）。</li>
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

          <h2 id="current-price">1. ボトル別の落札中央値（ヤフオク過去180日）</h2>
          <p>
            ヤフオクで過去180日に落札された出品のうち、出品タイトルを確認して<strong>対象ボトルの700ml単品</strong>だけを残し、IQR（四分位範囲）で外れ値を除いた中央値です（取得日 {fetchedAt}）。
            2本セット・空き瓶・他の節気名を併記した出品は除外しています。<strong>件数（n）が20件未満のボトルは中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>発売</th><th>落札中央値</th><th>件数</th><th>希望小売価格（税別）</th></tr>
              </thead>
              <tbody>
                {priceSlugs.map((s) => {
                  const r = b(s);
                  const rel = relOf(s);
                  if (!r || !rel) return null;
                  return (
                    <tr key={s}>
                      <td><strong>{rel.sekki}</strong>（第{rel.no}弾・{rel.type}）</td>
                      <td>{rel.ym}</td>
                      <td>{med(s) ?? "データ不足（n<20）"}</td>
                      <td>n={r.filtered_n}件</td>
                      <td>{yen(rel.price)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。買取額は業者の手数料・在庫状況によりこれを下回るのが一般的です。対象とした出品は「箱付き」「未開栓」と記載されたものが大半です。
          </p>
          <p>
            集計できた範囲では、<strong>第一弾の寒露</strong>の中央値が希望小売価格（税込）の{ratio("kanro") ?? "—"}で、ほかの2本と比べて高い水準でした。
            ブレンデッドの雨水（{ratio("usui") ?? "—"}）・大寒（{ratio("daikan") ?? "—"}）は希望小売価格（税込）に近い水準です。
            芒種・立冬は落札件数が20件未満のため、中央値は掲載していません。上記5本以外のボトルは今回集計していません。
          </p>

          <h2 id="sekki">2. 二十四節気シリーズ全24本の一覧（公式情報）</h2>
          <p>
            二十四節気シリーズは、一年を24の季節に分けた「二十四節気」の名称を各ボトルに付けたシリーズです。
            厚岸蒸溜所の公式サイト「<a href={OFFICIAL_HISTORY} target="_blank" rel="noopener noreferrer" className={linkCls}>蒸溜所の歩み</a>」に記載された発売年月と、
            「<a href={OFFICIAL_PRODUCTS} target="_blank" rel="noopener noreferrer" className={linkCls}>商品情報</a>」に記載された種別・アルコール分・希望小売価格を一覧にしています（2026年11月7日確認・容量はすべて700ml）。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>弾</th><th>節気</th><th>発売</th><th>種別</th><th>度数</th><th>希望小売価格（税別）</th></tr>
              </thead>
              <tbody>
                {releases.map((r) => (
                  <tr key={r.sekki}>
                    <td>第{r.no}弾</td>
                    <td><strong>{r.sekki}</strong></td>
                    <td>{r.ym}</td>
                    <td>{r.type}</td>
                    <td>{r.abv}%</td>
                    <td>{yen(r.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            公式の商品情報では、第二十四弾の秋分の紹介文に「6年に亘った二十四節気シリーズも、大団円のうちに幕を閉じることが出来ます」と記載されています。
            第十八弾の冬至は、公式に「北海道初となるシングルブレンデッドジャパニーズウイスキー」と記載されています。
          </p>

          <h2 id="other">3. 二十四節気シリーズ以外の主なボトル</h2>
          <p>公式サイト「蒸溜所の歩み」「商品情報」に記載されている主なボトルは以下のとおりです。</p>
          <ul>
            <li><strong>厚岸 NEW BORN FOUNDATIONS 1〜4</strong>（200ml）… 1は2018年2月、2は2018年8月、3は2019年3月、4は2019年8月発売。度数は1が60%、2が58%、3が55%、4が48%</li>
            <li><strong>厚岸ウイスキー サロルンカムイ</strong>（200ml・55%）… 2020年2月発売</li>
            <li><strong>カムイウイスキー®シリーズ</strong> … カムイチカプ（2022年12月）、カムイチェップ（2024年2月）、カパッチリカムイ（2024年10月）、ヤトッタカムイ（2025年6月）</li>
          </ul>
          <p>
            これらは当サイトで落札データを集計していないため、相場は掲載していません。200mlのボトルは、700mlの中央値とは別に査定されます。
          </p>

          <h2 id="distillery">4. 厚岸蒸溜所の概要</h2>
          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><th>蒸溜所所有者</th><td>堅展実業株式会社</td></tr>
                <tr><th>所在地（公式サイト記載）</th><td>北海道厚岸郡厚岸町宮園4丁目109-2</td></tr>
                <tr><th>蒸溜所設立</th><td>2016年（平成28年）。2016年10月に蒸溜開始</td></tr>
                <tr><th>蒸溜器（ポットスチル）</th><td>2基（ウォッシュ・スチル 5,000L／スピリット・スチル 3,600L）。スコットランドのフォーサイス社製</td></tr>
                <tr><th>発酵槽</th><td>6基</td></tr>
                <tr><th>熟成庫</th><td>ダンネージ式／ラック式</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            公式サイトによると、2013年に国内2か所の蒸溜所から原酒を買い取って試験熟成を開始し、2015年に蒸溜所の建設を始めています。
            最初の商品は2018年2月発売の「厚岸 NEW BORN FOUNDATIONS 1」です。
            公式サイトには「スコットランドの伝統的な製法で、アイラモルトのようなウイスキーを造りたい」という方針が記載されています。
          </p>

          <h2 id="sell">5. 売却前に確認すること</h2>
          <ol>
            <li><strong>節気名と種別を確認する</strong>：ラベルの節気名（寒露・雨水など）と、シングルモルト／ブレンデッドの別を業者に正確に伝えてください。1章のとおり、ボトルによって落札価格は大きく異なります。</li>
            <li><strong>容量を確認する</strong>：二十四節気シリーズは700ml、NEW BORN FOUNDATIONS とサロルンカムイは200mlです。</li>
            <li><strong>化粧箱を揃える</strong>：当サイトが集計した出品の大半は「箱付き」と記載されていました。箱が残っていれば一緒に査定に出してください。</li>
            <li><strong>複数業者で見積もりを取る</strong>：買取額は業者により異なります。詳しくは<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>をご覧ください。</li>
          </ol>
          <p>
            高額で売却した場合の税金の扱いは<Link href="/articles/whisky-kaitori-zeikin/" className={linkCls}>ウイスキー買取と税金</Link>、保管方法は<Link href="/articles/whisky-hokan-houhou/" className={linkCls}>ウイスキーの保管方法</Link>で解説しています。
          </p>

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

          <h2 id="sources">7. 出典と集計方法</h2>
          <ul className="text-sm">
            <li>厚岸蒸溜所 公式サイト「<a href={OFFICIAL_PRODUCTS} target="_blank" rel="noopener noreferrer" className={linkCls}>商品情報</a>」（度数・容量・希望小売価格・シリーズ完結の記載。2026年11月7日確認）</li>
            <li>厚岸蒸溜所 公式サイト「<a href={OFFICIAL_HISTORY} target="_blank" rel="noopener noreferrer" className={linkCls}>蒸溜所の歩み</a>」（発売年月・第◯弾。2026年11月7日確認）</li>
            <li>厚岸蒸溜所 公式サイト「<a href={OFFICIAL_OVERVIEW} target="_blank" rel="noopener noreferrer" className={linkCls}>蒸溜所設備と熟成環境</a>」（所有者・設立年・設備。2026年11月7日確認）</li>
            <li>落札中央値：ヤフオクの落札相場検索（過去180日）。検索語「厚岸 ＋節気名 ＋700ml」の結果から、出品タイトルで対象ボトルの700ml単品に絞り込み（セット・空き瓶・他の節気名を含む出品は除外）、IQR 1.5倍で外れ値を除いた中央値です。取得日 {fetchedAt}。集計方法の詳細は<Link href="/methodology/" className={linkCls}>データの集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/chichibu-the-first-kaitori/" className={linkCls}>秩父 ザ・ファーストの買取相場</Link></li>
              <li><Link href="/articles/mars-komagatake-kaitori/" className={linkCls}>駒ヶ岳の買取相場</Link></li>
              <li><Link href="/articles/ichirosu-wwr-kaitori/" className={linkCls}>イチローズモルト ワインウッドリザーブの買取価格・相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-souba-kimarikata/" className={linkCls}>ウイスキーの買取価格の決まり方</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る手順</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
