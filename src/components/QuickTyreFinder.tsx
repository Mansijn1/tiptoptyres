import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle, LoaderCircle, Search } from "lucide-react";
import { supabase } from "@/supabaseClient";

type TyreSize = {
  width: string | number | null;
  profile: string | number | null;
  rim: string | number | null;
};

type Tyre = TyreSize & {
  id: string | number;
  brand: string | null;
  model: string | null;
  price: number | string | null;
  in_stock: boolean | null;
};

type Vehicle = TyreSize & {
  make: string;
  model: string;
  year: string | number;
};

type RegoLookup = TyreSize & {
  rego: string;
  state: string;
  vehicle_name: string;
};

type TyreOptions = {
  widths: string[];
  profiles: string[];
  rims: string[];
};

const SIZE_PAGE_SIZE = 1000;
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const tabs = [
  { id: "size", label: "By Tyre Size" },
  { id: "vehicle", label: "By Vehicle" },
  { id: "rego", label: "By Rego" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function compareSizes(left: string, right: string) {
  const leftNumber = Number(left);
  const rightNumber = Number(right);
  if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
    return leftNumber - rightNumber;
  }
  return left.localeCompare(right);
}

function uniqueSizes(values: Array<string | number | null>) {
  return [...new Set(values.filter((value) => value !== null).map(String))].sort(compareSizes);
}

function uniqueStrings(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

async function fetchTyresForSizes(sizes: TyreSize[]): Promise<Tyre[]> {
  const distinctSizes = [
    ...new Map(
      sizes
        .filter(
          (
            size,
          ): size is { width: string | number; profile: string | number; rim: string | number } =>
            size.width !== null && size.profile !== null && size.rim !== null,
        )
        .map((size) => [`${size.width}/${size.profile}R${size.rim}`, size]),
    ).values(),
  ];

  const results = await Promise.all(
    distinctSizes.map(async ({ width, profile, rim }) => {
      const tyres: Tyre[] = [];
      for (let offset = 0; ; offset += SIZE_PAGE_SIZE) {
        const { data, error: queryError } = await supabase
          .from("tyres")
          .select("id, width, profile, rim, brand, model, price, in_stock")
          .eq("width", width)
          .eq("profile", profile)
          .eq("rim", rim)
          .order("brand")
          .order("model")
          .range(offset, offset + SIZE_PAGE_SIZE - 1)
          .returns<Tyre[]>();

        if (queryError) throw queryError;
        if (!data) throw new Error("Supabase returned no tyre results.");

        tyres.push(...data);
        if (data.length < SIZE_PAGE_SIZE) break;
      }
      return tyres;
    }),
  );

  return [...new Map(results.flat().map((tyre) => [tyre.id, tyre])).values()];
}

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
    <div
      className="tyre-finder-wheel perspective-[1000px] transform-gpu transition-transform duration-700 hover:-translate-y-1 hover:scale-[1.03]"
      role="img"
      aria-label="Rotating tyre"
    >
      <div className="tyre-finder-wheel-shadow" />
      <div className="tyre-finder-wheel-perspective">
        <img
          className="tyre-finder-wheel-image drop-shadow-2xl"
          src="/tyre.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function QuickTyreFinder() {
  const [tab, setTab] = useState<TabId>("size");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [vehiclesError, setVehiclesError] = useState<string | null>(null);
  const [tyreOptions, setTyreOptions] = useState<TyreOptions>({
    widths: [],
    profiles: [],
    rims: [],
  });
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);
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
  const [tyreResults, setTyreResults] = useState<Tyre[] | null>(null);
  const [isSearchingTyres, setIsSearchingTyres] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
  const [matchedVehicle, setMatchedVehicle] = useState<string | null>(null);
  const searchRequestId = useRef(0);

  useEffect(() => {
    let isCurrentRequest = true;

    async function fetchVehicles() {
      setIsLoadingVehicles(true);
      setVehiclesError(null);
      const vehicleRows: Vehicle[] = [];

      try {
        for (let offset = 0; ; offset += SIZE_PAGE_SIZE) {
          const { data, error: queryError } = await supabase
            .from("vehicles")
            .select("make, model, year, width, profile, rim")
            .order("make")
            .order("model")
            .order("year")
            .range(offset, offset + SIZE_PAGE_SIZE - 1)
            .returns<Vehicle[]>();

          if (queryError) throw queryError;
          if (!data) throw new Error("Supabase returned no vehicle data.");

          vehicleRows.push(...data);
          if (data.length < SIZE_PAGE_SIZE) break;
        }

        if (isCurrentRequest) setVehicles(vehicleRows);
      } catch (cause: unknown) {
        if (isCurrentRequest) {
          setVehiclesError(
            cause instanceof Error ? cause.message : "Unable to load vehicle options.",
          );
        }
      } finally {
        if (isCurrentRequest) setIsLoadingVehicles(false);
      }
    }

    void fetchVehicles();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  useEffect(() => {
    let isCurrentRequest = true;

    async function fetchTyreOptions() {
      setIsLoadingOptions(true);
      setOptionsError(null);
      const sizes: TyreSize[] = [];

      try {
        for (let offset = 0; ; offset += SIZE_PAGE_SIZE) {
          const { data, error: queryError } = await supabase
            .from("tyres")
            .select("width, profile, rim")
            .order("width")
            .order("profile")
            .order("rim")
            .range(offset, offset + SIZE_PAGE_SIZE - 1)
            .returns<TyreSize[]>();

          if (queryError) throw queryError;
          if (!data) throw new Error("Supabase returned no tyre size data.");

          sizes.push(...data);
          if (data.length < SIZE_PAGE_SIZE) break;
        }

        if (!isCurrentRequest) return;
        setTyreOptions({
          widths: uniqueSizes(sizes.map(({ width }) => width)),
          profiles: uniqueSizes(sizes.map(({ profile }) => profile)),
          rims: uniqueSizes(sizes.map(({ rim }) => rim)),
        });
      } catch (cause: unknown) {
        if (!isCurrentRequest) return;
        setOptionsError(cause instanceof Error ? cause.message : "Unable to load tyre sizes.");
      } finally {
        if (isCurrentRequest) setIsLoadingOptions(false);
      }
    }

    void fetchTyreOptions();

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  const setValue = (key: keyof typeof values) => (value: string) => {
    searchRequestId.current += 1;
    setIsSearchingTyres(false);
    setValues((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "make" ? { model: "", year: "" } : {}),
      ...(key === "model" ? { year: "" } : {}),
    }));
    setResult(null);
    setTyreResults(null);
    setError(null);
    setSearchMessage(null);
    setMatchedVehicle(null);
  };

  const makes = uniqueStrings(vehicles.map(({ make }) => make));
  const models = uniqueStrings(
    vehicles.filter(({ make }) => make === values.make).map(({ model }) => model),
  );
  const years = uniqueSizes(
    vehicles
      .filter(({ make, model }) => make === values.make && model === values.model)
      .map(({ year }) => year),
  ).sort((left, right) => Number(right) - Number(left));

  const ready =
    tab === "size"
      ? Boolean(values.width && values.profile && values.rim)
      : tab === "vehicle"
        ? Boolean(values.make && values.model && values.year)
        : values.plate.trim().length > 0;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) {
      setError(
        tab === "size"
          ? "Select a width, profile and rim size to continue."
          : tab === "vehicle"
            ? "Select your vehicle make, model and year to continue."
            : "Enter your registration plate to continue.",
      );
      return;
    }

    const query =
      tab === "size"
        ? `${values.width}/${values.profile}R${values.rim}`
        : tab === "vehicle"
          ? `${values.year} ${values.make} ${values.model}`
          : `${values.state} ${values.plate.trim().toUpperCase()}`;

    const requestId = ++searchRequestId.current;
    setError(null);
    setIsSearchingTyres(true);
    setTyreResults(null);
    setSearchMessage(null);
    setMatchedVehicle(null);

    try {
      let sizes: TyreSize[];

      if (tab === "size") {
        sizes = [{ width: values.width, profile: values.profile, rim: values.rim }];
      } else if (tab === "vehicle") {
        const matchingVehicles = vehicles.filter(
          (vehicle) =>
            vehicle.make === values.make &&
            vehicle.model === values.model &&
            String(vehicle.year) === values.year,
        );

        if (matchingVehicles.length === 0) {
          setSearchMessage(
            "We couldn’t find that vehicle. Try searching by tyre size or registration instead.",
          );
          return;
        }

        sizes = matchingVehicles;
        setMatchedVehicle(`${values.year} ${values.make} ${values.model}`);
      } else {
        const rego = values.plate.trim();
        const { data, error: queryError } = await supabase
          .from("rego_lookup")
          .select("rego, state, vehicle_name, width, profile, rim")
          .ilike("rego", rego)
          .eq("state", values.state)
          .limit(1)
          .returns<RegoLookup[]>();

        if (requestId !== searchRequestId.current) return;
        if (queryError) throw queryError;
        if (!data) throw new Error("Supabase returned no registration lookup data.");

        const match = data[0];
        if (!match) {
          setSearchMessage(
            "We couldn’t find that registration. Try searching by tyre size or vehicle instead.",
          );
          return;
        }

        sizes = [match];
        setMatchedVehicle(match.vehicle_name);
      }

      const tyres = await fetchTyresForSizes(sizes);
      if (requestId !== searchRequestId.current) return;

      setTyreResults(tyres);
      setResult(query);
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("tiptop:vehicle", { detail: query }));
    } catch (cause: unknown) {
      if (requestId === searchRequestId.current) {
        setError(cause instanceof Error ? cause.message : "Unable to search tyre inventory.");
      }
    } finally {
      if (requestId === searchRequestId.current) setIsSearchingTyres(false);
    }
  }

  return (
    <section id="quick-tyre-finder" className="tyre-finder-section">
      <div className="tyre-finder-layout grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="tyre-finder-intro lg:col-span-6">
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

        <div className="tyre-finder-panel lg:col-span-6">
          <div className="tyre-finder-panel-heading">
            <div>
              <p className="tyre-finder-kicker">TipTop Tyres &amp; Wheels</p>
              <h3>Find tyres</h3>
              <p className="tyre-finder-panel-copy">Choose how you’d like to get started.</p>
            </div>
          </div>

          <div className="tyre-finder-tabs" role="tablist" aria-label="Choose how to find tyres">
            {tabs.map(({ id, label }) => {
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
                    searchRequestId.current += 1;
                    setIsSearchingTyres(false);
                    setTab(id);
                    setResult(null);
                    setTyreResults(null);
                    setError(null);
                    setSearchMessage(null);
                    setMatchedVehicle(null);
                  }}
                  className={`tyre-finder-tab${active ? " is-active" : ""}`}
                >
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
                  options={tyreOptions.widths}
                  disabled={isLoadingOptions || Boolean(optionsError)}
                />
                <Select
                  label="Profile"
                  value={values.profile}
                  onChange={setValue("profile")}
                  options={tyreOptions.profiles}
                  disabled={isLoadingOptions || Boolean(optionsError)}
                />
                <Select
                  label="Rim"
                  value={values.rim}
                  onChange={setValue("rim")}
                  options={tyreOptions.rims}
                  disabled={isLoadingOptions || Boolean(optionsError)}
                />
              </div>
            )}

            {tab === "size" && isLoadingOptions && (
              <p className="tyre-finder-feedback" role="status" aria-live="polite">
                <LoaderCircle className="animate-spin" aria-hidden="true" />
                Loading available tyre sizes…
              </p>
            )}
            {tab === "size" && optionsError && (
              <p className="tyre-finder-feedback is-error" role="alert">
                Unable to load tyre sizes: {optionsError}
              </p>
            )}

            {tab === "vehicle" && (
              <>
                <div className="tyre-finder-fields tyre-finder-fields-vehicle">
                  <Select
                    label="Make"
                    value={values.make}
                    onChange={setValue("make")}
                    options={makes}
                    disabled={isLoadingVehicles || Boolean(vehiclesError)}
                  />
                  <Select
                    label="Model"
                    value={values.model}
                    onChange={setValue("model")}
                    options={models}
                    disabled={!values.make || isLoadingVehicles || Boolean(vehiclesError)}
                  />
                  <Select
                    label="Year"
                    value={values.year}
                    onChange={setValue("year")}
                    options={years}
                    disabled={!values.model || isLoadingVehicles || Boolean(vehiclesError)}
                  />
                </div>
                {isLoadingVehicles && (
                  <p className="tyre-finder-feedback" role="status" aria-live="polite">
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                    Loading vehicle options…
                  </p>
                )}
                {vehiclesError && (
                  <p className="tyre-finder-feedback is-error" role="alert">
                    Unable to load vehicle options: {vehiclesError}
                  </p>
                )}
              </>
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
                  Enter your plate and select its registration state to look up the vehicle and
                  matching tyres.
                </p>
              </>
            )}

            <button
              type="submit"
              className="tyre-finder-submit"
              disabled={
                isSearchingTyres ||
                (tab === "size" && (isLoadingOptions || Boolean(optionsError))) ||
                (tab === "vehicle" && (isLoadingVehicles || Boolean(vehiclesError)))
              }
            >
              {isSearchingTyres ? (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              ) : (
                <Search aria-hidden="true" />
              )}
              <span>{isSearchingTyres ? "Searching inventory" : "Find my tyres"}</span>
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

            {matchedVehicle && (
              <p className="tyre-finder-feedback is-success" role="status">
                <CheckCircle aria-hidden="true" />
                <span>Matched Vehicle: {matchedVehicle}</span>
              </p>
            )}

            {searchMessage && (
              <p className="tyre-finder-feedback" role="status">
                {searchMessage}
              </p>
            )}

            {isSearchingTyres && (
              <p className="tyre-finder-feedback" role="status" aria-live="polite">
                <LoaderCircle className="animate-spin" aria-hidden="true" />
                Searching available inventory…
              </p>
            )}
            {tyreResults !== null && tyreResults.length === 0 && (
              <p className="tyre-finder-feedback" role="status">
                No matching tyres found.
              </p>
            )}
            {tyreResults && tyreResults.length > 0 && (
              <div className="tyre-finder-results" aria-live="polite">
                <h4 className="tyre-finder-results-heading">
                  {tyreResults.length} matching {tyreResults.length === 1 ? "tyre" : "tyres"}
                </h4>
                <ul className="tyre-finder-results-list">
                  {tyreResults.map((tyre) => (
                    <li key={tyre.id} className="tyre-finder-result-card">
                      <div className="tyre-finder-result-details">
                        <p className="tyre-finder-result-name">
                          {tyre.brand ?? "Unknown brand"} {tyre.model ?? ""}
                        </p>
                        <p className="tyre-finder-result-size">
                          {tyre.width}/{tyre.profile} R{tyre.rim}
                        </p>
                      </div>
                      <div className="tyre-finder-result-meta">
                        <p className="tyre-finder-result-price">
                          {tyre.price === null
                            ? "Price unavailable"
                            : new Intl.NumberFormat("en-AU", {
                                style: "currency",
                                currency: "AUD",
                              }).format(Number(tyre.price))}
                        </p>
                        <span
                          className={`tyre-finder-stock-badge${tyre.in_stock ? " is-in-stock" : " is-out-of-stock"}`}
                        >
                          {tyre.in_stock ? "In stock" : "Out of stock"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>

          <p className="tyre-finder-disclaimer">
            Search live inventory by tyre size. Stock may change; our team will confirm availability
            and fitment when you book.
          </p>
        </div>
      </div>
    </section>
  );
}
