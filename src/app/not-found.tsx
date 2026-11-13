import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSearch } from "@/components/CalculatorSearch";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { searchItems } from "@/lib/search";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="container-page flex flex-col items-start py-20">
          <p className="text-sm font-medium text-brand-700">Error 404</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">We couldn&apos;t find that page</h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">It may have moved. Search for the calculator you need:</p>
          <div className="mt-6 w-full max-w-xl">
            <CalculatorSearch items={searchItems()} />
          </div>
          <Link href="/calculators" className="mt-6 font-medium text-brand-700 underline underline-offset-4">
            See all calculators
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
