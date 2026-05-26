"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceDot } from "recharts";

type HistoryPoint = {
  date: string;
  median_jpy: number | null;
  sample_n: number | null;
  raw_n?: number | null;
};

type Props = {
  history: HistoryPoint[];
};

function formatJPY(value: number): string {
  if (value >= 1_000_000) return `${(value / 10000).toFixed(0)}万`;
  if (value >= 10_000) return `${(value / 10000).toFixed(1)}万`;
  return value.toLocaleString("ja-JP");
}

function formatDate(d: string): string {
  const parts = d.split("-");
  if (parts.length !== 3) return d;
  return `${parts[1]}/${parts[2]}`;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: HistoryPoint }> }) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-white border border-warm-border rounded-lg shadow-md p-3 text-xs">
      <p className="font-bold mb-1.5">{p.date}</p>
      <p className="flex justify-between gap-3">
        <span>Yahoo中央値</span>
        <span className="font-semibold">¥{p.median_jpy?.toLocaleString("ja-JP") ?? "—"}</span>
      </p>
      {p.sample_n != null && (
        <p className="text-warm-gray mt-1">サンプル n={p.sample_n}件</p>
      )}
    </div>
  );
}

export default function MarketPriceChart({ history }: Props) {
  const points = history.filter((h) => h.median_jpy != null);
  if (points.length === 0) {
    return (
      <div className="w-full h-[180px] flex items-center justify-center bg-cream/30 rounded-lg">
        <p className="text-xs text-warm-gray">価格履歴データ蓄積中（週次自動更新）</p>
      </div>
    );
  }

  const chartData = points.map((p) => ({
    ...p,
    label: formatDate(p.date),
  }));

  const onlyOne = chartData.length === 1;
  const latest = chartData[chartData.length - 1];

  return (
    <div className="w-full">
      <div className="h-[180px] md:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 24, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5DCC4" />
            <XAxis dataKey="label" stroke="#807565" fontSize={11} tickMargin={4} />
            <YAxis
              stroke="#807565"
              fontSize={11}
              tickFormatter={formatJPY}
              width={56}
              domain={onlyOne ? [Math.floor((latest.median_jpy ?? 0) * 0.7), Math.ceil((latest.median_jpy ?? 0) * 1.3)] : ["auto", "auto"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="median_jpy"
              stroke="#C9923D"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#C9923D", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
              isAnimationActive={false}
            />
            {onlyOne && (
              <ReferenceDot
                x={latest.label}
                y={latest.median_jpy ?? 0}
                r={6}
                fill="#C9923D"
                stroke="#6C2A1F"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {onlyOne && (
        <p className="text-center text-[11px] text-warm-gray mt-2">
          ⚪︎ 履歴蓄積中（週次1ポイントずつ追加・現在 1 / 26ポイント目標）
        </p>
      )}
    </div>
  );
}
