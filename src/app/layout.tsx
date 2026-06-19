import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--bricolage",
});
const body = Inter({ subsets: ["latin"], variable: "--inter" });

export const metadata: Metadata = {
  title: "kairos — crypto content oracle",
  description:
    "reads what's going viral across reddit, youtube and crypto news, then hands you ideas worth filming.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>
          <div className="flex min-h-dvh">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <Topbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
