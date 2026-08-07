import { useEffect, useState } from "react";
import { Sheet, TextInput } from "./shell";
import { DEMO_OTP, createUser, isValidPhone, mintToken, normalisePhone, verifyOtp } from "../data/auth";
import type { AuthUser, SellerType } from "../data/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated: (user: AuthUser, token: string) => void;
  reason?: string;
};

export default function AuthSheet({ open, onOpenChange, onAuthenticated, reason }: Props) {
  const [step, setStep] = useState<"phone" | "otp" | "profile">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sellerType, setSellerType] = useState<SellerType>("Private seller");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep("phone");
      setOtp("");
      setError("");
      setBusy(false);
    }
  }, [open]);

  const sendOtp = () => {
    if (!isValidPhone(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setError("");
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setStep("otp");
    }, 600);
  };

  const checkOtp = () => {
    const result = verifyOtp(otp);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
    setStep("profile");
  };

  const finish = () => {
    if (!name.trim()) {
      setError("Enter your name so buyers know who they are contacting.");
      return;
    }
    const user = createUser({ name, phone, email, sellerType });
    onAuthenticated(user, mintToken(user));
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={step === "profile" ? "Complete your profile" : "Sign in to Motora"}
      description={reason ?? "Verify your mobile number to manage listings and enquiries."}
    >
      <div className="auth-body">
        {step === "phone" && (
          <>
            <label className="form-label">
              Mobile number
              <div className="phone-input">
                <span>+91</span>
                <TextInput
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(normalisePhone(event.target.value))}
                  placeholder="98765 43210"
                />
              </div>
            </label>
            <p className="form-copy">We send a one-time code. Standard SMS rates apply.</p>
            <button type="button" className="primary full" onClick={sendOtp} disabled={busy}>
              {busy ? "Sending code…" : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="form-copy">
              Code sent to <b>+91 {phone}</b>. For this demo use <b>{DEMO_OTP}</b>.
            </p>
            <label className="form-label">
              6-digit code
              <TextInput
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                placeholder="123456"
              />
            </label>
            <div className="step-actions">
              <button type="button" onClick={() => setStep("phone")}>
                Change number
              </button>
              <button type="button" className="primary" onClick={checkOtp}>
                Verify
              </button>
            </div>
          </>
        )}

        {step === "profile" && (
          <>
            <label className="form-label">
              Your name
              <TextInput value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Amit Sharma" />
            </label>
            <label className="form-label">
              Email (optional)
              <TextInput
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
              />
            </label>
            <label className="form-label">I am a</label>
            <div className="choice-grid three">
              {(["Dealer", "Private seller", "Collector"] as SellerType[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={sellerType === item ? "selected" : ""}
                  onClick={() => setSellerType(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button type="button" className="primary full" onClick={finish}>
              Continue
            </button>
          </>
        )}

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        <p className="auth-legal">
          By continuing you agree to Motora's terms and privacy policy. Your number is never shown publicly unless you
          allow it.
        </p>
      </div>
    </Sheet>
  );
}
