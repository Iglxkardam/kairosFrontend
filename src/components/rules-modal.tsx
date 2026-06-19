"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, Database, FlaskConical, HardDrive, ShieldCheck, X } from "lucide-react";

const points = [
  { Icon: Check, text: "auth is off — explore the whole dashboard instantly" },
  { Icon: HardDrive, text: "your ideas save to this browser (localStorage) — don't clear site data or you'll lose them" },
  { Icon: Database, text: "no database in demo mode — history lives on this device only" },
  { Icon: ShieldCheck, text: "in production: real login (JWT), a database, and cross-device sync" },
];

export function RulesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="fade-in absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      <div role="dialog" aria-modal="true" className="pop-in relative w-full max-w-md rounded-3xl border border-line bg-card p-6 shadow-2xl">
        <button aria-label="close" onClick={onClose} className="absolute right-4 top-4 text-muted">
          <X size={18} />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-wasabi px-3 py-1 text-xs font-semibold text-cassis">
          <FlaskConical size={13} /> Demo mode
        </span>

        <h2 className="mt-4 font-display text-xl font-extrabold">Rules</h2>
        <p className="mt-1 text-sm text-muted">quick heads-up before you use this dashboard.</p>

        <ul className="mt-4 space-y-2.5">
          {points.map((p, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted">
              <p.Icon size={16} className="mt-0.5 shrink-0 text-fg" />
              <span>{p.text}</span>
            </li>
          ))}
        </ul>

        <button onClick={onClose} className="mt-6 w-full rounded-full bg-cassis py-3 text-sm font-semibold text-wasabi">
          Got it
        </button>
      </div>
    </div>,
    document.body,
  );
}
