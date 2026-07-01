import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Generate SVG OG image (1200x630, dark theme)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0f"/>
  <!-- Gradient overlays -->
  <defs>
    <radialGradient id="g1" cx="50%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="80%" cy="80%" r="40%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#0a0a0f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <!-- Monogram -->
  <text x="80" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="120" font-weight="700" fill="#6366f1" opacity="0.3">GL</text>
  <!-- Name -->
  <text x="80" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" fill="#f1f5f9">Griffin Long</text>
  <!-- Title -->
  <text x="80" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="400" fill="#94a3b8">Agentic AI Engineer | Technical Founder</text>
  <!-- URLs -->
  <text x="80" y="530" font-family="ui-monospace, monospace" font-size="22" fill="#6366f1">agentafk.com</text>
  <text x="320" y="530" font-family="ui-monospace, monospace" font-size="22" fill="#94a3b8"> · </text>
  <text x="360" y="530" font-family="ui-monospace, monospace" font-size="22" fill="#0ea5e9">graisol.com</text>
  <!-- Border accent -->
  <rect x="0" y="0" width="6" height="630" fill="#6366f1" opacity="0.6"/>
</svg>`

// Write SVG first
const svgPath = join(__dirname, '../public/og.svg')
const pngPath = join(__dirname, '../public/og.png')
writeFileSync(svgPath, svg)
console.log('✓ OG SVG written to public/og.svg')

// Render a REAL raster PNG. og.png must never contain SVG bytes — many social
// platforms (Twitter/X, LinkedIn, Slack, iMessage) reject SVG-as-PNG OG images.
// Try renderers in order of fidelity; fail loudly rather than write a fake PNG.

async function trySharp() {
  const { default: sharp } = await import('sharp')
  await sharp(Buffer.from(svg)).resize(1200, 630).png().toFile(pngPath)
  return 'sharp'
}

function tryCli(cmd, args) {
  const { spawnSync } = require('node:child_process')
  return () => {
    // Spawn directly (no shell): a missing binary surfaces as res.error (ENOENT).
    const res = spawnSync(cmd, args, { stdio: 'inherit' })
    if (res.error) throw res.error
    if (res.status !== 0) throw new Error(`${cmd} exited ${res.status}`)
    return cmd
  }
}

const { createRequire } = await import('node:module')
const require = createRequire(import.meta.url)

const renderers = [
  trySharp,
  tryCli('rsvg-convert', ['-w', '1200', '-h', '630', svgPath, '-o', pngPath]),
  tryCli('magick', [svgPath, '-resize', '1200x630', pngPath]),
  tryCli('convert', [svgPath, '-resize', '1200x630', pngPath]),
]

let rendered = null
for (const r of renderers) {
  try {
    rendered = await r()
    break
  } catch {
    /* try next renderer */
  }
}

if (rendered) {
  console.log(`✓ OG PNG written to public/og.png (via ${rendered})`)
} else {
  console.error(
    '✗ No SVG→PNG renderer available (tried sharp, rsvg-convert, magick, convert).\n' +
      '  Install one, e.g.: pnpm add -D sharp   OR   brew install librsvg\n' +
      '  Left existing public/og.png untouched (NOT overwriting with SVG bytes).',
  )
  process.exitCode = 1
}
