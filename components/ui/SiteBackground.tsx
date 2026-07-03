// The paper backdrop, drawn as two layers:
//   1. the blue graph grid on <html> (see globals.css), so iOS Safari paints it
//      into safe-area/toolbar overscroll regions above the Dynamic Island and
//      below the footer, and
//   2. decorative accents here (a red notebook margin line + soft edge-darkening).
// Keeping the grid on the root avoids the fixed-layer safe-area holes that show
// up when iOS clips position:fixed descendants during toolbar transitions.
export default function SiteBackground() {
  return (
    <>
      {/* Decorative accents, above the root-painted grid. Sized to the large
          viewport (100lvh, 100vh fallback); if this stops short at the very
          bottom on iOS Safari it only means an accent falls off the edge — the
          grid and cream on <html> backstop everything. */}
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
