type Level = "debug" | "info" | "warn" | "error";

const dev = process.env.NODE_ENV !== "production";

function emit(level: Level, scope: string, msg: string, data?: unknown) {
  if (!dev && level === "debug") return;
  const line = JSON.stringify({
    t: new Date().toISOString(),
    level,
    scope,
    msg,
    ...(data !== undefined ? { data } : {}),
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export function log(scope: string) {
  return {
    debug: (m: string, d?: unknown) => emit("debug", scope, m, d),
    info: (m: string, d?: unknown) => emit("info", scope, m, d),
    warn: (m: string, d?: unknown) => emit("warn", scope, m, d),
    error: (m: string, d?: unknown) => emit("error", scope, m, d),
  };
}
