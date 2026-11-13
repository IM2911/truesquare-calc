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
            <h2 className="mt-3 text-lg font-bold">{t.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{t.text}</p>
            <a href={t.file} download className="mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
              <Download aria-hidden className="size-4" /> Download CSV
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-2xl text-sm text-ink-muted">
        More detailed planners and printable checklists may be offered in future. Free templates will remain free.
      </p>
    </div>
  );
}
