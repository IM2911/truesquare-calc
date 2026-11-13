import { SITE } from "@/lib/site";

/**
 * Reserved ad placement.
 *
 * Renders NOTHING in production until the owner:
 *   1. has an approved Google AdSense account,
 *   2. sets NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-…) and real slot IDs, and
 *   3. has a Google-certified consent management platform in place for EEA/UK/CH visitors.
 *
 * Until then no third-party script is loaded. In development an outline shows
 * where the slot sits so layouts can be reviewed. See docs/monetization-strategy.md.
 */
export type AdPlacement = "below-calculator" | "in-content" | "sidebar";

const MIN_HEIGHT: Record<AdPlacement, string> = {
  "below-calculator": "min-h-[100px]",
  "in-content": "min-h-[250px]",
  sidebar: "min-h-[250px]",
};

export function AdSlot({ placement }: { placement: AdPlacement }) {
  if (!SITE.adsenseClient) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className={`no-print my-8 flex items-center justify-center rounded-xl border-2 border-dashed border-line-strong text-[13px] text-ink-muted ${MIN_HEIGHT[placement]}`}>
        Ad placement “{placement}” — inactive (dev preview only)
      </div>
    );
  }
  // Reserve space to avoid layout shift. The actual <ins class="adsbygoogle"> markup and
  // consent-aware script loader are added when the account is approved (see docs).
  return <div className={`no-print my-8 ${MIN_HEIGHT[placement]}`} data-ad-placement={placement} aria-hidden />;
}
