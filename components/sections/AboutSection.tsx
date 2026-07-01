'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import Polaroid from '@/components/ui/Polaroid'
import { about } from '@/data/content'
import { staggerContainer, fadeUp } from '@/lib/utils'

export default function AboutSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="about" className="section-padding px-4" aria-labelledby="about-heading">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          id="about-heading"
          index="01"
          subtitle="How a line cook ended up building AI agent systems."
        >
          My story
        </SectionHeading>

        <motion.div
          className="space-y-5"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {about.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={prefersReduced ? {} : fadeUp}
              className={
                i === 0
                  ? 'text-lg sm:text-xl text-[--color-text] leading-relaxed'
                  : 'text-base sm:text-lg text-[--color-muted] leading-relaxed'
              }
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* taped snapshots of the real workspace — pinned into the sketchbook */}
        <motion.div
          className="mt-14"
          variants={prefersReduced ? {} : fadeUp}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* hand-drawn label + arrow pointing at the photos */}
          <div aria-hidden="true" className="mb-3 flex items-end gap-2 text-[--color-accent]">
            <span className="-rotate-2 font-display text-xl">real desk, real mess :)</span>
            <svg className="h-10 w-12 shrink-0" viewBox="0 0 48 40" fill="none">
              <path
                d="M6 5 C 22 9, 32 20, 27 36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M17 27 L27 38 L37 29"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
            <Polaroid
              src="/photos/desk-night.jpg"
              alt="Dual monitors glowing in a dim room — the workspace where the agent tooling gets built"
              caption="where the work happens"
              rotate={-3}
              className="w-[min(78vw,320px)]"
            />
            <Polaroid
              src="/photos/desk-mess.jpg"
              alt="A desk lit by a monitor at night — notes and papers scattered across it, mid-build"
              caption="deep in it"
              rotate={2}
              width={1200}
              height={1600}
              className="mt-6 w-[min(78vw,320px)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
