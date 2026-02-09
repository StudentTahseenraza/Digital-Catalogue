import React, { useState } from 'react';
import { Menu, X, Battery, Sun, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Dealer Certificates', path: '/certificates' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-dark p-2 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-dark">Power Solutions Factory</h1>
              <p className="text-sm text-neutral-gray">Powering Tomorrow, Today</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-neutral-dark hover:text-primary-blue font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get Best Price Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-neutral-dark hover:text-primary-blue font-medium py-2 px-4 rounded-lg hover:bg-neutral-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Best Price Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;