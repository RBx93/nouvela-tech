import { Container, Row, Col } from 'react-bootstrap'
import logo from '/logoWithoutLLC.png'
import logoIcon from '/logoIcon.png'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="nt-footer">
      <img src={logo} alt="" aria-hidden="true" className="footer-bg-logo" />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="g-4">
          <Col lg={4} className="brand-col text-center text-lg-start">
            <div className="footer-brand-block">
              <img src={logoIcon} alt="" aria-hidden="true" className="footer-shield-overlay" />
              <p>
                SBA-registered small business delivering software engineering, GIS services,
                program support, and technical services to government and commercial clients.
              </p>
            </div>
          </Col>

          <Col sm={4} lg={2}>
            <h6>Navigate</h6>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#govcon">Gov Contracting</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>

          <Col sm={4} lg={3}>
            <h6>Client Sites</h6>
            <ul>
              <li><a href="https://black-grass-0bd5c040f.6.azurestaticapps.net" target="_blank" rel="noopener noreferrer">Bassy Handyman Co.</a></li>
              <li><a href="https://iotaomega1923.com" target="_blank" rel="noopener noreferrer">Iota Omega Chapter</a></li>
              <li><a href="#portfolio">Bryant's Lawn Care (soon)</a></li>
            </ul>
          </Col>

          <Col sm={4} lg={3}>
            <h6>Contact</h6>
            <ul>
              <li><a href="mailto:info@novelatechnologygroup.com">info@novelatechnologygroup.com</a></li>

              <li><span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Winter Garden, FL 34787</span></li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p>© {year} Nouvela Technology Group LLC. All rights reserved.</p>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0 }}>UEI: H3Q5W9SYFF44</p>
            <p style={{ margin: 0 }}>CAGE / NCAGE: 11UF7</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
