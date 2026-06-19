"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  ChevronsLeft,
  ChevronsRight,
  CircleDashed,
  FileText,
  History,
  LayoutGrid,
  Lightbulb,
  Radar,
  Rss,
} from "lucide-react";
import { CryptoDecor } from "./crypto-decor";
import { cn } from "@/lib/cn";

const nav = [
  { label: "Dashboard", icon: LayoutGrid, href: "/" },
  { label: "Research Feed", icon: Rss, soon: true },
  { label: "Pattern Analysis", icon: Radar, soon: true },
  { label: "Idea Generator", icon: Lightbulb, soon: true },
  { label: "Scripts", icon: FileText, soon: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 isolate hidden h-dvh shrink-0 flex-col overflow-hidden border-r border-line bg-card/40 px-3 py-5 backdrop-blur transition-[width] duration-200 lg:flex",
        collapsed ? "w-19" : "w-64",
      )}
    >
      <CryptoDecor variant="sidebar" />

      {collapsed ? (
        <div className="flex flex-col items-center gap-4">
          <CircleDashed className="text-wasabi" size={26} strokeWidth={2.5} />
          <button
            aria-label="expand sidebar"
            onClick={() => setCollapsed(false)}
            className="text-muted"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <CircleDashed className="text-wasabi" size={26} strokeWidth={2.5} />
            <span className="font-display text-xl font-extrabold">Kairos</span>
          </div>
          <button
            aria-label="collapse sidebar"
            onClick={() => setCollapsed(true)}
            className="text-muted"
          >
            <ChevronsLeft size={18} />
          </button>
        </div>
      )}

      <nav className="mt-8 flex flex-col gap-1">
        {nav.map((it) => {
          const row = cn(
            "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
            collapsed && "justify-center px-0",
          );

          if (it.soon) {
            return (
              <button
                key={it.label}
                type="button"
                title={`${it.label} · coming soon`}
                onClick={(e) => e.preventDefault()}
                className={cn(row, "text-left text-muted transition hover:text-fg/85")}
              >
                <it.icon size={18} className="shrink-0" />
                {!collapsed && <span className="min-w-0 flex-1 truncate pr-14">{it.label}</span>}
                {!collapsed && (
                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 rotate-[-8deg] rounded-md bg-orange px-1.5 py-0.5 font-display text-[8px] font-extrabold uppercase leading-tight tracking-wide text-white shadow-[0_2px_6px_rgba(255,92,52,0.4)]">
                    Coming soon
                  </span>
                )}
              </button>
            );
          }

          const on = pathname === it.href;
          return (
            <Link
              key={it.label}
              href={it.href ?? "/"}
              title={it.label}
              className={cn(row, "transition", on ? "bg-wasabi font-semibold text-cassis" : "text-muted")}
            >
              <it.icon size={18} className="shrink-0" />
              {!collapsed && it.label}
            </Link>
          );
        })}
        <div className="my-3 h-px bg-line" />
        <Link
          href="/history"
          title="History"
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
            collapsed && "justify-center px-0",
            pathname.startsWith("/history") ? "bg-wasabi font-semibold text-cassis" : "text-muted",
          )}
        >
          <History size={18} className="shrink-0" />
          {!collapsed && "History"}
        </Link>
      </nav>

      <div className="mt-auto">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-2xl border border-line bg-card/60 p-2.5",
            collapsed && "justify-center border-transparent bg-transparent p-1",
          )}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cassis text-wasabi">
            <BadgeCheck size={18} />
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">thesujalshow</span>
              <span className="block truncate text-[11px] text-muted">official workspace</span>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
