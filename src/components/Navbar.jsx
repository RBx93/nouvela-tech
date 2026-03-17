import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import logoIcon from '/logoIcon.png'

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
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3" onClick={close}>
          <img src={logoIcon} alt="Nouvela Technology Group icon" className="navbar-logo-icon" />
          <span className="navbar-brand-text">
            NOUVELA <span className="brand-sub">TECHNOLOGY GROUP</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nt-nav" />
        <Navbar.Collapse id="nt-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/#govcon" onClick={close}>Gov Contracting</Nav.Link>
            <Nav.Link as={Link} to="/capabilities" onClick={close}>Capabilities</Nav.Link>
            <Nav.Link href="/#services" onClick={close}>Services</Nav.Link>
            <Nav.Link href="/#portfolio" onClick={close}>Portfolio</Nav.Link>
            <Nav.Link href="/#about" onClick={close}>About</Nav.Link>
            <Nav.Link href="/#contact" onClick={close}>Contact</Nav.Link>
          </Nav>
          <a href="/#contact" className="btn-nt-primary ms-lg-3 mt-2 mt-lg-0 text-decoration-none" onClick={close}>
            Get in Touch
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NouvelaNavbar
