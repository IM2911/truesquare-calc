import type { Metadata } from "next";
import { Download, FileSpreadsheet } from "lucide-react";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Free Project Templates — Budget, Materials & Checklist",
  description: "Free downloadable CSV templates for planning home improvement projects: renovation budget, material planner and project checklist.",
  alternates: { canonical: "/resources" },
};

const TEMPLATES = [
  { file: "/templates/renovation-budget-template.csv", title: "Renovation budget", text: "Track estimated, quoted and actual costs by category, with a contingency line and totals." },
  { file: "/templates/material-planner-template.csv", title: "Material planner", text: "List each area, its dimensions, waste allowance, pack size and cost — ready to fill from our calculators." },
  { file: "/templates/project-checklist.csv", title: "Project checklist", text: "A plan–prepare–build–finish checklist covering permits, services, deliveries and safety." },
];

export default function ResourcesPage() {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs items={[{ name: "Templates", href: "/resources" }]} />
      <div className="mt-5">
        <PageHeader
          title="Free project templates"
          intro={<p>Simple CSV files that open in Excel, Google Sheets, Numbers or LibreOffice. No sign-up required.</p>}
        />
      </div>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {TEMPLATES.map((t) => (
          <li key={t.file} className="card flex flex-col p-6">
            <FileSpreadsheet aria-hidden className="size-7 text-brand-700" />
            <h2 className="mt-3 text-lg font-medium">{t.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{t.text}</p>
            <a href={t.file} download className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800">
              <Download aria-hidden className="size-4" /> Download CSV
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-2xl text-sm text-ink-muted">
        More detailed planners and printable checklists may be offered in future. Free templates will remain free.
      </p>

      <section className="prose-ts mt-14 max-w-3xl" aria-labelledby="how-heading">
        <h2 id="how-heading">How to use the templates</h2>
        <p>
          Each file is a plain CSV (comma-separated values) table. Open it directly in a spreadsheet app, or import it into Google Sheets with File → Import. Because CSV files hold data
          only, add any totals or formulas you want after opening the file, then save it in your spreadsheet&apos;s own format so they are kept.
        </p>
        <ol>
          <li>
            <strong>Start with the material planner.</strong> Add one row per area — a slab, a bed, a room — and fill in the quantity from the matching calculator, including the waste
            allowance it suggests.
          </li>
          <li>
            <strong>Price it in the budget.</strong> Copy the material lines into the renovation budget, add labour, tool hire, delivery and disposal, and keep a contingency line; many
            renovation budgets set aside 10–20 % for surprises.
          </li>
          <li>
            <strong>Work through the checklist.</strong> Before any work starts, confirm permits, utility locations, deliveries and safety equipment; tick items off as the project moves
            from planning to finishing.
          </li>
        </ol>
        <p>
          When a quote arrives, put its figures in the &ldquo;quoted&rdquo; column of the budget next to your own estimate. Large differences are a good prompt to ask the contractor what is
          included, rather than a sign that either number is wrong.
        </p>
      </section>
    </div>
  );
}
