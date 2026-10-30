"use client";

import Image from "next/image";
import { useState } from "react";
import { siteContent } from "@/content/site";
import { ContactLink } from "@/components/ui/ContactLink";

export function Header() {
  const content = siteContent.navigation;
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && menuOpen) {
      closeMenu();
      document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
    }
  }

  return (
    <header className="site-header">
      <div className="site-header__inner content-width">
        <a className="site-brand" href="#top" aria-label={siteContent.accessibility.logoLink} onClick={closeMenu}>
          <Image
            className="site-brand__full"
            src="/images/logos/workplanx-full-logo.svg"
            alt={siteContent.accessibility.logoAlt}
            width={254}
            height={48}
            priority
          />
        </a>

        <button
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? siteContent.accessibility.menuClose : siteContent.accessibility.menuOpen}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span className="visually-hidden">{menuOpen ? siteContent.accessibility.menuClose : siteContent.accessibility.menuOpen}</span>
        </button>

        <div
          className={`site-header__nav-wrap${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          onKeyDown={handleMenuKeyDown}
        >
          <nav className="site-nav" aria-label={content.mobileLinkListLabel}>
            {content.links.map((link) => (
              <a href={link.href} key={link.id} onClick={closeMenu}>{link.label}</a>
            ))}
          </nav>
          <div className="site-header__actions">
            {content.adminPortal.href ? (
              <a className="portal-link" href={content.adminPortal.href} onClick={closeMenu}>
                {content.adminPortal.label}
              </a>
            ) : null}
            {content.customerPortal.href ? (
              <a className="portal-link" href={content.customerPortal.href} onClick={closeMenu}>
                {content.customerPortal.label}
              </a>
            ) : (
              <span className="portal-link portal-link--unavailable" aria-disabled="true">
                <span>{content.customerPortal.label}</span>
                <span className="visually-hidden">{siteContent.navigation.loginDestinationPending}</span>
              </span>
            )}
            {!content.adminPortal.href ? (
              <span className="portal-link portal-link--unavailable" aria-disabled="true">
                <span>{content.adminPortal.label}</span>
                <span className="visually-hidden">{siteContent.navigation.loginDestinationPending}</span>
              </span>
            ) : null}
            <ContactLink className="button button--primary button--header" onClick={closeMenu}>
              {content.contactActionLabel}
            </ContactLink>
          </div>
        </div>
        <ContactLink className="button button--primary button--mobile-header" onClick={closeMenu}>
          {content.mobileContactLabel}
        </ContactLink>
      </div>
    </header>
  );
}
