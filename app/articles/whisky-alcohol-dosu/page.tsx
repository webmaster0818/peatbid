import type { Metadata } from "next";
import Link from "next/link";

// 「ウイスキー アルコール度数」受け皿（2026-11-07 新規・手書き）。
// 独自データ = data/brands.csv の abv 列（2026-11-07 時点の51銘柄）を集計。
// ⚠️ 集計値は下の ROWS から計算する（本文の件数を手で書き換えない）。
// ⚠️ brands.csv の値のうち公式と食い違ったもの（駒ヶ岳 43→45・アードベッグ 54→54.2／57→57.1）は
//    ここでは公式値で集計し、csv 自体は変更していない。1本ごと・リリースごとに度数が異なる銘柄等は EXCLUDED に分けた。

const CHECKED = "2026年11月7日";
const UPDATED = "2026-11-07";

export const metadata: Metadata = {
  title: "ウイスキーのアルコール度数は何度？40〜46%が主流｜法律上の定義と当サイト掲載41銘柄の度数一覧【2026年11月】",
  description:
    "ウイスキーのアルコール度数は、瓶詰め時40〜46%の商品が中心で、加水しないボトルは50〜60%台になります。当サイト掲載銘柄の公式表記度数の集計（41銘柄・2026年11月7日時点）、酒税法・スコッチ・バーボンの度数に関する規定、売却時の注意点をご説明します。",
  alternates: { canonical: "/articles/whisky-alcohol-dosu/" },
};

type Row = { slug: string; name: string; cat: "JP" | "SC"; abv: number };

// data/brands.csv の abv 列（公式と食い違った3銘柄は公式値に修正済み）
const ROWS: Row[] = [
  { slug: "yamazaki-nv", name: "山崎ノンエイジ", cat: "JP", abv: 43 },
  { slug: "yamazaki-12", name: "山崎12年", cat: "JP", abv: 43 },
  { slug: "yamazaki-18", name: "山崎18年", cat: "JP", abv: 43 },
  { slug: "yamazaki-25", name: "山崎25年", cat: "JP", abv: 43 },
  { slug: "yamazaki-55", name: "山崎55年", cat: "JP", abv: 46 },
  { slug: "hibiki-nv", name: "響ジャパニーズハーモニー", cat: "JP", abv: 43 },
  { slug: "hibiki-17", name: "響17年", cat: "JP", abv: 43 },
  { slug: "hibiki-21", name: "響21年", cat: "JP", abv: 43 },
  { slug: "hibiki-30", name: "響30年", cat: "JP", abv: 43 },
  { slug: "hakushu-nv", name: "白州ノンエイジ", cat: "JP", abv: 43 },
  { slug: "hakushu-12", name: "白州12年", cat: "JP", abv: 43 },
  { slug: "hakushu-18", name: "白州18年", cat: "JP", abv: 43 },
  { slug: "hakushu-25", name: "白州25年", cat: "JP", abv: 43 },
  { slug: "taketsuru-pure", name: "竹鶴ピュアモルト", cat: "JP", abv: 43 },
  { slug: "taketsuru-17", name: "竹鶴17年", cat: "JP", abv: 43 },
  { slug: "taketsuru-21", name: "竹鶴21年", cat: "JP", abv: 43 },
  { slug: "taketsuru-25", name: "竹鶴25年", cat: "JP", abv: 43 },
  { slug: "yoichi-nv", name: "余市ノンエイジ", cat: "JP", abv: 45 },
  { slug: "yoichi-10", name: "余市10年", cat: "JP", abv: 45 },
  { slug: "yoichi-15", name: "余市15年", cat: "JP", abv: 45 },
  { slug: "yoichi-20", name: "余市20年", cat: "JP", abv: 52 },
  { slug: "miyagikyo-nv", name: "宮城峡ノンエイジ", cat: "JP", abv: 45 },
  { slug: "miyagikyo-12", name: "宮城峡12年", cat: "JP", abv: 45 },
  { slug: "miyagikyo-15", name: "宮城峡15年", cat: "JP", abv: 45 },
  { slug: "karuizawa-12", name: "軽井沢12年", cat: "JP", abv: 40 },
  { slug: "chichibu-the-first", name: "秩父ザファースト", cat: "JP", abv: 61.8 },
  { slug: "mars-komagatake", name: "マルス駒ヶ岳", cat: "JP", abv: 45 },
  { slug: "macallan-12", name: "マッカラン12年", cat: "SC", abv: 40 },
  { slug: "macallan-18", name: "マッカラン18年", cat: "SC", abv: 43 },
  { slug: "macallan-25", name: "マッカラン25年", cat: "SC", abv: 43 },
  { slug: "macallan-30", name: "マッカラン30年", cat: "SC", abv: 43 },
  { slug: "bowmore-18", name: "ボウモア18年", cat: "SC", abv: 43 },
  { slug: "bowmore-25", name: "ボウモア25年", cat: "SC", abv: 43 },
  { slug: "springbank-15", name: "スプリングバンク15年", cat: "SC", abv: 46 },
  { slug: "springbank-21", name: "スプリングバンク21年", cat: "SC", abv: 46 },
  { slug: "ardbeg-uigeadail", name: "アードベッグ ウーガダール", cat: "SC", abv: 54.2 },
  { slug: "ardbeg-corryvreckan", name: "アードベッグ コリーヴレッカン", cat: "SC", abv: 57.1 },
  { slug: "glenfarclas-25", name: "グレンファークラス25年", cat: "SC", abv: 43 },
  { slug: "balvenie-portwood-21", name: "バルヴェニー ポートウッド 21年", cat: "SC", abv: 40 },
  { slug: "glenmorangie-signet", name: "グレンモーレンジ シグネット", cat: "SC", abv: 46 },
  { slug: "glenfarclas-105", name: "グレンファークラス105", cat: "SC", abv: 60 },
];

