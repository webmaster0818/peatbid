import type { Metadata } from "next";
import Link from "next/link";
import data from "@/data/souba-report.json";

type Point = { date: string; value: number; n: number };
type Mover = {
  slug: string;
  name: string;
  category: string;
  median: number;
  prev_median: number;
  diff_jpy: number;
  change_pct: number;
  sample_n: number;
};
type CategoryIndex = {
  label: string;
  n: number;
  series: Point[];
  latest: number;
  change_1w_pct: number | null;
};

const updated = data.updated as string;
const baseDate = data.base_date as string;
const weeks = data.weeks as number;
const nBrands = data.n_brands as number;
const index = data.index as { series: Point[]; latest: number; change_1w_pct: number | null; change_4w_pct: number | null };
const categories = data.categories as Record<string, CategoryIndex>;
const movers = data.movers as { up: Mover[]; down: Mover[] };
const excluded = data.excluded as Record<string, string[] | number> & { total: number };

const ch1 = index.change_1w_pct;
const ch4 = index.change_4w_pct;
const pct = (v: number | null) => (v == null ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`);
const yen = (n: number) => "¥" + Math.round(n).toLocaleString();

export const metadata: Metadata = {
  title: `ウイスキー買取相場レポート【毎週更新】PeatBid買取相場指数 前週比${pct(ch1)}`,
  description: `主要ウイスキー${nBrands}銘柄のヤフオク実落札中央値から算出する「PeatBid買取相場指数」の週次レポート。今週の指数は${index.latest.toFixed(2)}（前週比${pct(ch1)}）。上昇・下落TOP5、カテゴリ別サブ指数、算出方法を毎週月曜に自動更新で公開。出典明記で引用歓迎の一次データです。`,
  alternates: { canonical: "/souba-report/" },
};

const SERIES_COLORS: Record<string, string> = {
  all: "#8a6d2f",
  "japanese-whisky": "#b91c1c",
  "scotch-whisky": "#1d4ed8",
};

function Chart() {
  const seriesMap: Record<string, { name: string; pts: Point[] }> = {
    all: { name: "総合", pts: index.series },
  };
  for (const [key, c] of Object.entries(categories)) {
    seriesMap[key] = { name: c.label, pts: c.series };
  }
  const keys = Object.keys(seriesMap);
  const allPts = keys.flatMap((k) => seriesMap[k].pts);
  if (allPts.length === 0) return null;
  const vals = allPts.map((p) => p.value);
  const min = Math.min(...vals) - 0.5;
  const max = Math.max(...vals) + 0.5;
  const dates = index.series.map((p) => p.date);
  const W = 640, H = 240, PL = 44, PR = 12, PT = 12, PB = 28;
  const x = (i: number) => PL + (dates.length === 1 ? 0 : (i * (W - PL - PR)) / (dates.length - 1));
  const y = (v: number) => PT + ((max - v) * (H - PT - PB)) / (max - min);
  const gridVals = [min + 0.5, 100, max - 0.5].filter((v, i, a) => a.indexOf(v) === i && v >= min && v <= max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="PeatBid買取相場指数の週次推移チャート" className="w-full h-auto">
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
            stroke={SERIES_COLORS[k] ?? "#8a6d2f"}
            strokeWidth="2.5"
            points={seriesMap[k].pts.map((p, i) => `${x(i)},${y(p.value)}`).join(" ")}
          />
          {seriesMap[k].pts.map((p, i) => (
            <circle key={p.date} cx={x(i)} cy={y(p.value)} r="3.5" fill={SERIES_COLORS[k] ?? "#8a6d2f"}>
              <title>{`${seriesMap[k].name} ${p.date}: ${p.value.toFixed(2)}（${p.n}銘柄）`}</title>
            </circle>
          ))}
        </g>
      ))}
    </svg>
  );
}

function ChangeBadge({ v }: { v: number | null }) {
  if (v === null) return <span className="text-warm-gray text-xs">—</span>;
  const up = v >= 0;
  return (
    <span className={`font-bold tabular-nums ${up ? "text-emerald-700" : "text-rose-700"}`}>
      {up ? "▲" : "▼"}{Math.abs(v).toFixed(2)}%
    </span>
  );
}

function MoversTable({ rows, title, color, empty }: { rows: Mover[]; title: string; color: string; empty: string }) {
  return (
    <section className="border border-warm-border rounded-2xl p-5 bg-white">
      <h3 className={`font-display text-lg font-bold mb-3 !mt-0 ${color}`}>{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-warm-gray">{empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream text-left">
                <th className="p-2 border-b border-warm-border">#</th>
                <th className="p-2 border-b border-warm-border">銘柄</th>
                <th className="p-2 border-b border-warm-border text-right">前週比</th>
                <th className="p-2 border-b border-warm-border text-right">実勢中央値</th>
                <th className="p-2 border-b border-warm-border text-right">実額差</th>
                <th className="p-2 border-b border-warm-border text-right">n</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, i) => (
                <tr key={m.slug} className="border-b border-warm-border/60">
                  <td className="p-2 text-warm-gray">{i + 1}</td>
                  <td className="p-2">
                    <Link href={`/articles/${m.slug}-kaitori/`} className="text-amber-dark hover:underline font-medium">{m.name}</Link>
                  </td>
                  <td className="p-2 text-right"><ChangeBadge v={m.change_pct} /></td>
                  <td className="p-2 text-right tabular-nums">{yen(m.median)}</td>
                  <td className="p-2 text-right tabular-nums text-warm-gray">{(m.diff_jpy >= 0 ? "+" : "−") + yen(Math.abs(m.diff_jpy))}</td>
                  <td className="p-2 text-right tabular-nums text-warm-gray">{m.sample_n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function JsonLd() {
  const url = "https://peatbid.com/souba-report/";
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "ウイスキー買取相場レポート＆PeatBid買取相場指数（毎週更新）",
    description: `主要ウイスキー${nBrands}銘柄のヤフオク実落札中央値から算出する週次の合成指数と、上昇・下落TOP5の相場レポート。`,
    url,
    dateModified: `${updated}T00:00:00+09:00`,
    author: { "@type": "Organization", name: "PeatBid編集部", url: "https://peatbid.com/editorial/" },
    publisher: { "@type": "Organization", name: "PeatBid", url: "https://peatbid.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "PeatBid買取相場指数（週次）",
    description: `Yahoo!オークション過去180日落札データの週次中央値（IQR外れ値除去）から算出した、主要ウイスキー${nBrands}銘柄の合成指数（基準週${baseDate}=100）。毎週月曜自動更新。`,
    url,
    creator: { "@type": "Organization", name: "PeatBid編集部", url: "https://peatbid.com/editorial/" },
    dateModified: updated,
    temporalCoverage: `${baseDate}/${updated}`,
    isAccessibleForFree: true,
    keywords: ["ウイスキー", "買取相場", "相場指数", "ヤフオク落札価格", "山崎", "響", "白州"],
    measurementTechnique: "Yahoo!オークション過去180日落札価格のIQR外れ値除去後の週次中央値を、基準週=100とした変化率の等ウェイト平均で指数化",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dataset) }} />
    </>
  );
}

export default function Page() {
  const catList = Object.entries(categories);
  const exList = (k: string) => (excluded[k] as string[]) ?? [];
  const nInsufficient = exList("insufficient").length;
  const nQuality = exList("data_quality").length + exList("series_jump").length;
  const nAccumulating = exList("short_history").length + exList("late_start").length + exList("no_data").length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <JsonLd />
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">買取相場レポート</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3 !mt-0">
        ウイスキー買取相場レポート＆PeatBid買取相場指数
      </h1>
      <p className="text-warm-gray text-sm mb-2">
        最終更新: {updated}（毎週月曜自動更新） ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
      </p>
      <p className="leading-relaxed mb-8">
        主要ウイスキー<strong>{nBrands}銘柄</strong>のヤフオク実落札中央値（過去180日・IQR外れ値除去）から算出する
        <strong>週次の合成指数「PeatBid買取相場指数」</strong>と、今週<strong>上昇・下落した銘柄TOP5</strong>をまとめた相場レポートです。
        ウイスキー二次流通市場がいま上向きか下向きかを、1つの数字で毎週確認できます。
      </p>

      {/* 指数の現在値（即答） */}
      <section className="border-2 border-amber-dark/30 rounded-2xl p-6 bg-cream/50 mb-8">
        <h2 className="text-sm font-bold text-warm-gray mb-2 !mt-0">PeatBid買取相場指数（{updated}時点・基準週{baseDate}=100）</h2>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p className="font-display text-5xl font-bold text-ink tabular-nums">{index.latest.toFixed(2)}</p>
          <p className="text-lg">前週比 <ChangeBadge v={ch1} /></p>
          <p className="text-sm text-warm-gray">4週比 <ChangeBadge v={ch4} /></p>
        </div>
        <p className="text-xs text-warm-gray mt-3">
          採用{nBrands}銘柄の等ウェイト合成。個別銘柄の買取価格を示すものではありません（<a href="#methodology" className="text-amber-dark underline">算出方法</a>）。
        </p>
      </section>

      {/* 週次推移チャート */}
      <section className="border border-warm-border rounded-2xl p-5 bg-white mb-4">
        <h2 className="font-display text-lg font-bold text-ink mb-1 !mt-0">指数の週次推移（基準週{baseDate}=100）</h2>
        <p className="text-xs text-warm-gray mb-3">
          <span style={{ color: SERIES_COLORS.all }}>●</span> 総合（{nBrands}銘柄）
          {catList.map(([k, c]) => (
            <span key={k} className="ml-2"><span style={{ color: SERIES_COLORS[k] ?? "#8a6d2f" }}>●</span> {c.label}（{c.n}銘柄）</span>
          ))}
        </p>
        <Chart />
      </section>
      <p className="text-xs text-warm-gray mb-10">
        ※現在{weeks}週分のデータで算出しています。毎週月曜の自動更新で系列が伸びていきます（将来の価格を予測するものではありません）。
      </p>

      {/* 上昇/下落 TOP5 */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-4">今週の上昇・下落銘柄 TOP5（前週比）</h2>
        <div className="grid md:grid-cols-1 gap-6">
          <MoversTable rows={movers.up} title="上昇 TOP5" color="text-emerald-700" empty="今週、前週比で上昇した銘柄はありませんでした（横ばい）。" />
          <MoversTable rows={movers.down} title="下落 TOP5" color="text-rose-700" empty="今週、前週比で下落した銘柄はありませんでした（横ばい）。" />
        </div>
        <p className="text-xs text-warm-gray mt-3">
          ※前週比は週次スナップショットの中央値の変化率です。サンプル数（n）が少ない週は振れ幅が大きくなります。銘柄名から各買取相場ページへ移動できます。
        </p>
      </section>

      {/* カテゴリ別サブ指数 */}
      {catList.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-ink mb-4">カテゴリ別サブ指数</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {catList.map(([k, c]) => (
              <div key={k} className="border border-warm-border rounded-2xl p-5 bg-white text-center">
                <h3 className="text-sm font-bold mb-1 !mt-0" style={{ color: SERIES_COLORS[k] ?? "#8a6d2f" }}>
                  {c.label}指数<span className="text-warm-gray font-normal">（{c.n}銘柄）</span>
                </h3>
                <p className="font-display text-3xl font-bold text-ink tabular-nums mb-1">{c.latest.toFixed(2)}</p>
                <p className="text-sm">前週比 <ChangeBadge v={c.change_1w_pct} /></p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* メソドロジー */}
      <section id="methodology" className="mb-10 border border-warm-border rounded-2xl p-6 bg-white">
        <h2 className="font-display text-xl font-bold text-ink mb-3 !mt-0">算出方法（メソドロジー完全開示）</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
          <li><strong>対象</strong>: 当サイトが毎週追跡する主要ウイスキーのうち、品質基準を満たした<strong>{nBrands}銘柄</strong>（内訳: {catList.map(([, c]) => `${c.label}${c.n}`).join("・")}）</li>
          <li><strong>原データ</strong>: Yahoo!オークションの過去180日落札価格から、IQR法で外れ値を除去した週次中央値（<Link href="/methodology/" className="text-amber-dark underline">詳細</Link>）</li>
          <li><strong>指数化</strong>: 基準週（{baseDate}）の中央値を100とした各銘柄の変化率を<strong>等ウェイトで単純平均</strong>（流動性等による加重は今後の改善課題として明示しています）</li>
          <li><strong>除外基準（計{excluded.total}銘柄）</strong>: ①落札サンプル数n&lt;20のサンプル不足（{nInsufficient}銘柄） ②検索クエリにミニチュア・空き瓶等が混入し実勢と乖離した系列（{nQuality}銘柄） ③履歴の蓄積が浅く基準週から追跡できない銘柄（{nAccumulating}銘柄）</li>
          <li><strong>更新</strong>: 毎週月曜、週次データ取得と同時に自動再計算（本レポートは {updated} 時点）</li>
          <li><strong>免責</strong>: 本指数・中央値はオークション実勢の参考値であり、<strong>買取価格を保証するものではありません</strong>。実際の買取額は業者・状態・付属品により変動します。</li>
        </ul>
      </section>

      {/* 引用歓迎（被リンク資産） */}
      <section id="citation" className="mb-10 border border-amber/40 rounded-2xl p-6 bg-cream/50">
        <h2 className="font-display text-lg font-bold text-ink mb-2 !mt-0">📊 出典明記で引用歓迎</h2>
        <p className="text-sm leading-relaxed mb-3">
          「PeatBid買取相場指数 {index.latest.toFixed(2)}（前週比{pct(ch1)}）」などの数値・チャート・TOP5は、
          <strong>出典の明記</strong>を条件にメディア・ブログ・SNS等でご自由に引用いただけます。
          ウイスキー相場の週次一次データとしてご活用ください。
        </p>
        <div className="bg-white border border-warm-border rounded-lg p-3 text-xs text-warm-gray mb-2">
          出典表記の例：「出典：PeatBid買取相場指数・週次相場レポート（peatbid.com）」＋本ページ（https://peatbid.com/souba-report/）へのリンク
        </div>
        <ul className="list-disc pl-5 text-xs text-warm-gray space-y-1">
          <li>データの改変はご遠慮ください</li>
          <li>取材・データ提供のご相談は<Link href="/contact/" className="text-amber-dark underline">お問い合わせ</Link>から</li>
        </ul>
      </section>

      {/* 関連導線 */}
      <section className="mb-6">
        <h2 className="font-display text-xl font-bold text-ink mb-3">あわせて見る</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm">
          <li>📈 <Link href="/souba-index/" className="text-amber-dark underline">ウイスキー買取相場指数</Link> — 指数そのものの定義・長期系列</li>
          <li>🔼 <Link href="/souba-ranking/" className="text-amber-dark underline">買取相場ランキング・ダッシュボード</Link> — 高額相場・流通量ランキング</li>
          <li>📚 <Link href="/souba-hakusho/" className="text-amber-dark underline">全国ウイスキー買取相場白書</Link> — 銘柄別の実勢中央値一覧（絶対値リファレンス）</li>
          <li>📝 <Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark underline">ウイスキー市場相場一覧</Link> — 全銘柄の市場相場と状態別の業界目安</li>
        </ul>
      </section>

      <p className="text-xs text-warm-gray leading-relaxed border-t border-warm-border pt-4">
        ※本指数は当サイト独自の参考指標であり、将来の価格や買取額を保証・予測するものではありません。実際の買取額は業者・状態・付属品により変動します。集計方法の詳細は<Link href="/methodology/" className="text-amber-dark underline">こちら</Link>。
      </p>
    </div>
  );
}
