import type { Listing } from "./types";

const SAVED_KEY = "motora.saved.v1";
const COUNTS_KEY = "motora.counts.v1";

export type EngagementCounts = Record<string, { views: number; saves: number; viewedToday: number }>;

export function loadSaved(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function persistSaved(ids: string[]) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private mode); state stays in memory for this session.
  }
}

export function loadCounts(): EngagementCounts {
  try {
    const raw = localStorage.getItem(COUNTS_KEY);
    return raw ? (JSON.parse(raw) as EngagementCounts) : {};
  } catch {
    return {};
  }
}

export function persistCounts(counts: EngagementCounts) {
  try {
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
  } catch {
    // Non-fatal.
  }
}

/** Seeds live counters from the listing fixtures so totals look continuous. */
export function seedCounts(listings: Listing[], stored: EngagementCounts): EngagementCounts {
  const next: EngagementCounts = { ...stored };
  for (const listing of listings) {
    if (!next[listing.id]) {
      next[listing.id] = {
        views: listing.views ?? 0,
        saves: 0,
        viewedToday: Math.max(3, Math.round((listing.views ?? 0) / 28)),
      };
    }
  }
  return next;
}

export const POPULAR_TODAY_THRESHOLD = 10;

export function isPopular(counts: EngagementCounts, id: string) {
  return (counts[id]?.viewedToday ?? 0) >= POPULAR_TODAY_THRESHOLD;
}

export function urgencyLabel(counts: EngagementCounts, id: string) {
  const today = counts[id]?.viewedToday ?? 0;
  return `🔥 Popular Ad! ${today} buyers viewed this today.`;
}
