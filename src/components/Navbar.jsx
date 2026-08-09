import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import logoIcon from '/logoIcon.png'

function NouvelaNavbar() {
  const [expanded, setExpanded] = useState(false)
  const close = () => setExpanded(false)

  const goHome = () => {
    close()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <Navbar
      fixed="top"
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className="nt-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3" onClick={goHome}>
          <img src={logoIcon} alt="Nouvela Technology Group icon" className="navbar-logo-icon" />
          <span className="navbar-brand-text">
            <span className="brand-main">NOUVELA</span>
            <span className="brand-sub">TECHNOLOGY GROUP</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="nt-nav" className="ms-auto" />
        <Navbar.Collapse id="nt-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/#govcon" onClick={close}>Gov Contracting</Nav.Link>
            <Nav.Link as={Link} to="/capabilities" onClick={close}>Capabilities</Nav.Link>
            <Nav.Link href="/#services" onClick={close}>Services</Nav.Link>
            <Nav.Link href="/#portfolio" onClick={close}>Portfolio</Nav.Link>
            <Nav.Link href="/#about" onClick={close}>About</Nav.Link>
            <Nav.Link href="/#contact" onClick={close}>Contact</Nav.Link>
          </Nav>
          <a href="/#contact" className="btn-nt-primary nav-cta-blue ms-lg-3 mt-3 mt-lg-0 text-decoration-none" onClick={close}>
            Get in Touch
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NouvelaNavbar
