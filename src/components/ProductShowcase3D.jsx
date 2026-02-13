import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Maximize2, Heart, Share2 } from 'lucide-react';

const ProductShowcase3D = ({ products, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [liked, setLiked] = useState({});

  const currentProduct = products[currentIndex];

  const nextProduct = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
          <div className="flex items-center gap-2">
            <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {products.length}
            </span>
            <h2 className="text-white font-bold text-lg">Interactive Showcase</h2>
          </div>
          <button onClick={onClose} className="bg-white/10 text-white p-2 rounded-full hover:bg-white/20">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

        {/* 3D Card */}
        <div className="perspective-1000 w-full max-w-2xl mx-auto cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`relative transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <div className="backface-hidden">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-80 bg-gradient-to-br from-blue-500 to-purple-600">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{currentProduct.name}</h3>
                  <p className="text-gray-600 mb-4">{currentProduct.category}</p>
                  <div className="flex gap-2">
                    {currentProduct.features?.slice(0, 3).map((f, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-8 h-full flex flex-col justify-center">
                <h4 className="text-xl font-bold mb-4">Specifications</h4>
                <div className="space-y-3">
                  {currentProduct.specs?.map((spec, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">{spec.label}</span>
                      <span className="font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-lg">
                  Get Best Price
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4">
          <button
            onClick={prevProduct}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setLiked({ ...liked, [currentProduct.id]: !liked[currentProduct.id] })}
              className={`p-3 rounded-full transition ${
                liked[currentProduct.id] 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Heart className="h-5 w-5" fill={liked[currentProduct.id] ? 'currentColor' : 'none'} />
            </button>
            <button className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20">
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20"
            >
              <RotateCw className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={nextProduct}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase3D;