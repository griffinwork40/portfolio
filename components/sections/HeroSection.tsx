'use client'
import { motion, useReducedMotion } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'
import Button from '@/components/ui/Button'
import Polaroid from '@/components/ui/Polaroid'
import ContourField from '@/components/ui/ContourField'
import { identity } from '@/data/content'
import { fadeUp, staggerContainer } from '@/lib/utils'

export default function HeroSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="hero"
      // Sized in svh (small-viewport height) — a STABLE unit, so it does not
      // recompute as iOS Safari's URL bar shows/hides during scroll. Flipping
      // the hero to dvh (which resizes every URL-bar frame → reflows the page)
      // brought the scroll stutter back on-device, so we stay on a stable unit.
      // svh resolves to the toolbar-EXPANDED viewport, so the hero fits fully on
      // load with nothing hidden under the URL bar (lvh's one downside); the
      // only cost is a small gap at the very bottom once the toolbar retracts.
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-16 pt-8"
      aria-labelledby="hero-heading"
    >
      {/* signal over depth — a small signal, vast submerged structure */}
      <ContourField
        id="hero"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-[64%] opacity-40 sm:h-[660px] sm:w-[660px]"
      />
      {/* scope rule — one precise measure across the organic field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-6 hidden sm:block"
        style={{ color: 'var(--color-muted)', opacity: 0.5 }}
      >
        <svg width="88" height="34" viewBox="0 0 88 34" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 26 H86" />
          <path d="M2 21 V31 M23 23 V29 M44 21 V31 M65 23 V29 M86 21 V31" />
          <path d="M44 6 V26" strokeWidth="1.2" />
          <circle cx="44" cy="6" r="2.2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* "shipped it" stamp — desktop/tablet only. On phones it collided with
          the availability badge and its rotated right edge clipped off-screen
          (worse under iOS Safari's wider Caveat rendering), so it's gated to
          md+ where the hero has room for it. */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-16 top-28 rotate-[8deg] select-none border-[3px] border-accent-secondary px-4 py-1.5 font-display text-2xl font-bold tracking-wide text-accent-secondary opacity-80"
        style={{ borderRadius: '14px 8px 16px 8px / 8px 16px 8px 14px' }}
      >
        SHIPPED IT ✓
      </div>

      {/* taped snapshot in the corner (desktop only) */}
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute left-6 top-28 hidden w-[208px] lg:block xl:left-16"
      >
        <Polaroid
          src="/photos/memory-oom.webp"
          alt="A monitor mid-session showing the macOS 'your system has run out of application memory' dialog"
          caption="out of memory again"
          rotate={-6}
          width={500}
          height={460}
        />
      </motion.div>

      {/* Hero renders VISIBLE by default so it paints from static HTML — never
          gated behind JS hydration. On a slow phone, gating the hero on
          framer-motion left it blank for seconds. Below-the-fold sections keep
          their scroll-triggered (whileInView) reveals. */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={staggerContainer}
        initial="visible"
        animate="visible"
      >
        {/* availability tag */}
        <motion.div variants={prefersReduced ? {} : fadeUp} className="mb-8 flex justify-center">
          <span className="sketch-tag inline-flex -rotate-1 items-center gap-2 px-4 py-1.5 font-display text-lg text-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Available for new work
          </span>
        </motion.div>

        <motion.p variants={prefersReduced ? {} : fadeUp} className="mb-1 font-display text-2xl text-muted">
          {identity.greeting} <span className="inline-block">👋</span>
        </motion.p>

        <motion.h1
          id="hero-heading"
          variants={prefersReduced ? {} : fadeUp}
          className="font-display text-7xl font-bold leading-[0.85] text-foreground sm:text-8xl lg:text-9xl"
        >
          {identity.name}
        </motion.h1>

        {/* hand-drawn underline under the name */}
        <motion.svg
          variants={prefersReduced ? {} : fadeUp}
          className="mx-auto mt-2 h-4 w-[min(85%,460px)] text-accent"
          viewBox="0 0 400 16"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M4 9 C 90 3, 170 15, 250 7 S 360 4, 396 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </motion.svg>

        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          className="mx-auto mb-4 mt-7 max-w-2xl font-sans text-xl font-bold text-foreground sm:text-2xl"
        >
          <AnimatedText text={identity.hook} delay={0.3} />
        </motion.div>

        <motion.p
          variants={prefersReduced ? {} : fadeUp}
          className="mx-auto mb-12 max-w-xl font-sans text-lg leading-relaxed text-muted"
        >
          {identity.tagline}
        </motion.p>

        <motion.div
          variants={prefersReduced ? {} : fadeUp}
          className="relative flex flex-wrap items-center justify-center gap-4"
        >
          <Button href={`mailto:${identity.email}`} variant="primary">
            Get in touch →
          </Button>
          <Button href={identity.github} variant="secondary">
            GitHub
          </Button>
          <Button href={identity.agentAfkUrl} variant="ghost">
            agentafk.com
          </Button>
          <Button href={identity.graisolUrl} variant="ghost">
            graisol.com
          </Button>

          {/* doodle arrow + note pointing at the primary CTA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-2 hidden rotate-[-4deg] text-accent sm:block"
          >
            <span className="mb-1 ml-8 block font-display text-lg">say hi! :)</span>
            <svg className="h-14 w-16" viewBox="0 0 64 56" fill="none">
              <path d="M52 6 C 22 8, 12 26, 16 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M7 37 L16 50 L27 41" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-lg text-muted transition-colors hover:text-foreground"
      >
        <span className="flex flex-col items-center gap-0.5">
          scroll
          <span className="animate-bounce motion-reduce:animate-none">↓</span>
        </span>
      </a>
    </section>
  )
}
