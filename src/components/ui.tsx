import type { ReactNode } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
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

export function FilterChip({ label }: { label: string }) {
  return (
    <button className="filter-chip">
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

export function ListingCard({ item, compact = false, onOpen }: { item: Listing; compact?: boolean; onOpen: () => void }) {
  return (
    <button type="button" className={compact ? "listing-card compact" : "listing-card"} onClick={onOpen}>
      <span className="listing-image-wrap">
        <img src={item.image} alt="" className={item.kind === "Bicycles & Kids" ? "product-image contain" : "product-image"} />
      </span>
      <span className="listing-name">{item.name}</span>
      <span className="listing-meta">
        {item.year} · {item.fuel}
      </span>
      <strong>{item.price}</strong>
      {item.verified && <span className="verified-mini">✓ Checked</span>}
    </button>
  );
}
