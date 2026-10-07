import { identity } from '@/data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t-2 border-dashed border-divider py-8" role="contentinfo">
      {/* F10: center-stack below sm; whitespace-nowrap on "then shipped. ⛵" keeps boat with text */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4 text-base text-muted font-sans sm:flex-row sm:justify-between">
        <p className="flex flex-wrap items-center justify-center gap-1.5 text-center sm:justify-start sm:text-left">
          <span>© {year} Griffin Long · Drawn in Daytona Beach, FL —</span>
          {/* F10: whitespace-nowrap keeps "then shipped." and the sailboat glyph together */}
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            then shipped.
            <svg className="inline-block h-[1.1em] w-[1.1em] translate-y-[-0.5px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {/* sail */}
              <path d="M12 5C12 5 12 13 12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 5C14.5 8 17 11 17 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* hull */}
              <path d="M4 16h16l-2 4H6L4 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* wave */}
              <path d="M2 22c2-1 4-1 6 0s4 1 6 0 4-1 6 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
        </p>
        <div className="flex items-center gap-4">
          <a href={identity.graisolUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-accent hover:underline">
            graisol.com<span className="sr-only"> (opens in new tab)</span>
          </a>
          <a href={identity.agentAfkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-accent hover:underline">
            agentafk.com<span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
