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
      {/* Graph grid — a composited fixed layer, anchored at the top and
          deliberately OVER-sized (140vh). Earlier attempts sized the grid layer
          to exactly one viewport and fell short in the opposite toolbar state on
          iOS Safari: inset-0 left a gap at the bottom when the toolbar retracted,
          and 100lvh left a gap when the toolbar was visible. Anchoring at top:0
          and running well past the tallest possible viewport means it can only
          ever OVER-cover — the grid always reaches past the visible bottom in
          every toolbar state, and the surplus is simply clipped off-screen.
          translateZ(0) pins it to its own GPU layer so scrolling never repaints
          it. Transparent background: the cream shows through from <html>. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[140vh]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px), linear-gradient(var(--color-grid-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-strong) 1px, transparent 1px)',
          backgroundSize: '26px 26px, 26px 26px, 130px 130px, 130px 130px',
          transform: 'translateZ(0)',
        }}
      />

      {/* Decorative accents, above the grid. Sized to the large viewport (100lvh,
          100vh fallback); if this stops short at the very bottom on iOS Safari
          it only means an accent falls off the edge — the grid layer above still
          fills, and the cream on <html> backstops everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 min-h-screen h-[100lvh] -z-10 overflow-hidden"
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
