import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteContent } from "@/content/site";
import { InvoiceVisual } from "@/components/visuals/InvoiceVisual";
import { PayrollVisual } from "@/components/visuals/PayrollVisual";
import { ProjectsVisual } from "@/components/visuals/ProjectsVisual";
import { RecoveryVisual } from "@/components/visuals/RecoveryVisual";
import { ReportVisual } from "@/components/visuals/ReportVisual";
import { RosterVisual } from "@/components/visuals/RosterVisual";
import { Reveal } from "@/components/motion/Reveal";

const visuals = {
  roster: RosterVisual,
  reports: ReportVisual,
  payroll: PayrollVisual,
  invoicing: InvoiceVisual,
  projects: ProjectsVisual,
} as const;

export function ProductSolutions() {
  return (
    <section
      aria-labelledby="solutions-title"
      className="scroll-mt-20 py-[var(--section-pad)]"
      id="solutions"
    >
      <Container>
        <Reveal>
          <SectionHeader
            description={siteContent.sections.solutions.description}
            eyebrow={siteContent.sections.solutions.eyebrow}
            id="solutions-title"
            title={siteContent.sections.solutions.heading}
          />
        </Reveal>
        <div className="solutions-grid">
          {siteContent.sections.solutions.cards.map((card, index) => {
            const Visual = visuals[card.id as keyof typeof visuals];
            return (
              <Reveal
                className={`solution-card solution-card--${card.id}`}
                delay={index * 60}
                key={card.id}
                once={false}
              >
                <article>
                  <div className="solution-card__copy">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <Visual />
                </article>
              </Reveal>
            );
          })}
          <Reveal
            className="solution-card solution-card--recovery"
            delay={300}
            once={false}
          >
            <article>
              <div className="solution-card__copy">
                <h3>{siteContent.sections.solutions.waste.title}</h3>
                <p>{siteContent.sections.solutions.waste.description}</p>
                <p>{siteContent.sections.solutions.waste.detail}</p>
              </div>
              <RecoveryVisual />
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
