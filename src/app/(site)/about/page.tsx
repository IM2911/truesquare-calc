import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CALCULATORS } from "@/lib/calculators/registry";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who builds TrueSquare, how our calculators are made and tested, and how the site is funded.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title="About TrueSquare" path="/about">
      <p>
        {SITE.name} is a free collection of home improvement and construction calculators for people planning real projects — homeowners, DIYers and anyone who wants to check a quote. We
        currently publish {CALCULATORS.length} calculators covering concrete, landscaping, flooring and tile, roofing and carpentry.
      </p>

      <h2>How we build calculators</h2>
      <ul>
        <li>
          <strong>Documented formulas.</strong> Every calculator page shows the exact formula, a worked example and the assumptions behind it.
        </li>
        <li>
          <strong>Tested code.</strong> Calculation logic is separated from the interface and covered by automated tests, including unit conversions, rounding and invalid inputs.
        </li>
        <li>
          <strong>Exact unit conversions.</strong> Imperial–metric conversions use the exact definitions published by NIST (1 in = 25.4 mm, 1 lb = 0.45359237 kg).
        </li>
        <li>
          <strong>No invented product data.</strong> Where a result depends on a product — bag yield, density, coverage per box — you can enter the value from your product, and any typical value
          we use is labelled as such.
        </li>
        <li>
          <strong>Estimates, not engineering.</strong> We calculate quantities. We do not size structures or replace professional advice or local building codes.
        </li>
      </ul>

      <h2>Who is behind the site</h2>
      <p>
        {SITE.name} is an independent project operated by {SITE.operator.name}, an individual based in {SITE.operator.location}. We do not claim professional engineering or trade
        credentials. Instead, every formula is documented, sourced and tested so you can check the work yourself.
      </p>

      <h2>How the site is funded</h2>
      <p>
        The calculators are free. The site is supported by advertising served through Google AdSense, shown in clearly separated spaces and never inside a calculator, and may in future
        include affiliate links and optional paid templates. Commercial relationships will never change how a calculator works or what it recommends. See our{" "}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link> and <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Found a mistake?</h2>
      <p>
        Accuracy matters more to us than anything else. If you think a result, formula or explanation is wrong, please <Link href="/contact">contact us</Link> with the calculator name and the values
        you entered.
      </p>
    </LegalPage>
  );
}
