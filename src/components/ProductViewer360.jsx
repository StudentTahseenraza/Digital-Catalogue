import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductViewer360 = ({ product, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef(null);

  // Generate 12 different angles with better image URLs
  const angles = Array.from({ length: 12 }, (_, i) => {
    // Using reliable product images for better visibility
    const images = [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop"
    ];
    return images[i % images.length];
  });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const newRotation = (rotation + deltaX * 0.5) % 360;
    setRotation(newRotation < 0 ? newRotation + 360 : newRotation);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const newRotation = (rotation + deltaX * 0.5) % 360;
    setRotation(newRotation < 0 ? newRotation + 360 : newRotation);
    setStartX(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, rotation]);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (!showControls) return;
    
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls, rotation, zoom]);

  const angleIndex = Math.floor((rotation / 360) * angles.length) % angles.length;

  const handlePrevAngle = () => {
    setRotation((rotation - 30 + 360) % 360);
  };

  const handleNextAngle = () => {
    setRotation((rotation + 30) % 360);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Header with better visibility */}
        <div className={`absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
        }`}>
          <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-xs text-gray-300">360° View • Drag to rotate</p>
          </div>
          <button
            onClick={onClose}
            className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-full transition shadow-lg"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Viewer */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Image Container with Zoom */}
          <div
            className="relative cursor-grab active:cursor-grabbing transition-transform duration-100"
            style={{ 
              transform: `scale(${zoom})`,
              maxWidth: '90vw',
              maxHeight: '80vh'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <img
              src={angles[angleIndex]}
              alt={`${product.name} - View ${angleIndex + 1}`}
              className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevAngle}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 shadow-lg ${
              showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
            aria-label="Previous angle"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNextAngle}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 shadow-lg ${
              showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            aria-label="Next angle"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Bottom Controls */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Zoom and Rotate Controls */}
            <div className="flex gap-2 bg-black/60 backdrop-blur-sm rounded-full p-2 shadow-xl">
              <button
                onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setRotation((rotation + 30) % 360)}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
                aria-label="Rotate right"
              >
                <RotateCw className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>

            {/* Angle Indicator */}
            <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-white text-sm">
                Angle {angleIndex + 1} of {angles.length}
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-1 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full">
              {angles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setRotation((idx / angles.length) * 360)}
                  className={`h-2 rounded-full transition-all ${
                    angleIndex === idx 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to angle ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Drag Instruction - Shown briefly */}
          {!isDragging && showControls && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm animate-pulse">
                ← Drag to rotate 360° →
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductViewer360;