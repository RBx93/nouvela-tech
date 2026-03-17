import { Routes, Route } from 'react-router-dom'
import NouvelaNavbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import GovContracting from './components/GovContracting'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Capabilities from './pages/Capabilities'

function Home() {
  return (
    <main style={{ flex: 1, paddingTop: '64px' }}>
      <Hero />
      <GovContracting />
      <Services />
      <Portfolio />
      <About />
      <Contact />
    </main>
  )
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NouvelaNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capabilities" element={<Capabilities />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
