import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  MessageSquare,
  User,
  FileText,
  Shield
} from 'lucide-react';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: searchParams.get('product') || '',
    service: searchParams.get('service') || '',
    requirements: '',
    dealerInquiry: false,
    subscribe: true
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Number",
      content: "+91-8045910957",
      details: "Mon-Sat: 9:00 AM - 7:00 PM",
      action: "tel:+918045910957",
      color: "bg-blue-500"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Address",
      content: "info@powersolutionsfactory.in",
      details: "We respond within 2 hours",
      action: "mailto:info@powersolutionsfactory.in",
      color: "bg-green-500"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office Address",
      content: "Mundka, New Delhi, Delhi",
      details: "Corporate Office & Factory",
      action: "https://maps.google.com/?q=Mundka,New+Delhi",
      color: "bg-purple-500"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      content: "Monday - Saturday",
      details: "9:00 AM - 7:00 PM",
      action: null,
      color: "bg-orange-500"
    }
  ];

  const products = [
    "Select a product",
    "Home Inverter 850VA",
    "Home Inverter 1050VA",
    "Home Inverter 1500VA",
    "Digital Sine Wave Inverter",
    "Tubular Battery 150Ah",
    "Tubular Battery 180Ah",
    "Flat Plate Battery 100Ah",
    "Online UPS 3KVA",
    "Mono PERC Panel 440W",
    "Hybrid Inverter 10KW",
    "LiFePO4 48V 100Ah",
    "Other/Custom Solution"
  ];

  const services = [
    "Select a service",
    "Installation Services",
    "Annual Maintenance",
    "24/7 Support",
    "Warranty Services",
    "Site Survey",
    "Training Programs",
    "Emergency Repairs",
    "Dealer Inquiry"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        product: '',
        service: '',
        requirements: '',
        dealerInquiry: false,
        subscribe: true
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">Contact Power Solutions Factory</h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Ready to Power Your Future? Get in touch with us today for the best deals on power equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-2xl font-bold text-neutral-dark mb-6">Get in Touch</h2>
              
              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-neutral-light hover:bg-neutral-200 transition-colors">
                    <div className={`${info.color} p-2 rounded-lg text-white`}>
                      {info.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-neutral-dark">{info.title}</h3>
                      {info.action ? (
                        <a 
                          href={info.action} 
                          className="block text-primary-blue hover:text-primary-dark font-medium"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-neutral-dark font-medium">{info.content}</p>
                      )}
                      <p className="text-sm text-neutral-gray mt-1">{info.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary-dark to-primary-blue rounded-lg p-4 text-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="h-6 w-6" />
                    <div>
                      <div className="font-bold">94% Response Rate</div>
                      <div className="text-sm opacity-90">Average response time: 2 hours</div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary-green/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-neutral-dark">GST Number</div>
                      <div className="text-sm text-neutral-gray">07GLDPS6541G2ZS</div>
                    </div>
                    <CheckCircle className="h-6 w-6 text-secondary-green" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-dark mb-4">Thank You!</h2>
                  <p className="text-neutral-gray mb-6">
                    Your inquiry has been submitted successfully. Our team will contact you within 2 hours.
                  </p>
                  <p className="text-sm text-neutral-gray">
                    A confirmation has been sent to {formData.email || 'your email'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-primary-blue/10 p-2 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-dark">Send Your Requirements</h2>
                      <p className="text-neutral-gray">Fill the form below and our team will contact you</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          <User className="inline h-4 w-4 mr-1" />
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          <Phone className="inline h-4 w-4 mr-1" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                          placeholder="Enter 10-digit mobile number"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-dark mb-2">
                        <Mail className="inline h-4 w-4 mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Product & Service Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          Select a product
                        </label>
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white"
                        >
                          {products.map((product, index) => (
                            <option key={index} value={product}>{product}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-dark mb-2">
                          Select a service
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue bg-white"
                        >
                          {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-dark mb-2">
                        <FileText className="inline h-4 w-4 mr-1" />
                        Your Requirements *
                      </label>
                      <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="Describe your requirements in detail..."
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 mb-8">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="dealerInquiry"
                          checked={formData.dealerInquiry}
                          onChange={handleChange}
                          className="h-5 w-5 text-primary-blue rounded focus:ring-primary-blue"
                        />
                        <span className="text-neutral-dark">
                          I'm interested in becoming an authorized dealer
                        </span>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="subscribe"
                          checked={formData.subscribe}
                          onChange={handleChange}
                          className="h-5 w-5 text-primary-blue rounded focus:ring-primary-blue"
                        />
                        <span className="text-neutral-dark">
                          Subscribe to updates and offers
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center space-x-2 py-4"
                    >
                      <Send className="h-5 w-5" />
                      <span className="text-lg">Get Best Price Now</span>
                    </button>

                    <p className="text-sm text-neutral-gray mt-4 text-center">
                      By submitting, you agree to our Terms & Conditions and Privacy Policy
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="card mt-8">
              <h3 className="text-lg font-bold text-neutral-dark mb-4">Our Location</h3>
              <div className="bg-neutral-light rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-neutral-gray mx-auto mb-3" />
                  <p className="text-neutral-gray">Mundka, New Delhi, Delhi</p>
                  <p className="text-sm text-neutral-gray mt-1">Corporate Office & Factory</p>
                  <a 
                    href="https://maps.google.com/?q=Mundka,New+Delhi"
                    className="inline-block mt-3 text-primary-blue hover:text-primary-dark font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        {/* <div className="bg-gradient-to-r from-primary-dark to-primary-blue rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Our Products</h3>
              <ul className="space-y-2">
                <li><a href="/products?category=inverters" className="hover:text-white/90">Inverters</a></li>
                <li><a href="/products?category=batteries" className="hover:text-white/90">Batteries</a></li>
                <li><a href="/products?category=ups" className="hover:text-white/90">UPS Systems</a></li>
                <li><a href="/products?category=solar" className="hover:text-white/90">Solar Panels</a></li>
                <li><a href="/products?category=solar-inverters" className="hover:text-white/90">Solar Inverters</a></li>
                <li><a href="/products?category=lithium" className="hover:text-white/90">Lithium Battery</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-white/90">Home</a></li>
                <li><a href="/about" className="hover:text-white/90">About Us</a></li>
                <li><a href="/certificates" className="hover:text-white/90">Dealer Certificates</a></li>
                <li><a href="/services" className="hover:text-white/90">Services</a></li>
                <li><a href="/contact" className="hover:text-white/90">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <p>Monday - Saturday</p>
                <p className="text-lg font-bold">9:00 AM - 7:00 PM</p>
                <p className="text-white/90 text-sm mt-4">94% Response Rate</p>
                <p className="text-white/90 text-sm">Average response time: 2 hours</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;