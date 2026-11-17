import type { PropsWithChildren } from "react";

type StatusBadgeProps = PropsWithChildren<{
  tone?: "neutral" | "success" | "pending";
}>;

export function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span aria-hidden="true" className={`status-badge status-badge--${tone}`}>
      {children}
    </span>
  );
}
