import type { Metadata } from "next";
import Link from "next/link";
import idx from "@/data/souba-index.json";

type Point = { date: string; index: number };
const composite = idx.composite as Point[];
const japanese = (idx.japanese ?? null) as Point[] | null;
const scotch = (idx.scotch ?? null) as Point[] | null;
const latest = composite[composite.length - 1];
const prev = composite[composite.length - 2];
const wow = Math.round((latest.index - prev.index) * 100) / 100;
const total = (idx.constituents as { total: number; japanese: number; scotch: number });
const fmtDate = (d: string) => d.replace(/^\d{4}-0?(\d+)-0?(\d+)$/, "$1/$2");

export const metadata: Metadata = {
  title: `Peatbid買取相場指数｜ウイスキー買取市場の週次インデックス（最新 ${latest.index}）`,
  description: `国産・スコッチ${total.total}銘柄のヤフオク実勢中央値を合成した「Peatbid買取相場指数」。基準週（${idx.base_date}）=100として週次で自動更新。最新値${latest.index}（前週比${wow >= 0 ? "+" : ""}${wow}）。出典明記での引用歓迎。`,
  alternates: { canonical: "https://peatbid.com/souba-index/" },
};

function LineChart({ series, color, label }: { series: Point[]; color: string; label: string }) {
  const W = 640, H = 220, PAD = 42;
  const vals = series.map((p) => p.index);
  const min = Math.min(...vals, 98), max = Math.max(...vals, 102);
  const x = (i: number) => PAD + (i * (W - PAD * 2)) / (series.length - 1);
  const y = (v: number) => H - PAD - ((v - min) * (H - PAD * 2)) / (max - min);
  const path = series.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(p.index).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl border border-warm-border bg-white" role="img" aria-label={`${label}の週次推移チャート`}>
      <line x1={PAD} y1={y(100)} x2={W - PAD} y2={y(100)} stroke="#d8cdbd" strokeDasharray="4 3" />
      <text x={PAD - 6} y={y(100) + 4} fontSize="10" fill="#9b8d7a" textAnchor="end">100</text>
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" />
      {series.map((p, i) => (
        <g key={p.date}>
          <circle cx={x(i)} cy={y(p.index)} r="3" fill={color} />
          <text x={x(i)} y={H - PAD + 16} fontSize="9" fill="#9b8d7a" textAnchor="middle">{fmtDate(p.date)}</text>
        </g>
      ))}
      <text x={x(series.length - 1)} y={y(series[series.length - 1].index) - 8} fontSize="12" fontWeight="bold" fill={color} textAnchor="end">{series[series.length - 1].index}</text>
    </svg>
  );
}

export default function SoubaIndexPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Peatbid買取相場指数",
    description: `国産・スコッチ${total.total}銘柄のYahoo!オークション実勢中央値を合成した週次インデックス（基準週=100）`,
    url: "https://peatbid.com/souba-index/",
    license: "出典明記で引用可",
    creator: { "@type": "Organization", name: "PeatBid" },
    temporalCoverage: `${idx.base_date}/${idx.latest_date}`,
    variableMeasured: [
      { "@type": "PropertyValue", name: "総合指数(最新)", value: latest.index },
      { "@type": "PropertyValue", name: "前週比", value: wow },
    ],
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <Link href="/" className="hover:text-amber-dark">ホーム</Link> / <span>買取相場指数</span>
      </nav>
      <h1 className="font-display text-2xl md:text-3xl font-semibold mb-2">Peatbid買取相場指数</h1>
      <p className="text-sm text-warm-gray mb-8">ウイスキー買取市場の温度を1つの数字に。{total.total}銘柄のヤフオク実勢中央値を合成した週次インデックス（毎週月曜自動更新）。</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-cream/50 border-2 border-amber/40 rounded-xl p-5 text-center">
          <p className="text-xs text-warm-gray mb-1">総合指数（{fmtDate(idx.latest_date as string)}時点）</p>
          <p className="font-display text-4xl font-bold text-amber-dark">{latest.index}</p>
          <p className={`text-sm mt-1 font-semibold ${wow >= 0 ? "text-emerald-700" : "text-red-600"}`}>{wow >= 0 ? "▲" : "▼"} 前週比 {wow >= 0 ? "+" : ""}{wow}</p>
        </div>
        <div className="bg-white border border-warm-border rounded-xl p-5 text-center">
          <p className="text-xs text-warm-gray mb-1">基準</p>
          <p className="text-lg font-bold text-ink">{idx.base_date as string} = 100</p>
          <p className="text-xs text-warm-gray mt-1">以降の変化率がそのまま読める</p>
        </div>
        <div className="bg-white border border-warm-border rounded-xl p-5 text-center">
          <p className="text-xs text-warm-gray mb-1">構成銘柄</p>
          <p className="text-lg font-bold text-ink">{total.total}銘柄</p>
          <p className="text-xs text-warm-gray mt-1">国産{total.japanese}・スコッチ{total.scotch}（等ウェイト）</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-ink mb-3">総合指数の推移</h2>
      <LineChart series={composite} color="#9a7b2d" label="総合指数" />

      {japanese && (
        <>
          <h2 className="text-xl font-bold text-ink mt-10 mb-3">ジャパニーズウイスキー指数（{total.japanese}銘柄）</h2>
          <LineChart series={japanese} color="#b0451f" label="ジャパニーズ指数" />
        </>
      )}
      {scotch && (
        <>
          <h2 className="text-xl font-bold text-ink mt-10 mb-3">スコッチウイスキー指数（{total.scotch}銘柄）</h2>
          <LineChart series={scotch} color="#3f5d78" label="スコッチ指数" />
        </>
      )}

      <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-10 text-center">
        <p className="font-bold text-ink mb-2">いま売り時か、この指数でわかる</p>
        <p className="text-sm text-warm-gray mb-4">指数が高値圏なら手持ちボトルの売却好機の可能性。銘柄別の実勢は相場ランキングへ。</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/souba-ranking/" className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm">銘柄別の相場ランキングを見る</Link>
          <Link href="/articles/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm border border-amber/50 text-amber-dark hover:bg-cream/50">全銘柄の買取ガイド一覧</Link>
        </div>
      </div>

      <h2 className="text-xl font-bold text-ink mb-3">算出方法（メソドロジー）</h2>
      <ul className="list-disc pl-6 text-sm text-warm-gray space-y-1.5 mb-8">
        <li>データ源: Yahoo!オークション過去180日の落札データ（各銘柄・週次取得・IQR外れ値除去後の中央値）</li>
        <li>構成: 週次データが全期間そろい、各週のサンプル数が20件以上の{total.total}銘柄（等ウェイト）</li>
        <li>指数化: 基準週（{idx.base_date as string}）の各銘柄中央値を100とした相対値の単純平均</li>
        <li>更新: 毎週月曜の相場データ取得後に自動再計算</li>
        <li>注意: 中古市場の実勢であり、買取店の提示額はこの50〜80%程度が目安です。将来の価格を保証するものではありません</li>
      </ul>

      <div className="border border-warm-border rounded-xl p-5 bg-white">
        <h2 className="font-bold text-ink mb-2">📊 データの引用について</h2>
        <p className="text-sm text-warm-gray">本指数・チャートは、<strong>出典（PeatBid＋本ページURL）の明記</strong>を条件に、メディア・ブログ・SNS等でご自由に引用いただけます。毎週更新されるため、記事内では「◯月◯日時点」の付記を推奨します。</p>
      </div>
    </div>
  );
}