// 集計から外した銘柄（当サイトのデータは単一の値だが、1本ごと・リリースごとに度数が異なる銘柄、または公式表記を確認できなかった銘柄）
const EXCLUDED: { slug: string; name: string; reason: string }[] = [
  { slug: "ichirosu-card", name: "イチローズモルト カードシリーズ", reason: "シリーズ名で、カードごとに別のボトルのため" },
  { slug: "hanyu-card", name: "羽生カードシリーズ", reason: "シリーズ名で、カードごとに別のボトルのため" },
  { slug: "bowmore-blackbowmore", name: "ブラックボウモア", reason: "エディションにより40.5〜50%と異なるため（当サイトのブラックボウモアのページで出典つきで掲載）" },
  { slug: "macallan-fine-rare", name: "マッカラン ファイン&レア", reason: "蒸留年の異なる複数のボトルを含む名称のため" },
  { slug: "karuizawa-30", name: "軽井沢30年", reason: "蒸溜所が閉鎖されており、当サイトのデータ値を公式情報で確認できなかったため" },
  { slug: "talisker-25", name: "タリスカー25年", reason: "当サイトのデータ値を、公式情報で確認できなかったため" },
  { slug: "laphroaig-25", name: "ラフロイグ25年", reason: "当サイトのデータ値を、公式情報で確認できなかったため" },
  { slug: "glenfiddich-30", name: "グレンフィディック30年", reason: "当サイトのデータ値を、公式情報で確認できなかったため" },
  { slug: "ichirosu-mwr", name: "イチローズモルト MWR", reason: "当サイトのデータ値を、公式情報で確認できなかったため" },
  { slug: "ichirosu-double-distilleries", name: "イチローズモルト ダブルディスティラリーズ", reason: "当サイトのデータ値を、公式情報で確認できなかったため" },
];

const TOTAL_TRACKED = ROWS.length + EXCLUDED.length; // 51

const BINS: { label: string; test: (v: number) => boolean }[] = [
  { label: "40%", test: (v) => v < 43 },
  { label: "43%", test: (v) => v >= 43 && v < 45 },
  { label: "45〜46%", test: (v) => v >= 45 && v < 48 },
  { label: "48%以上", test: (v) => v >= 48 },
];

