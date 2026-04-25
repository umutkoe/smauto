import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, X, Bot } from 'lucide-react';
import { getAIResponse } from '../services/aiService';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setStreamingMessage('');

    let fullResponse = "";

    try {
      await getAIResponse(currentInput, (chunk) => {
        if (chunk.content) {
          fullResponse += chunk.content;
          setStreamingMessage(fullResponse);
        }
      });
      
      if (fullResponse) {
        setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Hizmete şu an ulaşılamıyor. Lütfen API anahtarlarınızı kontrol edin." }]);
    } finally {
      setStreamingMessage('');
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
                <span>SMAUTO Zekası</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="ai-messages">
              {messages.length === 0 && (
                <div className="empty-state">
                  <Sparkles size={40} className="text-accent" style={{ opacity: 0.3 }} />
                  <p>Selam! Ben DeepSeek. <br/> Size nasıl yardımcı olabilirim?</p>
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
                  <span>Düşünüyor...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Bir şeyler sorun..."
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
