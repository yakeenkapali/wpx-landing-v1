import Image from "next/image";
import { siteContent } from "@/content/site";

export function Proof() {
  const content = siteContent.proof;
  if (
    !content.logos.every((logo) => logo.real) ||
    !content.testimonials.every((testimonial) => testimonial.real)
  ) {
    return null;
  }

  return (
    <section className="proof-section section-pad" aria-labelledby="proof-title">
      <div className="content-width">
        <h2 id="proof-title">{content.heading}</h2>
        <p className="proof-lead">{content.description}</p>
        {content.logos.length > 0 ? (
          <ul className="proof-logos" aria-label={siteContent.accessibility.customerLogos}>
            {content.logos.map((logo) => (
              <li key={logo.name}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                />
              </li>
            ))}
          </ul>
        ) : null}
        {content.logos.length === 0 && content.testimonials.length === 0 ? (
          <div className="proof-journey" aria-label="WorkPlanX project workflow">
            <span>Project set-up</span>
            <span>Site records</span>
            <span>Pay &amp; bill</span>
            <span>Customer access</span>
          </div>
        ) : null}
        {content.testimonials.length > 0 ? (
          <div className="proof-testimonials">
            {content.testimonials.map((testimonial) => (
              <figure className="proof-quote" key={testimonial.author}>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>
                  <strong>{testimonial.author}</strong>
                  {testimonial.role ? <span>{testimonial.role}</span> : null}
                  {testimonial.company ? <span>{testimonial.company}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        <p className="proof-integration">{content.integration}</p>
      </div>
    </section>
  );
}
