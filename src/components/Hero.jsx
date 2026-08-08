import { Container, Row, Col } from 'react-bootstrap'
import GeospatialNetwork from './GeospatialNetwork'

function Hero() {
  return (
    <section id="hero" className="nt-hero">
      {/* Terrain, readability scrim, then the live survey network. All three
          are decorative and sit behind the copy — see .nt-hero in custom.scss
          for the z-index stack. */}
      <div className="nv-bg" aria-hidden="true" />
      <div className="nv-scrim" aria-hidden="true" />
      <GeospatialNetwork />
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="hero-badge load-in" style={{ '--i': 0 }}>Technology. Operations. Impact.</div>
            <h1 className="load-in" style={{ '--i': 1 }}>
              Practical Solutions. <span className="gradient-text draw-rule" style={{ '--i': 1 }}>Real-World Results.</span>
            </h1>
            <p className="hero-sub load-in" style={{ '--i': 2 }}>
              Nouvela Technology Group LLC delivers high-value solutions across software engineering,
              administrative support, geospatial services, and program management — helping organizations
              improve operations and support mission success.
            </p>
            <div className="d-flex gap-3 flex-wrap load-in" style={{ '--i': 3 }}>
              <a href="#govcon" className="btn-nt-primary text-decoration-none">Government Contracting</a>
              <a href="#contact" className="btn-nt-outline text-decoration-none">Get in Touch</a>
            </div>

            <div className="hero-stats load-in" style={{ '--i': 4 }}>
              <div className="stat">
                <div className="stat-value">SAM</div>
                <div className="stat-label">Active Registrant</div>
              </div>
              <div className="stat">
                <div className="stat-value">SBA</div>
                <div className="stat-label">Small Business</div>
              </div>
              <div className="stat">
                <div className="stat-value">5+</div>
                <div className="stat-label">Service Areas</div>
              </div>
            </div>
          </Col>

          {/* The right column is deliberately empty. It used to hold a mock
              code window, which read as a developer portfolio and undercut the
              federal-contracting positioning. The terrain and its survey
              network now occupy that half. */}
        </Row>
      </Container>
    </section>
  )
}

export default Hero
