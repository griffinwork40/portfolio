// signal-field — a small signal (node) over vast submerged structure (contours).
// The rings are intentionally drawn with plain SVG ellipses instead of SVG
// turbulence/displacement filters. Filtered SVGs are expensive to rasterize while
// the hero scrolls away, so the handmade feel comes from slight ellipse offsets,
// rotations, and opacity changes that stay cheap for the compositor.
type ContourFieldProps = {
  /** stable identifier retained for API compatibility */
  id?: string
  className?: string
  node?: boolean
}

const RINGS = [
  { radius: 26, stretch: 1.1, squish: 0.92, rotation: -8 },
  { radius: 52, stretch: 0.96, squish: 1.05, rotation: 11 },
  { radius: 82, stretch: 1.06, squish: 0.97, rotation: -5 },
  { radius: 116, stretch: 0.98, squish: 1.04, rotation: 7 },
  { radius: 152, stretch: 1.04, squish: 0.98, rotation: -11 },
  { radius: 186, stretch: 0.97, squish: 1.03, rotation: 4 },
  { radius: 214, stretch: 1.02, squish: 0.99, rotation: -3 },
]

export default function ContourField({ className = '', node = true }: ContourFieldProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 440 440" fill="none" className={className}>
      <g className="contour-field" stroke="var(--color-contour)" strokeWidth="1.15">
        {RINGS.map(({ radius, stretch, squish, rotation }, i) => (
          <ellipse
            key={radius}
            cx="220"
            cy="220"
            rx={radius * stretch}
            ry={radius * squish}
            transform={`rotate(${rotation} 220 220)`}
            style={{ opacity: 0.94 - i * 0.1 }}
          />
        ))}
      </g>
      {node && (
        <>
          <circle cx="220" cy="220" r="6" fill="none" stroke="var(--color-accent-secondary)" strokeWidth="1.2" style={{ opacity: 0.4 }} />
          <circle cx="220" cy="220" r="2.6" fill="var(--color-accent-secondary)" style={{ opacity: 0.85 }} />
        </>
      )}
    </svg>
  )
}
