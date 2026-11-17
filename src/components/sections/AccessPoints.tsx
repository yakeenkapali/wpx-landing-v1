import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { AccessVisual } from "@/components/visuals/AccessVisual";

export function AccessPoints() {
  return (
    <section
      aria-labelledby="access-title"
      className="scroll-mt-20 bg-surface py-[var(--section-pad)]"
      id="access"
    >
      <Container>
        <Reveal>
          <SectionHeader
            id="access-title"
            title={siteContent.sections.access.heading}
          />
        </Reveal>
        <div className="access-grid">
          {siteContent.sections.access.cards.map((card, index) => (
            <Reveal
              className={`access-card access-card--${card.id}`}
              delay={index * 60}
              key={card.id}
            >
              <article>
                <h3>{card.title}</h3>
                <AccessVisual
                  kind={card.id}
                  caption={siteContent.sections.access.visualCaption}
                />
                <p>{card.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
