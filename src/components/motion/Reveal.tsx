"use client";

import type { PropsWithChildren } from "react";
import { useInView } from "@/lib/useInView";

type RevealProps = PropsWithChildren<{
  as?: "div" | "figure";
  ariaLabel?: string;
  className?: string;
  delay?: number;
  once?: boolean;
}>;

export function Reveal({
  as: Tag = "div",
  ariaLabel,
  children,
  className = "",
  delay = 0,
  once = true,
}: RevealProps) {
  const { ref, enhanced, visible, active } = useInView(once);

  return (
    <Tag
      aria-label={ariaLabel}
      className={`reveal ${className}`.trim()}
      data-active={active}
      data-delay={delay}
      data-enhanced={enhanced}
      data-visible={visible}
      ref={ref}
    >
      {children}
    </Tag>
  );
}
