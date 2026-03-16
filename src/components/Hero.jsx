import { Container, Row, Col } from 'react-bootstrap'

function Hero() {
  return (
    <section id="hero" className="nt-hero">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="hero-badge">Web · Mobile · Business Growth</div>
            <h1>
              We Build Websites That <span className="gradient-text">Work For You</span>
            </h1>
            <p className="hero-sub">
              Nouvela Technology Group crafts fast, modern websites for small businesses —
              from local service providers to community organizations. Clean code, real results.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#portfolio" className="btn-nt-primary text-decoration-none">See Our Work</a>
              <a href="#contact" className="btn-nt-outline text-decoration-none">Start a Project</a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">4+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat">
                <div className="stat-value">100%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat">
                <div className="stat-value">3</div>
                <div className="stat-label">Live Sites</div>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="hero-visual">
              <div className="code-block">
                <div><span className="cmt">// Nouvela Technology Group</span></div>
                <div><span className="kw">const</span> <span className="fn">buildYourBusiness</span> = () =&gt; &#123;</div>
                <div>&nbsp;&nbsp;<span className="kw">return</span> &#123;</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;design: <span className="str">'modern &amp; clean'</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;performance: <span className="str">'blazing fast'</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;seo: <span className="str">'built-in'</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;support: <span className="str">'ongoing'</span>,</div>
                <div>&nbsp;&nbsp;&#125;</div>
                <div>&#125;</div>
                <div style={{ marginTop: '0.75rem' }}>
                  <span className="fn">buildYourBusiness</span>()
                  &nbsp;<span className="cmt">// ✓ deployed</span>
                </div>
              </div>
              <div className="visual-footer">
                <div className="dot red" />
                <div className="dot yellow" />
                <div className="dot green" />
                <span>nouvela.dev — live</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
