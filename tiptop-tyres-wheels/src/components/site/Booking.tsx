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
    for (let h = o; h < c; h += 1) s.push(`${h % 12 === 0 ? 12 : h % 12}:00 ${h >= 12 ? "PM" : "AM"}`);
    return s;
  }, [selectedDay]);

  const canNext = step === 0 ? !!service : step === 1 ? !!date && !!time : v.name.trim() && v.phone.trim().length >= 8 && v.vehicle.trim();
  const ref = useMemo(() => "TT-" + Math.random().toString(36).slice(2, 7).toUpperCase(), [step === 3]);

  const field = "h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <section id="booking" className="bg-secondary py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">Online booking</p>
        <h2 className="mt-2 text-4xl font-bold uppercase sm:text-5xl">Book a service in 60 seconds</h2>

        <ol className="mt-8 grid grid-cols-4 gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className={`border-t-4 pt-2 text-xs font-bold uppercase tracking-wider sm:text-sm ${i <= step ? "border-primary text-foreground" : "border-border text-muted-foreground"}`}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-lg border border-border bg-card p-5 sm:p-8">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <button key={s} onClick={() => setService(s)} className={`flex items-center justify-between rounded-md border-2 p-4 text-left font-semibold transition-colors ${service === s ? "border-primary bg-primary/10" : "border-border hover:border-foreground"}`}>
                  {s} {service === s && <Check className="h-5 w-5" />}
                </button>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => {
                  const k = d.toDateString();
                  return (
                    <button key={k} onClick={() => { setDate(k); setTime(""); }} className={`min-w-[72px] rounded-md border-2 px-3 py-3 text-center ${date === k ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>
                      <span className="block text-xs font-semibold uppercase">{d.toLocaleDateString("en-AU", { weekday: "short" })}</span>
                      <span className="block font-display text-2xl font-bold">{d.getDate()}</span>
                      <span className="block text-xs">{d.toLocaleDateString("en-AU", { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>
              {selectedDay ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {slots.map((t) => (
                    <button key={t} onClick={() => setTime(t)} className={`rounded-md border-2 py-3 text-sm font-semibold ${time === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{t}</button>
                  ))}
                </div>
              ) : <p className="text-sm text-muted-foreground">Pick a day to see available times.</p>}
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} placeholder="Full name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />
              <input className={field} placeholder="Mobile number" inputMode="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />
              <input className={field} placeholder="Vehicle or tyre size (e.g. 2020 Toyota HiLux)" value={v.vehicle} onChange={(e) => setV({ ...v, vehicle: e.target.value })} />
              <input className={`${field} uppercase`} placeholder="Rego (optional)" value={v.rego} onChange={(e) => setV({ ...v, rego: e.target.value })} />
            </div>
          )}
          {step === 3 && (
            <div className="text-center">
              <CalendarCheck className="mx-auto h-14 w-14 text-success" />
              <h3 className="mt-4 text-3xl font-bold uppercase">Booking request received</h3>
              <p className="mt-2 text-muted-foreground">Reference <strong className="text-foreground">{ref}</strong></p>
              <dl className="mx-auto mt-6 max-w-sm divide-y divide-border rounded-md border border-border text-left text-sm">
                {[["Service", service], ["When", `${selectedDay?.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })}, ${time}`], ["Vehicle", v.vehicle], ["Name", v.name]].map(([k, val]) => (
                  <div key={k} className="flex justify-between gap-4 p-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold">{val}</dd></div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted-foreground">We will call {v.phone} to confirm your quote.</p>
              <button onClick={() => { setStep(0); setService(""); setDate(""); setTime(""); }} className="mt-6 rounded-md border-2 border-foreground px-5 py-2 text-sm font-bold uppercase">Book another</button>
            </div>
          )}

          {step < 3 && (
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="flex items-center gap-1 rounded-md px-4 py-3 text-sm font-bold uppercase disabled:invisible"><ChevronLeft className="h-4 w-4" /> Back</button>
              <button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="flex items-center gap-1 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase text-primary-foreground hover:bg-accent disabled:opacity-40">
                {step === 2 ? "Confirm Booking" : "Continue"} <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
