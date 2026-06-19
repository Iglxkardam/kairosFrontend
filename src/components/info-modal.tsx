"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe,
  Loader2,
  Mail,
  Newspaper,
  Radar,
  Search,
  Sparkles,
  Telescope,
  X,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaRedditAlien, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { steps } from "@/lib/dashboard";
import { tile } from "@/lib/accent";
import { cn } from "@/lib/cn";

export type InfoMode = "how-it-works" | "about-me" | null;

const stepIcons = [Telescope, Radar, Sparkles];

const sources = [
  { label: "Reddit", sub: "top posts from crypto subs", Icon: FaRedditAlien, color: "text-[#ff4500]" },
  { label: "YouTube", sub: "viral videos & trends", Icon: FaYoutube, color: "text-[#ff0000]" },
  { label: "News", sub: "coindesk, cointelegraph & more", Icon: Newspaper, color: "text-sage" },
  { label: "Web search", sub: "live trend signals & narratives", Icon: Search, color: "text-cool" },
];

const outputs = [
  { n: 5, label: "Instagram reels", Icon: FaInstagram },
  { n: 3, label: "YouTube videos", Icon: FaYoutube },
  { n: 3, label: "X threads", Icon: FaXTwitter },
];

const social = [
  { label: "GitHub", Icon: FaGithub, href: "https://github.com/Iglxkardam" },
  { label: "Instagram", Icon: FaInstagram, href: "https://www.instagram.com/_igl_kardam?igsh=MTYxMmwxaHEyZDM3YQ==" },
  { label: "Twitter", Icon: FaXTwitter, href: "https://x.com/Jhod869800" },
  { label: "LinkedIn", Icon: FaLinkedin, href: "https://www.linkedin.com/in/sachin-kumar-2572273b3?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
] as const;

const profile = {
  name: "Sachin Kumar",
  handle: "@iglxkardam",
  avatar: "/portfolio/avatar.webp",
  badges: [
    { label: "AI Engineer", style: "bg-wasabi text-cassis" },
    { label: "Blockchain Engineer", style: "bg-cool/70 text-cassis" },
    { label: "Web3", style: "bg-sage/50 text-cassis" },
    { label: "Full Stack", style: "border border-line bg-card/80 text-muted" },
  ] as const,
  bio: "I'm a full-stack developer, trader, investor, and gamer. I build LLM pipelines that turn live data into structured output, and ship Web3 dApps when on-chain settlement fits. Kairos is my AI Engineer assignment: collect crypto signals, analyze with an LLM, generate content ideas with hooks and scripts.",
  quote: "When human creativity and reaction time run dry, a gamer takes the wheel.",
  projects: [
    {
      name: "Telshi",
      url: "https://telshi.com",
      logo: "/portfolio/telshi.svg",
      desc: "A prediction market platform on Base L2 where anyone can create their own yes/no market. Omenly verifies the outcome, and traders bet on-chain until settlement.",
      tags: ["Base L2", "Create markets", "Omenly verified", "On-chain"],
    },
    {
      name: "Omenly",
      url: "https://omenly.xyz",
      logo: "/portfolio/omenly.svg",
      desc: "An LLM-based oracle for prediction markets. Agentic loops and tools research and verify real-world outcomes, then a cryptographic signature publishes the result on-chain for trustless settlement.",
      tags: ["LLM oracle", "Agentic AI", "Tool use", "On-chain proofs"],
    },
    {
      name: "Kameti",
      url: "https://kameticore.vercel.app",
      logo: "/portfolio/kameti.png",
      desc: "On-chain savings circles — join a kameti, contribute fixed USDC/USDT monthly, and rotate payouts fairly via VRF or bidding. Transparent, non-custodial, fully on-chain.",
      tags: ["Savings protocol", "USDC / USDT", "On-chain"],
    },
  ],
  social,
  connect: [
    ...social,
    { label: "Portfolio", Icon: Globe, href: "https://iglxkardam.xyz" },
    { label: "Email", Icon: Mail, href: "mailto:sachinkardam5581@gmail.com" },
  ],
};

export function InfoModal({
  open,
  mode,
  onClose,
  genNotice,
}: {
  open: boolean;
  mode: InfoMode;
  onClose: () => void;
  genNotice?: "generating" | "ready" | null;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mode) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="fade-in absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className={cn(
          "pop-in relative max-h-[min(90dvh,720px)] w-full overflow-hidden rounded-3xl border border-line bg-card shadow-2xl",
          mode === "about-me" ? "max-w-xl" : "max-w-lg",
        )}
      >
        <button aria-label="close" onClick={onClose} className="absolute right-4 top-4 z-10 text-muted">
          <X size={18} />
        </button>

        <div className="modal-scroll max-h-[min(90dvh,720px)] overflow-y-auto overscroll-contain p-6">
          {mode === "about-me" && genNotice && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-line bg-bg/60 px-3.5 py-3">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg",
                  genNotice === "ready" ? "bg-wasabi text-cassis" : "bg-cool text-cassis",
                )}
              >
                {genNotice === "ready" ? <CheckCircle2 size={16} /> : <Loader2 size={16} className="animate-spin" />}
              </span>
              <p className="text-xs font-medium leading-snug text-fg">
                {genNotice === "ready"
                  ? "Your content is ready — close this to view it."
                  : "Your content is generating in the background. Meanwhile, take a look at what I've built."}
              </p>
            </div>
          )}
          {mode === "how-it-works" ? <HowItWorks onClose={onClose} /> : <AboutMe onClose={onClose} />}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function HowItWorks({ onClose }: { onClose: () => void }) {
  return (
    <>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-cool/60 px-3 py-1 text-xs font-semibold text-cassis">
        <Sparkles size={13} /> 3-step pipeline
      </span>

      <h2 id="info-modal-title" className="mt-4 font-display text-2xl font-extrabold leading-tight">
        How Kairos works
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        One click scans what&apos;s going viral in crypto right now, finds the patterns behind it, and hands you
        ready-to-film ideas with hooks and scripts.
      </p>

      <ol className="mt-6 space-y-3">
        {steps.map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <li key={s.n} className="flex gap-4 rounded-2xl border border-line bg-bg/50 p-4">
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl shadow-sm", tile[s.accent])}>
                <Icon size={22} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-display text-sm font-bold">
                  {s.n}. {s.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Where data comes from</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {sources.map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-card/60 p-3 text-center">
              <s.Icon size={20} className={cn("mx-auto", s.color)} />
              <p className="mt-2 text-xs font-bold">{s.label}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-wasabi/15 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Every run gives you</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {outputs.map((o) => (
            <span
              key={o.label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1.5 text-xs font-semibold"
            >
              <o.Icon size={14} />
              <span className="font-display text-sm">{o.n}</span>
              {o.label}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Each idea includes a hook, angle, script outline, and source link.</p>
      </div>

      <button onClick={onClose} className="mt-6 w-full rounded-full bg-cassis py-3 text-sm font-semibold text-wasabi">
        Got it — let&apos;s generate
      </button>
    </>
  );
}

function AboutMe({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3 pr-7">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-wasabi px-3 py-1 text-xs font-semibold text-cassis">
          <Code2 size={13} /> About developer
        </span>
        <blockquote className="dev-quote-top min-w-0 max-w-[65%]">
          <p className="font-display text-[11px] font-semibold italic leading-snug tracking-tight text-fg/85 sm:text-xs">
            &ldquo;{profile.quote}&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="paper-badge mt-3 rounded-2xl border border-line p-3.5">
        <div className="flex items-start gap-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            width={160}
            height={160}
            className="size-14 shrink-0 rounded-xl object-cover shadow-sm"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 id="info-modal-title" className="font-display text-xl font-extrabold leading-tight">
                  {profile.name}
                </h2>
                <p className="mt-0.5 text-sm font-semibold text-orange">{profile.handle}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {profile.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid size-8 place-items-center rounded-lg border border-line bg-card/80 text-muted transition hover:border-wasabi/50 hover:text-fg"
                  >
                    <s.Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {profile.badges.map((b) => (
                <span
                  key={b.label}
                  className={cn("rounded-full px-2 py-px text-[9px] font-semibold tracking-wide uppercase", b.style)}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2.5 text-[13px] leading-snug text-muted">{profile.bio}</p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Portfolio projects</p>
        <div className="mt-2.5 space-y-3">
          {profile.projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-badge group block rounded-2xl border border-line p-4 transition hover:border-wasabi/40 hover:shadow-[0_6px_20px_-8px_rgba(53,30,40,0.18)]"
            >
              <div className="flex items-start gap-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line/60 bg-card p-2 shadow-sm">
                  <img src={p.logo} alt={`${p.name} logo`} className="size-full object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-sm font-bold">{p.name}</p>
                      <p className="mt-0.5 text-xs text-orange">{new URL(p.url).hostname.replace(/^www\./, "")}</p>
                    </div>
                    <ExternalLink size={15} className="mt-0.5 shrink-0 text-muted transition group-hover:text-fg" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{p.desc}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line/80 bg-card/70 px-2 py-0.5 text-[10px] font-medium text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Connect</p>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {profile.connect.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={s.label}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line bg-cassis px-3 py-2 text-[11px] font-semibold text-wasabi transition hover:bg-cassis/90"
            >
              <s.Icon size={15} />
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <button onClick={onClose} className="mt-4 w-full rounded-full bg-cassis py-2.5 text-sm font-semibold text-wasabi">
        Back to dashboard
      </button>
    </>
  );
}
