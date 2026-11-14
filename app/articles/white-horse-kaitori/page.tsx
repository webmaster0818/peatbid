import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-14 新規「ホワイト ホース 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    区分は出品タイトルの表記（特級・12年 デラックス／ローガン・エクストラファイン・容量）で分けた。n<20 の区分は中央値なし。
//    グレンエルギン・ラガヴーリン・レアード ローガン・セラー・グッズ類・干支／記念ボトル・内容量未記載・複数本セットは除外。
// 製品・ブランドの情報は Kirin 公式（ホワイトホースのページ・なごみのページ）と Diageo Japan のブランド一覧のみ。
// 希望小売価格は公式ページに記載がないため書かない。

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
const range = (a: Agg | undefined) =>
  a && a.min && a.max ? (a.min === a.max ? yenFmt(a.min) : `${yenFmt(a.min)}〜${yenFmt(a.max)}`) : "—";
const fetchedAt = Y["fine-old-tokkyu"]?.fetched_at ?? "2026-11-14";
const yTok = Y["fine-old-tokkyu"];
const yLogan = Y["logan-12"];
const y12 = Y["12-jp"];
const yTin = Y["tincap"];
const yNagomi = Y["nagomi"];

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ホワイトホースの買取相場【2026年11月】特級表記の旧ボトル ${med("fine-old-tokkyu") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `ホワイトホースの買取相場を、ヤフオクの落札データで掲載しています。特級表記のファインオールドは中央値${med("fine-old-tokkyu") ?? "集計中"}（n=${yTok?.filtered_n ?? 0}件）。現行の12年・なごみ、ティンキャップの落札額と、キリンの公式情報もまとめています。`,
  alternates: { canonical: "/articles/white-horse-kaitori/" },
};

