import { useEffect, useMemo, useState } from "react";
import {
  AlignHorizontalJustifyCenter,
  CalendarCheck,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Gauge,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { HOURS } from "@/lib/business";

export const SERVICES = [
  "Wheel Alignment",
  "Tyre Fitting & Balancing",
  "Puncture & Tyre Repair",
  "4WD & Off-Road Wheels",
  "Passenger Vehicle Tyres",
  "Safety & Tread Inspection",
];
const STEPS = ["Service", "Date & Time", "Vehicle", "Confirmed"];
const SERVICE_OPTIONS = [
  {
    label: SERVICES[0],
    detail: "Precision steering & suspension setup",
    icon: AlignHorizontalJustifyCenter,
  },
  { label: SERVICES[1], detail: "Expert fitment, balancing & rotation", icon: Disc3 },
  { label: SERVICES[2], detail: "Fast puncture checks & repairs", icon: Wrench },
  { label: SERVICES[3], detail: "Built tough for your next track", icon: Truck },
  { label: SERVICES[4], detail: "Quality tyres for everyday driving", icon: Car },
  { label: SERVICES[5], detail: "A closer look at your tyre health", icon: ShieldCheck },
];

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (HOURS[d.getDay()]) out.push(new Date(d));
  }
  return out;
}

