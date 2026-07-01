'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={cn('glass p-6', className)}
      whileHover={hover && !prefersReduced ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
