import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Battery,
  Sun,
  Zap,
  Shield,
  Download,
  RotateCw,
  MessageCircle,
  X
} from 'lucide-react';

import ProductCard from '../components/ProductCard';
import CompareProducts from '../components/CompareProducts';
import WhatsAppIntegration from '../components/WhatsAppIntegration';
import { products, categories } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [selectedProductForWhatsApp, setSelectedProductForWhatsApp] = useState(null);

  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'inverters':
        return <Zap className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'batteries':
        return <Battery className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'solar panels':
        return <Sun className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <Shield className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const allProducts = [
    ...products.inverters,
    ...products.batteries,
    ...products.ups,
    ...products.solar,
    ...products.lithium
  ];

  const filteredProducts = allProducts.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchParams(category === 'all' ? {} : { category });
  };

  const handleCompareToggle = (product, checked) => {
    if (checked) {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, product]);
      } else {
        alert('You can compare up to 3 products at a time');
      }
    } else {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4">
        
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">
            OUR PRODUCT RANGE
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Premium Power Equipment & Energy Solutions
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button className="flex flex-col items-center p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl active:scale-95">
            <RotateCw className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs sm:text-sm">3D View</span>
          </button>
          <button 
            onClick={() => {
              setSelectedProductForWhatsApp(allProducts[0]);
              setShowWhatsApp(true);
            }}
            className="flex flex-col items-center p-2 sm:p-3 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg sm:rounded-xl active:scale-95"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs sm:text-sm">WhatsApp</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue outline-none bg-white"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg mb-4 text-sm hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
              <option>All Power Ranges</option>
              <option>1-3kW</option>
              <option>3-5kW</option>
              <option>5kW+</option>
            </select>
          </div>
        )}

        {/* Categories - Scrollable */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              All ({allProducts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {getCategoryIcon(cat.name)}
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Compare Bar */}
        {selectedProducts.length > 0 && (
          <div className="sticky bottom-4 z-40 mb-4">
            <div className="bg-white rounded-lg shadow-xl border border-emerald-200 p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{selectedProducts.length} selected</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProducts([])}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Compare
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCompareToggle={(checked) => handleCompareToggle(product, checked)}
              isSelected={selectedProducts.some(p => p.id === product.id)}
            />
          ))}
        </div>

        {/* Modals */}
        {showComparison && (
          <CompareProducts
            products={selectedProducts}
            onClose={() => setShowComparison(false)}
          />
        )}

        {showWhatsApp && (
          <WhatsAppIntegration
            product={selectedProductForWhatsApp}
            onClose={() => setShowWhatsApp(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Products;