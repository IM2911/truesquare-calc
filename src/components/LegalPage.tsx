import { Breadcrumbs } from "@/components/ui";
import { SITE } from "@/lib/site";

/** Visible marker for details the site owner must confirm before launch. */
export function OwnerPlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-amber-300/70 px-1 font-medium text-ink" title="To be completed by the site owner">
      [{children}]
    </mark>
  );
}

export function LegalPage({ title, path, updated = SITE.lastReviewed, children }: { title: string; path: string; updated?: string; children: React.ReactNode }) {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: title, href: path }]} />
      <article className="mt-5 max-w-3xl">
        <h1 className="text-4xl sm:text-[56px]">{title}</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Last updated: <time dateTime={updated}>{new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
        </p>
        <div className="prose-ts mt-8">{children}</div>
      </article>
    </div>
  );
}
