"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { useHistory } from "@/lib/history";
import { useMounted } from "@/lib/use-mounted";
import { StatCards } from "@/components/stat-card";
import { RunBoard, statsOf } from "@/components/run-board";

export default function RunPage() {
  const { id } = useParams<{ id: string }>();
  const mounted = useMounted();
  const history = useHistory(); // ssr-safe (empty on server), re-renders once localStorage is read
  const entry = history.find((e) => e.id === id) ?? null;

  if (!mounted) {
    return (
      <main className="px-5 pb-12 pt-2 sm:px-8">
        <div className="h-5 w-32 animate-pulse rounded bg-card/60" />
        <div className="mt-8 h-64 animate-pulse rounded-3xl border border-line bg-card/40" />
      </main>
    );
  }

  if (!entry) {
    return (
      <main className="px-5 pb-12 pt-2 sm:px-8">
        <Link href="/history" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
          <ArrowLeft size={15} /> back to history
        </Link>
        <div className="mt-8 rounded-3xl border border-line bg-card/50 p-10 text-center text-sm text-muted">
          this run isn&apos;t saved on this device anymore.
        </div>
      </main>
    );
  }

  const r = entry.result;
  return (
    <main className="px-5 pb-12 pt-2 sm:px-8">
      <Link href="/history" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft size={15} /> back to history
      </Link>

      <div className="mb-7 mt-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">{entry.focus || "Autonomous run"}</h1>
          <p className="mt-1 text-sm capitalize text-muted">
            {entry.vibe} tone · run #{entry.id}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/60 px-3 py-1.5 text-xs text-muted">
          <Clock size={13} /> {new Date(entry.ts).toLocaleString()}
        </span>
      </div>

      <div className="space-y-6">
        <StatCards values={statsOf(r)} animate runKey={r.meta.runId} />
        <RunBoard result={r} />
      </div>
    </main>
  );
}
