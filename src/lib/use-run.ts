"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Result, VibeOpt } from "./types";
import { addRun, useHistory } from "./history";
import { resetImageUsage } from "./usage-store";

const JOB_KEY = "kairos_job";

export type Phase = "idle" | "running" | "done";

type JobMeta = { id: string; focus: string; vibe: string };

function loadJob(): JobMeta | null {
  try {
    const r = localStorage.getItem(JOB_KEY);
    return r ? (JSON.parse(r) as JobMeta) : null;
  } catch {
    return null;
  }
}

export function useRun() {
  const history = useHistory();
  const result = history[0]?.result ?? null; // newest run is the live one
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false); // request in flight, before a job exists
  const [error, setError] = useState<string | null>(null);
  const polling = useRef(false);
  const starting = useRef(false);
  const dismissError = useCallback(() => setError(null), []);

  // poll a backend job to completion — survives a reload mid-run (job + focus/vibe are stashed in localStorage)
  const poll = useCallback((job: JobMeta) => {
    if (polling.current) return;
    polling.current = true;
    setRunning(true);
    void (async () => {
      let terminal = false; // reached done/error/gone — vs just gave up waiting
      try {
        for (let i = 0; i < 150; i++) {
          await new Promise((r) => setTimeout(r, 2000));
          let j: { status?: string; result?: Result; error?: string } | null = null;
          try {
            const res = await fetch(`/api/job/${job.id}`);
            if (res.status === 404) {
              setError("that run was lost (server restarted) — generate again");
              terminal = true;
              break;
            }
            j = await res.json();
          } catch {
            continue;
          }
          if (j?.status === "done" && j.result) {
            addRun({ id: j.result.meta.runId, ts: Date.now(), focus: job.focus, vibe: job.vibe, result: j.result });
            terminal = true;
            break;
          }
          if (j?.status === "error") {
            setError(j.error ?? "generation failed");
            terminal = true;
            break;
          }
        }
      } finally {
        // keep the job key if we merely timed out, so a reload can resume it
        if (terminal) {
          try {
            localStorage.removeItem(JOB_KEY);
          } catch {
            /* ignore */
          }
        }
        setRunning(false);
        polling.current = false;
      }
    })();
  }, []);

  useEffect(() => {
    const job = loadJob();
    if (job) poll(job);
  }, [poll]);

  const phase: Phase = running ? "running" : result ? "done" : "idle";

  async function generate(focus: string, vibe: VibeOpt) {
    // synchronous guard — blocks a double click in the window before poll() takes over
    if (polling.current || starting.current) return;
    starting.current = true;
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ focus: focus || undefined, vibe, platform: "all" }),
      });
      if (r.status === 429) {
        const d = (await r.json().catch(() => ({}))) as { retryAfter?: number };
        const mins = Math.max(1, Math.ceil((d.retryAfter ?? 600) / 60));
        setError(`Limit reached — 1 generation per 10 minutes. Try again in ~${mins} min.`);
        return; // never flip to running → the current board + thumbnails stay put, no re-render
      }
      if (!r.ok) {
        setError(`request failed (${r.status})`);
        return;
      }
      const { jobId } = (await r.json()) as { jobId?: string };
      if (!jobId) {
        setError("no job id");
        return;
      }
      const job: JobMeta = { id: jobId, focus, vibe };
      localStorage.setItem(JOB_KEY, JSON.stringify(job));
      resetImageUsage();
      setRunning(true); // only now clear the board + show skeletons (a run actually started)
      window.dispatchEvent(new Event("kairos-generating")); // pop the portfolio modal once the run is live
      poll(job);
    } catch (e) {
      setError(e instanceof Error ? e.message : "something broke");
    } finally {
      setSubmitting(false);
      starting.current = false;
    }
  }

  return { phase, result, error, running, submitting, generate, dismissError };
}
