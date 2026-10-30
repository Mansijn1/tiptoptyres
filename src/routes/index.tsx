import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Header, Footer, MobileBar } from "@/components/site/Chrome";
import { BrandsSection } from "@/components/BrandsSection";
import { QuickTyreFinder } from "@/components/QuickTyreFinder";
import { ServicesSection } from "@/components/ServicesSection";
import { Booking } from "@/components/site/Booking";
import { BUSINESS, HOURS, DAY_NAMES, fmtHour, openStatus } from "@/lib/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiptop Tyres & Wheels | Tyre Fitting & Wheel Alignment Mount Druitt" },
      {
        name: "description",
        content:
          "Premium tyres, laser wheel alignment and instant fitting in Mount Druitt, NSW. We beat any local competitor price by at least 5%.",
      },
      { property: "og:title", content: "Tiptop Tyres & Wheels, Mount Druitt" },
      {
        property: "og:description",
        content: "Tyre fitting, balancing, wheel alignment and repairs. Book online in 60 seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useStatus() {
  const [s, setS] = useState<ReturnType<typeof openStatus> | null>(null);
  useEffect(() => {
    const tick = () => setS(openStatus(new Date()));
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return s;
}

function Index() {
  const status = useStatus();
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div className="hazard h-10 w-full" aria-hidden="true" />
        <section className="relative h-[calc(100vh-40px)] w-full flex flex-col justify-center items-center overflow-hidden text-ink-foreground">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/herovideo.mp4" type="video/mp4" />
          </video>
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <h1 className="mt-0 font-sans text-[clamp(1.65rem,6vw,2.25rem)] font-black uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              <span className="block text-white">Drive with confidence.</span>
              <span className="mt-1 block text-[#FFC700]">Expert tyre &amp; wheel services</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-200 md:text-base">
              Premium tyres, precision alignment and fast fitting in Mount Druitt.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="#services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-white bg-[#1E2026]/80 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black sm:px-8 sm:py-4 sm:text-base"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#FFC700] px-5 py-3 text-xs font-black uppercase tracking-wider text-black shadow-xl shadow-black/30 transition-all duration-300 hover:scale-105 hover:bg-[#ffda4d] sm:px-8 sm:py-4 sm:text-base"
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </a>
          </div>
          </div>
        </section>

        <QuickTyreFinder />

        <ServicesSection />

        <BrandsSection />

        <Booking />

        {/* Location */}
        <section id="location" className="bg-white py-12 text-[#121316] sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Visit the workshop
              </p>
              <h2 className="mt-2 text-[clamp(1.8rem,6vw,2.25rem)] font-bold uppercase">
                Mount Druitt, NSW
              </h2>
              <p className="mt-4 flex gap-2 text-zinc-700">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                {BUSINESS.address}
              </p>
              <div
                className={`mt-6 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-bold ${status?.open ? "bg-green-100 text-green-900" : "bg-zinc-100 text-zinc-800"}`}
              >
                <Clock className="h-4 w-4" /> {status?.label ?? "Checking hours"}
              </div>
              <table className="mt-6 w-full text-sm text-zinc-700">
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                    <tr
                      key={d}
                      className={`border-b border-border ${status?.day === d ? "font-bold" : ""}`}
                    >
                      <td className="py-2.5">{DAY_NAMES[d]}</td>
                      <td className="py-2.5 text-right">
                        {HOURS[d]
                          ? `${fmtHour(HOURS[d]![0])} to ${fmtHour(HOURS[d]![1])}`
                          : "Closed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-ink-foreground transition-all duration-300 hover:scale-105 hover:bg-graphite sm:px-8"
              >
                Get Directions <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="min-h-[380px] overflow-hidden rounded-lg border border-zinc-200">
              <iframe
                title="Tiptop Tyres location map"
                src={`https://www.google.com/maps?q=${BUSINESS.mapsQuery}&output=embed`}
                className="h-full min-h-[380px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
