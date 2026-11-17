import { CalendarDays } from "lucide-react";
import { sampleData } from "@/content/sample-data";
import { Avatar } from "@/components/visuals/Avatar";
import { StatusBadge } from "@/components/visuals/StatusBadge";
import { UiFrame } from "@/components/visuals/UiFrame";
import { VisualFigure } from "@/components/visuals/VisualFigure";

export function RosterVisual() {
  const { days, rows } = sampleData.roster;
  return (
    <VisualFigure description="Illustrative weekly roster with crew assignments">
      <UiFrame>
        <div className="ui-heading-row">
          <div>
            <span className="ui-kicker">{sampleData.labels.week}</span>
            <h4>{sampleData.labels.roster}</h4>
          </div>
          <span className="ui-icon-button">
            <CalendarDays aria-hidden="true" size={16} />
          </span>
        </div>
        <div className="roster-grid">
          <div className="roster-grid__days">
            <span />
            {days.map((day) => (
              <span className="roster-grid__day" key={day}>
                {day}
              </span>
            ))}
          </div>
          {rows.map((row) => (
            <div className="roster-grid__row" key={row.name}>
              <div className="roster-grid__person">
                <Avatar initials={row.initials} />
                <span>{row.name}</span>
              </div>
              <div className="roster-grid__slots">
                {row.shifts.map((shift, index) => (
                  <span
                    className="roster-grid__slot"
                    key={`${row.initials}-${index}`}
                  >
                    {shift > 0 ? (
                      <i className={`roster-shift roster-shift--${shift}`} />
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <span aria-hidden="true" className="roster-moving-shift" />
        </div>
        <div className="ui-footer-row">
          <span>{sampleData.labels.project}</span>
          <StatusBadge tone="success">
            {sampleData.labels.noConflicts}
          </StatusBadge>
        </div>
      </UiFrame>
    </VisualFigure>
  );
}
