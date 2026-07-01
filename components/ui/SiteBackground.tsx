// Graph-paper background: cream paper + faint blue grid + a red notebook margin line.
export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* paper */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-bg)' }} />

      {/* fine graph grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(47,90,168,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(47,90,168,0.07) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      {/* heavier grid every ~130px */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(47,90,168,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(47,90,168,0.12) 1px, transparent 1px)',
          backgroundSize: '130px 130px',
        }}
      />

      {/* red notebook margin line */}
      <div className="absolute bottom-0 left-14 top-0 w-px sm:left-20" style={{ background: 'rgba(192,69,47,0.28)' }} />

      {/* soft edge darkening so the paper feels physical */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 92% 82% at 50% 40%, transparent 62%, rgba(43,42,38,0.06) 100%)' }}
      />
    </div>
  )
}
