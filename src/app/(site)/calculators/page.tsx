import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSearch } from "@/components/CalculatorSearch";
import { Breadcrumbs, CalculatorCard, CategoryIcon, PageHeader } from "@/components/ui";
import { searchItems } from "@/lib/search";
import { calculatorsInCategory } from "@/lib/calculators/registry";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "All Home Improvement & Construction Calculators",
  description: "Every TrueSquare calculator in one place: concrete, gravel, mulch, topsoil, tile, flooring, grout, roof pitch, roof area, board feet and board and batten.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsPage() {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "Calculators", href: "/calculators" }]} />
      <div className="mt-5">
        <PageHeader title="All calculators" intro={<p>Seventeen calculators across five project types. Each one works in imperial and metric units and explains exactly how it calculates.</p>} />
      </div>
      <div className="mt-8">
        <CalculatorSearch items={searchItems()} />
      </div>
      {CATEGORIES.filter((c) => c.status === "live").map((cat) => (
        <section key={cat.slug} className="mt-12" aria-labelledby={`h-${cat.slug}`}>
          <h2 id={`h-${cat.slug}`} className="flex items-center gap-2 text-3xl">
            <CategoryIcon category={cat.slug} className="size-6 text-brand-700" />
            <Link href={`/category/${cat.slug}`} className="hover:text-brand-700">
              {cat.name}
            </Link>
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculatorsInCategory(cat.slug).map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
