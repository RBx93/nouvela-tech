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
  'Hi! I\'m the Nouvela Bot. Ask me about our services, our federal registrations, or starting a project.'

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
    q: 'Are you a registered federal contractor?',
    a: 'Yes. Nouvela Technology Group LLC is a Florida LLC and an SBA-registered small business with an active SAM.gov registration.',
  },
  {
    q: 'What is your UEI?',
    a: 'Our Unique Entity Identifier is H3Q5W9SYFF44.',
  },
  {
    q: 'What is your CAGE code?',
    a: 'Our CAGE / NCAGE code is 11UF7.',
  },
  {
    q: 'Which NAICS codes do you hold?',
    a: '238290 for other building equipment contractors, 236220 for commercial and institutional building construction, 541370 for geospatial and GIS services, and 561110 for office administrative services.',
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
