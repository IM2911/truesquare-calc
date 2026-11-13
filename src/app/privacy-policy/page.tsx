import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TrueSquare handles personal data: what we collect, what we don't, browser storage, contact messages, and future advertising.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" path="/privacy-policy">
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
        At the time of writing the site sets no cookies and uses no analytics, advertising or social-media tracking scripts. If that changes, this policy will be updated first and, where the law
        requires it, we will ask for your consent before any non-essential cookies or similar technologies are used.
      </p>

      <h2>Hosting and server logs</h2>
      <p>
        The site is served by a third-party hosting and content-delivery provider, which processes technical data such as IP addresses and request details on our behalf in order to deliver
        pages and protect the site against abuse. We do not use these logs to identify or profile visitors.
      </p>

      <h2>Contact messages</h2>
      <p>
        If you contact us, we use your name, email address and message only to reply to you. Messages submitted through the contact form are delivered by a third-party form service acting
        on our behalf. We keep messages for {SITE.contactRetention} and then delete them, unless we need them longer to resolve an ongoing issue. The lawful basis is our legitimate interest
        in responding to enquiries (Article 6(1)(f) GDPR). We never sell your data or use it for marketing.
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
