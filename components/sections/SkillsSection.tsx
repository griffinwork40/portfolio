'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import { skills } from '@/data/content'
import { cn, staggerContainer, fadeUp } from '@/lib/utils'

const categories = [
  { label: 'Languages', items: skills.languages, variant: 'accent' as const },
  { label: 'Frameworks & Runtimes', items: skills.frameworks, variant: 'mono' as const },
  { label: 'AI & Agents', items: skills.aiAndAgents, variant: 'accent' as const },
  { label: 'Data & Infrastructure', items: skills.dataAndInfra, variant: 'muted' as const },
]

// D8: per-card tilt values via arbitrary [rotate:] property (not rotate-[] which framer overrides)
const TILTS = ['[rotate:-1.6deg]', '[rotate:1.3deg]', '[rotate:1.1deg]', '[rotate:-1.5deg]']

export default function SkillsSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="skills" className="section-padding px-4" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeading id="skills-heading" index="03" subtitle="The stack behind the projects above.">
          Tools I build with
        </SectionHeading>
        {/* D8: gap-8, md:even:mt-6 stagger */}
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              variants={prefersReduced ? {} : fadeUp}
              className={cn(
                'glass p-5',
                // D8: local tilt via arbitrary rotate property
                TILTS[i % TILTS.length],
                // D8: even-index cards (0-based) stagger down at md
                i % 2 === 1 && 'md:mt-6',
              )}
            >
              {/* D8: category h3 in Caveat display, normal-case, no uppercase, normal tracking */}
              <h3 className="font-display text-2xl font-bold text-foreground normal-case tracking-normal mb-3">{cat.label}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <Badge key={skill} variant={cat.variant}>{skill}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
