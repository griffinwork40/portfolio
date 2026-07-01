'use client'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

interface NavProps {
  mobile?: boolean
  onClose?: () => void
}

export default function Nav({ mobile, onClose }: NavProps) {
  return (
    <nav aria-label="Site navigation">
      <ul className={cn('flex', mobile ? 'flex-col gap-3' : 'flex-row gap-6')}>
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={onClose}
              className="relative font-display text-xl text-foreground transition-colors hover:text-accent after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
