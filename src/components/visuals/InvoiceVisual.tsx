import { ArrowUpRight, Check } from "lucide-react";
import { sampleData } from "@/content/sample-data";
import { StatusBadge } from "@/components/visuals/StatusBadge";
import { UiFrame } from "@/components/visuals/UiFrame";
import { VisualFigure } from "@/components/visuals/VisualFigure";

type InvoiceVisualProps = { caption: string };

export function InvoiceVisual({ caption }: InvoiceVisualProps) {
  return (
    <VisualFigure
      caption={caption}
      description="Illustrative invoice with sample line items and Xero sync status"
    >
      <UiFrame>
        <div className="invoice-document">
          <div className="invoice-document__head">
            <div>
              <span className="ui-kicker">{sampleData.labels.invoice}</span>
              <h4>{sampleData.invoice.number}</h4>
            </div>
            <ArrowUpRight aria-hidden="true" size={18} />
          </div>
          <p className="invoice-document__customer">
            {sampleData.invoice.customer}
          </p>
          <div className="invoice-lines">
            {sampleData.invoice.items.map((item, index) => (
              <div
                className={`invoice-line invoice-line--${index + 1}`}
                key={item.description}
              >
                <span>{item.description}</span>
                <strong>{item.amount}</strong>
              </div>
            ))}
          </div>
          <div className="invoice-document__total">
            <span>{sampleData.labels.total}</span>
            <strong>{sampleData.invoice.total}</strong>
          </div>
          <div className="ui-footer-row">
            <span>{sampleData.labels.invoiceDue}</span>
            <StatusBadge tone="success">
              <Check aria-hidden="true" size={12} />
              {sampleData.labels.xeroSynced}
            </StatusBadge>
          </div>
        </div>
      </UiFrame>
    </VisualFigure>
  );
}
