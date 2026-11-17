import type { PropsWithChildren } from "react";

export function PhoneFrame({ children }: PropsWithChildren) {
  return (
    <div className="phone-frame">
      <div className="phone-frame__notch" />
      <div className="phone-frame__content">{children}</div>
    </div>
  );
}
