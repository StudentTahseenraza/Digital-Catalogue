import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowRight, 
  Share2, 
  Download,
  Eye,
  X,
  RotateCw,
  Award,
  MessageCircle,
  Heart,
  ShoppingCart
} from "lucide-react";

const ProductCard = ({ 
  product, 
  onCompareToggle, 
  isSelected, 
  on360View, 
  onARView, 
  onWhatsApp 
}) => {
  const [showZoom, setShowZoom] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const imageUrl =
    product.image ||
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80";

  const getImageDescription = () => {
    const map = {
      Inverters: "Pure sine wave inverters for seamless power backup",
      Batteries: "Long-lasting tubular batteries with superior performance",
      "UPS Systems": "Enterprise-grade uninterruptible power supply solutions",
      "Solar Panels": "High-efficiency photovoltaic panels for maximum energy harvest",
      "Lithium Battery": "Next-generation lithium storage for modern energy needs"
    };
    return map[product.category] || "Reliable power solutions for every need";
  };

  const getUsageAreas = () => {
    const map = {
      Inverters: ["Homes", "Offices", "Shops"],
      Batteries: ["Homes", "Offices", "Factories"],
      "UPS Systems": ["Data Centers", "Hospitals", "Offices"],
      "Solar Panels": ["Homes", "Factories", "Commercial"],
      "Lithium Battery": ["Modern Homes", "Electric Vehicles", "Solar Systems"]
    };
    return map[product.category] || ["Homes", "Offices", "Commercial"];
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} - ${getImageDescription()}`,
      url: window.location.origin + `/contact?product=${encodeURIComponent(product.name)}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled',err);
      }
    } else {
      navigator.clipboard.writeText(
        `${product.name}\n${getImageDescription()}\n${shareData.url}`
      );
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    alert(`Downloading brochure for ${product.name}`);
  };

  const handleAddToCompare = () => {
    onCompareToggle(!isSelected);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      {/* Zoom Modal */}
      {showZoom && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <button 
            onClick={() => setShowZoom(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={imageUrl} 
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-lg font-semibold">{product.name}</p>
          </div>
        </div>
      )}

      <div className="group w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl relative">
        
        {/* Top Action Buttons */}
        <div className="absolute top-3 left-3 right-3 z-10 flex justify-between">
          {/* Compare Checkbox */}
          <label className="flex items-center bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1.5 rounded-full shadow-md cursor-pointer text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleAddToCompare}
              className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 rounded"
            />
            <span className="hidden xs:inline">Compare</span>
            <span className="xs:hidden">+</span>
          </label>

          {/* Like and Share Buttons */}
          <div className="flex gap-1 sm:gap-2">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition"
            >
              <Heart 
                className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`} 
              />
            </button>

            {/* Share Button with Tooltip */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition"
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
              </button>
              {showShareTooltip && (
                <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                  Link copied!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div 
          className="relative h-40 xs:h-48 sm:h-56 md:h-64 w-full overflow-hidden cursor-pointer" 
          onClick={() => setShowZoom(true)}
        >
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-12 left-3">
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                {product.badge}
              </span>
            </div>
          )}

          {/* Image Text - Appears on Hover */}
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
            <h3 className="text-base sm:text-xl font-bold leading-tight hidden xs:block">
              {product.category}
            </h3>
            <p className="text-xs sm:text-sm opacity-90 leading-snug line-clamp-2 hidden xs:block">
              {getImageDescription()}
            </p>
          </div>

          {/* Zoom Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-full p-1.5 sm:p-2 backdrop-blur-sm">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-3 sm:p-4 md:p-5">
          {/* Product Name */}
          <div className="mb-2">
            <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-1">
              {product.name}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
          </div>

          {/* Key Features */}
          <div className="flex-grow space-y-1 sm:space-y-2 mb-3">
            {product.features?.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center text-neutral-dark">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-green mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">{feature.name}</span>
                </div>
                {feature.value && (
                  <span className="px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700 flex-shrink-0 ml-1">
                    {feature.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Specifications Preview */}
          <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-3">
            {product.specs?.slice(0, 2).map((spec, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-1.5 text-center">
                <p className="text-xs text-gray-500">{spec.label}</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Usage Areas */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1.5">Perfect for:</p>
            <div className="flex flex-wrap gap-1">
              {getUsageAreas().slice(0, 3).map((area, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3">
            {/* 360° View Button */}
            <button
              onClick={on360View}
              className="flex flex-col items-center justify-center p-1.5 sm:p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition group"
            >
              <RotateCw className="h-3 w-3 sm:h-4 sm:w-4 mb-0.5" />
              <span className="text-[10px] sm:text-xs">360°</span>
            </button>

            {/* AR View Button */}
            <button
              onClick={onARView}
              className="flex flex-col items-center justify-center p-1.5 sm:p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition group"
            >
              <Award className="h-3 w-3 sm:h-4 sm:w-4 mb-0.5" />
              <span className="text-[10px] sm:text-xs">AR</span>
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={onWhatsApp}
              className="flex flex-col items-center justify-center p-1.5 sm:p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition group"
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mb-0.5" />
              <span className="text-[10px] sm:text-xs">Chat</span>
            </button>
          </div>

          {/* Main CTA Button */}
          <Link
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="w-full flex items-center justify-center gap-1 sm:gap-2 text-white font-semibold py-2 sm:py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:shadow-lg transition-all active:scale-95 text-xs sm:text-sm"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{product.cta || "Get Best Price"}</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>

          {/* Download Button */}
          <button
            onClick={handleDownloadPDF}
            className="mt-2 w-full flex items-center justify-center gap-1 sm:gap-2 text-gray-600 font-medium py-1.5 sm:py-2 px-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
          >
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Download Brochure</span>
            <span className="xs:hidden">PDF</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;