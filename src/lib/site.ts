/**
 * Site-wide configuration. Values that differ per deployment come from
 * NEXT_PUBLIC_* environment variables (see .env.example). Nothing secret
 * belongs here — every NEXT_PUBLIC_ value ends up in the browser bundle.
 */

function cleanUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const SITE = {
  name: "TrueSquare",
  /** Data controller / operator (an individual). The email is intentionally NOT published. */
  operator: {
    name: "Izam Montilla Gómez",
    type: "individual",
    location: "Barcelona, Spain",
    country: "Spain",
  },
  /** How long contact messages are kept. */
  contactRetention: "one month",
  tagline: "Accurate home improvement & construction calculators",
  description:
    "Free, accurate calculators for concrete, gravel, mulch, tile, flooring, roofing and carpentry projects — in imperial and metric units, with clear formulas and worked examples.",
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL to the real deployment URL before building for production. */
  url: cleanUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://truesquare-calc.truesquare-calc.workers.dev"),
  /** Public contact address. Empty until the owner configures it. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Formspree form endpoint (public by design — it is visible in the page anyway). Override with NEXT_PUBLIC_CONTACT_FORM_ENDPOINT. */
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "https://formspree.io/f/xnpdnwjl",
  /** Google AdSense publisher ID (ca-pub-…). Empty = no ad code is loaded. */
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  /** Date the calculators and content were last reviewed. */
  lastReviewed: "2026-11-13",
  locale: "en",
} as const;

export const CURRENCIES = [
  { code: "USD", label: "US dollar ($)" },
  { code: "GBP", label: "Pound sterling (£)" },
  { code: "CAD", label: "Canadian dollar (CA$)" },
  { code: "AUD", label: "Australian dollar (A$)" },
  { code: "EUR", label: "Euro (€)" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
