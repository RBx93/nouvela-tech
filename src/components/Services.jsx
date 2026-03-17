import { Container, Row, Col } from 'react-bootstrap'

const services = [
  {
    icon: '💻',
    title: 'Software Engineering',
    desc: 'Custom applications, workflow automation, dashboards, and systems integration support designed to improve organizational performance.',
    bullets: ['Internal business applications', 'Workflow automation', 'Dashboard & reporting tools', 'Systems integration support'],
  },
  {
    icon: '⚡',
    title: 'Power Platform Solutions',
    desc: 'Business applications and automations built on Microsoft technologies to streamline operations and reduce manual effort.',
    bullets: ['Power Apps', 'Power Automate', 'Dataverse', 'Process automation & reporting'],
  },
  {
    icon: '📋',
    title: 'Administrative & Program Support',
    desc: 'Structured support services that help teams stay organized, compliant, and efficient across federal and commercial environments.',
    bullets: ['Scheduling & coordination', 'Documentation support', 'Data entry & records management', 'Program tracking'],
  },
  {
    icon: '🗺️',
    title: 'Geospatial Services (GIS)',
    desc: 'Mapping, spatial analysis, geospatial data organization, and GIS portal maintenance for federal and environmental programs.',
    bullets: ['GIS mapping & analysis', 'Spatial data management', 'GIS portal development', 'Environmental data reporting'],
  },
  {
    icon: '🔧',
    title: 'Technical & Professional Services',
    desc: 'Special project support combining organization, technology, analysis, and execution for government and commercial clients.',
    bullets: ['Program management support', 'Technical analysis', 'Facility support services', 'Emergency preparedness logistics'],
  },
  {
    icon: '🤖',
    title: 'Emerging AI Applications',
    desc: 'Practical artificial intelligence integration for field use — automating workflows, improving data visibility, and enabling smarter decisions.',
    bullets: ['AI-enabled workflow automation', 'Data-driven process improvement', 'Human-centered AI design', 'Community & health tech applications'],
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
              Services Built for Mission Success
            </h2>
            <p style={{ color: '#94a3b8', marginTop: '0.75rem', fontSize: '0.95rem' }}>
              From software engineering to program support — we deliver practical, high-value solutions
              that help organizations improve operations and achieve measurable outcomes.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {services.map((s, i) => (
            <Col md={6} lg={4} key={i}>
              <div className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p style={{ marginBottom: '0.75rem' }}>{s.desc}</p>
                <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                  {s.bullets.map((b, j) => (
                    <li key={j} style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.7 }}>{b}</li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services
