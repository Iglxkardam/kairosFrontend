"use client";

import { BadgeCheck, Loader2 } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";
import type { Idea } from "@/lib/types";
import { useThumb } from "./use-thumb";

// stable pseudo numbers from id so views/duration don't jump between renders
function seed(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function YoutubeCard({ idea }: { idea: Idea }) {
  const n = seed(idea.id);
  const views = `${50 + (n % 850)}K`;
  const days = 1 + (n % 6);
  const dur = `${8 + (n % 12)}:${String(10 + (n % 49)).padStart(2, "0")}`;
  const { url: thumb, pending } = useThumb("youtube", idea.id, idea.hook, idea.topic);

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-card/70">
      <div className="relative aspect-video">
        <div className="absolute inset-0 bg-linear-to-br from-orange via-cassis to-cassis" />
        {thumb ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${thumb})` }} />
        ) : (
          <p className="absolute inset-0 grid place-items-center px-4 text-center font-display text-lg font-extrabold leading-tight text-white">
            {idea.hook}
          </p>
        )}
        {!thumb && pending && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
            <Loader2 size={10} className="animate-spin" /> rendering
          </span>
        )}
        <FaYoutube className="absolute left-2.5 top-2.5 text-white/90" size={20} />
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">
          {dur}
        </span>
      </div>
      <div className="flex gap-3 p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cassis font-display text-sm font-bold text-wasabi">
          S
        </span>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold leading-snug">{idea.hook}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            The Sujal Show <BadgeCheck size={12} />
          </p>
          <p className="text-xs text-muted">
            {views} views · {days}d ago
          </p>
        </div>
      </div>
    </article>
  );
}
