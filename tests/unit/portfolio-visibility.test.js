import { describe, it, expect } from 'vitest'
import projects, { allProjects } from '../../src/data/projects'

// Unfinished work must never reach the public portfolio. Client-facing cards
// are live sites only; anything still being built stays in allProjects so the
// data is not lost, but is filtered out of the default export the site renders.
describe('portfolio visibility', () => {
  it('renders only live projects', () => {
    const notLive = projects.filter((p) => p.status !== 'live')
    expect(notLive.map((p) => p.title)).toEqual([])
  })

  it('does not expose the CSCI LIMS builds', () => {
    const leaked = projects.filter((p) =>
      /lims|cscilab|csci/i.test(`${p.title} ${p.desc} ${p.url}`)
    )
    expect(leaked.map((p) => p.title)).toEqual([])
  })

  it('keeps the hidden projects in the data file for later', () => {
    const hidden = allProjects.filter((p) => p.hidden)
    expect(hidden.map((p) => p.title)).toEqual([
      'CSCI Verify',
      'CSCI LIMS (cscilab.com)',
    ])
  })
})

describe("Edith's Best", () => {
  // Client as of 2026-11-02. The card points at his live Shopify store; the
  // redesign is still in progress, so the copy must not claim a finished launch.
  const card = projects.find((p) => p.title === "Edith's Best")

  it('is on the public portfolio, linking to the live store', () => {
    expect(card?.url).toBe('https://edithsbest.com')
    expect(card?.status).toBe('live')
    expect(card?.preview).toBe('/previews/ediths-best.webp')
  })

  it('shows in the first six cards, before "Show more"', () => {
    expect(projects.indexOf(card)).toBeGreaterThanOrEqual(0)
    expect(projects.indexOf(card)).toBeLessThan(6)
  })

  it('does not claim the redesign has launched', () => {
    expect(card?.desc).not.toMatch(/launched|redesigned|rebuilt/i)
  })
})

describe('footer client list', () => {
  it("links Edith's Best", async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, resolve } = await import('node:path')
    const here = dirname(fileURLToPath(import.meta.url))
    const footer = readFileSync(resolve(here, '../../src/components/Footer.jsx'), 'utf8')
    expect(footer).toMatch(/href="https:\/\/edithsbest\.com"[^>]*>Edith's Best</)
  })
})
