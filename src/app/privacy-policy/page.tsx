import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, OwnerPlaceholder } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TrueSquare handles personal data: what we collect, what we don't, browser storage, contact messages, and future advertising.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" path="/privacy-policy">
      <p>
        <strong>Draft notice:</strong> this policy describes how the site works today. It must be reviewed by the owner (and ideally a legal professional) before launch and updated before any
        analytics, advertising or affiliate tracking is enabled. <OwnerPlaceholder>OWNER: legal review pending</OwnerPlaceholder>
      </p>

      <h2>Who we are</h2>
      <p>
        This website ({SITE.url}) is operated by <OwnerPlaceholder>OWNER: legal name, postal address and country</OwnerPlaceholder>, the data controller for the purposes of applicable data
        protection law (including the UK GDPR and EU GDPR where they apply). Contact: <OwnerPlaceholder>OWNER: privacy contact email</OwnerPlaceholder>.
      </p>

      <h2>Calculations stay in your browser</h2>
      <p>
        All calculators run entirely in your browser. The dimensions, prices and other values you enter are not sent to us or to anyone else.
      </p>

      <h2>Browser storage</h2>
      <p>
        We store your preferred unit system (imperial or metric) and currency in your browser&apos;s local storage so the site remembers them. This is a functional preference that is not used for
        tracking and is not shared. You can clear it at any time by clearing your browser&apos;s site data.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        At the time of writing the site sets no cookies and uses no analytics, advertising or social-media tracking scripts. If that changes, this policy will be updated first and, where the law
        requires it, we will ask for your consent before any non-essential cookies or similar technologies are used.
      </p>

      <h2>Hosting and server logs</h2>
      <p>
        The site is served by a hosting/CDN provider <OwnerPlaceholder>OWNER: provider name, e.g. Cloudflare</OwnerPlaceholder>, which processes technical data such as IP addresses and request
        details to deliver pages and protect against abuse. Please see that provider&apos;s privacy policy for details.
      </p>

      <h2>Contact messages</h2>
      <p>
        If you contact us, we use your name, email address and message only to reply and to keep a record of the correspondence. Contact forms may be processed by a form provider{" "}
        <OwnerPlaceholder>OWNER: name the provider if one is used</OwnerPlaceholder>. We keep messages for <OwnerPlaceholder>OWNER: retention period</OwnerPlaceholder> and then delete them. The lawful
        basis is our legitimate interest in responding to enquiries.
      </p>

      <h2>Future advertising and affiliate links</h2>
      <p>
        We may in future display advertising (for example Google AdSense) and include affiliate links. Advertising providers may use cookies to serve and measure ads, and in some regions to
        personalise them. Before enabling ads we will update this section, name the providers, and use a consent management platform for visitors in the EEA, UK and Switzerland. Affiliate links
        are explained in our <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete or restrict the use of your personal data, to object to processing, to data portability, and to complain to a
        supervisory authority (for example the ICO in the UK). Residents of some US states, Canada and Australia have similar rights under their local laws. To exercise them, contact us using the
        details above.
      </p>

      <h2>Children</h2>
      <p>The site is intended for a general adult audience and does not knowingly collect personal data from children.</p>

      <h2>Changes</h2>
      <p>We will post any changes on this page and update the date at the top.</p>
    </LegalPage>
  );
}
