"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const DATA = [
  { name: "Sea", value: 502, color: "#C9A876" },
  { name: "Air", value: 268, color: "#D2691E" },
  { name: "Road", value: 124, color: "#6F8170" },
];

export function ModePie() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={DATA}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          stroke="#0B1220"
          strokeWidth={3}
        >
          {DATA.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#131C2E",
            border: "1px solid rgba(239,231,214,0.14)",
            borderRadius: 8,
            color: "#EFE7D6",
          }}
          labelStyle={{ color: "#C9A876" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
