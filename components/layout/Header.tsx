'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import Nav from './Nav'
import { useHideOnScroll } from '@/lib/hooks/useHideOnScroll'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const hidden = useHideOnScroll()

  return (
    // iOS 26 Safari "flowing through top" pattern (mirrored from agentafk-landing):
    //   • viewportFit=cover (layout.tsx) spans the Dynamic Island pill edge-to-edge
    //   • header is position:fixed but slides OUT on scroll-down (translateY(-100%))
    //     so when scrolled, iOS 26 samples the hero content at the top edge → liquid
    //     glass / pill adapts to the page background instead of the nav bar color
    //   • padding-top: env(safe-area-inset-top) pushes nav links below the pill
    //     while the bar's bg fills up behind it (resolves 0 on non-notched devices)
    //   • useHideOnScroll: hide on down, reveal on up, always reveal in top 64px
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 w-full',
        'border-b-2 border-dashed border-[--color-text]/20 bg-[--color-bg]',
        'transition-transform duration-300 ease-in-out',
        hidden ? '-translate-y-full' : 'translate-y-0',
      )}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      role="banner"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="font-display text-3xl font-bold text-[--color-text] transition-colors hover:text-[--color-accent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[--color-accent] rounded"
          aria-label="Griffin Long – back to top"
        >
          GL
        </a>

        {/* Desktop nav */}
        <div className="hidden md:block">
          <Nav />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[--color-text] transition-colors hover:text-[--color-accent]"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div id="mobile-nav" className="md:hidden px-4 pb-4 pt-2 border-t-2 border-dashed border-[--color-text]/40">
          <Nav mobile onClose={() => setMobileOpen(false)} />
        </div>
      )}
    </header>
  )
}
