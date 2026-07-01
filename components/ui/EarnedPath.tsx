'use client'
import { motion, useReducedMotion } from 'framer-motion'

// earned-path — repeated pencil passes compressing into one confident inked route.
// emerge: signal begins its descent · compress: passes converge · arrive: route resolves into a node.
type Stage = 'emerge' | 'compress' | 'arrive'

const INK = 'M30 6 C 25 42, 35 78, 30 116'

const PASSES: Record<Stage, string[]> = {
  emerge: ['M30 8 C 23 40, 27 80, 30 116', 'M30 8 C 37 40, 33 82, 30 116'],
  compress: [
    'M16 8 C 22 46, 30 82, 30 116',
    'M44 8 C 38 46, 30 82, 30 116',
    'M30 6 C 24 52, 36 84, 30 116',
  ],
  arrive: ['M30 10 C 27 48, 33 82, 30 114'],
}

export default function EarnedPath({
  stage = 'compress',
  className = '',
}: {
  stage?: Stage
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className={`flex justify-center ${className}`}>
      <svg width="60" height="122" viewBox="0 0 60 122" fill="none">
        {/* faint pencil passes — the repeated attempts */}
        {PASSES[stage].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="var(--color-route)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ opacity: 0.45 }}
          />
        ))}
        {/* the earned route — inked, revealed on scroll */}
        <motion.path
          d={INK}
          stroke="var(--color-foreground)"
          strokeWidth="2.25"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
        {stage === 'emerge' && <circle cx="30" cy="8" r="3" fill="var(--color-accent-secondary)" style={{ opacity: 0.75 }} />}
        {stage === 'arrive' && <circle cx="30" cy="116" r="4.5" fill="var(--color-accent-secondary)" />}
      </svg>
    </div>
  )
}
