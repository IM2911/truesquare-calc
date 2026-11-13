import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { affiliateItemsFor, type AffiliateCategory } from "@/lib/affiliates";

/**
 * "Tools for this job" box. Only items with a real affiliate URL are shown in
 * production; placeholders are visible (clearly labelled) in development only.
 * A disclosure is always shown directly above commercial links.
 */
export function AffiliateBox({ categories }: { categories: AffiliateCategory[] }) {
  const isDev = process.env.NODE_ENV === "development";
  const items = affiliateItemsFor(categories).filter((i) => i.url || isDev);
  if (items.length === 0) return null;

  return (
    <aside aria-labelledby="tools-heading" className="card no-print p-5">
      <h2 id="tools-heading" className="text-lg font-bold">
        Useful tools for this job
      </h2>
      <p className="mt-1 text-xs text-ink-muted">
        Disclosure: some links may be affiliate links. If you buy through them we may earn a commission at no extra cost to you. It never changes our
        calculations. <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border border-line p-3">
            {item.url ? (
              <a href={item.url} target="_blank" rel="sponsored nofollow noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">
                {item.label} <ExternalLink aria-hidden className="size-3.5" />
              </a>
            ) : (
              <span className="font-semibold text-ink">
                {item.label} <span className="ml-1 rounded bg-amber-300 px-1.5 py-0.5 text-[10px] font-bold uppercase text-ink">placeholder – no link</span>
              </span>
            )}
            <p className="mt-1 text-sm text-ink-muted">{item.why}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
