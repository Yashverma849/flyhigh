"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useThemePalette } from "@/lib/use-theme-palette";

const DATA = [
  { month: "Oct", revenue: 720 },
  { month: "Nov", revenue: 805 },
  { month: "Dec", revenue: 880 },
  { month: "Jan", revenue: 940 },
  { month: "Feb", revenue: 1010 },
  { month: "Mar", revenue: 1144 },
];

export function RevenueBar() {
  const p = useThemePalette();
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={DATA} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
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
          formatter={(v) => [`₹${v}L`, "Revenue"]}
        />
        <Bar dataKey="revenue" fill={p.cargo} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
