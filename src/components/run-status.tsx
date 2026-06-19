import { Check, Loader2 } from "lucide-react";
import type { Result } from "@/lib/types";
import type { Phase } from "@/lib/use-run";
import { Card } from "./card";

function Gauge({ pct, running }: { pct: number; running: boolean }) {
  const deg = pct * 1.8;
  return (
    <div className="relative mx-auto h-[112px] w-[210px] overflow-hidden">
      <div
        className="absolute left-1/2 top-0 size-[210px] -translate-x-1/2 rounded-full"
        style={{
          background: `conic-gradient(from 270deg, var(--color-wasabi) ${deg}deg, var(--color-line) ${deg}deg 180deg, transparent 180deg)`,
          transition: "background 0.8s ease",
        }}
      />
      <div className="absolute left-1/2 top-[26px] size-[158px] -translate-x-1/2 rounded-full bg-card" />
      <span className="absolute bottom-3 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-wasabi text-cassis">
        {running ? <Loader2 size={20} className="animate-spin" /> : <Check size={22} strokeWidth={3} />}
      </span>
    </div>
  );
}

export function RunStatus({ phase, result }: { phase: Phase; result: Result | null }) {
  const pct = phase === "done" ? 100 : phase === "running" ? 60 : 0;
  const scripts = result ? result.ideas.filter((i) => i.script.length > 0).length : 0;
  const counts = [
    { label: "Sources", n: result?.meta.bySource.scanned ?? 0 },
    { label: "Patterns", n: result ? result.insights.viralHooks.length + result.insights.structures.length : 0 },
    { label: "Ideas", n: result?.ideas.length ?? 0 },
    { label: "Scripts", n: scripts },
  ];

  return (
    <Card title="AI Run Status">
      <Gauge pct={pct} running={phase === "running"} />
      <div className="mt-2 text-center">
        <p className="font-display text-sm font-bold">
          {phase === "done" ? "Run complete" : phase === "running" ? "Pipeline running…" : "Idle"}
        </p>
        <p className="text-xs text-muted">{result ? `took ${(result.meta.ms / 1000).toFixed(1)}s` : "hit start to run"}</p>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2 border-t border-line pt-4 text-center">
        {counts.map((c) => (
          <div key={c.label}>
            <p className="text-xs text-muted">{c.label}</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">{c.n}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
