import { Globe, Search } from "lucide-react";
import { FaRedditAlien, FaXTwitter, FaYoutube } from "react-icons/fa6";
import type { SourceCounts } from "@/lib/types";
import { Card } from "./card";

type Glyph = React.ComponentType<{ size?: number; className?: string }>;
type Row = { key: string; label: string; Icon: Glyph; color: string; n: number | null; unit: string };

const rows = (c: SourceCounts): Row[] => [
  { key: "youtube", label: "YouTube", Icon: FaYoutube, color: "text-[#ff0000]", n: c.youtube, unit: "videos" },
  { key: "x", label: "X (Twitter)", Icon: FaXTwitter, color: "text-fg", n: c.x, unit: "posts" },
  { key: "reddit", label: "Reddit", Icon: FaRedditAlien, color: "text-[#ff4500]", n: c.reddit, unit: "posts" },
  { key: "news", label: "News & Blogs", Icon: Globe, color: "text-[#8a5a72]", n: c.news, unit: "articles" },
  { key: "web", label: "Web search", Icon: Search, color: "text-cool", n: c.websearch, unit: "signals" },
];

export function ResearchFeed({ counts }: { counts: SourceCounts }) {
  return (
    <Card title="Research Feed">
      <ul className="max-h-72 space-y-3 overflow-auto pr-1">
        {rows(counts).map((r) => (
          <li key={r.key} className="flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-card">
              <r.Icon size={18} className={r.color} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{r.label}</p>
              <p className="text-xs text-muted">{r.n === null ? "not available" : `${r.n} ${r.unit} scanned`}</p>
            </div>
            {r.n === null ? (
              <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-muted">n/a</span>
            ) : (
              <span className="text-sm font-semibold tabular-nums">{r.n}</span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
