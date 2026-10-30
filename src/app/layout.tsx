import type { Metadata, Viewport } from "next";
import { siteContent } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteContent.footer.website}`),
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  applicationName: siteContent.accessibility.brandName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/images/logos/workplanx-icon-only.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteContent.accessibility.brandName,
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: [
      {
        url: "/images/og/workplanx-social.png",
        width: 1200,
        height: 630,
        alt: "WorkPlanX — one platform for your entire project lifecycle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    images: ["/images/og/workplanx-social.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
