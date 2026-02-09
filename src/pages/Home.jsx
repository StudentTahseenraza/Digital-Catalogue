import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "High-Performance Batteries",
      description: "Long-lasting power storage with advanced technology",
      image: "/images/battery-hero.png",
      cta: "View Products",
      link: "#products" // Changed to hash link for CombinedPage
    },
    {
      id: 2,
      title: "Premium Solar Solutions",
      description: "Harness the power of the sun with our advanced solar panel systems",
      image: "/images/solar-hero.png",
      cta: "View Products",
      link: "#products" // Changed to hash link for CombinedPage
    },
    {
      id: 3,
      title: "Industrial Inverters",
      description: "Reliable power backup solutions for home and commercial use",
      image: "/images/inverter-hero.png",
      cta: "View Products",
      link: "#products" // Changed to hash link for CombinedPage
    }
  ];


  // Auto-slide effect - 3 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div id="home" className="min-h-screen">
      {/* Hero Section with Slider */}
      <div 
        className="relative h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Slides - Only images displayed clearly */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0'
            }`}
          >
            {/* Clear background image without any overlay */}
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Slide Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-10 text-white/95 font-light max-w-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Glass morphism button for View Products */}
                    <a 
                      href={slide.link}
                      className="relative text-lg px-8 py-4 inline-flex items-center justify-center group overflow-hidden rounded-xl"
                    >
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative text-white font-semibold z-10">
                        View Products
                      </span>
                    </a>
                    
                    {/* Glass morphism button for Get Best Price Now */}
                    <a 
                      href="#contact"
                      className="relative text-lg px-8 py-4 inline-flex items-center justify-center group overflow-hidden rounded-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md border border-amber-400/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative text-white font-bold z-10 flex items-center gap-2">
                        <Star className="h-5 w-5 fill-current" />
                        Get Best Price Now →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20 border border-white/30"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20 border border-white/30"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-10' 
                  : 'w-3 hover:w-5'
              }`}
            >
              <div className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-full' 
                  : 'bg-white/50 hover:bg-white/70 w-3'
              }`} />
              {index === currentSlide && (
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section - ONE ROW, ONE COLUMN (horizontal layout) */}
      <section className="py-12 bg-gradient-to-br from-blue-300 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            {/* Single row container */}
            <div className="flex flex-wrap justify-center items-center gap-8">
              {/* 15+ Years Experience */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 min-w-[180px]">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  15+
                </div>
                <div className="text-base md:text-lg font-medium text-white/90">
                  Years Experience
                </div>
              </div>
              
              {/* 5000+ Happy Customers */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 min-w-[180px]">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  5000+
                </div>
                <div className="text-base md:text-lg font-medium text-white/90">
                  Happy Customers
                </div>
              </div>
              
              {/* 500+ Dealers Nationwide */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 min-w-[180px]">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  500+
                </div>
                <div className="text-base md:text-lg font-medium text-white/90">
                  Dealers Nationwide
                </div>
              </div>
              
              {/* 50+ Product Range */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 min-w-[180px]">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  50+
                </div>
                <div className="text-base md:text-lg font-medium text-white/90">
                  Product Range
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Featured Products Section */}
      {/* <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Quality Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our comprehensive range of high-quality power solutions designed for reliability and performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a 
              href="#products"
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold group overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10 backdrop-blur-sm border border-blue-500/20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative text-blue-800 font-bold z-10">
                View All Products
              </span>
            </a>
          </div>
        </div>
      </section> */}

      {/* Certifications */}
      {/* <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Trust & Credibility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="relative bg-gradient-to-br from-white/50 to-white/20 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{cert}</h3>
                      <p className="text-gray-600">
                        Ensuring highest standards in manufacturing and service delivery.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
              Ready to Power Your Future?
            </h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto relative z-10">
              Join our network of 500+ authorized dealers across India
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <a 
                href="#contact"
                className="relative text-lg px-10 py-4 inline-flex items-center justify-center group overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative text-white font-bold z-10">
                  Become a Dealer
                </span>
              </a>
              
              <a 
                href="#contact"
                className="relative text-lg px-10 py-4 inline-flex items-center justify-center group overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md border border-amber-400/30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative text-white font-bold z-10">
                  Request Quote
                </span>
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;