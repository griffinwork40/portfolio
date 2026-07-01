'use client'
// MetricBadge renders a metric value + qualifier as an inseparable unit.
// NEVER render SWE-bench numbers without the qualifier — this component enforces that structurally.
import { cn } from '@/lib/utils'

interface MetricBadgeProps {
  value: string
  qualifier: string
  label?: string
  className?: string
}

export default function MetricBadge({ value, qualifier, label, className }: MetricBadgeProps) {
  return (
    <div className={cn('inline-flex flex-col gap-0.5', className)}>
      {label && <span className="font-display text-lg text-accent">{label}</span>}
      <div className="flex items-baseline gap-1.5">
        <span className="text-base font-bold text-foreground">{value}</span>
      </div>
      <p className="max-w-[240px] text-xs leading-snug text-muted">{qualifier}</p>
    </div>
  )
}
