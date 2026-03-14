"use client";

import { useTheme } from "next-themes";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

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
