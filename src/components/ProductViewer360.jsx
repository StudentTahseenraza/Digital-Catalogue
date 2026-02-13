import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const ProductViewer360 = ({ product, onClose }) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  // Generate 12 different angles (in real app, these would be actual product images)
  const angles = Array.from({ length: 12 }, (_, i) => 
    `https://images.unsplash.com/photo-${1558618666 + i}-fcd25c85cd64?w=800&auto=format&fit=crop&q=80`
  );

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

  // Calculate which angle to show based on rotation
  const angleIndex = Math.floor((rotation / 360) * angles.length) % angles.length;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-5xl mx-4">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
          <h3 className="text-white text-xl font-bold">{product.name} - 360° View</h3>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

        {/* 360° Viewer */}
        <div
          ref={containerRef}
          className="relative aspect-square max-h-[70vh] mx-auto cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={angles[angleIndex]}
            alt={`${product.name} angle ${angleIndex + 1}`}
            className="w-full h-full object-contain"
          />
          
          {/* Rotation indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            Drag to rotate 360°
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          <button
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            onClick={() => setRotation((rotation + 30) % 360)}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
          >
            <RotateCw className="h-5 w-5" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/30 rounded-full">
          {angles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setRotation((idx / angles.length) * 360)}
              className={`w-2 h-2 rounded-full transition-all ${
                angleIndex === idx ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductViewer360;