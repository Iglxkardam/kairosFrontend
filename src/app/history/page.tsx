"use client";

import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { useHistory } from "@/lib/history";
import { useMounted } from "@/lib/use-mounted";

function when(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const mounted = useMounted();
  const runs = useHistory();

  return (
    <main className="px-5 pb-12 pt-2 sm:px-8">
      <div className="mb-7">
        <h1 className="font-display text-2xl font-extrabold">History</h1>
        <p className="mt-1 text-sm text-muted">every run you&apos;ve generated, saved on this device. open one for the full board.</p>
      </div>

      {!mounted ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-44 animate-pulse rounded-3xl border border-line bg-card/40" />
          ))}
        </div>
      ) : runs.length === 0 ? (
        <div className="rounded-3xl border border-line bg-card/50 p-10 text-center">
          <p className="text-sm text-muted">no runs yet.</p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-wasabi px-4 py-2 text-sm font-bold text-cassis"
          >
            generate your first <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {runs.map((r) => (
            <Link
              key={r.id}
              href={`/history/${r.id}`}
              className="group rounded-3xl border border-line bg-card/60 p-5 transition hover:border-fg/20"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cassis/10 px-2 py-0.5 font-mono text-[11px] text-muted">#{r.id}</span>
                {r.result.meta.usedMock && (
                  <span className="rounded-full bg-orange/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange">
                    demo data
                  </span>
                )}
              </div>
              <p className="mt-3 truncate font-display text-base font-bold">{r.focus || "Autonomous run"}</p>
              <p className="mt-0.5 text-xs capitalize text-muted">{r.vibe} tone</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Sparkles size={13} /> {r.result.ideas.length} ideas
                </span>
                <span>·</span>
                <span>{r.result.meta.bySource.scanned} sources</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {when(r.ts)}
                </span>
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
