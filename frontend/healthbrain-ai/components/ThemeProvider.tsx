"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [mode]);

  return <>{children}</>;
}
