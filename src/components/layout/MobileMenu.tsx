"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoginDropdown } from "@/components/layout/LoginDropdown";
import { siteContent } from "@/content/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const content = siteContent.navigation;

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div
      className="lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          closeMenu();
          toggleRef.current?.focus();
        }
      }}
    >
      <button
        ref={toggleRef}
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={
          open
            ? siteContent.accessibility.closeMenu
            : siteContent.accessibility.openMenu
        }
        className="flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] text-foreground hover:bg-surface"
        onClick={() => setOpen((isOpen) => !isOpen)}
        type="button"
      >
        {open ? (
          <X aria-hidden="true" size={24} strokeWidth={1.5} />
        ) : (
          <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
        )}
      </button>
      <div
        className="fixed inset-x-0 top-16 border-b border-border bg-background py-4 shadow-[var(--shadow-subtle)]"
        hidden={!open}
        id="mobile-navigation"
        inert={!open}
      >
        <nav
          aria-label={siteContent.accessibility.mainNavigation}
          className="mx-auto grid max-w-[var(--content-max)] gap-1 px-[var(--gutter)]"
        >
          <a
            className="flex min-h-11 items-center text-small text-foreground"
            href={content.solutions.href}
            onClick={closeMenu}
          >
            {content.solutions.label}
          </a>
          <a
            className="flex min-h-11 items-center gap-2 text-small text-foreground"
            download
            href={content.capabilityStatement.href}
            onClick={closeMenu}
          >
            {content.capabilityStatement.label}
          </a>
          <Button
            className="mt-2 w-full"
            href={content.contact.href}
            onClick={closeMenu}
          >
            {content.contact.label}
          </Button>
          <LoginDropdown id="mobile-login-options" onSelect={closeMenu} />
        </nav>
      </div>
    </div>
  );
}
