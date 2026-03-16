import { Container, Row, Col } from 'react-bootstrap'

const projects = [
  {
    title: "Bassy Handyman Co.",
    desc: "Full-service handyman website with contact form, gallery, before/after slider, and Google Analytics.",
    tags: ["React 19", "Bootstrap 5", "EmailJS", "Azure"],
    url: "https://black-grass-0bd5c040f.6.azurestaticapps.net",
    status: "live",
  },
  {
    title: "Iota Omega Chapter",
    desc: "Fraternity chapter site with Firebase admin portal, live event calendar, member database, and photo archives.",
    tags: ["React 18", "Firebase", "Vercel", "Bootstrap"],
    url: "https://iotaomega1923.com",
    status: "live",
  },
  {
    title: "Bryant's Lawn Care Services LLC",
    desc: "Lawn care service site with quote request form, service showcase, before/after comparisons, and FAQ.",
    tags: ["React 19", "Bootstrap 5", "SCSS", "Azure"],
    url: null,
    status: "In Development",
  },
]

function Portfolio() {
  return (
    <section id="portfolio" className="nt-portfolio">
      <Container>
        <Row className="mb-5">
          <Col lg={8}>
            <div className="section-eyebrow" style={{ color: '#a78bfa', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
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
                      background: '#12121f',
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
