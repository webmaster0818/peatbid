import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

type MedianRec = { median?: number; filtered_n?: number; fetched_at?: string; insufficient?: boolean };
const m = medians as unknown as Record<string, MedianRec | undefined>;

const rec = (key: string): MedianRec | null => {
  const r = m[key];
  return r && r.insufficient !== true && typeof r.median === "number" ? r : null;
};
const yen = (key: string): string | null => {
  const r = rec(key);
  return r ? `${Math.round(r.median!).toLocaleString("ja-JP")}円` : null;
};
const nOf = (key: string): string => {
  const r = rec(key);
  return r && typeof r.filtered_n === "number" ? `n=${r.filtered_n}件` : "—";
};

const g12 = rec("glenfiddich-12");
const g30 = rec("glenfiddich-30");
const fetchedAt = g12?.fetched_at ?? g30?.fetched_at ?? "毎週月曜";

export const metadata: Metadata = {
  title: "グレンフィディック買取価格【2026年10月】12年〜50年の相場と店舗の掲示価格",
  description:
    `グレンフィディックの買取相場を、年代別に実データで掲載しています。12年${yen("glenfiddich-12") ?? "収集中"}・15年${yen("glenfiddich-15") ?? "収集中"}・18年${yen("glenfiddich-18") ?? "収集中"}・30年${yen("glenfiddich-30") ?? "収集中"}（ヤフオク実落札の中央値・毎週更新）です。3店の掲示価格（10年〜50年）、旧ボトル・陶器ボトル、年数の見分け方も掲載しています。`,
  alternates: { canonical: "/articles/glenfiddich-kaitori/" },
};

