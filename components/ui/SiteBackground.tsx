// The paper backdrop, drawn as two fixed layers behind all content:
//   1. the blue graph grid, and
//   2. decorative accents (a red notebook margin line + soft edge-darkening).
// The cream paper itself lives on the <html> root (see globals.css) so it
// backstops the full scroll canvas and iOS 26 Safari can sample it for toolbar
// chrome. Both layers here are position:fixed, so the compositor holds them
// still while the page scrolls over them — the grid reads as pinned to the
// viewport with zero per-frame work (no scroll listener, no repaint, no lag
// behind iOS momentum-scroll).
export default function SiteBackground() {
  return (
    <>
      {/* Graph grid — a composited fixed layer so the grid keeps its pinned
          scroll feel. The layer deliberately over-covers the visual viewport and
          is expanded through iOS safe-area insets; this preserves fixed-grid
          behavior while preventing cream-only strips around the Dynamic Island
          or bottom toolbar when Safari clips the layout viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 -z-10"
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) * -1)',
          height: 'calc(140lvh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))',
          backgroundImage:
            'linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px), linear-gradient(var(--color-grid-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-strong) 1px, transparent 1px)',
          backgroundSize: '26px 26px, 26px 26px, 130px 130px, 130px 130px',
          transform: 'translateZ(0)',
        }}
      />

      {/* Decorative accents, above the grid. They share the same safe-area
          over-cover strategy so the margin line and vignette fail by clipping
          off-screen, not by stopping short inside Safari chrome.
          translateZ(0) promotes this to its own compositor layer — matching the
          grid layer above. Without it, this fixed layer (a radial-gradient
          vignette) gets re-rasterized against the moving page on every scroll
          frame in iOS Safari, which reads as a faint continuous scroll stutter.
          Promoted, the compositor just holds it still with zero per-frame paint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 -z-10 overflow-hidden"
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) * -1)',
          height: 'calc(100lvh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))',
          transform: 'translateZ(0)',
        }}
      >
        {/* red notebook margin line */}
        <div
          className="absolute bottom-0 left-14 top-0 w-px sm:left-20"
          style={{ background: 'color-mix(in srgb, var(--color-accent-secondary) 28%, transparent)' }}
        />

        {/* soft edge darkening so the paper feels physical */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 92% 82% at 50% 40%, transparent 62%, color-mix(in srgb, var(--color-foreground) 6%, transparent) 100%)',
          }}
        />
      </div>
    </>
  )
}
