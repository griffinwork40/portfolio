// Graph-paper background: cream paper + faint blue grid + a red notebook margin line.
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* paper */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-background)' }} />

      {/* fine graph grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(color-mix(in srgb, var(--color-accent) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 7%, transparent) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      {/* heavier grid every ~130px */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(color-mix(in srgb, var(--color-accent) 12%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 12%, transparent) 1px, transparent 1px)',
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
