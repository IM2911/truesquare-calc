import Link from "next/link";
import { PrivacySettingsLink } from "@/components/monetization/PrivacySettingsLink";
import { CATEGORIES } from "@/lib/categories";
import { SITE } from "@/lib/site";
import { LogoMark } from "./Logo";

const COLUMNS = [
  { title: "Trades", links: CATEGORIES.filter((c) => c.status === "live").map((c) => ({ href: `/category/${c.slug}`, label: c.name })) },
  {
    title: "Popular",
    links: [
      { href: "/concrete-calculator", label: "Concrete" },
      { href: "/gravel-calculator", label: "Gravel" },
      { href: "/mulch-calculator", label: "Mulch" },
      { href: "/tile-calculator", label: "Tile" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/guides", label: "All guides" },
      { href: "/resources", label: "Templates" },
      { href: "/calculators", label: "All calculators" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
    ],
  },
];

/** The dark footer of the home page (taste-skill footer-dark), rebuilt for the inner pages. */
export function Footer() {
  return (
    <footer className="mt-24 bg-brand-700 text-[#f7f9f8]">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- "/" is the static public/index.html, not a Next route */}
          <a href="/" className="inline-flex items-center gap-3 font-display text-3xl tracking-tight">
            <LogoMark className="size-10" inverse />
            {SITE.name}
          </a>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-[#c1d0d2]">
            Material calculators for concrete, landscaping, flooring, roofing and carpentry.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
            <h2 className="text-[13px] font-medium text-[#c1d0d2]">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link text-[15px]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] text-[#c1d0d2] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date(SITE.lastReviewed).getFullYear()} {SITE.name} ·{" "}
            <Link href="/privacy-policy" className="footer-link">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="footer-link">
              Terms
            </Link>
            <PrivacySettingsLink fallback="" className="footer-link ml-1 before:mr-1 before:content-['·']" />
          </p>
          <p>Results are estimates, not professional or building-code advice.</p>
        </div>
      </div>
    </footer>
  );
}
