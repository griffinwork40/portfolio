// data/content.ts — SINGLE SOURCE OF TRUTH
// All content drawn verbatim from profile.md verified 2026-06-20.
// NEVER edit metrics here without re-verifying against profile.md.

// --- Named contracts for the plain content objects. `satisfies` verifies shape
// without widening the `as const` literal types the components rely on.
// (projects / experience / sweBenchResult already carry explicit types below.) ---
type Identity = {
  name: string
  title: string
  location: string
  email: string
  phone: string
  github: string
  linkedin: string
  threads: string
  agentAfkUrl: string
  graisolUrl: string
  greeting: string
  hook: string
  tagline: string
}

type About = { paragraphs: readonly string[] }

type Skills = {
  languages: readonly string[]
  frameworks: readonly string[]
  aiAndAgents: readonly string[]
  dataAndInfra: readonly string[]
}

type Contact = {
  email: string
  phone: string
  github: string
  linkedin: string
  threads: string
  agentAfk: string
  graisol: string
}

type SiteMetadata = {
  title: string
  description: string
  url: string
  ogImage: string
  twitterHandle?: string
}

export const identity = {
  name: 'Griffin Long',
  title: 'Agentic AI Engineer | Technical Founder',
  location: 'Daytona Beach, FL (Remote-First)',
  email: 'griffinwork40@gmail.com',
  phone: '(978) 806-6657',
  github: 'https://github.com/griffinwork40',
  linkedin: 'https://linkedin.com/in/griffindev',
  threads: 'https://www.threads.com/@griffinlong.dev',
  agentAfkUrl: 'https://agentafk.com',
  graisolUrl: 'https://graisol.com',
  greeting: "Hey, I'm",
  // Personal hook — grounded in profile.md (self-taught, line-cook origin).
  hook: 'A self-taught AI engineer who went from line cook to shipping production agent systems.',
  // Voice line, verbatim from profile.md Positioning Summary B.
  tagline: "I don't out-type teams — I build and direct the AI agent tooling that lets one person ship at team scale.",
} as const satisfies Identity

// About — first-person story, drawn STRICTLY from profile.md (self-taught, line-cook
// origin, GRAIsol founded Mar 2025). No invented personal details; metrics match profile.
export const about = {
  paragraphs: [
    "I didn't take the traditional route into software. I taught myself to build with AI while working as a line cook and taking college classes — experimenting with ChatGPT on the side until it turned into something real.",
    "In March 2025 I turned that into GRAIsol. In the ~15 months since, it's grown into roughly 10,800 commits across 100+ repos: an open-source agent runtime (agent-afk), a 369K-LOC AI GTM-automation platform, and 9 published open-source packages.",
    "The throughline: I don't out-type teams — I build and direct the AI agent tooling that lets one person ship at team scale. Same energy I brought to the kitchen — high tempo, reliable under pressure — now pointed at shipping software end to end.",
  ],
} as const satisfies About

// SWE-bench result — qualifier is structurally inseparable from the numbers.
// NEVER render sonnet or kimiQwen without also rendering qualifier.
export type SWEBenchResult = {
  readonly sonnet: string       // "72.2%"
  readonly kimiQwen: string     // "77.8%"
  readonly qualifier: string    // full caveat string — always shown with numbers
}

export const sweBenchResult: SWEBenchResult = {
  sonnet: '72.2%',
  kimiQwen: '77.8%',
  qualifier: '36-instance non-networked subset, own-harness eval, web tools disabled',
} as const

export type ProjectMetric = {
  readonly label: string
  readonly value: string
}

export type Project = {
  readonly id: string
  readonly name: string
  // description uses exact wording — agent-afk must say "runtime/harness", NOT "framework"
  readonly description: string
  readonly url?: string
  readonly metrics?: readonly ProjectMetric[]
  readonly tags: readonly string[]
  readonly featured: boolean
}

