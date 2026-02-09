import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Zap, Sun, Shield } from 'lucide-react';

const ProductCard = ({ product }) => {
  const getIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'inverters':
        return <Zap className="h-6 w-6" />;
      case 'batteries':
        return <Battery className="h-6 w-6" />;
      case 'solar panels':
      case 'solar inverters':
        return <Sun className="h-6 w-6" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-blue/10 p-2 rounded-lg">
            {getIcon(product.category)}
          </div>
          <div>
            <span className="text-xs font-semibold text-primary-blue bg-primary-blue/10 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-bold text-neutral-dark mb-2">{product.name}</h3>
        <p className="text-neutral-gray text-sm mb-4">{product.description}</p>
        
        {product.features && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-dark mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-neutral-gray">
                  <div className="w-1.5 h-1.5 bg-secondary-green rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-neutral-light">
        <Link
          to={`/contact?product=${encodeURIComponent(product.name)}`}
          className="btn-secondary w-full text-center"
        >
          {product.cta}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;