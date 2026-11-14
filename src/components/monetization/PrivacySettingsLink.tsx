"use client";

import { ADSENSE_CLIENT } from "@/lib/adsense";

/**
 * Re-opens Google's consent message (AdSense "Privacy & messaging", a
 * Google-certified IAB TCF consent platform) so visitors can change their
 * choice. The message is loaded by the AdSense script, so the link only
 * renders when AdSense is configured.
 */
export function PrivacySettingsLink({ className, fallback }: { className?: string; fallback?: string }) {
  if (!ADSENSE_CLIENT) return fallback ? <>{fallback}</> : null;

  const open = () => {
    const fc = (window.googlefc = window.googlefc || {});
    fc.callbackQueue = fc.callbackQueue || [];
    fc.callbackQueue.push({
      CONSENT_DATA_READY: () => window.googlefc?.showRevocationMessage?.(),
    });
  };

  return (
    <button type="button" onClick={open} className={className}>
      Privacy and cookie settings
    </button>
  );
}
