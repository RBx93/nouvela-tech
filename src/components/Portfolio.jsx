import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import projects from '../data/projects'

const VISIBLE_COUNT = 6

const statusLabels = {
  live: 'Live',
  in_development: 'In Development',
  planning: 'Planning',
}

function Portfolio() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, VISIBLE_COUNT)

  // Cards revealed by "Show more" mount after useFadeInAll() has already
  // attached its observers, so they'd stay at opacity 0. Fade them in here.
  useEffect(() => {
    if (!showAll) return
    document.querySelectorAll('.nt-portfolio .fade-up:not(.visible)')
      .forEach(el => el.classList.add('visible'))
  }, [showAll])

  return (
    <section id="portfolio" className="nt-portfolio">
      <Container>
        <Row className="mb-5 fade-up">
          <Col lg={8}>
            <div className="section-eyebrow" data-aos="fade-up">
              Our Work
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" style={{ fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff' }}>
              Real Sites, Real Clients
            </h2>
            <p style={{ color: '#94a3b8', marginTop: '0.75rem', fontSize: '0.95rem' }}>
              Every project is built custom — no templates, no shortcuts. Here's what we've shipped.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {visibleProjects.map((p, i) => (
            <Col md={6} lg={4} key={i} className={`fade-up delay-${(i % 3) + 1}`}>
              <div className="portfolio-card h-100 hover-lift">
                <div className="preview-wrap">
                  {p.url ? (
                    <>
                      <img
                        src={p.preview || `https://api.microlink.io/?url=${encodeURIComponent(p.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt={`${p.title} preview`}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                      <div style={{ display: 'none', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#0d1a2e', color: '#94a3b8', fontSize: '0.85rem' }}>
                        Preview unavailable
                      </div>
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
                      {statusLabels[p.status] || p.status}
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

        {projects.length > VISIBLE_COUNT && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="outline-light"
                onClick={() => setShowAll(s => !s)}
                style={{ borderRadius: '2rem', padding: '0.5rem 1.75rem', fontWeight: 600 }}
              >
                {showAll ? 'Show less' : `Show more (${projects.length - VISIBLE_COUNT})`}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  )
}

export default Portfolio
