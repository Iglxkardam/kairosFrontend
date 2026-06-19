"use client";

import { useEffect, useState } from "react";
import { addImageUsage, type Usage } from "@/lib/usage-store";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// returns the thumbnail url once generated AND downloaded, plus a pending flag for the loading state.
// gen is slow (~20-30s) and the proxy can time out before it finishes — but the backend still uploads
// to r2. so we keep re-asking: once it's cached the call returns instantly (head-object hit). we also
// preload via new Image() so the bitmap is in cache before paint (browsers defer offscreen bg-images).
export function useThumb(format: "reel" | "youtube", id: string, hook: string, topic: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    let on = true;
    const ctrl = new AbortController();

    const preload = (u: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = u;
      });

    void (async () => {
      for (let attempt = 0; attempt < 6 && on; attempt++) {
        let d: { url?: string; usage?: Usage } | null = null;
        try {
          const r = await fetch("/api/thumbnail", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id, format, hook, topic }),
            signal: ctrl.signal,
          });
          d = r.ok ? await r.json() : null;
        } catch {
          return; // aborted (unmounted) or network gone
        }
        if (!on) return;
        if (d?.usage) addImageUsage(d.usage);

        if (d?.url) {
          // r2 public url can lag a beat after upload → preload with a few cache-busted retries
          for (let p = 0; p < 4 && on; p++) {
            const src = p ? `${d.url}?r=${p}` : d.url;
            if (await preload(src)) {
              if (on) {
                setUrl(src);
                setPending(false);
              }
              return;
            }
            await wait(600 * (p + 1));
          }
        }
        // null (gen still finishing on the backend / proxy timed out) → wait and re-ask
        await wait(4000);
      }
      if (on) setPending(false); // gave up → styled cover stays
    })();

    return () => {
      on = false;
      ctrl.abort();
    };
  }, [id, format, hook, topic]);

  return { url, pending };
}
