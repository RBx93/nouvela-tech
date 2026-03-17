import { Container, Row, Col } from 'react-bootstrap'

const whyUs = [
  {
    icon: '🎯',
    title: 'Practical Execution',
    desc: 'We focus on solutions that can actually be implemented, used, and maintained — not just designed.',
  },
  {
    icon: '🏛️',
    title: 'Mission-Oriented Thinking',
    desc: 'We care about the purpose behind the work. Every engagement is evaluated by the outcome it creates.',
  },
  {
    icon: '🔄',
    title: 'Adaptable Support',
    desc: 'Structured to support short-term projects and long-term growth — as a prime or subcontracting partner.',
  },
  {
    icon: '🤖',
    title: 'Technology with Real-World Use',
    desc: 'We apply technology where it creates measurable community and operational value — including emerging AI.',
  },
]

const focusAreas = [
  'Government support services',
  'Operational modernization',
  'Digital transformation',
  'Small business & subcontracting partnerships',
  'Health & outreach support solutions',
  'Human-centered technology design',
  'AI for practical field use',
]

function About() {
  return (
    <section id="about" className="nt-about">
      <Container>
        <Row className="align-items-start g-5 mb-5">
          <Col lg={5}>
            <div className="section-eyebrow">Who We Are</div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff', marginBottom: '1.25rem' }}>
              Technology. Service. Impact.
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Nouvela Technology Group LLC is a growing technology and professional services company
              built to provide dependable, adaptable, and forward-looking support for government,
              commercial, and community-focused initiatives.
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Our long-term vision is to become a trusted implementation partner for organizations that
              need both <strong style={{ color: '#e2e8f0' }}>technical skill</strong> and <strong style={{ color: '#e2e8f0' }}>operational reliability</strong> — sitting at the intersection
              of technology, service, and impact.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h6 style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Focus Areas
              </h6>
              <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                {focusAreas.map((f, i) => (
                  <li key={i} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.8 }}>{f}</li>
                ))}
              </ul>
            </div>

            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.8 }}>
              <div>📍 1052 Narrow Gauge Ct, Winter Garden, FL 34787</div>
              <div>🏢 Florida LLC · SBA Small Business</div>
            </div>
          </Col>

          <Col lg={7}>
            <h6 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Why Nouvela
            </h6>
            <Row className="g-3">
              {whyUs.map((f, i) => (
                <Col sm={6} key={i}>
                  <div className="about-feature">
                    <div className="icon-wrap">{f.icon}</div>
                    <div className="text">
                      <h5>{f.title}</h5>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <div style={{
              marginTop: '2rem',
              background: '#0d1a2e',
              border: '1px solid #1a2d4a',
              borderRadius: '0.75rem',
              padding: '1.5rem',
            }}>
              <h6 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Our Vision</h6>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.75, margin: 0 }}>
                We are building a company known for <strong style={{ color: '#e2e8f0' }}>reliability</strong>, <strong style={{ color: '#e2e8f0' }}>disciplined execution</strong>, and <strong style={{ color: '#e2e8f0' }}>technical adaptability</strong> —
                expanding into advanced digital services, data and automation support, AI integration,
                and health and outreach technology.
              </p>
            </div>

            <a href="#contact" className="btn-nt-primary text-decoration-none d-inline-block mt-4">
              Work With Us
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About
