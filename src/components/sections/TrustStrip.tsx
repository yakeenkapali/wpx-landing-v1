import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";

export function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-title"
      className="bg-surface py-[var(--section-pad)]"
    >
      <Container>
        <SectionHeader
          id="trust-title"
          title={siteContent.sections.trust.heading}
        />
      </Container>
    </section>
  );
}
