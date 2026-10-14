import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Comparison } from "@/components/experiences/Comparison";
import { StudioSequence } from "@/components/experiences/StudioSequence";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/content/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: "Studio packshotów i prezentacji produktów.",
    ...(site.email ? { email: site.email } : {}),
  };
  return (
    <div id="top">
      <Header />
      <main id="main">
        <Hero />
        <Comparison />
        <StudioSequence />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
