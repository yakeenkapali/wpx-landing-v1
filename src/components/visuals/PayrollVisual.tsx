import { Check, Clock3 } from "lucide-react";
import { sampleData } from "@/content/sample-data";
import { StatusBadge } from "@/components/visuals/StatusBadge";
import { UiFrame } from "@/components/visuals/UiFrame";
import { VisualFigure } from "@/components/visuals/VisualFigure";

type PayrollVisualProps = { caption: string };

export function PayrollVisual({ caption }: PayrollVisualProps) {
  return (
    <VisualFigure
      caption={caption}
      description="Illustrative timesheet rows and approval statuses"
    >
      <UiFrame>
        <div className="ui-heading-row">
          <div>
            <span className="ui-kicker">{sampleData.labels.weeklyReview}</span>
            <h4>{sampleData.labels.timesheets}</h4>
          </div>
          <StatusBadge>{sampleData.labels.recordCount}</StatusBadge>
        </div>
        <div className="payroll-rows">
          {sampleData.payroll.rows.map((row, index) => (
            <div className="payroll-row" key={row.name}>
              <span className="payroll-row__person">{row.name}</span>
              <span className="payroll-row__hours">{row.hours} h</span>
              <StatusBadge tone="success">
                <span className={`payroll-status payroll-status--${index + 1}`}>
                  <span className="payroll-status__pending">
                    <Clock3 aria-hidden="true" size={12} />
                    Pending
                  </span>
                  <span className="payroll-status__approved">
                    <Check aria-hidden="true" size={12} />
                    Approved
                  </span>
                </span>
              </StatusBadge>
            </div>
          ))}
        </div>
        <div className="ui-footer-row payroll-total">
          <span>{sampleData.labels.total}</span>
          <strong>{sampleData.payroll.total}</strong>
        </div>
      </UiFrame>
    </VisualFigure>
  );
}
