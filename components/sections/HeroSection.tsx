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
      // D9: min-h-[calc(100svh-4.5rem)] so scroll cue sits above 1280x800 fold
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden px-4 pb-32 pt-8 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Height uses svh (static), not dvh (dynamic): dvh recomputes as the mobile
          URL bar collapses on first scroll, reflowing the hero every frame and
          producing the visible scroll jank/bounce. svh stays pinned to the
          bar-visible height — the tiny bottom gap when the bar hides is the trade
          for a rock-steady hero. Do not revert to dvh. */}
      {/* D5: ContourField node={false} — EarnedPath already draws the coral start node */}
      <ContourField
        id="hero"
        node={false}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-[64%] opacity-40 sm:h-[660px] sm:w-[660px]"
      />
      {/* scope rule — one precise measure across the organic field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-6 hidden sm:block"
        style={{ color: 'var(--color-muted)', opacity: 0.5 }}
      >
        <svg
          width="88"
          height="34"
          viewBox="0 0 88 34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
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
        className="hidden sm:block absolute right-6 md:right-16 top-28 rotate-[8deg] select-none border-[3px] border-accent-secondary px-3 py-1 sm:px-4 sm:py-1.5 font-display text-xl md:text-2xl font-bold tracking-wide text-accent-secondary opacity-80 dark:opacity-100"
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
          src="/photos/griffin.webp"
          alt="Griffin Long outdoors at golden hour, backwards cap, calm expression"
          caption="hey hey!"
          rotate={-6}
          width={1000}
          height={750}
          priority
        />
      </motion.div>

      {/* Content group, centered in the space ABOVE the bottom-left corner links. */}
      <div className="flex w-full flex-1 items-center justify-center">
        <motion.div
          className="relative z-10 mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {/* availability first, proof second */}
          <motion.div
            variants={prefersReduced ? {} : fadeUp}
            className="mb-5 flex flex-col items-center justify-center gap-1.5 sm:mb-8 sm:gap-2"
          >
            <span
              role="status"
              aria-label="Available for new work"
              className="sketch-tag inline-flex -rotate-1 items-center gap-2 px-3 py-1 font-display text-base text-foreground sm:px-4 sm:py-1.5 sm:text-lg"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-available opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-status-available" />
              </span>
              Available for new work
            </span>
            <span className="inline-flex rotate-[-1deg] items-center font-display text-base leading-none text-muted sm:text-lg">
              {identity.heroStat}
            </span>
          </motion.div>

          <motion.p
            variants={prefersReduced ? {} : fadeUp}
            className="mb-1 font-display text-2xl text-muted"
          >
            {identity.greeting} <span className="inline-block">👋</span>
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={prefersReduced ? {} : fadeUp}
            className="font-display text-6xl font-bold leading-[0.85] text-foreground sm:text-8xl lg:text-9xl"
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
            <motion.path
              d="M4 9 C 90 3, 170 15, 250 7 S 360 4, 396 11"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 1.1, ease: 'easeInOut' }}
            />
          </motion.svg>

          <motion.p
            variants={prefersReduced ? {} : fadeUp}
            className="mt-2 font-display text-lg text-muted sm:mt-3 sm:text-2xl"
          >
            {identity.title.replace(' | ', ' · ')}
          </motion.p>

          <motion.div
            variants={prefersReduced ? {} : fadeUp}
            className="mx-auto mb-3 mt-3 max-w-2xl font-sans text-xl font-bold text-foreground sm:mb-4 sm:mt-5 sm:text-2xl"
          >
            <AnimatedText text={identity.hook} delay={0.3} />
          </motion.div>

          <motion.p
            variants={prefersReduced ? {} : fadeUp}
            className="mx-auto mb-5 max-w-xl font-sans text-base leading-relaxed text-muted sm:mb-8 sm:text-lg"
          >
            {identity.tagline}
          </motion.p>

          {/* D4: primary actions centered; ElsewhereNav absolutely positioned to the right */}
          <motion.div
            variants={prefersReduced ? {} : fadeUp}
            className="flex flex-col items-center gap-6 sm:block"
          >
            {/* primary-actions wrapper: relative so ElsewhereNav can anchor to it */}
            <div className="relative inline-flex flex-wrap items-center justify-center gap-4">
              <Button href={`mailto:${identity.email}`} variant="primary" className="px-7 py-3.5 text-xl">
                Get in touch →
              </Button>
              <Button href={identity.github} variant="secondary">
                GitHub
              </Button>

              {/* D4: desktop ElsewhereNav — absolute right of primary buttons */}
              <ElsewhereNav className="hidden sm:flex absolute left-[calc(100%+1.75rem)] top-1/2 -translate-y-1/2 flex-col items-start gap-0 border-l border-dashed border-divider pl-6" />

              {/* D4: "say hi" doodle re-anchored left of this wrapper, pointing at Get in touch */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[calc(100%+1rem)] top-0 hidden -rotate-[4deg] text-accent sm:block"
              >
                <svg className="h-14 w-16" viewBox="0 0 64 56" fill="none">
                  <path
                    d="M6 44 C 18 20, 36 14, 59 22"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M49 12 L60 22 L47 29"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="-mt-1 block font-display text-lg">say hi! :)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* mobile: "elsewhere" parked in the hero's bottom-left corner */}
      <ElsewhereNav className="relative z-10 mb-2 ml-1 mt-5 flex flex-col items-start gap-0.5 self-start border-r border-dashed border-divider pr-5 sm:hidden" />

      {/* D9: hand-drawn scroll cue — Caveat label + wobbly arrow SVG with pathLength animation */}
      <ScrollCue prefersReduced={prefersReduced ?? false} />
    </section>
  )
}

/** D9: Hand-drawn scroll cue. No <rect>/<line>. Stem pathLength 0→1 on mount.
 *  Gentle y-bob on wrapper only when !prefersReduced, static otherwise. */
function ScrollCue({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <a
      href="#about"
      aria-label="Scroll to About"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted transition-colors hover:text-foreground"
    >
      <span className="font-display text-lg text-muted -rotate-3 leading-none">scroll</span>
      <motion.div
        animate={prefersReduced ? {} : { y: [0, 4, 0] }}
        transition={prefersReduced ? {} : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="h-10 w-6"
          viewBox="0 0 24 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* wobbly stem: M12 2 C 8 12, 16 21, 11 33 */}
          <motion.path
            d="M12 2 C 8 12, 16 21, 11 33"
            initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }}
          />
          {/* arrowhead */}
          <path d="M5 26 L11 34 L18 27" />
        </svg>
      </motion.div>
      <span className="sr-only">scroll down</span>
    </a>
  )
}

/** The "elsewhere" link stack. Rendered twice — desktop absolute side stack and mobile bottom-left.
 *  Only one instance is ever displayed at a given breakpoint. */
function ElsewhereNav({ className }: { className: string }) {
  return (
    <nav aria-label="Find me elsewhere" className={className}>
      <span aria-hidden="true" className="font-display text-sm leading-none text-muted">
        elsewhere
      </span>
      {/* D4: tighter ghost buttons on sm+ — sm:min-h-0 sm:py-1; >=44px on mobile */}
      <Button href={identity.agentAfkUrl} variant="ghost" className="px-0 sm:min-h-0 sm:py-1">
        <span className="text-base">agentafk.com</span>
      </Button>
      <Button href={identity.graisolUrl} variant="ghost" className="px-0 sm:min-h-0 sm:py-1">
        <span className="text-base">graisol.com</span>
      </Button>
    </nav>
  )
}
