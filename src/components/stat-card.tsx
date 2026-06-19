"use client";

import { Boxes, Flame, Network, Zap } from "lucide-react";
import { tile } from "@/lib/accent";
import { useCount } from "@/lib/use-count";
import { cn } from "@/lib/cn";

const defs = [
  { key: "sources", label: "Sources Scanned", icon: Boxes, accent: "wasabi" },
  { key: "patterns", label: "Viral Patterns Detected", icon: Network, accent: "cool" },
  { key: "narratives", label: "Trending Narratives", icon: Flame, accent: "orange" },
  { key: "ideas", label: "Ideas Generated", icon: Zap, accent: "cassis" },
] as const;

export function StatCards({
  values,
  animate,
  runKey,
}: {
  values: Record<string, number>;
  animate: boolean;
  runKey?: string | number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {defs.map((d) => (
        <Stat
          key={d.key}
          label={d.label}
          Icon={d.icon}
          accent={d.accent}
          value={values[d.key] ?? 0}
          animate={animate}
          runKey={runKey}
        />
      ))}
    </div>
  );
}

function Stat({
  label,
  Icon,
  accent,
  value,
  animate,
  runKey,
}: {
  label: string;
  Icon: typeof Boxes;
  accent: string;
  value: number;
  animate: boolean;
  runKey?: string | number;
}) {
  const n = useCount(value, animate, runKey);
  return (
    <div className="rounded-3xl border border-line bg-card/70 p-5 backdrop-blur">
      <span className={cn("grid size-11 place-items-center rounded-2xl", tile[accent])}>
        <Icon size={20} />
      </span>
      <p className="mt-4 font-display text-3xl font-extrabold tabular-nums">{n.toLocaleString()}</p>
      <p className="mt-1 text-sm">{label}</p>
    </div>
  );
}
