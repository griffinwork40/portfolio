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
      <div className="max-w-6xl mx-auto">
        {/* D1: reading measure on inner max-w-3xl (no mx-auto) */}
        <div className="max-w-3xl">
          <SectionHeading
            id="about-heading"
            index="01"
            subtitle="How a line cook ended up building AI agent systems."
          >
            My story
          </SectionHeading>
        </div>

        {/* D1: at lg two columns — prose left, doodle + polaroids right; below lg keep round-1 layout */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:items-start">
          {/* prose column */}
          <motion.div
            className="space-y-5 max-w-3xl"
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
                    ? 'text-lg sm:text-xl text-foreground leading-relaxed'
                    : 'text-base sm:text-lg text-muted leading-relaxed'
                }
              >
                {i === 0 ? (
                  <>
                    <span className="marker">I didn&rsquo;t take the traditional route</span>
                    {paragraph.slice('I didn\u2019t take the traditional route'.length)}
                  </>
                ) : paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* right column — desktop: doodle label + stacked polaroids; mobile: hidden here, shown below */}
          <motion.div
            className="hidden lg:block"
            variants={prefersReduced ? {} : fadeUp}
            initial={prefersReduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div aria-hidden="true" className="mb-3 flex items-end gap-2 text-accent">
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
            <Polaroid
              src="/photos/desk-night.webp"
              alt="Dual monitors glowing in a dim room — the workspace where the agent tooling gets built"
              caption="where the work happens"
              rotate={-3}
              className="w-full max-w-[280px]"
              captionClassName="text-base sm:text-xl"
            />
            <Polaroid
              src="/photos/desk-mess.webp"
              alt="A desk lit by a monitor at night — notes and papers scattered across it, mid-build"
              caption="deep in it"
              rotate={2}
              width={640}
              height={854}
              className="mt-6 ml-10 w-full max-w-[280px]"
              captionClassName="text-base sm:text-xl"
            />
          </motion.div>
        </div>

        {/* mobile / below-lg: round-1 layout — doodle label + side-by-side polaroids under prose */}
        <motion.div
          className="mt-14 lg:hidden"
          variants={prefersReduced ? {} : fadeUp}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div aria-hidden="true" className="mb-3 flex items-end gap-2 text-accent">
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

          <div className="flex flex-nowrap justify-center gap-3 sm:flex-wrap sm:gap-8 sm:justify-start">
            <Polaroid
              src="/photos/desk-night.webp"
              alt="Dual monitors glowing in a dim room — the workspace where the agent tooling gets built"
              caption="where the work happens"
              rotate={-3}
              className="w-[min(42vw,320px)]"
              captionClassName="text-base sm:text-xl"
            />
            <Polaroid
              src="/photos/desk-mess.webp"
              alt="A desk lit by a monitor at night — notes and papers scattered across it, mid-build"
              caption="deep in it"
              rotate={2}
              width={640}
              height={854}
              className="mt-6 w-[min(42vw,320px)]"
              captionClassName="text-base sm:text-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
