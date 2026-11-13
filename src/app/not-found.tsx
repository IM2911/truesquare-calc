import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };
import { CalculatorSearch } from "@/components/CalculatorSearch";
import { searchItems } from "@/lib/search";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-start py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">It may have moved. Try searching for the calculator you need:</p>
      <div className="mt-6 w-full max-w-xl">
        <CalculatorSearch items={searchItems()} />
      </div>
      <Link href="/calculators" className="mt-6 font-semibold text-brand-700 underline">
        Browse all calculators
      </Link>
    </div>
  );
}
