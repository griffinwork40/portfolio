import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { renderText } from './lib/render-text.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------------------
// Hand-drawn paper theme OG image (1200×630)
// Colors from app/globals.css — paper background #f6f1e6, ink #2b2a26,
// blue ballpoint #2f5aa8, red pen #c0452f, muted pencil #5b574e
// Text comes verbatim from data/content.ts — no invented metrics.
//   name:    "Griffin Long"
//   title:   "Agentic AI Engineer · Technical Founder"
//   tagline: "I don't out-type teams — I build and direct the AI agent
//             tooling that lets one person ship at team scale."
//   URLs:    agentafk.com · graisol.com
// All text is rendered with the app's own fonts (Caveat/Kalam, see
// app/layout.tsx) via satori, so the OG card matches the site instead of
// falling back to Georgia/Courier system fonts.
// ---------------------------------------------------------------------------

// Grid lines: faint blue-grey, 40px apart
function gridLines() {
  const lines = []
  // Vertical grid lines
  for (let x = 0; x <= 1200; x += 40) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="#c8c0a8" stroke-width="0.6" opacity="0.5"/>`)
  }
  // Horizontal grid lines
  for (let y = 0; y <= 630; y += 40) {
    lines.push(`<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#c8c0a8" stroke-width="0.6" opacity="0.5"/>`)
  }
  return lines.join('\n  ')
}

const INK = '#2b2a26'
const MUTED = '#5b574e'
const BLUE = '#2f5aa8'
const RED = '#c0452f'

const [
  label,
  name,
  title,
  taglineLine1,
  taglineLine2,
  urls,
  stampText,
] = await Promise.all([
  renderText({
    text: 'portfolio · 2025',
    fontFamily: 'Kalam',
    fontWeight: 400,
    fontSize: 18,
    color: MUTED,
    letterSpacing: 1,
    x: 110,
    y: 32,
    width: 300,
    height: 30,
  }),
  renderText({
    text: 'Griffin Long',
    fontFamily: 'Caveat',
    fontWeight: 700,
    fontSize: 96,
    color: INK,
    letterSpacing: -1,
    x: 112,
    y: 116,
    width: 700,
    height: 108,
  }),
  renderText({
    text: 'Agentic AI Engineer · Technical Founder',
    fontFamily: 'Kalam',
    fontWeight: 400,
    fontSize: 32,
    color: INK,
    letterSpacing: 0.3,
    x: 120,
    y: 254,
    width: 900,
    height: 44,
  }),
  renderText({
    text: 'I don’t out-type teams — I build and direct the AI agent',
    fontFamily: 'Kalam',
    fontWeight: 400,
    fontSize: 22,
    color: MUTED,
    x: 120,
    y: 328,
    width: 900,
    height: 32,
  }),
  renderText({
    text: 'tooling that lets one person ship at team scale.',
    fontFamily: 'Kalam',
    fontWeight: 400,
    fontSize: 22,
    color: MUTED,
    x: 120,
    y: 358,
    width: 900,
    height: 32,
  }),
  renderText({
    text: 'agentafk.com · graisol.com',
    fontFamily: 'Kalam',
    fontWeight: 700,
    fontSize: 26,
    color: BLUE,
    letterSpacing: 0.3,
    x: 120,
    y: 438,
    width: 600,
    height: 36,
  }),
  renderText({
    text: 'SHIPPED IT',
    fontFamily: 'Kalam',
    fontWeight: 700,
    fontSize: 15,
    color: RED,
    letterSpacing: 2,
    x: -86,
    y: -30,
    width: 172,
    height: 22,
    align: 'center',
    verticalAlign: 'center',
  }),
])

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Slight paper texture via feTurbulence -->
    <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
      <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
      <feComponentTransfer in="blended">
        <feFuncA type="linear" slope="1"/>
      </feComponentTransfer>
    </filter>
    <!-- Stamp border filter: roughen edges slightly -->
    <filter id="stamp-rough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>

  <!-- Paper background -->
  <rect width="1200" height="630" fill="#f6f1e6"/>

  <!-- Subtle paper texture overlay -->
  <rect width="1200" height="630" fill="#ede6d4" opacity="0.18" filter="url(#paper-texture)"/>

  <!-- Faint graph grid lines -->
  ${gridLines()}

  <!-- Red margin rule (notebook left margin line, classic red) -->
  <line x1="100" y1="0" x2="100" y2="630" stroke="#c0452f" stroke-width="2.5" opacity="0.75"/>

  <!-- Top horizontal rule (like a ruled notebook header) -->
  <line x1="0" y1="80" x2="1200" y2="80" stroke="#c0452f" stroke-width="1.5" opacity="0.5"/>

  <!-- Header area label (muted pencil, top-left, like a date/label on notes) -->
  ${label}

  <!-- "Griffin Long" — main name in ink, large -->
  ${name}

  <!-- Blue ballpoint marker underline below name -->
  <rect x="120" y="222" width="540" height="5" fill="#2f5aa8" rx="2" opacity="0.85"/>

  <!-- Slight wobbly underline extension (hand-drawn feel) -->
  <path d="M 120 226 Q 300 229 540 225 Q 580 224 625 226" stroke="#2f5aa8" stroke-width="2" fill="none" opacity="0.4"/>

  <!-- Title line: "Agentic AI Engineer · Technical Founder" in ink -->
  ${title}

  <!-- Tagline line 1 (shorter wrapping) in muted pencil -->
  ${taglineLine1}

  <!-- Tagline line 2 -->
  ${taglineLine2}

  <!-- Faint horizontal rule above URLs -->
  <line x1="120" y1="430" x2="1080" y2="430" stroke="#2b2a26" stroke-width="1" opacity="0.3" stroke-dasharray="6 3"/>

  <!-- Highlighter swipe behind URLs (gold highlighter motif) -->
  <rect x="115" y="451" width="360" height="28" fill="#e0b400" opacity="0.18" rx="2"/>

  <!-- URLs, hand-written in ballpoint blue -->
  ${urls}

  <!-- "SHIPPED IT ✓" rubber stamp in corner — rotated, red outlined box -->
  <g transform="translate(1000, 530) rotate(-18)">
    <!-- Stamp outer box -->
    <rect x="-92" y="-44" width="184" height="62" fill="none" stroke="#c0452f" stroke-width="3.5" rx="4" opacity="0.82" filter="url(#stamp-rough)"/>
    <!-- Stamp inner box (double-border stamp look) -->
    <rect x="-86" y="-38" width="172" height="50" fill="none" stroke="#c0452f" stroke-width="1.2" rx="2" opacity="0.6"/>
    <!-- Stamp text -->
    ${stampText}
    <!-- Hand-drawn checkmark (avoids relying on a ✓ glyph the font may lack) -->
    <path d="M -10 6 L -2 14 L 12 -6" stroke="${RED}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  </g>

  <!-- Thin ink border around the whole card -->
  <rect x="2" y="2" width="1196" height="626" fill="none" stroke="#2b2a26" stroke-width="2" opacity="0.25"/>
