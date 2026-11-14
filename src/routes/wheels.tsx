import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Disc3, MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Footer, Header, MobileBar } from "@/components/site/Chrome";
import { BUSINESS } from "@/lib/business";

type Wheel = {
  name: string;
  brand: "Starcorp Racing" | "SC Racing";
  size: string;
  finish: string;
  style: "silver" | "bronze" | "black";
};

const wheels: Wheel[] = [
  {
    name: "L2018 Chaos",
    brand: "Starcorp Racing",
    size: "16x7.0",
    finish: "Satin Black",
    style: "black",
  },
  {
    name: "SR05",
    brand: "Starcorp Racing",
    size: "16x7.0",
    finish: "Satin Black",
    style: "black",
  },
  {
    name: "DX136",
    brand: "SC Racing",
    size: "15x7.0",
    finish: "Matte Bronze",
    style: "bronze",
  },
  {
    name: "508",
    brand: "SC Racing",
    size: "17x7.5",
    finish: "Silver Machine Lip",
    style: "silver",
  },
];

const filters = [
  "All Wheels",
  "Starcorp Racing",
  "SC Racing",
  '15"-17" Rims',
  "Satin Black",
  "Bronze/Silver",
] as const;

type WheelFilter = (typeof filters)[number];
type VehicleEntry = "make-model" | "rego";

function wheelMatchesFilter(wheel: Wheel, filter: WheelFilter) {
  switch (filter) {
    case "All Wheels":
      return true;
    case "Starcorp Racing":
    case "SC Racing":
      return wheel.brand === filter;
    case '15"-17" Rims':
      return Number.parseInt(wheel.size, 10) >= 15 && Number.parseInt(wheel.size, 10) <= 17;
    case "Satin Black":
      return wheel.finish === "Satin Black";
    case "Bronze/Silver":
      return wheel.style === "bronze" || wheel.style === "silver";
  }
}