const dist = BINS.map((b) => {
  const hit = ROWS.filter((r) => b.test(r.abv));
  return {
    label: b.label,
    total: hit.length,
    jp: hit.filter((r) => r.cat === "JP").length,
    sc: hit.filter((r) => r.cat === "SC").length,
    names: hit,
  };
});
const N = ROWS.length;
const pct = (n: number) => `${Math.round((n / N) * 1000) / 10}%`;
const mainstream = ROWS.filter((r) => r.abv >= 40 && r.abv <= 46).length;
const at43 = ROWS.filter((r) => r.abv === 43).length;
const sortedAbv = [...ROWS].map((r) => r.abv).sort((a, b) => a - b);
const median = N % 2 ? sortedAbv[(N - 1) / 2] : (sortedAbv[N / 2 - 1] + sortedAbv[N / 2]) / 2;
const maxRow = ROWS.reduce((a, b) => (b.abv > a.abv ? b : a));
const jpN = ROWS.filter((r) => r.cat === "JP").length;
const scN = ROWS.filter((r) => r.cat === "SC").length;

const href = (slug: string) => `/articles/${slug}-kaitori/`;
const A = "text-amber-dark underline hover:text-burgundy";

// 公式サイトで度数を確認した例（2026年11月7日確認）
const OFFICIAL: { name: string; abv: string; slug?: string; src: string; srcLabel: string; note?: string }[] = [
  { name: "山崎12年", abv: "43%", slug: "yamazaki-12", src: "https://products.suntory.co.jp/d/4901777188914/", srcLabel: "サントリー 商品情報" },
  { name: "山崎25年", abv: "43%", slug: "yamazaki-25", src: "https://products.suntory.co.jp/d/4901777347700/", srcLabel: "サントリー 商品情報" },
  { name: "白州（ノンエイジ）", abv: "43%", slug: "hakushu-nv", src: "https://products.suntory.co.jp/d/4901777233911/", srcLabel: "サントリー 商品情報" },
  { name: "響 JAPANESE HARMONY", abv: "43%", slug: "hibiki-nv", src: "https://products.suntory.co.jp/d/4901777270688/", srcLabel: "サントリー 商品情報" },
  { name: "響21年", abv: "43%", slug: "hibiki-21", src: "https://products.suntory.co.jp/d/4901777040427/", srcLabel: "サントリー 商品情報" },
  { name: "シングルモルト駒ヶ岳", abv: "45%", slug: "mars-komagatake", src: "https://www.hombo.co.jp/product/mars-singlemalt-komagatake/", srcLabel: "本坊酒造 製品情報", note: "当サイトのデータは43%だったため、公式表記の45%で集計" },
  { name: "アードベッグ ウーガダール", abv: "54.2%", slug: "ardbeg-uigeadail", src: "https://www.ardbeg.com/en-int/products/ardbeg-uigeadail", srcLabel: "Ardbeg 公式", note: "当サイトのデータは54%（端数省略）" },
  { name: "アードベッグ コリーヴレッカン", abv: "57.1%", slug: "ardbeg-corryvreckan", src: "https://www.ardbeg.com/en-int/products/ardbeg-corryvreckan", srcLabel: "Ardbeg 公式", note: "当サイトのデータは57%（端数省略）" },
  { name: "サントリーウイスキー角瓶（参考・当サイト掲載外）", abv: "40%", src: "https://products.suntory.co.jp/d/4901777284289/", srcLabel: "サントリー 商品情報" },
];

