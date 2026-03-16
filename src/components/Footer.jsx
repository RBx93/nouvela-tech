import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="nt-footer">
      <Container>
        <Row className="g-4">
          <Col lg={4} className="brand-col">
            <div className="footer-brand">Nouv<span>ela</span> Technology Group</div>
            <p>
              Boutique web development for small businesses and community organizations.
              Built with React. Deployed on Azure.
            </p>
          </Col>

          <Col sm={4} lg={2}>
            <h6>Navigate</h6>
            <ul>
              <li><a href="#hero">Home</a></li>
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
              <li><a href="mailto:hello@nouvelatech.com">hello@nouvelatech.com</a></li>
              <li><span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>North Carolina, USA</span></li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p>© {year} Nouvela Technology Group LLC. All rights reserved.</p>
          <p>Built by Nouvela Technology Group LLC</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
