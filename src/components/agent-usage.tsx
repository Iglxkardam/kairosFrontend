"use client";

import { ArrowDownLeft, ArrowUpRight, Bot, Coins } from "lucide-react";
import type { Result } from "@/lib/types";
import type { Phase } from "@/lib/use-run";
import { useImageUsage } from "@/lib/usage-store";
import { tile } from "@/lib/accent";
import { Card } from "./card";
import { cn } from "@/lib/cn";

function fmtTok(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

function fmtCost(usd: number) {
  if (usd <= 0) return "$0.00";
  if (usd < 0.01) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(3)}`;
}

const empty = { tokensIn: 0, tokensOut: 0, totalTokens: 0, llmCalls: 0, costUsd: 0 };

export function AgentUsage({
  phase,
  result,
  liveImages = false,
}: {
  phase: Phase;
  result: Result | null;
  liveImages?: boolean;
}) {
  const img = useImageUsage();
  const add = liveImages ? img : empty; // history runs show their saved text usage; only the live run folds in images
  const base = result?.meta.agent ?? empty;
  // text pipeline (plan + grounding + analyze + generate) + image gen, combined
  const agent = {
    tokensIn: base.tokensIn + add.tokensIn,
    tokensOut: base.tokensOut + add.tokensOut,
    totalTokens: base.totalTokens + add.totalTokens,
    llmCalls: base.llmCalls + add.llmCalls,
    costUsd: base.costUsd + add.costUsd,
  };
  const live = phase === "done" && agent.llmCalls > 0;

  const badges = [
    { label: "Tokens in", value: live ? fmtTok(agent.tokensIn) : "—", Icon: ArrowDownLeft, accent: "cool" },
    { label: "Tokens out", value: live ? fmtTok(agent.tokensOut) : "—", Icon: ArrowUpRight, accent: "wasabi" },
    { label: "Est. cost", value: live ? fmtCost(agent.costUsd) : "—", Icon: Coins, accent: "orange" },
    { label: "LLM calls", value: live ? String(agent.llmCalls) : "—", Icon: Bot, accent: "sage" },
  ] as const;

  return (
    <Card
      title="AI Agent"
      className="p-4!"
      action={
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-medium text-muted">
          {phase === "running" ? "tracking…" : live ? `${fmtTok(agent.totalTokens)} total` : "idle"}
        </span>
      }
    >
      <div className="grid grid-cols-2 gap-2">
        {badges.map((b) => (
          <div key={b.label} className="rounded-xl border border-line bg-card/40 px-2.5 py-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                tile[b.accent],
              )}
            >
              <b.Icon size={10} strokeWidth={2.5} />
              {b.label}
            </span>
            <p className="mt-1 font-display text-base font-bold tabular-nums leading-none">{b.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
