"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { TriangleAlert, X } from "lucide-react";

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [onClose]);

  return createPortal(
    <div className="fixed left-1/2 top-5 z-[60] w-[min(92vw,420px)] -translate-x-1/2">
      <div className="pop-in flex items-center gap-3 rounded-2xl border border-orange/40 bg-card px-4 py-3 shadow-2xl">
        <TriangleAlert size={18} className="shrink-0 text-orange" />
        <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-fg">{message}</p>
        <button aria-label="dismiss" onClick={onClose} className="shrink-0 text-muted hover:text-fg">
          <X size={16} />
        </button>
      </div>
    </div>,
    document.body,
  );
}
