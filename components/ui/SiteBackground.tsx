// Background accents drawn over the graph grid. The cream paper + blue graph
// grid now live on the <html> root (see globals.css) so they paint across the
// full canvas — including behind iOS Safari's toolbars — in every toolbar
// state. This fixed layer adds only the decorative accents: a red notebook
// margin line and a soft edge-darkening so the paper feels physical.
export default function SiteBackground() {
  return (
    // fixed layer anchored at the top edge. Height is the LARGE viewport (100lvh,
    // with 100vh fallback). The grid no longer lives here, so if this overlay
    // stops short of the bottom on iOS Safari (toolbar visible) it only means an
    // accent falls off the bottom edge — the grid itself, on <html>, still fills.
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
  )
}
