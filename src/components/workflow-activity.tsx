import { Check, Loader2, Radar, Sparkles, Telescope } from "lucide-react";
import type { Result } from "@/lib/types";
import type { Phase } from "@/lib/use-run";
import { tile } from "@/lib/accent";
import { Card } from "./card";
import { cn } from "@/lib/cn";

export function WorkflowActivity({ phase, result }: { phase: Phase; result: Result | null }) {
  const done = phase === "done";
  const active = phase === "running";
  const steps = [
    {
      Icon: Telescope,
      accent: "wasabi",
      title: "Collecting viral content",
      sub: result ? `${result.meta.bySource.scanned} posts scanned` : "reddit · youtube · news · web",
    },
    {
      Icon: Radar,
      accent: "cool",
      title: "Analyzing patterns",
      sub: result ? `${result.insights.viralHooks.length + result.insights.structures.length} patterns found` : "hooks · structures",
    },
    {
      Icon: Sparkles,
      accent: "orange",
      title: "Generating ideas",
      sub: result ? `${result.ideas.length} ideas · 3 formats` : "reels · youtube · threads",
    },
  ];

  return (
    <Card
      title="Workflow Activity"
      action={
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <span className={cn("size-2 rounded-full", active ? "animate-pulse bg-orange" : "bg-wasabi")} />
          {active ? "running" : "AI Agent"}
        </span>
      }
    >
      <ul className="space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", tile[s.accent])}>
              {done ? <Check size={16} /> : active ? <Loader2 size={15} className="animate-spin" /> : <s.Icon size={15} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{s.title}</p>
              <p className="text-xs text-muted">{s.sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
