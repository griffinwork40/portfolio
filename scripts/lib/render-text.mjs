/**
 * Renders text to SVG glyph paths via satori, using the app's actual
 * Caveat/Kalam font files. satori bakes text into <path> geometry, so the
 * result needs no font installed on whatever machine rasterizes the SVG —
 * unlike plain <text font-family="..."> which silently falls back to
 * whatever serif/sans the renderer has on hand.
 */
import satori from 'satori'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fontsDir = join(__dirname, '../fonts')

const FONT_FILES = {
  'Caveat:400': 'Caveat-Regular.ttf',
  'Caveat:700': 'Caveat-Bold.ttf',
  'Kalam:400': 'Kalam-Regular.ttf',
  'Kalam:700': 'Kalam-Bold.ttf',
}

const fontCache = new Map()
function loadFont(file) {
  if (!fontCache.has(file)) {
    fontCache.set(file, readFileSync(join(fontsDir, file)))
  }
  return fontCache.get(file)
}

const JUSTIFY = { left: 'flex-start', center: 'center', right: 'flex-end' }

// Renders `text` inside an (x, y, width, height) box in the parent canvas
// and returns a nested <svg> fragment ready to concatenate into a larger
// hand-built SVG document.
export async function renderText({
  text,
  fontFamily,
  fontWeight = 400,
  fontSize,
  color,
  letterSpacing = 0,
  x,
  y,
  width,
  height,
  align = 'left',
  verticalAlign = 'flex-end',
}) {
  const fontFile = FONT_FILES[`${fontFamily}:${fontWeight}`]
  if (!fontFile) throw new Error(`No font file registered for ${fontFamily}:${fontWeight}`)

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    alignItems: verticalAlign,
    justifyContent: JUSTIFY[align],
    fontFamily,
    fontWeight,
    fontSize,
    color,
    lineHeight: 1,
    whiteSpace: 'pre',
  }
  if (letterSpacing) style.letterSpacing = `${letterSpacing}px`

  const svg = await satori(
    {
      type: 'div',
      props: {
        style,
        children: text,
      },
    },
    {
      width,
      height,
      fonts: [{ name: fontFamily, data: loadFont(fontFile), weight: fontWeight, style: 'normal' }],
    },
  )

  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
  return `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`
}
