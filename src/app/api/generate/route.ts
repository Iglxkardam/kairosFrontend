import { NextResponse } from "next/server";

// reverse proxy → the railway backend never reaches the browser.
// client only ever sees same-origin /api/generate; BACKEND_URL + secret stay server-side.
export const maxDuration = 60;
export const runtime = "nodejs";

const BACKEND = process.env.BACKEND_URL ?? "http://127.0.0.1:8080";
const SECRET = process.env.PROXY_SECRET ?? "";

export async function POST(req: Request) {
  const body = await req.text();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  try {
    const r = await fetch(`${BACKEND}/generate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(SECRET ? { "x-proxy-secret": SECRET } : {}),
        ...(ip ? { "x-client-ip": ip } : {}),
      },
      body,
      signal: AbortSignal.timeout(58_000),
    });
    return new NextResponse(await r.text(), {
      status: r.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "backend unreachable" }, { status: 502 });
  }
}
