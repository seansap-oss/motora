import { useEffect, useState } from "react";
import { Sheet, TextInput } from "./shell";
import { changeCredentials, signInWithTestAccount } from "../data/auth";
import { TEST_USER_COUNT } from "../data/testUsers";
import type { AuthUser } from "../data/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthenticated: (user: AuthUser, token: string) => void;
  reason?: string;
};

export default function AuthSheet({ open, onOpenChange, onAuthenticated, reason }: Props) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setPin("");
      setError("");
      setBusy(false);
    }
  }, [open]);

  const submit = () => {
    setError("");
    setBusy(true);

    window.setTimeout(() => {
      const result = signInWithTestAccount(email, pin);
      setBusy(false);

      if (!result.ok) {
        setError(result.error);
        setPin("");
        return;
      }

      onAuthenticated(result.user, result.token);
      onOpenChange(false);
    }, 420);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Sign in to Motora"
      description={reason ?? "Closed testing build — sign in with your assigned test account."}
    >
      <form
        className="auth-body"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="test-mode-note">
          <b>Closed testing</b>
          <p>
            This build accepts the {TEST_USER_COUNT} accounts issued for Google Play closed testing. Use the address and
            4-digit PIN from your tester invitation.
          </p>
        </div>

        <label className="form-label">
          Test account email
          <TextInput
            type="email"
            autoComplete="username"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="test01@motora.in"
          />
        </label>

        <label className="form-label">
          4-digit PIN
          <TextInput
            type="password"
            autoComplete="current-password"
            inputMode="numeric"
            value={pin}
            onChange={(event) => setPin(event.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
            placeholder="••••"
          />
        </label>

        <button type="submit" className="primary full" disabled={busy}>
          {busy ? "Verifying…" : "Sign in"}
        </button>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          className="auth-link"
          onClick={() => setError(changeCredentials().error)}
        >
          Forgot or change PIN?
        </button>

        <p className="auth-legal">
          By continuing you agree to Motora's Terms of Service and Privacy Policy. Your contact details are never shown
          publicly unless you allow it. You can request account and data deletion at any time.
        </p>
      </form>
    </Sheet>
  );
}
