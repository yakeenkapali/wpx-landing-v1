import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";

export function CtaBand() {
  return (
    <section
      aria-labelledby="contact-title"
      className="scroll-mt-20 bg-ink py-[var(--section-pad)] text-on-primary"
      id="contact"
    >
      <Container>
        <SectionHeader
          className="text-on-primary"
          id="contact-title"
          title={siteContent.sections.contact.heading}
        />
      </Container>
    </section>
  );
}
