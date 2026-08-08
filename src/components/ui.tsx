import type { ReactNode } from "react";
import { ChevronDownIcon, Cross1Icon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import type { Listing } from "../data/types";

export function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" className="icon-button" onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

export function SectionHeader({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <button type="button" onClick={onAction}>
        {action}
      </button>
    </div>
  );
}

export function FilterChip({ label, onClear }: { label: string; onClear?: () => void }) {
  if (onClear) {
    return (
      <button type="button" className="filter-chip is-set" onClick={onClear} aria-label={`Remove ${label} filter`}>
        {label}
        <Cross1Icon />
      </button>
    );
  }

  return (
    <button type="button" className="filter-chip">
      {label}
      <ChevronDownIcon />
    </button>
  );
}

export function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <small>{label}</small>
      <b>{value}</b>
    </div>
  );
}

export function ListingCard({
  item,
  compact = false,
  onOpen,
  saved = false,
  onToggleSave,
  popular = false,
}: {
  item: Listing;
  compact?: boolean;
  onOpen: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
  popular?: boolean;
}) {
  return (
    <div className={compact ? "listing-card compact" : "listing-card"}>
      <button type="button" className="listing-open" onClick={onOpen}>
        <span className="listing-image-wrap">
          <img
            src={item.image}
            alt=""
            className={item.kind === "Bicycles & Kids" ? "product-image contain" : "product-image"}
          />
        </span>
        <span className="listing-name">{item.name}</span>
        <span className="listing-meta">
          {item.year} · {item.fuel}
        </span>
        <strong>{item.price}</strong>
        {item.verified && <span className="verified-mini">✓ Checked</span>}
      </button>

      {onToggleSave && (
        <button
          type="button"
          className={saved ? "listing-save is-saved" : "listing-save"}
          onClick={(event) => {
            event.stopPropagation();
            onToggleSave();
          }}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${item.name} from Saved Ads` : `Save ${item.name} to Saved Ads`}
        >
          {saved ? <HeartFilledIcon /> : <HeartIcon />}
        </button>
      )}

      {popular && <span className="popular-badge">🔥 Popular</span>}
    </div>
  );
}
