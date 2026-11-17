"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { LoginDropdown } from "@/components/layout/LoginDropdown";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteContent } from "@/content/site";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const content = siteContent.navigation;

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 0);
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className={`sticky top-0 z-20 border-b transition-[background-color,border-color,box-shadow] duration-[var(--dur-fast)] ${isScrolled ? "border-border bg-background shadow-[var(--shadow-subtle)]" : "border-transparent bg-transparent shadow-none"} focus-within:border-border focus-within:bg-background focus-within:shadow-[var(--shadow-subtle)]`}>
      <Container>
        <div className="relative flex min-h-16 items-center justify-between gap-4">
          <a
            aria-label={siteContent.accessibility.logoLink}
            className="shrink-0"
            href="#top"
          >
            <Image
              alt={siteContent.accessibility.logoAlt}
              height={48}
              priority
              src="/workplanx-logo-full.svg"
              width={180}
            />
          </a>
          <nav
            aria-label={siteContent.accessibility.mainNavigation}
            className="hidden items-center gap-6 lg:flex"
          >
            <a
              className="text-small text-foreground hover:text-primary"
              href={content.solutions.href}
            >
              {content.solutions.label}
            </a>
            <a
              className="inline-flex items-center gap-2 text-small text-foreground hover:text-primary"
              download
              href={content.capabilityStatement.href}
            >
              {content.capabilityStatement.label}
              <Download aria-hidden="true" size={16} strokeWidth={1.5} />
            </a>
            <LoginDropdown id="desktop-login-options" />
            <Button className="min-h-11" href={content.contact.href}>
              {content.contact.label}
            </Button>
          </nav>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
