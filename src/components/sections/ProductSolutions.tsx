import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";

export function ProductSolutions() {
  return (
    <section
      aria-labelledby="solutions-title"
      className="scroll-mt-20 py-[var(--section-pad)]"
      id="solutions"
    >
      <Container>
        <SectionHeader
          id="solutions-title"
          title={siteContent.sections.solutions.heading}
        />
      </Container>
    </section>
  );
}
