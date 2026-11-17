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
        <Image
          alt=""
          aria-hidden="true"
          className="hero-workflow__circle hero-workflow__circle--1"
          height={854.333}
          src="/hero/hero-circle-01.svg"
          width={854.333}
        />
        <Image
          alt=""
          aria-hidden="true"
          className="hero-workflow__circle hero-workflow__circle--2"
          height={1309.44}
          src="/hero/hero-circle-02.svg"
          width={1309.44}
        />
        <Image
          alt=""
          aria-hidden="true"
          className="hero-workflow__circle hero-workflow__circle--3"
          height={1764.56}
          src="/hero/hero-circle-03.svg"
          width={1764.56}
        />
        <Image
          alt=""
          aria-hidden="true"
          className="hero-workflow__circle hero-workflow__circle--4"
          height={2219.67}
          src="/hero/hero-circle-04.svg"
          width={2219.67}
        />
        <svg
          aria-hidden="true"
          className="hero-workflow__lines"
          viewBox="0 0 600 410"
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
          <rect height="410" width="600" fill="url(#hero-grid)" />
        </svg>
        <svg
          aria-hidden="true"
          className="hero-workflow__connectors"
          preserveAspectRatio="none"
          viewBox="0 0 600 410"
        >
          <path d="M300 0 45-60M300 0 555-60M300 0 45 200M300 0 555 200M300 0V260M300 0 45 98M300 0V-50" />
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
