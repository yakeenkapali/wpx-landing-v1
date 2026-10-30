import { AccessPoints } from "@/components/sections/AccessPoints";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProblemStrip } from "@/components/sections/ProblemStrip";
import { Proof } from "@/components/sections/Proof";
import { Showcase } from "@/components/sections/Showcase";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteContent } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {siteContent.accessibility.skipToContent}
      </a>
      <Header />
      <main id="main-content">
        <div id="top" className="hero-wrap">
          <Hero />
        </div>
        <ProblemStrip />
        <HowItWorks />
        <Showcase />
        <AccessPoints />
        <Proof />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
