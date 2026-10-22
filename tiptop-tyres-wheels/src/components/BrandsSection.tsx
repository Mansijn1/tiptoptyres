import { ArrowRight, CircleDot } from "lucide-react";

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
        <div
          className="brand-ticker mt-9 overflow-hidden"
          role="region"
          aria-label="Brands we stock and fit"
        >
          <div className="animate-brand-ticker flex w-max">
            <div className="flex shrink-0 gap-3 pr-3">
              {brands.map((brand) => (
                <a
                  key={brand}
                  href="#quick-tyre-finder"
                  className="group flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-zinc-800 bg-[#121316] px-6 py-3 text-sm font-extrabold tracking-wider text-white shadow-md transition-colors hover:border-[#FFC700] hover:text-[#FFC700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]"
                >
                  <CircleDot className="h-4 w-4 text-[#FFC700]" aria-hidden="true" />
                  {brand}
                  <span className="sr-only"> - view tyre range</span>
                  <ArrowRight
                    className="h-4 w-4 text-[#FFC700] transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
            <div className="flex shrink-0 gap-3 pr-3" aria-hidden="true">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-zinc-800 bg-[#121316] px-6 py-3 text-sm font-extrabold tracking-wider text-white shadow-md"
                >
                  <CircleDot className="h-4 w-4 text-[#FFC700]" />
                  {brand}
                  <ArrowRight className="h-4 w-4 text-[#FFC700]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
