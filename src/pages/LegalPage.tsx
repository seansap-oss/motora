import type { PropsWithChildren } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { IconButton } from "../components/ui";

export default function LegalPage({
  title,
  subtitle,
  onBack,
  children,
}: PropsWithChildren<{ title: string; subtitle?: string; onBack: () => void }>) {
  return (
    <main className="motora-page legal-page">
      <header className="screen-topbar">
        <IconButton label="Back" onClick={onBack}>
          <ArrowLeftIcon />
        </IconButton>
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div />
      </header>

      <article className="legal-body">{children}</article>

      <footer className="legal-footer">
        <p>
          Motora — Indian vehicle marketplace. Questions? Email{" "}
          <a href="mailto:support@motora.in">support@motora.in</a>.
        </p>
      </footer>
    </main>
  );
}
