# Portfolio Site — Griffin Long

## What This Is

Griffin Long's personal portfolio — a single-page marketing site built with **Next.js 15** (App Router), **React 19**, **TypeScript** (strict), **Tailwind CSS 3**, and **Framer Motion**. It is **statically exported** (`output: 'export'` → `out/`) and deployed to **Vercel** (remote: `griffinwork40/portfolio`). The design is a hand-drawn / paper aesthetic ("ink on paper" palette, wobbly card borders, Caveat + Kalam handwriting fonts) with a signature cartographic "earned path" motif threaded between sections. Package manager is **pnpm**.

## Commands

```bash
pnpm dev        # local dev server (http://localhost:3000)
pnpm build      # production static export → out/
pnpm start      # serve the production build
pnpm lint       # next lint (ESLint) — the ONLY automated check; no test suite
pnpm gen-og     # regenerate public/og.{svg,png} from scripts/generate-og.mjs
```

There is no test framework — `pnpm lint` + `pnpm build` are the gates. Always run both before considering work done.

## Architecture

| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout: fonts (next/font), `<Metadata>`/OpenGraph, Header, Footer, SiteBackground, skip-link |
| `app/page.tsx` | The single page — composes section components + `EarnedPath` transitions |
| `app/globals.css` | Semantic design tokens (two-tier: `--palette-*` primitives → `--color-*` roles) + the hand-drawn design system (`.glass` paper cards, etc.) |
| `components/sections/` | Page sections: Hero, About, Projects, Skills, Experience, Contact |
| `components/layout/` | Header, Nav, Footer |
| `components/ui/` | Reusable primitives: Card, MetricBadge, EarnedPath, Timeline, Polaroid, ContourField, SiteBackground, Button, Badge, AnimatedText, SectionHeading |
| `data/content.ts` | **SINGLE SOURCE OF TRUTH** — all copy, metrics, projects, experience, links, site metadata |
| `lib/utils.ts` | `cn()` (clsx + tailwind-merge) and shared Framer Motion variants (`fadeUp`, `fadeIn`, `staggerContainer`) |
| `scripts/generate-og.mjs` | Builds a real raster OG PNG (sharp → rsvg → magick fallback chain) |
| `public/` | favicon.svg, og.{png,svg}, photos/, robots.txt, sitemap.xml |

Build artifacts (`.next/`, `out/`, `.vercel/`) are git-ignored — never edit them by hand.

## Content Conventions (load-bearing — read before touching copy)

`data/content.ts` is the single source of truth and is drawn **verbatim from a verified `profile.md`** (last verified 2026-06-20). These are anti-fabrication guards, not style preferences:

- **Never edit metrics** (LOC, commit counts, npm versions, dates) without re-verifying against `profile.md`. Numbers here are real and cited.
- **SWE-bench numbers must always render with their `qualifier` string.** `components/ui/MetricBadge.tsx` enforces this structurally — never surface `sonnet`/`kimiQwen` values without the qualifier caveat.
- **`agent-afk` is described as a "runtime/harness" — NEVER "framework".** This is the canonical wording.
- **Experience entries carry a `status` flag** (`'current'` | `'past'`) that drives verb tense in `Timeline`. Atlas Digital is `'past'` — never render it as current.
- Do not invent employers, titles, dates, metrics, or personal details. Copy is truthful and grounded.

## Code Conventions

- **TypeScript strict mode** on; path alias `@/*` maps to the project root (e.g. `@/data/content`, `@/components/ui/Card`).
- Components using Framer Motion or browser APIs are marked `'use client'`; keep static content in server components where possible.
- **Styling — semantic design tokens (two-tier):** all color lives in `app/globals.css` as **Tier 1 primitives** (`--palette-paper`, `--palette-ink`, `--palette-ballpoint`, …) — the *only* place literal hex appears — repointed by **Tier 2 semantic tokens** (`--color-background`, `--color-surface`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-accent`, `--color-accent-secondary`, `--color-highlight`). Consume them via the matching Tailwind classes (`bg-background`, `text-foreground`, `text-muted`, `border-accent`, `text-accent-secondary`, …) — **never raw hex/rgba** in components. For a one-off translucent shade, use `color-mix(in srgb, var(--color-…) N%, transparent)` against a semantic token, not a literal `rgba()`. Compose classes with `cn()`.
- The paper design system (`.glass` cards, wobbly borders, hard offset shadows) lives in un-layered CSS in `globals.css` so it intentionally overrides Tailwind utilities — respect that when adjusting card styling.
- **Fonts:** `--font-caveat` (display/headings) and `--font-kalam` (sans/mono body) via `next/font/google` — do not hardcode font families.
- **Animations:** reuse the shared variants in `lib/utils.ts` rather than defining ad-hoc motion configs.
- **Static export constraints:** no server components with runtime data fetching, no `next/image` optimization (`images.unoptimized: true`), no API routes. Everything must render at build time.
- ESLint config: `next/core-web-vitals` + `next/typescript` (flat config in `eslint.config.mjs`).
