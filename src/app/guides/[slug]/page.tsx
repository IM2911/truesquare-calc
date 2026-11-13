import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/monetization/AdSlot";
import { Breadcrumbs, CalculatorCard, JsonLd } from "@/components/ui";
import { getGuide, GUIDES } from "@/content/guides";
import { getCalculator } from "@/lib/calculators/registry";
import { absoluteUrl, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: { absolute: `${g.metaTitle} | ${SITE.name}` },
    description: g.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { type: "article", title: g.metaTitle, description: g.description, url: `/guides/${slug}`, publishedTime: g.published, modifiedTime: g.updated },
  };
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  const g = getGuide(slug);
  if (!g) notFound();
  const calcs = g.calculators.map((s) => getCalculator(s)).filter((c) => c !== undefined);

  return (
    <div className="container-page py-8 sm:py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          datePublished: g.published,
          dateModified: g.updated,
          mainEntityOfPage: absoluteUrl(`/guides/${slug}`),
          author: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/about") },
          publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
        }}
      />
      <Breadcrumbs items={[{ name: "Guides", href: "/guides" }, { name: g.title, href: `/guides/${slug}` }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="min-w-0">
          <header className="max-w-3xl">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{g.title}</h1>
            <p className="mt-3 text-lg text-ink-soft">{g.summary}</p>
            <p className="mt-3 text-xs text-ink-muted">
              By the {SITE.name} team · Updated <time dateTime={g.updated}>{fmt(g.updated)}</time>
            </p>
          </header>
          <div className="prose-ts mt-8 max-w-3xl">
            {g.sections.map((s, i) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {s.formula && <code className="formula">{s.formula}</code>}
                {s.list &&
                  (s.ordered ? (
                    <ol>
                      {s.list.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {s.list.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  ))}
                {s.table && (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          {s.table.head.map((h) => (
                            <th key={h} scope="col">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r.join("|")}>
                            {r.map((c, j) => (
                              <td key={j} className="tabular">
                                {c}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {i === 1 && <AdSlot placement="in-content" />}
              </section>
            ))}
            <h2>Sources</h2>
            <ul>
              {g.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              This guide is general information, not professional advice. See our <Link href="/disclaimer">disclaimer</Link>.
            </p>
          </div>
        </article>
        <aside className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">Calculators for this guide</h2>
          {calcs.map((c) => (
            <CalculatorCard key={c.slug} calc={c} />
          ))}
        </aside>
      </div>
    </div>
  );
}
