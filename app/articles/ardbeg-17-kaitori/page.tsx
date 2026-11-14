import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-14 新規「アードベッグ 17年 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    旧ボトル（〜2004年）と 2024年の復刻版は、出品タイトルの表記（旧ボトル／オールドボトル、コミッティ／The Legend Returns／帰ってきた）で分けた。
//    どちらの表記もない出品は別区分。3区分とも n<20 のため中央値は出さない。
//    13年 バッチ17・ドルチェ・8年・10年・ミニボトル・箱のみ・空瓶・セットは除外。
// 製品情報は発表元（MHD モエ ヘネシー ディアジオ）の PR TIMES リリースのみ（ardbegjp.com は製品ページが 429）。

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
type Band = { note: string; n: number; min: number; max: number };
type WithBands = Agg & { price_bands?: Band[] };

const Y = data.yahoo as unknown as Record<string, WithBands>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const range = (a: { min: number | null; max: number | null } | undefined) =>
  a && a.min && a.max ? (a.min === a.max ? yenFmt(a.min) : `${yenFmt(a.min)}〜${yenFmt(a.max)}`) : "—";
const yOld = Y["17-old"];
const yRev = Y["17-revival"];
const yUn = Y["17-unmarked"];
const bands = yUn?.price_bands ?? [];
const fetchedAt = yRev?.fetched_at ?? "2026-11-14";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: "アードベッグ17年の買取相場【2026年11月】旧ボトルと2024年復刻版のヤフオク落札額",
  description: `アードベッグ17年の買取相場を、ヤフオクの落札データで掲載しています。2004年に販売を終えた旧ボトルと、2024年9月に約20年ぶりに復活した復刻版（希望小売価格30,800円・税込）を分けて、落札額の範囲と件数をまとめています。`,
  alternates: { canonical: "/articles/ardbeg-17-kaitori/" },
};

