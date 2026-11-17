import type { PropsWithChildren } from "react";

export function UiFrame({ children }: PropsWithChildren) {
  return (
    <div className="ui-frame">
      <div aria-hidden="true" className="ui-frame__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="ui-frame__content">{children}</div>
    </div>
  );
}
