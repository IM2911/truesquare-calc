import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC } from "@/lib/adsense";
import { SITE } from "@/lib/site";
import "./globals.css";

// The pairing dealt by taste-skill (start.mjs, software): Schibsted Grotesk for text and headings, JetBrains Mono for figures.
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted", display: "swap", weight: ["400", "500"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { type: "website", siteName: SITE.name, locale: "en", url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  // AdSense site verification. The static home page carries the same tag (scripts/sync-adsense.mjs).
  ...(ADSENSE_CLIENT && { other: { "google-adsense-account": ADSENSE_CLIENT } }),
};

export const viewport: Viewport = {
  themeColor: "#115473",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${schibsted.variable} ${mono.variable}`}>
      <head>
        {/* A plain async tag, as AdSense asks (next/script adds a data-nscript attribute AdSense warns about).
            It also loads Google's consent message for EEA/UK/CH visitors and Auto ads. */}
        {ADSENSE_SCRIPT_SRC && <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />}
      </head>
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
