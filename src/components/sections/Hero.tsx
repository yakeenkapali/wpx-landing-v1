import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      id="top"
      className="py-[var(--section-pad)]"
    >
      <Container>
        <SectionHeader
          as="h1"
          id="hero-title"
          title={siteContent.sections.hero.heading}
        />
      </Container>
    </section>
  );
}
