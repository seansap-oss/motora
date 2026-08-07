import type { Listing, SearchFilters, SortKey } from "./types";

export const emptyFilters: SearchFilters = {
  keyword: "",
  category: "All",
  make: "",
  model: "",
  fuelTypes: [],
  transmissions: [],
  ownership: [],
  priceMin: null,
  priceMax: null,
  yearMin: null,
  yearMax: null,
  kmMax: null,
  displacementMin: null,
  displacementMax: null,
  checkedOnly: false,
  location: "",
};

export function countActiveFilters(filters: SearchFilters) {
  let n = 0;
  if (filters.category !== "All") n++;
  if (filters.make) n++;
  if (filters.model) n++;
  n += filters.fuelTypes.length;
  n += filters.transmissions.length;
  n += filters.ownership.length;
  if (filters.priceMin !== null || filters.priceMax !== null) n++;
  if (filters.yearMin !== null || filters.yearMax !== null) n++;
  if (filters.kmMax !== null) n++;
  if (filters.displacementMin !== null || filters.displacementMax !== null) n++;
  if (filters.checkedOnly) n++;
  if (filters.location) n++;
  return n;
}

function kmOf(listing: Listing) {
  if (typeof listing.kmValue === "number") return listing.kmValue;
  return Number(listing.km.replace(/[^0-9]/g, "")) || 0;
}

export function applyFilters(listings: Listing[], filters: SearchFilters): Listing[] {
  const keyword = filters.keyword.trim().toLowerCase();
  const terms = keyword ? keyword.split(/\s+/) : [];

  return listings.filter((item) => {
    if (terms.length) {
      const haystack = [
        item.name,
        item.make,
        item.model,
        item.variant,
        item.kind,
        item.subcategory,
        item.location,
        item.fuel,
        item.year,
      ]
        .join(" ")
        .toLowerCase();
      if (!terms.every((term) => haystack.includes(term))) return false;
    }

    if (filters.category !== "All" && item.kind !== filters.category) return false;
    if (filters.make && item.make !== filters.make) return false;
    if (filters.model && item.model !== filters.model) return false;
    if (filters.fuelTypes.length && !filters.fuelTypes.includes(item.fuelType)) return false;
    if (filters.transmissions.length) {
      if (!item.transmission || !filters.transmissions.includes(item.transmission)) return false;
    }
    if (filters.ownership.length && !filters.ownership.includes(item.ownership)) return false;
    if (filters.priceMin !== null && item.priceValue < filters.priceMin) return false;
    if (filters.priceMax !== null && item.priceValue > filters.priceMax) return false;

    const year = Number(item.year);
    if (filters.yearMin !== null && year < filters.yearMin) return false;
    if (filters.yearMax !== null && year > filters.yearMax) return false;
    if (filters.kmMax !== null && kmOf(item) > filters.kmMax) return false;

    const cc = item.displacement;
    if (filters.displacementMin !== null && (cc === undefined || cc < filters.displacementMin)) return false;
    if (filters.displacementMax !== null && (cc === undefined || cc > filters.displacementMax)) return false;

    if (filters.checkedOnly && !item.verified) return false;
    if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

    return true;
  });
}

export function sortListings(listings: Listing[], sort: SortKey): Listing[] {
  const copy = [...listings];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceValue - b.priceValue);
    case "price-desc":
      return copy.sort((a, b) => b.priceValue - a.priceValue);
    case "year-desc":
      return copy.sort((a, b) => Number(b.year) - Number(a.year));
    case "km-asc":
      return copy.sort((a, b) => kmOf(a) - kmOf(b));
    default:
      return copy.sort((a, b) => Number(Boolean(b.verified)) - Number(Boolean(a.verified)));
  }
}

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "year-desc", label: "Year: newest first" },
  { key: "km-asc", label: "Kilometres: lowest first" },
];

export const pricePresets = [
  { label: "Under ₹1 L", min: null, max: 100000 },
  { label: "₹1 L – ₹3 L", min: 100000, max: 300000 },
  { label: "₹3 L – ₹6 L", min: 300000, max: 600000 },
  { label: "₹6 L – ₹10 L", min: 600000, max: 1000000 },
  { label: "₹10 L – ₹20 L", min: 1000000, max: 2000000 },
  { label: "Above ₹20 L", min: 2000000, max: null },
];

export const displacementPresets = [
  { label: "Electric / 0 cc", min: 0, max: 0 },
  { label: "Up to 125 cc", min: 1, max: 125 },
  { label: "126 – 200 cc", min: 126, max: 200 },
  { label: "201 – 400 cc", min: 201, max: 400 },
  { label: "401 – 650 cc", min: 401, max: 650 },
  { label: "Above 650 cc", min: 651, max: null },
];

export const kmPresets = [
  { label: "Under 10,000 km", value: 10000 },
  { label: "Under 25,000 km", value: 25000 },
  { label: "Under 50,000 km", value: 50000 },
  { label: "Under 1,00,000 km", value: 100000 },
];
