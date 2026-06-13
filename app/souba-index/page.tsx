import type { Metadata } from "next";
import Link from "next/link";
import data from "@/data/souba-index.json";

type Point = { date: string; value: number; n: number };
type SeriesKey = "all" | "japanese" | "scotch";

const series = data.series as Record<SeriesKey, Point[]>;
const updated = data.updated as string;
const baseDate = data.base_date as string;
const weeks = data.weeks as number;

export const metadata: Metadata = {
  title: `ウイスキー買取相場指数【${updated}更新】PeatBid独自の週次インデックス`,
  description:
    "主要ウイスキー44銘柄の実勢買取相場から算出する週次の合成指数「PeatBidウイスキー買取相場指数」。全銘柄・ジャパニーズ・スコッチの3系列を毎週自動更新で公開。出典明記での引用を歓迎します。",
  alternates: { canonical: "/souba-index/" },
};

const LABELS: Record<SeriesKey, { name: string; color: string }> = {
  all: { name: "総合", color: "#8a6d2f" },
  japanese: { name: "ジャパニーズ", color: "#b91c1c" },
  scotch: { name: "スコッチ", color: "#1d4ed8" },
};

function Chart() {
  const keys: SeriesKey[] = ["all", "japanese", "scotch"];
  const allPts = keys.flatMap((k) => series[k]);
  if (allPts.length === 0) return null;
  const vals = allPts.map((p) => p.value);
  const min = Math.min(...vals) - 0.5;
  const max = Math.max(...vals) + 0.5;
  const dates = series.all.map((p) => p.date);
  const W = 640, H = 240, PL = 44, PR = 12, PT = 12, PB = 28;
  const x = (i: number) => PL + (dates.length === 1 ? 0 : (i * (W - PL - PR)) / (dates.length - 1));
  const y = (v: number) => PT + ((max - v) * (H - PT - PB)) / (max - min);
  const gridVals = [min + 0.5, 100, max - 0.5].filter((v, i, a) => a.indexOf(v) === i);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="ウイスキー買取相場指数の推移チャート" className="w-full h-auto">
      {gridVals.map((v) => (
        <g key={v}>
          <line x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} stroke="#e5ddcf" strokeWidth="1" strokeDasharray={v === 100 ? "" : "4 4"} />
          <text x={PL - 6} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#8a8174">{v.toFixed(1)}</text>
        </g>
      ))}
      {dates.map((d, i) => (
        <text key={d} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#8a8174">{d.slice(5).replace("-", "/")}</text>
      ))}
      {keys.map((k) => (
        <g key={k}>
          <polyline
            fill="none"
            stroke={LABELS[k].color}
            strokeWidth="2.5"
            points={series[k].map((p, i) => `${x(i)},${y(p.value)}`).join(" ")}
          />
          {series[k].map((p, i) => (
            <circle key={p.date} cx={x(i)} cy={y(p.value)} r="3.5" fill={LABELS[k].color} />
          ))}
        </g>
      ))}
    </svg>
  );
}

function Delta({ pts }: { pts: Point[] }) {
  if (pts.length < 2) return null;
  const d = pts[pts.length - 1].value - pts[pts.length - 2].value;
  const up = d >= 0;
  return (
    <span className={`text-sm font-bold tabular-nums ${up ? "text-emerald-700" : "text-rose-700"}`}>
      前週比 {up ? "▲" : "▼"}{Math.abs(d).toFixed(2)}pt
    </span>
  );
}

