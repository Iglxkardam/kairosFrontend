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
  const tweets = [idea.hook, ...idea.script].slice(0, 5);
  const stat = (k: number) => `${1 + ((n >> k) % 9)}.${(n >> (k + 3)) % 9}K`;

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

      <ol className="mt-3 space-y-2.5">
        {tweets.map((t, i) => (
          <li key={i} className="text-sm leading-snug">
            {i === 0 ? <span className="font-medium">{t}</span> : <span className="text-muted">{i}/ {t}</span>}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center justify-between text-muted">
        <span className="flex items-center gap-1.5 text-xs"><MessageCircle size={14} /> {stat(0)}</span>
        <span className="flex items-center gap-1.5 text-xs"><Repeat2 size={15} /> {stat(4)}</span>
        <span className="flex items-center gap-1.5 text-xs"><Heart size={14} /> {stat(8)}</span>
        <span className="flex items-center gap-1.5 text-xs"><BarChart3 size={14} /> {stat(12)}</span>
      </div>
    </article>
  );
}
