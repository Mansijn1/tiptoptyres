import { ArrowRight } from "lucide-react";

const brands = [
  { name: "Michelin", color: "#174a8b", style: "italic" },
  { name: "Pirelli", color: "#d71920", style: "italic" },
  { name: "Continental", color: "#111827", style: "bold" },
  { name: "Bridgestone", color: "#c8102e", style: "bold" },
  { name: "Goodyear", color: "#174a8b", style: "italic" },
  { name: "Yokohama", color: "#d71920", style: "bold" },
  { name: "Dunlop", color: "#111827", style: "italic" },
  { name: "Hankook", color: "#ed6b21", style: "bold" },
  { name: "Falken", color: "#07599d", style: "italic" },
  { name: "Maxxis", color: "#c8102e", style: "bold" },
  { name: "Kumho", color: "#174a8b", style: "bold" },
  { name: "Toyo", color: "#c8102e", style: "italic" },
  { name: "BFGoodrich", color: "#174a8b", style: "bold" },
] as const;

export function BrandsSection() {
  return (
    <section
      id="brands"
      className="border-y border-zinc-200 bg-[#f5f4ef] px-4 py-16 text-zinc-950 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-amber-500/40 bg-amber-400/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-amber-800 sm:text-xs">
            Trusted brands we stock &amp; fit
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.65rem,5vw,2.25rem)] font-black uppercase tracking-wide text-zinc-950">
            Performance meets precision
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600">
            Explore world-class tyre engineering, stocked and fitted by our team.
          </p>
        </div>

        <div className="brand-marquee mt-10 overflow-hidden">
          <div className="brand-marquee-track flex w-max flex-row">
            {[false, true].map((isDuplicate) => (
              <div
                key={isDuplicate ? "duplicate" : "brands"}
                className="flex flex-row items-center gap-8 pr-8"
                aria-hidden={isDuplicate || undefined}
                role={isDuplicate ? undefined : "list"}
                aria-label={isDuplicate ? undefined : "Tyre brands we stock and fit"}
              >
                {brands.map(({ name, color, style }) => (
                  <article
                    key={name}
                    role="listitem"
                    className="group flex min-h-40 w-44 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 py-5 text-center shadow-sm transition-colors hover:border-amber-400/80 hover:shadow-[0_8px_24px_rgba(180,120,0,0.12)] sm:min-h-44 sm:w-52 sm:px-5"
                  >
                    <span
                      className={`brand-wordmark brand-wordmark-${style}`}
                      style={{ color }}
                      aria-label={name}
                    >
                      {name}
                    </span>
                    <span className="mt-4 h-1 w-9 rounded-full bg-amber-400" aria-hidden="true" />
                    <a
                      href="/#quick-tyre-finder"
                      tabIndex={isDuplicate ? -1 : undefined}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-700 transition-colors hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                    >
                      Explore Range
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
