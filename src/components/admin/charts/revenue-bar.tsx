"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATA = [
  { month: "Oct", revenue: 720 },
  { month: "Nov", revenue: 805 },
  { month: "Dec", revenue: 880 },
  { month: "Jan", revenue: 940 },
  { month: "Feb", revenue: 1010 },
  { month: "Mar", revenue: 1144 },
];

export function RevenueBar() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={DATA} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
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
          formatter={(v) => [`₹${v}L`, "Revenue"]}
        />
        <Bar dataKey="revenue" fill="#D2691E" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
