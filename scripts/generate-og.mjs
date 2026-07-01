import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

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
  <text x="110" y="58" font-family="Georgia, 'Times New Roman', serif" font-size="18" fill="#5b574e" opacity="0.7" letter-spacing="1">portfolio · 2025</text>

  <!-- "Griffin Long" — main name in ink, large -->
  <text x="120" y="210" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="#2b2a26" letter-spacing="-1">Griffin Long</text>

  <!-- Blue ballpoint marker underline below name -->
  <rect x="120" y="222" width="540" height="5" fill="#2f5aa8" rx="2" opacity="0.85"/>

  <!-- Slight wobbly underline extension (hand-drawn feel) -->
  <path d="M 120 226 Q 300 229 540 225 Q 580 224 625 226" stroke="#2f5aa8" stroke-width="2" fill="none" opacity="0.4"/>

  <!-- Title line: "Agentic AI Engineer · Technical Founder" in ink/muted -->
  <text x="120" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="#2b2a26" letter-spacing="0.3">Agentic AI Engineer · Technical Founder</text>

  <!-- Tagline line 1 (shorter wrapping) in muted pencil -->
  <text x="120" y="355" font-family="Georgia, 'Times New Roman', serif" font-size="24" fill="#5b574e" font-style="italic">I don&#x2019;t out-type teams &#x2014; I build and direct the AI agent</text>

  <!-- Tagline line 2 -->
  <text x="120" y="386" font-family="Georgia, 'Times New Roman', serif" font-size="24" fill="#5b574e" font-style="italic">tooling that lets one person ship at team scale.</text>

  <!-- Faint horizontal rule above URLs -->
  <line x1="120" y1="430" x2="1080" y2="430" stroke="#2b2a26" stroke-width="1" opacity="0.3" stroke-dasharray="6 3"/>

  <!-- URLs in monospace-ish ink -->
  <text x="120" y="470" font-family="'Courier New', Courier, monospace" font-size="26" fill="#2f5aa8" letter-spacing="0.5">agentafk.com</text>
  <text x="364" y="470" font-family="Georgia, serif" font-size="26" fill="#5b574e" opacity="0.7"> · </text>
  <text x="400" y="470" font-family="'Courier New', Courier, monospace" font-size="26" fill="#2f5aa8" letter-spacing="0.5">graisol.com</text>

  <!-- Highlighter swipe behind URLs (gold highlighter motif) -->
  <rect x="115" y="451" width="596" height="28" fill="#e0b400" opacity="0.18" rx="2"/>

  <!-- "SHIPPED IT ✓" rubber stamp in corner — rotated, red outlined box -->
  <g transform="translate(1000, 530) rotate(-18)">
    <!-- Stamp outer box -->
    <rect x="-92" y="-44" width="184" height="62" fill="none" stroke="#c0452f" stroke-width="3.5" rx="4" opacity="0.82" filter="url(#stamp-rough)"/>
    <!-- Stamp inner box (double-border stamp look) -->
    <rect x="-86" y="-38" width="172" height="50" fill="none" stroke="#c0452f" stroke-width="1.2" rx="2" opacity="0.6"/>
    <!-- Stamp text -->
    <text x="0" y="-12" font-family="Georgia, 'Times New Roman', serif" font-size="15" font-weight="700" fill="#c0452f" text-anchor="middle" letter-spacing="2" opacity="0.9">SHIPPED IT</text>
    <text x="0" y="8" font-family="Georgia, 'Times New Roman', serif" font-size="18" fill="#c0452f" text-anchor="middle" opacity="0.9">&#x2713;</text>
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
