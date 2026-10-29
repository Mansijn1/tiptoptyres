import { useState, type FormEvent } from "react";
import { Car, CheckCircle, Disc, Search, SlidersHorizontal } from "lucide-react";

const WIDTHS = [
  "155",
  "165",
  "175",
  "185",
  "195",
  "205",
  "215",
  "225",
  "235",
  "245",
  "255",
  "265",
  "275",
  "285",
];
const PROFILES = ["30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80"];
const RIMS = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
const MAKES: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "HiLux", "LandCruiser", "Prado"],
  Ford: ["Ranger", "Everest", "Focus", "Mustang"],
  Mazda: ["Mazda3", "CX-5", "CX-3", "BT-50"],
  Hyundai: ["i30", "Tucson", "Santa Fe", "Kona"],
  Mitsubishi: ["Triton", "Outlander", "ASX", "Pajero Sport"],
  Nissan: ["Navara", "X-Trail", "Patrol", "Qashqai"],
  Kia: ["Cerato", "Sportage", "Sorento", "Carnival"],
};
const YEARS = Array.from({ length: 20 }, (_, index) => String(2026 - index));
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const tabs = [
  { id: "size", label: "By Tyre Size", icon: Disc },
  { id: "vehicle", label: "By Vehicle", icon: Car },
  { id: "rego", label: "By Rego", icon: CheckCircle },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Select({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <select
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#0b111b]/90 px-4 py-3.5 text-sm font-medium text-white transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TyreWheelVisual() {
  return (
    <svg
      className="scanner-wheel relative z-10 h-[82%] w-[82%] overflow-visible"
      viewBox="0 0 300 300"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="tire-rubber" cx="38%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#3b4148" />
          <stop offset="38%" stopColor="#15191e" />
          <stop offset="78%" stopColor="#050709" />
          <stop offset="100%" stopColor="#252b31" />
        </radialGradient>
        <linearGradient id="alloy-face" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="24%" stopColor="#94a3b8" />
          <stop offset="48%" stopColor="#e2e8f0" />
          <stop offset="72%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <radialGradient id="alloy-center" cx="32%" cy="26%" r="80%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="58%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#080d15" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="143" fill="#020304" />
      <circle cx="150" cy="150" r="135" fill="url(#tire-rubber)" stroke="#56606a" strokeWidth="2" />
      <circle
        cx="150"
        cy="150"
        r="130"
        fill="none"
        stroke="#737b82"
        strokeDasharray="4 5"
        strokeWidth="7"
        opacity=".58"
      />
      <circle cx="150" cy="150" r="118" fill="none" stroke="#080b0f" strokeWidth="8" />
      <circle cx="150" cy="150" r="111" fill="#090d12" stroke="#4b5560" strokeWidth="3" />
      <circle cx="150" cy="150" r="103" fill="url(#alloy-face)" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="150" cy="150" r="94" fill="url(#alloy-center)" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, index) => (
        <g key={index} transform={`rotate(${index * 36} 150 150)`}>
          <path
            d="M143 145 137 74Q150 64 163 74L157 145Z"
            fill="url(#alloy-face)"
            stroke="#f8fafc"
            strokeOpacity=".65"
            strokeWidth="2"
          />
          <path d="M150 76 150 132" stroke="#475569" strokeOpacity=".7" strokeWidth="2" />
          <circle cx="150" cy="103" r="3" fill="#f8fafc" opacity=".8" />
        </g>
      ))}
      <circle cx="150" cy="150" r="48" fill="#0b111b" stroke="#cbd5e1" strokeWidth="5" />
      <circle cx="150" cy="150" r="39" fill="url(#alloy-center)" stroke="#64748b" strokeWidth="2" />
      {Array.from({ length: 8 }, (_, index) => (
        <circle
          key={index}
          cx="150"
          cy="150"
          r="3"
          fill="#facc15"
          transform={`rotate(${index * 45} 150 150) translate(0 -32)`}
        />
      ))}
      <circle
        cx="150"
        cy="150"
        r="18"
        fill="#111827"
        stroke="#f8fafc"
        strokeOpacity=".65"
        strokeWidth="2"
      />
      <circle cx="150" cy="150" r="7" fill="#facc15" />
    </svg>
  );
}

