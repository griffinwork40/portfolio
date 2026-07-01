import { identity } from '@/data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t-2 border-dashed border-divider py-8" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-muted font-sans">
        <p>© {year} Griffin Long · Drawn in Daytona Beach, FL — then shipped.</p>
        <div className="flex items-center gap-4">
          <a href={identity.graisolUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent hover:underline">
            graisol.com<span className="sr-only"> (opens in new tab)</span>
          </a>
          <a href={identity.agentAfkUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent hover:underline">
            agentafk.com<span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
