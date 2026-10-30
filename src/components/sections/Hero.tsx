import { siteContent } from "@/content/site";
import { ContactLink } from "@/components/ui/ContactLink";
import { ProductScreen } from "@/components/ui/ProductScreen";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

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

      <div className="hero__screen-column">
        <ProductScreen
          image={content.image}
          className="hero__main-screen"
          priority
        />
        <p className="hero__screen-caption">{siteContent.accessibility.screenshotCaption}</p>
      </div>
    </section>
  );
}
