import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { LegalPage, OwnerPlaceholder } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Report a calculation problem, suggest a calculator or get in touch with the TrueSquare team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const hasForm = Boolean(SITE.contactFormEndpoint);
  const hasEmail = Boolean(SITE.contactEmail);
  return (
    <LegalPage title="Contact us" path="/contact">
      <p>We read every message. The most useful messages tell us which calculator you used, the values you entered and what you expected to see.</p>
      <ul>
        <li>Report an error in a calculation or explanation</li>
        <li>Suggest a new calculator</li>
        <li>Partnership or advertising enquiries</li>
      </ul>
      {hasForm && <ContactForm endpoint={SITE.contactFormEndpoint} />}
      {hasEmail && (
        <p>
          Email: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
      )}
      {!hasForm && !hasEmail && (
        <p>
          Our contact channel is being set up. <OwnerPlaceholder>OWNER: set NEXT_PUBLIC_CONTACT_EMAIL and/or NEXT_PUBLIC_CONTACT_FORM_ENDPOINT — see docs/deployment.md</OwnerPlaceholder>
        </p>
      )}
      <p>
        We cannot give project-specific engineering or building-code advice. For those questions, please consult a qualified local professional. See our <Link href="/disclaimer">disclaimer</Link>.
      </p>
      <p>
        Messages are handled as described in our <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
