import type { Metadata } from "next";
import Link from "next/link";
import medians from "@/data/yahoo-medians.json";

// 2026-11-11 新規「ジャパニーズウイスキー 買取」受け皿（kw-expansion・手書き）。
// 価格は @/data/yahoo-medians.json（週次の fetch-yahoo-medians.py が毎週月曜に更新）をビルド時に読む＝週次ビルドで自動更新。
// ⚠️ insufficient=true または n<20 の銘柄は中央値を出さない（品質ゲート・TITLE_FILTERS の結果に従う）。null を許す型にすること（10/19 の型エラー参照）。
// 「ジャパニーズウイスキー」の定義は日本洋酒酒造組合の自主基準（2021-02-12 制定・2021-04-01 施行）の PDF 本文のみ（2026-11-11 確認）。

type MedianRec = { median?: number | null; filtered_n?: number | null; fetched_at?: string; insufficient?: boolean };
const M = medians as unknown as Record<string, MedianRec>;
const ok = (r: MedianRec | undefined): r is MedianRec =>
  !!r && r.insufficient !== true && typeof r.median === "number" && typeof r.filtered_n === "number" && r.filtered_n >= 20;
const yen = (v: number) => `${Math.round(v).toLocaleString("ja-JP")}円`;

type Row = { slug: string; name: string };
type Group = { brand: string; hub?: { href: string; label: string }; rows: Row[] };

// 銘柄の並びは当サイトの銘柄ページ（/articles/{slug}-kaitori/）と同じ。蒸溜所名は各銘柄ページの記載に合わせる。
const groups: Group[] = [
  { brand: "山崎（サントリー 山崎蒸溜所）", hub: { href: "/articles/yamazaki-kaitori/", label: "山崎の買取相場" }, rows: [
    { slug: "yamazaki-nv", name: "山崎 ノンエイジ" }, { slug: "yamazaki-12", name: "山崎12年" }, { slug: "yamazaki-18", name: "山崎18年" }, { slug: "yamazaki-25", name: "山崎25年" }, { slug: "yamazaki-55", name: "山崎55年" },
  ] },
  { brand: "白州（サントリー 白州蒸溜所）", hub: { href: "/articles/hakushu-kaitori/", label: "白州の買取相場" }, rows: [
    { slug: "hakushu-nv", name: "白州 ノンエイジ" }, { slug: "hakushu-12", name: "白州12年" }, { slug: "hakushu-18", name: "白州18年" }, { slug: "hakushu-25", name: "白州25年" },
  ] },
  { brand: "響（サントリー）", hub: { href: "/articles/hibiki-kaitori/", label: "響の買取相場" }, rows: [
    { slug: "hibiki-nv", name: "響 ジャパニーズハーモニー" }, { slug: "hibiki-17", name: "響17年" }, { slug: "hibiki-21", name: "響21年" }, { slug: "hibiki-30", name: "響30年" },
  ] },
  { brand: "竹鶴（ニッカ）", hub: { href: "/articles/taketsuru-kaitori/", label: "竹鶴の買取価格一覧" }, rows: [
    { slug: "taketsuru-pure", name: "竹鶴ピュアモルト" }, { slug: "taketsuru-17", name: "竹鶴17年" }, { slug: "taketsuru-21", name: "竹鶴21年" }, { slug: "taketsuru-25", name: "竹鶴25年" },
  ] },
  { brand: "余市（ニッカ 余市蒸溜所）", rows: [
    { slug: "yoichi-nv", name: "余市 ノンエイジ" }, { slug: "yoichi-10", name: "余市10年" }, { slug: "yoichi-15", name: "余市15年" }, { slug: "yoichi-20", name: "余市20年" },
  ] },
  { brand: "宮城峡（ニッカ 宮城峡蒸溜所）", hub: { href: "/articles/miyagikyo-nv-kaitori/", label: "宮城峡の買取価格" }, rows: [
    { slug: "miyagikyo-nv", name: "宮城峡 ノンエイジ" }, { slug: "miyagikyo-12", name: "宮城峡12年" }, { slug: "miyagikyo-15", name: "宮城峡15年" },
  ] },
  { brand: "イチローズモルト・秩父（ベンチャーウイスキー）", rows: [
    { slug: "ichirosu-mwr", name: "イチローズモルト MWR" }, { slug: "ichirosu-double-distilleries", name: "イチローズモルト ダブルディスティラリーズ" }, { slug: "ichirosu-card", name: "イチローズモルト カードシリーズ" }, { slug: "chichibu-the-first", name: "秩父 ザ・ファースト" },
  ] },
  { brand: "駒ヶ岳（本坊酒造 マルス駒ヶ岳蒸溜所）", rows: [{ slug: "mars-komagatake", name: "マルス駒ヶ岳" }] },
  { brand: "閉鎖した蒸溜所のボトル", rows: [
    { slug: "karuizawa-12", name: "軽井沢12年" }, { slug: "karuizawa-30", name: "軽井沢30年" }, { slug: "hanyu-card", name: "羽生カードシリーズ" },
  ] },
];

