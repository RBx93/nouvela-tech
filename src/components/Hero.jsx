import { Container, Row, Col } from 'react-bootstrap'

function Hero() {
  return (
    <section id="hero" className="nt-hero">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="hero-badge">Technology. Operations. Impact.</div>
            <h1>
              Practical Solutions. <span className="gradient-text">Real-World Results.</span>
            </h1>
            <p className="hero-sub">
              Nouvela Technology Group LLC delivers high-value solutions across software engineering,
              administrative support, geospatial services, and program management — helping organizations
              improve operations and support mission success.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#govcon" className="btn-nt-primary text-decoration-none">Government Contracting</a>
              <a href="#contact" className="btn-nt-outline text-decoration-none">Get in Touch</a>
            </div>

            <div className="hero-stats">
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

          <Col lg={6}>
            <div className="hero-visual">
              <div className="code-block">
                <div><span className="cmt">// Nouvela Technology Group LLC</span></div>
                <div><span className="kw">const</span> <span className="fn">mission</span> = &#123;</div>
                <div>&nbsp;&nbsp;focus: <span className="str">'technology + operations'</span>,</div>
                <div>&nbsp;&nbsp;delivery: <span className="str">'practical + scalable'</span>,</div>
                <div>&nbsp;&nbsp;clients: <span className="str">'gov + commercial'</span>,</div>
                <div>&nbsp;&nbsp;ai_ready: <span className="kw">true</span>,</div>
                <div>&nbsp;&nbsp;registered: <span className="str">'SAM.gov active'</span>,</div>
                <div>&#125;</div>
                <div style={{ marginTop: '0.75rem' }}>
                  <span className="fn">mission</span>.execute()
                  &nbsp;<span className="cmt">// ✓ impact delivered</span>
                </div>
              </div>
              <div className="visual-footer">
                <div className="dot red" />
                <div className="dot yellow" />
                <div className="dot green" />
                <span>nouvela.tech — active</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
