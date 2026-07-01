import { describe, it, expect } from 'vitest'
import {
  identity,
  contact,
  sweBenchResult,
  projects,
  experience,
  siteMetadata,
} from '@/data/content'

// These tests enforce the anti-fabrication / content invariants that data/content.ts
// documents in comments only. They turn "please remember" into a failing gate.

describe('content: SWE-bench qualifier is inseparable from the numbers', () => {
  it('carries a substantial non-empty qualifier', () => {
    expect(typeof sweBenchResult.qualifier).toBe('string')
    expect(sweBenchResult.qualifier.trim().length).toBeGreaterThan(10)
  })
  it('reports both results as percentages', () => {
    expect(sweBenchResult.sonnet).toMatch(/%$/)
    expect(sweBenchResult.kimiQwen).toMatch(/%$/)
  })
})

describe('content: agent-afk is a runtime/harness, never a framework', () => {
  const agentAfk = projects.find((p) => p.id === 'agent-afk')

  it('the agent-afk project exists', () => {
    expect(agentAfk).toBeDefined()
  })
  it('describes agent-afk as a runtime/harness', () => {
    expect(agentAfk!.description.toLowerCase()).toMatch(/runtime|harness/)
  })
  it('never calls agent-afk a "framework"', () => {
    expect(agentAfk!.description.toLowerCase()).not.toContain('framework')
    // The GRAIsol experience bullet that introduces agent-afk must also hold the line.
    const graisol = experience.find((e) => e.id === 'graisol')
    const afkBullet = graisol?.bullets.find((b) => /agent-afk/i.test(b))
    expect(afkBullet).toBeDefined()
    expect(afkBullet!.toLowerCase()).toMatch(/runtime|harness/)
    expect(afkBullet!.toLowerCase()).not.toContain('framework')
  })
})

describe('content: Atlas Digital is past, never current', () => {
  it('no Atlas Digital role is flagged current', () => {
    const atlasCurrent = experience.filter(
      (e) => /atlas digital/i.test(e.company) && e.status === 'current',
    )
    expect(atlasCurrent).toHaveLength(0)
  })
  it('the atlas-digital entry is explicitly status: past', () => {
    expect(experience.find((e) => e.id === 'atlas-digital')?.status).toBe('past')
  })
})

describe('content: schema shape', () => {
  it('every project has required non-empty fields', () => {
    for (const p of projects) {
      expect(p.id, 'project id').toBeTruthy()
      expect(p.name, `project ${p.id} name`).toBeTruthy()
      expect(p.description, `project ${p.id} description`).toBeTruthy()
      expect(p.tags.length, `project ${p.id} tags`).toBeGreaterThan(0)
      expect(typeof p.featured, `project ${p.id} featured`).toBe('boolean')
    }
  })
  it('every experience entry has required fields and a valid status', () => {
    for (const e of experience) {
      expect(e.id).toBeTruthy()
      expect(e.role, `${e.id} role`).toBeTruthy()
      expect(e.company, `${e.id} company`).toBeTruthy()
      expect(e.location, `${e.id} location`).toBeTruthy()
      expect(e.period, `${e.id} period`).toBeTruthy()
      expect(['current', 'past'], `${e.id} status`).toContain(e.status)
      expect(e.bullets.length, `${e.id} bullets`).toBeGreaterThan(0)
    }
  })
  it('the two flagship projects are featured', () => {
    const featured = projects.filter((p) => p.featured).map((p) => p.id)
    expect(featured).toContain('agent-afk')
    expect(featured).toContain('agent-grai')
  })
})

describe('content: identity / contact / site integrity', () => {
  it('email is consistent between identity and contact', () => {
    expect(identity.email).toBe(contact.email)
    expect(identity.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })
  it('every http(s) URL is absolute https (auto-covers new socials)', () => {
    const urls = [...Object.values(identity), ...Object.values(contact), siteMetadata.url].filter(
      (v) => typeof v === 'string' && v.includes('://'),
    )
    expect(urls.length).toBeGreaterThan(0)
    for (const u of urls) {
      expect(u, u).toMatch(/^https:\/\//)
    }
  })
  it('site metadata has a title, a real description, and an og image', () => {
    expect(siteMetadata.title).toBeTruthy()
    expect(siteMetadata.description.length).toBeGreaterThan(20)
    expect(siteMetadata.ogImage).toMatch(/\.(png|svg|jpg|jpeg|webp)$/)
  })
})
