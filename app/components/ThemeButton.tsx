"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "ai-support-theme";
type Theme = "light" | "dark";

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const ThemeButton = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    const initial: Theme = stored === "dark" || stored === "light" ? stored : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const handleToggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg text-text transition-colors duration-fast ease-default hover:bg-bg-elevated focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 focus:ring-offset-bg"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      data-testid="theme-toggle"
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
};

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);
