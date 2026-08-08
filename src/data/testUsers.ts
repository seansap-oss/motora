import type { PackageId, SellerType } from "./types";

/**
 * CLOSED TESTING CREDENTIALS — Google Play closed-track builds only.
 *
 * SECURITY NOTE: these values ship inside the client bundle and are therefore
 * public. They exist solely so Play Console reviewers and closed testers can
 * reach every gated surface without a live SMS gateway. Before any production
 * or open-track release, set VITE_DISABLE_TEST_ACCOUNTS=true (or delete this
 * module) and point authentication at the real backend.
 */

export type TestRole = "Private Seller" | "Verified Dealer" | "Buyer/Tester" | "Super Admin";

export type TestUser = {
  id: string;
  email: string;
  pin: string;
  role: TestRole;
  name: string;
  phone: string;
  sellerType: SellerType;
  packageId: PackageId;
  isAdmin: boolean;
  verified: boolean;
};

const rows: [string, string, TestRole, string][] = [
  ["test01@motora.in", "4192", "Private Seller", "Aarav Sharma"],
  ["test02@motora.in", "8301", "Private Seller", "Diya Patel"],
  ["test03@motora.in", "1547", "Private Seller", "Rohan Singh"],
  ["test04@motora.in", "6923", "Private Seller", "Ananya Nair"],
  ["test05@motora.in", "3084", "Private Seller", "Vikram Reddy"],
  ["test06@motora.in", "9215", "Verified Dealer", "Amit Motors"],
  ["test07@motora.in", "5739", "Verified Dealer", "Imphal Auto Hub"],
  ["test08@motora.in", "2840", "Verified Dealer", "Northeast Wheels"],
  ["test09@motora.in", "7461", "Verified Dealer", "Guwahati Motors"],
  ["test10@motora.in", "1092", "Verified Dealer", "Shillong Car Point"],
  ["test11@motora.in", "8534", "Buyer/Tester", "Kavya Iyer"],
  ["test12@motora.in", "4620", "Buyer/Tester", "Arjun Menon"],
  ["test13@motora.in", "3198", "Buyer/Tester", "Meera Joshi"],
  ["test14@motora.in", "7256", "Buyer/Tester", "Karan Gupta"],
  ["test15@motora.in", "9043", "Buyer/Tester", "Priya Das"],
  ["test16@motora.in", "6187", "Buyer/Tester", "Sanjay Kumar"],
  ["test17@motora.in", "2509", "Buyer/Tester", "Neha Bora"],
  ["test18@motora.in", "8431", "Buyer/Tester", "Rahul Devi"],
  ["test19@motora.in", "3715", "Buyer/Tester", "Ishita Rao"],
  ["test20@motora.in", "5962", "Super Admin", "Motora Owner"],
];

function sellerTypeFor(role: TestRole): SellerType {
  if (role === "Verified Dealer") return "Dealer";
  if (role === "Super Admin") return "Dealer";
  return "Private seller";
}

function packageFor(role: TestRole): PackageId {
  if (role === "Verified Dealer") return "comprehensive";
  if (role === "Super Admin") return "dealer";
  return "free";
}

export const TEST_USERS: TestUser[] = rows.map(([email, pin, role, name], index) => {
  const seq = String(index + 1).padStart(2, "0");
  return {
    id: `test_${seq}`,
    email,
    pin,
    role,
    name,
    phone: `+91 90000 000${seq}`,
    sellerType: sellerTypeFor(role),
    packageId: packageFor(role),
    isAdmin: role === "Super Admin",
    verified: role === "Verified Dealer" || role === "Super Admin",
  };
});

/** Closed-testing lock. Only the 20 accounts above may authenticate. */
export const TEST_ACCOUNTS_ONLY =
  String(import.meta.env?.VITE_DISABLE_TEST_ACCOUNTS ?? "") !== "true";

/** Password/PIN changes are disabled for the closed-testing track. */
export const CREDENTIAL_CHANGES_ENABLED = false;

export function normaliseEmail(raw: string) {
  return raw.trim().toLowerCase();
}

export function findTestUser(email: string) {
  const key = normaliseEmail(email);
  return TEST_USERS.find((user) => user.email === key) ?? null;
}

export type TestAuthResult =
  | { ok: true; user: TestUser }
  | { ok: false; error: string };

/**
 * Constant-shape credential check. Returns the same message for an unknown
 * address and a wrong PIN so the tester list cannot be enumerated.
 */
export function authenticateTestUser(email: string, pin: string): TestAuthResult {
  const digits = pin.replace(/[^0-9]/g, "");
  const user = findTestUser(email);

  if (digits.length !== 4) {
    return { ok: false, error: "Enter the 4-digit PIN for your test account." };
  }
  if (!user || user.pin !== digits) {
    return { ok: false, error: "Invalid test account or PIN. Check the closed-testing sheet." };
  }
  return { ok: true, user };
}

export const TEST_USER_COUNT = TEST_USERS.length;
