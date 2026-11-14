import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { PrivacySettingsLink } from "@/components/monetization/PrivacySettingsLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TrueSquare handles personal data: what we collect, what we don't, browser storage, contact messages, and Google AdSense advertising and cookies.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" path="/privacy-policy" updated="2026-11-14">
      <h2>Who we are</h2>
      <p>
        This website ({SITE.url}) is operated by {SITE.operator.name}, an individual based in {SITE.operator.location}, who is the data controller under the EU General Data Protection
        Regulation (GDPR), Spain&apos;s Organic Law 3/2018 on data protection (LOPDGDD) and, for UK visitors, the UK GDPR. You can contact the controller about privacy at any time through
        our <Link href="/contact">contact page</Link>.
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
        TrueSquare itself sets no cookies and uses no analytics or social-media tracking scripts. The only cookies on the site come from Google, which serves our advertising (see below):
      </p>
      <ul>
        <li>
          <strong>Consent cookies</strong> (for example <code>FCCDCF</code> and <code>FCNEC</code>) store the choice you make in Google&apos;s consent message, so it is not shown on every
          page.
        </li>
        <li>
          <strong>Advertising cookies</strong> (for example <code>__gads</code>, <code>__gpi</code> and <code>IDE</code>) are used by Google and its partners to deliver and measure ads,
          limit how often you see the same ad and, with your consent, personalise ads.
        </li>
      </ul>
      <p>
        Google publishes the full, current list of the cookies it uses in its{" "}
        <a href="https://policies.google.com/technologies/cookies" rel="noopener noreferrer" target="_blank">
          cookie overview
        </a>
        . You can block or delete cookies in your browser at any time; the calculators keep working without them.
      </p>

      <h2>Hosting and server logs</h2>
      <p>
        The site is served by Cloudflare, a hosting and content-delivery provider, which processes technical data such as IP addresses and request details on our behalf in order to
        deliver pages and protect the site against abuse. We do not use these logs to identify or profile visitors.
      </p>

      <h2>Contact messages</h2>
      <p>
        If you contact us, we use your name, email address and message only to reply to you. Messages submitted through the contact form are delivered by a third-party form service acting
        on our behalf. We keep messages for {SITE.contactRetention} and then delete them, unless we need them longer to resolve an ongoing issue. The lawful basis is our legitimate interest
        in responding to enquiries (Article 6(1)(f) GDPR). We never sell your data or use it for marketing.
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>The site is free to use and is funded by advertising served through Google AdSense.</p>
      <ul>
        <li>Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this website and to other websites.</li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.
        </li>
        <li>
          You can opt out of personalised advertising in{" "}
          <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
            Google&apos;s Ads Settings
          </a>
          , and out of some third-party vendors&apos; use of cookies for personalised advertising at{" "}
          <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">
            aboutads.info
          </a>
          .
        </li>
        <li>
          Google explains how it uses information from sites that show its ads in{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
            How Google uses information from sites or apps that use its services
          </a>
          .
        </li>
      </ul>
      <p>
        Visitors from the European Economic Area, the United Kingdom and Switzerland are asked for consent through Google&apos;s consent message, a consent management platform certified under
        the IAB Transparency and Consent Framework. Until you consent, Google serves only non-personalised or limited ads, and you can refuse just as easily as you accept. The lawful basis for
        advertising cookies is your consent (Article 6(1)(a) GDPR and Article 22.2 of Spain&apos;s LSSI-CE), which you can change or withdraw at any time with{" "}
        <PrivacySettingsLink fallback="the privacy settings link in the site footer" className="underline" />. Advertising never changes what a calculator returns.
      </p>

      <h2>Affiliate links</h2>
      <p>
        Some pages may include affiliate links in future. They are explained in our <Link href="/affiliate-disclosure">affiliate disclosure</Link> and are always labelled where they appear.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete or restrict the use of your personal data, to object to processing, to data portability, and to complain to a
        supervisory authority — in Spain, the Agencia Española de Protección de Datos (AEPD, www.aepd.es); in the UK, the Information Commissioner&apos;s Office (ICO). Residents of some US
        states, Canada and Australia have similar rights under their local laws. To exercise them, contact us through the <Link href="/contact">contact page</Link>; we will reply within one
        month.
      </p>

      <h2>Children</h2>
      <p>The site is intended for a general adult audience and does not knowingly collect personal data from children.</p>

      <h2>Changes</h2>
      <p>We will post any changes on this page and update the date at the top.</p>
    </LegalPage>
  );
}
