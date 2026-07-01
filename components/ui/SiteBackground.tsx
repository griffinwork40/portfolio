// Graph-paper background: cream paper + faint blue grid + a red notebook margin line.
export default function SiteBackground() {
  return (
    // fixed layer anchored at the top edge. Height is the LARGE viewport (100lvh,
    // with 100vh fallback) rather than `inset-0`: an inset-0 fixed element is sized
    // to iOS Safari's *initial* (toolbar-visible) viewport, so when the bottom
    // toolbar retracts the newly revealed strip is left uncovered and the body's
    // cream canvas bleeds through below the grid. Sizing to 100lvh spans the tallest
    // viewport, so the grid always reaches the bottom regardless of toolbar state.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 min-h-screen h-[100lvh] -z-10 overflow-hidden"
    >
      {/* paper */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-background)' }} />

      {/* fine graph grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      {/* heavier grid every ~130px */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-grid-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-strong) 1px, transparent 1px)',
          backgroundSize: '130px 130px',
        }}
      />

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
  )
}
