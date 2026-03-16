import { Container, Row, Col } from 'react-bootstrap'

const services = [
  {
    icon: '🎨',
    title: 'Custom Web Design',
    desc: 'Pixel-perfect, brand-aligned designs built to convert visitors into customers. Mobile-first, always.',
  },
  {
    icon: '⚡',
    title: 'React Development',
    desc: 'Fast, modern single-page applications using React, Vite, and Bootstrap 5. Built to scale.',
  },
  {
    icon: '🔥',
    title: 'Admin Portals & CMS',
    desc: 'Firebase-powered dashboards so you control your content — events, members, galleries — no developer needed.',
  },
  {
    icon: '🌐',
    title: 'Hosting & Deployment',
    desc: 'Azure Static Web Apps with CI/CD from GitHub. Zero-downtime deploys and global CDN performance.',
  },
  {
    icon: '📈',
    title: 'SEO & Analytics',
    desc: 'Google Analytics, Search Console, local business schema, and keyword strategy baked in from day one.',
  },
  {
    icon: '🔒',
    title: 'Security & Auth',
    desc: 'Firebase Auth with role-based access, rate limiting, and hardened Firestore rules for production apps.',
  },
]

function Services() {
  return (
    <section id="services" className="nt-services">
      <Container>
        <Row className="mb-5">
          <Col lg={7}>
            <div className="section-eyebrow">What We Do</div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff' }}>
              Everything Your Business Needs Online
            </h2>
            <p style={{ color: '#94a3b8', marginTop: '0.75rem', fontSize: '0.95rem' }}>
              From initial design to post-launch growth — we handle the full stack so you can focus on running your business.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {services.map((s, i) => (
            <Col md={6} lg={4} key={i}>
              <div className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services
