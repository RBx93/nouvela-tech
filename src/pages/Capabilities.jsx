import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const credentials = [
  { label: 'Legal Name', value: 'Nouvela Technology Group, LLC' },
  { label: 'UEI', value: 'H3Q5W9SYFF44' },
  { label: 'CAGE / NCAGE', value: '11UF7' },
  { label: 'SAM.gov Status', value: 'Active' },
  { label: 'Business Type', value: 'Small Business · Florida LLC' },
  { label: 'SBA Registered', value: 'Yes' },
  { label: 'Location', value: 'Winter Garden, FL 34787' },
  { label: 'Contract Vehicles', value: 'Micro-Purchase · Simplified Acquisition · Set-Aside' },
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

const competencies = [
  {
    icon: '💻',
    title: 'Software & Web Development',
    points: [
      'Custom web portals and dashboards',
      'React-based single-page applications',
      'Firebase Auth and role-based access control',
      'Azure cloud hosting and CI/CD deployment',
    ],
  },
  {
    icon: '📊',
    title: 'Data & Geospatial Services',
    points: [
      'GIS mapping and spatial data management',
      'Data processing and analytics dashboards',
      'GIS portal development and maintenance',
      'Environmental and program data reporting',
    ],
  },
  {
    icon: '📋',
    title: 'Administrative Program Support',
    points: [
      'Federal program management and scheduling',
      'TAP office administrative support',
      'Documentation, reporting, and compliance',
      'Office administrative services',
    ],
  },
  {
    icon: '🏗️',
    title: 'Facility & Construction Support',
    points: [
      'Light construction and facility upgrades',
      'ADA compliance improvements',
      'Commercial and institutional building work',
      'Emergency preparedness kit logistics',
    ],
  },
]

function Capabilities() {
  return (
    <div style={{ paddingTop: '80px', background: '#06101e', minHeight: '100vh' }}>
      <Container className="py-5">

        {/* Header */}
        <Row className="mb-5">
          <Col lg={8}>
            <Link to="/" className="text-decoration-none mb-4 d-inline-block" style={{ color: '#60a5fa', fontSize: '0.85rem' }}>
              ← Back to Home
            </Link>
            <div className="section-eyebrow" style={{ color: '#60a5fa', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Government Contracting
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
              Capabilities Overview
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '620px' }}>
              Nouvela Technology Group LLC is an SBA-registered small business and active SAM.gov registrant
              seeking micro-purchase, simplified acquisition, and small business set-aside opportunities
              across federal, state, and local government agencies.
            </p>
          </Col>
          <Col lg={4} className="d-flex align-items-start justify-content-lg-end mt-4 mt-lg-5">
            <a
              href="mailto:info@novelatechnologygroup.com?subject=Capabilities Statement Request"
              className="btn-nt-primary text-decoration-none"
              style={{ whiteSpace: 'nowrap' }}
            >
              Request Capabilities Statement
            </a>
          </Col>
        </Row>

        {/* Company Data */}
        <Row className="mb-5">
          <Col>
            <h5 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Company Data
            </h5>
            <div className="govcon-credential-grid">
              {credentials.map((c, i) => (
                <div key={i} className="cap-data-row">
                  <span className="cap-data-label">{c.label}</span>
                  <span className="cap-data-value">{c.value}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* NAICS */}
        <Row className="mb-5">
          <Col>
            <h5 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              NAICS Codes
            </h5>
            <div className="naics-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {naicsCodes.map((n, i) => (
                <div className="naics-item" key={i}>
                  <span className="naics-code">{n.code}</span>
                  <span className="naics-title">{n.title}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Core Competencies */}
        <Row className="mb-5">
          <Col>
            <h5 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Core Competencies
            </h5>
            <Row className="g-4">
              {competencies.map((c, i) => (
                <Col md={6} key={i}>
                  <div className="govcon-cap-card" style={{ height: '100%' }}>
                    <div className="cap-icon">{c.icon}</div>
                    <h6>{c.title}</h6>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                      {c.points.map((p, j) => (
                        <li key={j} style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '0.2rem' }}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* CTA */}
        <Row>
          <Col>
            <div style={{
              background: '#0d1a2e',
              border: '1px solid #1a2d4a',
              borderRadius: '1rem',
              padding: '2.5rem',
              textAlign: 'center',
            }}>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.75rem' }}>
                Interested in Working Together?
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                Request our full capabilities statement or reach out directly to discuss upcoming opportunities.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a
                  href="mailto:info@novelatechnologygroup.com?subject=Capabilities Statement Request"
                  className="btn-nt-primary text-decoration-none"
                >
                  Request Capabilities Statement
                </a>
                <Link to="/#contact" className="btn-nt-outline text-decoration-none">
                  Contact Us
                </Link>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default Capabilities
