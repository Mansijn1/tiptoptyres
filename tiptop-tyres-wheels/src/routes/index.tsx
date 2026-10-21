import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Crosshair, CircleDot, Wrench, Mountain, Car, ShieldCheck, BadgePercent, Clock, MapPin, Phone, ArrowRight } from "lucide-react";
import { Header, Footer, MobileBar } from "@/components/site/Chrome";
import { TyreFinder } from "@/components/site/TyreFinder";
import { Booking } from "@/components/site/Booking";
import { BUSINESS, HOURS, DAY_NAMES, fmtHour, openStatus } from "@/lib/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiptop Tyres & Wheels | Tyre Fitting & Wheel Alignment Mount Druitt" },
      { name: "description", content: "Premium tyres, laser wheel alignment and instant fitting in Mount Druitt, NSW. We beat any local competitor price by at least 5%." },
      { property: "og:title", content: "Tiptop Tyres & Wheels, Mount Druitt" },
      { property: "og:description", content: "Tyre fitting, balancing, wheel alignment and repairs. Book online in 60 seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Crosshair, title: "Wheel Alignment", desc: "Precision laser alignment to stop pulling and uneven tyre wear." },
  { icon: CircleDot, title: "Tyre Fitting & Balancing", desc: "Fast fitting and computerised balancing for a smooth ride." },
  { icon: Wrench, title: "Puncture & Tyre Repairs", desc: "Plug and patch repairs done to Australian standards." },
  { icon: Mountain, title: "4WD & Off-Road Wheels", desc: "All-terrain and mud-terrain tyres, alloys and lift-ready setups." },
  { icon: Car, title: "Passenger Vehicle Tyres", desc: "Quality tyres for hatchbacks, sedans, SUVs and utes." },
  { icon: ShieldCheck, title: "Safety & Tread Inspection", desc: "Tread depth, pressure and sidewall checks before long trips." },
];
const brands = ["DUNLOP", "MICHELIN", "BRIDGESTONE", "Continental", "GOODYEAR", "PIRELLI", "YOKOHAMA"];

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
        <section className="tread relative isolate overflow-hidden bg-ink text-ink-foreground">
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/herovideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-0 bg-ink/75" aria-hidden="true" />
          <div className="hazard relative z-10 h-2 w-full" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-sm border border-graphite-line bg-graphite px-3 py-1.5 text-xs font-semibold">
                <span className={`h-2 w-2 rounded-full ${status?.open ? "bg-success" : "bg-destructive"}`} />
                {status?.label ?? "Checking hours"}
              </div>
              <h1 className="mt-6 text-5xl font-bold uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
                Drive with confidence.<br /><span className="text-primary">Expert tyre fitting</span> & wheel services.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-muted">Premium tyres, wheel alignment and instant fitting in Mount Druitt. Walk in or book online.</p>
              <div className="mt-8 flex items-start gap-3 rounded-md border-l-4 border-primary bg-graphite p-4">
                <BadgePercent className="h-6 w-6 shrink-0 text-primary" />
                <p className="font-semibold">We beat any local competitor price by at least 5%. <span className="font-normal text-ink-muted">Show us the quote.</span></p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#booking" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-bold uppercase tracking-wide text-primary-foreground hover:bg-accent">Book a Fitting <ArrowRight className="h-4 w-4" /></a>
                <a href={BUSINESS.phoneHref} className="inline-flex items-center gap-2 rounded-md border-2 border-ink-foreground px-6 py-3 font-bold uppercase tracking-wide hover:border-primary hover:text-primary"><Phone className="h-4 w-4" /> {BUSINESS.phone}</a>
              </div>
            </div>
            <TyreFinder />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">What we do</p>
            <h2 className="mt-2 text-4xl font-bold uppercase sm:text-5xl">Workshop services</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <a href="#booking" key={s.title} className="group bg-card p-8 transition-colors hover:bg-ink hover:text-ink-foreground">
                  <s.icon className="h-10 w-10 text-foreground transition-colors group-hover:text-primary" strokeWidth={1.5} />
                  <h3 className="mt-6 text-2xl font-semibold uppercase">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground group-hover:text-ink-muted">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold uppercase text-accent group-hover:text-primary">Book this <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section id="brands" className="border-y border-graphite-line bg-graphite py-12 text-ink-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-ink-muted">Brands we stock and fit</p>
            <div className="mt-8 grid grid-cols-2 gap-px bg-graphite-line sm:grid-cols-4 lg:grid-cols-7">
              {brands.map((b) => (
                <div key={b} className="grid h-20 place-items-center bg-graphite font-display text-xl font-bold tracking-wider text-ink-muted transition-colors hover:text-ink-foreground">{b}</div>
              ))}
            </div>
          </div>
        </section>

        <Booking />

        {/* Location */}
        <section id="location" className="py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">Visit the workshop</p>
              <h2 className="mt-2 text-4xl font-bold uppercase">Mount Druitt, NSW</h2>
              <p className="mt-4 flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-accent" />{BUSINESS.address}</p>
              <div className={`mt-6 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-bold ${status?.open ? "bg-success/15 text-foreground" : "bg-muted text-foreground"}`}>
                <Clock className="h-4 w-4" /> {status?.label ?? "Checking hours"}
              </div>
              <table className="mt-6 w-full text-sm">
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                    <tr key={d} className={`border-b border-border ${status?.day === d ? "font-bold" : ""}`}>
                      <td className="py-2.5">{DAY_NAMES[d]}</td>
                      <td className="py-2.5 text-right">{HOURS[d] ? `${fmtHour(HOURS[d]![0])} to ${fmtHour(HOURS[d]![1])}` : "Closed"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.mapsQuery}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-bold uppercase text-ink-foreground hover:bg-graphite">Get Directions <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="min-h-[380px] overflow-hidden rounded-lg border border-border">
              <iframe title="Tiptop Tyres location map" src={`https://www.google.com/maps?q=${BUSINESS.mapsQuery}&output=embed`} className="h-full min-h-[380px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
