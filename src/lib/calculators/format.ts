import { FT, FT2, FT3, IN, IN3, LB, SHORT_TON, YD3, type UnitSystem } from "@/lib/units";
import type { ResultItem } from "./types";

export interface FormattedResult {
  main: string;
  secondary?: string;
}

const nf = (value: number, decimals: number) =>
  new Intl.NumberFormat("en", { maximumFractionDigits: decimals, minimumFractionDigits: 0 }).format(value);

const nfFixed = (value: number, decimals: number) =>
  new Intl.NumberFormat("en", { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value);

export function formatMoney(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
  } catch {
    return `${nfFixed(value, 2)} ${currency}`;
  }
}

function formatMass(kg: number, system: UnitSystem): FormattedResult {
  const lb = kg / LB;
  const tons = kg / SHORT_TON;
  const imperial = lb >= 2000 ? `${nf(tons, 2)} US tons` : `${nf(lb, lb < 10 ? 1 : 0)} lb`;
  const metric = kg >= 1000 ? `${nf(kg / 1000, 2)} tonnes` : `${nf(kg, kg < 10 ? 2 : 0)} kg`;
  return system === "imperial" ? { main: imperial, secondary: metric } : { main: metric, secondary: imperial };
}

export function formatResult(item: ResultItem, system: UnitSystem, currency: string): FormattedResult {
  if (item.kind === "text") return { main: String(item.value) };
  const v = Number(item.value);
  if (!Number.isFinite(v)) return { main: "—" };

  switch (item.kind) {
    case "volume": {
      const imperial = `${nf(v / YD3, 2)} yd³`;
      const ft3 = `${nf(v / FT3, 1)} ft³`;
      const metric = `${nf(v, 2)} m³`;
      return system === "imperial"
        ? { main: imperial, secondary: `${ft3} · ${metric}` }
        : { main: metric, secondary: `${nf(v * 1000, 0)} L · ${imperial}` };
    }
    case "smallVolume": {
      const imperial = `${nf(v / IN3, 0)} in³`;
      const metric = `${nf(v * 1000, 2)} L`;
      return system === "imperial" ? { main: imperial, secondary: metric } : { main: metric, secondary: imperial };
    }
    case "area": {
      const imperial = `${nf(v / FT2, 1)} ft²`;
      const metric = `${nf(v, 2)} m²`;
      return system === "imperial" ? { main: imperial, secondary: metric } : { main: metric, secondary: imperial };
    }
    case "length": {
      const imperial = `${nf(v / FT, 2)} ft`;
      const metric = `${nf(v, 2)} m`;
      return system === "imperial" ? { main: imperial, secondary: metric } : { main: metric, secondary: imperial };
    }
    case "shortLength": {
      const imperial = `${nf(v / IN, 2)} in`;
      const metric = v < 0.1 ? `${nf(v * 1000, 1)} mm` : `${nf(v * 100, 1)} cm`;
      return system === "imperial" ? { main: imperial, secondary: metric } : { main: metric, secondary: imperial };
    }
    case "mass":
      return formatMass(v, system);
    case "count":
      return { main: `${nf(v, 0)}${item.suffix ? ` ${item.suffix}` : ""}` };
    case "money":
      return { main: formatMoney(v, currency) };
    case "angle":
      return { main: `${nf(v, item.decimals ?? 1)}°` };
    case "percent":
      return { main: `${nf(v, item.decimals ?? 1)}%` };
    case "number":
      return { main: `${nf(v, item.decimals ?? 2)}${item.suffix ? ` ${item.suffix}` : ""}` };
    default:
      return { main: String(item.value) };
  }
}
