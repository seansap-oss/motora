import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import LegalPage from "./LegalPage";
import { TextArea, TextInput } from "../components/shell";

type Scope = "account" | "listings" | "media";

const SCOPES: { id: Scope; label: string; detail: string }[] = [
  { id: "account", label: "Delete my entire account", detail: "Profile, credentials, saved ads and all listings." },
  { id: "listings", label: "Delete my listings only", detail: "Remove every advertisement but keep the account." },
  { id: "media", label: "Delete uploaded media only", detail: "Photos, videos and voice notes attached to listings." },
];

export default function AccountDeletion({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState<Scope>("account");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState("");

  const submit = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Enter the email address registered with your Motora account.");
      return;
    }
    if (!confirmed) {
      setError("Tick the confirmation box so we know this request is intentional.");
      return;
    }
    setError("");
    setTicket(`DEL-${Date.now().toString(36).toUpperCase().slice(-8)}`);
  };

  return (
    <LegalPage title="Delete your account" subtitle="Account & data deletion request" onBack={onBack}>
      <p>
        You can ask us to delete your Motora account and associated data at any time. Submit the form below, or email{" "}
        <a href="mailto:privacy@motora.in">privacy@motora.in</a> from your registered address with the subject
        "Account deletion".
      </p>

      <h2>What gets deleted</h2>
      <ul>
        <li>Profile: name, email address, mobile number and seller type.</li>
        <li>All listings, including specifications, pricing and disclosures.</li>
        <li>Uploaded media: photographs, videos and voice notes.</li>
        <li>Saved ads, saved searches and notification preferences.</li>
        <li>Storefront page and its public share link.</li>
      </ul>

      <h2>What we retain, and why</h2>
      <ul>
        <li>
          <b>Transaction and tax records</b> for package purchases — retained up to 8 years because Indian tax law
          requires it.
        </li>
        <li>
          <b>Fraud and safety records</b> where an account was suspended for abuse — retained to prevent recurrence.
        </li>
        <li>
          <b>Aggregated, de-identified analytics</b> that can no longer be linked to you.
        </li>
      </ul>

      <h2>Timeline</h2>
      <ul>
        <li>Acknowledgement within 48 hours.</li>
        <li>Listings removed from public search immediately on verification.</li>
        <li>Full erasure completed within 30 days.</li>
        <li>Backup copies purged on the normal backup rotation, within 90 days.</li>
      </ul>

      {ticket ? (
        <div className="deletion-done" role="status">
          <span className="done-mark" aria-hidden="true">
            <CheckIcon />
          </span>
          <b>Deletion request received</b>
          <p>
            Reference <b>{ticket}</b>. We have sent a confirmation to <b>{email}</b>. You must confirm from that inbox
            before erasure begins, which protects you against unauthorised deletion.
          </p>
        </div>
      ) : (
        <form
          className="deletion-form"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <h2>Submit a request</h2>

          <label className="form-label">
            Registered email address
            <TextInput
              type="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <fieldset className="deletion-scope">
            <legend>What should we delete?</legend>
            {SCOPES.map((option) => (
              <label key={option.id} className={scope === option.id ? "scope-row selected" : "scope-row"}>
                <input
                  type="radio"
                  name="scope"
                  value={option.id}
                  checked={scope === option.id}
                  onChange={() => setScope(option.id)}
                />
                <span>
                  <b>{option.label}</b>
                  <small>{option.detail}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <label className="form-label">
            Reason (optional)
            <TextArea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Tell us why you are leaving so we can improve."
            />
          </label>

          <label className="scope-row confirm-row">
            <input type="checkbox" checked={confirmed} onChange={() => setConfirmed(!confirmed)} />
            <span>
              <b>I understand this is permanent</b>
              <small>Deleted listings, media and saved ads cannot be recovered.</small>
            </span>
          </label>

          <button type="submit" className="primary full">
            Submit deletion request
          </button>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}

      <h2>Contact</h2>
      <p>
        Motora Privacy Team — <a href="mailto:privacy@motora.in">privacy@motora.in</a>
        <br />
        Developer: Motora, Imphal, Manipur, India.
      </p>
    </LegalPage>
  );
}
