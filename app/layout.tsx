import type { Metadata, Viewport } from 'next'
import { Caveat, Kalam } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/data/content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteBackground from '@/components/ui/SiteBackground'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam',
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.url),
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: 'Griffin Long',
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#f6f1e6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caveat.variable} ${kalam.variable}`}>
      <body className="font-sans bg-[--color-bg] text-[--color-text] min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[--color-accent] focus:text-white focus:rounded"
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
              background:
                'linear-gradient(180deg, rgba(47,90,168,0.05) 0%, rgba(47,90,168,0.025) 16%, transparent 42%, transparent 74%, rgba(224,180,0,0.06) 100%)',
            }}
          />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
