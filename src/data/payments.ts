import type { PaymentMethod, PackagePlan } from "./types";
import { priceBreakdown } from "./packages";

export type PaymentIntent = {
  orderId: string;
  packageId: string;
  amountPaise: number;
  currency: "INR";
  createdAt: number;
};

export type PaymentResult = {
  status: "success" | "failed";
  paymentId: string;
  orderId: string;
  method: PaymentMethod;
  instrument: string;
  amountPaise: number;
  at: number;
  failureReason?: string;
};

const RAZORPAY_KEY_ID = (import.meta.env?.VITE_RAZORPAY_KEY_ID as string | undefined) ?? "rzp_test_motora_mock";

export function isLiveGatewayConfigured() {
  return Boolean(import.meta.env?.VITE_RAZORPAY_KEY_ID);
}

function randomId(prefix: string) {
  const rand = Math.random().toString(36).slice(2, 12);
  return `${prefix}_${rand}`;
}

/**
 * Creates a payment intent. In production this call belongs on the server so the
 * key secret is never exposed; the client only ever receives an order id.
 */
export async function createOrder(plan: PackagePlan): Promise<PaymentIntent> {
  const { total } = priceBreakdown(plan.price);
  await delay(320);
  return {
    orderId: randomId("order"),
    packageId: plan.id,
    amountPaise: total * 100,
    currency: "INR",
    createdAt: Date.now(),
  };
}

/**
 * Mock checkout. Mirrors the Razorpay handler/callback contract so swapping in the
 * real SDK only means replacing the body of this function.
 */
export async function processPayment(
  intent: PaymentIntent,
  method: PaymentMethod,
  instrument: string,
): Promise<PaymentResult> {
  await delay(1400);

  const invalidUpi = method === "upi" && instrument.includes("@") && instrument.length < 6;
  if (invalidUpi) {
    return {
      status: "failed",
      paymentId: randomId("pay"),
      orderId: intent.orderId,
      method,
      instrument,
      amountPaise: intent.amountPaise,
      at: Date.now(),
      failureReason: "The UPI ID could not be verified. Check the ID and try again.",
    };
  }

  return {
    status: "success",
    paymentId: randomId("pay"),
    orderId: intent.orderId,
    method,
    instrument,
    amountPaise: intent.amountPaise,
    at: Date.now(),
  };
}

export function gatewayLabel() {
  return isLiveGatewayConfigured() ? `Razorpay · ${RAZORPAY_KEY_ID.slice(0, 12)}…` : "Razorpay (test mode)";
}

export function formatInr(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
