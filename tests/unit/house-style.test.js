import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join, relative, sep } from 'node:path'

// House-style guards for the Nouvela site, ported from the one in
// cscilab-lims/api/tests/houseStyle.test.js.
//
// Ground truth for every value asserted here is the nouvela-context skill:
// the canonical domain is nouvelatechnologygroup.com, the client-facing
// address is info@nouvelatechnologygroup.com, and the registered street
// address is deliberately kept off the public site.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

const walk = (dir) => {
  const out = []
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git') continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (/\.(jsx?|html|json|md|scss|css)$/.test(full)) out.push(full)
  }
  return out
}

const files = [...walk(join(ROOT, 'src')), join(ROOT, 'index.html')]
const rel = (file) => relative(ROOT, file).split(sep).join('/')

const offenders = (pattern) => {
  const bad = []
  for (const file of files) {
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      if (pattern.test(line)) bad.push(rel(file) + ':' + (i + 1))
    })
  }
  return bad
}

describe('every document uses the real Nouvela domain', () => {
  // novelatechnologygroup.com (no "u") is a typo. A mailto: pointing at it
  // sends a visitor's message to a domain the company does not control, which
  // is exactly what happened in the CSCI LIMS docs.
  it('never writes novelatechnologygroup.com, missing the u', () => {
    const bad = offenders(/(?<![a-z])novelatechnologygroup\.com/)
    expect(bad, 'wrong domain (missing "u") at:\n' + bad.join('\n')).toEqual([])
  })

  // nouvela.com is not Nouvela and never has been. It resolves to a broker's
  // for-sale page. It is not a legacy address or a short form.
  it('never writes nouvela.com, which the company does not own', () => {
    const bad = offenders(/(?<!nouvelatechnologygroup)nouvela\.com/)
    expect(bad, 'broker domain at:\n' + bad.join('\n')).toEqual([])
  })
})

describe('the registered street address stays off the public site', () => {
  // Robertson asked for the full address to come off. It is the registered
  // address of a single-member LLC, which means it is a home address on a
  // public marketing page. SAM.gov still carries it as a matter of public
  // record; that is separate and not something this site controls.
  it('does not print the street address', () => {
    const bad = offenders(/Narrow\s+Gauge|1052\s+Narrow/i)
    expect(bad, 'street address at:\n' + bad.join('\n')).toEqual([])
  })

  it('does not print a street-number line for the company', () => {
    const bad = offenders(/\b\d{3,5}\s+[A-Z][a-z]+\s+(Ct|Court|St|Street|Ave|Avenue|Dr|Drive|Rd|Road|Blvd|Ln|Lane)\b/)
    expect(bad, 'street line at:\n' + bad.join('\n')).toEqual([])
  })
})
