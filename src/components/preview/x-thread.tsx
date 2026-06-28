import { BadgeCheck, BarChart3, Heart, MessageCircle, Repeat2 } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import type { Idea } from "@/lib/types";

function seed(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function XThread({ idea }: { idea: Idea }) {
  const n = seed(idea.id);
  const stat = (k: number) => `${1 + ((n >> k) % 9)}.${(n >> (k + 3)) % 9}K`;
  // his signature single post: headline, then data lines, last line is a short conviction closer
  const lines = idea.script.slice(0, 7);
  const closer = lines.length > 2 ? lines.at(-1) : undefined;
  const points = closer ? lines.slice(0, -1) : lines;

  return (
    <article className="rounded-2xl border border-line bg-card/70 p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cassis font-display text-sm font-bold text-wasabi">
          S
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-sm font-bold">
            The Sujal Show <BadgeCheck size={13} className="text-cool" />
          </p>
          <p className="text-xs text-muted">@thesujalshow</p>
        </div>
        <FaXTwitter className="ml-auto text-fg" size={16} />
      </div>

      <p className="mt-3 text-sm font-semibold leading-snug">{idea.hook}</p>
      <div className="mt-2.5 space-y-2">
        {points.map((t, i) => (
          <p key={i} className="text-sm leading-snug text-fg/85">{t}</p>
        ))}
      </div>
      {closer && <p className="mt-3 text-sm font-semibold">{closer}</p>}

      <div className="mt-4 flex items-center justify-between text-muted">
        <span className="flex items-center gap-1.5 text-xs"><MessageCircle size={14} /> {stat(0)}</span>
        <span className="flex items-center gap-1.5 text-xs"><Repeat2 size={15} /> {stat(4)}</span>
        <span className="flex items-center gap-1.5 text-xs"><Heart size={14} /> {stat(8)}</span>
        <span className="flex items-center gap-1.5 text-xs"><BarChart3 size={14} /> {stat(12)}</span>
      </div>
    </article>
  );
}
