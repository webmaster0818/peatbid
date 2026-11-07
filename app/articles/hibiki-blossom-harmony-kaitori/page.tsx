import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import bh from "./data.json";
import medians from "@/data/yahoo-medians.json";

// 2026-11-07 新設。「響 ブロッサムハーモニー」（推定256/月）の受け皿。
// ⚠️ 年版ごとの定価・発売日・容量・度数は、サントリー公式（ニュースリリース No.13828、響 MEMBERS CLUB の抽選販売案内ページ、
//    2026年版の公式特設サイト）で確認した値のみ。現在閲覧できない公式ページは Internet Archive の保存版で原文を確認した。
// ⚠️ 相場は ./data.json（ヤフオク実落札・タイトル絞り込み→IQR→中央値・n>=20のみ表示）。取得時に残したタイトルを目視確認済み。
// ⚠️ シリーズの終了について公式発表は確認できていない。確認できるまで「終売」と書かない。

type EditionRec = {
  edition: string;
  median: number | null;
  filtered_n: number;
  insufficient: boolean;
  fetched_at: string;
  query: string;
};
const editions = (bh as unknown as { editions: Record<string, EditionRec> }).editions;
const fetchedAt = (bh as unknown as { fetched_at: string }).fetched_at;

type MedianRec = { median?: number; filtered_n?: number; fetched_at?: string; insufficient?: boolean };
const nv = (medians as unknown as Record<string, MedianRec | undefined>)["hibiki-nv"];
const nvOk = nv && nv.insufficient !== true && typeof nv.median === "number" ? nv : null;

const fmt = (v: number) => `${Math.round(v).toLocaleString("ja-JP")}円`;
const rec = (year: string): EditionRec | null => {
  const r = editions[year];
  return r && r.insufficient !== true && typeof r.median === "number" && r.filtered_n >= 20 ? r : null;
};
const yen = (year: string): string => {
  const r = rec(year);
  return r ? fmt(r.median!) : "データ不足";
};

const ARCHIVE = "https://web.archive.org/web";

type Official = {
  year: string;
  priceInclTax: number;
  priceNote?: string;
  release: string;
  limited: string;
  lottery: string;
  design: string;
  sources: { label: string; url: string; archived?: string }[];
};

