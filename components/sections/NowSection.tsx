'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import SubstackEmbed from '@/components/ui/SubstackEmbed'
import { now } from '@/data/content'
import { staggerContainer, fadeUp } from '@/lib/utils'

export default function NowSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="now" className="section-padding px-4" aria-labelledby="now-heading">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          id="now-heading"
          index="05"
          subtitle={`Last updated ${now.updated}.`}
        >
          Right now
        </SectionHeading>

        <div className="glass p-5 tilt-a">
          <motion.ul
            className="space-y-4"
            variants={staggerContainer}
            initial={prefersReduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {now.items.map((item) => (
              <motion.li
                key={item.text}
                variants={prefersReduced ? {} : fadeUp}
                className="flex items-start gap-3 text-base sm:text-lg leading-relaxed"
              >
                {/* hand-drawn bullet dot */}
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                />
                {'link' in item && item.link ? (
                  <a
                    href={item.link}
                    {...(item.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {item.text}
                    {item.link.startsWith('http') && (
                      <span className="sr-only"> (opens in new tab)</span>
                    )}
                  </a>
                ) : (
                  <span className="text-muted">{item.text}</span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Substack subscribe card */}
        <motion.div
          className="glass tilt-a mt-10 rounded-2xl p-5 text-center sm:p-6"
          variants={prefersReduced ? {} : fadeUp}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="mb-1 font-display text-xl text-foreground">
            The Goblin Files
          </p>
          <p className="mb-4 text-sm text-muted">
            Beachy code goblin building shit in Daytona. Subscribe on Substack.
          </p>
          <SubstackEmbed />
        </motion.div>
      </div>
    </section>
  )
}