export default function Page() {
  const keys: SeriesKey[] = ["all", "japanese", "scotch"];
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">買取相場指数</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3 !mt-0">
        PeatBid ウイスキー買取相場指数
      </h1>
      <p className="text-warm-gray text-sm mb-2">
        最終更新: {updated}（毎週自動更新） ／ 基準週: {baseDate} = 100 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
      </p>
      <p className="leading-relaxed mb-8">
        主要ウイスキー{data.n_brands}銘柄の実勢買取相場（Yahoo!オークション過去180日落札データの週次中央値）から算出する、
        <strong>ウイスキー二次流通市場の値動きを1つの数字で示す当サイト独自の合成指数</strong>です。
        基準週（{baseDate}）を100として、市場全体が上向きか下向きかをひと目で確認できます。
      </p>

      {/* 最新値カード */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {keys.map((k) => {
          const pts = series[k];
          const latest = pts[pts.length - 1];
          return (
            <section key={k} className="border border-warm-border rounded-2xl p-5 bg-white text-center">
              <h2 className="text-sm font-bold mb-1 !mt-0" style={{ color: LABELS[k].color }}>
                {LABELS[k].name}指数<span className="text-warm-gray font-normal">（{latest?.n}銘柄）</span>
              </h2>
              <p className="font-display text-3xl font-bold text-ink tabular-nums mb-1">{latest?.value.toFixed(2)}</p>
              <Delta pts={pts} />
            </section>
          );
        })}
      </div>

      {/* チャート */}
      <section className="border border-warm-border rounded-2xl p-5 bg-white mb-4">
        <h2 className="font-display text-lg font-bold text-ink mb-1 !mt-0">指数の推移（基準週=100）</h2>
        <p className="text-xs text-warm-gray mb-3">
          <span style={{ color: LABELS.all.color }}>●</span> 総合
          <span style={{ color: LABELS.japanese.color }}>●</span> ジャパニーズ
          <span style={{ color: LABELS.scotch.color }}>●</span> スコッチ
        </p>
        <Chart />
      </section>
      <p className="text-xs text-warm-gray mb-8">
        ※現在{weeks}週分のデータで算出しています。週次更新で蓄積が進むほどチャートが充実し、指数の参考性も高まります（将来の価格を予測するものではありません）。
      </p>

      {/* データテーブル */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-4">週次データ</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream text-left">
                <th className="p-2 border-b border-warm-border">週</th>
                <th className="p-2 border-b border-warm-border text-right">総合</th>
                <th className="p-2 border-b border-warm-border text-right">ジャパニーズ</th>
                <th className="p-2 border-b border-warm-border text-right">スコッチ</th>
              </tr>
            </thead>
            <tbody>
              {series.all.map((p, i) => (
                <tr key={p.date} className="border-b border-warm-border/60">
                  <td className="p-2 text-warm-gray">{p.date}</td>
                  <td className="p-2 text-right tabular-nums font-medium">{p.value.toFixed(2)}</td>
                  <td className="p-2 text-right tabular-nums">{series.japanese[i]?.value.toFixed(2)}</td>
                  <td className="p-2 text-right tabular-nums">{series.scotch[i]?.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 算出方法 */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-3">算出方法（メソドロジー）</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
          <li>対象: 当サイトが毎週追跡する主要ウイスキー{data.n_brands}銘柄（ジャパニーズ{(data.counts as Record<string, number>).japanese}・スコッチ{(data.counts as Record<string, number>).scotch}）</li>
          <li>原データ: Yahoo!オークションの過去180日落札価格から、IQR法で外れ値を除去した週次中央値（<Link href="/methodology/" className="text-amber-dark underline">詳細</Link>）</li>
          <li>指数化: 基準週（{baseDate}）の中央値を100とした各銘柄の変化率を等ウェイトで平均</li>
          <li>更新: 毎週月曜の週次データ更新と同時に自動再計算</li>
        </ul>
      </section>

      {/* 引用について */}
      <section className="border border-amber-dark/30 bg-cream/60 rounded-2xl p-5 mb-10">
        <h2 className="font-display text-lg font-bold text-ink mb-2 !mt-0">📊 データの引用について</h2>
        <p className="text-sm leading-relaxed mb-2">
          本指数の数値・チャートは、<strong>出典の明記</strong>を条件にメディア・ブログ等でご自由に引用いただけます。
        </p>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>出典表記の例: 「出典: PeatBid ウイスキー買取相場指数」＋本ページへのリンク</li>
          <li>データの改変はご遠慮ください</li>
          <li>取材・データ提供のご相談は<Link href="/contact/" className="text-amber-dark underline">お問い合わせ</Link>から</li>
        </ul>
      </section>

      {/* 関連導線 */}
      <section className="mb-6">
        <h2 className="font-display text-xl font-bold text-ink mb-3">あわせて見る</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm">
          <li><Link href="/souba-ranking/" className="text-amber-dark underline">今週の値上がり・値下がり銘柄ランキング</Link> — 指数を動かした個別銘柄はこちら</li>
          <li><Link href="/articles/" className="text-amber-dark underline">銘柄別の買取相場ガイド一覧</Link></li>
          <li><Link href="/articles/whisky-toushi-hajimekata/" className="text-amber-dark underline">ウイスキー投資の始め方</Link></li>
        </ul>
      </section>

      <p className="text-xs text-warm-gray leading-relaxed border-t border-warm-border pt-4">
        ※本指数は当サイト独自の参考指標であり、将来の価格や買取額を保証・予測するものではありません。実際の買取額は業者・状態・付属品により変動します。
      </p>
    </div>
  );
}
