import { headers } from "next/headers";
import { Dashboard } from "@/components/dashboard";

export default async function Page() {
  const h = await headers();
  const who = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "guest";

  return <Dashboard who={who} />;
}
