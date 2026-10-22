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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
        {label}
      </span>
      <select
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-md border border-[#2E323D] bg-[#121316] px-3 text-sm font-medium text-white focus:border-[#FFC700] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700] disabled:cursor-not-allowed disabled:opacity-50"
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
      className="relative z-20 -mt-16 bg-[#121316] pb-14 pt-8 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-[#2E323D] bg-[#1E2026] shadow-2xl shadow-black/30">
          <div className="border-b border-[#2E323D] px-5 py-5 sm:px-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFC700]">
              Quick Tyre Finder
            </p>
            <h2 className="mt-1 text-2xl font-bold uppercase sm:text-3xl">
              Find the right tyres for your drive
            </h2>
          </div>

          <div
            className="grid grid-cols-3 gap-2 border-b border-[#2E323D] bg-[#121316] p-2"
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
                  className={`flex min-h-14 items-center justify-center gap-2 px-2 py-3 text-xs font-bold tracking-wide transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FFC700] sm:text-sm ${
                    active
                      ? "rounded-md bg-[#FFC700] text-[#121316]"
                      : "rounded-md bg-[#1E2026] text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="space-y-5 p-5 sm:p-7">
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
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    License plate
                  </span>
                  <input
                    aria-label="License plate"
                    value={values.plate}
                    onChange={(event) => setValue("plate")(event.target.value)}
                    maxLength={9}
                    autoComplete="off"
                    placeholder="ABC 123"
                    className="h-12 w-full rounded-md border border-[#2E323D] bg-[#121316] px-3 font-display text-lg uppercase tracking-[0.2em] text-white placeholder:text-zinc-500 focus:border-[#FFC700] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC700]"
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={!ready}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FFC700] px-5 py-4 text-lg font-bold uppercase tracking-wider text-[#121316] transition-colors hover:bg-[#ffda4d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
              Find My Tyres
            </button>

            {result && (
              <p role="status" className="text-sm text-zinc-300">
                Got it: <strong className="text-white">{result}</strong>. Book a fitting below and
                we will have the right tyres ready.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
