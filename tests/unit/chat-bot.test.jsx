import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import ChatBot from '../../src/components/ChatBot.jsx'
import { faqs, GREETING, BOT_NAME, HANDOFF } from '../../src/data/botFaqs.js'

// Nouvela Bot: this site's copy of the Bassy Bot pattern: a launcher in the corner
// that opens a compact FAQ panel. Two things differ from the original by
// request. The avatar is a message blob, not a drawn person. And the component
// is built but deliberately not mounted, because the client decides whether it
// goes live.

const src = resolve(dirname(fileURLToPath(import.meta.url)), '../../src')
const read = (p) => readFileSync(resolve(src, p), 'utf8')

const launcher = () => screen.getByRole('button', { name: new RegExp(`chat with ${BOT_NAME}`, 'i') })

describe('the launcher', () => {
  it('starts closed, so the bot never covers the page on load', () => {
    render(<ChatBot />)
    expect(launcher()).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens on tap and closes again on the second tap', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)

    await user.click(launcher())
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(launcher())
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('is parked in the corner', () => {
    render(<ChatBot />)
    const { position, right, bottom } = launcher().style
    expect(position).toBe('fixed')
    expect(right).toBeTruthy()
    expect(bottom).toBeTruthy()
  })
})

describe('the panel', () => {
  it('stays a popup, small enough to leave the page behind it readable', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())

    const panel = screen.getByRole('dialog')
    expect(panel.style.position).toBe('fixed')
    expect(parseFloat(panel.style.width)).toBeLessThanOrEqual(360)
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('holds the answer back behind the typing beat', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())

    const panel = screen.getByRole('dialog')
    await user.click(within(panel).getByRole('button', { name: faqs[0].q }))
    expect(within(panel).queryByText(faqs[0].a)).not.toBeInTheDocument()

    expect(await screen.findByText(faqs[0].a, {}, { timeout: 3000 })).toBeInTheDocument()
  })

  it('offers every question', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())

    const panel = screen.getByRole('dialog')
    for (const faq of faqs) {
      expect(within(panel).getByRole('button', { name: faq.q })).toBeInTheDocument()
    }
  })

  it('names the bot in the header', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())
    expect(within(screen.getByRole('dialog')).getByText(BOT_NAME)).toBeInTheDocument()
  })
})

describe('the avatar is a message blob, not a person', () => {
  // Robertson asked for the drawn agent to come out and a message blob to take
  // its place. These hold that: a bubble with a tail, and none of the portrait
  // parts the original avatar carried.
  it('renders an svg blob with a tail', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())

    const avatar = screen.getAllByTestId('bot-avatar')[0]
    expect(avatar.tagName.toLowerCase()).toBe('svg')
    expect(avatar.querySelector('[data-part="blob"]')).toBeInTheDocument()
    expect(avatar.querySelector('[data-part="tail"]')).toBeInTheDocument()
  })

  it('carries no face: no skin, hair, lips, cheeks or eyes', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())

    const avatar = screen.getAllByTestId('bot-avatar')[0]
    for (const part of ['skin', 'hair', 'lips', 'cheek', 'eye-highlight']) {
      expect(avatar.querySelector(`[data-part="${part}"]`)).toBeNull()
    }
  })

  it('is labelled as a message, not as a person', async () => {
    const user = userEvent.setup()
    render(<ChatBot />)
    await user.click(launcher())

    const avatar = screen.getAllByTestId('bot-avatar')[0]
    expect(avatar.getAttribute('aria-label')).toMatch(/message/i)
  })
})


describe('customised for this site, not a copy of the handyman bot', () => {
  it('greets in this site voice', () => {
    expect(GREETING).toMatch(/nouvela/i)
    expect(GREETING).not.toMatch(/bassy|handyman/i)
  })

  it('answers from this site real content, not invented or borrowed', () => {
    const answers = faqs.map((f) => f.a).join(' ')
    expect(answers).toMatch(/GIS|software engineering|contractor/i)
    expect(answers).not.toMatch(/bassy|handyman|kitchen remodel/i)
  })

  it('hands off the way this site actually reaches a human', () => {
    expect(HANDOFF.href).toBe('mailto:info@nouvelatechnologygroup.com')
    // No published number on this site, so nothing on screen may show one.
    const shown = [HANDOFF.label, GREETING, ...faqs.map((f) => f.q + ' ' + f.a)].join(' ')
    expect(shown).not.toMatch(/\d{3}[ .-]\d{3}[ .-]\d{4}/)
  })
})

describe('the domain guard', () => {
  // nouvela.com is not and never has been Nouvela, and
  // novelatechnologygroup.com (no "u") is a typo that already sits in
  // this repo's Contact, Footer and Capabilities pages. Neither may reach
  // the bot. Mirrors the guard in the CSCI LIMS repo.
  it('uses the real domain and neither wrong one', () => {
    const shown = [HANDOFF.label, HANDOFF.href, GREETING, ...faqs.map((f) => f.q + ' ' + f.a)].join(' ')
    expect(shown).toMatch(/nouvelatechnologygroup\.com/)
    expect(shown).not.toMatch(/(?<!nouvelatechnologygroup)nouvela\.com/)
    expect(shown).not.toMatch(/(?<![a-z])novelatechnologygroup\.com/)
  })
})

describe('not live yet', () => {
  // "Build them but do not put them up yet. I want the clients to choose."
  it('is not mounted in App.jsx', () => {
    expect(read('App.jsx')).not.toMatch(/ChatBot/)
  })
})