export const projects: readonly Project[] = [
  {
    id: 'agent-afk',
    name: 'agent-afk',
    // CANONICAL: "open-source TypeScript agentic coding-agent runtime/harness" — never "framework"
    description: 'open-source TypeScript agentic coding-agent runtime/harness',
    url: 'https://agentafk.com',
    metrics: [
      { label: 'LOC', value: '~308K TS/TSX' },
      { label: 'npm versions', value: '408' },
      { label: 'commits', value: '1,542' },
      { label: 'license', value: 'Apache-2.0' },
    ],
    // sweBenchResult attached separately — MetricBadge enforces qualifier display
    tags: ['TypeScript', 'Node.js', 'MCP', 'Agentic AI'],
    featured: true,
  },
  {
    id: 'agent-grai',
    name: 'AgentGRAI',
    description: 'Modular Next.js / React AI lead-intelligence and outbound platform with multi-stage enrichment, async queue architecture, Gmail outbound engine, and AI SDR layer',
    metrics: [
      { label: 'LOC', value: '~369K' },
      { label: 'commits', value: '~1,900' },
      { label: 'timeframe', value: '~5 months' },
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Redis'],
    featured: true,
  },
  {
    id: 'mcp-elevenlabs',
    name: 'ElevenLabs Voice MCP',
    description: 'MCP server for ElevenLabs voice synthesis',
    metrics: [{ label: 'tools', value: '23' }],
    tags: ['MCP', 'TypeScript', 'ElevenLabs'],
    featured: false,
  },
  {
    id: 'mcp-clickup',
    name: 'ClickUp MCP',
    description: 'MCP server for ClickUp task management',
    metrics: [{ label: 'tools', value: '19' }],
    tags: ['MCP', 'TypeScript', 'ClickUp'],
    featured: false,
  },
  {
    id: 'mcp-cursor-agent',
    name: 'Cursor Agent MCP',
    description: 'MCP server for Cursor Agent with SSE on Vercel',
    metrics: [{ label: 'merged PRs', value: '40' }],
    tags: ['MCP', 'TypeScript', 'Vercel', 'SSE'],
    featured: false,
  },
  {
    id: 'mcp-e2b',
    name: 'E2B MCP',
    description: 'MCP server for E2B sandboxed code execution (GitHub-only)',
    tags: ['MCP', 'TypeScript', 'E2B'],
    featured: false,
  },
  {
    id: 'mcp-twilio',
    name: 'Twilio MCP',
    description: 'MCP server for Twilio messaging',
    tags: ['MCP', 'TypeScript', 'Twilio'],
    featured: false,
  },
  {
    id: 'mcp-smartlead',
    name: 'Smartlead MCP',
    description: 'MCP server for Smartlead outbound',
    tags: ['MCP', 'TypeScript', 'Smartlead'],
    featured: false,
  },
  {
    id: 'mcp-gpt-image',
    name: 'GPT Image MCP',
    description: 'MCP server for GPT image generation',
    tags: ['MCP', 'TypeScript', 'OpenAI'],
    featured: false,
  },
  {
    id: 'agent-framework',
    name: 'agent-framework',
    description: 'Claude Code / agent-afk plugin for autonomous task execution through composable skills, subagents, and hooks',
    tags: ['Python', 'Claude Code', 'agent-afk'],
    featured: false,
  },
  {
    id: 'gadscli',
    name: 'gadscli',
    description: 'Async Rust CLI for the Google Ads API, published to npm (npm-only)',
    tags: ['Rust', 'Google Ads', 'npm'],
    featured: false,
  },
  {
    id: 'ab-platform',
    name: 'A/B Experimentation Platform',
    description: '5-service Docker Compose system with chi-squared significance from scratch, SHA-256 user bucketing, and database-level race-condition handling',
    metrics: [{ label: 'services', value: '5' }],
    tags: ['Fastify', 'Next.js', 'PostgreSQL', 'Docker'],
    featured: false,
  },
  {
    id: 'on-device-ai',
    name: 'On-Device AI Tools',
    description: 'Local macOS menu-bar dictation (mlx-whisper) and system-wide inline ghost-text completion (MLX Swift) for Apple Silicon',
    tags: ['Swift', 'MLX', 'Apple Silicon', 'Python'],
    featured: false,
  },
] as const

// Typed lookup for featured projects — throws a descriptive error at build time
// if an id is renamed/removed, instead of the silent `find(...)!` non-null assertion.
export function getProjectById(id: string): Project {
  const project = projects.find((p) => p.id === id)
  if (!project) throw new Error(`content: no project found with id "${id}"`)
  return project
}

export const skills = {
  languages: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Swift', 'SQL'],
  frameworks: ['Node.js', 'Next.js', 'React', 'Astro', 'Fastify', 'Tailwind CSS'],
  aiAndAgents: [
    'agent-afk', 'Claude Agent SDK', 'OpenAI API', 'Model Context Protocol (MCP)',
    'Agentic orchestration', 'Multi-agent systems', 'Prompt engineering',
    'LLM evals', 'Playwright automation', 'Local models (MLX, llama.cpp, Ollama, LM Studio)',
  ],
  dataAndInfra: [
    'PostgreSQL', 'Supabase', 'Firebase', 'Redis', 'Upstash QStash',
    'Docker', 'Vercel', 'Railway', 'Stripe', 'Twilio', 'ElevenLabs',
    'Google APIs', 'Sentry', 'PostHog', 'Self-hosted CI/CD',
  ],
} as const satisfies Skills

export type ExperienceStatus = 'current' | 'past'

export type ExperienceEntry = {
  readonly id: string
  readonly role: string
  readonly company: string
  readonly companyUrl?: string
  readonly location: string
  readonly period: string
  readonly status: ExperienceStatus  // 'past' drives past-tense rendering in Timeline
  readonly bullets: readonly string[]
}

export const experience: readonly ExperienceEntry[] = [
  {
    id: 'graisol',
    role: 'Founder and AI Systems Engineer',
    company: 'GRAIsol',
    companyUrl: 'https://graisol.com',
    location: 'Daytona Beach, FL',
    period: 'Mar 2025 – Present',
    status: 'current',
    bullets: [
      'Built and open-sourced agent-afk (agentafk.com), a TypeScript agentic coding-agent runtime/harness: ~308K LOC, 1,542 commits, 408 published npm versions, Apache-2.0.',
      'Architected AgentGRAI, a modular Next.js / React AI lead-intelligence and outbound platform (~369K LOC, ~1,900 commits in ~5 months): multi-stage enrichment on async QStash queues with Redis-semaphore concurrency control.',
      'Extended it with a Gmail outbound engine (multi-inbox rotation, AI sequences, open/click tracking, AI reply classification) and an AI SDR layer with ICP scoring and human-handoff routing.',
      'Published 9 open-source packages across npm and GitHub: 7 MCP servers (ElevenLabs Voice – 23 tools, ClickUp – 19 tools, Cursor Agent – 40 merged PRs / SSE on Vercel, E2B, Twilio, Smartlead, GPT Image), plus agent-afk and gadscli.',
      'Ran a one-person AI-leveraged studio delivering 30+ client and product builds.',
      'Accumulated ~10,800 GitHub commit contributions, 193 PRs, and 107 repos since Mar 2025.',
    ],
  },
  {
    id: 'atlas-digital',
    role: 'AI Systems Engineer (Contract)',
    company: 'Atlas Digital',
    location: 'Remote',
    period: 'Oct 2025 – Mar 2026',
    status: 'past',  // PAST — use past tense in rendering; never say "current"
    bullets: [
      'Embedded directly with client leadership to design and deploy an end-to-end CRM and agent automation pipeline: lead intake, enrichment, scoring, qualification, and outbound handoff in production.',
      'Built customer-facing agent workflows on Claude Agent SDK and OpenAI with structured fallback/retry logic and production observability; owned architecture end-to-end from design through deployment.',
    ],
  },
  {
    id: 'independent',
    role: 'Independent AI Consultant',
    company: 'Remote',
    location: 'Remote',
    period: '2026',
    status: 'current',
    bullets: [
      'Fuly Kids (fulykids.com): Diagnosed recurring LLM over-spend in FulyScan (AI food-scanning nutrition tool); shipped fix via merged PR adding Supabase/Postgres caching so repeat scans reuse stored results instead of re-invoking Claude.',
      'adside.ai: Delivered prioritized UX and product audit covering onboarding friction, cognitive overload, missing agency-facing tooling, data-freshness gaps, agent latency, and strategic positioning.',
    ],
  },
] as const

export const contact = {
  email: 'griffinwork40@gmail.com',
  phone: '(978) 806-6657',
  github: 'https://github.com/griffinwork40',
  linkedin: 'https://linkedin.com/in/griffindev',
  threads: 'https://www.threads.com/@griffinlong.dev',
  agentAfk: 'https://agentafk.com',
  graisol: 'https://graisol.com',
} as const satisfies Contact

export const siteMetadata = {
  title: 'Griffin Long — Agentic AI Engineer',
  description: "I'm Griffin — a self-taught AI engineer who went from line cook to shipping production agent systems. I build the tooling that lets one person ship at team scale.",
  url: 'https://griffinlong.dev',
  ogImage: '/og.png',
  twitterHandle: undefined,
} as const satisfies SiteMetadata
