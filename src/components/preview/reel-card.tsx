"use client";

import { Heart, Loader2, Music2 } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import type { Idea } from "@/lib/types";
import { useThumb } from "./use-thumb";

export function ReelCard({ idea }: { idea: Idea }) {
  const { url: thumb, pending } = useThumb("reel", idea.id, idea.hook, idea.topic);
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card/70">
      <div className="relative aspect-9/16">
        <div className="absolute inset-0 bg-linear-to-b from-wasabi/40 via-cassis to-cassis" />
        {thumb ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${thumb})` }} />
        ) : (
          <p className="absolute inset-x-0 top-[28%] px-4 text-center font-display text-xl font-extrabold leading-tight text-white">
            {idea.hook}
          </p>
        )}
        {!thumb && pending && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
            <Loader2 size={10} className="animate-spin" /> rendering
          </span>
        )}
        <FaInstagram className="absolute right-2.5 top-2.5 text-white/90" size={18} />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 text-white">
          <p className="text-xs font-semibold">@thesujalshow</p>
          <p className="mt-0.5 line-clamp-2 text-xs text-white/85">{idea.angle}</p>
          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-white/70">
            <Music2 size={11} /> original audio
          </p>
        </div>
        <Heart className="absolute bottom-3 right-3 text-white/90" size={18} />
      </div>
    </article>
  );
}
