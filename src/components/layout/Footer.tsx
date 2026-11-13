import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { CALCULATORS } from "@/lib/calculators/registry";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const POPULAR = ["concrete-calculator", "gravel-calculator", "mulch-calculator", "tile-calculator", "roof-pitch-calculator", "board-foot-calculator"];

const COMPANY = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/guides", label: "Guides" },
  { href: "/resources", label: "Free templates" },
];

const LEGAL = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
];

export function Footer() {
  const popular = POPULAR.map((s) => CALCULATORS.find((c) => c.slug === s)!).filter(Boolean);
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            Free calculators that show their working. Every formula is documented and tested, and every result is an estimate you can check.
          </p>
        </div>
        <FooterList title="Categories" links={CATEGORIES.filter((c) => c.status === "live").map((c) => ({ href: `/category/${c.slug}`, label: c.name }))} />
        <FooterList title="Popular" links={popular.map((c) => ({ href: `/${c.slug}`, label: c.title }))} />
        <div className="grid gap-8">
          <FooterList title="Company" links={COMPANY} />
          <FooterList title="Legal" links={LEGAL} />
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date(SITE.lastReviewed).getFullYear()} {SITE.name}. Results are estimates and do not replace professional advice or local building codes.
          </p>
          <p>Imperial &amp; metric · USD, GBP, CAD, AUD</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-ink-soft hover:text-brand-700">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
