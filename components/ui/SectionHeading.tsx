import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  subtitle?: string
  className?: string
  id?: string
  index?: string
  centered?: boolean
}

export default function SectionHeading({
  children,
  subtitle,
  className,
  id,
  index,
  centered,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {index && (
        <span className={cn('mb-1 flex items-center gap-2', centered && 'justify-center')}>
          {/* scope-rule: a crisp measure crossing the organic field */}
          <svg
            aria-hidden="true"
            width="26"
            height="12"
            viewBox="0 0 26 12"
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="1"
            className="opacity-60"
          >
            <path d="M1 6 H25" />
            <path d="M1 3 V9 M9 4.5 V7.5 M17 4.5 V7.5 M25 3 V9" />
          </svg>
          <span className="-rotate-2 font-display text-2xl text-[--color-accent]">#{index}</span>
        </span>
      )}
      <h2 id={id} className="font-display text-5xl font-bold leading-[0.9] text-[--color-text] sm:text-6xl">
        {children}
      </h2>
      {/* hand-drawn marker underline */}
      <svg
        className={cn('mt-1 h-3 w-52 text-[--color-accent]', centered && 'mx-auto')}
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M2 7 C 40 2, 80 11, 120 5 S 180 3, 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {subtitle && (
        <p className={cn('mt-4 font-sans text-lg text-[--color-muted]', centered ? 'mx-auto max-w-2xl' : 'max-w-2xl')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