const SOURCES: { label: string; url: string }[] = [
  { label: "e-Gov 法令検索「酒税法」（昭和28年法律第6号）第2条・第3条第1号・第3条第15号", url: "https://laws.e-gov.go.jp/law/328AC0000000006" },
  { label: "legislation.gov.uk「The Scotch Whisky Regulations 2009」regulation 3", url: "https://www.legislation.gov.uk/uksi/2009/2890/regulation/3" },
  { label: "eCFR 27 CFR 5.143（Whisky）", url: "https://www.ecfr.gov/current/title-27/chapter-I/subchapter-A/part-5/subpart-I/section-5.143" },
  { label: "サントリー 商品情報「山崎12年 700ml瓶」（アルコール度数・純アルコール量）", url: "https://products.suntory.co.jp/d/4901777188914/" },
  { label: "サントリー 商品情報「角瓶 700ml瓶」（アルコール度数・純アルコール量）", url: "https://products.suntory.co.jp/d/4901777284289/" },
  { label: "Glenfarclas「105 Cask Strength」", url: "https://www.glenfarclas.com/whisky/105-cask-strength/" },
  { label: "本坊酒造「シングルモルト駒ヶ岳」", url: "https://www.hombo.co.jp/product/mars-singlemalt-komagatake/" },
  { label: "Ardbeg「Ardbeg Uigeadail」", url: "https://www.ardbeg.com/en-int/products/ardbeg-uigeadail" },
  { label: "Ardbeg「Ardbeg Corryvreckan」", url: "https://www.ardbeg.com/en-int/products/ardbeg-corryvreckan" },
  { label: "バイセル「お酒買取」（開封品の扱い）", url: "https://buysell-kaitori.com/liquor/" },
];

