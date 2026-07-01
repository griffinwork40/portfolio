import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Semantic color tokens — map role names to the CSS custom properties
      // defined in app/globals.css. Never add raw hex here; extend the token
      // layer instead. Usage: bg-background, text-foreground, border-accent, …
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'accent-subtle': 'var(--color-accent-subtle)',
        highlight: 'var(--color-highlight)',
        // Translucent border roles (Tailwind v3 drops the `/opacity` modifier on
        // var()-based colors, so these are dedicated tokens rather than `/40`).
        divider: 'var(--color-divider)',
        'divider-faint': 'var(--color-divider-faint)',
      },
      fontFamily: {
        sans: ['var(--font-kalam)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-kalam)', ...defaultTheme.fontFamily.mono],
        display: ['var(--font-caveat)', 'cursive'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
