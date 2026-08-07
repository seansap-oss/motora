import { useEffect, useMemo, useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Modal, TextInput } from "./shell";
import { GST_RATE, netBankingBanks, priceBreakdown, upiApps } from "../data/packages";
import { createOrder, formatInr, gatewayLabel, processPayment, type PaymentResult } from "../data/payments";
import type { PackagePlan, PaymentMethod } from "../data/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PackagePlan | null;
  onSuccess: (plan: PackagePlan, result: PaymentResult) => void;
};

type Stage = "method" | "processing" | "done";

export default function CheckoutModal({ open, onOpenChange, plan, onSuccess }: Props) {
  const [stage, setStage] = useState<Stage>("method");
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [selectedApp, setSelectedApp] = useState(upiApps[0].id);
  const [bank, setBank] = useState(netBankingBanks[0]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setStage("method");
      setResult(null);
      setError("");
    }
  }, [open]);

  const totals = useMemo(() => priceBreakdown(plan?.price ?? 0), [plan]);
  if (!plan) return null;

  const instrument = () => {
    if (method === "upi") return upiId.trim() || selectedApp;
    if (method === "netbanking") return bank;
    return cardNumber ? `Card ending ${cardNumber.slice(-4)}` : "Card";
  };

  const validate = () => {
    if (method === "card") {
      if (cardNumber.replace(/\s/g, "").length < 12) return "Enter a valid card number.";
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) return "Expiry must be MM/YY.";
      if (cardCvv.length < 3) return "Enter the 3-digit CVV.";
    }
    if (method === "upi" && upiId.trim() && !upiId.includes("@")) return "UPI ID should look like name@bank.";
    return "";
  };

  const pay = async () => {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setStage("processing");
    const order = await createOrder(plan);
    const payment = await processPayment(order, method, instrument());
    setResult(payment);
    setStage("done");
    if (payment.status === "success") onSuccess(plan, payment);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={stage === "done" ? "Payment" : `Upgrade to ${plan.name}`}>
      {stage === "method" && (
        <div className="checkout">
          <div className="checkout-summary">
            <div>
              <b>{plan.name} plan</b>
              <small>{plan.period}</small>
            </div>
            <div className="checkout-lines">
              <span>
                <small>Plan</small>
                <b>{formatInr(totals.base * 100)}</b>
              </span>
              <span>
                <small>GST ({Math.round(GST_RATE * 100)}%)</small>
                <b>{formatInr(totals.gst * 100)}</b>
              </span>
              <span className="total">
                <small>Total payable</small>
                <b>{formatInr(totals.total * 100)}</b>
              </span>
            </div>
          </div>

          <div className="method-tabs" role="tablist">
            {(
              [
                ["upi", "UPI"],
                ["netbanking", "Net Banking"],
                ["card", "Card"],
              ] as [PaymentMethod, string][]
            ).map(([id, label]) => (
              <button
                type="button"
                role="tab"
                key={id}
                aria-selected={method === id}
                className={method === id ? "active" : ""}
                onClick={() => setMethod(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {method === "upi" && (
            <div className="method-body">
              <div className="upi-apps">
                {upiApps.map((app) => (
                  <button
                    type="button"
                    key={app.id}
                    className={selectedApp === app.id ? "upi-app selected" : "upi-app"}
                    onClick={() => setSelectedApp(app.id)}
                  >
                    <span className="upi-mark" aria-hidden="true">
                      {app.id.charAt(0)}
                    </span>
                    <b>{app.id}</b>
                    <small>{app.hint}</small>
                  </button>
                ))}
              </div>
              <label className="form-label">
                Or enter a UPI ID
                <TextInput
                  value={upiId}
                  onChange={(event) => setUpiId(event.target.value)}
                  placeholder="yourname@okhdfcbank"
                  inputMode="email"
                />
              </label>
            </div>
          )}

          {method === "netbanking" && (
            <div className="method-body">
              <label className="form-label">
                Select your bank
                <select className="bank-select" value={bank} onChange={(event) => setBank(event.target.value)}>
                  {netBankingBanks.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {method === "card" && (
            <div className="method-body">
              <label className="form-label">
                Card number
                <TextInput
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(event) =>
                    setCardNumber(
                      event.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 16)
                        .replace(/(.{4})/g, "$1 ")
                        .trim(),
                    )
                  }
                  placeholder="4111 1111 1111 1111"
                />
              </label>
              <div className="card-row">
                <label className="form-label">
                  Expiry
                  <TextInput
                    value={cardExpiry}
                    onChange={(event) => {
                      const digits = event.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                      setCardExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
                    }}
                    placeholder="MM/YY"
                  />
                </label>
                <label className="form-label">
                  CVV
                  <TextInput
                    inputMode="numeric"
                    type="password"
                    value={cardCvv}
                    onChange={(event) => setCardCvv(event.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                    placeholder="123"
                  />
                </label>
              </div>
            </div>
          )}

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="button" className="primary full pay-button" onClick={pay}>
            Pay {formatInr(totals.total * 100)}
          </button>
          <p className="gateway-note">Secured by {gatewayLabel()} · No card details are stored by Motora.</p>
        </div>
      )}

      {stage === "processing" && (
        <div className="checkout-processing" role="status">
          <span className="spinner" aria-hidden="true" />
          <b>Confirming your payment…</b>
          <p>Do not close this window. Approve the request in your {method === "upi" ? "UPI app" : "bank app"}.</p>
        </div>
      )}

      {stage === "done" && result && (
        <div className={result.status === "success" ? "checkout-done" : "checkout-done failed"}>
          <span className="done-mark" aria-hidden="true">
            {result.status === "success" ? <CheckIcon /> : "!"}
          </span>
          <b>{result.status === "success" ? "Payment successful" : "Payment failed"}</b>
          <p>
            {result.status === "success"
              ? `${plan.name} is active. You can now publish up to ${plan.adLimit} ads with ${plan.photoLimit} photos each.`
              : result.failureReason}
          </p>
          <dl className="receipt">
            <div>
              <dt>Payment ID</dt>
              <dd>{result.paymentId}</dd>
            </div>
            <div>
              <dt>Order ID</dt>
              <dd>{result.orderId}</dd>
            </div>
            <div>
              <dt>Method</dt>
              <dd>{result.instrument}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>{formatInr(result.amountPaise)}</dd>
            </div>
          </dl>
          <div className="step-actions">
            {result.status === "failed" && (
              <button type="button" onClick={() => setStage("method")}>
                Try again
              </button>
            )}
            <button type="button" className="primary" onClick={() => onOpenChange(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
