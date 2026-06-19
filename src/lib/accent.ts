// icon-chip backgrounds — palette colors are light so a dark (cassis) glyph
// reads on them in both themes; cassis chip flips to a light glyph.
export const tile: Record<string, string> = {
  wasabi: "bg-wasabi text-cassis",
  cool: "bg-cool text-cassis",
  orange: "bg-orange text-cassis",
  sage: "bg-sage text-cassis",
  cassis: "bg-cassis text-wasabi",
};

// line colors for the feed sparklines (readable on light + dark)
export const spark: Record<string, string> = {
  youtube: "#6f8f00",
  x: "#1f6fb2",
  reddit: "#ff5c34",
  news: "#8a5a72",
};
