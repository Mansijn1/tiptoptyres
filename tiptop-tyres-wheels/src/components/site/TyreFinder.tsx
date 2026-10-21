import { useState } from "react";
import { Search, Ruler, Car, IdCard } from "lucide-react";

const WIDTHS = ["155", "165", "175", "185", "195", "205", "215", "225", "235", "245", "255", "265", "275", "285"];
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
const YEARS = Array.from({ length: 20 }, (_, i) => String(2026 - i));
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const tabs = [
  { id: "size", label: "Tyre Size", icon: Ruler },
  { id: "vehicle", label: "Vehicle", icon: Car },
  { id: "rego", label: "Rego", icon: IdCard },
] as const;

function Select({ label, value, onChange, options, disabled }: { label: string; value: string; onChange: (v: string) => void; options: string[]; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select disabled={disabled} value={value} onChange={(e) => onChange(e.target.value)} className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50">
        <option value="">Select</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function TyreFinder() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("size");
  const [s, setS] = useState({ width: "", profile: "", rim: "", make: "", model: "", year: "", state: "NSW", plate: "" });
  const [result, setResult] = useState<string | null>(null);
  const set = (k: keyof typeof s) => (v: string) => setS((p) => ({ ...p, [k]: v, ...(k === "make" ? { model: "" } : {}) }));

  const ready =
    tab === "size" ? s.width && s.profile && s.rim : tab === "vehicle" ? s.make && s.model && s.year : s.plate.trim().length >= 2;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = tab === "size" ? `${s.width}/${s.profile}R${s.rim}` : tab === "vehicle" ? `${s.year} ${s.make} ${s.model}` : `${s.state} ${s.plate.toUpperCase()}`;
    setResult(q);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("tiptop:vehicle", { detail: q }));
  }

  return (
    <div id="finder" className="overflow-hidden rounded-lg bg-card text-card-foreground shadow-2xl">
      <div className="grid grid-cols-3 bg-graphite">
        {tabs.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider sm:text-sm ${tab === t.id ? "bg-card text-foreground" : "text-ink-muted hover:text-primary"}`}>
            <t.icon className="h-4 w-4" /> <span><span className="hidden sm:inline">By </span>{t.label}</span>
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-4 p-5 sm:p-6">
        {tab === "size" && (
          <div className="grid grid-cols-3 gap-3">
            <Select label="Width" value={s.width} onChange={set("width")} options={WIDTHS} />
            <Select label="Profile" value={s.profile} onChange={set("profile")} options={PROFILES} />
            <Select label="Rim" value={s.rim} onChange={set("rim")} options={RIMS} />
          </div>
        )}
        {tab === "vehicle" && (
          <div className="grid grid-cols-3 gap-3">
            <Select label="Make" value={s.make} onChange={set("make")} options={Object.keys(MAKES)} />
            <Select label="Model" value={s.model} onChange={set("model")} options={MAKES[s.make] ?? []} disabled={!s.make} />
            <Select label="Year" value={s.year} onChange={set("year")} options={YEARS} />
          </div>
        )}
        {tab === "rego" && (
          <div className="grid grid-cols-[110px_1fr] gap-3">
            <Select label="State" value={s.state} onChange={set("state")} options={STATES} />
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Plate number</span>
              <input value={s.plate} onChange={(e) => set("plate")(e.target.value)} maxLength={9} placeholder="ABC12D" className="h-12 w-full rounded-md border-2 border-foreground bg-background px-3 font-display text-lg uppercase tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
          </div>
        )}
        <button disabled={!ready} className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary font-bold uppercase tracking-wider text-primary-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50">
          <Search className="h-5 w-5" /> Find My Tyres
        </button>
        {result && <p className="text-sm text-muted-foreground">Got it: <strong className="text-foreground">{result}</strong>. Book a fitting below and we will have the right tyres ready.</p>}
      </form>
    </div>
  );
}
