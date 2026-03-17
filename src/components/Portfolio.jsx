import { Container, Row, Col } from 'react-bootstrap'
import projects from '../data/projects'

function Portfolio() {
  return (
    <section id="portfolio" className="nt-portfolio">
      <Container>
        <Row className="mb-5">
          <Col lg={8}>
            <div className="section-eyebrow">
              Our Work
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff' }}>
              Real Sites, Real Clients
            </h2>
            <p style={{ color: '#94a3b8', marginTop: '0.75rem', fontSize: '0.95rem' }}>
              Every project is built custom — no templates, no shortcuts. Here's what we've shipped.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {projects.map((p, i) => (
            <Col md={6} lg={4} key={i}>
              <div className="portfolio-card h-100">
                <div className="preview-wrap">
                  {p.url ? (
                    <>
                      <iframe
                        src={p.url}
                        title={p.title}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                      <div className="preview-overlay">
                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                          View Live Site ↗
                        </a>
                      </div>
                    </>
                  ) : (
                    <div style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#0d1a2e',
                      color: '#f59e0b',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}>
                      🚧 Coming Soon
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <div>
                    {p.tags.map((t, j) => (
                      <span className="tag" key={j}>{t}</span>
                    ))}
                  </div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <div className="card-footer-nt">
                    <span className={`status-dot${p.status !== 'live' ? ' planning' : ''}`}>
                      {p.status === 'live' ? 'Live' : p.status}
                    </span>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        Visit site ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Portfolio
