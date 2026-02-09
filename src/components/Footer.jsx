import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Battery, Sun, Zap } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const productCategories = [
    { name: 'Inverters', path: '/products?category=inverters' },
    { name: 'Batteries', path: '/products?category=batteries' },
    { name: 'UPS Systems', path: '/products?category=ups' },
    { name: 'Solar Panels', path: '/products?category=solar' },
    { name: 'Solar Inverters', path: '/products?category=solar-inverters' },
    { name: 'Lithium Battery', path: '/products?category=lithium' },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Power Solutions Factory</h2>
                <p className="text-neutral-300">Powering Tomorrow, Today</p>
              </div>
            </div>
            <p className="text-neutral-300 mb-4">
              India's trusted manufacturer of premium power equipment & energy solutions.
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Battery className="h-5 w-5" />
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <Sun className="h-5 w-5" />
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <Zap className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Products</h3>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary-green" />
                <span className="text-neutral-300">Mundka, New Delhi, Delhi</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary-green" />
                <a href="tel:+918045910957" className="text-neutral-300 hover:text-white">
                  +91-8045910957
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary-green" />
                <a href="mailto:info@powersolutionsfactory.in" className="text-neutral-300 hover:text-white">
                  info@powersolutionsfactory.in
                </a>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="font-semibold">GST: 07GLDPS6541G2ZS</p>
              <p className="text-neutral-300 text-sm">94% Response Rate</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-300">
              © {new Date().getFullYear()} Power Solutions Factory. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-neutral-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-300 hover:text-white">
                Terms & Conditions
              </Link>
              <span className="text-neutral-300">Made with ❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;