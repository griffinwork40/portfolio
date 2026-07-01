import { cn } from '@/lib/utils'

type BadgeVariant = 'accent' | 'mono' | 'muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

// Border follows text color via currentColor (see .sketch-tag), so each
// variant only needs to set its text colour.
const variants: Record<BadgeVariant, string> = {
  accent: 'text-accent',
  mono: 'text-foreground',
  muted: 'text-muted',
}

export default function Badge({ children, variant = 'muted', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'sketch-tag inline-flex items-center px-2.5 py-0.5 text-sm font-sans -rotate-1',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
