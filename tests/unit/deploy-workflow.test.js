import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// On 2026-11-02 two PRs merged 4 seconds apart. Azure canceled the first
// production deploy when the second arrived, and GitHub mailed a "Run failed"
// for it. Production deploys now share one concurrency group that queues
// instead of canceling, so back-to-back merges deploy one after the other.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
// Windows checkouts get CRLF; compare on LF so the test passes everywhere.
const yml = readFileSync(resolve(ROOT, '.github/workflows/azure-static-web-apps.yml'), 'utf8').replace(/\r\n/g, '\n')
const buildJob = yml.split(/\n  close_pull_request:/)[0].split(/\n  build_and_deploy:/)[1] || ''

describe('production deploys queue instead of canceling each other', () => {
  it('the build job declares a concurrency group', () => {
    expect(buildJob).toMatch(/\n    concurrency:\n      group: /)
  })

  it('pushes to main share one production group', () => {
    expect(buildJob).toMatch(/group: .*github\.event_name == 'push' && 'swa-production'/)
  })

  it('each PR preview gets its own group', () => {
    expect(buildJob).toMatch(/format\('swa-pr-\{0\}', github\.event\.pull_request\.number\)/)
  })

  it('never cancels a deploy already running', () => {
    expect(buildJob).toMatch(/\n      cancel-in-progress: false\n/)
  })
})
