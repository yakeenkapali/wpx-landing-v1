import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { siteContent } from "@/content/site";

export function Footer() {
  const navigation = siteContent.navigation;

  return (
    <footer className="bg-ink py-8 text-on-primary">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <a
              aria-label={siteContent.accessibility.logoLink}
              className="shrink-0 rounded-[var(--radius-sm)] bg-background p-2"
              href="#top"
            >
              <Image
                alt={siteContent.accessibility.logoAlt}
                height={48}
                src="/workplanx-logo-full.svg"
                width={254}
              />
            </a>
            <nav
              aria-label={siteContent.accessibility.footerNavigation}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-small"
            >
              <a className="hover:underline" href={navigation.solutions.href}>
                {navigation.solutions.label}
              </a>
              <a
                className="hover:underline"
                download
                href={navigation.capabilityStatement.href}
              >
                {navigation.capabilityStatement.label}
              </a>
              <a className="hover:underline" href={navigation.contact.href}>
                {navigation.contact.label}
              </a>
              {navigation.login.admin.href || navigation.login.customer.href ? (
                <div className="flex items-center gap-4">
                  {navigation.login.admin.href ? (
                    <a
                      className="hover:underline"
                      href={navigation.login.admin.href}
                    >
                      {navigation.login.admin.label}
                    </a>
                  ) : null}
                  {navigation.login.customer.href ? (
                    <a
                      className="hover:underline"
                      href={navigation.login.customer.href}
                    >
                      {navigation.login.customer.label}
                    </a>
                  ) : null}
                </div>
              ) : (
                <span aria-disabled="true" className="text-on-primary/70">
                  {navigation.login.label}
                  <span className="sr-only">
                    {" "}
                    — {navigation.login.unavailable}
                  </span>
                </span>
              )}
            </nav>
          </div>
          <div className="flex flex-wrap justify-between gap-4 border-t border-on-primary/20 pt-4 text-small text-on-primary/75">
            <p>{siteContent.footer.description}</p>
            <p>{siteContent.footer.copyright}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
