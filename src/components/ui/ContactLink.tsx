import type { AnchorHTMLAttributes, ReactNode } from "react";

type ContactLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
};

export function ContactLink({ children, ...props }: ContactLinkProps) {
  return (
    <a href="#contact" {...props}>
      {children}
    </a>
  );
}
