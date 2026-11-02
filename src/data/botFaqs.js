// Content for this site’s popup bot.
//
// Every answer is drawn from copy already on the site. Nothing is invented:
// a bot that improvises facts about a client is worse than no bot at all.
export const BOT_NAME = 'Nouvela Bot'

export const THEME = {
  primary: '#2563EB',
  primaryDark: '#1B4AC0',
  ring: '#E7EEFD',
}

export const GREETING =
  'Hi! I\'m the Nouvela Bot. Ask me about our services, our work, or starting a project.'

// Where the bot hands a visitor to a human.
// Email only: this site carries no published phone number, so the bot
// must not print one.
export const HANDOFF = {
  label: 'Rather email us? info@nouvelatechnologygroup.com',
  href: 'mailto:info@nouvelatechnologygroup.com',
}

export const faqs = [
  {
    q: 'What does Nouvela Technology Group do?',
    a: 'Software engineering, GIS services, program support, and technical services for government and commercial clients.',
  },
  {
    q: 'What kind of business is Nouvela?',
    a: 'Nouvela Technology Group LLC is a Florida LLC and an SBA-registered small business.',
  },
  {
    q: 'Can you work as a subcontractor?',
    a: 'Yes. We are structured to support short-term projects and long-term growth, as a prime or a subcontracting partner.',
  },
  {
    q: 'How do you approach a project?',
    a: 'We focus on solutions that can actually be implemented, used, and maintained, and we evaluate every engagement by the outcome it creates.',
  },
  {
    q: 'How do I get in touch?',
    a: 'Email info@nouvelatechnologygroup.com or use the contact form on this page.',
  },
]
