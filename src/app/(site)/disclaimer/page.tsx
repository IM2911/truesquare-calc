import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "TrueSquare calculators give estimates for planning purposes only. Read about assumptions, safety and professional advice.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer">
      <h2>Estimates for planning only</h2>
      <p>
        {SITE.name} calculators produce estimates from the values you enter and the assumptions shown on each page. Real projects vary: ground is uneven, products differ, cuts produce waste and
        measurements contain errors. Always check results, round sensibly, and confirm quantities with your supplier before buying.
      </p>
      <h2>Not engineering or building advice</h2>
      <p>
        Results do not determine whether a slab, footing, driveway, roof or other structure is adequate. Structural sizing, reinforcement, drainage, ventilation, fire safety and similar
        matters depend on loads, soils, climate and local regulations — for example the International Residential and Building Codes in much of the US, the Building Regulations in England and
        Wales, the National Building Code of Canada and provincial codes, and the National Construction Code in Australia. Consult a qualified professional and your local building authority, and
        obtain any permits required.
      </p>
      <h2>Product data</h2>
      <p>
        Bag yields, densities, coverage rates and similar values shown as defaults are typical figures, not specifications for any particular product. Where the manufacturer publishes a figure,
        use theirs.
      </p>
      <h2>Prices and currencies</h2>
      <p>Any cost shown is calculated from prices you enter. We do not provide or guarantee material prices, which vary by country, region, supplier and time.</p>
      <h2>Safety</h2>
      <p>
        Construction work involves hazards such as cement burns, silica dust, heavy lifting, power tools and working at height. Follow manufacturers&apos; safety instructions and the guidance of
        your national health and safety regulator.
      </p>
    </LegalPage>
  );
}
