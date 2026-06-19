import { BookOpen, Hash, Link2 } from "lucide-react";
import type { Insights } from "@/lib/types";
import { tile } from "@/lib/accent";
import { Card } from "./card";
import { cn } from "@/lib/cn";

export function PatternAnalysis({ insights }: { insights: Insights }) {
  const blocks = [
    { Icon: Link2, accent: "wasabi", title: "Top Viral Hooks", items: insights.viralHooks },
    { Icon: BookOpen, accent: "cool", title: "Storytelling Structures", items: insights.structures },
    { Icon: Hash, accent: "orange", title: "Trending Crypto Topics", items: [...insights.topics, ...insights.trendingWeb3] },
  ];

  return (
    <Card title="Pattern Analysis">
      <div className="max-h-72 space-y-5 overflow-auto pr-1">
        {blocks.map((b, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", tile[b.accent])}>
              <b.Icon size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{b.title}</p>
              <ul className="mt-1 space-y-0.5">
                {b.items.slice(0, 6).map((it, j) => (
                  <li key={j} className="truncate text-xs text-muted">
                    · {it}
                  </li>
                ))}
              </ul>
            </div>
            <span className="shrink-0 text-sm font-bold tabular-nums">{b.items.length}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
