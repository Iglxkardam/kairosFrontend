import { Radar, Sparkles, Telescope } from "lucide-react";
import { steps } from "@/lib/dashboard";
import { tile } from "@/lib/accent";
import { cn } from "@/lib/cn";

const icons = [Telescope, Radar, Sparkles];

export function PipelineBanner({ running }: { running: boolean }) {
  return (
    <div className="rounded-3xl border border-line bg-wasabi/10 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {steps.map((s, i) => {
          const Icon = icons[i];
          return (
            <div key={s.n} className="flex flex-1 items-center gap-4">
              <span className={cn("relative grid size-14 shrink-0 place-items-center rounded-2xl shadow-sm", tile[s.accent])}>
                {running && <span className="absolute inset-0 animate-ping rounded-2xl bg-current opacity-20" />}
                <Icon size={24} className="relative" />
              </span>
              <div>
                <p className="font-display text-base font-bold">
                  {s.n}. {s.title}
                </p>
                <p className="mt-0.5 max-w-60 text-xs text-muted">{running ? "working…" : s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="mx-auto hidden h-px flex-1 border-t border-dashed border-line md:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
