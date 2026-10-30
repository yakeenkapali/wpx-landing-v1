"use client";

import { useState } from "react";
import { siteContent } from "@/content/site";
import { ContactLink } from "@/components/ui/ContactLink";
import { ProductScreen } from "@/components/ui/ProductScreen";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function Showcase() {
  const content = siteContent.showcase;
  const [activeId, setActiveId] = useState<string>(content.tabs[0].id);
  const activeTab = content.tabs.find((tab) => tab.id === activeId) ?? content.tabs[0];

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
      setActiveId(nextTab.id);
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
                onClick={() => setActiveId(tab.id)}
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

          <div
            aria-labelledby={getTabId(activeTab.id)}
            className="showcase-panel"
            id={getPanelId(activeTab.id)}
            role="tabpanel"
            tabIndex={0}
          >
            <div className="showcase-panel__image" key={activeTab.id}>
              {"images" in activeTab ? (
                <div className="showcase-panel__split-images">
                  {activeTab.images.map((image) => (
                    <ProductScreen
                      className="showcase-panel__screen"
                      image={image}
                      key={image.src}
                    />
                  ))}
                </div>
              ) : (
                <ProductScreen
                  className="showcase-panel__screen"
                  image={activeTab.image}
                />
              )}
            </div>
            <div className="showcase-panel__copy">
              <div>
                <span className="showcase-panel__label">{activeTab.label}</span>
                <h3>{activeTab.title}</h3>
              </div>
              <ul>
                {activeTab.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
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
