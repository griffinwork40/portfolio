/**
 * Generates all favicon / icon assets for the paper-theme portfolio.
 *
 * Produces:
 *   app/icon.svg          — Next.js SVG favicon (auto-linked by App Router)
 *   app/apple-icon.png    — 180×180 Apple Touch Icon
 *   public/icon-192.png   — 192×192 PWA icon (referenced by web manifest)
 *   public/icon-512.png   — 512×512 PWA icon (maskable-safe center glyph)
 *
 * Design: ink "GL" monogram on a blue-ballpoint (#2f5aa8) rounded square,
 * cream "GL" letters (#f6f1e6). Blue-on-cream reads better at 16px than the
 * alternative (cream bg + dark letters loses shape at tiny sizes).
 *
 * Colors match app/globals.css:
 *   #2f5aa8  blue ballpoint (bg square)
 *   #f6f1e6  paper cream (letterforms)
 *   #2b2a26  ink (thin outline)
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { default as sharp } from 'sharp'
import { renderText } from './lib/render-text.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ---------------------------------------------------------------------------
// SVG monogram builder — size-agnostic viewBox, scale via width/height attrs
// "GL" is rendered in Caveat (the app's signature/display font, see
// app/layout.tsx) via satori so the favicon matches the hand-drawn "Griffin
// Long" wordmark used elsewhere instead of falling back to a system serif.
// ---------------------------------------------------------------------------
async function monogramSVG(size = 512) {
  const cornerRadius = Math.round(size * 0.18)
  const padding = Math.round(size * 0.1)
  const bgInset = Math.round(size * 0.04)   // thin ink outline gap
  const fontSize = Math.round(size * 0.5)
  const innerSize = size - padding * 2

  const glyph = await renderText({
    text: 'GL',
    fontFamily: 'Caveat',
    fontWeight: 700,
    fontSize,
    color: '#f6f1e6',
    letterSpacing: -Math.round(size * 0.02),
    x: padding,
    y: padding,
    width: innerSize,
    height: innerSize,
    align: 'center',
    verticalAlign: 'center',
  })

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Ink outline (subtle dark border for definition) -->
  <rect x="${bgInset}" y="${bgInset}" width="${size - bgInset * 2}" height="${size - bgInset * 2}"
        rx="${cornerRadius}" ry="${cornerRadius}"
        fill="#2b2a26" opacity="0.18"/>
  <!-- Blue ballpoint background square -->
  <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}"
        rx="${Math.round(cornerRadius * 0.85)}" ry="${Math.round(cornerRadius * 0.85)}"
        fill="#2f5aa8"/>
  <!-- GL monogram in cream -->
  ${glyph}
</svg>`
}

const monogram512 = await monogramSVG(512)

// ---------------------------------------------------------------------------
// 1. app/icon.svg — Next.js App Router convention (auto <link rel="icon">)
// ---------------------------------------------------------------------------
const iconSvgPath = join(root, 'app', 'icon.svg')
writeFileSync(iconSvgPath, monogram512)
console.log('✓ app/icon.svg written')

// ---------------------------------------------------------------------------
// Helper: SVG buffer → PNG via sharp
// ---------------------------------------------------------------------------
async function svgToPng(svgString, outPath, width, height) {
  await sharp(Buffer.from(svgString))
    .resize(width, height)
    .png()
    .toFile(outPath)
  console.log(`✓ ${outPath.replace(root + '/', '')} written (${width}×${height})`)
}

// ---------------------------------------------------------------------------
// 2. app/apple-icon.png — 180×180
// ---------------------------------------------------------------------------
await svgToPng(
  monogram512,
  join(root, 'app', 'apple-icon.png'),
  180,
  180,
)

// ---------------------------------------------------------------------------
// 3. public/icon-192.png — PWA manifest icon
// ---------------------------------------------------------------------------
await svgToPng(
  monogram512,
  join(root, 'public', 'icon-192.png'),
  192,
  192,
)

// ---------------------------------------------------------------------------
// 4. public/icon-512.png — PWA manifest icon (maskable-safe: glyph centred in
//    safe zone, background bleeds to edge for maskable crop compatibility)
// ---------------------------------------------------------------------------
// For 512 maskable: the "safe zone" is the inner 80% circle (409px dia).
// Our monogram square at inset 10% (51px) already sits well within that.
await svgToPng(
  monogram512,
  join(root, 'public', 'icon-512.png'),
  512,
  512,
)

console.log('\nAll icon assets generated successfully.')
