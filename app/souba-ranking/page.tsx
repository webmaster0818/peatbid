import type { Metadata } from "next";
import Link from "next/link";
import data from "@/data/souba-ranking.json";

type Brand = {
  slug: string;
  name: string;
  category: string;
  origin: string;
  rarity: string;
  median: number;
  sample_n: number;
  prev_median: number | null;
  change_1w: number | null;
  change_2w: number | null;
};

const brands = data.brands as Brand[];
const updated = data.updated as string;

export const metadata: Metadata = {
  title: `ウイスキー買取相場ランキング・ダッシュボード【${updated}更新】値上がり/値下がり銘柄`,
  description:
    "主要ウイスキー50銘柄の実勢買取相場を毎週更新。今週の値上がり・値下がり銘柄ランキング、高額相場ランキング、流通量ランキングを、Yahoo!オークションの落札データにもとづく当サイト独自集計で公開します。",
  alternates: { canonical: "/souba-ranking/" },
};

function yen(n: number) {
  return "¥" + n.toLocaleString();
}

function Change({ v }: { v: number | null }) {
  if (v === null) return <span className="text-warm-gray text-xs">—</span>;
  const up = v >= 0;
  return (
    <span className={`font-bold tabular-nums ${up ? "text-emerald-700" : "text-rose-700"}`}>
      {up ? "▲" : "▼"}
      {Math.abs(v).toFixed(1)}%
    </span>
  );
}

export default function Page() {
  const movers = brands.filter((b) => b.change_1w !== null);
  const up = [...movers].sort((a, b) => (b.change_1w! - a.change_1w!)).slice(0, 10);
  const down = [...movers].sort((a, b) => (a.change_1w! - b.change_1w!)).slice(0, 10);
  const byMedian = [...brands].sort((a, b) => b.median - a.median);
  const byLiquidity = [...brands].sort((a, b) => (b.sample_n || 0) - (a.sample_n || 0)).slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">相場ランキング</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3 !mt-0">
        ウイスキー買取相場ランキング・ダッシュボード
      </h1>
      <p className="text-warm-gray text-sm mb-2">
        最終更新: {updated} ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
      </p>
      <p className="leading-relaxed mb-8">
        主要ウイスキー{brands.length}銘柄の実勢買取相場を、Yahoo!オークションの過去180日落札データ（IQRで外れ値除去）から
        <strong>毎週集計している当サイト独自の一次データ</strong>です。週ごとの中央値の動きから、
        <strong>値上がり・値下がりした銘柄</strong>がひと目で分かります。売り時の判断にご活用ください。
      </p>

      {/* 値上がり / 値下がり */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <section className="border border-warm-border rounded-2xl p-5 bg-white">
          <h2 className="font-display text-lg font-bold text-emerald-700 mb-3 !mt-0">今週の値上がり銘柄 TOP10</h2>
          <ol className="space-y-1.5 text-sm">
            {up.map((b, i) => (
              <li key={b.slug} className="flex items-center justify-between gap-2 border-b border-warm-border/60 pb-1.5">
                <span className="truncate">
                  <span className="text-warm-gray mr-1.5">{i + 1}.</span>
                  <Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:underline">{b.name}</Link>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="text-warm-gray tabular-nums">{yen(b.median)}</span>
                  <Change v={b.change_1w} />
                </span>
              </li>
            ))}
          </ol>
        </section>
        <section className="border border-warm-border rounded-2xl p-5 bg-white">
          <h2 className="font-display text-lg font-bold text-rose-700 mb-3 !mt-0">今週の値下がり銘柄 TOP10</h2>
          <ol className="space-y-1.5 text-sm">
            {down.map((b, i) => (
              <li key={b.slug} className="flex items-center justify-between gap-2 border-b border-warm-border/60 pb-1.5">
                <span className="truncate">
                  <span className="text-warm-gray mr-1.5">{i + 1}.</span>
                  <Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:underline">{b.name}</Link>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="text-warm-gray tabular-nums">{yen(b.median)}</span>
                  <Change v={b.change_1w} />
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* 高額相場ランキング */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-4">高額買取相場ランキング（実勢中央値）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream text-left">
                <th className="p-2 border-b border-warm-border">#</th>
                <th className="p-2 border-b border-warm-border">銘柄</th>
                <th className="p-2 border-b border-warm-border text-right">実勢中央値</th>
                <th className="p-2 border-b border-warm-border text-right">前週比</th>
                <th className="p-2 border-b border-warm-border text-right">流通量</th>
              </tr>
            </thead>
            <tbody>
              {byMedian.map((b, i) => (
                <tr key={b.slug} className="border-b border-warm-border/60">
                  <td className="p-2 text-warm-gray">{i + 1}</td>
                  <td className="p-2">
                    <Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:underline">{b.name}</Link>
                    <span className="text-warm-gray text-xs ml-1.5">{b.category}</span>
                  </td>
                  <td className="p-2 text-right font-medium tabular-nums">{yen(b.median)}</td>
                  <td className="p-2 text-right"><Change v={b.change_1w} /></td>
                  <td className="p-2 text-right text-warm-gray tabular-nums">{b.sample_n || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 流通量ランキング */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-4">流通量（取引件数）ランキング TOP10</h2>
        <p className="text-sm text-warm-gray mb-3">落札サンプル数が多いほど取引が活発で、相場が安定し換金しやすい傾向です。</p>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          {byLiquidity.map((b, i) => (
            <li key={b.slug} className="flex items-center justify-between gap-2 border-b border-warm-border/60 pb-1.5">
              <span className="truncate"><span className="text-warm-gray mr-1.5">{i + 1}.</span>
                <Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:underline">{b.name}</Link></span>
              <span className="text-warm-gray tabular-nums shrink-0">{b.sample_n}件</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-xs text-warm-gray leading-relaxed border-t border-warm-border pt-4">
        ※ 数値はYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から当サイトが集計した参考値です。前週比は週次スナップショットの中央値の差分です。実際の買取額は業者・状態・付属品により変動し、金額を保証するものではありません。集計方法は<Link href="/methodology/" className="text-amber-dark underline">こちら</Link>。
      </p>
    </div>
  );
}
