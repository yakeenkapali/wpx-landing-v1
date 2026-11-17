import { siteContent } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AccessPoints() {
  const content = siteContent.accessPoints;

  return (
    <section
      className="access-section section-pad"
      id="access-points"
      aria-labelledby="access-title"
    >
      <div className="content-width">
        <SectionHeading id="access-title" title={content.heading} />
        <div className="access-grid">
          {content.cards.map((card) => (
            <article className={`access-item access-item--${card.id}`} key={card.id}>
              <figure className="access-illustration">
                <span className="access-illustration__label">{card.visual.label}</span>
                <ol className="access-illustration__path">
                  {card.visual.nodes.map((node, index) => (
                    <li key={node}>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      {node}
                    </li>
                  ))}
                </ol>
                <figcaption className="access-illustration__note">
                  Illustrative workflow · not a product screenshot
                </figcaption>
              </figure>
              <div className="access-item__copy">
                <p className="access-item__audience">{card.audience}</p>
                <h3>{card.title}</h3>
                <p>{card.highlights}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="access-integration">{content.integration}</p>
      </div>
    </section>
  );
}
