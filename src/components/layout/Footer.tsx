import Image from "next/image";
import { siteContent } from "@/content/site";
import { ContactLink } from "@/components/ui/ContactLink";

export function Footer() {
  const content = siteContent.footer;

  return (
    <footer className="site-footer">
      <div className="site-footer__main content-width">
        <div className="site-footer__brand">
          <a href="#top" aria-label={siteContent.accessibility.logoLink}>
            <Image
              src="/images/logos/workplanx-full-logo.svg"
              alt={siteContent.accessibility.logoAlt}
              width={254}
              height={48}
            />
          </a>
          <p>{content.description}</p>
        </div>
        <nav className="site-footer__links" aria-label={siteContent.accessibility.footerNavigation}>
          {siteContent.navigation.adminPortal.href ? (
            <a href={siteContent.navigation.adminPortal.href}>{content.adminPortal}</a>
          ) : null}
          {siteContent.navigation.customerPortal.href ? (
            <a href={siteContent.navigation.customerPortal.href}>{content.customerPortal}</a>
          ) : null}
          {!siteContent.navigation.adminPortal.href ? (
            <span className="site-footer__unavailable" aria-disabled="true">
              {content.adminPortal}
              <span className="visually-hidden">{siteContent.navigation.loginDestinationPending}</span>
            </span>
          ) : null}
          {!siteContent.navigation.customerPortal.href ? (
            <span className="site-footer__unavailable" aria-disabled="true">
              {content.customerPortal}
              <span className="visually-hidden">{siteContent.navigation.loginDestinationPending}</span>
            </span>
          ) : null}
          <ContactLink className="site-footer__contact">{content.contactLabel}</ContactLink>
          {content.privacyHref ? <a href={content.privacyHref}>{content.privacyLabel}</a> : null}
          {content.cookiesHref ? <a href={content.cookiesHref}>{content.cookiesLabel}</a> : null}
        </nav>
      </div>
      <div className="site-footer__bottom content-width">
        <p>{content.website}</p>
        <p>{content.company}</p>
        <p>{content.copyright}</p>
      </div>
    </footer>
  );
}
