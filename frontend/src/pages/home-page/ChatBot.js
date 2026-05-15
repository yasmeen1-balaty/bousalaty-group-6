import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages(prev => [
      ...prev,
      { text: userMessage, user: true }
    ]);

    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          text: data.reply || 'ما قدرت أفهم الرد.',
          user: false
        }
      ]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          text: 'صار خطأ بالاتصال مع المساعد الذكي.',
          user: false
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <button 
        className="chatbot-orb"
        onClick={() => setIsOpen(!isOpen)}
        title="الدردشة الذكية"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>

      {isOpen && (
        <div className={`chat-window ${isOpen ? 'open' : ''}`}>
          <div className="chat-header">
            <div className="d-flex align-items-center">
              <i className="fas fa-robot text-primary me-2 fs-4"></i>
              <div>
                <h6>مساعد AI</h6>
                <small className="opacity-75">متواجد 24/7</small>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="text-center text-muted p-4">
                مرحباً! اطرح سؤالك 📝
              </div>
            )}

            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`message ${msg.user ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="message bot">
                جاري التفكير...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <div className="input-group">
              <input
                className="form-control"
                placeholder="اكتب رسالتك..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                disabled={loading}
              />

              <button
                className="btn btn-primary"
                onClick={sendMessage}
                disabled={loading}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;