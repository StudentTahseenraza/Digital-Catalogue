import React, { useState } from 'react';
import { Menu, X, Zap, Phone, Mail } from 'lucide-react';
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
    <>
      {/* TOP INFO BAR */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          
          {/* Left Info */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              +91-8045910957
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              info@powersolutionsfactory.in
            </span>
          </div>

          {/* Right Info */}
          <div className="flex items-center gap-4">
            <span className="font-medium">
              GST: 07GLDPS6541G2ZS
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
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
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Power Solutions Factory
                </h1>
                <p className="text-sm text-emerald-600">
                  Powering Tomorrow, Today
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                to="/contact"
                className="
                  bg-gradient-to-r 
                  from-emerald-600 
                  to-teal-500 
                  hover:from-teal-500 
                  hover:to-emerald-600
                  text-white 
                  font-semibold 
                  px-6 py-3 
                  rounded-xl 
                  transition-all 
                  shadow-md hover:shadow-lg
                "
              >
                Get Best Price Now
              </Link>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="
                      text-gray-700 
                      hover:text-emerald-600 
                      font-medium 
                      py-2 px-4 
                      rounded-lg 
                      hover:bg-emerald-50
                    "
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  to="/contact"
                  className="
                    bg-gradient-to-r 
                    from-emerald-600 
                    to-teal-500 
                    text-white 
                    text-center 
                    font-semibold 
                    py-3 rounded-xl
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Best Price Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