function WheelsPage() {
  const [filter, setFilter] = useState<WheelFilter>("All Wheels");
  const [selectedWheel, setSelectedWheel] = useState<Wheel | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vehicleEntry, setVehicleEntry] = useState<VehicleEntry>("make-model");
  const [submitted, setSubmitted] = useState(false);

  const visibleWheels = wheels.filter((wheel) => wheelMatchesFilter(wheel, filter));

  function openEnquiry(wheel: Wheel) {
    setSelectedWheel(wheel);
    setVehicleEntry("make-model");
    setSubmitted(false);
    setDialogOpen(true);
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedWheel) return;

    const formData = new FormData(event.currentTarget);
    const vehicle =
      vehicleEntry === "rego"
        ? `Australian rego: ${formData.get("state")} ${formData.get("rego")}`
        : `Vehicle: ${formData.get("vehicle")}`;
    const subject = `Wheel fitment enquiry: ${selectedWheel.brand} ${selectedWheel.name}`;
    const body = [
      `Wheel: ${selectedWheel.brand} ${selectedWheel.name}`,
      `Size: ${selectedWheel.size}`,
      `Finish: ${selectedWheel.finish}`,
      vehicle,
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
    ].join("\n");

    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-[#0a0a0a] text-white">
        <section className="wheels-hero relative isolate flex min-h-[620px] items-center overflow-hidden border-b border-white/10 sm:min-h-[680px]">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_42%,rgba(234,179,8,0.2),transparent_35%),radial-gradient(ellipse_at_50%_100%,rgba(234,179,8,0.07),transparent_55%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute -right-36 top-1/2 -z-10 hidden aspect-square w-[min(64vw,760px)] -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/10 lg:flex">
            <div className="absolute inset-[8%] rounded-full border border-dashed border-amber-300/15" />
            <div className="absolute inset-[18%] rounded-full border border-white/5" />
            <div className="absolute inset-[28%] rounded-full border border-dashed border-white/10" />
            <img
              src="/alloy-wheel.svg"
              alt=""
              className="wheels-hero-wheel relative w-[55%] opacity-35"
              aria-hidden="true"
            />
          </div>
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="max-w-3xl">
              <p
                className="wheels-reveal inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber-300 sm:text-xs"
                style={{ animationDelay: "100ms" }}
              >
                <Disc3 className="h-4 w-4" aria-hidden="true" />
                TipTop Tyres &amp; Wheels · Mount Druitt
              </p>
              <h1 className="mt-7 font-display text-[clamp(2.6rem,8vw,6.6rem)] font-black uppercase leading-[0.94] tracking-tight">
                <span className="wheels-reveal block" style={{ animationDelay: "220ms" }}>
                  Precision alloy
                </span>
                <span
                  className="wheels-reveal block text-amber-400"
                  style={{ animationDelay: "360ms" }}
                >
                  &amp; performance
                </span>
                <span className="wheels-reveal block" style={{ animationDelay: "500ms" }}>
                  wheels.
                </span>
              </h1>
              <p
                className="wheels-reveal mt-6 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base"
                style={{ animationDelay: "650ms" }}
              >
                The right wheels change the whole stance. Explore our Starcorp Racing and SC Racing
                picks, then talk to our Mount Druitt team about the right fit for your vehicle.
              </p>
              <a
                href="#wheel-range"
                className="wheels-reveal mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm bg-[#eab308] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition-all hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:text-sm"
                style={{ animationDelay: "780ms" }}
              >
                Explore the range
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent"
            aria-hidden="true"
          />
        </section>

        <section id="wheel-range" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-400 sm:text-xs">
                The wheel edit
              </p>
              <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
                Built to stand apart
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                A considered selection of performance-inspired designs. Ask us about vehicle
                compatibility, available finishes and a wheel-and-tyre package.
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              {visibleWheels.length} designs <span className="px-2 text-amber-400">/</span> Expert
              fitment advice
            </p>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="Filter wheels">
            {filters.map((item) => {
              const isSelected = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setFilter(item)}
                  className={`min-h-10 shrink-0 rounded-sm border px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-all sm:text-xs ${
                    isSelected
                      ? "border-[#eab308] bg-[#eab308] text-black shadow-[0_0_22px_rgba(234,179,8,0.15)]"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-amber-400/60 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleWheels.map((wheel, index) => (
              <article
                key={wheel.name}
                className="wheels-card group relative overflow-hidden rounded-sm border border-white/10 bg-[#111214] transition duration-500 hover:-translate-y-1 hover:border-yellow-500/80 hover:shadow-[0_24px_70px_rgba(234,179,8,0.1)]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative isolate flex aspect-[1.14/1] items-center justify-center overflow-hidden bg-[#0e0f10]">
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_54%,rgba(255,255,255,0.1),transparent_48%),linear-gradient(145deg,rgba(234,179,8,0.04),transparent_52%)]"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-[15%] bottom-[10%] h-5 rounded-[50%] bg-black/70 blur-xl"
                    aria-hidden="true"
                  />
                  <img
                    src="/alloy-wheel.svg"
                    alt={`${wheel.finish} alloy wheel`}
                    loading="lazy"
                    className={`wheels-product-image wheels-product-${wheel.style} relative z-10 w-[66%] max-w-[270px] drop-shadow-[0_22px_34px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:rotate-[360deg]`}
                  />
                  <span className="absolute left-4 top-4 rounded-sm border border-white/10 bg-black/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-300">
                    {wheel.size}
                  </span>
                  <span className="absolute right-4 top-4 text-[8px] font-bold uppercase tracking-[0.16em] text-zinc-600">
                    Style preview
                  </span>
                  <div className="wheels-card-actions absolute inset-x-3 bottom-3 z-20 flex translate-y-2 flex-col gap-2 opacity-100 transition-all duration-300 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                    <button
                      type="button"
                      onClick={() => openEnquiry(wheel)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#eab308] px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-yellow-300"
                    >
                      Check vehicle fitment
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEnquiry(wheel)}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-white/15 bg-black/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white backdrop-blur transition-colors hover:border-amber-300 hover:text-amber-300"
                    >
                      Get a quote
                    </button>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-400">
                      {wheel.brand}
                    </p>
                    <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                      {wheel.finish}
                    </p>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide">
                    {wheel.name}
                  </h3>
                  <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                        From
                      </p>
                      <p className="mt-1 font-display text-xl font-bold tracking-wide text-white">
                        $XX <span className="text-[10px] font-medium text-zinc-500">/ enquire</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openEnquiry(wheel)}
                      aria-label={`Enquire about ${wheel.brand} ${wheel.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-amber-300 transition-colors hover:border-amber-400 hover:bg-amber-400 hover:text-black"
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-black/10 bg-[#eab308] text-black">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(135deg,transparent_45%,rgba(0,0,0,0.8)_46%,rgba(0,0,0,0.8)_50%,transparent_51%)] [background-size:26px_26px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-7 px-4 py-12 sm:px-6 sm:py-16 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.23em] text-black/60 sm:text-xs">
                Your next setup starts here
              </p>
              <h2 className="mt-2 max-w-2xl font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
                Visit us. Let&apos;s get your fitment right.
              </h2>
              <p className="mt-2 text-sm font-medium text-black/70">
                Mount Druitt wheel and tyre advice, from our workshop to your vehicle.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/#location"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-black/30 bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-zinc-800"
              >
                <MapPin className="h-4 w-4 text-amber-400" aria-hidden="true" />
                Visit the workshop
              </a>
              <a
                href="/#booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-black/30 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition-colors hover:bg-black/10"
              >
                Book a package
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBar />

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSubmitted(false);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-sm border border-white/10 bg-[#111214] p-0 text-white shadow-[0_30px_100px_rgba(0,0,0,0.75)] [&>button]:right-5 [&>button]:top-5 [&>button]:text-zinc-400 [&>button]:hover:text-white [&>button]:focus:ring-amber-400">
          {selectedWheel && (
            <>
              <div className="border-b border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.12),transparent_60%)] px-6 pb-5 pt-7 sm:px-8">
                <DialogHeader className="pr-8 text-left">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-400">
                    {selectedWheel.brand} <span className="px-1 text-zinc-600">/</span>{" "}
                    {selectedWheel.size} · {selectedWheel.finish}
                  </p>
                  <DialogTitle className="mt-2 font-display text-3xl font-black uppercase tracking-wide text-white">
                    Fitment &amp; quote
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-sm leading-6 text-zinc-400">
                    {selectedWheel.name}. Share your vehicle details and our team will confirm
                    compatibility and pricing with you.
                  </DialogDescription>
                </DialogHeader>
              </div>

              {submitted ? (
                <div className="px-6 py-10 text-center sm:px-8">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold uppercase">
                    Enquiry email prepared
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                    Your email app should open with the wheel and vehicle details. Send that message
                    to submit your enquiry to our team.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitEnquiry} className="space-y-5 px-6 py-6 sm:px-8 sm:py-7">
                  <fieldset>
                    <legend className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-zinc-400">
                      Vehicle details
                    </legend>
                    <div className="grid grid-cols-2 gap-2 rounded-sm border border-white/10 bg-black/30 p-1">
                      {(
                        [
                          ["make-model", "Make & model"],
                          ["rego", "Australian rego"],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={vehicleEntry === value}
                          onClick={() => setVehicleEntry(value)}
                          className={`min-h-10 px-3 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors ${
                            vehicleEntry === value
                              ? "bg-[#eab308] text-black"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {vehicleEntry === "make-model" ? (
                    <label className="block space-y-2 text-xs font-bold text-zinc-300">
                      Vehicle make and model
                      <input
                        name="vehicle"
                        required
                        autoFocus
                        placeholder="e.g. Toyota Hilux SR5"
                        className="h-12 w-full rounded-sm border border-white/10 bg-[#090a0b] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                      />
                    </label>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                      <label className="block space-y-2 text-xs font-bold text-zinc-300">
                        State
                        <select
                          name="state"
                          required
                          className="h-12 w-full rounded-sm border border-white/10 bg-[#090a0b] px-3 text-sm text-white outline-none focus:border-amber-400"
                          defaultValue="NSW"
                        >
                          {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block space-y-2 text-xs font-bold text-zinc-300">
                        Registration plate
                        <input
                          name="rego"
                          required
                          autoFocus
                          maxLength={9}
                          autoComplete="off"
                          placeholder="e.g. ABC 123"
                          className="h-12 w-full rounded-sm border border-white/10 bg-[#090a0b] px-4 text-sm uppercase text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                        />
                      </label>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block space-y-2 text-xs font-bold text-zinc-300">
                      Your name
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Full name"
                        className="h-12 w-full rounded-sm border border-white/10 bg-[#090a0b] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                      />
                    </label>
                    <label className="block space-y-2 text-xs font-bold text-zinc-300">
                      Mobile number
                      <input
                        name="phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="04xx xxx xxx"
                        className="h-12 w-full rounded-sm border border-white/10 bg-[#090a0b] px-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40"
                      />
                    </label>
                  </div>
                  <p className="text-[11px] leading-5 text-zinc-500">
                    Submitting prepares an email to {BUSINESS.email}; your email app will open so
                    you can send it to us.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#eab308] px-5 py-3 text-xs font-black uppercase tracking-[0.15em] text-black transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111214]"
                  >
                    Prepare fitment enquiry
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export const Route = createFileRoute("/wheels")({
  head: () => ({
    meta: [
      { title: "Alloy & Performance Wheels | TipTop Tyres & Wheels" },
      {
        name: "description",
        content:
          "Explore Starcorp Racing and SC Racing alloy wheels at TipTop Tyres & Wheels in Mount Druitt. Ask our team about fitment and wheel packages.",
      },
    ],
  }),
  component: WheelsPage,
});
