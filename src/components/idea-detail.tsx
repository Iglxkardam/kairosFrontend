"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Copy, Hash, LayoutList, Link2, Loader2, Pause, Play, Quote, Sparkles } from "lucide-react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import type { Idea } from "@/lib/types";
import { useCopy } from "@/lib/use-copy";
import { useVoice } from "@/lib/use-voice";
import { useThumb } from "./preview/use-thumb";
import { cn } from "@/lib/cn";

const META = {
  reel: { label: "Instagram Reel", Icon: FaInstagram, scriptTitle: "30-second script", captionTitle: "Caption", aspect: "aspect-9/16", accent: "from-wasabi/40 via-cassis to-cassis" },
  youtube: { label: "YouTube Video", Icon: FaYoutube, scriptTitle: "Video script outline", captionTitle: "Description", aspect: "aspect-video", accent: "from-orange via-cassis to-cassis" },
  thread: { label: "X Post", Icon: FaXTwitter, scriptTitle: "The post", captionTitle: "Summary", aspect: "aspect-video", accent: "from-cassis to-cassis" },
} as const;

function ThumbPane({ idea, aspect, accent }: { idea: Idea; aspect: string; accent: string }) {
  const { url, pending } = useThumb(idea.format as "reel" | "youtube", idea.id, idea.hook, idea.topic);
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-line", aspect)}>
      <div className={cn("absolute inset-0 bg-linear-to-b", accent)} />
      {url ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${url})` }} />
      ) : (
        <p className="absolute inset-0 grid place-items-center px-5 text-center font-display text-xl font-extrabold leading-tight text-white">
          {idea.hook}
        </p>
      )}
      {!url && pending && (
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">
          rendering…
        </span>
      )}
    </div>
  );
}

function CopyBtn({ k, text, label, copy, copied }: { k: string; text: string; label: string; copy: (k: string, t: string) => void; copied: string | null }) {
  const on = copied === k;
  return (
    <button
      onClick={() => copy(k, text)}
      className="inline-flex items-center gap-1 rounded-full border border-line bg-card/60 px-2.5 py-1 text-xs font-medium text-muted hover:text-fg"
    >
      {on ? <Check size={13} className="text-wasabi" /> : <Copy size={13} />}
      {on ? "copied" : label}
    </button>
  );
}

// reads the reel script aloud in the creator's cloned voice. hides itself if voice isn't configured.
function VoiceBtn({ id, text }: { id: string; text: string }) {
  const { state, toggle } = useVoice(id, text);
  if (state === "off") return null;
  return (
    <button
      onClick={toggle}
      disabled={state === "loading"}
      className="inline-flex items-center gap-1.5 rounded-full bg-wasabi px-3 py-1 text-xs font-semibold text-cassis hover:opacity-90 disabled:opacity-70"
    >
      {state === "loading" ? <Loader2 size={13} className="animate-spin" /> : state === "playing" ? <Pause size={13} /> : <Play size={13} />}
      {state === "loading" ? "loading" : state === "playing" ? "pause" : "play in Sujal's voice"}
    </button>
  );
}

export function IdeaDetail({ idea, runId }: { idea: Idea; runId: string }) {
  const router = useRouter();
  const { copied, copy } = useCopy();
  const m = META[idea.format];
  const isThread = idea.format === "thread";
  const isReel = idea.format === "reel";
  // older saved runs may predate these fields — default so the page never crashes
  const hashtags = idea.hashtags ?? [];
  const caption = idea.caption ?? "";

  // reels carry hinglish/english/hindi; toggle picks the display, voice always speaks hindi
  const variants = isReel ? idea.variants : undefined;
  const [lang, setLang] = useState<"hinglish" | "english">("hinglish");
  const script = (variants ? (lang === "hinglish" ? variants.hinglish : variants.english) : idea.script) ?? [];
  const voiceText = (variants?.hindi?.length ? variants.hindi : script).join(" ");

  const everything = [
    `HOOK: ${idea.hook}`,
    `TOPIC: ${idea.topic}`,
    `ANGLE: ${idea.angle}`,
    "",
    `${m.scriptTitle.toUpperCase()}:`,
    ...script.map((s, i) => `${i + 1}. ${s}`),
    "",
    `${m.captionTitle.toUpperCase()}: ${caption}`,
    "",
    hashtags.join(" "),
  ].join("\n");

  return (
    <main className="px-5 pb-14 pt-2 sm:px-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
        <ArrowLeft size={15} /> back
      </button>

      <div className="mb-6 mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cassis px-3 py-1 text-sm font-semibold text-wasabi">
          <m.Icon size={14} /> {m.label}
        </span>
        <span className="rounded-full border border-line px-3 py-1 text-xs capitalize text-muted">{idea.vibe} tone</span>
        <Link href={`/history/${runId}`} className="ml-auto text-xs text-muted hover:text-fg">
          view full run →
        </Link>
      </div>

      <div className="grid gap-7 xl:grid-cols-[minmax(0,360px)_1fr]">
        <div className="xl:sticky xl:top-20 xl:self-start">
          {isThread ? (
            <div className="rounded-3xl border border-line bg-card/60 p-6">
              <FaXTwitter size={26} />
              <p className="mt-4 font-display text-lg font-bold leading-snug">{idea.hook}</p>
              <p className="mt-2 text-sm text-muted">single post · @thesujalshow</p>
            </div>
          ) : (
            <ThumbPane idea={idea} aspect={m.aspect} accent={m.accent} />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-display text-2xl font-extrabold leading-tight">{idea.hook}</h1>
            {idea.topic && <p className="mt-2 text-sm text-muted">{idea.topic}</p>}
            <div className="mt-3">
              <CopyBtn k="all" text={everything} label="copy everything" copy={copy} copied={copied} />
            </div>
          </div>

          {idea.angle && (
            <Section icon={<Sparkles size={15} />} title="The angle">
              <p className="text-sm leading-relaxed text-fg/90">{idea.angle}</p>
            </Section>
          )}

          <Section
            icon={<LayoutList size={15} />}
            title={m.scriptTitle}
            action={
              <div className="flex items-center gap-2">
                {variants && (
                  <div className="flex rounded-full border border-line p-0.5 text-xs font-medium">
                    {(["hinglish", "english"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={cn("rounded-full px-2.5 py-0.5 capitalize", lang === l ? "bg-wasabi text-cassis" : "text-muted hover:text-fg")}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
                {isReel && voiceText.trim() && <VoiceBtn id={idea.id} text={voiceText} />}
                <CopyBtn k="script" text={script.join(isThread ? "\n" : " ")} label="copy" copy={copy} copied={copied} />
              </div>
            }
          >
            {!script.length ? (
              <p className="text-sm text-muted">no script for this one.</p>
            ) : isThread ? (
              <div className="space-y-2.5">
                {script.map((s, i) => (
                  <p key={i} className={cn("text-sm leading-relaxed", i === script.length - 1 ? "font-semibold text-fg" : "text-fg/90")}>
                    {s}
                  </p>
                ))}
              </div>
            ) : (
              <ol className="space-y-2.5">
                {script.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-wasabi/20 font-display text-xs font-bold text-fg">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-fg/90">{s}</p>
                  </li>
                ))}
              </ol>
            )}
          </Section>

          {caption && (
            <Section
              icon={<Quote size={15} />}
              title={m.captionTitle}
              action={<CopyBtn k="cap" text={caption} label="copy" copy={copy} copied={copied} />}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed text-fg/90">{caption}</p>
            </Section>
          )}

          {hashtags.length > 0 && (
            <Section
              icon={<Hash size={15} />}
              title="Hashtags"
              action={<CopyBtn k="tags" text={hashtags.join(" ")} label="copy all" copy={copy} copied={copied} />}
            >
              <div className="flex flex-wrap gap-2">
                {hashtags.map((t) => (
                  <span key={t} className="rounded-full bg-cassis/10 px-2.5 py-1 text-xs font-medium text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {idea.source && (
            <Section icon={<Link2 size={15} />} title="Grounded in">
              <a
                href={idea.source.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-fg underline decoration-wasabi decoration-2 underline-offset-4 hover:opacity-75"
              >
                {idea.source.label}
              </a>
            </Section>
          )}
        </div>
      </div>
    </main>
  );
}

function Section({ icon, title, action, children }: { icon: ReactNode; title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-card/50 p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="inline-flex items-center gap-2 font-display text-sm font-bold">
          <span className="text-muted">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
