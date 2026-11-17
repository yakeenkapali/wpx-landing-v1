import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";
import { HeroWorkflow } from "@/components/visuals/HeroWorkflow";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-section" id="top">
      <div aria-hidden="true" className="hero-section__art">
        <svg
          aria-hidden="true"
          viewBox="0 0 900 700"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="675" cy="350" r="150" />
          <circle cx="675" cy="350" r="230" />
          <circle cx="675" cy="350" r="310" />
          <circle cx="675" cy="350" r="390" />
        </svg>
      </div>
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
              <Button href={siteContent.navigation.contact.href}>
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
