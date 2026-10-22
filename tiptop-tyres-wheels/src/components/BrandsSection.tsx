import { ArrowRight } from "lucide-react";

const brands = [
  "DUNLOP",
  "MICHELIN",
  "BRIDGESTONE",
  "CONTINENTAL",
  "GOODYEAR",
  "PIRELLI",
  "YOKOHAMA",
];

export function BrandsSection() {
  return (
    <section
      id="brands"
      className="border-y border-[#2E323D] bg-[#121316] py-16 text-white sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[#FFC700]/40 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFC700] sm:text-sm">
            Trusted brands we stock &amp; fit
          </span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {brands.map((brand) => (
            <a
              key={brand}
              href="#quick-tyre-finder"
              className="group flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-[#2E323D] bg-[#1E2026] px-3 py-5 text-center transition-all duration-300 hover:scale-105 hover:border-[#FFC700] hover:shadow-lg hover:shadow-[#FFC700]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]"
            >
              <span className="font-display text-sm font-bold tracking-wide text-white sm:text-base">
                {brand}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#FFC700] opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                View Range
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
