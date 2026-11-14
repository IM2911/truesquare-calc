"use client";

import { useEffect, useRef } from "react";

/** One responsive AdSense unit. Rendered by AdSlot only when the client and slot IDs are real. */
export function AdUnit({ client, slot }: { client: string; slot: string }) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    const el = ref.current;
    // AdSense marks filled units with data-adsbygoogle-status; skip those so a
    // re-run of the effect (React Strict Mode) does not request a second ad.
    if (!el || el.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Blocked by an ad blocker or the script failed to load: leave the space empty.
    }
  }, [slot]);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
