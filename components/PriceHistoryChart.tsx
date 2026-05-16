"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

type HistoryPoint = {
  month: string;
  boxed: number;
  no_box: number;
  opened: number;
};

type Props = {
  history: HistoryPoint[];
};

function formatJPY(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(0)}万`;
  }
  return value.toLocaleString("ja-JP");
}

function formatMonth(month: string): string {
  const [, m] = month.split("-");
  return `${parseInt(m, 10)}月`;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white border border-warm-border rounded-lg shadow-md p-3 text-xs">
      <p className="font-bold mb-1.5">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} style={{ color: entry.color }} className="flex justify-between gap-3">
          <span>{entry.name}</span>
          <span className="font-semibold">¥{entry.value.toLocaleString("ja-JP")}</span>
        </p>
      ))}
    </div>
  );
}

export default function PriceHistoryChart({ history }: Props) {
  const chartData = history.map((point) => ({
    month: formatMonth(point.month),
    "未開封・箱付き": point.boxed,
    "未開封・箱なし": point.no_box,
    "開封済み": point.opened,
  }));

  return (
    <div className="w-full h-[280px] md:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5DCC4" />
          <XAxis dataKey="month" stroke="#807565" fontSize={11} tickMargin={4} />
          <YAxis stroke="#807565" fontSize={11} tickFormatter={formatJPY} width={60} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
            iconType="circle"
            iconSize={8}
          />
          <Line type="monotone" dataKey="未開封・箱付き" stroke="#C9923D" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="未開封・箱なし" stroke="#8E6420" strokeWidth={2} dot={{ r: 2.5 }} />
          <Line type="monotone" dataKey="開封済み" stroke="#6C2A1F" strokeWidth={2} dot={{ r: 2.5 }} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
