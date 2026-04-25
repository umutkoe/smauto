import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import './App.css'
import './themes/audent.css'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'audent' : 'dark')
  }

  return (
    <div className={`theme-${theme}`}>
      <div className="app-shell">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="content">
          <Hero count={count} setCount={setCount} />
          <Features />
        </main>
        <Footer />
        <AIAssistant />
        {theme === 'dark' && <div className="bg-gradient"></div>}
      </div>
    </div>
  )
}

export default App
