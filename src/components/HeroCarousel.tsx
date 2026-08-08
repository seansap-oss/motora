import { useEffect, useRef, useState } from "react";
import type { Listing } from "../data/types";

export const HERO_SLOTS = 10;
/** Total intro animation budget before the carousel locks onto the Home slide. */
export const HERO_ROTATION_MS = 2500;

type Props = {
  slides: Listing[];
  onOpen: (listing: Listing) => void;
};

export default function HeroCarousel({ slides, onOpen }: Props) {
  const count = Math.min(slides.length, HERO_SLOTS);
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lockedRef = useRef(false);
  const programmaticRef = useRef(false);
  const justLockedRef = useRef(false);
  const settleRef = useRef(0);

  /**
   * Intro: cycle every slot within exactly HERO_ROTATION_MS, then stop instantly
   * and lock onto slot 0 (the primary Home featured listing).
   */
  useEffect(() => {
    if (count <= 1) {
      setSpinning(false);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setSpinning(false);
      setIndex(0);
      lockedRef.current = true;
      return;
    }

    const step = HERO_ROTATION_MS / count;
    let tick = 0;

    const interval = window.setInterval(() => {
      tick += 1;
      // Stop one step short so the final frame is the Home slide, not a wrap.
      if (tick >= count) {
        window.clearInterval(interval);
        return;
      }
      setIndex(tick % count);
    }, step);

    const stop = window.setTimeout(() => {
      window.clearInterval(interval);
      setSpinning(false);
      lockedRef.current = true;
      justLockedRef.current = true;
      setIndex(0);
    }, HERO_ROTATION_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, [count]);

  // Keep the scroll position in sync while the intro (or a dot press) drives the index.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    // Suppress the scroll handler while we move the track ourselves, otherwise
    // it races the animation and snaps the index back.
    programmaticRef.current = true;
    const left = child.offsetLeft - track.offsetLeft;
    // The intro and the final lock jump instantly; only user-driven dot presses
    // animate. A smooth scroll here would emit scroll events for hundreds of ms
    // and let the handler hijack the index mid-flight.
    const smooth = lockedRef.current && !justLockedRef.current;
    track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    justLockedRef.current = false;

    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(
      () => {
        programmaticRef.current = false;
      },
      smooth ? 520 : 80,
    );
  }, [index, spinning]);

  // After lock, the user owns the carousel: reflect manual swipes in the dots.
  const onScroll = () => {
    if (programmaticRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth || 1;
    const next = Math.round(track.scrollLeft / width);
    if (next !== index && next >= 0 && next < count) setIndex(next);
  };

  return (
    <section className="hero-shell" aria-label="Featured vehicles">
      <div
        ref={trackRef}
        className={spinning ? "hero-track is-spinning" : "hero-track"}
        onScroll={onScroll}
        aria-live="polite"
      >
        {slides.slice(0, count).map((listing, slot) => (
          <article className="hero-slide" key={`${listing.id}-${slot}`} aria-hidden={slot !== index}>
            <div className="hero-top">
              <p className="eyebrow">MOTORA INDIA | V1.0</p>
              <h1>Find your perfect ride</h1>
            </div>

            <div className="hero-stage">
              <img src={listing.image} alt={listing.name} draggable={false} />
              <span className="hero-tag">
                <b>{listing.name}</b>
                <small>{listing.price}</small>
              </span>
            </div>

            <div className="hero-bottom">
              <p className="hero-sub">Cars, Bikes, &amp; More. All in one place.</p>
              <button type="button" className="hero-cta" onClick={() => onOpen(listing)}>
                View details
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hero-dots" role="tablist" aria-label="Featured slots">
        {Array.from({ length: count }).map((_, slot) => (
          <button
            type="button"
            role="tab"
            key={slot}
            aria-selected={slot === index}
            aria-label={`Featured slot ${slot + 1}`}
            className={slot === index ? "active" : ""}
            onClick={() => {
              setSpinning(false);
              setIndex(slot);
            }}
          />
        ))}
      </div>
    </section>
  );
}
