import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { href: "/calculators", label: "Calculators" },
  { href: "/guides", label: "Guides" },
  { href: "/resources", label: "Templates" },
  { href: "/about", label: "About" },
];

/**
 * Same bar as the home page's kit nav (public/index.html): fixed height, opaque, one hairline,
 * plain one-word links and the main action as the one button. The logo is a plain <a>: the home
 * page is a static file, not a Next.js route, so it must load as a full page.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-700 focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- "/" is the static public/index.html, not a Next route */}
        <a href="/" aria-label="TrueSquare home" className="shrink-0">
          <Logo />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link rounded-md px-3 py-2 text-[15px] font-medium text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/calculators" className="btn-primary hidden sm:inline-flex">
            Find a calculator
          </Link>
          <details className="group relative md:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg border border-line-strong text-ink [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden className="size-5" />
              <span className="sr-only">Open menu</span>
            </summary>
            <nav aria-label="Mobile" className="absolute right-0 top-14 w-64 rounded-xl border border-line bg-canvas p-2">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="flex min-h-11 items-center rounded-md px-3 text-base text-ink hover:bg-brand-50">
                  {n.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
