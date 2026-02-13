import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Dealer Certificates', path: '/certificates' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* TOP INFO BAR */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          
          {/* Left Info */}
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+918045910957" className="flex items-center gap-1 hover:text-white/80">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">+91-8045910957</span>
              <span className="xs:hidden sm:hidden">Call</span>
            </a>
            <a href="mailto:info@powersolutionsfactory.in" className="flex items-center gap-1 hover:text-white/80">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:inline">info@powersolutionsfactory.in</span>
              <span className="xs:hidden sm:hidden">Email</span>
            </a>
          </div>

          {/* Right Info */}
          <div className="flex items-center gap-4">
            <span className="font-medium hidden md:inline">
              GST: 07GLDPS6541G2ZS
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
              94% Response Rate
            </span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-emerald-600 p-2 rounded-lg flex-shrink-0">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Power Solutions Factory
                </h1>
                <p className="text-xs sm:text-sm text-emerald-600">
                  Powering Tomorrow, Today
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-sm lg:text-base text-gray-700 hover:text-emerald-600 font-medium transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-teal-500 hover:to-emerald-600 text-white font-semibold px-5 lg:px-6 py-2.5 lg:py-3 rounded-lg lg:rounded-xl text-sm lg:text-base transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Get Best Price Now
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-700 hover:text-emerald-600 font-medium py-3 px-4 rounded-lg hover:bg-emerald-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center font-semibold py-3 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Best Price Now
                </Link>

                {/* Mobile GST Info */}
                <div className="pt-4 mt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    GST: 07GLDPS6541G2ZS
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;