export function Booking() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("Tyre Fitting & Balancing");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState("");
  const [v, setV] = useState({ name: "", phone: "", vehicle: "", rego: "" });
  const days = useMemo(() => nextDays(10), []);

  useEffect(() => {
    const h = (e: Event) => setV((p) => ({ ...p, vehicle: (e as CustomEvent<string>).detail }));
    window.addEventListener("tiptop:vehicle", h);
    return () => window.removeEventListener("tiptop:vehicle", h);
  }, []);

  const selectedDay = days.find((d) => d.toDateString() === date);
  const slots = useMemo(() => {
    if (!selectedDay) return [];
    const [o, c] = HOURS[selectedDay.getDay()]!;
    const s: string[] = [];
    for (let h = o; h < c; h += 1)
      s.push(`${h % 12 === 0 ? 12 : h % 12}:00 ${h >= 12 ? "PM" : "AM"}`);
    return s;
  }, [selectedDay]);

  const canNext =
    step === 0
      ? !!service
      : step === 1
        ? !!date && !!time
        : v.name.trim() && v.phone.trim().length >= 8 && v.vehicle.trim();
  const ref = useMemo(
    () => "TT-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    [step === 3],
  );

  const field =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25";

  return (
    <section
      id="booking"
      className="relative isolate overflow-hidden bg-gradient-to-b from-slate-100 to-white py-16 text-slate-900 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,rgba(248,250,252,0.9)_75%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-20 top-4 z-0 h-64 w-64 rounded-full border border-sky-700/10 sm:left-[-5rem] sm:top-8 sm:h-96 sm:w-96">
        <div className="booking-wire-ring absolute inset-[12%] rounded-full border border-dashed border-sky-700/20" />
        <div className="booking-wire-ring booking-wire-ring-inner absolute inset-[25%] rounded-full border border-sky-700/15" />
        <div className="absolute inset-[38%] rounded-full border border-sky-700/15" />
      </div>
      <div className="pointer-events-none absolute -right-20 top-0 z-0 h-64 w-64 rounded-full border border-amber-700/10 sm:right-[-5rem] sm:top-4 sm:h-96 sm:w-96">
        <div className="booking-speed-ring absolute inset-[12%] rounded-full border-[3px] border-transparent border-t-amber-600/30 border-r-amber-600/10" />
        <div className="absolute inset-[25%] rounded-full border border-dashed border-amber-700/15" />
        <Gauge className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-amber-700/20" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-slate-900 shadow-2xl shadow-slate-300/50 backdrop-blur-xl sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.07),_transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 text-center">
            <p className="inline-flex rounded-full border border-amber-500/40 bg-amber-400/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber-700 shadow-[0_0_22px_rgba(251,191,36,0.12)] sm:text-xs">
              Online Booking
            </p>
            <h2 className="booking-metallic-title mt-4 font-display text-3xl font-black uppercase tracking-wide sm:text-4xl lg:text-5xl">
              Book a service in 60 seconds
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Choose your service, find a time that suits, and leave the rest to our tyre experts.
              We’ll confirm your booking by phone.
            </p>
          </div>

          <ol
            aria-label="Booking progress"
            className="relative z-10 mt-8 grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-slate-100/80 p-2 backdrop-blur-xl sm:grid-cols-4 sm:gap-3"
          >
            {STEPS.map((label, index) => {
              const active = index === step;
              const completed = index < step;
              return (
                <li
                  key={label}
                  aria-current={active ? "step" : undefined}
                  className={`flex min-h-12 items-center gap-2 rounded-xl border px-2 py-2 text-[10px] font-bold uppercase tracking-wide transition-all duration-300 sm:justify-center sm:gap-2.5 sm:text-xs ${
                    active
                      ? "booking-step-active border-amber-200/70 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-slate-950 shadow-[0_0_26px_rgba(245,158,11,0.35)]"
                      : completed
                        ? "border-amber-400/40 bg-amber-50 text-amber-800"
                        : "border-slate-200 bg-white/80 text-slate-500"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-black ${
                      active
                        ? "border-slate-950/20 bg-white/25 text-slate-950"
                        : completed
                          ? "border-amber-400/50 bg-amber-100 text-amber-800"
                          : "border-slate-300 bg-slate-100 text-slate-700"
                    }`}
                  >
                    {completed ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <span>{label}</span>
                </li>
              );
            })}
          </ol>

          <div className="relative z-10 mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl sm:p-6">
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICE_OPTIONS.map(({ label: item, detail, icon: Icon }) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setService(item)}
                    aria-pressed={service === item}
                    className={`group relative flex min-h-[116px] items-center gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                      service === item
                        ? "booking-service-selected border-sky-500 bg-white text-slate-900 shadow-[inset_0_0_24px_rgba(56,189,248,0.08),0_0_20px_rgba(56,189,248,0.12)]"
                        : "border-slate-200 bg-white text-slate-800 hover:border-red-500/50 hover:shadow-xl"
                    }`}
                  >
                    {service === item && (
                      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.13),_transparent_55%)]" />
                    )}
                    <span
                      className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors ${
                        service === item
                          ? "border-sky-300/60 bg-sky-50 text-sky-700"
                          : "border-slate-200 bg-slate-50 text-slate-500 group-hover:text-sky-700"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block text-xs font-bold leading-5 sm:text-sm">{item}</span>
                      <span className="mt-1 block text-[10px] leading-4 text-slate-500 sm:text-xs">
                        {detail}
                      </span>
                    </span>
                    {service === item && (
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                        <span className="booking-wheel-preview absolute inset-0 rounded-full border border-sky-500/60" />
                        <Disc3 className="h-5 w-5 text-sky-700" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-800">
                    Choose a date
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {days.map((day) => {
                      const key = day.toDateString();
                      const selected = date === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                            setDate(key);
                            setTime("");
                          }}
                          className={`min-w-[72px] rounded-xl border px-3 py-3 text-center transition-colors ${
                            selected
                              ? "border-amber-300 bg-amber-300 text-slate-950 shadow-[0_0_16px_rgba(251,191,36,0.2)]"
                              : "border-slate-200 bg-white text-slate-700 hover:border-amber-400"
                          }`}
                        >
                          <span className="block text-xs font-semibold uppercase">
                            {day.toLocaleDateString("en-AU", { weekday: "short" })}
                          </span>
                          <span className="block font-display text-2xl font-bold">
                            {day.getDate()}
                          </span>
                          <span className="block text-xs">
                            {day.toLocaleDateString("en-AU", { month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-800">
                    Available times
                  </p>
                  {selectedDay ? (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={time === slot}
                          onClick={() => setTime(slot)}
                          className={`rounded-xl border py-3 text-sm font-semibold transition-colors ${
                            time === slot
                              ? "border-amber-300 bg-amber-300 text-slate-950 shadow-[0_0_16px_rgba(251,191,36,0.2)]"
                              : "border-slate-200 bg-white text-slate-700 hover:border-amber-400"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Pick a day to see available times.</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Full name
                  <input
                    aria-label="Full name"
                    className={field}
                    placeholder="Enter your name"
                    value={v.name}
                    onChange={(event) => setV({ ...v, name: event.target.value })}
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Mobile number
                  <input
                    aria-label="Mobile number"
                    className={field}
                    placeholder="Enter your mobile number"
                    inputMode="tel"
                    value={v.phone}
                    onChange={(event) => setV({ ...v, phone: event.target.value })}
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Vehicle or tyre size
                  <input
                    aria-label="Vehicle or tyre size"
                    className={field}
                    placeholder="e.g. 2020 Toyota HiLux"
                    value={v.vehicle}
                    onChange={(event) => setV({ ...v, vehicle: event.target.value })}
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-slate-700">
                  Rego <span className="font-normal text-slate-500">(optional)</span>
                  <input
                    aria-label="Rego (optional)"
                    className={`${field} uppercase`}
                    placeholder="Registration"
                    value={v.rego}
                    onChange={(event) => setV({ ...v, rego: event.target.value })}
                  />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <CalendarCheck className="mx-auto h-14 w-14 text-emerald-600" />
                <h3 className="mt-4 text-3xl font-bold uppercase">Booking request received</h3>
                <p className="mt-2 text-slate-600">
                  Reference <strong className="text-slate-900">{ref}</strong>
                </p>
                <dl className="mx-auto mt-6 max-w-sm divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-left text-sm shadow-sm">
                  {[
                    ["Service", service],
                    [
                      "When",
                      `${selectedDay?.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })}, ${time}`,
                    ],
                    ["Vehicle", v.vehicle],
                    ["Name", v.name],
                  ].map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4 p-3">
                      <dt className="text-slate-500">{key}</dt>
                      <dd className="text-right font-semibold text-slate-900">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-slate-600">
                  We will call {v.phone} to confirm your quote.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setService("Tyre Fitting & Balancing");
                    setDate("");
                    setTime("");
                  }}
                  className="mt-6 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 transition-colors hover:border-amber-500 hover:text-amber-700"
                >
                  Book another
                </button>
              </div>
            )}

            {step < 3 && (
              <div className="mt-8 flex justify-between border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={() => setStep((currentStep) => currentStep - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-1 rounded-xl px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-600 transition-all duration-300 hover:scale-105 hover:text-slate-950 disabled:invisible"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep((currentStep) => currentStep + 1)}
                  disabled={!canNext}
                  className="booking-continue group relative flex items-center gap-2 overflow-hidden rounded-xl border border-amber-200/50 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-slate-950 shadow-[0_0_24px_rgba(245,158,11,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(245,158,11,0.4)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <span className="booking-continue-beam pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 blur-md" />
                  <span className="relative z-10">
                    {step === 2 ? "Confirm Booking" : "Continue"}
                  </span>
                  <ChevronRight className="relative z-10 h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
