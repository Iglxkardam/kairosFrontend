"use client";

import { useSyncExternalStore } from "react";

// client-only flag without a setState-in-effect (avoids hydration mismatch)
const noop = () => () => {};
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);

function partOfDay() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function Greeting({ who }: { who: string }) {
  const hydrated = useHydrated();
  const word = hydrated ? partOfDay() : "Welcome";
  return (
    <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
      {word}, {who} 👋
    </h1>
  );
}
