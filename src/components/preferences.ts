"use client";

import { useSyncExternalStore } from "react";
import { CURRENCIES, type CurrencyCode } from "@/lib/site";
import type { UnitSystem } from "@/lib/units";

/**
 * Viewer preferences (unit system + currency) kept in localStorage.
 * This is a functional preference only — no tracking, no cookies.
 */

export interface Preferences {
  system: UnitSystem;
  currency: CurrencyCode;
}

const KEY = "truesquare:prefs";
const EVENT = "truesquare:prefs-change";
export const DEFAULT_PREFS: Preferences = { system: "imperial", currency: "USD" };
const DEFAULT_RAW = JSON.stringify(DEFAULT_PREFS);

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? DEFAULT_RAW;
  } catch {
    return DEFAULT_RAW;
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function parse(raw: string): Preferences {
  try {
    const p = JSON.parse(raw) as Partial<Preferences>;
    const system = p.system === "metric" ? "metric" : "imperial";
    const currency = CURRENCIES.some((c) => c.code === p.currency) ? (p.currency as CurrencyCode) : "USD";
    return { system, currency };
  } catch {
    return DEFAULT_PREFS;
  }
}

let memory = DEFAULT_RAW;

export function setPreferences(next: Partial<Preferences>): void {
  const merged = { ...parse(read()), ...next };
  memory = JSON.stringify(merged);
  try {
    window.localStorage.setItem(KEY, memory);
  } catch {
    /* storage blocked – keep in memory for this page view */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function usePreferences(): Preferences {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      const stored = read();
      return stored === DEFAULT_RAW && memory !== DEFAULT_RAW ? memory : stored;
    },
    () => DEFAULT_RAW,
  );
  return parse(raw);
}
