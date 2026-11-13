"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";

export interface SearchItem {
  slug: string;
  title: string;
  summary: string;
  terms: string;
}

/** Client-side search over the calculator list. No network requests. */
export function CalculatorSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const id = useId();
  const matches = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    return items.filter((i) => words.every((w) => i.terms.includes(w))).slice(0, 6);
  }, [items, query]);

  return (
    <div className="relative w-full max-w-xl" role="search">
      <label htmlFor={id} className="sr-only">
        Search calculators
      </label>
      <div className="flex h-14 items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 shadow-[var(--shadow-raised)] focus-within:outline-3 focus-within:outline-brand-500">
        <Search aria-hidden className="size-5 text-ink-muted" />
        <input
          id={id}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: concrete, mulch, tile, roof pitch…"
          autoComplete="off"
          aria-controls={`${id}-results`}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
        />
      </div>
      <div id={`${id}-results`} aria-live="polite">
        {query.trim() !== "" && (
          <ul className="absolute inset-x-0 top-16 z-30 overflow-hidden rounded-xl border border-line bg-surface text-left shadow-[var(--shadow-raised)]">
            {matches.length === 0 ? (
              <li className="px-4 py-3 text-sm text-ink-muted">
                No calculator matches “{query}”. <Link href="/calculators" className="font-medium text-brand-700 underline">Browse all calculators</Link>
              </li>
            ) : (
              matches.map((m) => (
                <li key={m.slug} className="border-b border-line last:border-0">
                  <Link href={`/${m.slug}`} className="block px-4 py-3 hover:bg-brand-50">
                    <span className="block font-medium text-ink">{m.title}</span>
                    <span className="block text-sm text-ink-muted">{m.summary}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
