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
