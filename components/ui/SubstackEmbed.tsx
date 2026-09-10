'use client'
import { useEffect, useRef } from 'react'

/**
 * Substack email-subscribe widget using Substack's own CustomSubstackWidget API.
 * Loads their embed script once; the widget renders a styled email input + subscribe
 * button inside the container div. Supports custom theme colors to blend with the
 * site's hand-drawn palette.
 */

declare global {
  interface Window {
    CustomSubstackWidget?: {
      substackUrl: string
      placeholder: string
      buttonText: string
      theme: string
      colors?: {
        primary: string
        input: string
        email: string
        text: string
      }
    }
  }
}

interface SubstackEmbedProps {
  className?: string
}

export default function SubstackEmbed({ className }: SubstackEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    // Configure the widget before loading the script
    window.CustomSubstackWidget = {
      substackUrl: 'griffinlong.substack.com',
      placeholder: 'your email',
      buttonText: 'Subscribe',
      theme: 'custom',
      colors: {
        primary: '#2f5aa8',   // --palette-ballpoint (accent)
        input: '#f6f1e6',     // --palette-paper (background)
        email: '#2b2a26',     // --palette-ink (foreground)
        text: '#f6f1e6',      // --palette-paper (button text)
      },
    }

    const script = document.createElement('script')
    script.src = 'https://substackapi.com/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      delete window.CustomSubstackWidget
    }
  }, [])

  return (
    <div className={className}>
      <div id="custom-substack-embed" ref={containerRef} />
    </div>
  )
}
