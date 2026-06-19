import type { IconType } from "react-icons";
import { SiBitcoin, SiDogecoin, SiEthereum, SiLitecoin, SiSolana, SiTether } from "react-icons/si";

type Pos = { Icon: IconType; top: string; left: string; size: number; rot: number };

const sidebar: Pos[] = [
  { Icon: SiBitcoin, top: "15%", left: "56%", size: 34, rot: -12 },
  { Icon: SiEthereum, top: "33%", left: "16%", size: 46, rot: 10 },
  { Icon: SiSolana, top: "49%", left: "60%", size: 26, rot: -6 },
  { Icon: SiDogecoin, top: "65%", left: "22%", size: 38, rot: 14 },
  { Icon: SiTether, top: "80%", left: "58%", size: 28, rot: -10 },
  { Icon: SiLitecoin, top: "91%", left: "28%", size: 32, rot: 8 },
];

const header: Pos[] = [
  { Icon: SiBitcoin, top: "18%", left: "34%", size: 30, rot: -10 },
  { Icon: SiEthereum, top: "42%", left: "48%", size: 36, rot: 8 },
  { Icon: SiSolana, top: "22%", left: "62%", size: 24, rot: -6 },
  { Icon: SiDogecoin, top: "46%", left: "74%", size: 30, rot: 12 },
  { Icon: SiTether, top: "28%", left: "88%", size: 24, rot: -8 },
];

export function CryptoDecor({ variant }: { variant: "sidebar" | "header" }) {
  const items = variant === "sidebar" ? sidebar : header;
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.06]">
      {items.map((p, i) => {
        const Icon = p.Icon;
        return (
          <Icon
            key={i}
            className="absolute text-fg"
            style={{ top: p.top, left: p.left, fontSize: p.size, transform: `rotate(${p.rot}deg)` }}
          />
        );
      })}
    </div>
  );
}
