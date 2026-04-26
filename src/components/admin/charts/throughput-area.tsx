"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Datum = { month: string; sea: number; air: number };

const DEFAULT_DATA: Datum[] = [
  { month: "Oct", sea: 280, air: 120 },
  { month: "Nov", sea: 320, air: 145 },
  { month: "Dec", sea: 380, air: 198 },
  { month: "Jan", sea: 410, air: 220 },
  { month: "Feb", sea: 445, air: 240 },
  { month: "Mar", sea: 502, air: 268 },
];

export function ThroughputArea({ data = DEFAULT_DATA }: { data?: Datum[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="g-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A876" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#C9A876" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g-air" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D2691E" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#D2691E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="rgba(239,231,214,0.08)" />
        <XAxis dataKey="month" stroke="rgba(239,231,214,0.4)" fontSize={11} tickLine={false} />
        <YAxis stroke="rgba(239,231,214,0.4)" fontSize={11} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "#131C2E",
            border: "1px solid rgba(239,231,214,0.14)",
            borderRadius: 8,
            color: "#EFE7D6",
          }}
          labelStyle={{ color: "#C9A876" }}
        />
        <Area
          type="monotone"
          dataKey="sea"
          stroke="#C9A876"
          strokeWidth={1.5}
          fill="url(#g-sea)"
        />
        <Area
          type="monotone"
          dataKey="air"
          stroke="#D2691E"
          strokeWidth={1.5}
          fill="url(#g-air)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
