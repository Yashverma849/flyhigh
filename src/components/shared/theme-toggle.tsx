"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = { className?: string };

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex h-9 w-9 items-center justify-center ${className ?? ""}`}
      />
    );
  }

  const isLight = resolvedTheme === "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      data-cursor={isLight ? "DARK" : "LIGHT"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:text-[var(--cargo)] ${className ?? ""}`}
      style={{ borderColor: "var(--line)", background: "var(--surface-tint-2)" }}
    >
      {isLight ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
