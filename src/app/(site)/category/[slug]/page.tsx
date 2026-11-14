import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CalculatorCard, PageHeader } from "@/components/ui";
import { getCalculatorContent } from "@/content/calculators";
import { GUIDES } from "@/content/guides";
import { calculatorsInCategory } from "@/lib/calculators/registry";
import { CATEGORIES, getCategory } from "@/lib/categories";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `/category/${slug}` },
    // Planned categories have no calculators yet: keep them out of the index until they do.
    robots: cat.status === "planned" ? { index: false, follow: true } : undefined,
  };
}

export default async function CategoryPage(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const calcs = calculatorsInCategory(cat.slug);
  const calcSlugs = new Set(calcs.map((c) => c.slug));
  const guides = GUIDES.filter((g) => g.calculators.some((s) => calcSlugs.has(s)));

  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "Calculators", href: "/calculators" }, { name: cat.name, href: `/category/${cat.slug}` }]} />
      <div className="mt-5">
        <PageHeader eyebrow="Category" title={cat.title} intro={<p>{cat.intro}</p>} />
      </div>

      {cat.status === "planned" ? (
        <div className="card mt-10 max-w-2xl p-6">
          <p className="font-medium">Not available yet</p>
          <p className="mt-2 text-ink-soft">
            In the meantime, the <Link href="/calculators" className="text-brand-700 underline">full calculator list</Link> covers concrete, landscaping, flooring, roofing and carpentry.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calcs.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
          <section className="mt-14 max-w-3xl" aria-labelledby="which-heading">
            <h2 id="which-heading" className="text-3xl">
              Which calculator do I need?
            </h2>
            <dl className="mt-5 space-y-4">
              {calcs.map((c) => (
                <div key={c.slug}>
                  <dt className="font-medium">
                    <Link href={`/${c.slug}`} className="text-brand-700 hover:underline">
                      {c.title}
                    </Link>
                  </dt>
                  <dd className="mt-1 text-ink-soft">{getCalculatorContent(c.slug)?.lead ?? c.summary}</dd>
                </div>
              ))}
            </dl>
          </section>
          {cat.guidance && (
            <section className="prose-ts mt-14 max-w-3xl" aria-labelledby="guidance-heading">
              <h2 id="guidance-heading">{cat.guidance.heading}</h2>
              {cat.guidance.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {cat.guidance.list && (
                <ul>
                  {cat.guidance.list.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          )}
          {guides.length > 0 && (
            <section className="mt-14" aria-labelledby="guides-heading">
              <h2 id="guides-heading" className="text-3xl">
                Related guides
              </h2>
              <ul className="mt-4 space-y-2">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="font-medium text-brand-700 hover:underline">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
