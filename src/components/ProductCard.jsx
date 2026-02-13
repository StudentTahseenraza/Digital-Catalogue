import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowRight, 
  Share2, 
  Download,
  Eye,
  X
} from "lucide-react";

const ProductCard = ({ product, onCompareToggle, isSelected }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  
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
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(
        `${product.name}\n${getImageDescription()}\n${shareData.url}`
      );
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate a PDF
    alert(`Downloading brochure for ${product.name}`);
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
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>
          <img 
            src={imageUrl} 
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="group w-full max-w-md h-[600px] bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl relative">
        
        {/* Compare Checkbox */}
        <div className="absolute top-3 left-3 z-10">
          <label className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onCompareToggle(e.target.checked)}
              className="mr-2 h-4 w-4 text-emerald-600 rounded"
            />
            <span className="text-xs font-medium">Compare</span>
          </label>
        </div>

        {/* Share Button */}
        <div className="absolute top-3 right-3 z-10">
          <div className="relative">
            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
            >
              <Share2 className="h-4 w-4" />
            </button>
            {showShareTooltip && (
              <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Link copied!
              </div>
            )}
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative h-[240px] w-full overflow-hidden cursor-pointer" onClick={() => setShowZoom(true)}>
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-110
            "
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          {/* IMAGE TEXT */}
          <div
            className="
              absolute bottom-4 left-4 right-4 text-white
              opacity-0 translate-y-4
              transition-all duration-500 ease-out
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            <h3 className="text-xl font-bold leading-tight">
              {product.category}
            </h3>
            <p className="text-sm opacity-90 leading-snug line-clamp-2">
              {getImageDescription()}
            </p>
          </div>

          {/* Zoom Indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-full p-2">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-grow px-6 py-5">
          {/* Product Name & Badge */}
          <div className="mb-3">
            <h4 className="text-lg font-bold text-gray-900">{product.name}</h4>
            {product.badge && (
              <span className="inline-block mt-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* FEATURES */}
          <div className="flex-grow space-y-2">
            {product.features?.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center text-neutral-dark">
                  <CheckCircle className="w-4 h-4 text-secondary-green mr-2 flex-shrink-0" />
                  <span className="truncate">{feature.name}</span>
                </div>

                {feature.value && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700 flex-shrink-0 ml-2">
                    {feature.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Usage Areas */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Perfect for:</p>
            <div className="flex flex-wrap gap-1">
              {getUsageAreas().map((area, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            {/* CTA Button */}
            <Link
              to={`/contact?product=${encodeURIComponent(product.name)}`}
              className="
                flex items-center justify-center gap-2
                text-white font-semibold py-3 rounded-lg
                bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
                bg-[length:200%_200%]
                transition-all duration-500
                hover:bg-[position:100%_0%]
                hover:shadow-lg
                active:scale-[0.98]
              "
            >
              <span>{product.cta || "Get Best Price Now"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Download Button */}
            <button
              onClick={handleDownloadPDF}
              className="
                w-full flex items-center justify-center gap-2
                text-gray-700 font-medium py-2 px-4
                border border-gray-300 rounded-lg
                hover:bg-gray-50 transition-colors
              "
            >
              <Download className="h-4 w-4" />
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;