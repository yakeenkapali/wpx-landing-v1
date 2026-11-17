import { AccessPoints } from "@/components/sections/AccessPoints";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { ProductSolutions } from "@/components/sections/ProductSolutions";
import { TrustStrip } from "@/components/sections/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsSection />
      <ProductSolutions />
      <TrustStrip />
      <AccessPoints />
      <CtaBand />
    </>
  );
}
