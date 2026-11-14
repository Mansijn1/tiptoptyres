import { ArrowRight, BadgeDollarSign, Crosshair, Disc3, ShieldCheck, Sparkles } from "lucide-react";

const trustPillars = [
  {
    title: "Australian Safety Certified",
    description: "Tyre advice, repairs and fitment guided by Australian safety requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Precision Fitment",
    description: "Careful fitting and balancing for a smooth drive and confident handling.",
    icon: Crosshair,
  },
  {
    title: "Major Brands & Wheels",
    description: "Explore trusted tyre brands and wheel options for everyday and off-road driving.",
    icon: Disc3,
  },
  {
    title: "Transparent Pricing",
    description: "Straightforward recommendations and clear pricing before work gets underway.",
    icon: BadgeDollarSign,
  },
];

const stats = [
  { value: "10,000+", label: "Tyres fitted" },
  { value: "Same-day", label: "Service available" },
  { value: "5-star", label: "Customer care" },
];

export function AboutUs() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#101114] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,199,0,0.12),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#FFC700] sm:text-sm">
            About TipTop Tyres &amp; Wheels
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1.05] tracking-tight">
            Australian roads.
            <span className="block text-[#FFC700]">Standards you can trust.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
            The right tyres make every drive safer. Our Mount Druitt team pairs quality products
            with careful fitment and practical advice, helping you find the right setup for
            Australian vehicles and the roads you travel.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {trustPillars.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-[#FFC700]/50 hover:bg-white/[0.07] sm:p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFC700]/25 bg-[#FFC700]/10 text-[#FFC700]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-extrabold uppercase tracking-wide text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#FFC700]/20 bg-[#FFC700]/20 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-[#17181b] px-5 py-6 text-center sm:px-8 sm:py-8">
              <p className="font-display text-3xl font-bold uppercase tracking-wide text-[#FFC700] sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-300 sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b1c20] to-[#131417] p-6 text-center sm:mt-12 sm:p-8 md:flex-row md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFC700]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Ready for the road ahead?
            </div>
            <h3 className="mt-2 text-xl font-black uppercase sm:text-2xl">
              Let&apos;s find your perfect fit.
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Search by registration, ask our AI assistant, or send an enquiry to our team.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="/#quick-tyre-finder"
              onClick={() => window.dispatchEvent(new CustomEvent("tiptop:open-rego-search"))}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#FFC700] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition-colors hover:bg-[#ffda4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17181b]"
            >
              Search by Rego
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/#booking"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:border-[#FFC700] hover:text-[#FFC700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17181b]"
            >
              Ask our team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
