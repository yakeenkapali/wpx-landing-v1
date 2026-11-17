import { siteContent } from "@/content/site";
import { ContactLink } from "@/components/ui/ContactLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { WorkflowIllustration } from "@/components/ui/WorkflowIllustration";

export function Hero() {
  const content = siteContent.hero;

  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title">{content.headline}</h1>
        <p className="hero__lead">{content.subheadline}</p>
        <div className="hero__actions">
          <ContactLink className="button button--primary">
            {content.contactLabel}
          </ContactLink>
          <a className="text-link" href={content.secondaryHref}>
            {content.secondaryLabel}
            <span aria-hidden="true"><ArrowIcon diagonal /></span>
          </a>
        </div>
        <p className="hero__trust">{content.trustLine}</p>
      </div>

      <div className="hero__visual-column">
        <WorkflowIllustration
          className="hero__workflow"
          label={content.visual.eyebrow}
          source={content.visual.source}
          nodes={content.visual.branches}
        />
        <p className="hero__visual-caption">
          <span aria-hidden="true">↳</span> {content.visual.caption}
        </p>
      </div>
    </section>
  );
}