// 公式情報（年版別）。デザインの説明は 2026年版 公式特設サイトの「歴代の装い」から要約。
const official: Official[] = [
  {
    year: "2021",
    priceInclTax: 8800,
    priceNote: "ニュースリリースでは希望小売価格 8,000円（税別）",
    release: "2021年5月25日（火）・全国",
    limited: "数量限定",
    lottery: "響 MEMBERS CLUB で抽選販売 500本（2021年4月12日〜5月6日）、追加抽選 500本（2021年9月6日〜10月4日）",
    design: "祝い膳を思わせる円形に、四季の花々「百花」を配した装い",
    sources: [
      { label: "サントリー ニュースリリース No.13828（2021年1月8日）", url: "https://www.suntory.co.jp/news/article/13828.html" },
      { label: "響 MEMBERS CLUB 抽選販売のご案内（2021年4月）", url: "https://www.suntory.co.jp/whisky/hibiki/member/21041201/", archived: `${ARCHIVE}/20210412054443/https://www.suntory.co.jp/whisky/hibiki/member/21041201/` },
      { label: "響 MEMBERS CLUB 追加抽選販売のご案内（2021年9月）", url: "https://www.suntory.co.jp/whisky/hibiki/member/21090601/", archived: `${ARCHIVE}/20210906075409/https://www.suntory.co.jp/whisky/hibiki/member/21090601/` },
    ],
  },
  {
    year: "2022",
    priceInclTax: 11000,
    release: "2022年5月24日（火）",
    limited: "数量限定",
    lottery: "抽選販売 1,000本（2022年3月29日〜4月20日）、追加抽選 1,000本（2022年8月2日〜9月7日）",
    design: "八角形の皿をかたちに、松皮菱と季節の花々を重ねた装い",
    sources: [
      { label: "響 MEMBERS CLUB 抽選販売（1,000本限定）のご案内", url: "https://www.suntory.co.jp/whisky/hibiki/member/22032901/", archived: `${ARCHIVE}/20220329072734/https://www.suntory.co.jp/whisky/hibiki/member/22032901/` },
      { label: "響 MEMBERS CLUB 追加抽選販売（1,000本限定）のご案内", url: "https://www.suntory.co.jp/whisky/hibiki/member/22080201/", archived: `${ARCHIVE}/20250115053612/https://www.suntory.co.jp/whisky/hibiki/member/22080201/` },
    ],
  },
  {
    year: "2023",
    priceInclTax: 11000,
    release: "2023年5月30日（火）",
    limited: "数量限定",
    lottery: "抽選販売 2回（2023年3月14日〜4月19日）、追加抽選 2回（2023年7月26日〜9月5日）。本数の記載なし",
    design: "松皮菱に吉祥の花々を組み合わせた装い",
    sources: [
      { label: "響 MEMBERS CLUB 抽選販売のご案内", url: "https://www.suntory.co.jp/whisky/hibiki/member/23031401/", archived: `${ARCHIVE}/20230314012515/https://www.suntory.co.jp/whisky/hibiki/member/23031401/` },
      { label: "響 MEMBERS CLUB 追加抽選販売のご案内", url: "https://www.suntory.co.jp/whisky/hibiki/member/23072601/", archived: `${ARCHIVE}/20250217031437/https://www.suntory.co.jp/whisky/hibiki/member/23072601/` },
    ],
  },
  {
    year: "2024",
    priceInclTax: 13200,
    release: "2024年5月28日（火）",
    limited: "数量限定",
    lottery: "抽選販売 2回（2024年3月14日〜4月18日）。本数の記載なし",
    design: "「呼継ぎ」に着想を得て、桐竹鳳凰や桜、牡丹などの文様を重ねた装い",
    sources: [
      { label: "響 MEMBERS CLUB 抽選販売のご案内", url: "https://www.suntory.co.jp/whisky/hibiki/member/24031401/", archived: `${ARCHIVE}/20240331050728/https://www.suntory.co.jp/whisky/hibiki/member/24031401/` },
    ],
  },
  {
    year: "2025",
    priceInclTax: 13200,
    release: "2025年5月27日（火）",
    limited: "数量限定",
    lottery: "抽選販売 2回（2025年3月17日〜4月17日）。本数の記載なし",
    design: "孔雀牡丹や青海波、亀甲などの吉祥文様を重ねた装い",
    sources: [
      { label: "響 MEMBERS CLUB 抽選販売のご案内", url: "https://www.suntory.co.jp/whisky/hibiki/member/25031701/", archived: `${ARCHIVE}/20250317054018/https://www.suntory.co.jp/whisky/hibiki/member/25031701/` },
    ],
  },
  {
    year: "2026",
    priceInclTax: 14300,
    release: "公式特設サイトに発売日の記載なし",
    limited: "公式特設サイトに数量限定の記載なし",
    lottery: "当サイトが確認した範囲では、抽選販売の案内ページは見当たりません",
    design: "牡丹や菊、鷹などの吉祥文様をやわらかな曲線の中に重ねた装い",
    sources: [
      { label: "響 BLOSSOM HARMONY 公式特設サイト（2026年版）", url: "https://www.suntory.co.jp/whisky/hibiki/information/bh2026/", archived: `${ARCHIVE}/20260606115120/https://www.suntory.co.jp/whisky/hibiki/information/bh2026/` },
    ],
  },
];

const years = official.map((o) => o.year);
const ratio = (o: Official): string | null => {
  const r = rec(o.year);
  return r ? `${(r.median! / o.priceInclTax).toFixed(2)}倍` : null;
};
const withData = years.filter((y) => rec(y));
const later = withData.filter((y) => y !== "2021").map((y) => rec(y)!.median!);
const laterMin = later.length ? Math.min(...later) : null;
const laterMax = later.length ? Math.max(...later) : null;

export const metadata: Metadata = {
  title: "響 ブロッサムハーモニーの買取相場【2026年11月】2021〜2026年版の落札中央値と定価",
  description: `響 ブロッサムハーモニーの買取相場です。ヤフオク落札中央値は2021年版${yen("2021")}・2022年版${yen("2022")}・2023年版${yen("2023")}・2024年版${yen("2024")}・2025年版${yen("2025")}・2026年版${yen("2026")}（${fetchedAt}取得）。公式の定価・発売日も掲載しています。`,
  alternates: { canonical: "/articles/hibiki-blossom-harmony-kaitori/" },
};

