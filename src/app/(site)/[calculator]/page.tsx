import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Calculator } from "@/components/calculator/Calculator";
import { AdSlot } from "@/components/monetization/AdSlot";
import { AffiliateBox } from "@/components/monetization/AffiliateBox";
import { Breadcrumbs, Callout, CalculatorCard, JsonLd } from "@/components/ui";
import { getCalculatorContent } from "@/content/calculators";
import { getGuide } from "@/content/guides";
import { CALCULATORS, getCalculator } from "@/lib/calculators/registry";
import { getCategory } from "@/lib/categories";
import { absoluteUrl, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ calculator: c.slug }));
}

export async function generateMetadata(props: PageProps<"/[calculator]">): Promise<Metadata> {
  const { calculator } = await props.params;
  const content = getCalculatorContent(calculator);
  if (!content) return {};
  const path = `/${calculator}`;
  return {
    title: { absolute: `${content.metaTitle} | ${SITE.name}` },
    description: content.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: content.metaTitle, description: content.metaDescription, url: path, type: "website" },
  };
}

export default async function CalculatorPage(props: PageProps<"/[calculator]">) {
  const { calculator: slug } = await props.params;
  const def = getCalculator(slug);
  const content = getCalculatorContent(slug);
  if (!def || !content) notFound();
  const category = getCategory(def.category)!;
  const related = content.related.map((s) => getCalculator(s)).filter((c) => c !== undefined);
  const guide = content.guide ? getGuide(content.guide) : undefined;

  return (
    <div className="container-page py-8 sm:py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: def.title,
          url: absoluteUrl(`/${slug}`),
          description: content.metaDescription,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (web browser)",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Breadcrumbs items={[{ name: category.name, href: `/category/${category.slug}` }, { name: def.title, href: `/${slug}` }]} />

      <header className="mt-5 max-w-3xl">
        <h1 className="text-4xl sm:text-[56px]">{def.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-ink-soft">{content.lead}</p>
        <p className="mt-2 text-[13px] text-ink-muted">
          Formulas reviewed {new Date(SITE.lastReviewed).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} ·{" "}
          <Link href="#formula" className="underline">
            See the formula
          </Link>
        </p>
      </header>

      <div className="mt-6">
        <Calculator slug={slug} />
      </div>

      {content.safety && (
        <div className="mt-6 max-w-3xl">
          <Callout tone="warning" title="Important">
            {content.safety}
          </Callout>
        </div>
      )}

      <AdSlot placement="below-calculator" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="prose-ts min-w-0">
          <h2>About the {def.title.toLowerCase()}</h2>
          {content.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}

          <h2>How to use it</h2>
          <ol>
            {content.howTo.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>

          <h2 id="formula">Formula</h2>
          <div className="space-y-3">
            {content.formulas.map((f) => (
              <div key={f.label}>
                <p className="mb-1 text-sm font-medium text-ink">{f.label}</p>
                <code className="formula">{f.expr}</code>
              </div>
            ))}
          </div>
          <ul>
            {content.formulaNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>

          <h2>Worked example: {content.example.title}</h2>
          <ol>
            {content.example.steps.map((s) => (
              <li key={s} className="tabular">
                {s}
              </li>
            ))}
          </ol>
          <p>
            <strong>Result:</strong> {content.example.result}
          </p>

          <AdSlot placement="in-content" />

          <h2>Assumptions and limitations</h2>
          <ul>
            {content.assumptions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <h2>Frequently asked questions</h2>
          <div className="not-prose space-y-3">
            {content.faqs.map((f) => (
              <details key={f.q} className="card group p-4 open:shadow-[var(--shadow-raised)]">
                <summary className="cursor-pointer list-none font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    {f.q}
                    <span aria-hidden className="text-brand-700 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-2 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>

          <h2>Sources and further reading</h2>
          <ul>
            {content.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener noreferrer" target="_blank">
                  {s.title}
                </a>
                {s.note && <> — {s.note}</>}
              </li>
            ))}
          </ul>
          <p className="text-sm">
            Results are estimates for planning purposes. See our <Link href="/disclaimer">disclaimer</Link> for details.
          </p>
        </article>

        <aside className="space-y-6">
          {guide && (
            <Link href={`/guides/${guide.slug}`} className="card group block p-5 hover:border-brand-200">
              <span className="flex items-center gap-2 text-[13px] font-medium text-brand-700">
                <BookOpen aria-hidden className="size-4" /> Guide
              </span>
              <span className="mt-2 block font-display font-medium text-ink group-hover:text-brand-700">{guide.title}</span>
              <span className="mt-1 block text-sm text-ink-muted">{guide.summary}</span>
            </Link>
          )}
          <div>
            <h2 className="text-sm font-medium text-ink-muted">Related calculators</h2>
            <div className="mt-3 grid gap-3">
              {related.map((c) => (
                <CalculatorCard key={c.slug} calc={c} />
              ))}
            </div>
          </div>
          <AffiliateBox categories={content.affiliate} />
        </aside>
      </div>
    </div>
  );
}
