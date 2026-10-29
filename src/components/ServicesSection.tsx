import {
  AlignHorizontalJustifyCenter,
  ArrowRight,
  Car,
  CircleDot,
  Gauge,
  Mountain,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: AlignHorizontalJustifyCenter,
    title: "Wheel Alignment",
    category: "Alignment",
    description: "Precision laser alignment to stop pulling and uneven tyre wear.",
    image:
      "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Technician checking a vehicle's wheel alignment in a workshop",
  },
  {
    icon: Car,
    title: "Passenger Vehicle Tyres",
    category: "Passenger",
    description: "Quality tyres for hatchbacks, sedans, SUVs and utes.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Modern passenger car viewed from the front",
    featured: true,
  },
  {
    icon: CircleDot,
    title: "Tyre Fitting & Balancing",
    category: "Fitment",
    description: "Fast fitting and computerised balancing for a smooth ride.",
    image:
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Vehicle in a workshop undergoing tyre fitting and service",
  },
  {
    icon: Mountain,
    title: "4WD & Off-Road Wheels",
    category: "4WD & Off-road",
    description: "All-terrain and mud-terrain tyres, alloys and lift-ready setups.",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Rugged four-wheel-drive vehicle ready for an off-road trip",
  },
  {
    icon: Wrench,
    title: "Puncture & Tyre Repairs",
    category: "Repairs",
    description: "Plug and patch repairs done to Australian standards.",
    image:
      "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Technician performing a hands-on repair in a vehicle workshop",
  },
  {
    icon: Gauge,
    title: "Tyre Pressure Checks",
    category: "Safety",
    description: "Pressure and tread checks to help keep every trip safe.",
    image:
      "https://images.pexels.com/photos/3806280/pexels-photo-3806280.jpeg?auto=compress&cs=tinysrgb&w=1000",
    imageAlt: "Technician inspecting a vehicle tyre and wheel",
  },
];

function EdgeTyres({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`pointer-events-none absolute ${isLeft ? "left-[-4.5rem] xl:left-[-2rem]" : "right-[-4.5rem] xl:right-[-2rem]"} top-1/2 z-0 hidden -translate-y-1/2 flex-col gap-10 opacity-25 xl:flex`}
      aria-hidden="true"
    >
      {[0, 1, 2].map((wheel) => (
        <div
          key={wheel}
          className={`relative grid h-36 w-36 place-items-center rounded-full ${
            isLeft ? "services-offroad-tire" : "services-alloy-tire"
          } ${isLeft ? "services-tire-spin" : "services-tire-spin-reverse"}`}
        >
          <div
            className={`absolute inset-[18%] rounded-full border ${
              isLeft ? "border-slate-500/60" : "border-slate-400/70"
            }`}
          />
          <div className="absolute inset-[30%] rounded-full border border-slate-500/60" />
          <CircleDot
            className={`h-14 w-14 ${isLeft ? "text-slate-600" : "text-slate-500"}`}
            strokeWidth={1}
          />
          {isLeft && (
            <span className="absolute inset-x-[-35%] bottom-[-18%] h-10 rotate-[-18deg] bg-[repeating-linear-gradient(135deg,transparent_0_8px,#94a3b8_8px_10px,transparent_10px_18px)] opacity-30" />
          )}
        </div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-slate-50 py-12 text-slate-950 sm:py-16 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(248,250,252,0.2)_0%,rgba(248,250,252,0.92)_72%)]"
        aria-hidden="true"
      />

      <EdgeTyres side="left" />
      <EdgeTyres side="right" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">What we do</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] font-bold uppercase tracking-wide text-slate-950">
              Workshop services
            </h2>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Expert tyre care and wheel services, backed by quality workmanship and a local team.
            </p>
          </div>

          <div className="services-card-grid relative mt-6 grid min-w-0 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <svg
              className="services-circuit pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M500 145 V250 H167 V355" />
              <path d="M500 145 V250 H500 V355" />
              <path d="M500 145 V250 H833 V355" />
            </svg>
            {services.map(
              ({ icon: Icon, title, category, description, image, imageAlt, featured }) => (
                <article
                  key={title}
                  className={`services-section-card group relative z-10 overflow-hidden rounded-2xl border bg-white shadow-[0_8px_22px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:border-cyan-400/70 hover:shadow-xl hover:shadow-cyan-900/10 ${
                    featured
                      ? "services-featured-card border-red-500 shadow-xl shadow-red-500/10"
                      : "border-slate-200"
                  }`}
                >
                  {featured && (
                    <span
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-red-400/35"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex h-28 items-center justify-between overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 px-4 sm:h-32">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.13),transparent_68%)]" />
                    <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition-all group-hover:border-cyan-300 group-hover:text-cyan-700">
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <img
                      src={image}
                      alt={imageAlt}
                      loading="lazy"
                      className="relative z-10 h-full w-[70%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative z-10 p-4 sm:p-5">
                    <span className="mb-1.5 inline-flex rounded-full border border-amber-500/30 bg-amber-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-amber-800">
                      {category}
                    </span>
                    <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-wide text-slate-950">
                      {title}
                    </h3>
                    <p className="mt-2 min-h-10 text-xs leading-5 text-slate-600 sm:text-[13px]">
                      {description}
                    </p>
                    <a
                      href="#booking"
                      className="group/link mt-4 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-900 transition-colors hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                    >
                      Book Service
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
