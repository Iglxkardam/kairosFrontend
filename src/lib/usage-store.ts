"use client";

import { useSyncExternalStore } from "react";

export type Usage = { tokensIn: number; tokensOut: number; totalTokens: number; llmCalls: number; costUsd: number };
const ZERO: Usage = { tokensIn: 0, tokensOut: 0, totalTokens: 0, llmCalls: 0, costUsd: 0 };

// thumbnails generate after the run, so their usage is accumulated here on the client
// and added to the run's text usage. resets when a new run starts.
let data: Usage = ZERO;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

export function addImageUsage(u: Usage) {
  data = {
    tokensIn: data.tokensIn + u.tokensIn,
    tokensOut: data.tokensOut + u.tokensOut,
    totalTokens: data.totalTokens + u.totalTokens,
    llmCalls: data.llmCalls + u.llmCalls,
    costUsd: data.costUsd + u.costUsd,
  };
  emit();
}

export function resetImageUsage() {
  data = ZERO;
  emit();
}

export function useImageUsage(): Usage {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => data,
    () => ZERO,
  );
}
