import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, X, Heart, Share2, Maximize2 } from 'lucide-react';

const ProductShowcase3D = ({ products, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [liked, setLiked] = useState({});
  const [showControls, setShowControls] = useState(true);

  const currentProduct = products[currentIndex];

  const nextProduct = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleShare = async () => {
    const shareData = {
      title: currentProduct.name,
      text: `Check out ${currentProduct.name} - ${currentProduct.category}`,
      url: window.location.origin + `/contact?product=${encodeURIComponent(currentProduct.name)}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(
        `${currentProduct.name}\n${currentProduct.category}\n${shareData.url}`
      );
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        
        {/* Header with better visibility */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20">
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} / {products.length}
            </span>
            <h2 className="text-white font-bold text-lg">3D Interactive Showcase</h2>
          </div>
          <button 
            onClick={onClose}
            className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-full transition shadow-lg"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main 3D Card Container */}
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="perspective-1000 w-full max-w-2xl">
            <div 
              className={`relative transition-transform duration-700 transform-style-3d cursor-pointer`}
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* Front of Card */}
              <div className="backface-hidden w-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="relative h-64 sm:h-80 bg-gradient-to-br from-blue-500 to-purple-600">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-contain p-4"
                    />
                    
                    {/* Product Badge */}
                    {currentProduct.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          {currentProduct.badge}
                        </span>
                      </div>
                    )}

                    {/* Hint text */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      Click to flip
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {currentProduct.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{currentProduct.category}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {currentProduct.features?.slice(0, 3).map((f, i) => (
                        <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-xs sm:text-sm text-gray-700">
                          {f.name}: {f.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden w-full" style={{ transform: 'rotateY(180deg)' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                  <h4 className="text-lg sm:text-xl font-bold mb-4">Technical Specifications</h4>
                  
                  <div className="flex-grow space-y-3 overflow-y-auto">
                    {currentProduct.specs?.map((spec, i) => (
                      <div key={i} className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-sm sm:text-base text-gray-400">{spec.label}</span>
                        <span className="text-sm sm:text-base font-semibold text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/contact?product=${encodeURIComponent(currentProduct.name)}`;
                    }}
                    className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-lg"
                  >
                    Get Best Price
                  </button>

                  {/* Back side hint */}
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Click to flip back
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls with better visibility */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-4">
          
          {/* Navigation and Action Buttons */}
          <div className="flex items-center justify-between w-full px-4">
            {/* Previous Button */}
            <button
              onClick={prevProduct}
              className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-3 sm:p-4 rounded-full transition shadow-lg"
              aria-label="Previous product"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Action Buttons Group */}
            <div className="flex gap-3 bg-black/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
              {/* Like Button */}
              <button
                onClick={() => setLiked({ ...liked, [currentProduct.id]: !liked[currentProduct.id] })}
                className={`p-2 sm:p-3 rounded-full transition ${
                  liked[currentProduct.id] 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                aria-label={liked[currentProduct.id] ? "Unlike" : "Like"}
              >
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" fill={liked[currentProduct.id] ? 'currentColor' : 'none'} />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Flip Button */}
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition"
                aria-label="Flip card"
              >
                <RotateCw className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Fullscreen Button */}
              <button
                className="bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition"
                aria-label="Fullscreen"
              >
                <Maximize2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Next Button */}
            <button
              onClick={nextProduct}
              className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-3 sm:p-4 rounded-full transition shadow-lg"
              aria-label="Next product"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to product ${idx + 1}`}
              />
            ))}
          </div>

          {/* Product Counter */}
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white text-sm">
              {currentProduct.name} • {currentIndex + 1} of {products.length}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase3D;