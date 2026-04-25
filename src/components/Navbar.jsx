import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container nav-container">
        <div className="nav-logo">
          <div className="logo-icon-wrapper">
            <Cpu className="nav-icon" size={24} />
          </div>
          <span>SMAUTO</span>
        </div>

        <div className="nav-links desktop-only">
          <a href="#features">Features</a>
          <a href="#docs">Docs</a>
          <a href="#about">About</a>
          <button className="nav-cta">Get Started</button>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#docs" onClick={() => setIsOpen(false)}>Docs</a>
            <a href="#about" onClick={() => setIsOpen(false)}>About</a>
            <button className="nav-cta">Get Started</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
