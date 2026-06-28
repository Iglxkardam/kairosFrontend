"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "loading" | "playing" | "off";

// lazily synths the reel script in the creator's voice, caches the url, plays/pauses an <audio>.
// "off" = backend has no voice configured → caller hides the button.
export function useVoice(id: string, text: string) {
  const [state, setState] = useState<State>("idle");
  const url = useRef<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audio.current?.pause();
      audio.current = null;
    };
  }, []);

  async function toggle() {
    if (state === "playing") {
      audio.current?.pause();
      setState("idle");
      return;
    }
    if (url.current) return play(url.current);

    setState("loading");
    try {
      const r = await fetch("/api/voice", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, text }),
      });
      const d = r.ok ? ((await r.json()) as { url: string | null }) : { url: null };
      if (!d.url) return setState("off");
      url.current = d.url;
      play(d.url);
    } catch {
      setState("off");
    }
  }

  function play(src: string) {
    audio.current?.pause();
    const a = new Audio(src);
    a.onended = () => setState("idle");
    audio.current = a;
    void a.play();
    setState("playing");
  }

  return { state, toggle };
}
