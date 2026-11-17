import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-17 新規「ウイスキー 空き瓶 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値・2026-11-17 取得）のみ。
//    fetch-yahoo-medians.py の closedsearch・extract_items・iqr_filter を /tmp の補助から import（本体は未変更）。
//    JUNK_RE は「空き瓶」を除外するため使わず、空き瓶・空瓶・空ボトルを含むタイトルだけを残す独自フィルタで集計。
//    中身のない空き瓶の「1本出品」だけ（箱付き・箱なし）。複数本・セット・まとめ売り・ミニボトル・陶器/意匠ボトル・
//    750ml の旧ボトル・空箱のみ・中身入りは除外。n>=20 の区分だけ中央値。マッカラン18年・25年は年代の異なるボトルが
//    混在するため n>=20 でも中央値を出さない。
// 規則・制度は国税庁 Q&A（Q1 酒類の定義・Q5 フリマ出品と販売業免許）、メルカリ ガイド、ヤフオク お知らせ、
// リンクサス公式の空き瓶ページのみ（2026-11-17 確認）。空き瓶の出品・売買を「違法」等と断定する記述は書かない。
// 偽造品への転用の話は /articles/whisky-nisemono-miwakekata/ と重ねず短くし、リンクで誘導する。

type Sub = {
  title_filtered_n: number;
  filtered_n: number;
  raw_n?: number;
  raw_min?: number | null;
  raw_max?: number | null;
  min: number | null;
  max: number | null;
};

type Agg = {
  label: string;
  query: string;
  fetched_at: string;
  raw_n: number;
  title_filtered_n: number;
  filtered_n: number;
  median: number | null;
  q1: number | null;
  q3: number | null;
  min: number | null;
  max: number | null;
  raw_min: number;
  raw_max: number;
  insufficient: boolean;
  mixed?: boolean;
  end_date_from: string | null;
  end_date_to: string | null;
  box: Sub;
  nobox: Sub;
  vintage?: Sub;
  modern?: Sub;
};

const Y = data.yahoo as unknown as Record<string, Agg>;
const off = data.official;
const mk = data.market;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null | undefined) => (d ? d.replace(/-/g, "/") : "—");
// 型ガードにすると else 側が never になる（11/14 の build エラーと同じ）ため boolean を返す
const ok = (a: Agg | undefined): boolean =>
  !!a &&!a.insufficient && !a.mixed && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => {
  const a = Y[k];
  return ok(a) ? yenFmt(a.median as number) : null;
};
const rawRange = (lo: number | null | undefined, hi: number | null | undefined) =>
  typeof lo === "number" && typeof hi === "number" ? (lo === hi ? yenFmt(lo) : `${yenFmt(lo)}〜${yenFmt(hi)}`) : "—";
const subRange = (s: Sub | undefined) => (s ? rawRange(s.raw_min ?? s.min, s.raw_max ?? s.max) : "—");
const subN = (s: Sub | undefined) => (s ? s.raw_n ?? s.title_filtered_n : 0);

const fetchedAt = mk.fetched_at;
const yH21 = Y["hibiki-21"];
const yY18 = Y["yamazaki-18"];
const yH30 = Y["hibiki-30"];
const yM18 = Y["macallan-18"];
const yM25 = Y["macallan-25"];
const queries = yH21?.query ?? "";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `ウイスキーの空き瓶は売れる？響21年 ${med("hibiki-21") ?? "集計中"}・山崎18年 ${med("yamazaki-18") ?? "集計中"}の落札相場と注意点【2026年11月】`,
  description: `ウイスキーの空き瓶はヤフオクで落札されています。中身のない1本出品の落札中央値は響21年${med("hibiki-21") ?? "集計中"}・山崎18年${med("yamazaki-18") ?? "集計中"}・響30年${med("hibiki-30") ?? "集計中"}（${fetchedAt.replace(/-/g, "/")}取得）。箱の有無による差、出品時の規則と注意点をご説明します。`,
  alternates: { canonical: "/articles/whisky-akibin-kaitori/" },
};

