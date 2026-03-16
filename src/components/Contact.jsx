import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const services = [
  'New Website',
  'Redesign / Refresh',
  'Admin Portal / CMS',
  'E-Commerce',
  'SEO & Analytics',
  'Other',
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    // TODO: wire up EmailJS
    console.log('Contact form:', form)
    setSent(true)
  }

  return (
    <section id="contact" className="nt-contact">
      <Container>
        <Row className="g-5 align-items-start">
          <Col lg={5}>
            <div className="section-eyebrow" style={{ color: '#a78bfa', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Contact
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff', marginBottom: '1rem' }}>
              Let's Build Something
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '2.5rem' }}>
              Ready to take your business online? Tell us about your project and we'll
              get back to you within 24 hours.
            </p>

            <div className="contact-info">
              <div className="ci-icon">📧</div>
              <div className="ci-text">
                <p>Email</p>
                <a href="mailto:hello@nouvelatech.com">hello@nouvelatech.com</a>
              </div>
            </div>
            <div className="contact-info">
              <div className="ci-icon">📍</div>
              <div className="ci-text">
                <p>Based in</p>
                <strong>North Carolina</strong>
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
                        placeholder="Describe your business, what you need, and any timeline..."
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col xs={12}>
                      <button type="submit" className="btn-nt-primary w-100">
                        Send Message →
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
