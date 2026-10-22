import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
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
  const [service, setService] = useState("");
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
    "h-12 w-full rounded-xl border border-[#3A3D46] bg-[#121316] px-4 text-sm text-white placeholder:text-zinc-400 focus:border-[#FFC700] focus:outline-none focus:ring-2 focus:ring-[#FFC700]/40";

  return (
    <section id="booking" className="bg-[#F4F5F7] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-[#2E323D] bg-[#18191E] p-5 shadow-2xl shadow-zinc-900/20 sm:p-8 lg:p-10">
          <div className="text-center">
            <p className="inline-flex rounded-full border border-[#FFC700]/30 bg-[#FFC700]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFC700]">
              Online Booking
            </p>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Book a service in 60 seconds
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-400">
              Pick a service and time that works for you. We’ll confirm your booking by phone.
            </p>
          </div>

          <ol
            aria-label="Booking progress"
            className="mt-8 grid grid-cols-2 gap-2 rounded-xl border border-[#2E323D] bg-[#1E2026] p-2 sm:grid-cols-4 sm:gap-3"
          >
            {STEPS.map((label, index) => {
              const active = index === step;
              const completed = index < step;
              return (
                <li
                  key={label}
                  aria-current={active ? "step" : undefined}
                  className={`flex min-h-12 items-center gap-2 rounded-lg px-2 py-2 text-xs font-bold uppercase tracking-wide transition-colors sm:justify-center sm:gap-2.5 sm:text-sm ${
                    active
                      ? "bg-[#FFC700] text-[#121316] shadow-md shadow-[#FFC700]/20"
                      : completed
                        ? "text-[#FFC700]"
                        : "text-zinc-400"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-black ${
                      active
                        ? "border-[#121316]/20 bg-[#121316]/10 text-[#121316]"
                        : completed
                          ? "border-[#FFC700]/50 bg-[#FFC700]/10 text-[#FFC700]"
                          : "border-zinc-600 bg-[#121316] text-zinc-400"
                    }`}
                  >
                    {completed ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <span>{label}</span>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 rounded-xl border border-[#2E323D] bg-[#1E2026] p-4 sm:p-6">
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setService(item)}
                    aria-pressed={service === item}
                    className={`flex min-h-16 items-center justify-between rounded-xl border p-4 text-left text-sm font-semibold transition-all duration-200 ${
                      service === item
                        ? "border-[#FFC700] bg-[#FFC700]/10 text-white"
                        : "border-[#3A3D46] bg-[#121316] text-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    {item}
                    {service === item && <Check className="h-5 w-5 text-[#FFC700]" />}
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-200">
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
                              ? "border-[#FFC700] bg-[#FFC700] text-[#121316]"
                              : "border-[#3A3D46] bg-[#121316] text-zinc-200 hover:border-[#FFC700]"
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
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-200">
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
                              ? "border-[#FFC700] bg-[#FFC700] text-[#121316]"
                              : "border-[#3A3D46] bg-[#121316] text-zinc-200 hover:border-[#FFC700]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-400">Pick a day to see available times.</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-zinc-200">
                  Full name
                  <input
                    aria-label="Full name"
                    className={field}
                    placeholder="Enter your name"
                    value={v.name}
                    onChange={(event) => setV({ ...v, name: event.target.value })}
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-zinc-200">
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
                <label className="space-y-2 text-sm font-semibold text-zinc-200">
                  Vehicle or tyre size
                  <input
                    aria-label="Vehicle or tyre size"
                    className={field}
                    placeholder="e.g. 2020 Toyota HiLux"
                    value={v.vehicle}
                    onChange={(event) => setV({ ...v, vehicle: event.target.value })}
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-zinc-200">
                  Rego <span className="font-normal text-zinc-400">(optional)</span>
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
                <CalendarCheck className="mx-auto h-14 w-14 text-green-400" />
                <h3 className="mt-4 text-3xl font-bold uppercase">Booking request received</h3>
                <p className="mt-2 text-zinc-400">
                  Reference <strong className="text-white">{ref}</strong>
                </p>
                <dl className="mx-auto mt-6 max-w-sm divide-y divide-[#3A3D46] rounded-xl border border-[#3A3D46] bg-[#121316] text-left text-sm">
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
                      <dt className="text-zinc-400">{key}</dt>
                      <dd className="text-right font-semibold text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-zinc-400">
                  We will call {v.phone} to confirm your quote.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setService("");
                    setDate("");
                    setTime("");
                  }}
                  className="mt-6 rounded-xl border border-zinc-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-[#FFC700] hover:text-[#FFC700]"
                >
                  Book another
                </button>
              </div>
            )}

            {step < 3 && (
              <div className="mt-8 flex justify-between border-t border-[#3A3D46] pt-5">
                <button
                  type="button"
                  onClick={() => setStep((currentStep) => currentStep - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-1 rounded-xl px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-zinc-300 transition-all duration-300 hover:scale-105 hover:text-white disabled:invisible"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep((currentStep) => currentStep + 1)}
                  disabled={!canNext}
                  className="flex items-center gap-2 rounded-xl bg-[#FFC700] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#121316] shadow-lg shadow-[#FFC700]/10 transition-all duration-300 hover:scale-105 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {step === 2 ? "Confirm Booking" : "Continue"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
