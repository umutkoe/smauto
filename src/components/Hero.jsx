import { motion } from 'framer-motion';
import { ChevronRight, Play, Shield } from 'lucide-react';

const Hero = ({ count, setCount }) => {
  return (
    <section className="hero-section container">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-content"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="badge-wrapper"
        >
          <span className="badge">
            <Shield size={14} /> Trusted by 500+ developers
          </span>
        </motion.div>
        
        <h1>
          The smarter way to <br />
          <span className="gradient-text">Automate Workflows</span>
        </h1>
        
        <p className="hero-description">
          SMAUTO empowers teams to build scalable automation without the complexity. 
          Connect your tools, define your logic, and let us handle the rest.
        </p>
        
        <div className="hero-actions">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="primary-btn" 
            onClick={() => setCount(count + 1)}
          >
            Start for free <ChevronRight size={18} />
          </motion.button>
          
          <button className="secondary-btn">
            <Play size={18} fill="currentColor" /> Watch Demo
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <strong>99.9%</strong>
            <span>Uptime</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <strong>{count}k+</strong>
            <span>Tasks Ran</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hero-visual"
      >
        <div className="visual-container">
          <div className="floating-glow"></div>
          <div className="glass-card main-card">
            <div className="card-header">
              <div className="header-dots">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="header-title">workflow.config.ts</div>
            </div>
            <div className="card-body">
              <div className="code-line"><span className="code-keyword">import</span> {'{ SMAUTO }'} <span className="code-keyword">from</span> <span className="code-string">'@smauto/core'</span>;</div>
              <div className="code-line"></div>
              <div className="code-line"><span className="code-keyword">const</span> flow = <span className="code-keyword">new</span> <span className="code-func">SMAUTO</span>();</div>
              <div className="code-line"></div>
              <div className="code-line">flow.<span className="code-func">on</span>(<span className="code-string">'deployment'</span>, (event) ={'>'} {'{'}</div>
              <div className="code-line indent-1">console.<span className="code-func">log</span>(<span className="code-string">'System online'</span>);</div>
              <div className="code-line indent-1">event.<span className="code-func">trigger</span>(<span className="code-string">'optimization'</span>);</div>
              <div className="code-line">{'}'});</div>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card overlay-card top"
          >
            <div className="card-icon"><Shield size={16} className="text-accent" /></div>
            <div>
              <div className="card-label">Security Check</div>
              <div className="card-value">Passed</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass-card overlay-card bottom"
          >
            <div className="card-icon"><Play size={16} className="text-accent" /></div>
            <div>
              <div className="card-label">Active Workflows</div>
              <div className="card-value">2,482</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
