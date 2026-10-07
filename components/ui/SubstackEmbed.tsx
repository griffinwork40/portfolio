'use client'
import { useEffect, useRef } from 'react'

/**
 * Supascribe-powered Substack subscribe form.
 * Renders the embed div and loads the Supascribe script once on mount.
 */

interface SubstackEmbedProps {
  className?: string
}

export default function SubstackEmbed({ className }: SubstackEmbedProps) {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    const script = document.createElement('script')
    script.src = 'https://js.supascribe.com/v1/loader/tJl1xTwKVfSrmimd1tzgZLyzJSQ2.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className={className}
      aria-label="Subscribe to The Goblin Files newsletter on Substack"
      style={{ colorScheme: 'light dark' }}
    >
      <div
        data-supascribe-embed-id="287508345408"
        data-supascribe-subscribe=""
      />
    </div>
  )
}
