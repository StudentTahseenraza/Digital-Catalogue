import React, { useState, useRef } from 'react';
import { Camera, Move, Rotate3D, X, Smartphone, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

const ARPreview = ({ product, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [step, setStep] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Simulated camera access
  const startCamera = async () => {
    setIsScanning(true);
    setStep(2);
    
    // Simulate camera initialization
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const resetAR = () => {
    setStep(1);
    setIsScanning(false);
    setZoom(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.2, 0.5));
  };

  const handleRotate = () => {
    setRotation((rotation + 45) % 360);
  };

  // Generate different angles for product preview
  const productAngles = [
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop'
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">AR Preview</h3>
            <p className="text-white/70 text-xs">{product?.name}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main AR View */}
      <div className="flex-grow relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        
        {/* Step 1: Instructions */}
        {step === 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-sm mx-auto p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-pulse">
                <Camera className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-white text-xl font-bold mb-3">Point your camera at the floor</h4>
              <p className="text-gray-300 text-sm mb-8">
                Move your phone slowly to detect surfaces. Make sure the area is well-lit.
              </p>
              <button
                onClick={startCamera}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 w-full"
              >
                Start AR Experience
              </button>
              <div className="mt-6 flex justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Move className="h-4 w-4" />
                  <span className="text-xs">Move to place</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Rotate3D className="h-4 w-4" />
                  <span className="text-xs">Rotate to view</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Scanning */}
        {step === 2 && (
          <div className="absolute inset-0">
            {/* Scanning animation */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
            
            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 border-4 border-blue-500 rounded-lg animate-pulse" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm whitespace-nowrap">
                  Scanning environment...
                </div>
              </div>
            </div>

            {/* Scanning progress */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-[scan_2s_ease-in-out_infinite]" 
                     style={{ width: '60%' }} />
              </div>
              <p className="text-white/60 text-xs text-center mt-2">Detecting surfaces...</p>
            </div>
          </div>
        )}

        {/* Step 3: AR Preview Active */}
        {step === 3 && (
          <div className="absolute inset-0">
            {/* Grid overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }} />

            {/* Product preview with transformations */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`
              }}
            >
              <div className="relative">
                {/* 3D product representation */}
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center animate-float">
                  <img 
                    src={productAngles[Math.floor(rotation / 90) % 4]}
                    alt={product?.name}
                    className="w-40 h-40 sm:w-48 sm:h-48 object-contain mix-blend-lighten"
                  />
                </div>
                
                {/* Shadow */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/30 rounded-full blur-xl" />
              </div>
            </div>

            {/* Distance indicator */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              Place on floor • 0.5m away
            </div>
          </div>
        )}

        {/* AR Controls - Always visible in step 3 */}
        {step === 3 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            <button
              onClick={handleZoomOut}
              className="bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <button
              onClick={handleRotate}
              className="bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <Rotate3D className="h-5 w-5" />
            </button>
            <button
              onClick={handleZoomIn}
              className="bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={resetAR}
              className="bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Floating instructions for step 3 */}
        {step === 3 && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs flex gap-3">
            <span className="flex items-center gap-1"><Move className="h-3 w-3" /> Move to adjust</span>
            <span className="flex items-center gap-1"><Rotate3D className="h-3 w-3" /> Pinch to rotate</span>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{product?.name}</p>
            <p className="text-xs text-gray-500">AR Preview • Place in your space</p>
          </div>
          <button
            onClick={step === 3 ? resetAR : onClose}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            {step === 3 ? 'Reset' : 'Close'}
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">
          *AR feature requires camera access. Move your device slowly to detect surfaces.
        </p>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ARPreview;