const faqs = [
  {
    q: "グレンフィディックの買取相場はいくらですか？",
    a: g12
      ? `年数によって大きく異なります。当サイト集計（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値・取得日 ${fetchedAt}）では、12年${yen("glenfiddich-12")}、15年${yen("glenfiddich-15")}、18年${yen("glenfiddich-18")}、30年${yen("glenfiddich-30") ?? "収集中"}です。同じ「グレンフィディック」でも12年と30年では20倍以上の開きがあるため、まず手元のボトルの年数を確定させてください。`
      : "実勢データは現在集計中です（毎週更新のため、近日掲載予定）。",
  },
  {
    q: "手元のグレンフィディックが何年ものか分かりません。どこを見ればいいですか？",
    a: "三角形のボトル正面ラベルの中央〜下部に「12」「15」「18」「21」「30」などの数字と「YEARS OLD」の表記があります。数字が読み取れない場合は、化粧箱・裏ラベル・肩ラベルにも年数が入っていることが多いので確認してください。それでも判別できない場合は、正面・裏・キャップ・液面の写真を用意して買取業者に判定してもらうのが確実です。",
  },
  {
    q: "グレンフィディックに年数表記のないボトルはありますか？",
    a: "あります。「IPAカスク・フィニッシュ」「プロジェクトXX」「ファイア＆ケイン」などの実験的シリーズは熟成年数を表記していません。ただしこれらは流通量が少なく、当サイトで実落札データを十分な件数（n≥20）集められていないため、本ページでは中央値の数値を掲載していません。データが集まり次第、掲載します。",
  },
  {
    q: "グレンフィディックの買取店の掲示価格はいくらですか？",
    a: "PeatBid編集部が2026-10-17に確認した LINXAS の価格表（2026年9月30日更新）では、12年 箱付1,500円、15年 箱付2,800円、18年 箱付6,000円、21年 グランレゼルヴァ 13,000円、25年 レアオーク 23,000円、30年 50,000円、40年 200,000円、50年 1,100,000円です。ヒカカク！の「最高買取相場」では30年 45,000円、40年 250,000円、50年 1,200,000円です。陶器ボトル・旧ボトルは別の価格で扱われます。",
  },
  {
    q: "箱なし・開封済みでも買取してもらえますか？",
    a: "はい、可能です。業界一般の目安として、未開封・箱なし（ラベル良好）で市場相場の80〜90%程度、開封済みで残量9割以上なら30〜40%程度が目安です（業者により評価基準は異なります）。化粧箱や冊子が部分的に残っている場合は一緒に査定に出すと評価されます。",
  },
  {
    q: "グレンフィディックを高く売るコツは？",
    a: "(1)化粧箱・冊子など付属品を揃える、(2)未開封のまま売る、(3)年数を正確に伝える（12年と18年の取り違えは査定額に直結します）、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。12年など流通量の多いボトルは業者間の差が出にくい一方、18年以上は在庫状況で査定額が動きやすくなります。",
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
  { id: "current-price", label: "1. 年代別の実勢価格（ヤフオク落札中央値・毎週更新）" },
  { id: "store-prices", label: "1-2. 買取店の掲示価格（10年〜50年・店舗別）" },
  { id: "kyu-bottle", label: "1-3. 旧ボトル・陶器ボトル・限定品の掲示価格" },
  { id: "teika", label: "1-4. 定価（希望小売価格）と日本の輸入元" },
  { id: "miwakekata", label: "2. 手元のボトルが何年ものかの見分け方" },
  { id: "nv", label: "3. 年数表記のないボトルについて" },
  { id: "jotai", label: "4. 箱なし・開封済みの扱い" },
  { id: "takaku-uru", label: "5. 高く売る5つのコツ" },
  { id: "satei", label: "6. 無料査定の使い方" },
  { id: "faq", label: "7. よくある質問" },
];

const rows: { name: string; key: string; note: string; href?: string }[] = [
  { name: "グレンフィディック12年", key: "glenfiddich-12", note: "最も流通量の多い定番" },
  { name: "グレンフィディック15年", key: "glenfiddich-15", note: "ソレラ・ヴァット由来の甘み" },
  { name: "グレンフィディック18年", key: "glenfiddich-18", note: "シェリー樽の比重が高い" },
  { name: "グレンフィディック30年", key: "glenfiddich-30", note: "長期熟成の上位ライン", href: "/articles/glenfiddich-30-kaitori/" },
];

// 2026-10-17: 買取店の掲示価格（各店の公開ページを PeatBid編集部が確認・数値は表記どおり転記）
const STORE_CHECKED = "2026-10-17";
const LX = "https://linxas.shop/whiskey/glenfidick/";
const HK = "https://hikakaku.com/category/all-category/riquor/whisky/glenfiddich/";
const FN = "https://www.sakekaitori.com/whisky/scotch_whiskey/glenfiddich_brand/";
const storeRows: { age: string; item: string; lx: string; hk: string; fn: string }[] = [
  { age: "10年", item: "10年 ピュアモルト 特級 760ml（LINXAS）／10年 750ml（ヒカカク！）", lx: "2,000円", hk: "1,500円", fn: "—" },
  { age: "12年", item: "12年（スペシャルリザーブ）", lx: "箱付 1,500円／箱無 1,200円", hk: "1,500円", fn: "2,000円（2025-05-30）" },
  { age: "15年", item: "15年（ソレラリザーブ）", lx: "箱付 2,800円／箱無 2,500円", hk: "4,000円", fn: "4,000円（2025-03-10）" },
  { age: "18年", item: "18年（スモールバッチリザーブ）", lx: "箱付 6,000円／箱無 5,000円", hk: "6,000円", fn: "6,500円（2025-02-07）" },
  { age: "18年 陶器", item: "18年 陶器ボトル（LINXAS は緑・青の各陶器ボトル）", lx: "各7,000円", hk: "8,000円", fn: "—" },
  { age: "21年", item: "21年 グランレゼルヴァ", lx: "13,000円", hk: "6,500円", fn: "15,000円（2025-01-17）" },
  { age: "21年 陶器", item: "21年 ウェッジウッド（陶器ボトル）", lx: "18,000円（完備）", hk: "20,000円（750ml）", fn: "16,000円（2025-10-01・750ml）" },
  { age: "25年", item: "25年 レアオーク", lx: "23,000円（完備）", hk: "—", fn: "—" },
  { age: "30年", item: "30年", lx: "50,000円（完備）", hk: "45,000円", fn: "—" },
  { age: "35年", item: "35年", lx: "150,000円", hk: "150,000円", fn: "—" },
  { age: "40年", item: "40年", lx: "200,000円", hk: "250,000円", fn: "—" },
  { age: "50年", item: "50年", lx: "1,100,000円", hk: "1,200,000円", fn: "—" },
];

export default function GlenfiddichKaitoriPage() {
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
            <li><span className="text-foreground">グレンフィディック 買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/glenfiddich-30.png" alt="グレンフィディックの買取相場（年代別）" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンフィディック買取｜12年〜50年の買取価格と相場（店舗の掲示価格・実勢価格）</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-31 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li><strong>買取価格（買取店の掲示）</strong>は 12年 <strong>1,200〜2,000円</strong>／15年 <strong>2,500〜4,000円</strong>／18年 <strong>5,000〜6,500円</strong>／21年 グランレゼルヴァ <strong>6,500〜15,000円</strong>／30年 <strong>45,000〜50,000円</strong>です（LINXAS 価格表 2026年9月30日更新・2026-10-31 再確認、ヒカカク！・ファイブニーズは 2026-10-17 確認。店舗別の内訳は <a href="#store-prices" className="text-amber-dark underline">1-2. 買取店の掲示価格</a>、30年の仕様別は <Link href="/articles/glenfiddich-30-kaitori/" className="text-amber-dark underline">グレンフィディック30年の買取相場</Link>）。</li>
              <li>グレンフィディックは<strong>年数によって相場が桁違い</strong>。まずラベルの「◯ YEARS OLD」を確認してください。</li>
              {g12 && (
                <li>ヤフオク実落札の中央値は<strong>12年{yen("glenfiddich-12")}／15年{yen("glenfiddich-15")}／18年{yen("glenfiddich-18")}</strong>です（毎週更新）。</li>
              )}
              {g30 && <li>30年は<strong>{yen("glenfiddich-30")}</strong>と別水準。取り違えたまま査定に出すと損をしやすいポイントです。</li>}
              <li>年数表記のない実験的シリーズ（IPAカスク等）は<strong>実データが不足しているため数値は掲載していません</strong>。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              {tocItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} className="hover:underline">{item.label}</a></li>
              ))}
            </ol>
          </div>

          <h2 id="current-price">1. 年代別の実勢価格（ヤフオク落札中央値・毎週更新）</h2>

          <p>当サイトが毎週集計している、ヤフオク!の実落札データにもとづく中央値です。同じ銘柄でも年数で水準がまったく異なることが分かります。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値</th><th>サンプル数</th><th>備考</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td>{r.href ? <Link href={r.href} className="text-amber-dark underline">{r.name}</Link> : r.name}</td>
                    <td><strong>{yen(r.key) ?? "収集中"}</strong></td>
                    <td>{nOf(r.key)}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自に集計した参考値です（取得日 {fetchedAt}・毎週月曜更新）。買取額を保証するものではなく、業者の査定額は状態・付属品・各社の在庫状況により変動します。</p>


          <h3 id="store-prices">買取店の掲示価格（10年〜50年・店舗別）</h3>

          <p>各店が自社サイトに公開しているグレンフィディックの参考買取価格を、PeatBid編集部が {STORE_CHECKED} に各ページで確認した値です。LINXAS は価格表の更新日 2026年9月30日、ヒカカク！は「最高買取相場」の表示（日付表記なし）、ファイブニーズは買取実績（括弧内が実績日）です。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">年数</th><th className="py-2 pr-3">ボトル</th><th className="py-2 pr-3 text-right">LINXAS（2026-09-30更新）</th><th className="py-2 pr-3 text-right">ヒカカク！（日付表記なし）</th><th className="py-2 text-right">ファイブニーズ（実績）</th></tr></thead>
              <tbody>
                {storeRows.map((r) => (
                  <tr key={r.age + r.item} className="border-b border-warm-border/60">
                    <td className="py-2 pr-3 whitespace-nowrap">{r.age}</td>
                    <td className="py-2 pr-3">{r.item}</td>
                    <td className="py-2 pr-3 text-right whitespace-nowrap">{r.lx}</td>
                    <td className="py-2 pr-3 text-right whitespace-nowrap">{r.hk}</td>
                    <td className="py-2 text-right">{r.fn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-warm-gray">出典: <a href={LX} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS「グレンフィディックの買取」</a>・<a href={HK} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ヒカカク！「グレンフィディックの買取相場」</a>・<a href={FN} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ファイブニーズ「グレンフィディック」</a>（{STORE_CHECKED}確認）。各店の参考価格・実績であり、実際の買取額を保証するものではありません。「—」は該当ページに掲載がないものです。</p>

          <p>2026-10-17 時点では、12年〜18年の店舗の掲示価格（12年 1,200〜2,000円・15年 2,500〜4,000円・18年 5,000〜6,500円）は、上の表のヤフオク落札中央値を下回っています。中央値は個人間の落札額で、店舗の掲示価格は店舗が買い取る際の参考額であるためです。LINXAS の掲示では、箱の有無による差は12年で300円、18年で1,000円です。30年以上は店舗による差が大きく、40年は LINXAS 200,000円・ヒカカク！ 250,000円です。</p>

          <h3 id="kyu-bottle">旧ボトル・陶器ボトル・限定品の掲示価格</h3>

          <p>現行の定番品以外にも、次のボトルに掲示価格・実績があります（{STORE_CHECKED}確認）。</p>
          <ul>
            <li><strong>ピュアモルト表記の旧ボトル</strong> — LINXAS「10年 ピュアモルト 特級 760ml」2,000円（2026-09-30更新）、ファイブニーズ「ピュアモルト スペシャル オールド リザーブ 700ml」1,800円（実績 2024-08-01）</li>
            <li><strong>18年 エンシェントリザーブ</strong>（ファイブニーズは18年の現行名を「スモールバッチリザーブ」、旧名を「エンシェントリザーブ」と説明）— ファイブニーズ 3,000円（実績 2026-02-26・750ml）</li>
            <li><strong>21年 カリビアンラム</strong> — ヒカカク！ 4,500円（700ml）</li>
            <li><strong>26年 グランデ クロンヌ</strong> — ファイブニーズ 30,000円（実績 2025-05-09・700ml）</li>
            <li><strong>30年 オールドボトル／30年 エジンバラ</strong> — ヒカカク！ 28,000円（700ml）／220,000円（750ml）</li>
            <li><strong>31年 ヴィンテージリザーブ 1968</strong> — LINXAS 200,000円</li>
            <li><strong>ヴィンテージカスク</strong> — LINXAS 4,000円、ヒカカク！「ヴィンテージカスク 1972」50,000円</li>
          </ul>
          <p>同じ年数でも、陶器ボトル・旧ボトル・限定品は通常品と別の価格で扱われます。23年 グランクリュは、今回確認した店舗のページに掲示価格がありませんでした。30年の詳しい相場は <Link href="/articles/glenfiddich-30-kaitori/" className="text-amber-dark underline">グレンフィディック30年の買取相場</Link> をご覧ください。</p>
          <p className="text-[11px] text-warm-gray">出典: <a href={LX} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a>・<a href={HK} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ヒカカク！</a>・<a href={FN} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ファイブニーズ</a>・<a href="https://www.sakekaitori.com/knowledge/260217_glenfiddich/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ファイブニーズ（18年の解説）</a></p>

          <h3 id="teika">定価（希望小売価格）と日本の輸入元</h3>

          <p>日本では、2025年1月1日からブラウンフォーマンジャパン株式会社が、ウィリアム・グラント＆サンズ社（グレンフィディックの製造元）のブランドの総代理店になっています（<a href="https://foods-ch.infomart.co.jp/news/141660" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">フーズチャネルの記事</a>）。同社が2025年5月19日に発表した限定パッケージ2025（いずれも700ml・40%・2025年5月12日出荷開始）の希望小売価格は次のとおりです。</p>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-4">商品</th><th className="py-2 pr-4 text-right">希望小売価格（税抜）</th><th className="py-2 text-right">ヤフオク中央値</th></tr></thead>
              <tbody>
                <tr className="border-b border-warm-border/60"><td className="py-2 pr-4">12年 スペシャルリザーブ</td><td className="py-2 pr-4 text-right">5,930円</td><td className="py-2 text-right">{yen("glenfiddich-12") ?? "収集中"}</td></tr>
                <tr className="border-b border-warm-border/60"><td className="py-2 pr-4">15年 ソレラリザーブ</td><td className="py-2 pr-4 text-right">9,900円</td><td className="py-2 text-right">{yen("glenfiddich-15") ?? "収集中"}</td></tr>
                <tr className="border-b border-warm-border/60"><td className="py-2 pr-4">18年 スモールバッチリザーブ</td><td className="py-2 pr-4 text-right">16,810円</td><td className="py-2 text-right">{yen("glenfiddich-18") ?? "収集中"}</td></tr>
              </tbody>
            </table>
          </div>
          <p>12年〜18年は流通量の多い現行品で、2026-10-17 時点ではヤフオク落札中央値・店舗の掲示価格とも定価を下回っています。</p>
          <p className="text-[11px] text-warm-gray">出典: <a href="https://prtimes.jp/main/html/rd/p/000000025.000137946.html" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ブラウンフォーマンジャパン 2025年5月19日（PR TIMES）</a>（{STORE_CHECKED}確認）。限定パッケージの価格で、通常パッケージの価格は同リリースに記載がありません。</p>

          <h2 id="miwakekata">2. 手元のボトルが何年ものかの見分け方</h2>

          <ol>
            <li><strong>正面ラベル中央〜下部の数字を見る</strong> — 「12」「15」「18」「21」「30」などの数字＋「YEARS OLD」が入っています</li>
            <li><strong>化粧箱・筒缶を確認する</strong> — ラベルが読めない場合も、箱側に年数が印字されている場合が多くあります</li>
            <li><strong>裏ラベル・肩ラベルも見る</strong> — 正面が摩耗していても、裏や肩に年数・度数が残っている場合があります</li>
            <li><strong>「ピュアモルト」「特級」の表記・760ml／750ml の容量</strong> — 店舗の価格表では、現行の700mlとは別の旧ボトルとして掲示されています（上記 1-3）</li>
            <li><strong>年数がどこにも無ければノンエイジ</strong> — IPAカスク等の実験的シリーズの可能性があります（後述）</li>
            <li><strong>それでも不明なら写真を添えて査定へ</strong> — 正面・裏・キャップ・液面の写真を用意し、専門知識のある業者に判定してもらうのが確実です</li>
          </ol>

          <h2 id="nv">3. 年数表記のないボトルについて</h2>

          <p>グレンフィディックには、熟成年数を表記しないシリーズもあります。代表的なものが<strong>「IPAカスク・フィニッシュ」「プロジェクトXX」「ファイア＆ケイン」</strong>などの実験的リリースです。</p>

          <p>ただし、これらは定番3本（12年・15年・18年）に比べて流通量が少なく、<strong>当サイトの集計基準（過去180日の実落札・n≥20件）を満たすデータが集まっていません</strong>。そのため、本ページではこれらの中央値を数値として掲載していません。推定値で埋めることはせず、データが集まり次第、他の年代と同じ基準で追加します。</p>

          <p>年数表記のないボトルをお持ちの場合は、<Link href="/articles/whisky-nv-toha/" className="text-amber-dark underline">ウイスキーの「年代指定なし(NV)」とは</Link> もあわせてご覧ください。</p>

          <h2 id="jotai">4. 箱なし・開封済みの扱い</h2>

          <p>業界一般の目安として、状態による減額幅はおおむね次のとおりです（業者により基準は異なります）。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>状態</th><th>市場相場に対する目安</th><th>12年の場合の目安額</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>未開封・箱あり（完品）</td>
                  <td>100%</td>
                  <td>{yen("glenfiddich-12") ?? "—"}</td>
                </tr>
                <tr>
                  <td>未開封・箱なし（ラベル良好）</td>
                  <td>80〜90%程度</td>
                  <td>{g12 ? `約${Math.round(g12.median! * 0.8).toLocaleString("ja-JP")}〜${Math.round(g12.median! * 0.9).toLocaleString("ja-JP")}円` : "—"}</td>
                </tr>
                <tr>
                  <td>開封済み・残量9割以上</td>
                  <td>30〜40%程度</td>
                  <td>{g12 ? `約${Math.round(g12.median! * 0.3).toLocaleString("ja-JP")}〜${Math.round(g12.median! * 0.4).toLocaleString("ja-JP")}円` : "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※上記は市場相場（ヤフオク中央値）に業界一般の減額率を掛けた目安であり、特定業者の買取価格ではありません。実際の査定額は必ず複数社でご確認ください。</p>

          <h2 id="takaku-uru">5. グレンフィディックを高く売る5つのコツ</h2>

          <ol>
            <li><strong>化粧箱・冊子など付属品を揃える</strong> — 完品と箱なしで1〜2割の差が出ます</li>
            <li><strong>未開封のまま売る</strong> — 開封済みは大幅減額の傾向です</li>
            <li><strong>年数を正確に伝える</strong> — 12年と18年の取り違えは査定額に直結します</li>
            <li><strong>複数業者で相見積もりを取る</strong> — 18年以上は在庫状況で査定額が動きやすく、差が出ます</li>
            <li><strong>保管状態を整える</strong> — 直射日光を避け、温度変化の少ない場所で縦置きで保管してください。液面低下・ラベル褪色は減額要因です</li>
          </ol>

          <h2 id="satei">6. 無料査定の使い方</h2>

          <p>12年など流通量の多いボトルは相場が安定している一方、18年・30年は業者ごとの在庫状況で査定額が変わります。<strong>一括査定で相場感を掴んでから、専門店の個別査定と比較する</strong>のが効率的です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">グレンフィディックの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2 id="faq">7. よくある質問</h2>

          <div className="space-y-3 not-prose">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>

          <h2>グレンフィディックの関連ページ</h2>
          <ul>
            <li><Link href="/articles/glenfiddich-30-kaitori/" className="text-amber-dark hover:underline font-bold">グレンフィディック30年の買取相場</Link></li>
            <li><Link href="/articles/glenfiddich-30-nisemono-mikata/" className="text-amber-dark hover:underline">グレンフィディック30年の偽物の見分け方</Link></li>
            <li><Link href="/articles/whisky-nv-toha/" className="text-amber-dark hover:underline">ウイスキーの「年代指定なし(NV)」の解説買取での扱いと相場の見方</Link></li>
            <li><Link href="/articles/whisky-souba-kimarikata/" className="text-amber-dark hover:underline">ウイスキーの買取相場の決まり方査定6要素</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング（毎週更新）</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値（IQR外れ値除去後・毎週月曜更新）にもとづく参考値です。買取額を保証するものではなく、業者の買取査定額は各社の在庫状況・キャンペーン・状態評価により変動します。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
