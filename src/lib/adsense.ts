/**
 * Google AdSense configuration.
 *
 * Defaults live in adsense-config.json (also read by scripts/sync-adsense.mjs,
 * which writes the same ID into the static home page and public/ads.txt).
 * Environment variables override them at build time:
 *   NEXT_PUBLIC_ADSENSE_CLIENT                  ca-pub-… (any other value, e.g. "off", disables AdSense)
 *   NEXT_PUBLIC_ADSENSE_SLOT_BELOW_CALCULATOR   ad unit IDs from AdSense → Ads → By ad unit
 *   NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT
 *   NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR
 *
 * process.env.NEXT_PUBLIC_* stays written out literally so Next inlines it.
 */
import config from "./adsense-config.json";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    /** Google's consent message (AdSense Privacy & messaging). */
    googlefc?: {
      callbackQueue?: unknown[];
      showRevocationMessage?: () => void;
    };
  }
}

export type AdPlacement = "below-calculator" | "in-content" | "sidebar";

function parseClient(raw: string | undefined): string | null {
  const match = (raw ?? "").trim().match(/^(?:ca-)?(pub-\d{16})$/);
  return match ? `ca-${match[1]}` : null;
}

function parseSlot(raw: string | undefined): string | null {
  const value = (raw ?? "").trim();
  return /^\d{6,}$/.test(value) ? value : null;
}

/** "ca-pub-…" when AdSense is configured, otherwise null. */
export const ADSENSE_CLIENT = parseClient(process.env.NEXT_PUBLIC_ADSENSE_CLIENT || config.client);

export const AD_SLOTS: Record<AdPlacement, string | null> = {
  "below-calculator": parseSlot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_BELOW_CALCULATOR || config.slots["below-calculator"]),
  "in-content": parseSlot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT || config.slots["in-content"]),
  sidebar: parseSlot(process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || config.slots.sidebar),
};

export const ADSENSE_SCRIPT_SRC = ADSENSE_CLIENT
  ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
  : null;
