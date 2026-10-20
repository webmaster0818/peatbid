import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

// 2026-10-20 新設: 「竹鶴 買取」（年数なし）の受け皿。ボトル別の詳細は各年数ページ（17年・21年・25年）と
// 竹鶴ピュアモルト（年数表記なし）のページが担い、このページは「どの竹鶴か」の特定と全ボトルの価格一覧を担う。
// ⚠️ 店舗の掲示価格は手動データ（2026-10-20 確認）。月替わりに各店のページで再確認すること。

type MedianRec = { median?: number | null; filtered_n?: number | null; fetched_at?: string; insufficient?: boolean };
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

const t21 = rec("taketsuru-21");
const fetchedDates = ["taketsuru-pure", "taketsuru-17", "taketsuru-21", "taketsuru-25"]
  .map((k) => rec(k)?.fetched_at)
  .filter((d): d is string => typeof d === "string")
  .sort();
// 取得日が銘柄で異なる場合は「A〜B」と範囲で表記する
const fetchedAt = fetchedDates.length
  ? fetchedDates[0] === fetchedDates[fetchedDates.length - 1]
    ? fetchedDates[0]
    : `${fetchedDates[0]}〜${fetchedDates[fetchedDates.length - 1]}`
  : "毎週月曜";

const STORE_CHECKED = "2026-10-20";
const DK = "https://kaitori.e-daikoku.com/liquor/whisky/taketsuru/";
const SL = "https://www.stock-lab.com/osake-kaitori/whiskey/taketsuru/";
const LX = "https://linxas.shop/whiskey/nikka-taketsuru/";
const ASAHI_2020 = "https://www.asahibeer.co.jp/news/2020/0116.html";
const ASAHI_2026 = "https://prtimes.jp/main/html/rd/p/000001501.000016166.html";
const NIKKA = "https://www.nikka.com/brands/taketsuru/";

export const metadata: Metadata = {
  title: "竹鶴の買取価格一覧【2026年10月】ピュアモルト・12年〜35年を3店で比較",
  description:
    `竹鶴の買取価格を、ピュアモルト（白ラベル・黒ラベル）・12年・17年・21年・25年・35年と限定品まで、大黒屋・サケウル・LINXASの掲示価格（${STORE_CHECKED}確認）で一覧にしました。ヤフオク落札中央値（毎週更新）とボトルの見分け方も掲載しています。`,
  alternates: { canonical: "/articles/taketsuru-kaitori/" },
};

