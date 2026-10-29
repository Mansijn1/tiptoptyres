import { useState, type FormEvent } from "react";
import { Car, CheckCircle, Disc, Search } from "lucide-react";

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
    <label className="tyre-finder-field">
      <span className="tyre-finder-label">{label}</span>
      <select
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="tyre-finder-control"
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
    <div className="tyre-finder-wheel" role="img" aria-label="Rotating alloy wheel and tyre">
      <div className="tyre-finder-wheel-shadow" />
      <div className="tyre-finder-wheel-perspective">
        <img className="tyre-finder-wheel-image" src="/alloy-wheel.svg" alt="" aria-hidden="true" />
      </div>
    </div>
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
  const [error, setError] = useState<string | null>(null);

  const setValue = (key: keyof typeof values) => (value: string) => {
    setValues((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "make" ? { model: "" } : {}),
    }));
    setResult(null);
    setError(null);
  };

  const ready =
    tab === "size"
      ? Boolean(values.width && values.profile && values.rim)
      : tab === "vehicle"
        ? Boolean(values.make && values.model && values.year)
        : values.plate.trim().length >= 2;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) {
      setError(
        tab === "size"
          ? "Select a width, profile and rim size to continue."
          : tab === "vehicle"
            ? "Select your vehicle make, model and year to continue."
            : "Enter a registration plate with at least two characters.",
      );
      return;
    }

    const query =
      tab === "size"
        ? `${values.width}/${values.profile}R${values.rim}`
        : tab === "vehicle"
          ? `${values.year} ${values.make} ${values.model}`
          : `${values.state} ${values.plate.trim().toUpperCase()}`;

    setError(null);
    setResult(query);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("tiptop:vehicle", { detail: query }));
  }

  return (
    <section id="quick-tyre-finder" className="tyre-finder-section">
      <div className="tyre-finder-layout">
        <div className="tyre-finder-intro">
          <p className="tyre-finder-eyebrow">
            <span aria-hidden="true" />
            Find your perfect fit
          </p>
          <h2 className="tyre-finder-heading">
            The right tyres.
            <br />
            <span>For every road.</span>
          </h2>
          <p className="tyre-finder-copy">
            Tell us what you drive and our Mount Druitt team will help find the right fit.
          </p>
          <TyreWheelVisual />
          <p className="tyre-finder-caption">Built for the road ahead</p>
        </div>

        <div className="tyre-finder-panel">
          <div className="tyre-finder-panel-heading">
            <div>
              <p className="tyre-finder-kicker">TipTop Tyres &amp; Wheels</p>
              <h3>Find tyres</h3>
              <p className="tyre-finder-panel-copy">Choose how you’d like to get started.</p>
            </div>
            <Disc className="tyre-finder-heading-icon" aria-hidden="true" />
          </div>

          <div className="tyre-finder-tabs" role="tablist" aria-label="Choose how to find tyres">
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  id={`tyre-finder-tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="tyre-finder-tab-panel"
                  onClick={() => {
                    setTab(id);
                    setResult(null);
                    setError(null);
                  }}
                  className={`tyre-finder-tab${active ? " is-active" : ""}`}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <form
            id="tyre-finder-tab-panel"
            role="tabpanel"
            aria-labelledby={`tyre-finder-tab-${tab}`}
            onSubmit={submit}
            className="tyre-finder-form"
          >
            {tab === "size" && (
              <div className="tyre-finder-fields tyre-finder-fields-size">
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
              <div className="tyre-finder-fields tyre-finder-fields-vehicle">
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
              <>
                <div className="tyre-finder-fields tyre-finder-fields-rego">
                  <Select
                    label="State or territory"
                    value={values.state}
                    onChange={setValue("state")}
                    options={STATES}
                  />
                  <label className="tyre-finder-field">
                    <span className="tyre-finder-label">Registration plate</span>
                    <input
                      value={values.plate}
                      onChange={(event) => setValue("plate")(event.target.value)}
                      maxLength={9}
                      autoComplete="off"
                      placeholder="ABC 123"
                      className="tyre-finder-control tyre-finder-plate"
                    />
                  </label>
                </div>
                <p className="tyre-finder-note">
                  Registration lookup isn’t available online yet. We’ll confirm fitment with you.
                </p>
              </>
            )}

            <button type="submit" className="tyre-finder-submit">
              <Search aria-hidden="true" />
              <span>Find my tyres</span>
            </button>

            {error && (
              <p className="tyre-finder-feedback is-error" role="alert">
                {error}
              </p>
            )}
            {result && (
              <p className="tyre-finder-feedback is-success" role="status">
                <CheckCircle aria-hidden="true" />
                <span>
                  Your selection ({result}) has been added to the booking enquiry below. Our team
                  will confirm tyre fitment with you.
                </span>
              </p>
            )}
          </form>

          <p className="tyre-finder-disclaimer">
            Fitment and availability are confirmed by our team. No live inventory lookup.
          </p>
        </div>
      </div>
    </section>
  );
}
