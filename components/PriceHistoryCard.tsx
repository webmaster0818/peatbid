import Link from "next/link";
import PriceHistoryChart from "./PriceHistoryChart";

type HistoryPoint = {
  month: string;
  boxed: number;
  no_box: number;
  opened: number;
};

type PriceHistoryData = {
  slug: string;
  label: string;
  category: string;
  latest_price_boxed: number;
  latest_price_no_box: number;
  latest_price_opened: number;
  trend: "up" | "down" | "flat";
  pct_6m: number;
  pct_12m: number;
  history: HistoryPoint[];
  updated_at: string;
  data_disclaimer: string;
  data_sources: string[];
};

type Props = {
  data: PriceHistoryData;
};

function TrendBadge({ trend, pct }: { trend: "up" | "down" | "flat"; pct: number }) {
  const config = {
    up: { icon: "↗", color: "bg-emerald-100 text-emerald-800 border-emerald-300", label: "上昇" },
    down: { icon: "↘", color: "bg-rose-100 text-rose-800 border-rose-300", label: "下落" },
    flat: { icon: "→", color: "bg-amber-100 text-amber-900 border-amber-300", label: "横ばい" },
  }[trend];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold ${config.color}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
      <span>({pct >= 0 ? "+" : ""}{pct}%)</span>
    </span>
  );
}

export default function PriceHistoryCard({ data }: Props) {
  return (
    <section className="not-prose my-8 bg-white border-2 border-amber/30 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-peat to-peat-light text-cream px-5 py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-xs text-amber/90 mb-0.5">📊 価格推移トラッキング（過去12ヶ月）</p>
            <p className="font-display text-xl font-semibold">{data.label}</p>
          </div>
          <TrendBadge trend={data.trend} pct={data.pct_6m} />
        </div>
      </div>

      {/* Price Cards */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-cream/30 border-b border-warm-border">
        <div className="text-center">
          <p className="text-[10px] text-warm-gray mb-1">未開封・箱付き</p>
          <p className="font-bold text-base md:text-lg text-amber-dark">¥{data.latest_price_boxed.toLocaleString("ja-JP")}</p>
        </div>
        <div className="text-center border-x border-warm-border">
          <p className="text-[10px] text-warm-gray mb-1">未開封・箱なし</p>
          <p className="font-bold text-base md:text-lg text-amber-dark">¥{data.latest_price_no_box.toLocaleString("ja-JP")}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-warm-gray mb-1">開封済み</p>
          <p className="font-bold text-base md:text-lg text-amber-dark">¥{data.latest_price_opened.toLocaleString("ja-JP")}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="px-3 pt-4 pb-2">
        <PriceHistoryChart history={data.history} />
      </div>

      {/* Trend Summary */}
      <div className="px-5 py-3 bg-gold-bg/40 border-t border-warm-border">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <span className="text-warm-gray">過去6ヶ月: <strong className="text-ink">{data.pct_6m >= 0 ? "+" : ""}{data.pct_6m}%</strong></span>
          <span className="text-warm-gray">過去12ヶ月: <strong className="text-ink">{data.pct_12m >= 0 ? "+" : ""}{data.pct_12m}%</strong></span>
          <span className="text-warm-gray">最終更新: <strong className="text-ink">{data.updated_at}</strong></span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-5 py-3 bg-parchment border-t border-warm-border text-[11px] text-warm-gray leading-relaxed">
        <p className="mb-1.5">※ {data.data_disclaimer}</p>
        <p>
          データソース: {data.data_sources.join(" / ")}（詳細は{" "}
          <Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>
          ）
        </p>
      </div>
    </section>
  );
}
