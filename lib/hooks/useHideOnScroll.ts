import { useEffect, useRef, useState } from 'react';

export interface UseHideOnScrollOptions {
  /** Master switch. When false the hook installs no listener and always
   *  reports visible — lets a shared component opt in per-page. Default true. */
  enabled?: boolean;
  /** Always reveal while scrollY is within this many px of the document top.
   *  Default 64 (≈ the header height). */
  topZone?: number;
  /** Ignore direction changes smaller than this (px) to damp trackpad /
   *  momentum jitter; sub-threshold deltas accumulate until they cross it.
   *  Default 6. */
  delta?: number;
}

/**
 * Returns `hidden` — true when the top bar should visually retract.
 * Hides on scroll-down, reveals on scroll-up, always reveals within
 * `topZone` px of the top. Ported from agentafk-landing lib/hooks/useHideOnScroll.ts.
 *
 * Invariant: first render is always hidden===false (SSR-safe, no hydration mismatch).
 * Scroll reads coalesced into one rAF per burst; listener is passive.
 */
export function useHideOnScroll(options: UseHideOnScrollOptions = {}): boolean {
  const { enabled = true, topZone = 64, delta = 6 } = options;
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return;
    }

    lastY.current = Math.max(0, window.scrollY);
    let frame = 0;
    let scheduled = false;

    const evaluate = () => {
      scheduled = false;
      frame = 0;
      // Clamp elastic/rubber-band overscroll (iOS reports negative scrollY).
      const currentY = Math.max(0, window.scrollY);

      if (currentY <= topZone) {
        setHidden(false);
        lastY.current = currentY;
        return;
      }

      const diff = currentY - lastY.current;
      if (Math.abs(diff) < delta) return; // jitter guard

      setHidden(diff > 0); // down → hide, up → show
      lastY.current = currentY;
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      frame = window.requestAnimationFrame(evaluate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, topZone, delta]);

  return hidden;
}
