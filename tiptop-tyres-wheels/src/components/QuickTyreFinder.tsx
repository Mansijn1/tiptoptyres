import { useState, type FormEvent } from "react";
import { Car, IdCard, Ruler, Search } from "lucide-react";

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
  { id: "size", label: "BY TYRE SIZE", icon: Ruler },
  { id: "vehicle", label: "BY VEHICLE", icon: Car },
  { id: "rego", label: "BY REGO", icon: IdCard },
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
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700">
        {label}
      </span>
      <select
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border-2 border-zinc-300 bg-white px-4 py-3.5 text-sm font-medium text-zinc-900 focus:border-[#FFC700] focus:outline-none focus:ring-1 focus:ring-[#FFC700] disabled:cursor-not-allowed disabled:opacity-50"
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
      className="relative z-20 -mt-12 bg-[#F4F5F7] px-4 pb-14 pt-8 text-[#121316] sm:px-6"
    >
      <div className="relative z-20 mx-auto max-w-5xl rounded-2xl border border-zinc-200 border-t-4 border-t-[#FFC700] bg-white p-6 shadow-2xl sm:p-8">
        <div className="border-b border-zinc-200 pb-5">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
            Quick Tyre Finder
          </p>
          <h2 className="mt-1 text-2xl font-bold uppercase text-[#121316] sm:text-3xl">
            Find the right tyres for your drive
          </h2>
        </div>

        <div
          className="mt-5 grid grid-cols-3 gap-2"
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
                className={`flex min-h-14 items-center justify-center gap-2 rounded-xl border px-2 py-3 text-xs tracking-wide transition-all focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFC700] sm:text-sm ${
                  active
                    ? "border-[#FFC700] bg-[#FFC700] font-extrabold text-black shadow-md shadow-[#FFC700]/20"
                    : "border-zinc-200 bg-zinc-100 font-bold text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={submit} className="space-y-5 pt-5">
          {tab === "size" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
              <Select label="Rim" value={values.rim} onChange={setValue("rim")} options={RIMS} />
            </div>
          )}

          {tab === "vehicle" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[160px_1fr]">
              <Select
                label="State"
                value={values.state}
                onChange={setValue("state")}
                options={STATES}
              />
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  License plate
                </span>
                <input
                  aria-label="License plate"
                  value={values.plate}
                  onChange={(event) => setValue("plate")(event.target.value)}
                  maxLength={9}
                  autoComplete="off"
                  placeholder="ABC 123"
                  className="w-full rounded-xl border-2 border-zinc-300 bg-white px-4 py-3.5 font-display text-lg uppercase tracking-[0.2em] text-zinc-900 placeholder:text-zinc-500 focus:border-[#FFC700] focus:outline-none focus:ring-1 focus:ring-[#FFC700]"
                />
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={!ready}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC700] px-8 py-4 text-base font-black uppercase tracking-wider text-black shadow-xl transition-all duration-300 hover:scale-[1.01] hover:bg-[#e6b300] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            Find My Tyres
          </button>

          {result && (
            <p role="status" className="text-sm text-zinc-600">
              Got it: <strong className="text-zinc-950">{result}</strong>. Book a fitting below and
              we will have the right tyres ready.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
