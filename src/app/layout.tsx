import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_URL, organizationJsonLd, websiteJsonLd, localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flyhigh — Worldwide Freight, Refined.",
    template: "%s — Flyhigh",
  },
  description:
    "A premium freight forwarding maison from Mumbai. Sea, air, customs, warehousing, road, and ATA Carnet — handled with editorial precision.",
  keywords: [
    "freight forwarding India",
    "Mumbai freight forwarder",
    "ocean freight India",
    "air freight India",
    "customs clearance India",
    "ATA Carnet India",
    "FICCI Carnet panel India",
    "pharma cool chain logistics",
    "EV battery freight",
    "Mumbai to Rotterdam shipping",
    "India to Europe freight",
    "India to Africa freight",
  ],
  authors: [{ name: "Flyhigh Logistics Pvt. Ltd." }],
  creator: "Flyhigh",
  publisher: "Flyhigh Logistics Pvt. Ltd.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Flyhigh",
    url: SITE_URL,
    title: "Flyhigh — Worldwide Freight, Refined.",
    description:
      "A premium freight forwarding maison from Mumbai. Sea, air, customs, warehousing, road, and ATA Carnet.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@flyhighfreight",
    creator: "@flyhighfreight",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Logistics",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="grain f-body max-w-full overflow-x-hidden">
        <JsonLd id="ld-org" data={[organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
