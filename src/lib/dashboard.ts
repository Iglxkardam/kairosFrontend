// static chrome only — the live numbers now come from the pipeline result.

export type Accent = "wasabi" | "cool" | "orange" | "sage" | "cassis";

export const me = { name: "Alex Morgan", email: "alex@kairos.ai", workspace: "Crypto Creators HQ" };
export const plan = { name: "Pro Plan", resets: "Resets in 12 days", pct: 82 };

export const steps: { n: number; title: string; desc: string; accent: Accent }[] = [
  { n: 1, title: "Collect", desc: "Collect viral crypto content from 200+ sources", accent: "wasabi" },
  { n: 2, title: "Analyze", desc: "AI identifies patterns, hooks & trends", accent: "cool" },
  { n: 3, title: "Generate", desc: "Create scroll-stopping ideas & scripts", accent: "orange" },
];
