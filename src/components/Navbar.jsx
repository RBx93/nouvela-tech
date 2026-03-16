import { useState, useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function NouvelaNavbar() {
  const [expanded, setExpanded] = useState(false)
  const close = () => setExpanded(false)

  return (
    <Navbar
      fixed="top"
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className="nt-navbar"
    >
      <Container>
        <Navbar.Brand href="#hero">
          Nouv<span>ela</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nt-nav" />
        <Navbar.Collapse id="nt-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#services" onClick={close}>Services</Nav.Link>
            <Nav.Link href="#portfolio" onClick={close}>Portfolio</Nav.Link>
            <Nav.Link href="#about" onClick={close}>About</Nav.Link>
            <Nav.Link href="#contact" onClick={close}>Contact</Nav.Link>
          </Nav>
          <a href="#contact" className="btn-nt-primary ms-lg-3 mt-2 mt-lg-0 text-decoration-none" onClick={close}>
            Get a Quote
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NouvelaNavbar
