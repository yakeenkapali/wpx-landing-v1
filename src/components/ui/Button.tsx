import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>;

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-small font-medium text-on-primary transition-colors duration-[var(--dur-fast)] hover:bg-primary-hover ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
