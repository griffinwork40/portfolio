'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { contact } from '@/data/content'
import { cn, staggerContainer, fadeUp } from '@/lib/utils'

const socialLinks = [
  { label: 'GitHub', href: contact.github, display: 'github.com/griffinwork40' },
  { label: 'LinkedIn', href: contact.linkedin, display: 'linkedin.com/in/griffindev' },
  { label: 'Threads', href: contact.threads, display: 'threads.com/@griffinlong.dev' },
  { label: 'agent-afk', href: contact.agentAfk, display: 'agentafk.com' },
  { label: 'GRAIsol', href: contact.graisol, display: 'graisol.com' },
]

export default function ContactSection() {
  const prefersReduced = useReducedMotion()
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
    window.setTimeout(() => setCopyStatus('idle'), 1800)
  }

  return (
    <section id="contact" className="section-padding px-4" aria-labelledby="contact-heading">
      <div className="elevated-field max-w-3xl mx-auto text-center">
        <SectionHeading id="contact-heading" index="05" centered>
          Let’s talk
        </SectionHeading>
        <p className="text-center text-muted max-w-xl mx-auto -mt-6 mb-10 leading-relaxed">
          Open to agentic AI engineering, technical leadership, and contract or consulting work — email is the fastest way to reach me.
        </p>

        <motion.div
          className="glass tilt-a mx-auto mb-8 flex max-w-xl flex-col items-center gap-4 rounded-2xl p-5 text-center sm:p-6"
          variants={prefersReduced ? {} : fadeUp}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-muted">Email — fastest response</span>
            <a
              href={`mailto:${contact.email}`}
              className="break-all font-display text-3xl font-bold text-foreground transition-colors hover:text-accent focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:text-4xl"
            >
              {contact.email}
            </a>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            className="sketch-btn inline-flex min-h-[44px] items-center justify-center bg-foreground px-5 py-3 font-display text-lg leading-none text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copyStatus === 'copied' ? 'Copied email ✓' : 'Copy email'}
          </button>
          <span aria-live="polite" className="sr-only">
            {copyStatus === 'copied'
              ? 'Email address copied to clipboard'
              : copyStatus === 'failed'
                ? 'Email address could not be copied automatically; the address is visible above.'
                : ''}
          </span>
        </motion.div>

        <p className="mb-4 font-display text-lg text-muted">Elsewhere</p>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'glass flex min-h-11 flex-col gap-1 rounded-xl p-4 transition-colors group',
                i % 2 ? 'tilt-b' : 'tilt-a',
              )}
              variants={prefersReduced ? {} : fadeUp}
            >
              <span className="text-xs uppercase tracking-wider text-muted">{link.label}</span>
              <span className="text-sm text-foreground transition-colors group-hover:text-accent">
                {link.display}
              </span>
              <span className="sr-only"> (opens in new tab)</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
