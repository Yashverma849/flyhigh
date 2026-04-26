"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type ThemePalette = {
  ink: string;
  ink2: string;
  ink3: string;
  bone: string;
  cargo: string;
  brass: string;
  ash: string;
  rust: string;
  sage: string;
  line: string;
  lineSubtle: string;
  axisStroke: string;
  gridStroke: string;
};

const dark: ThemePalette = {
  ink: "#0b1220",
  ink2: "#131c2e",
  ink3: "#1b2842",
  bone: "#efe7d6",
  cargo: "#d2691e",
  brass: "#c9a876",
  ash: "#8b95a7",
  rust: "#8b3a1c",
  sage: "#6f8170",
  line: "rgba(239,231,214,0.14)",
  lineSubtle: "rgba(239,231,214,0.06)",
  axisStroke: "rgba(239,231,214,0.4)",
  gridStroke: "rgba(239,231,214,0.08)",
};

const light: ThemePalette = {
  ink: "#f7f3ea",
  ink2: "#efe7d6",
  ink3: "#dad0b8",
  bone: "#0b1220",
  cargo: "#a04714",
  brass: "#7a5f33",
  ash: "#4a5468",
  rust: "#8b3a1c",
  sage: "#4a5c4b",
  line: "rgba(11,18,32,0.10)",
  lineSubtle: "rgba(11,18,32,0.05)",
  axisStroke: "rgba(11,18,32,0.55)",
  gridStroke: "rgba(11,18,32,0.08)",
};

export function useThemePalette(): ThemePalette {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return dark;
  return resolvedTheme === "light" ? light : dark;
}
