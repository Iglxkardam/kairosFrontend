"use client";

import { useSyncExternalStore } from "react";
import type { Result } from "./types";

const KEY = "kairos_history";
const MAX = 12; // each run is ~10-30kb json (no images — those live on r2), so this stays well under quota

export type HistoryEntry = { id: string; ts: number; focus: string; vibe: string; result: Result };

const EMPTY: HistoryEntry[] = [];

function read(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? (arr as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

// write, but survive a full localStorage by dropping the oldest runs until it fits
function write(list: HistoryEntry[]) {
  let items = list.slice(0, MAX);
  for (;;) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
      return;
    } catch {
      if (items.length <= 1) {
        try {
          localStorage.removeItem(KEY);
        } catch {
          /* nothing we can do */
        }
        return;
      }
      items = items.slice(0, items.length - 1);
    }
  }
}

const subs = new Set<() => void>();
const ping = () => {
  for (const f of subs) f();
};

export function addRun(entry: HistoryEntry) {
  write([entry, ...read().filter((e) => e.id !== entry.id)]);
  window.dispatchEvent(new Event("kairos-history"));
  ping();
}

export function getRun(id: string): HistoryEntry | null {
  return read().find((e) => e.id === id) ?? null;
}

// stable snapshot: only reparse when the raw string actually changed, else return the cached array
let cacheRaw: string | null = null;
let cacheVal: HistoryEntry[] = EMPTY;
function snapshot(): HistoryEntry[] {
  const raw = typeof localStorage === "undefined" ? null : localStorage.getItem(KEY);
  if (raw === cacheRaw) return cacheVal;
  cacheRaw = raw;
  try {
    const arr = raw ? JSON.parse(raw) : EMPTY;
    cacheVal = Array.isArray(arr) ? (arr as HistoryEntry[]) : EMPTY;
  } catch {
    cacheVal = EMPTY;
  }
  return cacheVal;
}

export function useHistory(): HistoryEntry[] {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      window.addEventListener("kairos-history", cb);
      window.addEventListener("storage", cb);
      return () => {
        subs.delete(cb);
        window.removeEventListener("kairos-history", cb);
        window.removeEventListener("storage", cb);
      };
    },
    snapshot,
    () => EMPTY,
  );
}
