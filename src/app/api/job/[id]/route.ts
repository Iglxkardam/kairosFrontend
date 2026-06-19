import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BACKEND = process.env.BACKEND_URL ?? "http://127.0.0.1:8080";
const SECRET = process.env.PROXY_SECRET ?? "";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const r = await fetch(`${BACKEND}/job/${id}`, {
      headers: SECRET ? { "x-proxy-secret": SECRET } : {},
      signal: AbortSignal.timeout(15_000),
    });
    return new NextResponse(await r.text(), { status: r.status, headers: { "content-type": "application/json" } });
  } catch {
    return NextResponse.json({ status: "running" }, { status: 200 });
  }
}