const faqs = [
  {
    q: "ウイスキーの空き瓶は本当に売れますか？",
    a: `ヤフオクでは、山崎・響・白州・マッカランなどの空き瓶が落札されています。当サイトが ${fetchedAt} に取得した落札済みオークションのうち、出品タイトルに「空き瓶」「空瓶」「空ボトル」とある出品は${mk.empty_titles}件でした。ただし、値が付くのは年数表記のある銘柄や限定品が中心です。1円〜数百円で落札された出品もあり、すべての空き瓶に値が付くわけではありません。`,
  },
  {
    q: "響21年や山崎18年の空き瓶はいくらですか？",
    a: ok(yH21) && ok(yY18)
      ? `中身のない1本出品の落札中央値は、響21年が${med("hibiki-21")}（n=${yH21.filtered_n}件）、山崎18年が${med("yamazaki-18")}（n=${yY18.filtered_n}件）でした（取得日 ${fetchedAt}）。落札された市場価格であり、買取業者の提示額ではありません。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "箱（化粧箱）があると高くなりますか？",
    a: `今回の集計では、山崎18年の空き瓶は箱付きが${subN(yY18?.box)}件で${subRange(yY18?.box)}、箱なし・箱の記載なしが${subN(yY18?.nobox)}件で${subRange(yY18?.nobox)}でした。響21年も箱付き（${subRange(yH21?.box)}）のほうが、箱なし・箱の記載なし（${subRange(yH21?.nobox)}）より高い価格帯に集まっていました。いずれも20件未満のため、中央値は出していません。箱は捨てずに残しておくことをおすすめします。`,
  },
  {
    q: "空き瓶をメルカリやヤフオクに出品するのに免許は要りますか？",
    a: "国税庁のQ&Aでは、酒税法上の酒類を「アルコール分1度以上の飲料」と定義しています。フリマサイトなどで継続して酒類を出品・販売する場合は販売業免許が必要で、家庭で不要になった酒類を出品するような場合は不要とされています。空き瓶そのものの扱いを名指しした記載は、当サイトが確認した国税庁・メルカリ・ヤフオクのページには見当たりませんでした。中身が残っている瓶を出品する場合は、酒類の出品として扱われる可能性があります。判断に迷う場合は、所轄の税務署やサービスの窓口にご確認ください。",
  },
  {
    q: "買取業者は空き瓶を買い取ってくれますか？",
    a: "業者によって対応が異なります。お酒買取のリンクサスは、公式の空き瓶ページで山崎・響などのウイスキーの空き瓶を買取対象としています。一方で、同じページでシャンパンの空き瓶・空箱は買取対象外、中身が残っているお酒は査定対象外と記載しています。空き瓶を扱わない業者もあるため、査定を依頼する前に各社の公式ページでご確認ください。",
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
  { id: "price", label: "1. 銘柄別の空き瓶の落札価格" },
  { id: "box", label: "2. 箱の有無による価格差" },
  { id: "kaitori", label: "3. 買取業者の対応" },
  { id: "rules", label: "4. 出品時の規則（国税庁・メルカリ・ヤフオク）" },
  { id: "chui", label: "5. 売る前の確認事項" },
  { id: "faq", label: "6. よくある質問" },
  { id: "sources", label: "7. 出典・集計方法" },
];

const rows: { key: string; name: string }[] = [
  { key: "hibiki-21", name: "響21年" },
  { key: "yamazaki-18", name: "山崎18年" },
  { key: "hibiki-30", name: "響30年" },
  { key: "hakushu-18", name: "白州18年" },
  { key: "yamazaki-25", name: "山崎25年" },
  { key: "hakushu-25", name: "白州25年" },
  { key: "macallan-18", name: "マッカラン18年" },
  { key: "macallan-25", name: "マッカラン25年" },
  { key: "macallan-30", name: "マッカラン30年" },
];

export default function WhiskyAkibinKaitoriPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/" className="hover:text-amber-dark transition-colors">記事一覧</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">ウイスキー 空き瓶 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ウイスキーの空き瓶は売れる？山崎・響・マッカランの空ボトルのヤフオク落札相場と注意点</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">空き瓶の落札状況の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>ヤフオクでは、飲み終えたウイスキーの<strong>空き瓶が落札されています</strong>。当サイトの取得分では、出品タイトルに「空き瓶」「空瓶」「空ボトル」とある落札済みの出品が{mk.empty_titles}件ありました。</li>
              {ok(yH21) && ok(yY18) && (
                <li>中身のない1本出品の落札中央値は、<strong>響21年 {med("hibiki-21")}</strong>（n={yH21.filtered_n}件）、<strong>山崎18年 {med("yamazaki-18")}</strong>（n={yY18.filtered_n}件）{ok(yH30) && <>、<strong>響30年 {med("hibiki-30")}</strong>（n={yH30.filtered_n}件）</>}でした。</li>
              )}
              <li>山崎18年・響21年は、<strong>箱付きのほうが高い価格帯</strong>に集まっていました。</li>
              <li>値が付くのは年数表記のある銘柄や限定品が中心です。1円〜数百円で落札された空き瓶もあります。</li>
              <li>掲載額は<strong>落札された市場価格</strong>です。買取業者の提示額ではありません。</li>
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

          <h2 id="price">1. 銘柄別の空き瓶の落札価格</h2>
          <p>
            ヤフオクの落札済みオークションを「{queries}」の{queries.split("／").length}つの語で検索し、重複を除いた{yH21?.raw_n}件のうち、出品タイトルに「空き瓶」「空瓶」「空ボトル」とある{mk.empty_titles}件を1件ずつ確認しました。
            このうち{mk.set_like}件は、複数本のセットやまとめ売りでした。1本あたりの価格が分からないため、下の表からは除いています。
          </p>
          <p>
            表は、銘柄と年数が出品タイトルから読み取れる<strong>中身のない空き瓶の1本出品</strong>（箱付き・箱なしを含む）だけの集計です。
            ミニボトル、陶器・意匠ボトル、容量750mlの旧ボトル、空箱だけの出品、中身が残っている出品は除きました。
            IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>空き瓶（1本）</th><th>落札中央値</th><th>件数</th><th>中央の半数／範囲</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong></td>
                      <td>{ok(a) ? yenFmt(a.median as number) : a.mixed ? "年代混在のため掲載なし" : "データ不足（n<20）"}</td>
                      <td>n={ok(a) ? a.filtered_n : a.title_filtered_n}件</td>
                      <td>{ok(a) ? `${yenFmt(a.q1 as number)}〜${yenFmt(a.q3 as number)}` : `範囲 ${rawRange(a.raw_min, a.raw_max)}`}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}。検索1回あたり最大150件のため、銘柄により約1〜6か月分の落札です。
            中央値を掲載した区分の件数は外れ値除去後、範囲のみの区分の件数と範囲は外れ値除去前の値です。
            銘柄・年数・箱の有無は出品タイトルの表記で、当サイトがボトルを確認したものではありません。
          </p>
          <p>
            マッカラン18年は、出品タイトルに1970〜1990年代の年号がある旧いボトル（{subN(yM18?.vintage)}件・{subRange(yM18?.vintage)}）と、
            2021〜2024年などの表記がある現行のボトルや年号表記のない出品（{subN(yM18?.modern)}件・{subRange(yM18?.modern)}）で価格帯が大きく異なりました。
            マッカラン25年も、年代・仕様の異なるボトルが混在しています（{yM25?.title_filtered_n ?? 0}件・{rawRange(yM25?.raw_min, yM25?.raw_max)}）。
            件数は20件を超えていますが、1つの中央値で表すと実態とかけ離れるため、掲載していません。
          </p>

          <h2 id="box">2. 箱の有無による価格差</h2>
          <p>
            出品タイトルに「箱付」「空箱」「化粧箱」「カートン」などの記載がある出品と、それ以外（「箱なし」と明記、または箱の記載なし）に分けた結果は次のとおりです。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>銘柄</th><th>箱付き</th><th>箱なし・記載なし</th></tr>
              </thead>
              <tbody>
                {[{ k: "yamazaki-18", n: "山崎18年" }, { k: "hibiki-21", n: "響21年" }].map(({ k, n }) => {
                  const a = Y[k];
                  if (!a) return null;
                  return (
                    <tr key={k}>
                      <td><strong>{n}</strong></td>
                      <td>{subN(a.box)}件・{subRange(a.box)}</td>
                      <td>{subN(a.nobox)}件・{subRange(a.nobox)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※いずれも20件未満のため、中央値は出していません。範囲は外れ値除去前の値です（取得日 {fetchedAt}）。</p>
          <p>
            山崎18年では、箱付き13件のうち12件が7,500円以上で落札され、箱なし・記載なしの9件はすべて7,900円以下でした。
            響21年では、箱付き15件のうち14件が8,500〜12,110円に集まり、箱なし・記載なしの10件には21円・310円で落札されたものも含まれていました。
            空き瓶を売る可能性がある場合は、化粧箱・冊子・外箱を一緒に保管しておくことをおすすめします。
          </p>

          <h2 id="kaitori">3. 買取業者の対応</h2>
          <p>
            空き瓶を買い取るかどうかは業者によって異なります。お酒買取のリンクサスは、公式の空き瓶ページで、山崎・響などのウイスキーやブランデーの空き瓶を買取対象と案内しています。
            同じページでは、シャンパンの空き瓶・空箱は買取対象外、中身のお酒が残っている状態は衛生面などの理由から査定対象外と記載しています。
          </p>
          <p>
            中身入りのボトルを専門に扱い、空き瓶は扱わない業者もあります。査定を依頼する前に、各社の公式ページで空き瓶の扱いを確認してください。
            上の落札額は個人間の取引の結果であり、業者の買取額はここから手数料等を引いた水準になります。
          </p>

          <h2 id="rules">4. 出品時の規則（国税庁・メルカリ・ヤフオク）</h2>
          <ul>
            <li><strong>酒類の定義（国税庁）</strong>: 国税庁のQ&Aでは、酒税法上の酒類を「アルコール分1度以上の飲料」と説明しています。</li>
            <li><strong>フリマ・オークションでの出品（国税庁）</strong>: 継続して酒類を出品・販売する場合は販売業免許が必要で、家庭で不要になった酒類を出品するような、通常継続的な販売に当たらない場合は不要とされています。</li>
            <li><strong>メルカリ</strong>: ガイドの「禁止されている行為」で、免許を受けずに継続的に酒類を出品することを禁止しています。家庭で不要になった酒類は出品できると記載しています。</li>
            <li><strong>ヤフオク</strong>: お知らせ「アルコール（酒類）を出品されるお客様へ」で、個人の出品であっても継続して酒類を販売する場合は販売業免許が必要と案内しています。</li>
          </ul>
          <p>
            2026年11月17日に確認した国税庁・メルカリ・ヤフオクの上記ページと、メルカリの「禁止されている出品物」の一覧には、お酒の<strong>空き瓶</strong>を名指しした記載は見当たりませんでした。
            中身が少しでも残っている瓶は、酒類の出品として扱われる可能性があります。出品するときは中身を残さず、出品文に「空き瓶」「中身なし」と明記してください。
            規則は改定されることがあるため、出品前に各サービスのガイドで最新の内容をご確認ください。
          </p>

          <h2 id="chui">5. 売る前の確認事項</h2>
          <ul>
            <li><strong>空き瓶と分かるように出品する</strong>: 出品タイトルと説明文に「空き瓶」「中身なし」と書き、写真でも中身がないことが分かるようにしてください。</li>
            <li><strong>箱・冊子を一緒に出す</strong>: 第2章のとおり、箱付きの出品は高い価格帯に集まっていました。</li>
            <li><strong>割れ・欠けに注意して梱包する</strong>: リンクサスの空き瓶ページでは、口元や底の小さな欠けでも評価が下がると案内しています。緩衝材で包んで発送してください。</li>
            <li><strong>偽物との見分け方</strong>: 中身入りのボトルを売買する際の確認ポイントは、<Link href="/articles/whisky-nisemono-miwakekata/" className={linkCls}>ウイスキーの偽物の見分け方</Link>にまとめています。</li>
            <li><strong>中身入りのボトルは別の扱い</strong>: 未開栓のボトルを売る場合は、<Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る前の基礎ガイド</Link>と<Link href="/articles/whisky-kaitori-zeikin/" className={linkCls}>ウイスキー買取の税金</Link>をご覧ください。</li>
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
            <li>国税庁「<a href={off.nta_q1} className={linkCls} rel="noopener" target="_blank">お酒に関するQ&A Q1 酒類の定義</a>」「<a href={off.nta_q5} className={linkCls} rel="noopener" target="_blank">【販売業免許関係】Q5 フリマサイトやインターネットオークション等への出品</a>」（{off.checked_at}確認）</li>
            <li>メルカリ ガイド「<a href={off.mercari_895} className={linkCls} rel="noopener" target="_blank">製造や販売にあたり、法令上許可・届出・免許等が必要な商品について…（禁止されている行為）</a>」「<a href={off.mercari_259} className={linkCls} rel="noopener" target="_blank">禁止されている出品物</a>」（{off.checked_at}確認）</li>
            <li>Yahoo!オークション お知らせ「<a href={off.yahoo_notice} className={linkCls} rel="noopener" target="_blank">アルコール（酒類）を出品されるお客様へ</a>」（{off.checked_at}確認）</li>
            <li>リンクサス「<a href={off.linxas} className={linkCls} rel="noopener" target="_blank">空き瓶・空ボトル買取</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{queries}」。出品タイトルを目視で確認し、中身のない空き瓶の1本出品だけをIQR外れ値除去後の中央値で集計。n&lt;20の区分は中央値を出しません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/whisky-nisemono-miwakekata/" className={linkCls}>ウイスキーの偽物の見分け方</Link></li>
              <li><Link href="/articles/hibiki-21-kaitori/" className={linkCls}>響21年の買取相場</Link></li>
              <li><Link href="/articles/yamazaki-18-kaitori/" className={linkCls}>山崎18年の買取相場</Link></li>
              <li><Link href="/articles/macallan-18-kaitori/" className={linkCls}>マッカラン18年の買取相場</Link></li>
              <li><Link href="/articles/whisky-hokan-houhou/" className={linkCls}>ウイスキーの保管方法</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={linkCls}>ウイスキーを売る前の基礎ガイド</Link></li>
              <li><Link href="/articles/furui-whisky-kachi/" className={linkCls}>古いウイスキーに価値はある？</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
