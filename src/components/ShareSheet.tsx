import { useState } from "react";
import { CheckIcon, CopyIcon, Share1Icon } from "@radix-ui/react-icons";
import { Sheet } from "./shell";

export type ShareTarget = {
  title: string;
  text: string;
  url: string;
};

const channels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    glyph: "W",
    href: (t: ShareTarget) => `https://wa.me/?text=${encodeURIComponent(`${t.text} ${t.url}`)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    glyph: "f",
    href: (t: ShareTarget) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(t.url)}`,
  },
  {
    id: "sms",
    label: "SMS",
    glyph: "✉",
    href: (t: ShareTarget) => `sms:?&body=${encodeURIComponent(`${t.text} ${t.url}`)}`,
  },
  {
    id: "email",
    label: "Email",
    glyph: "@",
    href: (t: ShareTarget) =>
      `mailto:?subject=${encodeURIComponent(t.title)}&body=${encodeURIComponent(`${t.text}\n\n${t.url}`)}`,
  },
];

export default function ShareSheet({
  open,
  onOpenChange,
  target,
  onToast,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: ShareTarget | null;
  onToast: (message: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  if (!target) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(target.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      onToast("Motora link copied");
    } catch {
      onToast("Copy is blocked in this browser. Select the link manually.");
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      onToast("Native sharing is unavailable here. Use a channel below.");
      return;
    }
    try {
      await navigator.share(target);
      onOpenChange(false);
    } catch {
      // User dismissed the native sheet; nothing to report.
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Share" description={target.title}>
      <div className="share-sheet">
        <div className="share-grid">
          {channels.map((channel) => (
            <a
              key={channel.id}
              className="share-target"
              href={channel.href(target)}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => onToast(`Opening ${channel.label}…`)}
            >
              <span className="share-glyph" aria-hidden="true">
                {channel.glyph}
              </span>
              <small>{channel.label}</small>
            </a>
          ))}
          <button type="button" className="share-target" onClick={() => onToast("Copy the link, then paste it into your Instagram story or bio.")}>
            <span className="share-glyph" aria-hidden="true">
              ◎
            </span>
            <small>Instagram</small>
          </button>
          <button type="button" className="share-target" onClick={nativeShare}>
            <span className="share-glyph" aria-hidden="true">
              <Share1Icon />
            </span>
            <small>More</small>
          </button>
        </div>

        <div className="share-link">
          <code>{target.url}</code>
          <button type="button" onClick={copy} aria-label="Copy link">
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="tool-note">Anyone with this Motora ID link can view the public listing or storefront.</p>
      </div>
    </Sheet>
  );
}
