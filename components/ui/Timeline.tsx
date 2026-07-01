'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ExperienceEntry } from '@/data/content'
import { staggerContainer, fadeUp } from '@/lib/utils'

interface TimelineProps {
  entries: readonly ExperienceEntry[]
}

export default function Timeline({ entries }: TimelineProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className="relative space-y-10"
      variants={staggerContainer}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* dashed hand-drawn spine */}
      <div className="absolute left-3 top-2 bottom-2 border-l-2 border-dashed border-foreground opacity-50" aria-hidden="true" />

      {entries.map((entry) => (
        <motion.div key={entry.id} variants={prefersReduced ? {} : fadeUp} className="relative pl-10">
          {/* hand-drawn node */}
          <div
            className={cn(
              'absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-foreground bg-surface',
              entry.status === 'current' && 'border-accent',
            )}
            aria-hidden="true"
          >
            {entry.status === 'current' && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
          </div>

          <div className="glass p-6">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-2xl leading-none text-foreground">{entry.role}</h3>
                <p className="mt-1 text-sm text-muted">
                  {entry.companyUrl ? (
                    <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {entry.company}
                    </a>
                  ) : (
                    entry.company
                  )}
                  {' · '}
                  {entry.location}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-muted">{entry.period}</span>
                {/* Atlas Digital status: 'past' renders nothing; 'current' renders badge */}
                {entry.status === 'current' && (
                  <span className="sketch-tag px-2 py-0.5 font-display text-base text-accent">Current</span>
                )}
              </div>
            </div>
            {/* Bullets drawn verbatim from content.ts */}
            <ul className="space-y-2" role="list">
              {entry.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-[15px] leading-snug text-foreground">
                  <span className="mt-0.5 font-bold text-accent" aria-hidden="true">
                    ✓
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