const allRows = groups.flatMap((g) => g.rows);
const okRows = allRows.filter((r) => ok(M[r.slug]));
const dates = okRows.map((r) => M[r.slug]?.fetched_at).filter((d): d is string => !!d).sort();
const fetchedAt = dates.length ? dates[dates.length - 1] : "2026-11-09";
const nv = ["yamazaki-nv", "hakushu-nv", "hibiki-nv"].map((s) => M[s]).filter(ok);
const nvLow = nv.length ? Math.min(...nv.map((r) => r.median as number)) : null;
const nvHigh = nv.length ? Math.max(...nv.map((r) => r.median as number)) : null;
const top = [...okRows].sort((a, b) => (M[b.slug].median as number) - (M[a.slug].median as number))[0];

const OFFICIAL_PAGE = "https://www.yoshu.or.jp/pages/151/";
const OFFICIAL_PDF = "https://www.yoshu.or.jp/files/libs/1525/202303291553482719.pdf";
const CHECKED = "2026-11-11";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ジャパニーズウイスキーの買取相場【2026年11月】${okRows.length}本の落札中央値一覧｜山崎・白州・響・竹鶴・余市・宮城峡ほか`,
  description: `ジャパニーズウイスキーの買取相場を、ヤフオク過去180日の落札中央値で銘柄別に一覧にしています（${okRows.length}本・毎週更新）。日本洋酒酒造組合の表示基準による「ジャパニーズウイスキー」の要件と、売る前に確認するラベルの項目もまとめています。`,
  alternates: { canonical: "/articles/japanese-whisky-kaitori/" },
};

const faqs = [
  {
    q: "ジャパニーズウイスキーの買取相場はいくらですか？",
    a: nvLow !== null && nvHigh !== null && top
      ? `銘柄と年数によって大きく異なります。当サイトの集計（ヤフオク過去180日の落札中央値・取得日 ${fetchedAt}）では、山崎・白州・響のノンエイジ（年数表記なし）が${yen(nvLow)}〜${yen(nvHigh)}、一覧の中で最も高いのは${top.name}の${yen(M[top.slug].median as number)}です。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データは現在集計中です。",
  },
  {
    q: "「ジャパニーズウイスキー」と表示できるのはどんなウイスキーですか？",
    a: "日本洋酒酒造組合の自主基準（2021年4月1日施行）では、原材料は麦芽・穀類・日本国内で採水された水に限り（麦芽は必ず使用）、糖化・発酵・蒸留を日本国内の蒸留所で行い、700リットル以下の木製樽で3年以上日本国内で貯蔵し、日本国内で瓶詰めして充填時のアルコール分を40度以上とすることなどが要件です。",
  },
  {
    q: "国産のウイスキーなら、すべて「ジャパニーズウイスキー」ですか？",
    a: "いいえ。同じ基準は、要件に当てはまらないウイスキーに「ジャパニーズウイスキー」や「日本ウイスキー」などの同義語を表示することを認めていません。2021年3月31日以前から販売していた商品には2024年3月31日までの経過措置がありました。ラベルの表示は商品ごとに確認してください。",
  },
  {
    q: "年数表記のないボトル（ノンエイジ）も売れますか？",
    a: "売れます。山崎・白州・響・竹鶴・余市・宮城峡には年数表記のないボトルがあり、当サイトでは年数表記のあるボトルとは別に集計しています。銘柄ごとのページで、店舗の掲示価格と落札中央値を確認できます。",
  },
  {
    q: "中央値が「データ不足」の銘柄はどう調べればよいですか？",
    a: "落札件数が20件に満たない銘柄や、検索結果に別のボトルが混ざる銘柄は中央値を出していません。各銘柄のページに買取店の掲示価格や落札例を載せているものがあります。高額なボトルは複数の業者に個別に査定を依頼してください。",
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
  { id: "current-price", label: "1. 銘柄別の落札中央値（ヤフオク過去180日）" },
  { id: "definition", label: "2. 「ジャパニーズウイスキー」と表示できる条件" },
  { id: "label", label: "3. 売る前にラベルで確認すること" },
  { id: "other", label: "4. 一覧以外の国産ウイスキー" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

export default function JapaneseWhiskyKaitoriPage() {
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
            <li><span className="text-foreground">ジャパニーズウイスキー 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ジャパニーズウイスキーの買取相場｜銘柄別の落札中央値と「ジャパニーズウイスキー」の表示基準</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt > CHECKED ? fetchedAt : CHECKED} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {nvLow !== null && nvHigh !== null && <li>山崎・白州・響の<strong>ノンエイジ（年数表記なし）</strong>のヤフオク落札中央値は<strong>{yen(nvLow)}〜{yen(nvHigh)}</strong>です（取得日 {fetchedAt}）。</li>}
              {top && <li>一覧で最も高いのは<strong>{top.name}（{yen(M[top.slug].median as number)}）</strong>です。年数・銘柄で価格は数百倍の差があります。</li>}
              <li>中央値を出せたのは一覧の{allRows.length}本中<strong>{okRows.length}本</strong>です。件数不足や別ボトルの混入がある銘柄は「データ不足」と表示しています。</li>
              <li>「ジャパニーズウイスキー」の表示には、日本洋酒酒造組合の基準（2021年4月1日施行）で原料・製造・3年以上の国内貯蔵・国内瓶詰めの要件があります（<a href="#definition" className={linkCls}>2章</a>）。</li>
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

          <h2 id="current-price">1. 銘柄別の落札中央値（ヤフオク過去180日）</h2>
          <p>
            当サイトが毎週月曜に集計している、ヤフオクの過去180日の落札価格（700ml）の中央値です。IQR（四分位範囲の1.5倍）で外れ値を除いています。
            <strong>件数（n）が20件未満の銘柄、検索結果に空瓶や別のボトルが混ざり中央値が実物の価格と合わない銘柄は、中央値を掲載していません。</strong>
            各銘柄名から、店舗の掲示価格・箱なしの扱いなどを載せた銘柄ページに移動できます。
          </p>
          {groups.map((g) => (
            <div key={g.brand}>
              <h3>{g.brand}</h3>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr><th>銘柄</th><th>落札中央値</th><th>件数</th></tr>
                  </thead>
                  <tbody>
                    {g.rows.map((r) => {
                      const rec = M[r.slug];
                      return (
                        <tr key={r.slug}>
                          <td><Link href={`/articles/${r.slug}-kaitori/`} className={linkCls}>{r.name}</Link></td>
                          <td>{ok(rec) ? yen(rec.median as number) : "データ不足"}</td>
                          <td>{ok(rec) ? `n=${rec.filtered_n}件` : "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {g.hub && <p className="text-sm"><Link href={g.hub.href} className={linkCls}>{g.hub.label}（銘柄のまとめ）→</Link></p>}
            </div>
          ))}
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}（毎週月曜更新）。これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。買取額は業者の手数料・在庫状況によりこれを下回るのが一般的です。
          </p>

          <h2 id="definition">2. 「ジャパニーズウイスキー」と表示できる条件</h2>
          <p>
            日本洋酒酒造組合は2021年2月12日に「<a href={OFFICIAL_PAGE} target="_blank" rel="noopener noreferrer" className={linkCls}>ウイスキーにおけるジャパニーズウイスキーの表示に関する基準</a>」を制定し、2021年4月1日から施行しています。
            日本国内で販売するウイスキーと、日本から国外向けに販売するウイスキーに適用される自主基準です。要件は次のとおりです（{CHECKED}確認）。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>項目</th><th>要件（基準 第5条）</th></tr>
              </thead>
              <tbody>
                <tr><th>原材料</th><td>麦芽、穀類、日本国内で採水された水に限る。麦芽は必ず使用する。</td></tr>
                <tr><th>製造</th><td>糖化・発酵・蒸留を日本国内の蒸留所で行う。蒸留の際の留出時のアルコール分は95度未満。</td></tr>
                <tr><th>貯蔵</th><td>内容量700リットル以下の木製樽に詰め、詰めた日の翌日から起算して3年以上、日本国内で貯蔵する。</td></tr>
                <tr><th>瓶詰</th><td>日本国内で容器詰めし、充填時のアルコール分は40度以上。</td></tr>
                <tr><th>その他</th><td>色調の微調整のためのカラメルの使用を認める。</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>同義語・翻訳も対象</strong>: 要件に当てはまらないウイスキーには、「日本ウイスキー」「ジャパンウイスキー」等の同義語、外国語訳、「〜タイプ」「〜風」の表現でも表示できません（第6条）。</li>
            <li><strong>日本を想起させる表示</strong>: 要件に当てはまらないウイスキーに、日本を想起させる人名・国内の地名・国旗・元号などを表示してはならないとされています（要件に当てはまらないことを明らかにする措置をした場合を除く）。</li>
            <li><strong>経過措置</strong>: 2021年3月31日以前から販売していた商品は、2024年3月31日まで従前の表示を続けることができました（附則第2条）。</li>
          </ul>

          <h2 id="label">3. 売る前にラベルで確認すること</h2>
          <ol>
            <li><strong>銘柄名と年数</strong>: 同じ銘柄でも、ノンエイジと12年・18年・25年などで落札価格は大きく異なります（1章）。</li>
            <li><strong>容量</strong>: 当サイトの中央値は700mlの集計です。180ml・500ml・750ml（旧ボトル）などは別に査定されます。</li>
            <li><strong>旧ラベル・限定品</strong>: 旧ラベルや記念ボトルは、同じ銘柄の現行品と別の価格がつくことがあります。銘柄ページの見分け方を確認してください。</li>
            <li><strong>付属品と状態</strong>: 化粧箱・冊子・シールの有無、液面、ラベルの汚れを確認し、査定時に伝えてください。箱なしの扱いは<Link href="/articles/yamazaki-nv-hako-nashi/" className={linkCls}>山崎ノンエイジの箱なし買取</Link>の例をご覧ください。</li>
            <li><strong>複数業者で比較</strong>: 買取額は業者により異なります。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>、税金の扱いは<Link href="/articles/whisky-kaitori-zeikin/" className={linkCls}>ウイスキー買取と税金</Link>をご覧ください。</li>
          </ol>

          <h2 id="other">4. 一覧以外の国産ウイスキー</h2>
          <p>当サイトでは、以下の国産ウイスキーも個別のページで扱っています。</p>
          <ul>
            <li><Link href="/articles/akkeshi-kaitori/" className={linkCls}>厚岸（二十四節気シリーズ）の買取相場</Link></li>
            <li><Link href="/articles/hibiki-blossom-harmony-kaitori/" className={linkCls}>響 ブロッサムハーモニーの買取相場</Link></li>
            <li><Link href="/articles/ichirosu-wwr-kaitori/" className={linkCls}>イチローズモルト ワインウッドリザーブの買取価格</Link></li>
          </ul>
          <p>
            ジャパニーズウイスキーの価格が高い背景は<Link href="/articles/whisky-naze-takai/" className={linkCls}>ウイスキーはなぜ高い？高騰の理由</Link>、海外のウイスキーを含む全銘柄の一覧は<Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー市場相場一覧</Link>で解説しています。
          </p>

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
            <li>日本洋酒酒造組合「<a href={OFFICIAL_PAGE} target="_blank" rel="noopener noreferrer" className={linkCls}>ウイスキーにおけるジャパニーズウイスキーの表示に関する基準</a>」（<a href={OFFICIAL_PDF} target="_blank" rel="noopener noreferrer" className={linkCls}>基準本文 PDF</a>・2021年2月12日制定。{CHECKED}確認）</li>
            <li>落札中央値：ヤフオクの落札相場検索（過去180日・700ml）。毎週月曜に取得し、IQR 1.5倍で外れ値を除いた中央値。n&lt;20 または品質確認で外れた銘柄は掲載しません。取得日 {fetchedAt}。集計方法の詳細は<Link href="/methodology/" className={linkCls}>データの集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/yoichi-grande-kaitori/" className={linkCls}>余市 グランデの買取相場</Link></li>
              <li><Link href="/souba-hakusho/" className={linkCls}>全国ウイスキー買取相場白書</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー市場相場一覧</Link></li>
              <li><Link href="/articles/whisky-nv-toha/" className={linkCls}>ウイスキーの「年代指定なし（NV）」とは</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る前に知るべき基礎ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
