import React, { useState } from 'react';
import { MessageCircle, Send, Check, X, Phone, Mail, Clock, AlertCircle } from 'lucide-react';

const WhatsAppIntegration = ({ product, onClose }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [template, setTemplate] = useState('inquiry');
  const [errors, setErrors] = useState({});

  const templates = {
    inquiry: `Hi, I'm interested in ${product?.name || 'your products'}. Could you share more details and best price?`,
    quote: `Please provide a quotation for ${product?.name || 'your products'} including warranty and delivery.`,
    dealer: `I want to become an authorized dealer for Power Solutions Factory. Please share dealer terms.`,
    support: `I need technical support for my ${product?.name || 'product'}. Please assist.`
  };

  const validatePhone = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers: starts with 6-9 and 10 digits
    return phoneRegex.test(number);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      setPhone(value);
      if (value.length === 10 && !validatePhone(value)) {
        setErrors({ ...errors, phone: 'Please enter a valid Indian mobile number' });
      } else {
        setErrors({ ...errors, phone: null });
      }
    }
  };

  const handleSend = () => {
    if (!validatePhone(phone)) {
      setErrors({ ...errors, phone: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    
    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
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
    { label: 'Price Query', emoji: '💰', template: 'inquiry' },
    { label: 'Warranty Info', emoji: '📝', template: 'quote' },
    { label: 'Dealer Terms', emoji: '🤝', template: 'dealer' },
    { label: 'Tech Support', emoji: '🔧', template: 'support' }
  ];

  const isValid = validatePhone(phone) && message.trim();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl sticky top-0 z-10">
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
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {!sent ? (
              <>
                {/* Product Info */}
                {product && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-sm font-medium text-green-800">
                      Inquiring about: <span className="font-bold">{product.name}</span>
                    </p>
                  </div>
                )}

                {/* Quick Replies */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Quick templates:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setTemplate(reply.template);
                          setMessage(templates[reply.template]);
                        }}
                        className={`px-3 py-1.5 rounded-full text-sm transition ${
                          template === reply.template
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {reply.emoji} {reply.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Number with Country Code */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg text-gray-600 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="9876543210"
                      maxLength="10"
                      className={`flex-grow px-3 py-2 border rounded-r-lg focus:ring-2 focus:ring-green-500 outline-none ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Enter 10-digit mobile number (starts with 6-9)
                  </p>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Type your message here..."
                  />
                </div>

                {/* Business Hours */}
                <div className="mb-6 p-3 bg-green-50 rounded-lg flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Business Hours</p>
                    <p className="text-xs text-green-600">Mon-Sat: 9AM - 7PM • Response within 2hrs</p>
                  </div>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={!isValid}
                  className={`w-full font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition ${
                    isValid
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </button>

                {/* Alternative Contacts */}
                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-xs text-gray-500 mb-3">Or contact us directly:</p>
                  <div className="flex justify-center gap-6">
                    <a href="tel:+918045910957" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">Call</span>
                    </a>
                    <a href="mailto:info@powersolutionsfactory.in" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">Email</span>
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
                <p className="text-gray-600 text-sm mb-6">
                  Your message has been prepared. Complete sending on WhatsApp.
                </p>
                <button
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg text-sm font-medium transition w-full"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;