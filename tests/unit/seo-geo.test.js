import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8')
const html = read('index.html')
const SITE = 'https://nouvelatechnologygroup.com'

const meta = (attr, name) => {
  const m = html.match(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`))
  return m && m[1]
}

describe('SEO tags in static index.html', () => {
  it('title is 50 to 60 characters', () => {
    const t = html.match(/<title>([^<]*)<\/title>/)[1]
    expect(t.length).toBeGreaterThanOrEqual(50)
    expect(t.length).toBeLessThanOrEqual(60)
  })
  it('meta description is 110 to 160 characters', () => {
    const d = meta('name', 'description')
    expect(d.length).toBeGreaterThanOrEqual(110)
    expect(d.length).toBeLessThanOrEqual(160)
  })
  it('has canonical and absolute Open Graph/Twitter tags', () => {
    expect(html).toContain(`<link rel="canonical" href="${SITE}/" />`)
    expect(meta('property', 'og:url')).toBe(`${SITE}/`)
    expect(meta('property', 'og:site_name')).toBe('Nouvela Technology Group')
    expect(meta('property', 'og:image')).toBe(`${SITE}/og-image.jpg`)
    expect(meta('property', 'og:image:width')).toBe('1200')
    expect(meta('property', 'og:image:height')).toBe('630')
    expect(meta('property', 'og:image:alt')).toBeTruthy()
    expect(meta('name', 'twitter:image')).toBe(`${SITE}/og-image.jpg`)
    expect(meta('name', 'twitter:card')).toBe('summary_large_image')
    expect(existsSync(resolve(ROOT, 'public/og-image.jpg'))).toBe(true)
  })
  it('has no em dashes in head copy', () => {
    expect(html.split('</head>')[0]).not.toContain('—')
  })
})

describe('JSON-LD', () => {
  const ld = () => JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  it('has one graph with Organization/ProfessionalService and WebSite', () => {
    const g = ld()['@graph']
    const org = g.find((n) => [].concat(n['@type']).includes('ProfessionalService'))
    expect(org.name).toBe('Nouvela Technology Group LLC')
    expect(org.url).toBe(`${SITE}/`)
    expect(org.email).toBe('info@nouvelatechnologygroup.com')
    expect(g.find((n) => n['@type'] === 'WebSite').url).toBe(`${SITE}/`)
  })
  it('never invents ratings, reviews, or an address', () => {
    const s = JSON.stringify(ld())
    expect(s).not.toMatch(/aggregateRating|"Review"|streetAddress|telephone/)
  })
})

describe('crawler files', () => {
  it('robots.txt welcomes AI crawlers and names the sitemap', () => {
    const r = read('public/robots.txt')
    for (const b of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'])
      expect(r).toContain(`User-agent: ${b}`)
    expect(r).toContain(`Sitemap: ${SITE}/sitemap.xml`)
    expect(r).not.toMatch(/Disallow:\s*\/\s*$/m)
  })
  it('sitemap lists every route', () => {
    const s = read('public/sitemap.xml')
    expect(s).toContain(`<loc>${SITE}/</loc>`)
    expect(s).toContain(`<loc>${SITE}/capabilities</loc>`)
  })
  it('llms.txt is a fact sheet with no em dashes', () => {
    const l = read('public/llms.txt')
    expect(l.startsWith('# Nouvela Technology Group')).toBe(true)
    expect(l).toContain('info@nouvelatechnologygroup.com')
    expect(l).toContain(SITE)
    expect(l).not.toContain('—')
  })
})