const faqs = [
  {
    q: "響 ブロッサムハーモニーの買取相場はいくらですか？",
    a: `年版によって異なります。当サイト集計（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値・取得日 ${fetchedAt}）では、2021年版${yen("2021")}、2022年版${yen("2022")}、2023年版${yen("2023")}、2024年版${yen("2024")}、2025年版${yen("2025")}、2026年版${yen("2026")}です。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`,
  },
  {
    q: "響 ブロッサムハーモニーの定価（希望小売価格）はいくらですか？",
    a: "サントリー公式の記載では、いずれも700ml・アルコール度数43度で、税込価格は2021年版8,800円（ニュースリリースでは税別8,000円）、2022年版11,000円、2023年版11,000円、2024年版13,200円、2025年版13,200円、2026年版14,300円です。",
  },
  {
    q: "響 ブロッサムハーモニーは終売になりましたか？",
    a: `2026年版は公式特設サイトで商品名・価格（14,300円・税込）が案内されています。シリーズを終了するという公式発表は、${fetchedAt}時点で当サイトが確認した範囲では見当たりません。今後の発売予定についても公式発表は確認できていません。`,
  },
  {
    q: "どの年版がいちばん高く取引されていますか？",
    a: rec("2021")
      ? `当サイト集計では、初回の2021年版が${yen("2021")}で最も高い水準です。2022年版以降は${laterMin && laterMax ? `${fmt(laterMin)}〜${fmt(laterMax)}` : "データ収集中"}の範囲に収まっており、年版による差は2021年版ほど大きくありません。2021年版は定価が最も安く（税込8,800円）、響 MEMBERS CLUB での抽選販売は公式案内で500本×2回でした（2022年版は1,000本×2回。2023年版以降は本数の記載なし）。なお、抽選販売の本数は生産本数ではありません。`
      : "年版別の実勢データは現在集計中です。",
  },
  {
    q: "手元のボトルが何年版か分かりません。",
    a: "商品名に年版（2021〜2026）が入っています。化粧箱やラベルの年表記を確認してください。公式特設サイトによると、年版ごとに装い（文様）が異なり、2021年版は「百花」、2022年版は八角形と松皮菱、2023年版は松皮菱と吉祥の花々、2024年版は桐竹鳳凰や桜・牡丹、2025年版は孔雀牡丹・青海波・亀甲、2026年版は牡丹・菊・鷹の文様です。",
  },
  {
    q: "箱なし・開封済みでも買取してもらえますか？",
    a: "箱なしは多くの業者で買取対象です。開封済みは、買取できないとする業者もあります。減額の幅は業者ごとに異なり、当サイトでは根拠のある数値を確認できていないため、割合は掲載していません。化粧箱や冊子が残っていれば一緒に査定に出し、事前に各業者へ確認してください。",
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
  { id: "current-price", label: "1. 年版別の実勢価格と定価（ヤフオク落札中央値）" },
  { id: "official", label: "2. 公式情報で確認した年版ごとの発売情報" },
  { id: "series", label: "3. シリーズの継続・終売について" },
  { id: "miwakekata", label: "4. 手元のボトルが何年版かの見分け方" },
  { id: "jotai", label: "5. 箱なし・開封済みの扱い" },
  { id: "takaku-uru", label: "6. 売却前に確認したいこと" },
  { id: "method", label: "7. 相場データの集計方法" },
  { id: "faq", label: "8. よくある質問" },
  { id: "sources", label: "9. 出典" },
];

export default function HibikiBlossomHarmonyKaitoriPage() {
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
            <li><Link href="/articles/hibiki-kaitori/" className="hover:text-amber-dark transition-colors">響 買取</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">響 BLOSSOM HARMONY 買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hibiki.png" alt="響の買取相場（イメージ）" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">響 ブロッサムハーモニー（BLOSSOM HARMONY）の買取相場｜2021〜2026年版の実勢価格と定価</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">響 BLOSSOM HARMONY の買取相場の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>当サイト集計の実勢中央値（取得日 {fetchedAt}）: 2021年版 <strong>{yen("2021")}</strong> ／ 2022年版 <strong>{yen("2022")}</strong> ／ 2023年版 <strong>{yen("2023")}</strong> ／ 2024年版 <strong>{yen("2024")}</strong> ／ 2025年版 <strong>{yen("2025")}</strong> ／ 2026年版 <strong>{yen("2026")}</strong></li>
              <li>初回の<strong>2021年版が最も高い水準</strong>です。2022年版以降は{laterMin && laterMax ? <>{fmt(laterMin)}〜{fmt(laterMax)}</> : "集計中"}の範囲に収まっています。</li>
              <li>いずれの年版も、落札中央値がサントリー公式の税込価格を上回っています。</li>
              <li>掲載額は<strong>ヤフオクの実落札中央値＝市場価格</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="text-amber-dark hover:text-burgundy underline">{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="current-price">1. 年版別の実勢価格と定価</h2>
          <p>
            ヤフオク過去180日の実落札価格から、出品タイトルで該当年版の単品（700ml）に絞り込み、IQRで外れ値を除いた中央値です（取得日 {fetchedAt}）。
            <strong>n（件数）が20件未満の年版は数値を出していません。</strong>サンプルが少ない中央値は相場として扱えないためです。
            定価はサントリー公式に記載された税込価格です。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>年版</th><th>実勢中央値</th><th>サンプル数</th><th>公式の税込価格</th><th>定価との比</th></tr>
              </thead>
              <tbody>
                {official.map((o) => {
                  const r = rec(o.year);
                  return (
                    <tr key={o.year}>
                      <td><strong>響 BLOSSOM HARMONY {o.year}</strong></td>
                      <td>{yen(o.year)}</td>
                      <td>{r ? `n=${r.filtered_n}件` : "—"}</td>
                      <td>{fmt(o.priceInclTax)}</td>
                      <td>{ratio(o) ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※これは<strong>落札された市場価格</strong>であって、買取業者の提示額ではありません。買取額は業者の手数料・在庫状況によりこれを下回るのが一般的です。
            「定価との比」は実勢中央値を公式の税込価格で割った値です。
          </p>
          <p>
            2021年版は定価が最も安い一方で、実勢中央値は最も高くなっています。2022年版以降は定価が11,000円から14,300円へ段階的に上がっていますが、実勢中央値は年版による差が小さく、定価との比は新しい年版ほど小さくなっています。
            {nvOk && (
              <>
                参考として、通常品の<Link href="/articles/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy">響 JAPANESE HARMONY</Link>の実勢中央値は <strong>{fmt(nvOk.median!)}</strong>（n={nvOk.filtered_n}件・取得日 {nvOk.fetched_at}）です。
              </>
            )}
          </p>

          <h2 id="official">2. 公式情報で確認した年版ごとの発売情報</h2>
          <p>
            以下は、サントリーのニュースリリース、響 MEMBERS CLUB の抽選販売案内ページ、2026年版の公式特設サイトに記載された内容です。
            現在は閲覧できない公式ページについては、Internet Archive に保存された当時のページで原文を確認しました。容量はいずれも<strong>700ml</strong>、アルコール度数はいずれも<strong>43度</strong>です。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>年版</th><th>発売日</th><th>税込価格</th><th>販売形態</th><th>抽選販売（公式案内）</th></tr>
              </thead>
              <tbody>
                {official.map((o) => (
                  <tr key={o.year}>
                    <td><strong>{o.year}</strong></td>
                    <td>{o.release}</td>
                    <td>{fmt(o.priceInclTax)}{o.priceNote && <><br /><span className="text-xs text-warm-gray">{o.priceNote}</span></>}</td>
                    <td>{o.limited}</td>
                    <td>{o.lottery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            2021年版のニュースリリースでは、「響」ブランドで初めて桜樽で後熟させた「桜樽フィニッシュ原酒」をブレンドした、ギフト向けの数量限定品と説明されています。
            2026年版の公式特設サイトでは、ブレンドのアクセントを「桜樽」で後熟させた長期熟成グレーン原酒と説明しています。
            2024年版・2025年版・2026年版の公式ページには、日本洋酒酒造組合の定めるジャパニーズウイスキーの表示基準に合致した製品である旨が記載されています。
          </p>

          <h2 id="series">3. シリーズの継続・終売について</h2>
          <p>
            響 BLOSSOM HARMONY は2021年から毎年発売されており、2026年版も公式特設サイトで価格（14,300円・税込）が案内されています。
            <strong>シリーズを終了するという公式発表は、{fetchedAt}時点で当サイトが確認した範囲では見当たりません。</strong>
            一方で、2027年以降の発売予定についての公式発表も確認できていません。新しい情報を確認した場合は、このページを更新します。
          </p>

          <h2 id="miwakekata">4. 手元のボトルが何年版かの見分け方</h2>
          <p>
            商品名に年版が入っているため、化粧箱やラベルの年表記を確認してください。年版を取り違えると査定額に影響します。2026年版の公式特設サイトでは、年版ごとの装いを次のように紹介しています（要約）。
          </p>
          <ul>
            {official.map((o) => (
              <li key={o.year}><strong>{o.year}年版</strong> … {o.design}</li>
            ))}
          </ul>
          <p>
            判別できない場合は、正面・裏ラベル・キャップ・化粧箱の写真を用意して買取業者に見てもらうのが確実です。
            人気銘柄の偽物については<Link href="/articles/hibiki-nisemono-mikata/" className="text-amber-dark underline hover:text-burgundy">響の偽物・贋作の見分け方</Link>にまとめています。
          </p>

          <h2 id="jotai">5. 箱なし・開封済みの扱い</h2>
          <p>
            箱なしは多くの業者で買取対象ですが、開封済みは買取できないとする業者もあります。減額の幅は業者ごとに異なり、当サイトでは根拠のある数値を確認できていないため、割合は掲載していません。化粧箱や冊子が部分的にでも残っていれば、一緒に査定へ出してください。
          </p>
          <p>
            響 BLOSSOM HARMONY は化粧箱のデザインも年版ごとに異なるギフト向けの商品です。当サイトが集計した落札データ（6年版・タイトル絞り込み後459件）では、約半数の235件が出品タイトルに「箱」を含んでいました（タイトルに書かれていない出品にも箱付きのものがあるため、箱の有無の比率ではありません）。
          </p>

          <h2 id="takaku-uru">6. 売却前に確認したいこと</h2>
          <ol>
            <li><strong>年版を確認する</strong>（2021年版とそれ以降で相場の水準が異なります）</li>
            <li><strong>化粧箱・冊子を揃える</strong></li>
            <li><strong>未開封のまま売る</strong></li>
            <li><strong>複数本ある場合は年版ごとに査定を依頼する</strong>（年版の異なるボトルをまとめた出品は、当サイトの集計から除外しています）</li>
            <li><strong>複数業者で相見積もりを取る</strong></li>
            <li><strong>直射日光を避け、縦置きで保管する</strong></li>
          </ol>
          <p>
            業者ごとの比較は<Link href="/articles/hibiki-kaitori/" className="text-amber-dark underline hover:text-burgundy">響の買取相場（全銘柄）</Link>と<Link href="/articles/whisky-takaku-uru/" className="text-amber-dark underline hover:text-burgundy">ウイスキーを高く売るコツ</Link>をご覧ください。
          </p>

          <h2 id="method">7. 相場データの集計方法</h2>
          <ul>
            <li><strong>データ源</strong>: ヤフオクの落札済み検索（過去180日）。年版ごとに「響 ブロッサムハーモニー {"{年}"} 700ml」で検索し、最大3ページ（150件）を取得しました。</li>
            <li><strong>絞り込み</strong>: タイトルに「ブロッサム（BLOSSOM）」と該当年を含む出品のみを残し、他の年を含む出品、空瓶・箱のみ・ミニチュア、セット・まとめ売り・複数本、700ml以外の容量を除外しました。</li>
            <li><strong>目視確認</strong>: 残った出品タイトルを全件確認し、別商品との同梱出品（響 BLENDER&apos;S CHOICE との2本出品など）と、他銘柄名を列挙した出品を追加で除外しています。</li>
            <li><strong>中央値</strong>: IQR（四分位範囲）の1.5倍を超える外れ値を除いた中央値です。n が20件未満の年版は数値を出しません。</li>
            <li><strong>取得日</strong>: {fetchedAt}。このページの数値は自動更新ではありません。</li>
          </ul>

          <h2 id="faq">8. よくある質問</h2>
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

          <h2 id="sources">9. 出典</h2>
          <ul className="text-sm">
            {official.flatMap((o) =>
              o.sources.map((s) => (
                <li key={s.url}>
                  {o.year}年版: <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-amber-dark underline hover:text-burgundy">{s.label}</a>
                  {s.archived && (
                    <> （<a href={s.archived} target="_blank" rel="noopener noreferrer" className="text-amber-dark underline hover:text-burgundy">Internet Archive 保存版</a>）</>
                  )}
                </li>
              ))
            )}
            <li>相場: ヤフオク 落札済み検索（取得日 {fetchedAt}・当サイト集計）</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/hibiki-kaitori/" className="text-amber-dark hover:text-burgundy underline">響の買取相場（NV・17年・21年・30年）</Link></li>
              <li><Link href="/articles/hibiki-nv-kaitori/" className="text-amber-dark hover:text-burgundy underline">響 JAPANESE HARMONY の買取相場</Link></li>
              <li><Link href="/articles/hibiki-17-kaitori/" className="text-amber-dark hover:text-burgundy underline">響17年の買取相場</Link></li>
              <li><Link href="/articles/hibiki-21-kaitori/" className="text-amber-dark hover:text-burgundy underline">響21年の買取相場</Link></li>
              <li><Link href="/articles/hibiki-nisemono-mikata/" className="text-amber-dark hover:text-burgundy underline">響の偽物・贋作の見分け方</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
