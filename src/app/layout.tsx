import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteContent } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans text-body text-foreground antialiased">
        <a
          className="sr-only rounded-[var(--radius-sm)] bg-background p-3 text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
          href="#main-content"
        >
          {siteContent.accessibility.skipToContent}
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
