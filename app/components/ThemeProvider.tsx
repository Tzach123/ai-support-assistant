"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const THEME_STORAGE_KEY = "ai-support-theme";

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <NextThemesProvider
    attribute="data-theme"
    storageKey={THEME_STORAGE_KEY}
    defaultTheme="light"
    enableSystem={false}
    themes={["light", "dark"]}
  >
    {children}
  </NextThemesProvider>
);
