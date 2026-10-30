import { siteContent } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProblemStrip() {
  const content = siteContent.problemStrip;

  return (
    <section className="problem-section section-pad" aria-labelledby="problems-title">
      <div className="content-width">
        <SectionHeading id="problems-title" title={content.heading} />
        <ul className="problem-list">
          {content.problems.map((problem) => (
            <li className="problem-item" key={problem}>
              <span className="problem-item__mark" aria-hidden="true">
                <span />
              </span>
              <p>{problem}</p>
            </li>
          ))}
        </ul>
        <p className="problem-section__closing">{content.closing}</p>
      </div>
    </section>
  );
}
