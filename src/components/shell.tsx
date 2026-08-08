import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

export function AppScroll({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`app-scroll ${className}`.trim()}>{children}</div>;
}

export function Rail({
  children,
  ariaLabel,
  className = "",
  contentClassName = "",
  onEndReached,
}: PropsWithChildren<{
  ariaLabel: string;
  className?: string;
  contentClassName?: string;
  onEndReached?: () => void;
}>) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Endless horizontal scroll: request the next page as the rail nears its end.
  const onScroll = () => {
    if (!onEndReached) return;
    const el = ref.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 120) onEndReached();
  };

  return (
    <div
      ref={ref}
      className={`rail ${className}`.trim()}
      role="group"
      aria-label={ariaLabel}
      onScroll={onScroll}
    >
      <div className={`rail-track ${contentClassName}`.trim()}>{children}</div>
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} />;
}

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "default",
}: PropsWithChildren<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: "default" | "tall";
}>) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="sheet-layer" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="sheet-scrim" aria-label="Close" onClick={close} />
      <div className={size === "tall" ? "sheet-panel tall" : "sheet-panel"}>
        <div className="sheet-grip" aria-hidden="true" />
        <header className="sheet-head">
          <div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button type="button" className="sheet-close" onClick={close} aria-label="Close">
            <Cross1Icon />
          </button>
        </header>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

export function Modal({
  open,
  onOpenChange,
  title,
  children,
}: PropsWithChildren<{ open: boolean; onOpenChange: (open: boolean) => void; title: string }>) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="sheet-scrim" aria-label="Close" onClick={close} />
      <div className="modal-panel">
        <header className="sheet-head">
          <h2>{title}</h2>
          <button type="button" className="sheet-close" onClick={close} aria-label="Close">
            <Cross1Icon />
          </button>
        </header>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`skeleton ${className}`.trim()} aria-hidden="true" />;
}

export function ListingCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "listing-card compact is-skeleton" : "listing-card is-skeleton"} aria-hidden="true">
      <Skeleton className="sk-image" />
      <Skeleton className="sk-line w80" />
      <Skeleton className="sk-line w60" />
      <Skeleton className="sk-line w40" />
    </div>
  );
}

export function ResultRowSkeleton() {
  return (
    <div className="result-row is-skeleton" aria-hidden="true">
      <Skeleton className="sk-thumb" />
      <div className="sk-stack">
        <Skeleton className="sk-line w70" />
        <Skeleton className="sk-line w50" />
        <Skeleton className="sk-line w40" />
        <Skeleton className="sk-line w30" />
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-icon">{icon}</span>
      <b>{title}</b>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function useSimulatedLoad(deps: unknown[], delay = 480) {
  const [loading, setLoading] = useState(true);
  const first = useRef(true);

  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), first.current ? delay : Math.round(delay * 0.6));
    first.current = false;
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return loading;
}
