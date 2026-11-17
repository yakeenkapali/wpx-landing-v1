import { Camera, Check, PenLine } from "lucide-react";
import { sampleData } from "@/content/sample-data";
import { PhoneFrame } from "@/components/visuals/PhoneFrame";
import { StatusBadge } from "@/components/visuals/StatusBadge";
import { VisualFigure } from "@/components/visuals/VisualFigure";

type ReportVisualProps = { caption: string };

export function ReportVisual({ caption }: ReportVisualProps) {
  return (
    <VisualFigure
      caption={caption}
      description="Illustrative mobile daily report with checklist, photos and sign-off"
    >
      <div className="report-stage">
        <PhoneFrame>
          <div className="report-card">
            <div className="report-card__top">
              <span>{sampleData.labels.report}</span>
              <span aria-hidden="true">•••</span>
            </div>
            <p className="report-card__project">
              {sampleData.labels.reportProject}
            </p>
            <ul className="report-checklist">
              {sampleData.report.checklist.map((item, index) => (
                <li
                  className={`report-checklist__item report-checklist__item--${index + 1}`}
                  key={item}
                >
                  <span>
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="report-photos">
              {sampleData.report.photos.map((photo) => (
                <span className="report-photo" key={photo}>
                  <Camera aria-hidden="true" size={16} />
                </span>
              ))}
            </div>
            <div className="report-signature">
              <span>{sampleData.labels.clientSignature}</span>
              <span className="report-signature__ink">
                <PenLine aria-hidden="true" size={18} />
                {sampleData.report.signatory}
              </span>
            </div>
          </div>
        </PhoneFrame>
        <StatusBadge tone="success">{sampleData.labels.signed}</StatusBadge>
      </div>
    </VisualFigure>
  );
}
