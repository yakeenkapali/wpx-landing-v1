import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { sampleData } from "@/content/sample-data";

export function HeroWorkflow() {
  return (
    <Reveal
      as="figure"
      ariaLabel="Illustrative project workflow"
      className="hero-workflow"
    >
      <div aria-hidden="true" className="hero-workflow__art">
        <svg
          aria-hidden="true"
          className="hero-workflow__lines"
          viewBox="0 0 600 390"
        >
          <defs>
            <pattern
              height="32"
              id="hero-grid"
              patternUnits="userSpaceOnUse"
              width="32"
            >
              <path d="M32 0H0V32" />
            </pattern>
          </defs>
          <rect height="390" width="600" fill="url(#hero-grid)" />
          <path d="M300 190 105 92M300 190 495 92M300 190 95 288M300 190 505 288M300 190 300 350" />
        </svg>
        <div className="hero-workflow__panel">
          <div className="hero-workflow__customer">
            <Image
              alt=""
              className="hero-workflow__avatar"
              height={24}
              src="/hero/northside-avatar.png"
              width={24}
            />
            <span>{sampleData.hero.customer}</span>
          </div>
          <h2>{sampleData.hero.project}</h2>
          <p>{sampleData.hero.address}</p>
        </div>
        <div className="hero-workflow__nodes">
          {sampleData.hero.connected.map((node) => (
            <span className="hero-node" key={node}>
              <span className="hero-node__dot" />
              <span>{node}</span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
