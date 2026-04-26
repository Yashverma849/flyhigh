"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useThemePalette } from "@/lib/use-theme-palette";

export function ModePie() {
  const p = useThemePalette();
  const data = [
    { name: "Sea", value: 502, color: p.brass },
    { name: "Air", value: 268, color: p.cargo },
    { name: "Road", value: 124, color: p.sage },
  ];
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
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
          {data.map((d) => (
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
