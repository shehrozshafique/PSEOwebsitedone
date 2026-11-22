import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import GrowthTabs from "@/components/home/GrowthTabs";
import { Numbers, Services } from "@/components/home/Proof";
import TrustBar from "@/components/home/TrustBar";
import { CaseStudies } from "@/components/home/Work";
import { Faq, FinalCta, Footer, Process, Testimonials } from "@/components/home/Closing";
import { services } from "@/lib/site";

// Rhythm: dark hero → light → light → paper → dark → light → paper → dark → light → paper → light → green CTA → dark footer
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <GrowthTabs />
        <Numbers />
        <Services items={services} />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
