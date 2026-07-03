// signal-field — a small signal (node) over vast submerged structure (contours).
// Hand-drawn topographic rings: feTurbulence gives the ink an excavated wobble,
// so it reads as elevation lines drawn by hand, not a generic glow.
type ContourFieldProps = {
  /** unique id so multiple instances don't share a filter */
  id?: string
  className?: string
  node?: boolean
}

const RINGS = [26, 52, 82, 116, 152, 186, 214]

export default function ContourField({ id = 'cf', className = '', node = true }: ContourFieldProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 440 440" fill="none" className={className}>
      <defs>
        <filter id={`${id}-jitter`} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" />
        </filter>
      </defs>
      <g
        className="contour-field"
        filter={`url(#${id}-jitter)`}
        stroke="var(--color-contour)"
        strokeWidth="1.15"
      >
        {RINGS.map((r, i) => (
          <circle key={r} cx="220" cy="220" r={r} style={{ opacity: 0.94 - i * 0.1 }} />
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
