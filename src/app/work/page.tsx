import type { Metadata } from "next";
import Header from "@/components/home/Header";
import { FinalCta, Footer } from "@/components/home/Closing";
import CaseGrid from "@/components/work/CaseGrid";
import { Marker } from "@/components/motion";
import { cases } from "@/lib/cases";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Our Work & Client Results | ${site.name}`,
  description: "Case studies from local and service businesses: more calls, more bookings and higher Google rankings. See what we did and the numbers.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const anyExample = cases.some((c) => c.example);
  return (
    <>
      <Header dark={false} />
      <main>
        <section className="relative overflow-hidden bg-white pt-14 pb-24 md:pt-20 md:pb-32">
          <div className="container-x relative">
            <div className="max-w-3xl">
              <h1 className="h-display text-[clamp(44px,6.4vw,84px)] font-black">
                Real businesses
                <span className="block font-normal text-slate">Real numbers</span>
              </h1>
              <p className="mt-5 max-w-[54ch] text-lg text-slate">
                Every project is measured in what matters to the owner: <Marker>calls, bookings and revenue</Marker>. Here’s what changed and how we did it.
              </p>
              {anyExample && <p className="mt-4 text-xs text-slate">Example case studies shown until real client work is added.</p>}
            </div>
            <div className="mt-12">
              <CaseGrid items={cases} />
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
