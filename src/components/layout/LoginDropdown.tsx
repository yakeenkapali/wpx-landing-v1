"use client";

import { useState } from "react";
import { siteContent } from "@/content/site";

type LoginDropdownProps = {
  id?: string;
  onSelect?: () => void;
};

export function LoginDropdown({
  id = "login-options",
  onSelect,
}: LoginDropdownProps) {
  const [open, setOpen] = useState(false);
  const content = siteContent.navigation.login;

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          event.currentTarget.querySelector("button")?.focus();
        }
      }}
    >
      <button
        aria-controls={id}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex min-h-11 items-center rounded-[var(--radius-sm)] px-3 text-small text-foreground hover:bg-surface"
        onClick={() => setOpen((isOpen) => !isOpen)}
        type="button"
      >
        {content.label}
      </button>
      <ul
        className="absolute right-0 z-10 mt-2 grid min-w-52 gap-1 rounded-[var(--radius-md)] border border-border bg-background p-2 shadow-[var(--shadow-subtle)]"
        hidden={!open}
        id={id}
      >
        {[content.admin, content.customer].map((portal) => (
          <li key={portal.label}>
            {portal.href ? (
              <a
                className="flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 text-small text-foreground hover:bg-surface"
                href={portal.href}
                onClick={onSelect}
              >
                {portal.label}
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="flex min-h-11 items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 text-small text-muted-fg"
              >
                {portal.label}
                <span className="text-caption">{content.unavailable}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