const faqs = [
  {
    q: "竹鶴の買取相場はいくらですか？",
    a: `ボトルによって大きく異なります。${STORE_CHECKED} に確認した買取店の掲示価格は、年数表記のない竹鶴ピュアモルト（通常品）が2,500〜8,000円、12年が13,000〜18,000円、17年が27,000〜31,000円（ノンチルフィルタードは40,000〜50,000円）、21年が56,000〜61,000円（旧ラベル・記念ラベル・限定品は52,000〜75,000円）、25年が140,000〜185,000円、35年が445,000〜446,000円（サケウル。大黒屋・LINXASは問い合わせ）です。${t21 ? `当サイトのヤフオク落札中央値（取得日 ${fetchedAt}）は、ピュアモルト${yen("taketsuru-pure") ?? "集計中"}、17年${yen("taketsuru-17")}、21年${yen("taketsuru-21")}、25年${yen("taketsuru-25") ?? "集計中"}です。` : ""}`,
  },
  {
    q: "竹鶴ピュアモルトの白ラベルと黒ラベルは、買取価格が違いますか？",
    a: "違います。年数表記のない竹鶴ピュアモルトについて、大黒屋は「白新ラベル」2,500円・「黒旧ラベル」6,500円（2026-10-19更新）、サケウルは「NV 白ラベル」3,800〜4,800円・「NV 黒ラベル」7,000〜8,000円（2026-10-18更新）、LINXASは「NV白ラベル」4,200円・「NV黒ラベル」8,000円（2026-09-30更新）と、いずれの店も黒ラベルを高く掲示しています。",
  },
  {
    q: "竹鶴12年はいくらで売れますか？",
    a: "大黒屋は700ml 16,000円・660ml 角瓶 15,000円・660ml 13,000円（2026-10-19更新）、サケウルは丸瓶 17,000〜18,000円・角瓶 16,000〜17,000円（2026-10-18更新）、LINXASは700ml 箱付17,000円／箱無15,000円・660ml 角瓶 15,000円（2026-09-30更新）です。容量（700ml／660ml）と瓶の形で価格が分かれるため、査定の際は容量も伝えてください。",
  },
  {
    q: "竹鶴は箱なしでも買取してもらえますか？",
    a: "買い取ってもらえますが、掲示価格は下がります。大黒屋は17年で31,000円（17年表記あり箱）→27,000円（箱なし）、21年で61,000円→58,000円、サケウルは25年で170,000〜171,000円（箱あり）→140,000〜141,000円（箱なし）です。大黒屋は年数表記のある箱を「箱あり」として扱っています。",
  },
  {
    q: "竹鶴ピュアモルト エッセンシャルズ 2026 は買取してもらえますか？",
    a: "大黒屋が22,000円を掲示しています（2026-10-19更新）。アサヒビールの発表（2026年5月1日）では、2026年6月16日から数量限定で発売、700ml・43%、参考小売価格25,000円（税別）・27,500円（税込）、販売数量は日本1万本・海外1万本です。",
  },
  {
    q: "竹鶴は今も販売されていますか？",
    a: "年数表記のない竹鶴ピュアモルトは、2020年3月31日にリニューアルして数量限定（年間22,000箱）で発売されています（アサヒビール 2020年1月16日発表）。2026-10-20 時点のニッカウヰスキー公式の竹鶴ブランドページでは、12年・17年・21年・25年は受賞歴の欄にのみ記載があり、販売終了の時期は公式には記載されていません。",
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
  { id: "store-prices", label: "1. 竹鶴の買取価格一覧（ボトル別・3店の掲示価格）" },
  { id: "current-price", label: "2. ヤフオク落札中央値（ピュアモルト・17年・21年・25年・毎週更新）" },
  { id: "lineup", label: "3. 竹鶴のラインナップと発売・リニューアルの経緯" },
  { id: "miwakekata", label: "4. 手元の竹鶴がどのボトルかの見分け方" },
  { id: "jotai", label: "5. 箱なし・開封済みの扱い" },
  { id: "satei", label: "6. 無料査定の使い方" },
  { id: "faq", label: "7. よくある質問" },
];

type Row = { group: string; item: string; dk: string; sl: string; lx: string; href?: string };
const storeRows: Row[] = [
  { group: "ピュアモルト（年数表記なし）", item: "白ラベル（大黒屋の表記は「白新ラベル」）", dk: "2,500円", sl: "3,800〜4,800円", lx: "4,200円（箱付・箱無とも）", href: "/articles/taketsuru-pure-kaitori/" },
  { group: "ピュアモルト（年数表記なし）", item: "黒ラベル（大黒屋の表記は「黒旧ラベル」）", dk: "6,500円", sl: "7,000〜8,000円", lx: "8,000円（箱付・箱無とも）", href: "/articles/taketsuru-pure-kaitori/" },
  { group: "ピュアモルト（年数表記なし）", item: "エッセンシャルズ 2026", dk: "22,000円", sl: "—", lx: "—" },
  { group: "ピュアモルト（年数表記なし）", item: "シェリーウッド フィニッシュ", dk: "お問い合わせ", sl: "—", lx: "42,000円" },
  { group: "12年", item: "12年 700ml（サケウルは「丸瓶」）", dk: "16,000円", sl: "17,000〜18,000円", lx: "箱付 17,000円／箱無 15,000円" },
  { group: "12年", item: "12年 660ml 角瓶", dk: "15,000円", sl: "16,000〜17,000円", lx: "15,000円" },
  { group: "12年", item: "12年 660ml", dk: "13,000円", sl: "—", lx: "—" },
  { group: "12年", item: "12年 シェリーウッドフィニッシュ", dk: "お問い合わせ", sl: "—", lx: "—" },
  { group: "17年", item: "17年（箱あり／箱なし）", dk: "31,000円（17年表記あり箱のみ）／27,000円", sl: "30,000〜31,000円（箱あり）", lx: "箱付 31,000円／箱無 27,000円", href: "/articles/taketsuru-17-kaitori/" },
  { group: "17年", item: "17年 角瓶・旧ラベル・WWA受賞記念ラベル", dk: "各27,000円", sl: "—", lx: "角瓶 27,000円／WWA 28,000円" },
  { group: "17年", item: "17年 ノンチルフィルタード", dk: "40,000円", sl: "—", lx: "50,000円" },
  { group: "21年", item: "21年（箱あり／箱なし）", dk: "61,000円（21年表記あり箱のみ）／58,000円", sl: "60,000〜61,000円（箱あり）／箱なしはお問い合わせ", lx: "箱付 61,000円／箱無 56,000円", href: "/articles/taketsuru-21-kaitori/" },
  { group: "21年", item: "21年 角瓶・旧ラベル・WWA受賞記念ラベル・ノンチルフィルタード", dk: "55,000〜60,000円", sl: "—", lx: "52,000〜65,000円" },
  { group: "21年", item: "21年 ポートウッド／マディラウッドフィニッシュ", dk: "お問い合わせ", sl: "—", lx: "70,000円／75,000円" },
  { group: "21年", item: "21年 180ml", dk: "—", sl: "—", lx: "10,000円" },
  { group: "25年", item: "25年（完品・箱あり／箱なし）", dk: "185,000円（完品）", sl: "170,000〜171,000円／140,000〜141,000円", lx: "160,000円（完備）", href: "/articles/taketsuru-25-kaitori/" },
  { group: "35年", item: "35年（竹鶴ノート・木箱）", dk: "お問い合わせ", sl: "445,000〜446,000円", lx: "ASK" },
];

const medianRows: { name: string; key: string; href: string }[] = [
  { name: "竹鶴ピュアモルト（年数表記なし・白/黒ラベル）", key: "taketsuru-pure", href: "/articles/taketsuru-pure-kaitori/" },
  { name: "竹鶴17年", key: "taketsuru-17", href: "/articles/taketsuru-17-kaitori/" },
  { name: "竹鶴21年", key: "taketsuru-21", href: "/articles/taketsuru-21-kaitori/" },
  { name: "竹鶴25年", key: "taketsuru-25", href: "/articles/taketsuru-25-kaitori/" },
];

export default function TaketsuruKaitoriPage() {
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
            <li><span className="text-foreground">竹鶴 買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/taketsuru-pure.png" alt="竹鶴の買取価格一覧" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">竹鶴の買取価格一覧｜ピュアモルト・12年・17年・21年・25年・35年の店舗別相場</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-20 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>竹鶴は<strong>年数表記の有無と年数で価格が大きく異なります</strong>。年数表記のないピュアモルトは2,500〜8,000円、25年は140,000〜185,000円です（{STORE_CHECKED}確認の店舗掲示価格）。</li>
              <li>年数表記のないピュアモルトは<strong>黒ラベルが白ラベルより高く</strong>掲示されています（例: LINXAS 8,000円／4,200円）。</li>
              <li>12年は<strong>700mlと660ml（角瓶）で価格が分かれます</strong>。17年・21年は角瓶・旧ラベル・受賞記念ラベル・限定品が別の価格です。</li>
              {t21 && <li>ヤフオク落札中央値は<strong>ピュアモルト{yen("taketsuru-pure") ?? "集計中"}／17年{yen("taketsuru-17")}／21年{yen("taketsuru-21")}／25年{yen("taketsuru-25") ?? "集計中"}</strong>です（毎週更新）。</li>}
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

          <h2 id="store-prices">1. 竹鶴の買取価格一覧（ボトル別・3店の掲示価格）</h2>

          <p>各店が自社サイトに公開している竹鶴の参考買取価格を、PeatBid編集部が {STORE_CHECKED} に各ページで確認した値です。店舗側の更新日は、大黒屋 2026年10月19日、サケウル（STOCK LAB）2026年10月18日、LINXAS 2026年9月30日です。数値は各ページの表示をそのまま転記しています。</p>

          <div className="overflow-x-auto my-5 not-prose">
            <table className="w-full text-sm">
              <thead><tr className="border-b-2 border-amber/40 text-left text-warm-gray text-xs"><th className="py-2 pr-3">ボトル</th><th className="py-2 pr-3 text-right">大黒屋（10/19更新）</th><th className="py-2 pr-3 text-right">サケウル（10/18更新）</th><th className="py-2 text-right">LINXAS（9/30更新）</th></tr></thead>
              <tbody>
                {storeRows.map((r) => (
                  <tr key={r.item} className="border-b border-warm-border/60">
                    <td className="py-2 pr-3"><span className="text-warm-gray text-xs">{r.group}</span><br />{r.href ? <Link href={r.href} className="text-amber-dark underline">{r.item}</Link> : r.item}</td>
                    <td className="py-2 pr-3 text-right">{r.dk}</td>
                    <td className="py-2 pr-3 text-right">{r.sl}</td>
                    <td className="py-2 text-right">{r.lx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-warm-gray">出典: <a href={DK} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">大黒屋「ニッカ竹鶴買取」</a>・<a href={SL} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">サケウル（STOCK LAB）「竹鶴の買取」</a>・<a href={LX} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS「ニッカ竹鶴 買取」</a>（{STORE_CHECKED}確認）。各店の参考価格であり、実際の買取額を保証するものではありません。「—」は該当ページに掲載がないものです。LINXAS の「箱付／箱無」の2つの価格は、ページ上で対応関係が明記されていない行があります。</p>

          <p>同じ年数でも、店舗によって差があります。25年は大黒屋 185,000円（完品）・サケウル 170,000〜171,000円（箱あり）・LINXAS 160,000円（完備）で、最大25,000円の差です。17年のノンチルフィルタードは大黒屋 40,000円・LINXAS 50,000円で、通常の17年（27,000〜31,000円）より高く掲示されています。</p>

          <p>大黒屋が公開している買取実績（日付付き）は、竹鶴21年 WWA受賞記念ラベル 45,500円（2026-10-06）、竹鶴25年 木箱付き 160,000円（2026-09-06）、竹鶴25年 木箱/冊子付 150,000円（2026-08-24）、竹鶴21年 角瓶 箱付 60,000円（2026-08-16）です。</p>

          <p>年数ごとの詳しい相場は、各ページで扱っています。</p>
          <ul>
            <li><Link href="/articles/taketsuru-pure-kaitori/" className="text-amber-dark underline">竹鶴ピュアモルト（年数表記なし）の買取相場</Link></li>
            <li><Link href="/articles/taketsuru-17-kaitori/" className="text-amber-dark underline">竹鶴17年の買取相場</Link></li>
            <li><Link href="/articles/taketsuru-21-kaitori/" className="text-amber-dark underline">竹鶴21年の買取相場</Link>（5店の掲示価格・2014年の限定品3種・旧ラベル/角瓶の見分け方）</li>
            <li><Link href="/articles/taketsuru-25-kaitori/" className="text-amber-dark underline">竹鶴25年の買取相場</Link></li>
          </ul>

          <h2 id="current-price">2. ヤフオク落札中央値（ピュアモルト・17年・21年・25年・毎週更新）</h2>

          <p>当サイトが毎週集計している、ヤフオク!の実落札データにもとづく中央値です。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>実勢中央値</th><th>サンプル数</th></tr>
              </thead>
              <tbody>
                {medianRows.map((r) => (
                  <tr key={r.key}>
                    <td><Link href={r.href} className="text-amber-dark underline">{r.name}</Link></td>
                    <td><strong>{yen(r.key) ?? "集計中"}</strong></td>
                    <td>{nOf(r.key)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※中央値はヤフオク!の過去180日落札データをIQR外れ値除去後に当サイトが独自に集計した参考値です（取得日 {fetchedAt}・毎週月曜更新）。買取額を保証するものではありません。竹鶴ピュアモルトの中央値は、出品タイトルに年数表記（12年・17年・21年・25年など）や限定品・複数本セットの表記がある出品を除き、白ラベル・黒ラベルを合わせて集計しています（2026-10-20 から。それ以前は年数表記品が混ざっていたため系列を破棄）。12年・35年は集計の対象外です。</p>

          <p>中央値は個人間の落札額で、店舗の掲示価格は店舗が買い取る際の参考額です。2026-10-20 時点では、ピュアモルト・17年・21年の店舗の掲示価格は中央値に近い水準、25年は中央値を下回る水準です。</p>

          <h2 id="lineup">3. 竹鶴のラインナップと発売・リニューアルの経緯</h2>

          <ul>
            <li><strong>ブランドの発売</strong> — アサヒビールは2026年5月1日の発表で、2030年に「竹鶴ピュアモルト」ブランド発売30周年を迎えるとしています。</li>
            <li><strong>年数表記のない竹鶴ピュアモルトのリニューアル</strong> — 2020年3月31日にリニューアルし、数量限定（年間22,000箱＝700ml×12本）で発売。700ml・43%、オープン価格（参考小売価格4,000円・税別）。原酒の貯蔵年数にこだわらず幅広い原酒を使い、余市モルトの使用比率を高めたと説明されています（アサヒビール 2020年1月16日）。リリースにはラベルの色の記載はなく、白ラベル・黒ラベルの呼び分けは買取店の表記です。</li>
            <li><strong>2014年の竹鶴21年の限定品</strong> — ポートウッドフィニッシュ（約1,000本）、マディラウッドフィニッシュ（欧州向け・約500本）、ノンチルフィルタード（約3,000本）。詳細は <Link href="/articles/taketsuru-21-kaitori/" className="text-amber-dark underline">竹鶴21年のページ</Link> にまとめています。</li>
            <li><strong>竹鶴ピュアモルト エッセンシャルズ 2026</strong> — 2026年6月16日から数量限定で発売。700ml・43%、参考小売価格25,000円（税別）・27,500円（税込）、販売数量は日本1万本・海外1万本。2030年まで毎年テーマを変えて数量限定品を出すシリーズの第1弾です（アサヒビール 2026年5月1日）。</li>
            <li><strong>年数表記品（12年・17年・21年・25年）</strong> — {STORE_CHECKED} 時点のニッカウヰスキー公式の竹鶴ブランドページでは、受賞歴の欄にのみ記載があり、販売終了の時期の記載はありません。</li>
          </ul>
          <p className="text-[11px] text-warm-gray">出典: <a href={ASAHI_2020} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">アサヒビール 2020年1月16日</a>・<a href={ASAHI_2026} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">アサヒビール 2026年5月1日（PR TIMES）</a>・<a href={NIKKA} target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">ニッカウヰスキー「竹鶴」</a>（{STORE_CHECKED}確認）</p>

          <h2 id="miwakekata">4. 手元の竹鶴がどのボトルかの見分け方</h2>

          <ol>
            <li><strong>年数表記を探す</strong> — ラベルと箱に「12」「17」「21」「25」「35」の表記があるか確認します。表記がなければ、年数表記のない竹鶴ピュアモルトです。</li>
            <li><strong>年数表記がない場合はラベルの色</strong> — 買取店は白ラベルと黒ラベルを別の価格で掲示しています（大黒屋は「白新ラベル」「黒旧ラベル」と表記）。</li>
            <li><strong>容量と瓶の形</strong> — 12年は700mlと660ml（角瓶を含む）で価格が分かれます。21年には180mlもあります。</li>
            <li><strong>限定品・記念ラベルの表記</strong> — ノンチルフィルタード、ポートウッド／マディラウッド／シェリーウッドフィニッシュ、WWA受賞記念ラベル、エッセンシャルズ 2026 は通常品と別の価格です。</li>
            <li><strong>箱の年数表記</strong> — 大黒屋は「17年表記あり箱」「21年表記あり箱」を箱ありとして扱っており、別のボトルの箱では箱ありの価格になりません。</li>
            <li><strong>判別できない場合</strong> — 正面・背面・キャップ・箱の写真を用意して査定を依頼してください。</li>
          </ol>

          <h2 id="jotai">5. 箱なし・開封済みの扱い</h2>

          <p>店舗の掲示では、箱の有無で次の差があります（{STORE_CHECKED}確認）。</p>
          <ul>
            <li>17年: 大黒屋 31,000円→27,000円、LINXAS 31,000円→27,000円</li>
            <li>21年: 大黒屋 61,000円→58,000円、LINXAS 61,000円→56,000円</li>
            <li>25年: サケウル 170,000〜171,000円→140,000〜141,000円</li>
          </ul>
          <p>開封済みのボトルについて、上記3店のページに掲示価格はありません。開封済みの扱いは店によって異なるため、売却前に各店に確認してください。</p>

          <h2 id="satei">6. 無料査定の使い方</h2>

          <p>年数表記のないピュアモルトや12年は店舗間の差が数千円、25年・35年は数万円以上です。高額なボトルほど、<strong>一括査定で相場を確認してから、専門店の個別査定と比較する</strong>方法が効率的です。</p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">竹鶴の無料一括査定はこちら</h3>
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

          <h2>竹鶴の関連ページ</h2>
          <ul>
            <li><Link href="/articles/taketsuru-pure-kaitori/" className="text-amber-dark hover:underline font-bold">竹鶴ピュアモルト（年数表記なし）の買取相場</Link></li>
            <li><Link href="/articles/taketsuru-21-kaitori/" className="text-amber-dark hover:underline font-bold">竹鶴21年の買取相場</Link></li>
            <li><Link href="/articles/taketsuru-25-kaitori/" className="text-amber-dark hover:underline">竹鶴25年の買取相場</Link></li>
            <li><Link href="/articles/taketsuru-17-kaitori/" className="text-amber-dark hover:underline">竹鶴17年の買取相場</Link></li>
            <li><Link href="/articles/taketsuru-pure-nisemono-mikata/" className="text-amber-dark hover:underline">竹鶴ピュアモルトの偽物の見分け方</Link></li>
            <li><Link href="/souba-ranking/" className="text-amber-dark hover:underline">ウイスキー買取相場ランキング（毎週更新）</Link></li>
          </ul>

          <p className="text-xs text-warm-gray mt-8">※本記事の実勢中央値は Yahoo Auctions 過去180日落札データの中央値（IQR外れ値除去後・毎週月曜更新）にもとづく参考値です。店舗の掲示価格は各店の公開ページの表示を転記したもので、買取額を保証するものではありません。最新の査定額は各業者ページで直接ご確認ください。当サイトはアフィリエイト広告（PR）を含みます。</p>
        </article>
      </div>
    </>
  );
}
