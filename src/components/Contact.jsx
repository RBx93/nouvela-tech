import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import emailjs from '@emailjs/browser'

const services = [
  'Software Engineering',
  'Power Platform Solutions',
  'Administrative & Program Support',
  'Geospatial Services (GIS)',
  'Technical & Professional Services',
  'Emerging AI Applications',
  'Government Subcontracting',
  'Other',
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Not provided',
          service: form.service || 'Not specified',
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSent(true)
    } catch (err) {
      setError('Something went wrong. Please email us directly at info@novelatechnologygroup.com')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="nt-contact">
      <Container>
        <Row className="g-5 align-items-start">
          <Col lg={5}>
            <div className="section-eyebrow" style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Contact</div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff', marginBottom: '1rem' }}>
              Let's Build Solutions That Work
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '2.5rem' }}>
              Whether you need technical support, operational help, or a dependable partner for project
              execution — reach out to discuss your project, partnership opportunity, or service need.
            </p>

            <div className="contact-info">
              <div className="ci-icon">📧</div>
              <div className="ci-text">
                <p>Email</p>
                <a href="mailto:info@novelatechnologygroup.com">info@novelatechnologygroup.com</a>
              </div>
            </div>
            <div className="contact-info">
              <div className="ci-icon">📍</div>
              <div className="ci-text">
                <p>Based in</p>
                <strong>Winter Garden, FL</strong>
              </div>
            </div>
            <div className="contact-info">
              <div className="ci-icon">⏱️</div>
              <div className="ci-text">
                <p>Response time</p>
                <strong>Within 24 hours</strong>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <div className="contact-card">
              {sent ? (
                <div className="text-center py-4">
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                  <h4 style={{ color: '#fff', fontWeight: 700 }}>Message Sent!</h4>
                  <p style={{ color: '#94a3b8' }}>We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col sm={6}>
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={6}>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={6}>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-control"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={6}>
                      <label htmlFor="service">Service Needed</label>
                      <select
                        id="service"
                        name="service"
                        className="form-select"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service...</option>
                        {services.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Col>
                    <Col xs={12}>
                      <label htmlFor="message">Tell Us About Your Project *</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows={5}
                        placeholder="Describe your project, partnership opportunity, or service need..."
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    {error && (
                      <Col xs={12}>
                        <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>{error}</p>
                      </Col>
                    )}
                    <Col xs={12}>
                      <button type="submit" className="btn-nt-primary w-100" disabled={sending}>
                        {sending ? 'Sending...' : 'Send Message →'}
                      </button>
                    </Col>
                  </Row>
                </form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
