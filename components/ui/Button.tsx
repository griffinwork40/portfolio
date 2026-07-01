import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  href?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'sketch-btn bg-foreground text-background',
  secondary: 'sketch-btn bg-surface text-foreground',
  ghost:
    'text-foreground underline decoration-2 decoration-transparent underline-offset-4 hover:text-accent hover:decoration-accent',
}

export default function Button({ variant = 'primary', href, icon, children, className, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex min-h-[44px] items-center gap-1.5 px-5 py-3 font-display text-lg leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
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
