"use client";

import { useState } from "react";

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  function copy(key: string, text: string) {
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        setCopied(key);
        setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
      })
      .catch(() => {});
  }
  return { copied, copy };
}
