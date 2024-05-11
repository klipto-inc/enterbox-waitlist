import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextThemeProvider } from "@/components/themeProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterbox | Launching soon",
  description: "Get readdy for what's coming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  );
}
