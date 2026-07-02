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
  ink: "#050a14",
  ink2: "#0a1c36",
  ink3: "#133d6b",
  bone: "#f8fafc",
  cargo: "#d2691e",
  brass: "#c9a876",
  ash: "#94a3b8",
  rust: "#8b3a1c",
  sage: "#6f8170",
  line: "rgba(19,61,107,0.4)",
  lineSubtle: "rgba(19,61,107,0.2)",
  axisStroke: "rgba(19,61,107,0.6)",
  gridStroke: "rgba(19,61,107,0.15)",
};

const light: ThemePalette = {
  ink: "#ffffff",
  ink2: "#f4f8fd",
  ink3: "#e2e8f0",
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
