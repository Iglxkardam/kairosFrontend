"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { useRun, type Phase } from "@/lib/use-run";
import type { VibeOpt } from "@/lib/types";
import { Greeting } from "./greeting";
import { PipelineBanner } from "./pipeline-banner";
import { StatCards } from "./stat-card";
import { WorkflowActivity } from "./workflow-activity";
import { RunStatus } from "./run-status";
import { AgentUsage } from "./agent-usage";
import { RunBoard, statsOf } from "./run-board";
import { Toast } from "./toast";
import { cn } from "@/lib/cn";

const VIBES: VibeOpt[] = ["auto", "educational", "contrarian", "fear", "hype", "story"];

function GeneratePanel({
  phase,
  focus,
  setFocus,
  vibe,
  setVibe,
  generate,
  className,
}: {
  phase: Phase;
  focus: string;
  setFocus: (v: string) => void;
  vibe: VibeOpt;
  setVibe: (v: VibeOpt) => void;
  generate: (focus: string, vibe: VibeOpt) => void;
  className?: string;
}) {
  const title = phase === "done" ? "Generate again" : "Generate viral ideas";
  const sub =
    phase === "done"
      ? "Run a fresh pass on what's trending — same settings or tweak focus & tone below."
      : "Leave focus empty for a fully autonomous run, or steer toward a coin, narrative, or take.";

  return (
    <section
      id="generate"
      className={cn("rounded-3xl border border-line bg-card/70 p-5 backdrop-blur", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-base font-bold">{title}</h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{sub}</p>
        </div>
        <button
          onClick={() => generate(focus, vibe)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-wasabi px-5 py-2.5 font-display text-sm font-bold text-cassis"
        >
          <Wand2 size={16} strokeWidth={2.5} />
          {phase === "done" ? "Generate again" : "Start generating"}
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor="gen-focus" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Optional focus
        </label>
        <input
          id="gen-focus"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          placeholder="e.g. Solana, memecoins, spot ETF flows, a contrarian take…"
          className="mt-2 w-full rounded-2xl border border-line bg-card/60 px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-fg/30"
        />
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Tone & angle</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {VIBES.map((v) => (
            <button
              key={v}
              onClick={() => setVibe(v)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm capitalize",
                vibe === v ? "border-transparent bg-fg text-bg" : "border-line text-muted hover:border-fg/20",
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          {vibe === "auto"
            ? "Auto picks the best mix of tones from live research."
            : `Ideas will lean ${vibe} — hooks, scripts, and angles tuned to that vibe.`}
        </p>
      </div>
    </section>
  );
}

export function Dashboard({ who }: { who: string }) {
  const { phase, result, error, running, submitting, generate, dismissError } = useRun();
  const [focus, setFocus] = useState("");
  const [vibe, setVibe] = useState<VibeOpt>("auto");

  const busy = running || submitting;
  // during a re-run, drop the previous result from view so old numbers/cards clear instantly
  const view = running ? null : result;
  const stats = view ? statsOf(view) : { sources: 0, patterns: 0, narratives: 0, ideas: 0 };

  const panel = (
    <GeneratePanel
      phase={phase}
      focus={focus}
      setFocus={setFocus}
      vibe={vibe}
      setVibe={setVibe}
      generate={generate}
    />
  );

  return (
    <main className="px-5 pb-12 pt-2 sm:px-8">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Greeting who={who} />
          <p className="mt-1 text-sm text-muted">
            {phase === "running" ? "researching what's viral right now…" : "your live crypto content run."}
          </p>
        </div>
        <button
          onClick={() => generate(focus, vibe)}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-full bg-wasabi px-5 py-3 font-display text-sm font-bold text-cassis disabled:opacity-70"
        >
          {busy ? <Loader2 size={17} className="animate-spin" /> : <Wand2 size={17} strokeWidth={2.5} />}
          {busy ? "generating…" : "Start generating crypto content"}
        </button>
      </div>

      <div className="space-y-6">
        <PipelineBanner running={running} />
        <StatCards values={stats} animate={phase === "done"} runKey={result?.meta.runId ?? result?.meta.ms} />

        {phase === "done" && view && <RunBoard result={view} liveImages slot={panel} />}

        {phase === "running" && (
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Skel />
                <Skel />
              </div>
            </div>
            <aside className="flex flex-col gap-6 xl:w-85 xl:shrink-0">
              <WorkflowActivity phase={phase} result={null} />
              <RunStatus phase={phase} result={null} />
              <AgentUsage phase={phase} result={null} />
            </aside>
          </div>
        )}

        {phase === "idle" && panel}
      </div>

      {error && <Toast message={error} onClose={dismissError} />}
    </main>
  );
}

function Skel() {
  return <div className="h-72 animate-pulse rounded-3xl border border-line bg-card/40" />;
}
