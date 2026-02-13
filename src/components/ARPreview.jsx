import React, { useState } from 'react';
import { Camera, Move, Rotate3D, X, Smartphone } from 'lucide-react';

const ARPreview = ({ product, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);

  const startAR = () => {
    setIsScanning(true);
    // In a real app, this would trigger AR camera
    setTimeout(() => {
      alert('In a production app, this would open your camera to place the product in AR space. For demo purposes, imagine seeing a 3D model of the ' + product.name + ' in your room!');
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <h3 className="text-white font-bold text-lg">AR Preview: {product.name}</h3>
        <button onClick={onClose} className="bg-white/20 text-white p-2 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Camera View (simulated) */}
      <div className="flex-grow bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Grid overlay for AR effect */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Product placeholder (would be 3D model in real app) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-pulse">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <p className="text-white text-lg font-semibold">Point your camera at the floor</p>
            <p className="text-white/60 text-sm mt-2">Move your phone slowly to detect surfaces</p>
          </div>
        </div>

        {/* AR Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full">
            <Move className="h-6 w-6" />
          </button>
          <button className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full">
            <Rotate3D className="h-6 w-6" />
          </button>
          <button className="bg-blue-600 text-white p-4 rounded-full">
            <Smartphone className="h-6 w-6" />
          </button>
        </div>

        {/* Scanning indicator */}
        {isScanning && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-64 h-64 border-4 border-blue-500 rounded-lg animate-pulse" />
          </div>
        )}
      </div>

      {/* Bottom instructions */}
      <div className="bg-white p-4">
        <button
          onClick={startAR}
          disabled={isScanning}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Start AR Experience'}
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          *AR feature requires camera access. Supported on most modern smartphones.
        </p>
      </div>
    </div>
  );
};

export default ARPreview;