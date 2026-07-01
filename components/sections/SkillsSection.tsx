'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import { skills } from '@/data/content'
import { staggerContainer, fadeUp } from '@/lib/utils'

const categories = [
  { label: 'Languages', items: skills.languages, variant: 'accent' as const },
  { label: 'Frameworks & Runtimes', items: skills.frameworks, variant: 'mono' as const },
  { label: 'AI & Agents', items: skills.aiAndAgents, variant: 'accent' as const },
  { label: 'Data & Infrastructure', items: skills.dataAndInfra, variant: 'muted' as const },
]

export default function SkillsSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="skills" className="section-padding px-4" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeading id="skills-heading" index="03" subtitle="The stack behind the projects above.">
          Tools I build with
        </SectionHeading>
        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.label} variants={prefersReduced ? {} : fadeUp}>
              <h3 className="text-xs font-mono text-[--color-muted] uppercase tracking-widest mb-3">{cat.label}</h3>
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
