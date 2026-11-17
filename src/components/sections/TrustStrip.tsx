import { Container } from "@/components/layout/Container";
import { CalendarDays, Layers3 } from "lucide-react";
import { siteContent } from "@/content/site";

const icons = {
  calendar: CalendarDays,
  layers: Layers3,
} as const;

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="trust-section">
      <Container>
        <h2 className="sr-only" id="trust-title">
          {siteContent.sections.trust.heading}
        </h2>
        <ul className="trust-section__facts">
          {siteContent.sections.trust.facts.map((fact) => {
            const Icon = icons[fact.icon];
            return (
              <li key={fact.label}>
                <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                <span>{fact.label}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
