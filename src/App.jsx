import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-shell">
      <Navbar />
      <main className="content">
        <Hero count={count} setCount={setCount} />
        <Features />
      </main>
      <Footer />
      <div className="bg-gradient"></div>
    </div>
  )
}

export default App