</svg>`

// Write SVG first
const svgPath = join(__dirname, '../public/og.svg')
const pngPath = join(__dirname, '../public/og.png')
writeFileSync(svgPath, svg)
console.log('✓ OG SVG written to public/og.svg')

// ---------------------------------------------------------------------------
// Render a REAL raster PNG. og.png must never contain SVG bytes — many social
// platforms (Twitter/X, LinkedIn, Slack, iMessage) reject SVG-as-PNG OG images.
// Try renderers in order of fidelity; fail loudly rather than write a fake PNG.
// ---------------------------------------------------------------------------

async function trySharp() {
  const { default: sharp } = await import('sharp')
  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .png()
    .toFile(pngPath)
  return 'sharp'
}

const { spawnSync } = await import('node:child_process')

function tryCli(cmd, args) {
  return () => {
    const res = spawnSync(cmd, args, { stdio: 'inherit' })
    if (res.error) throw res.error
    if (res.status !== 0) throw new Error(`${cmd} exited ${res.status}`)
    return cmd
  }
}

const renderers = [
  trySharp,
  tryCli('/opt/homebrew/bin/rsvg-convert', ['-w', '1200', '-h', '630', '--format=png', svgPath, '-o', pngPath]),
  tryCli('rsvg-convert', ['-w', '1200', '-h', '630', '--format=png', svgPath, '-o', pngPath]),
  tryCli('magick', [svgPath, '-resize', '1200x630', pngPath]),
  tryCli('convert', [svgPath, '-resize', '1200x630', pngPath]),
]

let rendered = null
for (const r of renderers) {
  try {
    rendered = await r()
    break
  } catch (e) {
    console.warn(`  ↳ renderer skipped: ${e.message ?? e}`)
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
