import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Support Assistant",
  description:
    "AI-powered support assistant that classifies inquiries and routes them to the right team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="m-0 flex h-full min-h-full flex-col overflow-hidden bg-bg font-sans text-text antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
