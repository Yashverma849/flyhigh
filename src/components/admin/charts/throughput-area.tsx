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
import { useThemePalette } from "@/lib/use-theme-palette";

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
  const p = useThemePalette();
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="g-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.brass} stopOpacity={0.4} />
            <stop offset="100%" stopColor={p.brass} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g-air" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.cargo} stopOpacity={0.45} />
            <stop offset="100%" stopColor={p.cargo} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke={p.gridStroke} />
        <XAxis dataKey="month" stroke={p.axisStroke} fontSize={11} tickLine={false} />
        <YAxis stroke={p.axisStroke} fontSize={11} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: p.ink2,
            border: `1px solid ${p.line}`,
            borderRadius: 8,
            color: p.bone,
          }}
          labelStyle={{ color: p.brass }}
        />
        <Area type="monotone" dataKey="sea" stroke={p.brass} strokeWidth={1.5} fill="url(#g-sea)" />
        <Area type="monotone" dataKey="air" stroke={p.cargo} strokeWidth={1.5} fill="url(#g-air)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
