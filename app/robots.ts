import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/data/content'

// Code-based robots replaces the old static public/robots.txt so the sitemap URL
// stays derived from siteMetadata.url. Emitted to out/robots.txt at build time.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.url}/sitemap.xml`,
  }
}
