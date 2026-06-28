// mirrors the backend Result shape (kept in sync by hand, small surface)

export type Format = "reel" | "youtube" | "thread";
export type Vibe = "educational" | "contrarian" | "fear" | "hype" | "story";
export type VibeOpt = "auto" | Vibe;
export type PlatformOpt = "all" | Format;

export interface Idea {
  id: string;
  format: Format;
  vibe: Vibe;
  hook: string;
  topic: string;
  angle: string;
  script: string[];
  hashtags: string[];
  caption: string;
  source?: { label: string; url: string };
  variants?: { hinglish: string[]; english: string[]; hindi: string[] };
}

export interface Insights {
  mood: string;
  viralHooks: string[];
  topics: string[];
  structures: string[];
  narratives: string[];
  trendingWeb3: string[];
}

export interface SourceCounts {
  scanned: number;
  reddit: number;
  youtube: number;
  news: number;
  websearch: number;
  x: number | null; // null = not wired
}

export interface Result {
  insights: Insights;
  ideas: Idea[];
  meta: {
    runId: string;
    collected: number;
    bySource: SourceCounts;
    usedMock: boolean;
    ms: number;
    agent?: { tokensIn: number; tokensOut: number; totalTokens: number; llmCalls: number; costUsd: number };
  };
}
