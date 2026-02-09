import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const ProductCard = ({ product }) => {
  const imageUrl =
    product.image ||
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80";

  const getImageDescription = () => {
    const map = {
      Inverters: "Pure sine wave inverters for seamless power backup",
      Batteries: "Long-lasting tubular batteries with superior performance",
      "UPS Systems":
        "Enterprise-grade uninterruptible power supply solutions",
      "Solar Panels":
        "High-efficiency photovoltaic panels for maximum energy harvest",
      "Lithium Battery":
        "Next-generation lithium storage for modern energy needs"
    };

    return map[product.category] || "Reliable power solutions for every need";
  };

  return (
    <div className="group w-full max-w-md h-[540px] bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">

      {/* IMAGE SECTION */}
      <div className="relative h-[240px] w-full overflow-hidden">
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

        {/* IMAGE TEXT (FADE + SLIDE IN ON HOVER) */}
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
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow px-6 py-5">
        {/* FEATURES */}
        <div className="flex-grow space-y-3">
          {product.features?.slice(0, 4).map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center text-neutral-dark">
                <CheckCircle className="w-4 h-4 text-secondary-green mr-2" />
                <span>{feature.name}</span>
              </div>

              {feature.value && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700">
                  {feature.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA BUTTON – TWO COLOR GRADIENT MIX */}
        <Link
          to={`/contact?product=${encodeURIComponent(product.name)}`}
          className="
            mt-6 flex items-center justify-center gap-2
            text-white font-semibold py-3.5 rounded-full
            bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
            bg-[length:200%_200%]
            transition-all duration-500
            hover:bg-[position:100%_0%]
            hover:shadow-lg hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          <span>{product.cta || "Get Best Price Now"}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
