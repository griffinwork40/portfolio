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
        // F5: whitespace-nowrap prevents internal wrapping; text-xs/px-1.5 at mobile
        // so long chips fit at 390px without overflowing the card
        'sketch-tag inline-flex items-center whitespace-nowrap px-1.5 py-0.5 text-xs font-sans -rotate-1 sm:px-2.5 sm:text-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
