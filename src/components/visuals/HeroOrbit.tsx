"use client";

import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { useInView } from "@/lib/useInView";
import { heroOrbit } from "@/content/hero-orbit";
import styles from "./HeroOrbit.module.css";

const nodeStyle = (index: number) =>
  ({
    "--angle": `${-90 + index * 72}deg`,
    "--node-index": index,
  }) as CSSProperties & { "--angle": string; "--node-index": number };

export function HeroOrbit() {
  const { ref, visible, active } = useInView(false);

  return (
    <figure
      aria-describedby="hero-orbit-description hero-orbit-steps"
      aria-label="Illustrative project workflow"
      className={`${styles.figure} hero-orbit-figure`}
    >
      <div
        className={styles.stage}
        data-active={active}
        data-visible={visible}
        aria-label="Illustrative workflow animation. Hover or focus to pause."
        role="group"
        tabIndex={0}
        ref={ref}
      >
        <div aria-hidden="true" className={styles.plane}>
          <svg className={styles.rings} fill="none" viewBox="0 0 1000 1000">
            <circle className={styles.ringInner} cx="500" cy="500" r="145" />
            <circle className={styles.ringMain} cx="500" cy="500" r="200" />
            <circle className={styles.ringOuter} cx="500" cy="500" r="290" />
            <circle
              className={styles.ringOuterDashed}
              cx="500"
              cy="500"
              r="365"
            />
            <circle className={styles.ringBleed} cx="500" cy="500" r="470" />
          </svg>

          <div className={styles.orbitDotTrack}>
            <span className={styles.orbitDot} />
          </div>

          <div className={styles.centerCard}>
            <span className={styles.centerCheck}>
              <Check aria-hidden="true" size={15} strokeWidth={2.5} />
            </span>
            <span className={styles.centerEyebrow}>
              {heroOrbit.centre.eyebrow}
            </span>
            <strong className={styles.centerTitle}>
              {heroOrbit.centre.title}
            </strong>
            <span className={styles.centerMeta}>{heroOrbit.centre.meta}</span>
          </div>

          <div className={styles.orbit}>
            <div className={styles.connectors}>
              {heroOrbit.nodes.map((node, index) => (
                <span key={node.label} style={nodeStyle(index)} />
              ))}
            </div>
            <ul className={styles.nodes}>
              {heroOrbit.nodes.map(({ label, icon: Icon }, index) => (
                <li key={label} style={nodeStyle(index)}>
                  <span className={styles.counterOrbit}>
                    <span className={styles.nodePosition}>
                      <span className={styles.nodeCard}>
                        <span className={styles.nodeIcon}>
                          <Icon
                            aria-hidden="true"
                            size={20}
                            strokeWidth={1.8}
                          />
                        </span>
                        <span className={styles.nodeLabel}>{label}</span>
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className={styles.description} id="hero-orbit-description">
        A Northside works project record connects people, site, and scope to
        five workflow stages arranged around it.
      </p>
      <ol
        aria-label="Workflow stages in order"
        className={styles.description}
        id="hero-orbit-steps"
      >
        {heroOrbit.nodes.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
      <figcaption className={styles.caption}>
        Illustrative workflow · not a product screenshot
      </figcaption>
    </figure>
  );
}
