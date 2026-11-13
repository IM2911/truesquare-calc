import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, OwnerPlaceholder } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use TrueSquare calculators and content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" path="/terms">
      <p>
        <strong>Draft:</strong> these terms are an initial draft and must be reviewed before launch. <OwnerPlaceholder>OWNER: legal review pending</OwnerPlaceholder>
      </p>
      <h2>1. About these terms</h2>
      <p>
        These terms apply to your use of {SITE.url} (the &quot;site&quot;), operated by <OwnerPlaceholder>OWNER: legal name and country</OwnerPlaceholder>. By using the site you agree to them. If
        you do not agree, please do not use the site.
      </p>
      <h2>2. Estimates only</h2>
      <p>
        Calculators provide estimates for planning purposes based on the values you enter and the assumptions stated on each page. Results may not reflect site conditions, product
        specifications, waste, or local practice. You are responsible for verifying quantities, prices and suitability before buying materials or starting work. Read the full{" "}
        <Link href="/disclaimer">disclaimer</Link>.
      </p>
      <h2>3. No professional advice</h2>
      <p>
        Nothing on the site is engineering, architectural, legal, financial or other professional advice, and it does not replace building codes, permits, manufacturer instructions or a
        qualified professional.
      </p>
      <h2>4. Acceptable use</h2>
      <ul>
        <li>Do not attempt to disrupt, overload or gain unauthorised access to the site.</li>
        <li>Do not scrape or republish substantial parts of the content without permission.</li>
        <li>Do not use the site for any unlawful purpose.</li>
      </ul>
      <h2>5. Intellectual property</h2>
      <p>
        The site design, text, graphics and code are owned by the operator or its licensors. You may use calculator results for your own projects and link to any page. Downloadable templates
        are for personal and internal business use.
      </p>
      <h2>6. Third-party links</h2>
      <p>The site links to third-party websites, including sources and, in future, retailers. We are not responsible for their content, products or policies.</p>
      <h2>7. Liability</h2>
      <p>
        To the extent permitted by law, the site is provided &quot;as is&quot; without warranties of any kind, and the operator is not liable for any loss arising from use of, or reliance on,
        the site. Nothing in these terms limits liability that cannot be limited by law, including consumer rights you have where you live.
      </p>
      <h2>8. Changes</h2>
      <p>We may update these terms. The date at the top shows when they last changed.</p>
      <h2>9. Governing law</h2>
      <p>
        <OwnerPlaceholder>OWNER: governing law and jurisdiction, to be confirmed with legal advice</OwnerPlaceholder>
      </p>
      <h2>10. Contact</h2>
      <p>
        Questions about these terms: see our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
