"use client";

import { useEffect, useState } from "react";

// animate 0 → target when `on`. setState lives in the rAF callback, not the effect body.
export function useCount(target: number, on: boolean, resetKey?: string | number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, on, resetKey]);
  return on ? n : 0;
}
