'use client'
import { useState } from 'react'
import Nav from './Nav'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    // iOS 26 Safari flow-through pattern — mirrored from agentafk-landing Navbar .flow:
    //
    // KEY INSIGHT: position:fixed (even with translateY(-100%)) keeps the element
    // at CSS y=0. iOS 26 sees it as the "top edge element" and blocks content from
    // flowing behind the Dynamic Island pill. position:relative puts the header in
    // normal document flow, so it scrolls away completely — leaving truly nothing at
    // the top edge — and iOS 26 shows the page background/content through the pill.
    //
    // viewport-fit=cover (layout.tsx) spans the notch. padding-top:env(safe-area-inset-top)
    // pushes nav links below the pill while the bar bg fills behind it.
    // Trade-off: no scroll-up reveal; the header returns only when at page top.
    // This is the same trade-off agentafk-landing intentionally makes.
    <header
      className="relative z-40 w-full border-b-2 border-dashed border-[--color-text]/20 backdrop-blur-[2px]"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        // Semi-transparent paper tint (not solid --color-bg) so the fixed graph
        // grid behind the header stays visible and the paper reads as continuous.
        // rgba is used directly because Tailwind can't inject an alpha channel
        // into an arbitrary CSS-var color (bg-[--color-bg]/90 wouldn't work).
        backgroundColor: 'rgba(246, 241, 230, 0.72)',
      }}
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
        <div
          id="mobile-nav"
          className="md:hidden px-4 pb-4 pt-2 border-t-2 border-dashed border-[--color-text]/40 backdrop-blur-[2px]"
          style={{ backgroundColor: 'rgba(246, 241, 230, 0.72)' }}
        >
          <Nav mobile onClose={() => setMobileOpen(false)} />
        </div>
      )}
    </header>
  )
}
