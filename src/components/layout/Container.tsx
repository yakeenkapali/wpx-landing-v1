import type { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--gutter)]">
      {children}
    </div>
  );
}