const faqs = [
  {
    q: "アードベッグ17年の買取相場はいくらですか？",
    a: `当サイトの集計では、出品タイトルに「旧ボトル」「オールドボトル」とある出品は${yOld?.filtered_n ?? 0}件で${range(yOld)}、「コミッティ」などと書かれた2024年の復刻版は${yRev?.filtered_n ?? 0}件で${range(yRev)}でした（取得日 ${fetchedAt}）。いずれも20件に満たないため、中央値は出していません。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`,
  },
  {
    q: "旧ボトルと2024年の復刻版はどちらが高いですか？",
    a: `今回の集計では、旧ボトルと明記された出品（${range(yOld)}）が、復刻版と明記された出品（${range(yRev)}）の約2倍の価格で落札されていました。どちらの表記もない出品も、${bands.map((b) => `${range(b)}（${b.n}件）`).join("と")}の2つの価格帯に分かれていました。`,
  },
  {
    q: "2024年の復刻版の定価はいくらですか？",
    a: "MHD モエ ヘネシー ディアジオの2024年9月12日の発表では、復刻版「アードベッグ 17年」の希望小売価格は28,000円（税別）／30,800円（税込）です。700ml・40度・バーボン樽で、アードベッグ コミッティーストアで抽選販売されました。",
  },
  {
    q: "旧ボトルと復刻版はどう見分けますか？",
    a: "公式の発表には、旧ボトルと復刻版のラベルの違いは記載されていません。ヤフオクでは、復刻版は「コミッティ エクスクルーシブ」「The Legend Returns」、旧ボトルは「旧ボトル」「オールドボトル」と書かれた出品が見られました。購入時期や購入先（コミッティーストアかどうか）を業者に伝えてください。",
  },
  {
    q: "アードベッグ17年はなぜ終売になったのですか？",
    a: "発表元のリリースは、アードベッグ17年が2004年に販売終了したことと、2024年に約20年ぶりに復活させたことを伝えています。販売終了の理由は記載されていません。",
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
  { id: "current-price", label: "1. 旧ボトル・復刻版別の落札額" },
  { id: "old", label: "2. 旧ボトル（2004年まで）" },
  { id: "revival", label: "3. 2024年の復刻版（公式発表）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string }[] = [
  { key: "17-old", name: "旧ボトル（タイトルに「旧ボトル」「オールドボトル」と明記）" },
  { key: "17-revival", name: "2024年の復刻版（タイトルに「コミッティ」「The Legend Returns」「帰ってきた」と明記）" },
  { key: "17-unmarked", name: "どちらの表記もない出品" },
];

export default function Ardbeg17KaitoriPage() {
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
            <li><span className="text-foreground">アードベッグ17年 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">アードベッグ17年の買取相場｜旧ボトルと2024年復刻版のヤフオク落札額</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {yOld && <li>出品タイトルに<strong>「旧ボトル」「オールドボトル」</strong>とある出品は{yOld.filtered_n}件で、<strong>{range(yOld)}</strong>で落札されていました。</li>}
              {yRev && <li><strong>2024年の復刻版</strong>（「コミッティ」等の表記）は{yRev.filtered_n}件で、<strong>{range(yRev)}</strong>でした。復刻版の希望小売価格は30,800円（税込）です。</li>}
              <li>アードベッグ17年は<strong>2004年に販売を終了</strong>し、<strong>2024年9月に約20年ぶりに復活</strong>しました（発表元のリリース）。旧ボトルと復刻版では落札額が約2倍異なります。</li>
              <li>いずれも20件に満たないため、中央値は掲載していません。掲載額は<strong>落札された市場価格</strong>で、業者の買取額はここから手数料等を引いた水準になります。</li>
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

          <h2 id="current-price">1. 旧ボトル・復刻版別の落札額</h2>
          <p>
            ヤフオクの落札済みオークションを「{yRev?.query}」で検索し、重複を除いた{yRev?.raw_n}件の出品タイトルを1件ずつ確認しました。
            旧ボトルと2024年の復刻版は、出品タイトルの表記で分けています。どちらの表記もない出品は、別の区分にしました。
            アードベッグ13年（バッチ17）・ドルチェ・8年・10年などの別ボトル、ミニボトル、箱のみ・空き瓶、セット出品は除いています。
            <strong>3区分とも件数（n）が20件未満のため、中央値は掲載せず、落札額の範囲と件数のみを示しています。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>区分（700ml）</th><th>件数</th><th>落札額の範囲</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong></td>
                      <td>n={a.filtered_n}件</td>
                      <td>{range(a)}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}。出品が少ないため、約6か月分の落札です。区分は出品タイトルの表記によるもので、当サイトがボトルを確認したものではありません。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>
          {bands.length > 0 && (
            <p>
              どちらの表記もない{yUn?.filtered_n ?? 0}件は、
              {bands.map((b, i) => (
                <span key={b.note}>{i > 0 ? "と、" : ""}{b.note}{b.n}件（{range(b)}）</span>
              ))}
              に分かれていました。前者は旧ボトル、後者は復刻版と同じ価格帯ですが、タイトルからはどちらか判別できないため、区分には含めていません。
            </p>
          )}

          <h2 id="old">2. 旧ボトル（2004年まで）</h2>
          <ul>
            <li><strong>位置づけ</strong>: アードベッグ蒸留所は1996年にいったん生産を停止し、1997年にグレンモーレンジィ社によって操業を再開しました。アードベッグ17年は、操業再開後に初めてリリースされたウイスキーです。</li>
            <li><strong>販売終了</strong>: 2004年に販売を終了しました。</li>
            <li><strong>度数</strong>: 発表元のリリースは、復刻版を「発売当時と同じ40度」でボトリングしたと説明しています。ヤフオクで旧ボトルと明記された出品のうち、度数を書いた出品も「40%」の表記でした。</li>
          </ul>
          <p>旧ボトルの容量・ラベルの仕様は、公式の発表には記載がありません。旧ボトルは発売から20年以上が経過しているため、液面の高さやコルクの状態も査定の対象になります。</p>

          <h2 id="revival">3. 2024年の復刻版（公式発表）</h2>
          <p>MHD モエ ヘネシー ディアジオは2024年9月12日に、「アードベッグ 17年」を約20年ぶりに復活させると発表しました。</p>
          <div className="table-wrapper">
            <table>
              <tbody>
                <tr><th>商品名</th><td>アードベッグ 17年</td></tr>
                <tr><th>希望小売価格</th><td>28,000円（税別）／30,800円（税込）</td></tr>
                <tr><th>容量・度数</th><td>700ml・40度</td></tr>
                <tr><th>熟成樽</th><td>バーボン樽</td></tr>
                <tr><th>販売先</th><td>アードベッグ コミッティーストア限定（2024年9月25日正午〜9月27日正午の抽選販売）</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>復刻の経緯</strong>: 最高蒸留・製造責任者のビル・ラムズデン博士が、当時の味わいを再現するために、発売当時と同じ40度でボトリングしたと説明されています。</li>
            <li><strong>テイスティングノート</strong>: 色合いはブロンズ色。香りは松脂、海のしぶき、ラベンダーの石鹸のニュアンスで、加水すると甘いピートの煙が感じられると紹介されています。</li>
          </ul>
          <p>今回の集計では、復刻版の落札額（{range(yRev)}）は希望小売価格（30,800円・税込）を下回っていました。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>旧ボトルか復刻版かを伝える</strong>: 落札額が約2倍異なります。購入した時期と購入先を控えておいてください。</li>
            <li><strong>箱・付属品をそろえる</strong>: ヤフオクでは箱付きの出品が多く見られました（箱の有無による価格差は集計していません）。</li>
            <li><strong>他のアードベッグと区別する</strong>: 「アードベッグ 13年 バッチ17」のように、17という数字を含む別のボトルもあります。ラベルの「17 YEARS OLD」の表記を確認してください。</li>
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
            <li>MHD モエ ヘネシー ディアジオ「<a href={off.prtimes} className={linkCls} rel="noopener" target="_blank">1997年、アードベッグ蒸留所の操業再開後初めてリリースされた伝説のウイスキー「アードベッグ 17年」四半世紀の時を経て復活！</a>」（PR TIMES・2024年9月12日・{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yRev?.query}」。タイトルを目視で確認し、IQRで外れ値を確認。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/ardbeg-uigeadail-kaitori/" className={linkCls}>アードベッグ ウーガダールの買取相場</Link></li>
              <li><Link href="/articles/ardbeg-corryvreckan-kaitori/" className={linkCls}>アードベッグ コリーヴレッカンの買取相場</Link></li>
              <li><Link href="/articles/ardbeg-nv-kaitori/" className={linkCls}>アードベッグ（年数表記なし）の買取相場</Link></li>
              <li><Link href="/articles/yoichi-grande-kaitori/" className={linkCls}>余市 グランデの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
