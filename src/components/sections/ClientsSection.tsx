import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { siteContent } from "@/content/site";

export function ClientsSection() {
  return (
    <section aria-label="Clients" className="clients-section">
      <Container>
        <p className="clients-section__intro">
          {siteContent.sections.clients.trustLine}
        </p>
        <ul className="clients-section__logos">
          {siteContent.sections.clients.logos.map((logo) => (
            <li key={logo.src}>
              <Image
                alt=""
                aria-hidden="true"
                height={logo.height}
                src={logo.src}
                width={logo.width}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
