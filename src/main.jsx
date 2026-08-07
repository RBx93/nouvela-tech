import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/custom.scss'
import App from './App.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }
window.scrollTo(0, 0)

// House scroll-motion settings — keep these values in step across the sites;
// the reveal cadence is part of the brand, not a per-project decision.
AOS.init({
  duration: 600,
  once: true,
  easing: 'ease-in-out',
  offset: 100,
  delay: 0,
  // AOS hides content until it reveals it, so a reduced-motion visitor has to
  // be opted out entirely rather than given a shorter animation — otherwise
  // the page reads as half-empty to them. The CSS override in the stylesheet
  // is the other half of this and is not optional.
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  anchorPlacement: 'top-bottom'
})

// Jumping to a section via the nav lands on content AOS has not revealed yet,
// so the section reads as empty for a beat and then fades in — it looks like
// the page is loading late. Reveal the destination immediately instead; the
// scroll-in animation is for people scrolling, not for someone who asked to be
// taken straight there.
function revealTarget(hash) {
  if (!hash || hash.length < 2) return
  let target
  try { target = document.querySelector(hash) } catch { return }
  if (!target) return
  for (const el of [target, ...target.querySelectorAll('[data-aos]')]) {
    if (el.hasAttribute && el.hasAttribute('data-aos')) {
      el.classList.add('aos-animate', 'aos-jump-reveal')
    }
  }
}
document.addEventListener('click', (e) => {
  const link = e.target.closest && e.target.closest('a[href^="#"]')
  if (link) revealTarget(link.getAttribute('href'))
}, true)
window.addEventListener('hashchange', () => revealTarget(window.location.hash))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
