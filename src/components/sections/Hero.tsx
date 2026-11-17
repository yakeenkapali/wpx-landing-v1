import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";
import { HeroWorkflow } from "@/components/visuals/HeroWorkflow";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-section" id="top">
      <Container>
        <div className="hero-section__layout">
          <div className="hero-section__copy">
            <SectionHeader
              as="h1"
              className="text-foreground"
              id="hero-title"
              title={siteContent.sections.hero.heading}
            />
            <p className="hero-section__lead">
              {siteContent.sections.hero.lead}
            </p>
            <div className="hero-section__actions">
              <Button
                className="min-h-11"
                href={siteContent.navigation.contact.href}
              >
                {siteContent.sections.hero.contactLabel}
              </Button>
              <a className="hero-section__secondary" href="#solutions">
                {siteContent.sections.hero.secondaryLabel}
              </a>
            </div>
          </div>
          <HeroWorkflow />
        </div>
      </Container>
    </section>
  );
}
