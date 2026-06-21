import type { Metadata } from "next";
import Link from "next/link";
import brands from "@/data/brands.json";

const SITE_URL = "https://peatbid.com";

export const metadata: Metadata = {
  title: "ウイスキー買取 銘柄一覧｜相場・査定ガイド全リスト | PeatBid",
  description:
    "ウイスキー買取の銘柄別ガイド一覧。山崎・響・白州・マッカラン・アードベッグなど主要銘柄の買取相場（Yahoo!オークション実勢中央値）と、箱なし・開封済み・偽物の見分け方など切り口別ガイドへの入口です。",
};

type Brand = {
  slug: string;
  name_ja: string;
  name_en: string;
  category: string;
  origin: string;
  rarity_tier: string;
  yahoo_median_jpy_180d: number | string | null;
  yahoo_sample_n: number | string | null;
};

const CAT_ORDER = ["japanese-whisky", "scotch-whisky"] as const;
const CAT_LABEL: Record<string, string> = {
  "japanese-whisky": "ジャパニーズウイスキー",
  "scotch-whisky": "スコッチウイスキー",
};

function fmtYen(v: number | string | null): string {
  const n = typeof v === "string" ? parseInt(v, 10) : v;
  if (!n || Number.isNaN(n) || n <= 0) return "相場データ蓄積中";
  return `中央値 約${n.toLocaleString("ja-JP")}円`;
}

function BreadcrumbSchema() {
  const d = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "銘柄一覧", item: `${SITE_URL}/articles/` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />;
}

export default function ArticlesIndexPage() {
  const all = brands as Brand[];
  const median = (b: Brand) => {
    const v = b.yahoo_median_jpy_180d;
    const n = typeof v === "string" ? parseInt(v, 10) : v;
    return n && !Number.isNaN(n) ? n : 0;
  };
  const grouped: Record<string, Brand[]> = {};
  for (const b of all) (grouped[b.category] ||= []).push(b);
  for (const k of Object.keys(grouped)) grouped[k].sort((a, z) => median(z) - median(a));

  return (
    <>
      <BreadcrumbSchema />
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">銘柄一覧</span></li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">ウイスキー買取 銘柄一覧</h1>
        <p className="text-warm-gray text-sm mb-6 leading-relaxed">
          主要{all.length}銘柄の買取相場ガイドです。各銘柄ページでは、Yahoo!オークションの実勢中央値、状態別の概算額、箱なし・開封済み・ラベル汚れ・偽物の見分け方・オークション推移など、切り口別の詳細ガイドにアクセスできます。
        </p>

        <div className="flex flex-wrap gap-2 mb-10 not-prose">
          <Link href="/articles/whisky-kaitori-souba/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">ウイスキー買取相場の総合ガイド</Link>
          <Link href="/articles/whisky-takaku-uru/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">高く売る方法の総合ガイド</Link>
          <Link href="/tier2/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">地域別の買取ガイド</Link>
          <Link href="/articles/whisky-sell-guide/" className="text-sm bg-amber/15 border border-amber/50 text-amber-dark font-bold rounded-lg px-3 py-2 hover:bg-amber/25">売る前の基礎ガイド（総まとめ）</Link>
          <Link href="/articles/whisky-toushi-hajimekata/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">ウイスキー投資の始め方</Link>
          <Link href="/articles/whisky-kaitori-zeikin/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">買取の税金・確定申告</Link>
          <Link href="/articles/whisky-naze-takai/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">なぜ高い？高騰の理由</Link>
          <Link href="/articles/whisky-hokan-houhou/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">保管方法</Link>
          <Link href="/articles/whisky-nisemono-miwakekata/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">偽物の見分け方</Link>
          <Link href="/articles/whisky-nv-toha/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">年代指定なし(NV)とは</Link>
          <Link href="/articles/whisky-souzoku-baikyaku/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">相続・遺品のウイスキーを売る</Link>
          <Link href="/articles/whisky-souba-kimarikata/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">買取相場の決まり方</Link>
          <Link href="/souba-ranking/" className="text-sm bg-gold-bg border border-amber/40 text-amber-dark rounded-lg px-3 py-2 hover:bg-amber/10">今週の相場ランキング</Link>
        </div>

        <div className="space-y-10">
          {CAT_ORDER.map((cat) => {
            const list = grouped[cat];
            if (!list || list.length === 0) return null;
            return (
              <section key={cat}>
                <h2 className="font-display text-xl font-semibold text-ink mb-4 pb-2 border-b border-warm-border">
                  {CAT_LABEL[cat] ?? cat}（{list.length}銘柄）
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {list.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/articles/${b.slug}-kaitori/`}
                      className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md hover:border-amber/50 transition-all"
                    >
                      <p className="font-bold text-sm text-ink">{b.name_ja}</p>
                      <p className="text-xs text-warm-gray mt-0.5">{b.origin}</p>
                      <p className="text-xs text-amber-dark font-medium mt-2">{fmtYen(b.yahoo_median_jpy_180d)}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <p className="text-xs text-warm-gray mt-10">
          ※相場はYahoo!オークション過去180日の落札中央値（外れ値除去後）です。算出方法は<Link href="/methodology/" className="text-amber-dark underline">編集ポリシー</Link>をご覧ください。
        </p>
      </div>
    </>
  );
}
