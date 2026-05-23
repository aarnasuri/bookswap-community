import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialTheme(): "dark" | "light" {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage unavailable
  }
  return "light";
}

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const initial = getInitialTheme();
    return initial === "dark";
  });

  // Apply theme to DOM on mount
  useEffect(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    setIsDark(initial === "dark");
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const theme = next ? "dark" : "light";
      applyTheme(theme);
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
