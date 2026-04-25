import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, X, Bot } from 'lucide-react';
import { getAIResponse } from '../services/aiService';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingMessage('');

    try {
      await getAIResponse(input, (chunk) => {
        setStreamingMessage(prev => prev + chunk.content);
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: streamingMessage }]);
      setStreamingMessage('');
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the NVIDIA DeepSeek API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="ai-fab"
      >
        <Sparkles size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="ai-panel"
          >
            <div className="ai-header">
              <div className="ai-title">
                <Bot size={20} className="text-accent" />
                <span>DeepSeek Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="ai-messages">
              {messages.length === 0 && (
                <div className="empty-state">
                  <Sparkles size={40} className="text-accent" style={{ opacity: 0.3 }} />
                  <p>How can I help you automate today?</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {streamingMessage && (
                <div className="message assistant">
                  {streamingMessage}
                </div>
              )}
              {isLoading && !streamingMessage && (
                <div className="message assistant loading">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Thinking...</span>
                </div>
              )}
            </div>

            <div className="ai-input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
              />
              <button onClick={handleSend} disabled={isLoading}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
