import { useMemo } from "react";
import { Sheet, TextInput } from "./shell";
import {
  fuelOptionsByCategory,
  makesForCategory,
  modelsFor,
  ownershipOptions,
  popularCities,
  transmissionOptionsByCategory,
} from "../data/catalogue";
import { displacementPresets, kmPresets, pricePresets, countActiveFilters } from "../data/search";
import type { Category, FuelType, OwnershipCount, SearchFilters, Transmission } from "../data/types";

const categories: (Category | "All")[] = ["All", "Cars", "Bikes", "Scooters", "Commercial", "Bicycles & Kids"];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: SearchFilters;
  onChange: (patch: Partial<SearchFilters>) => void;
  onReset: () => void;
  resultCount: number;
};

export default function SearchDrawer({ open, onOpenChange, filters, onChange, onReset, resultCount }: Props) {
  const activeCategory = filters.category === "All" ? "Cars" : filters.category;
  const makes = useMemo(() => makesForCategory(activeCategory), [activeCategory]);
  const models = useMemo(
    () => (filters.make ? modelsFor(activeCategory, filters.make) : []),
    [activeCategory, filters.make],
  );
  const fuels = fuelOptionsByCategory[activeCategory];
  const transmissions = transmissionOptionsByCategory[activeCategory];
  const activeCount = countActiveFilters(filters);

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Filters"
      description={`${activeCount} active · ${resultCount} matching`}
      size="tall"
    >
      <div className="filter-drawer">
        <label className="form-label">
          Keyword
          <TextInput
            value={filters.keyword}
            onChange={(event) => onChange({ keyword: event.target.value })}
            placeholder="Model, variant, city…"
          />
        </label>

        <FilterGroup label="Category">
          <div className="pill-grid">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={filters.category === item ? "selected" : ""}
                onClick={() => onChange({ category: item, make: "", model: "" })}
              >
                {item}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Brand">
          <div className="pill-grid scroll-group">
            {makes.map((make) => (
              <button
                type="button"
                key={make}
                className={filters.make === make ? "selected" : ""}
                onClick={() => onChange({ make: filters.make === make ? "" : make, model: "" })}
              >
                {make}
              </button>
            ))}
          </div>
        </FilterGroup>

        {filters.make && models.length > 0 && (
          <FilterGroup label="Model">
            <div className="pill-grid scroll-group">
              {models.map((entry) => (
                <button
                  type="button"
                  key={entry.model}
                  className={filters.model === entry.model ? "selected" : ""}
                  onClick={() => onChange({ model: filters.model === entry.model ? "" : entry.model })}
                >
                  {entry.model}
                </button>
              ))}
            </div>
          </FilterGroup>
        )}

        <FilterGroup label="Price">
          <div className="pill-grid">
            {pricePresets.map((preset) => {
              const active = filters.priceMin === preset.min && filters.priceMax === preset.max;
              return (
                <button
                  type="button"
                  key={preset.label}
                  className={active ? "selected" : ""}
                  onClick={() =>
                    onChange(active ? { priceMin: null, priceMax: null } : { priceMin: preset.min, priceMax: preset.max })
                  }
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup label="Engine / battery">
          <div className="pill-grid">
            {displacementPresets.map((preset) => {
              const active = filters.displacementMin === preset.min && filters.displacementMax === preset.max;
              return (
                <button
                  type="button"
                  key={preset.label}
                  className={active ? "selected" : ""}
                  onClick={() =>
                    onChange(
                      active
                        ? { displacementMin: null, displacementMax: null }
                        : { displacementMin: preset.min, displacementMax: preset.max },
                    )
                  }
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup label="Fuel">
          <div className="pill-grid">
            {fuels.map((fuel: FuelType) => (
              <button
                type="button"
                key={fuel}
                className={filters.fuelTypes.includes(fuel) ? "selected" : ""}
                onClick={() => onChange({ fuelTypes: toggle(filters.fuelTypes, fuel) })}
              >
                {fuel}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Transmission">
          <div className="pill-grid">
            {transmissions.map((item: Transmission) => (
              <button
                type="button"
                key={item}
                className={filters.transmissions.includes(item) ? "selected" : ""}
                onClick={() => onChange({ transmissions: toggle(filters.transmissions, item) })}
              >
                {item}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Year">
          <div className="range-row">
            <TextInput
              inputMode="numeric"
              placeholder="From"
              value={filters.yearMin ?? ""}
              onChange={(event) => onChange({ yearMin: toNumber(event.target.value) })}
            />
            <span>to</span>
            <TextInput
              inputMode="numeric"
              placeholder="To"
              value={filters.yearMax ?? ""}
              onChange={(event) => onChange({ yearMax: toNumber(event.target.value) })}
            />
          </div>
        </FilterGroup>

        <FilterGroup label="Odometer">
          <div className="pill-grid">
            {kmPresets.map((preset) => (
              <button
                type="button"
                key={preset.label}
                className={filters.kmMax === preset.value ? "selected" : ""}
                onClick={() => onChange({ kmMax: filters.kmMax === preset.value ? null : preset.value })}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Ownership">
          <div className="pill-grid">
            {ownershipOptions.map((item: OwnershipCount) => (
              <button
                type="button"
                key={item}
                className={filters.ownership.includes(item) ? "selected" : ""}
                onClick={() => onChange({ ownership: toggle(filters.ownership, item) })}
              >
                {item}
              </button>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Location">
          <div className="pill-grid">
            {popularCities.slice(0, 8).map((city) => (
              <button
                type="button"
                key={city}
                className={filters.location === city ? "selected" : ""}
                onClick={() => onChange({ location: filters.location === city ? "" : city })}
              >
                {city}
              </button>
            ))}
          </div>
        </FilterGroup>

        <button
          type="button"
          className={filters.checkedOnly ? "toggle-row on" : "toggle-row"}
          onClick={() => onChange({ checkedOnly: !filters.checkedOnly })}
        >
          <span>
            <b>Motora Checked only</b>
            <small>Inspection-backed listings with a verification report</small>
          </span>
          <i />
        </button>
      </div>

      <div className="drawer-actions">
        <button type="button" onClick={onReset}>
          Reset all
        </button>
        <button type="button" className="primary" onClick={() => onOpenChange(false)}>
          Show {resultCount} {resultCount === 1 ? "vehicle" : "vehicles"}
        </button>
      </div>
    </Sheet>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="filter-group">
      <h3>{label}</h3>
      {children}
    </section>
  );
}

function toNumber(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : null;
}
