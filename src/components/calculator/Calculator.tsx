"use client";

import { useId, useState } from "react";
import { AlertTriangle, Check, Copy, Info, RotateCcw } from "lucide-react";
import { convertRawValues, defaultRawValues, evaluate, isFieldVisible, type RawValues } from "@/lib/calculators/engine";
import { formatResult } from "@/lib/calculators/format";
import { mustGetCalculator } from "@/lib/calculators/registry";
import type { Field, ResultItem } from "@/lib/calculators/types";
import { CURRENCIES, type CurrencyCode } from "@/lib/site";
import { INPUT_UNITS, type UnitSystem } from "@/lib/units";
import { setPreferences, usePreferences } from "@/components/preferences";

interface Props {
  slug: string;
}

export function Calculator({ slug }: Props) {
  const def = mustGetCalculator(slug);

  const prefs = usePreferences();
  const [state, setState] = useState<{ system: UnitSystem; raw: RawValues }>(() => ({
    system: prefs.system,
    raw: defaultRawValues(def.fields, prefs.system),
  }));
  const [copied, setCopied] = useState(false);
  const formId = useId();

  // Derived-state update during render (React-recommended pattern) when the unit system changes.
  let { raw } = state;
  if (state.system !== prefs.system) {
    raw = convertRawValues(def.fields, state.raw, state.system, prefs.system);
    setState({ system: prefs.system, raw });
  }
  const system = prefs.system;
  const currency = prefs.currency;
  const result = evaluate(def, raw, system, currency);

  const update = (id: string, value: string) => setState((s) => ({ ...s, raw: { ...s.raw, [id]: value } }));
  const reset = () => setState({ system, raw: defaultRawValues(def.fields, system) });

  const visibleFields = def.fields.filter((f) => isFieldVisible(f, raw, def.fields));
  const groups = groupFields(visibleFields);
  const primary = result.output?.results.filter((r) => r.primary) ?? [];
  const secondary = result.output?.results.filter((r) => !r.primary) ?? [];

  async function copyResults() {
    if (!result.output) return;
    const lines = [
      `${def!.title} — TrueSquare`,
      ...result.output.results.map((r) => `${r.label}: ${formatResult(r, system, currency).main}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section aria-labelledby={`${formId}-title`} className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-brand-50/60 px-4 py-3 sm:px-6">
        <h2 id={`${formId}-title`} className="text-base font-bold">
          {def.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 no-print">
          <UnitToggle system={system} />
          <label className="sr-only" htmlFor={`${formId}-currency`}>
            Currency
          </label>
          <select
            id={`${formId}-currency`}
            value={currency}
            onChange={(e) => setPreferences({ currency: e.target.value as CurrencyCode })}
            className="h-9 rounded-lg border border-line-strong bg-surface px-2 text-sm text-ink"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form
          className="space-y-6 p-4 sm:p-6"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          aria-describedby={result.formError ? `${formId}-formerror` : undefined}
        >
          {groups.map(([group, fields]) => (
            <fieldset key={group} className="space-y-4">
              <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">{group}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((f) => (
                  <FieldInput key={f.id} field={f} value={raw[f.id] ?? ""} error={result.errors[f.id]} system={system} currency={currency} onChange={update} formId={formId} />
                ))}
              </div>
            </fieldset>
          ))}
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-sm font-medium text-ink-soft hover:bg-canvas no-print"
          >
            <RotateCcw aria-hidden className="size-4" /> Reset to defaults
          </button>
        </form>

        <div className="border-t border-line bg-canvas/70 p-4 sm:p-6 lg:border-l lg:border-t-0">
          <div aria-live="polite" aria-atomic="false">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Results</h3>
            {result.formError && (
              <p id={`${formId}-formerror`} role="alert" className="mt-3 flex gap-2 rounded-lg bg-danger-bg p-3 text-sm text-danger">
                <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
                {result.formError}
              </p>
            )}
            {!result.output && !result.formError && (
              <p className="mt-3 text-sm text-ink-muted">Complete the highlighted fields to see your results.</p>
            )}
            {result.output && (
              <>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {primary.map((r) => (
                    <PrimaryResult key={r.id} item={r} system={system} currency={currency} />
                  ))}
                </dl>
                {secondary.length > 0 && (
                  <dl className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface">
                    {secondary.map((r) => (
                      <SecondaryResult key={r.id} item={r} system={system} currency={currency} />
                    ))}
                  </dl>
                )}
                {(result.output.notes?.length ?? 0) > 0 && (
                  <ul className="mt-4 space-y-2">
                    {result.output.notes!.map((n) => (
                      <li key={n} className="flex gap-2 text-sm text-ink-soft">
                        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
                        {n}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={copyResults}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800 no-print"
                >
                  {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
                  {copied ? "Copied" : "Copy results"}
                </button>
              </>
            )}
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Estimates only. Prices are your own inputs in {currency}; material properties vary by product and supplier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function groupFields(fields: Field[]): [string, Field[]][] {
  const map = new Map<string, Field[]>();
  for (const f of fields) {
    const g = f.group ?? "Inputs";
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(f);
  }
  return [...map.entries()];
}

function UnitToggle({ system }: { system: UnitSystem }) {
  const options: { value: UnitSystem; label: string }[] = [
    { value: "imperial", label: "Imperial" },
    { value: "metric", label: "Metric" },
  ];
  return (
    <div role="radiogroup" aria-label="Unit system" className="inline-flex h-9 rounded-lg border border-line-strong bg-surface p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={system === o.value}
          onClick={() => setPreferences({ system: o.value })}
          className={`rounded-md px-3 text-sm font-medium transition-colors ${
            system === o.value ? "bg-brand-700 text-white" : "text-ink-soft hover:bg-canvas"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

interface FieldProps {
  field: Field;
  value: string;
  error?: string;
  system: UnitSystem;
  currency: string;
  formId: string;
  onChange: (id: string, value: string) => void;
}

function FieldInput({ field, value, error, system, currency, formId, onChange }: FieldProps) {
  const id = `${formId}-${field.id}`;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy = [field.help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  if (field.kind === "select") {
    return (
      <div className="sm:col-span-2">
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
          {field.label}
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          aria-describedby={describedBy}
          className="h-11 w-full rounded-lg border border-line-strong bg-surface px-3 text-base text-ink"
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {field.help && (
          <p id={helpId} className="mt-1.5 text-xs leading-relaxed text-ink-muted">
            {field.help}
          </p>
        )}
      </div>
    );
  }

  const unit = INPUT_UNITS[field.dimension][system];
  const isPrice = field.dimension.startsWith("price");
  const suffix = isPrice ? `${currency} ${unit.symbol}` : unit.symbol;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {field.label}
        {field.optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      <div
        className={`flex h-11 items-stretch overflow-hidden rounded-lg border bg-surface focus-within:outline-3 focus-within:outline-brand-500 ${
          error ? "border-danger" : "border-line-strong"
        }`}
      >
        <input
          id={id}
          name={field.id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="tabular min-w-0 flex-1 bg-transparent px-3 text-base text-ink outline-none"
        />
        {suffix && (
          <span className="flex items-center border-l border-line bg-canvas px-3 text-sm text-ink-muted" title={unit.name}>
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      )}
      {field.help && (
        <p id={helpId} className="mt-1.5 text-xs leading-relaxed text-ink-muted">
          {field.help}
        </p>
      )}
    </div>
  );
}

function PrimaryResult({ item, system, currency }: { item: ResultItem; system: UnitSystem; currency: string }) {
  const f = formatResult(item, system, currency);
  return (
    <div className="rounded-xl border border-brand-200 bg-surface p-4 shadow-[var(--shadow-card)]">
      <dt className="text-sm text-ink-soft">{item.label}</dt>
      <dd className="tabular mt-1 font-display text-2xl font-extrabold text-brand-800">{f.main}</dd>
      {f.secondary && <dd className="tabular mt-0.5 text-sm text-ink-muted">{f.secondary}</dd>}
      {item.note && <dd className="mt-1 text-xs text-ink-muted">{item.note}</dd>}
    </div>
  );
}

function SecondaryResult({ item, system, currency }: { item: ResultItem; system: UnitSystem; currency: string }) {
  const f = formatResult(item, system, currency);
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 px-4 py-2.5">
      <dt className="text-sm text-ink-soft">
        {item.label}
        {item.note && <span className="block text-xs text-ink-muted">{item.note}</span>}
      </dt>
      <dd className="tabular text-right text-sm font-semibold text-ink">
        {f.main}
        {f.secondary && <span className="block text-xs font-normal text-ink-muted">{f.secondary}</span>}
      </dd>
    </div>
  );
}
