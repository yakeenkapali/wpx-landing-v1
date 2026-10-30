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
        <div className="hero__mobile-screen">
          <ProductScreen image={content.mobileImage} compact />
        </div>
        <div className="hero__screen-caption">
          <span className="signal-dot" />
          <span>{siteContent.accessibility.screenshotCaption}</span>
        </div>
      </div>
    </section>
  );
}
