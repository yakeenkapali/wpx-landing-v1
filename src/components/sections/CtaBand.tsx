import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBand() {
  return (
    <section
      aria-labelledby="contact-title"
      className="scroll-mt-20 bg-ink py-[var(--section-pad)] text-on-primary"
      id="contact"
    >
      <Container>
        <Reveal className="cta-layout">
          <div className="cta-copy">
            <SectionHeader
              className="text-on-primary"
              description={siteContent.sections.contact.lead}
              id="contact-title"
              title={siteContent.sections.contact.heading}
            />
            <div className="cta-actions">
              <Button href="#contact-form" variant="inverse">
                {siteContent.sections.contact.contactLabel}
              </Button>
              <a
                className="cta-download"
                rel="noreferrer"
                target="_blank"
                href={siteContent.navigation.capabilityStatement.href}
              >
                {siteContent.sections.contact.capabilityLabel}
              </a>
            </div>
          </div>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
