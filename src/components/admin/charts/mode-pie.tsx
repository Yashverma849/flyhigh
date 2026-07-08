"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useThemePalette } from "@/lib/use-theme-palette";
import type { ModeDatum } from "@/server/queries/dashboard";

const MODE_COLORS: Record<string, string> = {
  Sea: "brass",
  Air: "cargo",
  Road: "sage",
};

export function ModePie({ data }: { data: ModeDatum[] }) {
  const p = useThemePalette();

  if (data.length === 0) {
    return (
      <div
        className="caption flex h-[260px] items-center justify-center"
        style={{ color: "var(--ash)" }}
      >
        No mode data yet.
      </div>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    color: p[MODE_COLORS[d.name] as keyof typeof p] ?? p.brass,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          stroke={p.ink}
          strokeWidth={3}
        >
          {chartData.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: p.ink2,
            border: `1px solid ${p.line}`,
            borderRadius: 8,
            color: p.bone,
          }}
          labelStyle={{ color: p.brass }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
