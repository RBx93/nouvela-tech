import React, { useId } from 'react'

// The bot's face is a message blob, not a person.
//
// The earlier avatar was a drawn portrait, which reads as a specific human
// answering. A speech bubble says the same thing a chat widget needs to say
// (there is a message here) without putting a face on an automated FAQ.
//
// Drawn in SVG rather than typed as an emoji: an emoji is re-rendered by
// whatever font the visitor's device ships, so it is not a brand asset.
function MessageBlobAvatar({ size = 40, color = '#7B2FBF', dark = '#5E2292', ring = '#F3E9FB', name = 'the bot' }) {
  const uid = useId().replace(/:/g, '')
  const id = (n) => `${n}-${uid}`

  return (
    <svg
      data-testid="bot-avatar"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`Message from ${name}`}
      style={{ flexShrink: 0, display: 'block', borderRadius: '50%' }}
    >
      <defs>
        {/* Light from the upper left, so the blob has a body rather than
            reading as a flat sticker at 26px. */}
        <linearGradient id={id('blob')} x1="18%" y1="6%" x2="84%" y2="94%">
          <stop offset="0%" stopColor={color} stopOpacity="0.92" />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <radialGradient id={id('bg')} cx="32%" cy="24%" r="84%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={ring} />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="32" fill={`url(#${id('bg')})`} />

      {/* The tail sits under the body so their seam never shows */}
      <path
        data-part="tail"
        d="M22.5 40.5c0 4.6-1.1 8.6-3.4 12.1 5.2-1.1 9.4-3.9 12.4-8.3z"
        fill={dark}
      />

      {/* Body: a rounded speech bubble */}
      <rect
        data-part="blob"
        x="11"
        y="15"
        width="42"
        height="29"
        rx="10"
        fill={`url(#${id('blob')})`}
      />

      {/* A soft highlight along the top edge, the way light catches a curve */}
      <rect x="15" y="18.5" width="34" height="7" rx="3.5" fill="#FFFFFF" opacity="0.16" />

      {/* Three dots: the universal "there is a message here" */}
      <circle data-part="dot" cx="23" cy="29.5" r="3.1" fill="#FFFFFF" opacity="0.95" />
      <circle data-part="dot" cx="32" cy="29.5" r="3.1" fill="#FFFFFF" opacity="0.95" />
      <circle data-part="dot" cx="41" cy="29.5" r="3.1" fill="#FFFFFF" opacity="0.95" />
    </svg>
  )
}

export default MessageBlobAvatar