const faqs = [
  {
    q: "ウイスキーのアルコール度数は何度ですか？",
    a: `瓶詰め時の度数は40〜46%の商品が中心です。当サイト掲載銘柄のうち公式表記の度数を1つに確定できる${N}銘柄を集計したところ（${CHECKED}時点）、${mainstream}銘柄（${pct(mainstream)}）が40〜46%に収まり、最も多いのは43%（${at43}銘柄）でした。50〜60%台のボトルもあり、当サイトのデータでは${maxRow.name}の${maxRow.abv}%が最も高い値です。`,
  },
  {
    q: "日本の法律でウイスキーの最低アルコール度数は決まっていますか？",
    a: "酒税法第3条第15号のウイスキーの定義には、蒸留の際の留出時のアルコール分が95度未満であることなどの要件がありますが、瓶詰め時の度数の下限は定められていません（当サイトで条文を確認した範囲）。なお、同法第2条では、酒類はアルコール分1度以上の飲料と定義されています。",
  },
  {
    q: "スコッチウイスキーは40%未満では販売できないのですか？",
    a: "英国の Scotch Whisky Regulations 2009（regulation 3）は、スコッチウイスキーの要件の一つとして「最低アルコール度数40%」を定めています。40%を下回るものは、同規則上のスコッチウイスキーには該当しません。",
  },
  {
    q: "バーボンなどアメリカンウイスキーの度数の決まりは？",
    a: "米国の連邦規則 27 CFR 5.143 は、ウイスキーを「40 percent alcohol by volume (80° proof) 以上で瓶詰め」と定めています。バーボンを含む主要な種類には、蒸留時160プルーフ以下、樽詰め時125プルーフ以下という基準もあります（同条の表）。",
  },
  {
    q: "「43度」と「43%」は同じ意味ですか？",
    a: "同じです。酒税法第3条第1号は、アルコール分を「温度15度の時において原容量100分中に含有するエチルアルコールの容量」と定義しており、度数は容量パーセント（%）と同じ値になります。米国の表記で使う proof（プルーフ）は、27 CFR 5.143 の「40 percent alcohol by volume (80° proof)」のとおり、%の2倍の数字です。",
  },
  {
    q: "度数が高いボトルほど高く売れますか？",
    a: "度数そのものが買取価格を決めるわけではありません。買取価格は銘柄・熟成年数・流通量・状態で決まります。ただし、同じ銘柄名でもエディションや仕様によって度数が異なる場合があり、ラベルの度数表記はボトルを特定する手がかりになります。査定を依頼する際は、ラベルの度数も含めて正確にお伝えください。",
  },
  {
    q: "開封済みのウイスキーは度数が下がるので売れなくなりますか？",
    a: "当サイトでは、開封後の度数の変化を数値で示した公的な資料を確認できていないため、数値は掲載していません。買取については、バイセルが公式サイトで「開封済みのお酒は、いつ開封されたかの判断が難しい」「品質が劣化する可能性があるため、買取できないことがほとんど」としています。対応は業者によって異なるため、開封済みのボトルは事前に各業者へご確認ください。",
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
  { id: "data", label: `1. 当サイト掲載${N}銘柄の度数の分布（独自集計）` },
  { id: "official", label: "2. 公式サイトで確認した度数の例" },
  { id: "law", label: "3. 法律上の定義（日本・スコットランド・米国）" },
  { id: "why", label: "4. 銘柄によって度数が違う理由（加水と瓶詰め度数）" },
  { id: "pure-alcohol", label: "5. 1杯あたりの純アルコール量" },
  { id: "sell", label: "6. 売却時の注意（度数表記と開封済みボトル）" },
  { id: "list", label: `7. 掲載${N}銘柄の度数一覧` },
  { id: "faq", label: "8. よくある質問" },
];

export default function WhiskyAlcoholDosuPage() {
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
            <li><span className="text-foreground">ウイスキーのアルコール度数</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">
            ウイスキーのアルコール度数は何度？40〜46%が主流｜法律上の定義と当サイト掲載{N}銘柄の度数一覧
          </h1>
          <p className="text-warm-gray text-sm mb-6">
            最終更新: {UPDATED} ／ 編集: <Link href="/editorial/" className={A}>PeatBid編集部</Link>（<Link href="/methodology/" className={A}>集計方法</Link>）
          </p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">ウイスキーのアルコール度数の目安</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>瓶詰め時の度数は<strong>40〜46%</strong>の商品が中心です。当サイト掲載{N}銘柄では{mainstream}銘柄（{pct(mainstream)}）がこの範囲で、最も多いのは<strong>43%（{at43}銘柄）</strong>、中央値も{median}%でした。</li>
              <li>50%を超えるボトルもあり、<strong>50〜60%台</strong>の銘柄があります（例: アードベッグ ウーガダール 54.2%、コリーヴレッカン 57.1%＝いずれも公式表記）。</li>
              <li>日本の酒税法のウイスキーの定義には、<strong>瓶詰め時の度数の下限はありません</strong>（蒸留時の留出アルコール分95度未満などの要件）。スコッチは<strong>40%以上</strong>、米国のウイスキーは<strong>40%（80プルーフ）以上</strong>で瓶詰めすると定められています。</li>
              <li>「43度」と「43%」は同じ意味です（酒税法第3条第1号の定義による）。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className={A}>{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="data">1. 当サイト掲載{N}銘柄の度数の分布（独自集計）</h2>
          <p>
            当サイトで買取相場を掲載している{TOTAL_TRACKED}銘柄のデータ（銘柄マスタ）から、ボトルに表記されるアルコール度数を集計しました。対象は、度数を1つの値に確定できる<strong>{N}銘柄</strong>（ジャパニーズ{jpN}・スコッチ{scN}）です。集計日は{CHECKED}です。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>度数</th><th>銘柄数</th><th>割合</th><th>うちジャパニーズ</th><th>うちスコッチ</th></tr>
              </thead>
              <tbody>
                {dist.map((d) => (
                  <tr key={d.label}>
                    <td><strong>{d.label}</strong></td>
                    <td>{d.total}</td>
                    <td>{pct(d.total)}</td>
                    <td>{d.jp}</td>
                    <td>{d.sc}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>合計</strong></td>
                  <td>{N}</td>
                  <td>100%</td>
                  <td>{jpN}</td>
                  <td>{scN}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="not-prose my-6 space-y-2" aria-hidden="true">
            {dist.map((d) => (
              <div key={d.label} className="flex items-center gap-3 text-sm">
                <span className="w-20 shrink-0 text-ink/80">{d.label}</span>
                <span className="flex-1 bg-cream rounded h-4 overflow-hidden">
                  <span className="block h-4 bg-amber rounded" style={{ width: `${(d.total / N) * 100}%` }} />
                </span>
                <span className="w-16 shrink-0 text-right text-warm-gray">{d.total}銘柄</span>
              </div>
            ))}
          </div>

          <p>集計から読み取れることは次のとおりです。</p>
          <ul>
            <li><strong>43%が最多</strong>: 山崎・白州・響・竹鶴の掲載銘柄は、すべて43%です（山崎55年を除く）。</li>
            <li><strong>45%はニッカの2蒸溜所に多い</strong>: 余市・宮城峡のノンエイジ・10〜15年は45%です。余市20年は52%です。</li>
            <li><strong>48%以上の5銘柄</strong>は、
              {dist[3].names.map((r, i) => (
                <span key={r.slug}>{i > 0 && "・"}<Link href={href(r.slug)}>{r.name}</Link>（{r.abv}%）</span>
              ))}
              です。
            </li>
            <li><strong>40%の3銘柄</strong>は、
              {dist[0].names.map((r, i) => (
                <span key={r.slug}>{i > 0 && "・"}<Link href={href(r.slug)}>{r.name}</Link></span>
              ))}
              です。
            </li>
          </ul>

          <p className="text-sm">
            <strong>集計から外した{EXCLUDED.length}銘柄</strong>: 当サイトのデータでは度数を1つの値で持っていますが、次の理由で集計の対象外としました。
          </p>
          <ul className="text-sm">
            {EXCLUDED.map((e) => (
              <li key={e.slug}><Link href={href(e.slug)}>{e.name}</Link> — {e.reason}</li>
            ))}
          </ul>
          <p className="text-xs text-warm-gray">
            ※集計方法: 当サイトの銘柄マスタ（各銘柄ページの基本情報の元データ）の度数を使用しています。公式サイトで確認できた銘柄のうち、当サイトのデータと異なっていた3銘柄（シングルモルト駒ヶ岳・アードベッグ2銘柄）は公式表記の値で集計しました。同じ銘柄名でも、発売時期や容量によって度数が異なるボトルが流通している場合があります。お手元のボトルの度数は、ラベルの表記をご確認ください。
          </p>

          <h2 id="official">2. 公式サイトで確認した度数の例</h2>
          <p>当サイトが{CHECKED}にメーカーの公式サイトで確認した度数です。</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>銘柄</th><th>公式表記の度数</th><th>出典</th></tr>
              </thead>
              <tbody>
                {OFFICIAL.map((o) => (
                  <tr key={o.name}>
                    <td>{o.slug ? <Link href={href(o.slug)} className={A}>{o.name}</Link> : o.name}{o.note && <span className="block text-xs text-warm-gray">{o.note}</span>}</td>
                    <td><strong>{o.abv}</strong></td>
                    <td><a href={o.src} target="_blank" rel="noopener noreferrer nofollow" className={A}>{o.srcLabel}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            サントリーの商品情報では、山崎・白州・響の掲載商品はいずれも43%、角瓶は40%と表記されています。アードベッグの2銘柄は、公式サイトでノンエイジ（熟成年数の表記なし）・ノンチルフィルタードと記載されています。
          </p>

          <h2 id="law">3. 法律上の定義（日本・スコットランド・米国）</h2>
          <h3>日本：酒税法</h3>
          <p>
            酒税法第3条第15号は、ウイスキーを「発芽させた穀類及び水を原料として糖化させて、発酵させたアルコール含有物を蒸留したもの（当該アルコール含有物の蒸留の際の留出時のアルコール分が九十五度未満のものに限る。）」などと定義しています。同号ハでは、これらに「アルコール、スピリッツ、香味料、色素又は水」を加えたものもウイスキーに含めており、その場合は原酒のアルコール分の総量が、加えた後のアルコール分の総量の<strong>100分の10以上</strong>であることが条件です。
          </p>
          <p>
            当サイトで条文を確認した範囲では、<strong>瓶詰め時のアルコール度数の下限は定められていません</strong>。度数に関する定めは蒸留時（95度未満）と上記の割合です。なお、同法第2条は酒類を「アルコール分一度以上の飲料」と定義し、第3条第1号はアルコール分を「温度十五度の時において原容量百分中に含有するエチルアルコールの容量」と定義しています（＝「度」と「%」は同じ値）。
          </p>
          <h3>スコットランド：Scotch Whisky Regulations 2009</h3>
          <p>
            英国の Scotch Whisky Regulations 2009 の regulation 3(1) は、スコッチウイスキーの要件として、アルコール度数94.8%未満で蒸留すること（(b)）、添加してよいのは水と普通カラメル色素のみであること（(h)）、<strong>最低アルコール度数が40%であること（(i)）</strong>などを定めています。
          </p>
          <h3>米国：27 CFR 5.143</h3>
          <p>
            米国の連邦規則 27 CFR 5.143(a) は、ウイスキーを、穀物の発酵もろみを95%未満（190プルーフ）で蒸留し、オーク樽で貯蔵し（コーンウイスキーを除く）、<strong>40%（80プルーフ）以上で瓶詰め</strong>したものと定義しています。バーボンなどの種類については、同条の表で蒸留時160プルーフ以下、新しい内側を焦がしたオーク樽に125プルーフ以下で詰めることが定められています。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>区分</th><th>瓶詰め時の下限</th><th>蒸留時の上限</th><th>根拠</th></tr>
              </thead>
              <tbody>
                <tr><td>日本（ウイスキー）</td><td>定めなし（酒類は1度以上）</td><td>95度未満</td><td>酒税法 第2条・第3条第15号</td></tr>
                <tr><td>スコッチウイスキー</td><td>40%</td><td>94.8%未満</td><td>Scotch Whisky Regulations 2009 reg.3(1)</td></tr>
                <tr><td>米国のウイスキー</td><td>40%（80プルーフ）</td><td>95%未満（バーボン等は160プルーフ＝80%以下）</td><td>27 CFR 5.143</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="why">4. 銘柄によって度数が違う理由（加水と瓶詰め度数）</h2>
          <p>
            上記のとおり、日本の酒税法・スコッチの規則のいずれも、ウイスキーに<strong>水を加えること</strong>を認めています。瓶詰め時の度数は、メーカーが加水の量で決めており、同じ蒸溜所でも商品によって度数が異なります（例: 余市のノンエイジ・10年・15年は45%、余市20年は52%＝当サイトのデータ）。
          </p>
          <p>
            当サイト掲載銘柄で度数が50%を超えるのは、<Link href={href("yoichi-20")}>余市20年</Link>（52%）、アードベッグの2銘柄（54.2%・57.1%）、<Link href={href("glenfarclas-105")}>グレンファークラス105</Link>（60%）、<Link href={href("chichibu-the-first")}>秩父ザファースト</Link>（61.8%）の5銘柄です。このうちグレンファークラス105は、メーカー公式サイトの製品名が「105 Cask Strength」（カスクストレングス＝樽出しの度数を意味する呼び方）となっています。
          </p>

          <h2 id="pure-alcohol">5. 1杯あたりの純アルコール量</h2>
          <p>
            サントリーの商品情報は、純アルコール量を「容量(ml) × アルコール分(%)/100 × 0.8」で計算して表示しています。同社の表示では、<strong>43%のウイスキーは30mlあたり10.3g</strong>（山崎12年）、<strong>40%は30mlあたり9.6g</strong>（角瓶）です。同じ式で計算すると、当サイト掲載銘柄の度数ごとの値は次のとおりです。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>度数</th><th>30mlあたり</th><th>700ml（1本）あたり</th><th>当サイト掲載の例</th></tr>
              </thead>
              <tbody>
                {[
                  { abv: 40, ex: "マッカラン12年" },
                  { abv: 43, ex: "山崎12年・響21年" },
                  { abv: 46, ex: "スプリングバンク15年" },
                  { abv: 54.2, ex: "アードベッグ ウーガダール" },
                  { abv: 60, ex: "グレンファークラス105" },
                ].map((r) => (
                  <tr key={r.abv}>
                    <td>{r.abv}%</td>
                    <td>{(Math.round(30 * r.abv / 100 * 0.8 * 10) / 10).toFixed(1)}g</td>
                    <td>{(Math.round(700 * r.abv / 100 * 0.8 * 10) / 10).toFixed(1)}g</td>
                    <td>{r.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※サントリー商品情報の計算式による計算値です。飲酒量の目安については、医療機関・公的機関の情報をご確認ください。20歳未満の方の飲酒は法律で禁止されています。</p>

          <h2 id="sell">6. 売却時の注意（度数表記と開封済みボトル）</h2>
          <ul>
            <li>
              <strong>ラベルの度数はボトルの特定に役立ちます</strong>。たとえば<Link href={href("bowmore-blackbowmore")}>ブラックボウモア</Link>はエディションにより40.5〜50%と度数が異なり、<Link href="/articles/ardbeg-nv-kaitori/">アードベッグ</Link>のノンエイジ銘柄も度数で区別できます。査定を依頼する際は、銘柄名・熟成年数とあわせて度数もお伝えください。
            </li>
            <li>
              <strong>開封済みのボトル</strong>: バイセルは公式サイトで、開封済みのお酒は「いつ開封されたかの判断が難しい」「品質が劣化する可能性があるため、買取できないことがほとんど」としています。対応は業者により異なるため、事前に確認が必要です。開封後の度数の変化について、当サイトでは数値で示した公的な資料を確認できていないため、具体的な数値は掲載していません。
            </li>
            <li>
              <strong>未開封でも保管状態は査定に影響します</strong>。液面の低下やラベルの傷みは減額の要因になります。保管の基本は<Link href="/articles/whisky-hokan-houhou/">ウイスキーの保管方法</Link>にまとめています。
            </li>
          </ul>
          <p>
            売却の流れと業者の選び方は<Link href="/articles/whisky-sell-guide/">ウイスキーを売る方法</Link>、銘柄ごとの相場は<Link href="/articles/whisky-kaitori-souba/">ウイスキー買取相場</Link>でご確認いただけます。
          </p>

          <h2 id="list">7. 掲載{N}銘柄の度数一覧</h2>
          <p>第1章の集計に使用した{N}銘柄です（度数の高い順）。銘柄名から各銘柄の買取相場ページへ移動できます。</p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>銘柄</th><th>区分</th><th>度数</th></tr>
              </thead>
              <tbody>
                {[...ROWS].sort((a, b) => b.abv - a.abv || a.name.localeCompare(b.name, "ja")).map((r) => (
                  <tr key={r.slug}>
                    <td><Link href={href(r.slug)} className={A}>{r.name}</Link></td>
                    <td>{r.cat === "JP" ? "ジャパニーズ" : "スコッチ"}</td>
                    <td>{r.abv}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

          <div className="not-prose border-t border-warm-border pt-6 mt-10">
            <p className="font-semibold text-ink mb-2 text-sm">出典（{CHECKED}確認）</p>
            <ul className="text-xs text-warm-gray space-y-1 list-disc pl-5">
              {SOURCES.map((s) => (
                <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className={A}>{s.label}</a></li>
              ))}
              <li>当サイト掲載銘柄の度数: PeatBid 銘柄マスタ（{CHECKED}時点・<Link href="/methodology/" className={A}>集計方法</Link>）</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/whisky-kaitori-souba/" className={A}>ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-sell-guide/" className={A}>ウイスキーを売る方法</Link></li>
              <li><Link href="/articles/whisky-hokan-houhou/" className={A}>ウイスキーの保管方法</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className={A}>ウイスキーを高く売るコツ</Link></li>
              <li><Link href="/articles/ardbeg-nv-kaitori/" className={A}>アードベッグの買取相場（ノンエイジ）</Link></li>
              <li><Link href="/articles/bowmore-blackbowmore-kaitori/" className={A}>ブラックボウモアの買取相場（エディション別の度数）</Link></li>
            </ul>
          </div>

          <p className="text-xs text-warm-gray not-prose">
            ※本記事は公開されている法令・メーカー公式情報と当サイトの銘柄データにもとづく一般的な情報です。法令の解釈・適用については、所管の官公庁または専門家にご確認ください。
          </p>
        </article>
      </div>
    </>
  );
}
