import { AccessPoints } from "@/components/sections/AccessPoints";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { ProductSolutions } from "@/components/sections/ProductSolutions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsSection />
      <ProductSolutions />
      <AccessPoints />
      <CtaBand />
    </>
  );
}
