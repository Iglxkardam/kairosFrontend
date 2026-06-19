"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useHistory } from "@/lib/history";
import { useMounted } from "@/lib/use-mounted";
import { IdeaDetail } from "@/components/idea-detail";

export default function IdeaPage() {
  const { id } = useParams<{ id: string }>();
  const mounted = useMounted();
  const history = useHistory();

  let found: { idea: import("@/lib/types").Idea; runId: string } | null = null;
  for (const e of history) {
    const idea = e.result.ideas.find((i) => i.id === id);
    if (idea) {
      found = { idea, runId: e.id };
      break;
    }
  }

  if (!mounted) {
    return (
      <main className="px-5 pb-12 pt-2 sm:px-8">
        <div className="h-5 w-20 animate-pulse rounded bg-card/60" />
        <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,360px)_1fr]">
          <div className="h-96 animate-pulse rounded-3xl border border-line bg-card/40" />
          <div className="h-96 animate-pulse rounded-3xl border border-line bg-card/40" />
        </div>
      </main>
    );
  }

  if (!found) {
    return (
      <main className="px-5 pb-12 pt-2 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
          <ArrowLeft size={15} /> back home
        </Link>
        <div className="mt-8 rounded-3xl border border-line bg-card/50 p-10 text-center text-sm text-muted">
          this idea isn&apos;t saved on this device anymore.
        </div>
      </main>
    );
  }

  return <IdeaDetail idea={found.idea} runId={found.runId} />;
}
