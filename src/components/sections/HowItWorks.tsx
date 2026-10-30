import { siteContent } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stepMarks = [
  <>
    <path d="M4 15.5h12M6 12l4-7 4 7" />
    <circle cx="10" cy="14.5" r="1" />
  </>,
  <>
    <path d="M4 6h12M4 10h9M4 14h12" />
    <circle cx="15.5" cy="10" r="1.5" />
  </>,
  <>
    <path d="M6 4.5h8l2 2v9H6zM8.5 9h5M8.5 12h5" />
  </>,
  <>
    <path d="M4 6h12M4 10h12M4 14h6" />
    <path d="m12 13 2 2 3-4" />
  </>,
  <>
    <circle cx="7" cy="10" r="2.5" />
    <circle cx="14" cy="10" r="2.5" />
    <path d="M9.5 10h2" />
  </>,
];

export function HowItWorks() {
  const content = siteContent.howItWorks;

  return (
    <section
      className="workflow-section section-pad"
      id="how-it-works"
      aria-labelledby="workflow-title"
    >
      <div className="content-width">
        <SectionHeading id="workflow-title" title={content.heading} />
        <ol className="workflow-list">
          {content.steps.map((step, index) => (
            <li className="workflow-step" key={step.title}>
              <div className="workflow-step__topline">
                <span className="workflow-step__mark" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">{stepMarks[index]}</svg>
                </span>
                {index < content.steps.length - 1 ? (
                  <span className="workflow-step__connector" aria-hidden="true" />
                ) : null}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
