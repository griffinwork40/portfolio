interface AnimatedTextProps {
  text: string
  className?: string
  /** kept for API compatibility; entrance is now instant so the hero hook
      paints from static HTML instead of being gated behind JS hydration. */
  delay?: number
}

// The per-word framer-motion reveal kept the hero hook invisible (opacity:0)
// until React hydrated — the main reason the hero "loaded slowly" on real
// phones. Render the text immediately; the flourish isn't worth a blank hero.
export default function AnimatedText({ text, className }: AnimatedTextProps) {
  return <span className={className}>{text}</span>
}
