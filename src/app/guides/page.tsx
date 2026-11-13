import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, PageHeader } from "@/components/ui";
import { GUIDES } from "@/content/guides";

export const metadata: Metadata = {
  title: "Home Improvement Guides",
  description: "Practical guides to measuring and estimating materials: concrete, gravel driveways, tile, roof pitch, cubic yards and mulch.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "Guides", href: "/guides" }]} />
      <div className="mt-5">
        <PageHeader title="Guides" intro={<p>Explanations that go beyond the calculator: how to measure, which allowances to use, and where the numbers come from.</p>} />
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="card group block h-full p-6 hover:border-brand-200">
              <span className="font-display text-lg font-bold group-hover:text-brand-700">{g.title}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-muted">{g.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
