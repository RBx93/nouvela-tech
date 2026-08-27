import React, { useState, useRef, useEffect } from 'react'
import MessageBlobAvatar from './MessageBlobAvatar'
import { faqs, GREETING, BOT_NAME, THEME, HANDOFF } from '../data/botFaqs'

// The popup FAQ bot: a launcher in the corner that opens a compact panel.
// Same shape as the one on Bassy Handyman, with this site's questions, this
// site's colours, and a message blob in place of the drawn agent.
//
// NOT mounted anywhere yet. It is built and tested so the client can see it
// and decide; wiring it in is one import in App.jsx.
export const OPEN_EVENT = 'nouvela-bot:open'

const KEYFRAMES = [
  '@keyframes bot-bounce {',
  '  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }',
  '  40%           { transform: scale(1);   opacity: 1;   }',
  '}',
  '@media (prefers-reduced-motion: reduce) {',
  '  .site-bot-dot { animation: none !important; opacity: 0.7 !important; }',
  '}',
].join('\n')

function TypingDots({ color }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '4px 2px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="site-bot-dot"
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: color,
            display: 'inline-block',
            animation: 'bot-bounce 1.2s ease-in-out ' + (i * 0.2) + 's infinite',
          }}
        />
      ))}
      {/* A loading indicator, so it is exempt from the no-perpetual-motion rule */}
      <style>{KEYFRAMES}</style>
    </div>
  )
}

function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: GREETING }])
  const [asked, setAsked] = useState([])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const launcherRef = useRef(null)
  const panelRef = useRef(null)

  // Any part of the page can call the bot over.
  useEffect(() => {
    const openFromPage = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, openFromPage)
    return () => window.removeEventListener(OPEN_EVENT, openFromPage)
  }, [])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Scroll the thread, never the page.
  useEffect(() => {
    if (!open) return
    const list = bottomRef.current?.parentElement
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, typing, open])

  const handleQuestion = (faq, idx) => {
    if (asked.includes(idx) || typing) return

    setMessages((prev) => [...prev, { from: 'user', text: faq.q }])
    setAsked((prev) => [...prev, idx])
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { from: 'bot', text: faq.a }])
    }, 900)
  }

  const handleReset = () => {
    setMessages([{ from: 'bot', text: GREETING }])
    setAsked([])
    setTyping(false)
  }

  const toggle = () => {
    setOpen((prev) => {
      if (prev) return false
      window.gtag?.('event', 'chat_open', { source: BOT_NAME })
      return true
    })
  }

  const avatar = (size) => (
    <MessageBlobAvatar
      size={size}
      color={THEME.primary}
      dark={THEME.primaryDark}
      ring={THEME.ring}
      name={BOT_NAME}
    />
  )

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          className="site-bot-panel"
          role="dialog"
          aria-label={'Chat with ' + BOT_NAME}
          tabIndex={-1}
          style={{
            position: 'fixed',
            right: '1.25rem',
            bottom: 'calc(2rem + 72px)',
            width: '340px',
            maxWidth: 'calc(100vw - 2.5rem)',
            maxHeight: 'calc(100vh - 2rem - 110px)',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#fff',
            border: '1px solid #e9ecef',
            boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
            zIndex: 1060,
            outline: 'none',
          }}
        >
          {/* Header */}
          <div style={{ background: THEME.primary, padding: '0.7rem 0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {avatar(36)}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}>{BOT_NAME}</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem' }}>
                <span style={{ color: '#4ade80', marginRight: '5px' }}>●</span>Online, answers instantly
              </div>
            </div>
            <button
              onClick={handleReset}
              aria-label="Clear chat"
              title="Clear chat"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', color: '#fff', padding: '5px 9px', fontSize: '0.72rem', cursor: 'pointer' }}
            >
              Clear
            </button>
            <button
              onClick={() => { setOpen(false); launcherRef.current?.focus() }}
              aria-label="Close chat"
              title="Close chat"
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.15rem', lineHeight: 1, padding: '2px 4px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{ background: '#f8f9fa', padding: '0.9rem', flex: 1, minHeight: '180px', overflowY: 'auto' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px', alignItems: 'flex-end', gap: '6px' }}
              >
                {msg.from === 'bot' && avatar(26)}
                <div style={{
                  maxWidth: '80%',
                  padding: '8px 12px',
                  borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  background: msg.from === 'user' ? THEME.primary : '#fff',
                  color: msg.from === 'user' ? '#fff' : '#212529',
                  fontSize: '0.85rem',
                  lineHeight: 1.55,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '10px' }}>
                {avatar(26)}
                <div style={{ background: '#fff', borderRadius: '4px 16px 16px 16px', padding: '8px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                  <TypingDots color={THEME.primary} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick-reply chips */}
          <div style={{ background: '#fff', padding: '0.7rem 0.85rem', borderTop: '1px solid #e9ecef', maxHeight: '148px', overflowY: 'auto' }}>
            <p style={{ fontSize: '0.72rem', color: '#888', marginBottom: '8px' }}>
              {asked.length === faqs.length ? 'All answered. Clear to start over.' : 'Tap a question:'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {faqs.map((faq, i) => {
                const done = asked.includes(i)
                return (
                  <button
                    key={i}
                    className="faq-chip"
                    onClick={() => handleQuestion(faq, i)}
                    disabled={done || typing}
                    style={{
                      padding: '5px 11px',
                      borderRadius: '18px',
                      border: '1px solid ' + (done ? '#dee2e6' : THEME.primary),
                      background: done ? '#f1f3f5' : '#fff',
                      color: done ? '#aaa' : THEME.primary,
                      fontSize: '0.76rem',
                      cursor: done ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      textDecoration: done ? 'line-through' : 'none',
                    }}
                  >
                    {faq.q}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Handoff to a human. Email only: this site's phone fields are still
              placeholders, so the bot must not print a number. */}
          <a
            href={HANDOFF.href}
            style={{ display: 'block', textAlign: 'center', background: THEME.primaryDark, color: '#fff', padding: '10px', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}
          >
            {HANDOFF.label}
          </a>
        </div>
      )}

      {/* Launcher */}
      <button
        ref={launcherRef}
        className="site-bot-launcher"
        onClick={toggle}
        aria-label={'Chat with ' + BOT_NAME}
        aria-expanded={open}
        title={'Chat with ' + BOT_NAME}
        style={{
          position: 'fixed',
          right: '1.25rem',
          bottom: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid #fff',
          background: THEME.primary,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          cursor: 'pointer',
          zIndex: 1061,
        }}
      >
        {open
          ? <span aria-hidden="true" style={{ color: '#fff', fontSize: '1.6rem', lineHeight: 1 }}>×</span>
          : avatar(54)}
      </button>
    </>
  )
}

export default ChatBot
