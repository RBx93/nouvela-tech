import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// The Bid Docket portal is Robertson's private launcher for the contract
// pipeline. This repo is public and Vite bundles every React route into public
// JS, so the portal is a standalone static page that Azure Static Web Apps
// serves only to the "owner" role. Leads and decisions never live here; they
// stay in the claude.ai docket the page links to.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8')
const config = JSON.parse(read('staticwebapp.config.json'))
const PAGE = 'public/docket/index.html'
const DOCKET_URL = 'https://claude.ai/artifact/VZ8NRhTPNo7y1NCL9gk2M9'

describe('the docket routes are locked to the owner role', () => {
  const routes = config.routes.map((r) => r.route)
  const catchAll = routes.indexOf('/*')

  for (const path of ['/docket', '/docket/*']) {
    it(`${path} requires the owner role and serves the static page`, () => {
      const rule = config.routes.find((r) => r.route === path)
      expect(rule).toBeDefined()
      expect(rule.allowedRoles).toEqual(['owner'])
      expect(rule.rewrite).toBe('/docket/index.html')
    })

    it(`${path} is matched before the SPA catch-all`, () => {
      expect(routes.indexOf(path)).toBeGreaterThanOrEqual(0)
      expect(routes.indexOf(path)).toBeLessThan(catchAll)
    })
  }

  it('sends signed-out visitors to GitHub sign-in and back to the docket', () => {
    expect(config.responseOverrides['401']).toEqual({
      redirect: '/.auth/login/github?post_login_redirect_uri=/docket/',
      statusCode: 302,
    })
  })

  it('sends signed-in visitors without the role to the home page', () => {
    expect(config.responseOverrides['403']).toEqual({ redirect: '/', statusCode: 302 })
  })
})

describe('the docket page', () => {
  it('exists as a static file outside the React bundle', () => {
    expect(existsSync(resolve(ROOT, PAGE))).toBe(true)
  })

  const html = existsSync(resolve(ROOT, PAGE)) ? read(PAGE) : ''

  it('links to the claude.ai Bid Docket', () => {
    expect(html).toContain(`href="${DOCKET_URL}"`)
  })

  it('stays out of search engines', () => {
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow">/)
  })

  it('runs no scripts, so the site CSP needs no change', () => {
    expect(html).not.toMatch(/<script/i)
  })

  it('offers sign-out', () => {
    expect(html).toContain('href="/.auth/logout?post_logout_redirect_uri=/"')
  })

  it('has no em dashes and no federal wording (public repo)', () => {
    expect(html).not.toMatch(/—|&mdash;/)
    expect(html).not.toMatch(/federal/i)
  })
})

describe('the docket is not advertised', () => {
  for (const file of ['public/sitemap.xml', 'public/robots.txt', 'public/llms.txt', 'src/components/Navbar.jsx']) {
    it(`${file} does not mention it`, () => {
      expect(read(file)).not.toMatch(/docket/i)
    })
  }
})

describe('the footer has one small PA link to the portal', () => {
  const footer = read('src/components/Footer.jsx')

  it('links to /docket/ with a plain anchor so Azure serves the locked page', () => {
    const links = footer.match(/<a [^>]*href="\/docket\/"[^>]*>[^<]*<\/a>/g) || []
    expect(links).toHaveLength(1)
    expect(links[0]).toMatch(/>PA<\/a>$/)
    expect(links[0]).toMatch(/aria-label="Portal access"/)
    expect(links[0]).toMatch(/rel="nofollow"/)
  })

  it('never names the docket in visible text', () => {
    expect(footer.replace(/href="\/docket\/"/, '')).not.toMatch(/docket/i)
  })
})
