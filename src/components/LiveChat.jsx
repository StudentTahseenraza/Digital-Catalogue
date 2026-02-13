import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can we help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: inputMessage, 
      sender: 'user' 
    }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Thank you for your message. Our team will get back to you shortly. For immediate assistance, please call us at +91-8045910957",
        sender: 'bot'
      }]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-8 bg-emerald-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all z-40 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-lg shadow-2xl z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold text-sm sm:text-base">Live Chat Support</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;