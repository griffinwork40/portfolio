import type { Metadata, Viewport } from 'next'
import { Caveat, Kalam } from 'next/font/google'
import './globals.css'
import { siteMetadata, identity, contact, skills } from '@/data/content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteBackground from '@/components/ui/SiteBackground'

// Only the weights actually used are requested — the hero heading (the LCP
// element) is Caveat 700, body is Kalam 400/700. Trimming 7 weight-files to 4
// halves the font payload and gets the heading's font into the preload set,
// so the hero stops waiting ~5s on a late web font on real phones.
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kalam',
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.url),
  keywords: [
    'Agentic AI Engineer',
    'Technical Founder',
    'MCP',
    'Model Context Protocol',
    'Claude Agent SDK',
    'multi-agent systems',
    'LLM evals',
    'agentic orchestration',
    'TypeScript',
    'Python',
    'Rust',
    'agent-afk',
    'AI GTM automation',
    'prompt engineering',
    'open-source agent runtime',
  ],
  authors: [{ name: 'Griffin Long', url: 'https://griffinlong.dev' }],
  creator: 'Griffin Long',
  publisher: 'Griffin Long',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: 'Griffin Long',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Griffin Long — Agentic AI Engineer',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  // Browser-chrome color, emitted as a <meta> tag at build time — it cannot
  // reference a runtime CSS var, so keep it in sync with --palette-paper.
  themeColor: '#f6f1e6',
  width: 'device-width',
  initialScale: 1,
  // viewport-fit=cover spans the notch / Dynamic Island pill so page content
  // and background fill edge-to-edge. env(safe-area-inset-top) in the header
  // then pushes nav content below the pill while the bg bleeds up into it.
  // Mirrors the working agentafk-landing setup (Navbar.module.css + layout.tsx).
  viewportFit: 'cover',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: identity.name,
  url: siteMetadata.url,
  jobTitle: 'Agentic AI Engineer',
  email: `mailto:${contact.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Daytona Beach',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  sameAs: [
    identity.github,
    identity.linkedin,
    identity.agentAfkUrl,
    identity.graisolUrl,
  ],
  knowsAbout: [
    ...skills.languages,
    ...skills.aiAndAgents,
  ],
  description: siteMetadata.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caveat.variable} ${kalam.variable}`}>
      {/* No bg utility here on purpose: the cream lives on <html> (globals.css)
          so the fixed -z-10 SiteBackground grid stays visible and iOS 26 Safari
          samples a solid root color for its toolbar chrome. */}
      <body className="font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <SiteBackground />
        <Header />
        <main id="main-content" className="relative isolate">
          {/* signature: depth → rise migration — cool depth up top, warm arrival at the CTA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              // Warm arrival peaks around the contact CTA (~88%) then returns to
              // transparent at 100%, so the gradient element's bottom edge (which
              // sits right above the footer) fades out instead of clipping the
              // warm tint into a hard horizontal line.
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 5%, transparent) 0%, color-mix(in srgb, var(--color-accent) 2.5%, transparent) 16%, transparent 42%, transparent 74%, color-mix(in srgb, var(--color-highlight) 6%, transparent) 88%, transparent 100%)',
            }}
          />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
