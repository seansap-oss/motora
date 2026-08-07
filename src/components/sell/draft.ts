import type { Category, ListingDraft, MediaItem, SellerType } from "../../data/types";

export const sellSteps = [
  { id: 1, key: "category", label: "Category", eyebrow: "STEP 1 · CATEGORY" },
  { id: 2, key: "vehicle", label: "Vehicle", eyebrow: "STEP 2 · MAKE & MODEL" },
  { id: 3, key: "condition", label: "Condition", eyebrow: "STEP 3 · CONDITION & SPECS" },
  { id: 4, key: "media", label: "Media", eyebrow: "STEP 4 · PHOTOS, VIDEO & VOICE" },
  { id: 5, key: "pricing", label: "Pricing", eyebrow: "STEP 5 · PRICE, LOCATION & OWNERSHIP" },
  { id: 6, key: "preview", label: "Preview", eyebrow: "STEP 6 · PREVIEW & PUBLISH" },
] as const;

export const totalSellSteps = sellSteps.length;

export function createDraft(sellerType: SellerType = "Dealer"): ListingDraft {
  return {
    category: null,
    subcategory: "",
    make: "",
    model: "",
    variant: "",
    year: "",
    condition: null,
    odometer: "",
    fuelType: null,
    transmission: null,
    ev: { rangeKm: "", batteryKwh: "", chargeTimeHours: "", batteryHealth: "" },
    cycle: { frameSize: "", gears: "", brakeType: "", wheelSize: "" },
    media: [],
    voiceNoteSeconds: 0,
    price: "",
    negotiable: true,
    location: "",
    pincode: "",
    ownership: null,
    registrationNumber: "",
    insuranceValidTill: "",
    hasAccidentHistory: false,
    description: "",
    sellerType,
    contactConsent: false,
    hidePhone: false,
  };
}

export function isCycle(category: Category | null) {
  return category === "Bicycles & Kids";
}

export function isElectric(draft: ListingDraft) {
  return draft.fuelType === "Electric";
}

export function draftTitle(draft: ListingDraft) {
  const parts = [draft.make, draft.model, draft.variant].filter(Boolean);
  return parts.length ? parts.join(" ") : "Untitled listing";
}

export function formatPrice(raw: string) {
  const value = Number(raw.replace(/[^0-9]/g, ""));
  if (!value) return "₹—";
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatOdometer(draft: ListingDraft) {
  if (isCycle(draft.category)) return draft.cycle.wheelSize ? `${draft.cycle.wheelSize} wheels` : "Cycle";
  const value = Number(draft.odometer.replace(/[^0-9]/g, ""));
  return value ? `${value.toLocaleString("en-IN")} km` : "— km";
}

export function fuelSummary(draft: ListingDraft) {
  if (!draft.fuelType) return "—";
  if (draft.fuelType === "Electric" && draft.ev.rangeKm) return `Electric · ${draft.ev.rangeKm} km range`;
  return draft.transmission ? `${draft.fuelType} · ${draft.transmission}` : draft.fuelType;
}

export function makeMediaItem(file: File): MediaItem {
  const type: MediaItem["type"] = file.type.startsWith("video/") ? "video" : file.type.startsWith("audio/") ? "voice" : "photo";
  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    type,
    name: file.name,
    size: file.size,
    previewUrl: type === "photo" ? URL.createObjectURL(file) : undefined,
  };
}

export function stepIssues(step: number, draft: ListingDraft): string[] {
  const issues: string[] = [];

  if (step === 1) {
    if (!draft.category) issues.push("Choose a vehicle category");
    if (!draft.subcategory) issues.push("Choose a subcategory");
  }

  if (step === 2) {
    if (!draft.make) issues.push("Choose a make");
    if (!draft.model) issues.push("Choose a model");
    if (!draft.year) issues.push("Choose a year");
  }

  if (step === 3) {
    if (!draft.condition) issues.push("Select the overall condition");
    if (!draft.fuelType) issues.push(isCycle(draft.category) ? "Select pedal or electric" : "Select a fuel type");
    if (!isCycle(draft.category) && !draft.odometer.trim()) issues.push("Enter the odometer reading");
    if (isElectric(draft) && !draft.ev.rangeKm.trim()) issues.push("Enter the certified or real-world range");
  }

  if (step === 4) {
    const photos = draft.media.filter((item) => item.type === "photo").length;
    if (photos < 1) issues.push("Add at least one photo");
  }

  if (step === 5) {
    if (!draft.price.trim()) issues.push("Enter an asking price");
    if (!draft.location.trim()) issues.push("Enter the vehicle location");
    if (!isCycle(draft.category) && !draft.ownership) issues.push("Select ownership");
  }

  if (step === 6) {
    if (!draft.description.trim()) issues.push("Add a short description");
    if (!draft.contactConsent) issues.push("Confirm contact consent before publishing");
  }

  return issues;
}
