import React, { useState, useEffect, useRef } from 'react';
import './TailorChat.css';

// Same botResponses can be kept or customized
const botResponses = {
  "hello": "Hello there! How can I help you today?",
  "hi": "Hi! What can I do for you?",
  "how are you": "I'm just a chatbot, but I'm functioning well! How about you?",
  "what's your name": "I'm a simple chatbot created to assist you!",
  "bye": "Goodbye! Feel free to come back if you have more questions.",
  "thanks": "You're welcome! Is there anything else you need help with?",
  "default": "I'm not sure how to respond to that. Could you ask me something else?"
};

const Chatbot = ({ tailorName = "Tailor" }) => {  // <-- Receive tailorName as prop
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const greeting = {
      text: `Hello! I'm your Tailor . How can I help you today?`,
      isUser: false
    };
    setTimeout(() => setMessages([greeting]), 500);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(input);
      const botMessage = { text: response, isUser: false };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    for (let key in botResponses) {
      if (msg.includes(key)) return botResponses[key];
    }
    return botResponses["default"];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Tailor</div>
      <div className="chat-messages" ref={chatRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">{`${tailorName} is typing...`}</div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
