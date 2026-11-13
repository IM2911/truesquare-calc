import Link from "next/link";
import { Menu } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { Logo } from "./Logo";

const NAV = [
  { href: "/calculators", label: "All calculators" },
  { href: "/guides", label: "Guides" },
  { href: "/resources", label: "Templates" },
  { href: "/about", label: "About" },
];

export function Header() {
  const live = CATEGORIES.filter((c) => c.status === "live");
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand-700 focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="TrueSquare home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {live.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="rounded-md px-2.5 py-2 text-sm font-medium text-ink-soft hover:bg-canvas hover:text-ink">
              {c.name}
            </Link>
          ))}
          <span aria-hidden className="mx-1 h-5 w-px bg-line" />
          {NAV.slice(0, 2).map((n) => (
            <Link key={n.href} href={n.href} className="rounded-md px-2.5 py-2 text-sm font-medium text-ink-soft hover:bg-canvas hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border border-line text-ink [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden className="size-5" />
            <span className="sr-only">Open menu</span>
          </summary>
          <nav aria-label="Mobile" className="absolute right-0 top-12 w-64 rounded-xl border border-line bg-surface p-2 shadow-[var(--shadow-raised)]">
            <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">Categories</p>
            {live.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-canvas">
                {c.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-line" />
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-canvas">
                {n.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
