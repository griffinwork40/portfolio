// The paper backdrop, drawn as two fixed layers behind all content:
//   1. the blue graph grid, and
//   2. decorative accents (a red notebook margin line + soft edge-darkening).
//
// The grid is a single composited position:fixed layer, held still by the
// compositor (translateZ(0)) so it reads as PINNED to the viewport with zero
// per-frame work — no scroll listener, no repaint, no lag behind iOS
// momentum-scroll. It carries an opaque cream background so the paper field is
// solid behind the page content.
//
// It deliberately does NOT try to fill the top notch / Dynamic Island: that
// strip is browser chrome painted from the theme-color meta (a solid color,
// never an image/pattern), so no page-level layer can put a grid there. It
// reads as solid cream by design. See the long note in globals.css.
export default function SiteBackground() {
  return (
    <>
      {/* Graph grid — a composited fixed layer (translateZ(0)) so it stays
          pinned with no scroll repaint. OVER-sized to 140vh from top:0 so it
          can only ever over-cover the visual viewport, never stop short. The
          opaque cream background gives the paper field a solid base. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[140vh]"
        style={{
          backgroundColor: 'var(--color-background)',
          backgroundImage:
            'linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px), linear-gradient(var(--color-grid-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-strong) 1px, transparent 1px)',
          backgroundSize: '26px 26px, 26px 26px, 130px 130px, 130px 130px',
          transform: 'translateZ(0)',
        }}
      />

      {/* Decorative accents, above the grid. translateZ(0) promotes this to its
          own compositor layer — matching the grid layer above. Without it, this
          fixed layer (a radial-gradient vignette) gets re-rasterized against the
          moving page on every scroll frame in iOS Safari, which reads as a faint
          continuous scroll stutter. Promoted, the compositor just holds it still
          with zero per-frame paint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 min-h-screen h-[100lvh] -z-10 overflow-hidden"
        style={{ transform: 'translateZ(0)' }}
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
