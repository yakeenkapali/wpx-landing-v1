import { Recycle, Scale } from "lucide-react";
import { sampleData } from "@/content/sample-data";
import { StatusBadge } from "@/components/visuals/StatusBadge";
import { UiFrame } from "@/components/visuals/UiFrame";
import { VisualFigure } from "@/components/visuals/VisualFigure";

type RecoveryVisualProps = { caption: string };

export function RecoveryVisual({ caption }: RecoveryVisualProps) {
  return (
    <VisualFigure
      caption={caption}
      description="Illustrative weigh ticket and resource recovery report"
      className="recovery-visual"
    >
      <div className="recovery-visual__grid">
        <UiFrame>
          <div className="weigh-ticket">
            <div className="ui-heading-row">
              <div>
                <span className="ui-kicker">
                  {sampleData.labels.weighTicket}
                </span>
                <h4>{sampleData.recovery.ticket}</h4>
              </div>
              <Scale aria-hidden="true" size={18} />
            </div>
            <div className="weigh-ticket__material">
              <span>{sampleData.recovery.material}</span>
              <strong>{sampleData.recovery.weight}</strong>
            </div>
            <div className="weigh-ticket__meta">
              <span>{sampleData.labels.projectLabel}</span>
              <strong>{sampleData.labels.project}</strong>
            </div>
            <div className="weigh-ticket__meta">
              <span>{sampleData.labels.recorded}</span>
              <strong>{sampleData.labels.today}</strong>
            </div>
            <StatusBadge tone="success">
              {sampleData.labels.verified}
            </StatusBadge>
          </div>
        </UiFrame>
        <UiFrame>
          <div className="recovery-report">
            <div className="ui-heading-row">
              <div>
                <span className="ui-kicker">
                  {sampleData.labels.projectReport}
                </span>
                <h4>{sampleData.labels.resourceReport}</h4>
              </div>
              <Recycle aria-hidden="true" size={18} />
            </div>
            <div className="recovery-report__bar">
              {sampleData.recovery.categories.map((category) => (
                <i
                  aria-hidden="true"
                  className={`recovery-report__segment recovery-report__segment--${category.value.replace("%", "")}`}
                  key={category.label}
                />
              ))}
            </div>
            <ul className="recovery-report__legend">
              {sampleData.recovery.categories.map((category, index) => (
                <li key={category.label}>
                  <i
                    className={`recovery-report__swatch recovery-report__swatch--${index + 1}`}
                  />
                  <span>{category.label}</span>
                  <strong>{category.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </UiFrame>
      </div>
    </VisualFigure>
  );
}
