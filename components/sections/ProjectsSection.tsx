'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import MetricBadge from '@/components/ui/MetricBadge'
import SectionHeading from '@/components/ui/SectionHeading'
import { projects, sweBenchResult, getProjectById } from '@/data/content'
import { cn, staggerContainer, fadeUp } from '@/lib/utils'

export default function ProjectsSection() {
  const prefersReduced = useReducedMotion()
  const headliners = new Set(['agent-afk', 'agent-grai'])
  const featuredOther = projects.filter((p) => p.featured && !headliners.has(p.id))
  const mcpServers = projects.filter((p) => p.id.startsWith('mcp-'))
  const other = projects.filter((p) => !p.featured && !p.id.startsWith('mcp-'))

  const agentAfk = getProjectById('agent-afk')
  const agentGrai = getProjectById('agent-grai')

  return (
    <section id="projects" className="section-padding px-4" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeading id="projects-heading" index="02" subtitle="Open-source tools, production platforms, and the agent infrastructure behind them.">
          Things I’ve built
        </SectionHeading>

        {/* Featured — bento headliners */}
        <motion.div
          className="grid lg:grid-cols-[3fr_2fr] gap-6 mb-10 items-stretch"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* agent-afk — MetricBadge enforces SWE-bench qualifier */}
          <motion.div variants={prefersReduced ? {} : fadeUp} className="h-full relative">
            <span aria-hidden="true" className="absolute -top-8 right-6 z-10 -rotate-3 font-display text-xl text-accent">flagship ✦</span>
            <Card className="glass-featured h-full flex flex-col gap-4 tilt-a">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-foreground">agent-afk</h3>
                <a href="https://agentafk.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center -mr-2 -mt-2 text-xs text-accent hover:underline">
                  agentafk.com ↗<span className="sr-only"> (opens in new tab)</span>
                </a>
              </div>
              {/* CANONICAL description — never "framework" */}
              <p className="text-muted text-sm">{agentAfk.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {agentAfk.metrics!.map((m) => (
                  <div key={m.label} className="glass rounded-lg p-3">
                    <p className="text-xs text-muted uppercase tracking-wider">{m.label}</p>
                    <p className="text-lg font-bold text-foreground">{m.value}</p>
                  </div>
                ))}
              </div>
              {/* SWE-bench — MetricBadge always renders qualifier alongside value */}
              <div className="glass rounded-lg p-3">
                <MetricBadge
                  label="SWE-bench"
                  value={`${sweBenchResult.sonnet} Sonnet / ${sweBenchResult.kimiQwen} Kimi+Qwen`}
                  qualifier={sweBenchResult.qualifier}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {agentAfk.tags.map((t) => (
                  <Badge key={t} variant="accent">{t}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* AgentGRAI */}
          <motion.div variants={prefersReduced ? {} : fadeUp} className="h-full">
            <Card className="h-full flex flex-col gap-4 tilt-b">
              <h3 className="text-xl font-bold text-foreground">AgentGRAI</h3>
              <p className="text-muted text-sm">{agentGrai.description}</p>
              {/* 3-col compact row on mobile; single stacked column at md+ (beside flagship) */}
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
                {agentGrai.metrics!.map((m) => (
                  <div key={m.label} className="glass rounded-lg p-2 sm:p-3">
                    <p className="text-xs text-muted uppercase tracking-wider">{m.label}</p>
                    <p className="whitespace-nowrap text-sm font-bold text-foreground sm:text-lg">{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {agentGrai.tags.map((t) => (
                  <Badge key={t} variant="mono">{t}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Featured — secondary row */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredOther.map((p, i) => (
            <motion.div key={p.id} variants={prefersReduced ? {} : fadeUp}>
              <Card className={cn('h-full flex flex-col gap-3', i % 2 ? 'tilt-b' : 'tilt-a')}>
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground">{p.name}</h3>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center -mr-2 -mt-2 text-xs text-accent hover:underline">
                      ↗<span className="sr-only"> (opens in new tab)</span>
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted">{p.description}</p>
                {p.metrics && p.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="glass rounded-lg px-2 py-1">
                        <span className="text-xs text-muted uppercase">{m.label}</span>{' '}
                        <span className="text-sm font-bold text-foreground">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="accent">{t}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* MCP Servers compact grid */}
        <h3 className="text-lg font-semibold text-foreground mb-4">7 MCP Servers</h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mcpServers.map((p, i) => {
            const isLastOdd = i === mcpServers.length - 1 && mcpServers.length % 2 !== 0
            return (
              <motion.div
                key={p.id}
                variants={prefersReduced ? {} : fadeUp}
                className={cn('h-full', isLastOdd && 'col-span-2 sm:col-span-1')}
              >
                <Card hover={false} className={cn('p-4 h-full', ['tilt-a', 'tilt-b', 'tilt-c', 'tilt-d'][i % 4])}>
                  <p className="font-medium text-foreground text-sm">{p.name}</p>
                  {p.metrics?.[0] && (
                    <p className="text-xs text-muted mt-1">{p.metrics[0].label}: {p.metrics[0].value}</p>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* "more work" divider */}
        <div className="my-8 flex items-center gap-4" aria-hidden="true">
          <div className="flex-1 border-t-2 border-dashed border-divider" />
          <span className="font-display text-xl text-muted -rotate-1">more work</span>
          <div className="flex-1 border-t-2 border-dashed border-divider" />
        </div>

        {/* Other projects */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {other.map((p, i) => (
            <motion.div key={p.id} variants={prefersReduced ? {} : fadeUp}>
              <Card className={cn('h-full flex flex-col gap-3', i % 2 ? 'tilt-b' : 'tilt-a')}>
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground">{p.name}</h3>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center -mr-2 -mt-2 text-xs text-accent hover:underline">
                      ↗<span className="sr-only"> (opens in new tab)</span>
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted">{p.description}</p>
                {p.metrics && p.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="glass rounded-lg px-2 py-1">
                        <span className="text-xs text-muted uppercase">{m.label}</span>{' '}
                        <span className="text-sm font-bold text-foreground">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="muted">{t}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
