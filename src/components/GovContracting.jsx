import { Container, Row, Col } from 'react-bootstrap'

const credentials = [
  { label: 'UEI', value: 'H3Q5W9SYFF44', desc: 'Unique Entity Identifier' },
  { label: 'CAGE / NCAGE', value: '11UF7', desc: 'Commercial & Government Entity' },
  { label: 'SAM.gov', value: 'Active', desc: 'System for Award Management' },
  { label: 'Business Type', value: 'SB', desc: 'SBA-Registered Small Business · Florida LLC' },
]

const naicsCodes = [
  { code: '541511', title: 'Custom Computer Programming Services' },
  { code: '541512', title: 'Computer Systems Design Services' },
  { code: '518210', title: 'Data Processing, Hosting & Related Services' },
  { code: '541370', title: 'Geospatial Information Services (GIS)' },
  { code: '561110', title: 'Office Administrative Services' },
  { code: '238290', title: 'Other Building Equipment Contractors' },
  { code: '236220', title: 'Commercial and Institutional Building Construction' },
]

const capabilities = [
  { icon: '🚪', title: 'Facility Support', desc: 'Door hardware replacement, ADA compliance upgrades, and minor construction for federal facilities.' },
  { icon: '🗺️', title: 'Geospatial Services (GIS)', desc: 'Mapping, data management, and GIS portal maintenance for federal agencies and environmental programs.' },
  { icon: '📋', title: 'Administrative Support', desc: 'Federal program management, scheduling, and TAP office support for government organizations.' },
  { icon: '🚨', title: 'Emergency Preparedness', desc: 'Emergency kit supply and logistics support for agency readiness and continuity programs.' },
]

function GovContracting() {
  return (
    <section id="govcon" className="nt-govcon">
      <Container>

        {/* Header */}
        <Row className="mb-5">
          <Col lg={8}>
            <div className="section-eyebrow">Government Contracting</div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff' }}>
              A Registered Federal Contractor
            </h2>
            <p style={{ color: '#94a3b8', marginTop: '0.75rem', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Nouvela Technology Group LLC is a Florida-based SBA-registered small business delivering software
              engineering, geospatial services, administrative program support, and technical services to
              government agencies. We target micro-purchase, simplified acquisition, and small business set-aside
              contracts under $5M across federal, state, and local government sectors — as both Prime and Subcontractor.
            </p>
          </Col>
        </Row>

        {/* SAM Credentials */}
        <Row className="g-3 mb-5">
          {credentials.map((c, i) => (
            <Col sm={6} lg={3} key={i}>
              <div className="govcon-credential">
                <div className="cred-label">{c.label}</div>
                <div className="cred-value">{c.value}</div>
                <div className="cred-desc">{c.desc}</div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="g-5 align-items-start">

          {/* NAICS Codes */}
          <Col lg={4}>
            <h5 className="govcon-subhead">NAICS Codes</h5>
            <div className="naics-list">
              {naicsCodes.map((n, i) => (
                <div className="naics-item" key={i}>
                  <span className="naics-code">{n.code}</span>
                  <span className="naics-title">{n.title}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-nt-primary text-decoration-none d-inline-block mt-4">
              Request Capabilities Statement
            </a>
          </Col>

          {/* Core Capabilities */}
          <Col lg={8}>
            <h5 className="govcon-subhead">Core Capabilities</h5>
            <Row className="g-3">
              {capabilities.map((c, i) => (
                <Col sm={6} key={i}>
                  <div className="govcon-cap-card">
                    <div className="cap-icon">{c.icon}</div>
                    <h6>{c.title}</h6>
                    <p>{c.desc}</p>
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

export default GovContracting
