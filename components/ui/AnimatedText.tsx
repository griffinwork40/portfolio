'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <span className={className}>{text}</span>
  }

  const words = text.split(' ')

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
