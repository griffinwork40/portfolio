'use client'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { contact } from '@/data/content'
import { staggerContainer, fadeUp } from '@/lib/utils'

const contactLinks = [
  { label: 'Email', href: `mailto:${contact.email}`, display: contact.email },
  { label: 'GitHub', href: contact.github, display: 'github.com/griffinwork40' },
  { label: 'LinkedIn', href: contact.linkedin, display: 'linkedin.com/in/griffindev' },
  { label: 'agent-afk', href: contact.agentAfk, display: 'agentafk.com' },
  { label: 'GRAIsol', href: contact.graisol, display: 'graisol.com' },
]

export default function ContactSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="contact" className="section-padding px-4" aria-labelledby="contact-heading">
      <div className="elevated-field max-w-3xl mx-auto text-center">
        <SectionHeading id="contact-heading" index="05" centered>
          Let’s talk
        </SectionHeading>
        <p className="text-center text-muted max-w-xl mx-auto -mt-6 mb-10 leading-relaxed">
          Open to agentic AI engineering, technical leadership, and contract or consulting work — the fastest way to reach me is email.
        </p>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`glass rounded-xl p-4 flex flex-col gap-1 hover:border-accent/30 transition-colors group ${i % 2 ? 'tilt-b' : 'tilt-a'}`}
              variants={prefersReduced ? {} : fadeUp}
            >
              <span className="text-xs text-muted uppercase tracking-wider">{link.label}</span>
              <span className="text-foreground text-sm group-hover:text-accent transition-colors">{link.display}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
