import React from 'react';
import Home from './Home';
import About from './About';
import Products from './Products';
import Services from './Services';
import Certificates from './Certificates';
import Contact from './Contact';

const CombinedPage = () => {
  return (
    <div className="combined-page">
      {/* Navigation Links (Optional) */}
      {/* <div className="sticky top-0 z-50 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="#products" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
            <a href="#certificates" className="text-gray-700 hover:text-blue-600 font-medium">Certificates</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
          </div>
        </div>
      </div> */}

      {/* HOME SECTION */}
      <section id="home">
        <Home />
      </section>

      {/* ABOUT SECTION */}
      <section id="about">
        <About />
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products">
        <Products />
      </section>

      {/* SERVICES SECTION */}
      <section id="services">
        <Services />
      </section>

      {/* CERTIFICATES SECTION */}
      <section id="certificates">
        <Certificates />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact">
        <Contact />
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default CombinedPage;