const faqs = [
  {
    q: "ホワイトホースの買取相場はいくらですか？",
    a: ok(yTok)
      ? `当サイトの集計では、出品タイトルに「特級」とあるファインオールド（750ml・760ml）のヤフオク落札中央値は${med("fine-old-tokkyu")}です（n=${yTok.filtered_n}件・中央の半数は${yenFmt(yTok.q1 as number)}〜${yenFmt(yTok.q3 as number)}・取得日 ${fetchedAt}）。現行の700mlのボトルは、これより低い価格帯で落札されていました。落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "現行のホワイトホース 12年はいくらで売れますか？",
    a: `出品タイトルに「12年」「700ml」とある出品は${y12?.filtered_n ?? 0}件で、落札額は${range(y12)}でした（${fmtDate(y12?.end_date_from ?? null)}〜${fmtDate(y12?.end_date_to ?? null)}）。20件に満たないため、中央値は出していません。キリンの公式ページでは、12年は日本市場専用に開発された品（40%・700ml）と紹介されています。`,
  },
  {
    q: "古いホワイトホース（特級・ティンキャップ）は高く売れますか？",
    a: `出品タイトルに「ティンキャップ」とある出品は${yTin?.filtered_n ?? 0}件で、${range(yTin)}で落札されていました。特級表記のファインオールドの中央値（${med("fine-old-tokkyu") ?? "集計中"}）と比べて高い価格帯です。ただし件数が少なく、ボトルの年代や状態で価格は大きく変わります。ラベルとキャップの写真を添えて、複数の業者に査定を依頼してください。`,
  },
  {
    q: "ホワイトホース なごみは買取できますか？",
    a: `ヤフオクで「なごみ」の1本出品が落札されたのは${yNagomi?.filtered_n ?? 0}件で、${range(yNagomi)}でした。件数が少ないため、中央値は出していません。キリンの公式ページでは、なごみは日本限定品（40%・700ml）と紹介されています。`,
  },
  {
    q: "4000mlや2700mlのペットボトルも売れますか？",
    a: `4000mlのファインオールドは${Y["fine-old-4000"]?.filtered_n ?? 0}件が${range(Y["fine-old-4000"])}、2700mlは${Y["fine-old-2700"]?.filtered_n ?? 0}件が${range(Y["fine-old-2700"])}で落札されていました。キリンの公式ページによると、ペットボトル入りはスコットランド産ウイスキーを輸入し、日本で製造しています。大容量品は買取の対象外とする業者もあるため、事前に確認してください。`,
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
  { id: "current-price", label: "1. ボトル別の落札価格" },
  { id: "old-new", label: "2. 旧ボトルと現行品の価格差" },
  { id: "about", label: "3. ホワイトホースとは（公式情報）" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "fine-old-tokkyu", name: "ファインオールド（特級表記）", spec: "750ml・760ml" },
  { key: "fine-old-750", name: "ファインオールド（特級表記なし）", spec: "750ml・760ml" },
  { key: "logan-12", name: "12年 デラックス／ローガン", spec: "750ml" },
  { key: "extra-fine", name: "エクストラファイン（年数表記なし）", spec: "750ml" },
  { key: "12-extra-fine", name: "12年 エクストラファイン", spec: "750ml" },
  { key: "12-jp", name: "12年", spec: "700ml・40%" },
  { key: "fine-old-700", name: "ファインオールド", spec: "700ml・40%" },
  { key: "nagomi", name: "なごみ", spec: "700ml・40%" },
  { key: "fine-old-4000", name: "ファインオールド ペットボトル", spec: "4000ml" },
  { key: "fine-old-2700", name: "ファインオールド ペットボトル", spec: "2700ml" },
  { key: "tincap", name: "ティンキャップ（旧ボトル）", spec: "750ml・760ml" },
];

export default function WhiteHorseKaitoriPage() {
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
            <li><span className="text-foreground">ホワイトホース 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ホワイトホースの買取相場｜特級表記の旧ボトル・12年・なごみのヤフオク落札額</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(yTok) && <li>出品タイトルに<strong>「特級」とあるファインオールド</strong>（750ml・760ml）のヤフオク落札中央値は<strong>{med("fine-old-tokkyu")}</strong>です（n={yTok.filtered_n}件）。</li>}
              {ok(yLogan) && <li><strong>12年 デラックス／ローガン</strong>（750ml）は中央値<strong>{med("logan-12")}</strong>（n={yLogan.filtered_n}件）でした。</li>}
              {y12 && <li>現行の容量（700ml・40%）の<strong>12年</strong>は{y12.filtered_n}件・{range(y12)}、<strong>ファインオールド</strong>は{Y["fine-old-700"]?.filtered_n ?? 0}件・{range(Y["fine-old-700"])}でした（いずれも中央値なし）。</li>}
              {yTin && <li><strong>ティンキャップ</strong>の旧ボトルは{yTin.filtered_n}件が{range(yTin)}で落札されていました（件数不足のため中央値なし）。</li>}
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

          <h2 id="current-price">1. ボトル別の落札価格</h2>
          <p>
            ヤフオクの落札済みオークションを「{yTok?.query}」の5つの語で検索し、重複を除いた{yTok?.raw_n}件の出品タイトルを1件ずつ確認しました。
            区分は出品タイトルの表記（「特級」「12年 デラックス」「ローガン」「エクストラファイン」、容量）で分けています。
            グレンエルギンやラガヴーリンなど他銘柄の出品、レアード ローガン、空き瓶・グッズ類、干支ラベルなどの記念ボトル、内容量の記載がない出品、2本以上のセット、「難あり」「目減り」などの表記がある出品は除きました。
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
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、区分により約2〜5か月分の落札です。
            「特級」「ティンキャップ」「ローガン」などはいずれも出品タイトルの表記で、当サイトがボトルを確認したものではありません。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="old-new">2. 旧ボトルと現行品の価格差</h2>
          <p>
            今回の集計では、容量が750ml・760mlのボトル（出品タイトルに「古酒」「特級」の表記が多く見られました）のほうが、現在の公式ページに載っている700mlのボトルより高く落札されていました。
            特級表記のファインオールドの中央値は{med("fine-old-tokkyu") ?? "集計中"}、特級表記のないファインオールド（750ml・760ml）は{med("fine-old-750") ?? "集計中"}で、
            同じファインオールドでも出品タイトルの表記によって差がありました。
            一方、700mlのファインオールドは{range(Y["fine-old-700"])}、12年（700ml）は{range(y12)}の範囲にとどまっています。
          </p>
          <p>
            出品タイトルに「ティンキャップ」（金属製のキャップ）とある旧ボトルは{range(yTin)}で、ほかの区分と比べて価格帯が大きく異なりました。
            キリンの公式ページは、ホワイトホースが1920年に世界に先駆けてコルク栓から金属製のスクリューキャップに切り替えたと紹介しています。
            ボトルの年代は、キャップやラベルの形状、容量・度数の表記から業者が判断します。古いボトルをお持ちの場合は、写真を添えて査定を依頼してください。
          </p>

          <h2 id="about">3. ホワイトホースとは（公式情報）</h2>
          <ul>
            <li><strong>ブランド名の由来</strong>: スコットランドのエジンバラに実在した1742年創業の旅籠「ホワイトホースセラー」が由来と紹介されています。エジンバラからロンドンへ向かう乗合馬車の出発点でした。</li>
            <li><strong>創業者</strong>: ピーター・マッキーが、アイラ島ラガヴーリン蒸溜所のオーナーであった叔父のもとでウイスキー造りを学び、1890年に「ホワイトホース」を発売しました。</li>
            <li><strong>国内での位置づけ</strong>: 公式ページには「国内スコッチNo.1」とあり、根拠は「IWSR 2025年日本国内における輸入スコッチウイスキー売上容量換算」と注記されています。</li>
            <li><strong>販売者</strong>: Diageo Japan のブランド一覧では、ホワイトホース ファインオールドと12年の販売者はキリンビールと記載されています。</li>
          </ul>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>商品（公式ページの表記）</th><th>度数</th><th>容量</th><th>公式ページの説明</th></tr>
              </thead>
              <tbody>
                <tr><td>ホワイトホース ファインオールド</td><td>40%</td><td>200ml／700ml／1000ml／1750ml</td><td>原産地 スコットランド</td></tr>
                <tr><td>ホワイトホース 12年</td><td>40%</td><td>700ml</td><td>日本市場専用に開発されたプレミアム品</td></tr>
                <tr><td>ホワイトホース なごみ</td><td>40%</td><td>700ml</td><td>日本の食事に合うように設計された日本限定品</td></tr>
                <tr><td>ファインオールド（ペットボトル）</td><td>40%</td><td>2700ml／4000ml</td><td>スコットランド産ウイスキーを輸入し、日本で製造</td></tr>
                <tr><td>ホワイトホース ハイボール（缶）</td><td>6%</td><td>350ml</td><td>原産地 日本</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※キリン「ホワイトホース」「ホワイトホース なごみ」の各ページ、Diageo Japan のブランド一覧より（{off.checked_at}確認）。希望小売価格は公式ページに記載がないため掲載していません。「特級」「デラックス」「ローガン」「エクストラファイン」「ティンキャップ」は公式ページに記載のない、ヤフオクの出品タイトルの表記です。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>容量と度数を確認する</strong>: 700ml・40%（現行の容量）と、750ml・760ml・43%の表記がある古いボトルでは価格帯が異なりました。ラベルの表記を控えてください。</li>
            <li><strong>キャップとラベルの写真を用意する</strong>: ティンキャップや特級表記のボトルは、写真があると業者が年代を判断しやすくなります。</li>
            <li><strong>まとめて売る場合は内訳を伝える</strong>: ヤフオクでは他の銘柄と組み合わせたセット出品も多く見られました（当サイトの集計からは除いています）。業者には銘柄と本数を1本ずつ伝えてください。</li>
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
            <li>キリン「<a href={off.kirin} className={linkCls} rel="noopener" target="_blank">ホワイトホース</a>」「<a href={off.kirin_nagomi} className={linkCls} rel="noopener" target="_blank">ホワイトホース なごみ</a>」（{off.checked_at}確認）</li>
            <li>Diageo「<a href={off.diageo} className={linkCls} rel="noopener" target="_blank">Diageo Japan</a>」のブランド一覧（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yTok?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/chivas-regal-18-kaitori/" className={linkCls}>シーバスリーガル18年の買取相場</Link></li>
              <li><Link href="/articles/johnnie-walker-kaitori/" className={linkCls}>ジョニーウォーカーの買取相場</Link></li>
              <li><Link href="/articles/grants-kaitori/" className={linkCls}>グランツの買取相場</Link></li>
              <li><Link href="/articles/dewars-kaitori/" className={linkCls}>デュワーズの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
