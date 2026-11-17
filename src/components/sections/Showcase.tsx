"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/content/site";
import { ContactLink } from "@/components/ui/ContactLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Showcase() {
  const content = siteContent.showcase;
  const [activeId, setActiveId] = useState<string>(content.tabs[0].id);

  useEffect(() => {
    function syncTabFromUrl() {
      const requestedId = new URLSearchParams(window.location.search).get("workflow");
      if (requestedId && content.tabs.some((tab) => tab.id === requestedId)) {
        setActiveId(requestedId);
      } else {
        setActiveId(content.tabs[0].id);
      }
    }

    syncTabFromUrl();
    window.addEventListener("popstate", syncTabFromUrl);
    return () => window.removeEventListener("popstate", syncTabFromUrl);
  }, [content.tabs]);

  function selectTab(id: string) {
    if (id === activeId) return;
    setActiveId(id);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (id === content.tabs[0].id) {
      params.delete("workflow");
    } else {
      params.set("workflow", id);
    }
    url.search = params.toString();
    window.history.pushState(window.history.state, "", url);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % content.tabs.length;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + content.tabs.length) % content.tabs.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = content.tabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      const nextTab = content.tabs[nextIndex];
      selectTab(nextTab.id);
      document.getElementById(`showcase-tab-${nextTab.id}`)?.focus();
    }
  }

  function getPanelId(id: string) {
    return `showcase-panel-${id}`;
  }

  function getTabId(id: string) {
    return `showcase-tab-${id}`;
  }

  return (
    <section className="showcase-section section-pad" id="our-work" aria-labelledby="showcase-title">
      <div className="content-width">
        <SectionHeading
          id="showcase-title"
          title={content.heading}
        />

        <div className="showcase-layout">
          <div
            className="showcase-tabs"
            role="tablist"
            aria-label={siteContent.accessibility.productTabs}
          >
            {content.tabs.map((tab, index) => (
              <button
                aria-controls={getPanelId(tab.id)}
                aria-selected={activeId === tab.id}
                className={`showcase-tabs__tab${activeId === tab.id ? " is-active" : ""}`}
                id={getTabId(tab.id)}
                key={tab.id}
                aria-label={tab.label}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                role="tab"
                tabIndex={activeId === tab.id ? 0 : -1}
                type="button"
              >
                <span>{tab.label}</span>
                <ArrowIcon diagonal />
              </button>
            ))}
          </div>

          {content.tabs.map((tab) => (
            <div
              aria-labelledby={getTabId(tab.id)}
              className="showcase-panel"
              hidden={activeId !== tab.id}
              id={getPanelId(tab.id)}
              key={tab.id}
              role="tabpanel"
              tabIndex={0}
            >
              <div className="showcase-panel__image">
                <figure className="showcase-workflow">
                  <figcaption>
                    <span className="workflow-illustration__label-mark" aria-hidden="true" />
                    Illustrative workflow · not a product screenshot
                  </figcaption>
                  <div className="showcase-workflow__source">
                    <span className="showcase-workflow__step" aria-hidden="true">01</span>
                    <div>
                      <p className="showcase-workflow__title">{tab.visual.source.title}</p>
                      <p>{tab.visual.source.detail}</p>
                    </div>
                  </div>
                  <ol className="showcase-workflow__steps">
                    {tab.visual.steps.map((step, index) => (
                      <li key={`${step.title}-${index}`}>
                        <span className="showcase-workflow__step" aria-hidden="true">
                          {String(index + 2).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="showcase-workflow__title">{step.title}</p>
                          <p>{step.detail}</p>
                        </div>
                        <span className="showcase-workflow__endpoint" aria-hidden="true" />
                      </li>
                    ))}
                  </ol>
                </figure>
              </div>
              <div className="showcase-panel__copy">
                <div>
                  <span className="showcase-panel__label">{tab.label}</span>
                  <h3>{tab.title}</h3>
                </div>
                <ul>
                  {tab.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="showcase-cta">
          <p>{content.contactPrompt}</p>
          <ContactLink className="text-link text-link--arrow">
            {content.contactLabel}
            <ArrowIcon />
          </ContactLink>
        </div>
      </div>
    </section>
  );
}
