'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Nav from './Nav'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'border-b-2 border-dashed border-[--color-text]/40 bg-[--color-bg]/95 py-3 backdrop-blur' : 'py-5',
      )}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
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
