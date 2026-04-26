import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.AUTH_URL ?? "http://localhost:3000"),
  title: {
    default: "Flyhigh — Worldwide Freight, Refined.",
    template: "%s — Flyhigh",
  },
  description:
    "A premium freight forwarding maison from Mumbai. Sea, air, customs, warehousing, road, and project cargo — handled with editorial precision.",
  keywords: [
    "freight forwarding",
    "Mumbai logistics",
    "ocean freight",
    "air freight",
    "customs clearance",
    "ATA Carnet",
    "project cargo",
  ],
  authors: [{ name: "Flyhigh" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Flyhigh",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="grain f-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
