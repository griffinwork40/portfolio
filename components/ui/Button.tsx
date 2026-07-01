'use client'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'sketch-btn bg-[--color-text] text-[--color-bg]',
  secondary: 'sketch-btn bg-[--color-surface] text-[--color-text]',
  ghost:
    'text-[--color-text] underline decoration-2 decoration-transparent underline-offset-4 hover:text-[--color-accent] hover:decoration-[--color-accent]',
}

export default function Button({ variant = 'primary', href, icon, children, className, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center gap-1.5 px-5 py-2 font-display text-lg leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-accent]',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  )
}
