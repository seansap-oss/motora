import type { Category, Listing } from "./types";

/** Standard reducing-balance EMI. */
export function calculateEmi(principal: number, annualRatePct: number, months: number) {
  if (principal <= 0 || months <= 0) return { emi: 0, totalPayable: 0, totalInterest: 0 };
  const r = annualRatePct / 12 / 100;
  const emi = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayable = emi * months;
  return {
    emi: Math.round(emi),
    totalPayable: Math.round(totalPayable),
    totalInterest: Math.round(totalPayable - principal),
  };
}

/**
 * Indicative on-road price. RTO and insurance vary by state and are shown as
 * estimates only; Motora does not present these as quotations.
 */
const RTO_RATE: Record<Category, number> = {
  Cars: 0.1,
  Bikes: 0.08,
  Scooters: 0.08,
  Commercial: 0.09,
  "Bicycles & Kids": 0,
};

const INSURANCE_RATE: Record<Category, number> = {
  Cars: 0.035,
  Bikes: 0.03,
  Scooters: 0.03,
  Commercial: 0.045,
  "Bicycles & Kids": 0,
};

export function onRoadPrice(exShowroom: number, category: Category) {
  const rto = Math.round(exShowroom * (RTO_RATE[category] ?? 0.09));
  const insurance = Math.round(exShowroom * (INSURANCE_RATE[category] ?? 0.03));
  const handling = category === "Bicycles & Kids" ? 0 : Math.min(15000, Math.round(exShowroom * 0.005));
  return {
    exShowroom,
    rto,
    insurance,
    handling,
    total: exShowroom + rto + insurance + handling,
  };
}

export function formatInr(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function formatInrExact(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

/**
 * Instant valuation heuristic: straight-line depreciation by age, adjusted for
 * odometer use and condition. Deliberately returns a range, never a firm quote.
 */
const DEPRECIATION_PER_YEAR: Record<Category, number> = {
  Cars: 0.11,
  Bikes: 0.1,
  Scooters: 0.12,
  Commercial: 0.13,
  "Bicycles & Kids": 0.15,
};

const CONDITION_FACTOR: Record<string, number> = {
  Excellent: 1.06,
  Good: 1,
  Fair: 0.9,
  "Needs work": 0.76,
};

const EXPECTED_KM_PER_YEAR: Record<Category, number> = {
  Cars: 12000,
  Bikes: 8000,
  Scooters: 6000,
  Commercial: 25000,
  "Bicycles & Kids": 500,
};

export type ValuationInput = {
  category: Category;
  basePrice: number;
  year: number;
  odometer: number;
  condition: string;
};

export function estimateValue(input: ValuationInput) {
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - input.year);
  const rate = DEPRECIATION_PER_YEAR[input.category] ?? 0.11;

  let value = input.basePrice * Math.pow(1 - rate, age);

  const expected = (EXPECTED_KM_PER_YEAR[input.category] ?? 10000) * Math.max(age, 1);
  if (expected > 0 && input.odometer > 0) {
    const ratio = input.odometer / expected;
    const usageAdjust = ratio > 1 ? Math.max(0.72, 1 - (ratio - 1) * 0.18) : Math.min(1.08, 1 + (1 - ratio) * 0.1);
    value *= usageAdjust;
  }

  value *= CONDITION_FACTOR[input.condition] ?? 1;
  value = Math.max(value, input.basePrice * 0.08);

  const low = Math.round((value * 0.93) / 500) * 500;
  const high = Math.round((value * 1.07) / 500) * 500;
  return { low, high, mid: Math.round(value / 500) * 500, ageYears: age };
}

export function listingValuationInput(listing: Listing) {
  return {
    category: listing.kind,
    basePrice: listing.priceValue,
    year: Number(listing.year),
    odometer: listing.kmValue ?? 0,
    condition: "Good",
  };
}

export const emiTenures = [12, 24, 36, 48, 60, 84];
