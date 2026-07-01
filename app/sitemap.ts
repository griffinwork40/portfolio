import type { MetadataRoute } from 'next'
import { siteMetadata } from '@/data/content'

// Code-based sitemap replaces the old static public/sitemap.xml so `lastModified`
// is regenerated on every build instead of drifting stale. Emitted to out/sitemap.xml
// at static-export build time.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMetadata.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
