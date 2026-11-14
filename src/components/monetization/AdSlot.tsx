import { AD_SLOTS, ADSENSE_CLIENT, type AdPlacement } from "@/lib/adsense";
import { AdUnit } from "./AdUnit";

/**
 * Ad placement.
 *
 * Renders a responsive AdSense unit only when both the publisher ID and the
 * slot ID for this placement are real (src/lib/adsense.ts). Otherwise it
 * renders nothing in production, so there are never empty gaps; in
 * development an outline shows where the slot sits.
 *
 * The AdSense script itself is loaded site-wide by the root layout, which is
 * enough for Auto ads; these fixed placements are optional.
 * Placement rules: never inside the calculator card or between inputs and results.
 */
export type { AdPlacement };

const MIN_HEIGHT: Record<AdPlacement, string> = {
  "below-calculator": "min-h-[100px]",
  "in-content": "min-h-[250px]",
  sidebar: "min-h-[250px]",
};

export function AdSlot({ placement }: { placement: AdPlacement }) {
  const slot = AD_SLOTS[placement];
  if (!ADSENSE_CLIENT || !slot) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className={`no-print my-8 flex items-center justify-center rounded-xl border-2 border-dashed border-line-strong text-[13px] text-ink-muted ${MIN_HEIGHT[placement]}`}>
        Ad placement “{placement}” — no slot ID yet (dev preview only)
      </div>
    );
  }
  // Reserve space to avoid layout shift while the ad loads.
  return (
    <div className={`no-print my-8 ${MIN_HEIGHT[placement]}`} data-ad-placement={placement}>
      <AdUnit client={ADSENSE_CLIENT} slot={slot} />
    </div>
  );
}
