// signal-field — a small signal (node) over vast submerged structure (contours).
// Keep the hero decoration cheap while scrolling: these rings used to be warped
// with an SVG turbulence/displacement filter, but that forces browsers to
// rasterize a large filtered layer as the hero leaves the viewport. Slightly
// broken strokes preserve the hand-drawn/read-as-topography feel without a
// runtime filter in the scroll path.
type ContourFieldProps = {
  className?: string
  node?: boolean
}

const RINGS = [
  { r: 26, dash: '118 13 18 9', offset: 0 },
  { r: 52, dash: '184 18 28 12', offset: -12 },
  { r: 82, dash: '240 22 38 14', offset: 17 },
  { r: 116, dash: '292 28 46 18', offset: -24 },
  { r: 152, dash: '348 32 58 20', offset: 31 },
  { r: 186, dash: '410 36 68 24', offset: -38 },
  { r: 214, dash: '468 42 76 28', offset: 45 },
]

export default function ContourField({ className = '', node = true }: ContourFieldProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 440 440" fill="none" className={className}>
      <g className="contour-field" stroke="var(--color-contour)" strokeWidth="1.15" strokeLinecap="round">
        {RINGS.map(({ r, dash, offset }, i) => (
          <circle
            key={r}
            cx="220"
            cy="220"
            r={r}
            strokeDasharray={dash}
            strokeDashoffset={offset}
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
