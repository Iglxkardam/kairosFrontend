import type { ReactNode } from "react";
import type { Result } from "@/lib/types";
import { ResearchFeed } from "./research-feed";
import { PatternAnalysis } from "./pattern-analysis";
import { WorkflowActivity } from "./workflow-activity";
import { RunStatus } from "./run-status";
import { AgentUsage } from "./agent-usage";
import { Results } from "./results";

export function statsOf(r: Result) {
  return {
    sources: r.meta.bySource.scanned,
    patterns: r.insights.viralHooks.length + r.insights.structures.length,
    narratives: r.insights.narratives.length + r.insights.trendingWeb3.length,
    ideas: r.ideas.length,
  };
}

// the full "done" view — same on the live dashboard and on a history run.
// `slot` lets the dashboard drop its regenerate panel into the left column.
export function RunBoard({ result, liveImages, slot }: { result: Result; liveImages?: boolean; slot?: ReactNode }) {
  return (
    <>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ResearchFeed counts={result.meta.bySource} />
            <PatternAnalysis insights={result.insights} />
          </div>
          {slot}
        </div>
        <aside className="flex flex-col gap-6 xl:w-85 xl:shrink-0">
          <WorkflowActivity phase="done" result={result} />
          <RunStatus phase="done" result={result} />
          <AgentUsage phase="done" result={result} liveImages={liveImages} />
        </aside>
      </div>
      {result.ideas.length > 0 && <Results result={result} />}
    </>
  );
}
