import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "inverse";

type ButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    variant?: ButtonVariant;
  }
>;

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "inverse"
      ? "bg-background text-ink hover:bg-surface"
      : "bg-primary text-on-primary hover:bg-primary-hover";

  return (
    <a
      className={`inline-flex min-h-8 items-center justify-center rounded-[var(--radius-sm)] px-4 py-2 text-small font-medium transition-colors duration-[var(--dur-fast)] ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
