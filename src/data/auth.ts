import type { AuthUser, PackageId, SellerType } from "./types";
import {
  CREDENTIAL_CHANGES_ENABLED,
  TEST_ACCOUNTS_ONLY,
  authenticateTestUser,
  type TestUser,
} from "./testUsers";

const STORAGE_KEY = "motora.session.v1";

export type Session = { user: AuthUser; token: string; issuedAt: number };

function base64Url(input: string) {
  return btoa(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Mock JWT with the same three-segment shape Supabase returns. */
export function mintToken(user: AuthUser) {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      sub: user.id,
      phone: user.phone,
      email: user.email,
      role: user.isAdmin ? "admin" : "authenticated",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }),
  );
  return `${header}.${payload}.${base64Url(`sig-${user.id}`)}`;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "MO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function normalisePhone(raw: string) {
  return raw.replace(/[^0-9]/g, "").slice(-10);
}

export function isValidPhone(raw: string) {
  const digits = normalisePhone(raw);
  return digits.length === 10 && /^[6-9]/.test(digits);
}

/** Demo owner account: signing in with this number unlocks the super-admin panel. */
export const DEMO_ADMIN_PHONE = "9999999999";

export function createUser(opts: {
  name: string;
  phone: string;
  email?: string;
  sellerType?: SellerType;
  packageId?: PackageId;
  isAdmin?: boolean;
}): AuthUser {
  const phone = normalisePhone(opts.phone);
  const id = `user_${phone || Math.random().toString(36).slice(2, 10)}`;
  return {
    id,
    name: opts.name.trim() || "Motora seller",
    phone: `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`.trim(),
    email: opts.email?.trim() || `${phone || "seller"}@motora.in`,
    initials: initials(opts.name || "Motora seller"),
    sellerType: opts.sellerType ?? "Private seller",
    sellerId: id,
    packageId: opts.packageId ?? "free",
    isAdmin: opts.isAdmin ?? phone === DEMO_ADMIN_PHONE,
    adsUsedThisPeriod: 0,
  };
}

export function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed?.user?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: Session | null) {
  try {
    if (!session) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage can be unavailable in private mode; session stays in memory.
  }
}

/** Demo OTP: any 6 digits are accepted, 000000 is rejected to exercise the error path. */
export function verifyOtp(code: string) {
  const digits = code.replace(/[^0-9]/g, "");
  if (digits.length !== 6) return { ok: false as const, error: "Enter the 6-digit code." };
  if (digits === "000000") return { ok: false as const, error: "That code is incorrect. Try 123456." };
  return { ok: true as const };
}

export const DEMO_OTP = "123456";

/** Maps a locked closed-testing account onto the app's session user shape. */
export function userFromTestAccount(account: TestUser): AuthUser {
  return {
    id: account.id,
    name: account.name,
    phone: account.phone,
    email: account.email,
    initials: initials(account.name),
    sellerType: account.sellerType,
    sellerId: account.id,
    packageId: account.packageId,
    isAdmin: account.isAdmin,
    adsUsedThisPeriod: 0,
  };
}

/**
 * Closed-testing sign-in. While TEST_ACCOUNTS_ONLY is set, this is the only
 * path that can mint a session.
 */
export function signInWithTestAccount(email: string, pin: string) {
  const result = authenticateTestUser(email, pin);
  if (!result.ok) return result;
  const user = userFromTestAccount(result.user);
  return { ok: true as const, user, token: mintToken(user) };
}

export const TEST_MODE = TEST_ACCOUNTS_ONLY;

/** Credential changes are intentionally unavailable on the closed track. */
export function changeCredentials(): { ok: false; error: string } {
  return {
    ok: false,
    error: CREDENTIAL_CHANGES_ENABLED
      ? "Credential updates are handled by the account service."
      : "PIN changes are disabled during Google Play closed testing.",
  };
}
