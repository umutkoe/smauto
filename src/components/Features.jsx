import { motion } from 'framer-motion';
import { Book, Github, MessageSquare, Zap, BarChart3, Lock } from 'lucide-react';

const features = [
  {
    icon: <Zap size={24} />,
    title: "Instant Deploy",
    description: "Push your code and see it live in seconds with our optimized pipeline.",
    color: "#6366f1"
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Real-time Analytics",
    description: "Deep insights into your automation performance and resource usage.",
    color: "#ec4899"
  },
  {
    icon: <Lock size={24} />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and granular access control for your peace of mind.",
    color: "#10b981"
  },
  {
    icon: <Book size={24} />,
    title: "Rich Documentation",
    description: "Everything you need to know, from basic setup to advanced API usage.",
    color: "#f59e0b"
  },
  {
    icon: <Github size={24} />,
    title: "Open Source",
    description: "Core modules are open source, backed by a global community of experts.",
    color: "#6b7280"
  },
  {
    icon: <MessageSquare size={24} />,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you solve your challenges.",
    color: "#8b5cf6"
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section container">
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-badge"
        >
          Capabilities
        </motion.span>
        <h2>Built for the <span className="gradient-text">modern era</span></h2>
        <p>Powerful features that help you ship faster and scale without limits.</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="feature-card"
          >
            <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <motion.div 
              className="feature-link"
              whileHover={{ x: 5 }}
            >
              Learn more <ChevronRight size={14} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default Features;
