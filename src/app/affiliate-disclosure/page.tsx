import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How TrueSquare uses affiliate links and how they affect (and don't affect) our content.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage title="Affiliate disclosure" path="/affiliate-disclosure">
      <p>
        <strong>Current status:</strong> {SITE.name} does not currently participate in any affiliate programme, and no page contains affiliate links. This page explains how they will work if we
        add them.
      </p>
      <h2>What an affiliate link is</h2>
      <p>
        An affiliate link is a link to a retailer that lets the retailer know you came from our site. If you then buy something, we may receive a commission. The price you pay is the same.
      </p>
      <h2>Our rules</h2>
      <ul>
        <li>Calculators are never changed to favour a product or retailer, and results never depend on commercial relationships.</li>
        <li>Affiliate links will be labelled with a disclosure directly next to them, and marked with rel=&quot;sponsored&quot; for search engines.</li>
        <li>We will only describe products in general terms unless we have genuinely evaluated them. We will not publish fake reviews, ratings or testimonials.</li>
        <li>When we join a programme, we will name it on this page — for example, if we join Amazon Associates we will state that &quot;as an Amazon Associate we earn from qualifying purchases&quot;, as that programme requires.</li>
      </ul>
      <h2>Programmes</h2>
      <p>None yet. This list will be updated when the site joins any programme.</p>
    </LegalPage>
  );
}
