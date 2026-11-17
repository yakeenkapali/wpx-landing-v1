import type { PropsWithChildren } from "react";

type VisualFigureProps = PropsWithChildren<{
  description: string;
  caption?: string;
  className?: string;
}>;

export function VisualFigure({
  children,
  description,
  caption,
  className = "",
}: VisualFigureProps) {
  return (
    <figure
      aria-label={description}
      className={`product-visual ${className}`.trim()}
    >
      <div aria-hidden="true" className="product-visual__surface">
        {children}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
