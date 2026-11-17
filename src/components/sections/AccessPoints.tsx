import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";

export function AccessPoints() {
  return (
    <section
      aria-labelledby="access-title"
      className="scroll-mt-20 bg-surface py-[var(--section-pad)]"
      id="access"
    >
      <Container>
        <SectionHeader
          id="access-title"
          title={siteContent.sections.access.heading}
        />
      </Container>
    </section>
  );
}
