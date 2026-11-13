import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Globe2, Ruler, ShieldCheck } from "lucide-react";
import { CalculatorSearch } from "@/components/CalculatorSearch";
import { CalculatorCard, CategoryIcon, JsonLd } from "@/components/ui";
import { GUIDES } from "@/content/guides";
import { calculatorsInCategory, getCalculator } from "@/lib/calculators/registry";
import { CATEGORIES } from "@/lib/categories";
import { searchItems } from "@/lib/search";
import { absoluteUrl, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "TrueSquare — Concrete, Gravel, Tile & Roofing Calculators" },
  description: SITE.description,
  alternates: { canonical: "/" },
};

const POPULAR = ["concrete-calculator", "gravel-calculator", "tile-calculator", "mulch-calculator", "roof-pitch-calculator", "concrete-bag-calculator"];

const PRINCIPLES = [
  { icon: CheckCircle2, title: "Formulas you can check", text: "Every calculator shows its formula, a worked example and its assumptions. Calculation code is covered by automated tests." },
  { icon: Globe2, title: "Imperial and metric", text: "Feet, inches and cubic yards, or metres, centimetres and cubic metres — switch at any time. Prices in USD, GBP, CAD, AUD or EUR." },
  { icon: Ruler, title: "Your numbers, not ours", text: "Bag yields, densities and prices are editable. We never present a single price or product yield as universal." },
  { icon: ShieldCheck, title: "Private by default", text: "Calculations run in your browser. No account, no sign-up, and no tracking cookies." },
];

export default function HomePage() {
  const popular = POPULAR.map((s) => getCalculator(s)!);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: absoluteUrl("/"),
          description: SITE.description,
          inLanguage: "en",
        }}
      />
      <section className="border-b border-line bg-surface">
        <div className="container-page relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
              17 free calculators · imperial &amp; metric
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.1] sm:text-5xl">
              Order the right amount. <span className="text-brand-700">The first time.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Accurate calculators for concrete, gravel, mulch, tile, flooring, roofing and carpentry — with the formula, a worked example and every assumption shown.
            </p>
            <div className="mt-8">
              <CalculatorSearch items={searchItems()} />
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              Popular:{" "}
              {popular.slice(0, 4).map((c, i) => (
                <span key={c.slug}>
                  {i > 0 && " · "}
                  <Link href={`/${c.slug}`} className="font-medium text-brand-700 hover:underline">
                    {c.shortTitle}
                  </Link>
                </span>
              ))}
            </p>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="container-page py-14" aria-labelledby="categories-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="categories-heading" className="text-2xl font-extrabold sm:text-3xl">
              Browse by project
            </h2>
            <p className="mt-2 text-ink-muted">Every calculator has its own page with a full explanation.</p>
          </div>
          <Link href="/calculators" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
            All calculators <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.filter((c) => c.status === "live").map((cat) => {
            const calcs = calculatorsInCategory(cat.slug);
            return (
              <div key={cat.slug} className="card p-5">
                <Link href={`/category/${cat.slug}`} className="group flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-brand-700 text-white">
                    <CategoryIcon category={cat.slug} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold group-hover:text-brand-700">{cat.name}</span>
                    <span className="block text-xs text-ink-muted">{calcs.length} calculators</span>
                  </span>
                </Link>
                <ul className="mt-4 space-y-1.5">
                  {calcs.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/${c.slug}`} className="text-sm text-ink-soft hover:text-brand-700 hover:underline">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="rounded-[var(--radius-card)] border border-dashed border-line-strong p-5">
            <p className="font-display text-lg font-bold text-ink-soft">Coming later</p>
            <p className="mt-2 text-sm text-ink-muted">
              Painting and insulation calculators are planned. We only publish a calculator once its formulas are documented and tested.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14" aria-labelledby="popular-heading">
        <div className="container-page">
          <h2 id="popular-heading" className="text-2xl font-extrabold sm:text-3xl">
            Most-used calculators
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <CalculatorCard key={c.slug} calc={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-2xl font-extrabold sm:text-3xl">
          Built to be trusted
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title}>
              <p.icon aria-hidden className="size-6 text-brand-700" />
              <h3 className="mt-3 text-base font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-4" aria-labelledby="guides-heading">
        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="guides-heading" className="flex items-center gap-2 text-2xl font-extrabold">
              <BookOpen aria-hidden className="size-6 text-brand-700" /> Project guides
            </h2>
            <Link href="/guides" className="text-sm font-semibold text-brand-700 hover:underline">
              All guides
            </Link>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group block">
                  <span className="font-semibold text-ink group-hover:text-brand-700">{g.title}</span>
                  <span className="mt-0.5 block text-sm text-ink-muted">{g.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/** Decorative blueprint-style illustration of a result card. Pure SVG/CSS, no image download. */
function HeroVisual() {
  return (
    <div aria-hidden className="relative hidden lg:block">
      <div className="absolute -inset-6 rounded-3xl bg-[linear-gradient(var(--color-brand-100)_1px,transparent_1px),linear-gradient(90deg,var(--color-brand-100)_1px,transparent_1px)] bg-[size:24px_24px] opacity-70" />
      <div className="card relative space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Concrete Slab</span>
          <span className="rounded-md bg-brand-700 px-2 py-1 text-xs font-medium text-white">Imperial</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-ink-muted">
          {["12 ft", "12 ft", "4 in"].map((v, i) => (
            <div key={i} className="rounded-lg border border-line-strong px-3 py-2 tabular text-ink">
              {v}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-brand-200 p-4">
            <p className="text-xs text-ink-muted">Concrete to order</p>
            <p className="font-display text-2xl font-extrabold text-brand-800 tabular">1.96 yd³</p>
          </div>
          <div className="rounded-xl border border-brand-200 p-4">
            <p className="text-xs text-ink-muted">80 lb bags</p>
            <p className="font-display text-2xl font-extrabold text-brand-800 tabular">88</p>
          </div>
        </div>
        <p className="formula text-xs">V = 12 × 12 × 0.333 ft × 1.10 = 52.8 ft³</p>
      </div>
    </div>
  );
}
