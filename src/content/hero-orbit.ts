import {
  Banknote,
  ClipboardList,
  Recycle,
  ReceiptText,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type HeroOrbitConfig = {
  centre: { eyebrow: string; title: string; meta: string };
  nodes: { label: string; icon: LucideIcon }[];
};

export const heroOrbit = {
  centre: {
    eyebrow: "Project record",
    title: "Northside works",
    meta: "People · site · scope",
  },
  nodes: [
    { label: "Field reports", icon: ClipboardList },
    { label: "Resource recovery", icon: Recycle },
    { label: "Payroll", icon: Banknote },
    { label: "Invoicing", icon: ReceiptText },
    { label: "Customer access", icon: UsersRound },
  ],
} satisfies HeroOrbitConfig;
