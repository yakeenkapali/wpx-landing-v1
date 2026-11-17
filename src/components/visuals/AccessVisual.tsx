import {
  ArrowRight,
  Check,
  ClipboardList,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { sampleData } from "@/content/sample-data";
import { PhoneFrame } from "@/components/visuals/PhoneFrame";
import { StatusBadge } from "@/components/visuals/StatusBadge";
import { UiFrame } from "@/components/visuals/UiFrame";
import { VisualFigure } from "@/components/visuals/VisualFigure";

type AccessVisualProps = {
  kind: "admin" | "mobile" | "customer";
};

function AdminUI() {
  return (
    <UiFrame>
      <div className="access-browser">
        <aside className="access-sidebar">
          <span aria-hidden="true" className="access-sidebar__brand" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </aside>
        <div className="access-dashboard">
          <div className="ui-heading-row">
            <div>
              <span className="ui-kicker">{sampleData.labels.today}</span>
              <h4>{sampleData.labels.dashboard}</h4>
            </div>
            <LayoutDashboard aria-hidden="true" size={16} />
          </div>
          <div className="access-dashboard__metrics">
            {sampleData.admin.metrics.map((metric) => (
              <div key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
          <p className="ui-kicker">{sampleData.labels.activity}</p>
          {sampleData.admin.projects.slice(0, 2).map((project) => (
            <div className="access-list-line" key={project}>
              <span aria-hidden="true" />
              {project}
              <ArrowRight aria-hidden="true" size={13} />
            </div>
          ))}
        </div>
      </div>
    </UiFrame>
  );
}

function MobileUI() {
  return (
    <PhoneFrame>
      <div className="mobile-app-ui">
        <div className="mobile-app-ui__header">
          <span>{sampleData.labels.mobileBrand}</span>
          <span aria-hidden="true" className="avatar">
            {sampleData.labels.crewInitials}
          </span>
        </div>
        <span className="ui-kicker">{sampleData.labels.shiftDate}</span>
        <h4>{sampleData.labels.shiftOverview}</h4>
        <div className="mobile-app-ui__shift">
          <span>{sampleData.labels.shiftCrew}</span>
          <strong>{sampleData.labels.shiftTime}</strong>
          <StatusBadge tone="success">{sampleData.labels.onShift}</StatusBadge>
        </div>
        <div className="mobile-app-ui__task">
          <ClipboardList aria-hidden="true" size={16} />
          <span>{sampleData.labels.dailyReport}</span>
          <Check aria-hidden="true" size={15} />
        </div>
        <div className="mobile-app-ui__task">
          <FileText aria-hidden="true" size={16} />
          <span>{sampleData.labels.mobileWeighTicket}</span>
          <ArrowRight aria-hidden="true" size={15} />
        </div>
      </div>
    </PhoneFrame>
  );
}

function CustomerUI() {
  return (
    <UiFrame>
      <div className="customer-ui">
        <div className="ui-heading-row">
          <div>
            <span className="ui-kicker">
              {sampleData.labels.customerPortal}
            </span>
            <h4>{sampleData.labels.customerRecords}</h4>
          </div>
          <span aria-hidden="true" className="avatar">
            {sampleData.labels.customerInitials}
          </span>
        </div>
        {sampleData.customer.projects.map((project, index) => (
          <div className="customer-project" key={project}>
            <div>
              <strong>{project}</strong>
              <StatusBadge tone="success">
                {sampleData.labels.active}
              </StatusBadge>
            </div>
            <span>{sampleData.customer.records[index]}</span>
          </div>
        ))}
        <div className="customer-ui__links">
          {sampleData.customer.records.map((record) => (
            <span key={record}>
              <FileText aria-hidden="true" size={14} />
              {record}
            </span>
          ))}
        </div>
      </div>
    </UiFrame>
  );
}

export function AccessVisual({ kind }: AccessVisualProps) {
  const descriptions = {
    admin:
      "Illustrative admin portal dashboard with workspace navigation and project activity",
    mobile: "Illustrative mobile app with shift and field task summaries",
    customer:
      "Illustrative customer portal with projects, dockets and invoices",
  };
  return (
    <VisualFigure
      description={descriptions[kind]}
      className={`access-visual access-visual--${kind}`}
    >
      {kind === "admin" ? (
        <AdminUI />
      ) : kind === "mobile" ? (
        <MobileUI />
      ) : (
        <CustomerUI />
      )}
    </VisualFigure>
  );
}
