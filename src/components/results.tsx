import Link from "next/link";
import type { Result } from "@/lib/types";
import { YoutubeCard } from "./preview/youtube-card";
import { XThread } from "./preview/x-thread";
import { ReelCard } from "./preview/reel-card";

export function Results({ result }: { result: Result }) {
  const reels = result.ideas.filter((i) => i.format === "reel");
  const yts = result.ideas.filter((i) => i.format === "youtube");
  const threads = result.ideas.filter((i) => i.format === "thread");

  return (
    <div key={result.meta.runId ?? result.meta.ms} className="space-y-8">
      {result.meta.usedMock && (
        <p className="rounded-2xl border border-orange/30 bg-orange/10 px-4 py-2 text-xs text-orange">
          LLM step failed — showing fallback ideas from mock data. Check backend logs or API keys.
        </p>
      )}
      <p className="text-sm text-muted">{result.insights.mood}</p>

      <Group title="Instagram reels" n={reels.length}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {reels.map((i) => (
            <Link key={i.id} href={`/idea/${i.id}`} className="block transition hover:-translate-y-0.5">
              <ReelCard idea={i} />
            </Link>
          ))}
        </div>
      </Group>

      <Group title="YouTube videos" n={yts.length}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {yts.map((i) => (
            <Link key={i.id} href={`/idea/${i.id}`} className="block transition hover:-translate-y-0.5">
              <YoutubeCard idea={i} />
            </Link>
          ))}
        </div>
      </Group>

      <Group title="Twitter threads" n={threads.length}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {threads.map((i) => (
            <Link key={i.id} href={`/idea/${i.id}`} className="block transition hover:-translate-y-0.5">
              <XThread idea={i} />
            </Link>
          ))}
        </div>
      </Group>
    </div>
  );
}

function Group({ title, n, children }: { title: string; n: number; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h3 className="font-display text-base font-bold">{title}</h3>
        <span className="text-xs text-muted">{n}</span>
      </div>
      {children}
    </div>
  );
}
