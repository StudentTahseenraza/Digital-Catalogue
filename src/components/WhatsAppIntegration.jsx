import React, { useState } from 'react';
import { MessageCircle, Send, Check, X, Phone, Mail, Clock } from 'lucide-react';

const WhatsAppIntegration = ({ product, onClose }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [template, setTemplate] = useState('inquiry');

  const templates = {
    inquiry: `Hi, I'm interested in ${product?.name || 'your products'}. Could you share more details and best price?`,
    quote: `Please provide a quotation for ${product?.name || 'your products'} including warranty and delivery.`,
    dealer: `I want to become an authorized dealer for Power Solutions Factory. Please share dealer terms.`,
    support: `I need technical support for my ${product?.name || 'product'}. Please assist.`
  };

  const handleSend = () => {
    if (!phone) return;
    
    const whatsappUrl = `https://wa.me/918045910957?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSent(true);
    
    // Store in localStorage for follow-up
    const leads = JSON.parse(localStorage.getItem('whatsappLeads') || '[]');
    leads.push({
      phone,
      message,
      product: product?.name,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('whatsappLeads', JSON.stringify(leads));
  };

  const quickReplies = [
    { label: 'Price Query', emoji: '💰' },
    { label: 'Warranty Info', emoji: '📝' },
    { label: 'Dealer Terms', emoji: '🤝' },
    { label: 'Tech Support', emoji: '🔧' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">WhatsApp Business</h3>
                <p className="text-green-100 text-sm">Connect with our sales team</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!sent ? (
            <>
              {/* Quick Replies */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMessage(templates[reply.label.toLowerCase().split(' ')[0]])}
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm transition"
                    >
                      {reply.emoji} {reply.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Template Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Template
                </label>
                <select
                  value={template}
                  onChange={(e) => {
                    setTemplate(e.target.value);
                    setMessage(templates[e.target.value]);
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="inquiry">Product Inquiry</option>
                  <option value="quote">Request Quotation</option>
                  <option value="dealer">Dealer Inquiry</option>
                  <option value="support">Technical Support</option>
                </select>
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your WhatsApp Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg text-gray-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="flex-grow px-3 py-2 border rounded-r-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Type your message here..."
                />
              </div>

              {/* Business Hours */}
              <div className="mb-6 p-3 bg-green-50 rounded-lg flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Business Hours</p>
                  <p className="text-xs text-green-600">Mon-Sat: 9AM - 7PM • Response within 2hrs</p>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!phone || !message}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                Send via WhatsApp
              </button>

              {/* Alternative Contacts */}
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-xs text-gray-500 mb-2">Or contact us directly:</p>
                <div className="flex justify-center gap-4">
                  <a href="tel:+918045910957" className="text-gray-600 hover:text-gray-900">
                    <Phone className="h-4 w-4" />
                  </a>
                  <a href="mailto:info@powersolutionsfactory.in" className="text-gray-600 hover:text-gray-900">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold mb-2">WhatsApp Opened!</h4>
              <p className="text-gray-600 text-sm mb-4">
                Your message has been prepared. Complete sending on WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg text-sm font-medium transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;