export function QuickTyreFinder() {
  const [tab, setTab] = useState<TabId>("size");
  const [values, setValues] = useState({
    width: "",
    profile: "",
    rim: "",
    make: "",
    model: "",
    year: "",
    state: "NSW",
    plate: "",
  });
  const [result, setResult] = useState<string | null>(null);

  const setValue = (key: keyof typeof values) => (value: string) => {
    setValues((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "make" ? { model: "" } : {}),
    }));
    setResult(null);
  };

  const ready =
    tab === "size"
      ? Boolean(values.width && values.profile && values.rim)
      : tab === "vehicle"
        ? Boolean(values.make && values.model && values.year)
        : values.plate.trim().length >= 2;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;

    const query =
      tab === "size"
        ? `${values.width}/${values.profile}R${values.rim}`
        : tab === "vehicle"
          ? `${values.year} ${values.make} ${values.model}`
          : `${values.state} ${values.plate.trim().toUpperCase()}`;

    setResult(query);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("tiptop:vehicle", { detail: query }));
  }

  return (
    <section
      id="quick-tyre-finder"
      className="relative z-20 -mt-12 overflow-hidden bg-[#080d15] px-4 pb-16 pt-8 text-white sm:px-6"
    >
      <div className="relative z-20 mx-auto max-w-7xl overflow-hidden rounded-3xl border border-sky-300/20 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.12),_transparent_44%),linear-gradient(135deg,_#141c29,_#090d14_70%)] shadow-[0_24px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative flex min-h-[350px] flex-col justify-between overflow-hidden border-b border-white/10 p-6 sm:p-9 lg:min-h-[590px] lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.045)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="relative z-10">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-sky-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300 shadow-[0_0_12px_#38bdf8]" />
                Quick Tyre Finder / 01
              </p>
              <h2 className="mt-4 max-w-sm font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                Find the right tyres for your drive
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
                Precision-fit recommendations, scanned to your vehicle.
              </p>
            </div>

            <div
              className="relative mx-auto my-2 flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-[320px]"
              role="img"
              aria-label="Continuously rotating alloy wheel and tyre under a laser tread scan"
            >
              <div className="scanner-hud-ring absolute inset-[3%] rounded-full border border-amber-300/50 shadow-[0_0_24px_rgba(250,204,21,0.15)]" />
              <div className="scanner-hud-ring scanner-hud-ring-inner absolute inset-[10%] rounded-full border border-dashed border-yellow-300/45" />
              <div className="absolute inset-[1%] rounded-full border border-amber-200/15" />
              <TyreWheelVisual />
              <div className="scanner-laser absolute inset-x-[10%] top-0 z-20 h-[2px] bg-cyan-100 shadow-[0_0_8px_2px_#22d3ee,0_0_24px_5px_rgba(14,165,233,0.65)]" />
              <div className="absolute bottom-[9%] left-[12%] h-px w-[76%] bg-gradient-to-r from-transparent via-sky-300/70 to-transparent shadow-[0_0_12px_#38bdf8]" />
              <span className="absolute left-[3%] top-1/2 text-[9px] font-mono tracking-widest text-sky-200/70">
                TREAD SCAN
              </span>
              <span className="absolute bottom-[13%] right-[4%] text-[9px] font-mono tracking-widest text-sky-200/70">
                360° / ACTIVE
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">
              <span>Optical scan system</span>
              <span className="text-sky-300">System ready</span>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Search configuration
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-100">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                  Configure your vehicle
                </p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-sky-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
                  Live tyre matches
                </p>
                <p className="mt-1 font-mono text-xl font-bold tracking-wider text-white drop-shadow-[0_0_10px_rgba(250,204,21,0.45)] sm:text-2xl">
                  154,321
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div
                key={tab}
                className="scanner-gauge relative h-12 w-12 shrink-0 rounded-full border border-amber-300/50 bg-[conic-gradient(from_0deg,rgba(250,204,21,0.9),rgba(250,204,21,0.08)_75%,rgba(250,204,21,0.9))] p-[2px] shadow-[0_0_18px_rgba(250,204,21,0.2)]"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full border border-amber-100/20 bg-[#0b111b]">
                  <Disc className="h-5 w-5 text-amber-200" aria-hidden="true" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                  Holographic fit analysis
                </p>
                <p className="mt-1 text-xs text-slate-500">Choose a search method to begin</p>
              </div>
              <span className="ml-auto hidden font-mono text-[10px] text-sky-300/70 sm:inline">
                SCAN_0{tabs.findIndex(({ id }) => id === tab) + 1}
              </span>
            </div>

            <div
              className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/25 p-1.5"
              role="group"
              aria-label="Choose how to find tyres"
            >
              {tabs.map(({ id, label, icon: Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setTab(id);
                      setResult(null);
                    }}
                    className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2 text-[9px] font-bold uppercase tracking-wide transition-all duration-300 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 sm:flex-row sm:gap-2 sm:px-2 sm:text-[11px] ${
                      active
                        ? "border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-[inset_0_0_18px_rgba(250,204,21,0.1),0_0_14px_rgba(250,204,21,0.2)]"
                        : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={submit} className="space-y-5 pt-6">
              {tab === "size" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Select
                    label="Width"
                    value={values.width}
                    onChange={setValue("width")}
                    options={WIDTHS}
                  />
                  <Select
                    label="Profile"
                    value={values.profile}
                    onChange={setValue("profile")}
                    options={PROFILES}
                  />
                  <Select
                    label="Rim"
                    value={values.rim}
                    onChange={setValue("rim")}
                    options={RIMS}
                  />
                </div>
              )}

              {tab === "vehicle" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Select
                    label="Make"
                    value={values.make}
                    onChange={setValue("make")}
                    options={Object.keys(MAKES)}
                  />
                  <Select
                    label="Model"
                    value={values.model}
                    onChange={setValue("model")}
                    options={MAKES[values.make] ?? []}
                    disabled={!values.make}
                  />
                  <Select
                    label="Year"
                    value={values.year}
                    onChange={setValue("year")}
                    options={YEARS}
                  />
                </div>
              )}

              {tab === "rego" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
                  <Select
                    label="State"
                    value={values.state}
                    onChange={setValue("state")}
                    options={STATES}
                  />
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                      License plate
                    </span>
                    <input
                      aria-label="License plate"
                      value={values.plate}
                      onChange={(event) => setValue("plate")(event.target.value)}
                      maxLength={9}
                      autoComplete="off"
                      placeholder="ABC 123"
                      className="w-full rounded-xl border border-white/10 bg-[#0b111b]/90 px-4 py-3.5 font-display text-lg uppercase tracking-[0.2em] text-white placeholder:text-slate-600 transition-colors focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={!ready}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 bg-[length:200%_100%] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-right hover:shadow-[0_0_34px_rgba(250,204,21,0.42)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
              >
                <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_12px,rgba(120,72,0,0.12)_12px_15px)] opacity-80" />
                <Search className="relative z-10 h-5 w-5" aria-hidden="true" />
                <span className="relative z-10">Find My Tyres</span>
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/3 -skew-x-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[120%]" />
              </button>

              {result && (
                <p role="status" className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>
                    Got it: <strong className="text-white">{result}</strong>. Book a fitting below
                    and we will have the right tyres ready.
                  </span>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
