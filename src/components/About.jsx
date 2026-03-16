import { Container, Row, Col } from 'react-bootstrap'

const features = [
  {
    icon: '🎯',
    title: 'Small Business Focused',
    desc: 'We specialize in local service businesses and community organizations — not enterprise giants.',
  },
  {
    icon: '🛠️',
    title: 'Full-Stack Delivery',
    desc: 'Design, development, hosting, and post-launch support. One partner, zero hand-offs.',
  },
  {
    icon: '📱',
    title: 'Mobile-First Always',
    desc: 'Every site is built for the phone first. Because that\'s where your customers are.',
  },
  {
    icon: '🤝',
    title: 'Long-Term Partnership',
    desc: 'We stay involved after launch — updates, new features, and growth strategy on your schedule.',
  },
]

function About() {
  return (
    <section id="about" className="nt-about">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={5}>
            <div className="section-eyebrow" style={{ color: '#a78bfa', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Who We Are
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff', marginBottom: '1.25rem' }}>
              A Tech Partner Built for Small Business
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1rem' }}>
              Nouvela Technology Group LLC is a boutique web development agency focused on helping small
              businesses and community organizations establish a powerful online presence.
            </p>
            <p style={{ color: '#94a3b8', lineHeight: 1.75, fontSize: '0.95rem' }}>
              We build with the same tools used by Fortune 500 companies — React, Firebase, Azure —
              but priced and packaged for the business owner who needs real results without the
              enterprise price tag.
            </p>
            <a href="#contact" className="btn-nt-primary text-decoration-none d-inline-block mt-4">
              Work With Us
            </a>
          </Col>

          <Col lg={7}>
            <Row className="g-3">
              {features.map((f, i) => (
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
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About
