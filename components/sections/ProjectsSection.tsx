'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import MetricBadge from '@/components/ui/MetricBadge'
import SectionHeading from '@/components/ui/SectionHeading'
import { projects, sweBenchResult } from '@/data/content'
import { staggerContainer, fadeUp } from '@/lib/utils'

export default function ProjectsSection() {
  const prefersReduced = useReducedMotion()
  const mcpServers = projects.filter((p) => p.id.startsWith('mcp-'))
  const other = projects.filter((p) => !p.featured && !p.id.startsWith('mcp-'))

  const agentAfk = projects.find(p => p.id === 'agent-afk')!
  const agentGrai = projects.find(p => p.id === 'agent-grai')!

  return (
    <section id="projects" className="section-padding px-4" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeading id="projects-heading" index="02" subtitle="Open-source tools, production platforms, and the agent infrastructure behind them.">
          Things I’ve built
        </SectionHeading>

        {/* Featured — bento headliners */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-10 items-start"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* agent-afk — MetricBadge enforces SWE-bench qualifier */}
          <motion.div variants={prefersReduced ? {} : fadeUp}>
            <Card className="h-full flex flex-col gap-4 tilt-a">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-[--color-text]">agent-afk</h3>
                <a href="https://agentafk.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[--color-accent] hover:underline">agentafk.com ↗</a>
              </div>
              {/* CANONICAL description — never "framework" */}
              <p className="text-[--color-muted] text-sm">{agentAfk.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {agentAfk.metrics!.map((m) => (
                  <div key={m.label} className="glass rounded-lg p-3">
                    <p className="text-[10px] text-[--color-muted] uppercase tracking-wider">{m.label}</p>
                    <p className="text-lg font-bold text-[--color-text]">{m.value}</p>
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
          <motion.div variants={prefersReduced ? {} : fadeUp}>
            <Card className="h-full flex flex-col gap-4 tilt-b">
              <h3 className="text-xl font-bold text-[--color-text]">AgentGRAI</h3>
              <p className="text-[--color-muted] text-sm">{agentGrai.description}</p>
              <div className="grid grid-cols-3 gap-2">
                {agentGrai.metrics!.map((m) => (
                  <div key={m.label} className="glass rounded-lg p-2 text-center">
                    <p className="text-[10px] text-[--color-muted] uppercase">{m.label}</p>
                    <p className="font-bold text-[--color-text] text-sm">{m.value}</p>
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

        {/* MCP Servers compact grid */}
        <h3 className="text-lg font-semibold text-[--color-text] mb-4">7 MCP Servers</h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10"
          variants={staggerContainer}
          initial={prefersReduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mcpServers.map((p, i) => (
            <motion.div key={p.id} variants={prefersReduced ? {} : fadeUp}>
              <Card hover className={`p-4 ${['tilt-a', 'tilt-b', 'tilt-c', 'tilt-d'][i % 4]}`}>
                <p className="font-medium text-[--color-text] text-sm">{p.name}</p>
                {p.metrics?.[0] && (
                  <p className="text-xs text-[--color-muted] mt-1">{p.metrics[0].label}: {p.metrics[0].value}</p>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

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
              <Card className={`h-full flex flex-col gap-3 ${i % 2 ? 'tilt-b' : 'tilt-a'}`}>
                <h3 className="font-semibold text-[--color-text]">{p.name}</h3>
                <p className="text-sm text-[--color-muted] flex-1">{p.description}</p>
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
