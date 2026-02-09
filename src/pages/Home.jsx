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

     {/* ================= STATS STRIP ================= */}
      <section className="bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-wrap justify-between text-center gap-8">

            <div className="flex-1 min-w-[150px]">
              <h3 className="text-4xl font-bold">15+</h3>
              <p className="text-sm uppercase tracking-wide">
                Years Experience
              </p>
            </div>

            <div className="flex-1 min-w-[150px]">
              <h3 className="text-4xl font-bold">5000+</h3>
              <p className="text-sm uppercase tracking-wide">
                Happy Customers
              </p>
            </div>

            <div className="flex-1 min-w-[150px]">
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="text-sm uppercase tracking-wide">
                Dealers Nationwide
              </p>
            </div>

            <div className="flex-1 min-w-[150px]">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-sm uppercase tracking-wide">
                Product Range
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;