import type { PackagePlan, UpiApp } from "./types";

export const packages: PackagePlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceLabel: "₹0",
    period: "per month",
    adLimit: 1,
    photoLimit: 3,
    videoEmbed: false,
    featured: false,
    highlights: ["1 active ad per month", "Up to 3 photos", "Standard search placement", "In-app enquiries"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 200,
    priceLabel: "₹200",
    period: "one-time",
    adLimit: 3,
    photoLimit: 4,
    videoEmbed: true,
    featured: false,
    highlights: ["3 active ads", "Up to 4 photos per ad", "Video embed", "Priority over free listings"],
  },
  {
    id: "comprehensive",
    name: "Comprehensive",
    price: 1000,
    priceLabel: "₹1,000",
    period: "per quarter",
    adLimit: 10,
    photoLimit: 8,
    videoEmbed: true,
    featured: true,
    split: "5 Cars + 5 Bikes",
    highlights: ["10 active ads (5 Cars / 5 Bikes)", "Up to 8 photos per ad", "Video embed", "Featured placement"],
  },
  {
    id: "dealer",
    name: "Dealer",
    price: 0,
    priceLabel: "Custom",
    period: "talk to sales",
    adLimit: 999,
    photoLimit: 20,
    videoEmbed: true,
    featured: true,
    custom: true,
    highlights: ["Unlimited stock", "Branded micro-site", "Lead analytics", "Dedicated account manager"],
  },
];

export function getPackage(id: string) {
  return packages.find((plan) => plan.id === id) ?? packages[0];
}

export const upiApps: { id: UpiApp; hint: string }[] = [
  { id: "Google Pay", hint: "UPI" },
  { id: "PhonePe", hint: "UPI" },
  { id: "Paytm", hint: "UPI / Wallet" },
  { id: "BHIM UPI", hint: "UPI" },
];

export const netBankingBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Kotak Mahindra Bank",
  "Bank of Baroda",
  "Canara Bank",
];

export const GST_RATE = 0.18;

export function priceBreakdown(amount: number) {
  const gst = Math.round(amount * GST_RATE);
  return { base: amount, gst, total: amount + gst };
}
