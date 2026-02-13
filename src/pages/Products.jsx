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
  Users,
  Award,
  SlidersHorizontal,
  X,
  Sparkles,
  Eye
} from 'lucide-react';

import ProductCard from '../components/ProductCard';
import CompareProducts from '../components/CompareProducts';
import AIRecommender from '../components/AIRecommender';
import ProductViewer360 from '../components/ProductViewer360';
import ARPreview from '../components/ARPreview';
import DealerDashboard from '../components/DealerDashboard';
import ProductShowcase3D from '../components/ProductShowcase3D';
import WhatsAppIntegration from '../components/WhatsAppIntegration';
import { products, categories } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showAIRecommender, setShowAIRecommender] = useState(false); // Controls modal visibility
  const [show360Viewer, setShow360Viewer] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);
  const [showDealerDashboard, setShowDealerDashboard] = useState(false);
  const [show3DShowcase, setShow3DShowcase] = useState(false);
  const [selectedProductForWhatsApp, setSelectedProductForWhatsApp] = useState(null);
  const [selectedProductFor360, setSelectedProductFor360] = useState(null);
  const [selectedProductForAR, setSelectedProductForAR] = useState(null);
  
  const [filters, setFilters] = useState({
    powerRange: '',
    application: '',
    technology: ''
  });

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
      case 'ups systems':
        return <Shield className="h-4 w-4 sm:h-5 sm:w-5" />;
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

  const powerRanges = ['1-3kW', '3-5kW', '5-10kW', '10kW+'];
  const applications = ['Residential', 'Commercial', 'Industrial'];
  const technologies = ['Pure Sine Wave', 'Digital', 'Tubular', 'Lithium', 'Mono PERC'];

  const filteredProducts = allProducts.filter((product) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.features?.some(
        (f) =>
          f.name.toLowerCase().includes(search) ||
          (f.value && f.value.toLowerCase().includes(search))
      );

    const matchesCategory =
      activeCategory === 'all' ||
      product.category.toLowerCase().includes(activeCategory.toLowerCase());

    let matchesFilters = true;
    
    if (filters.powerRange) {
      const power = parseInt(product.specs?.find(s => s.label === 'Power')?.value);
      if (filters.powerRange === '1-3kW' && power && (power < 1 || power > 3)) matchesFilters = false;
      if (filters.powerRange === '3-5kW' && power && (power < 3 || power > 5)) matchesFilters = false;
      if (filters.powerRange === '5-10kW' && power && (power < 5 || power > 10)) matchesFilters = false;
      if (filters.powerRange === '10kW+' && power && power < 10) matchesFilters = false;
    }

    return matchesSearch && matchesCategory && matchesFilters;
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

  const clearFilters = () => {
    setFilters({ powerRange: '', application: '', technology: '' });
    setSearchTerm('');
  };

  const handleDownloadCatalogue = () => {
    alert('Downloading complete product catalogue...');
  };

  const handle360View = (product) => {
    setSelectedProductFor360(product);
    setShow360Viewer(true);
  };

  const handleARView = (product) => {
    setSelectedProductForAR(product);
    setShowARPreview(true);
  };

  const handleWhatsApp = (product) => {
    setSelectedProductForWhatsApp(product);
    setShowWhatsApp(true);
  };

  const toggleAIRecommender = () => {
    setShowAIRecommender(!showAIRecommender);
  };

  const closeAIRecommender = () => {
    setShowAIRecommender(false);
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
            Premium Power Equipment & Energy Solutions for every need
          </p>
        </div>

        {/* AI Recommender Toggle Button */}
        <div className="mb-4">
          <button
            onClick={toggleAIRecommender}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">AI Product Recommender</span>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {showAIRecommender ? 'Hide' : 'Find your match'}
            </span>
          </button>
        </div>

        {/* AI Recommender - Only show when toggled ON, and NOT in a modal */}
        {showAIRecommender && (
          <div className="mb-6">
            <AIRecommender products={allProducts} />
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-6">
          <button
            onClick={() => setShow3DShowcase(true)}
            className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition active:scale-95"
          >
            <RotateCw className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">3D Showcase</span>
          </button>
          
          <button
            onClick={() => handleWhatsApp(allProducts[0])}
            className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition active:scale-95"
          >
            <MessageCircle className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">WhatsApp</span>
          </button>
          
          <button
            onClick={() => setShowDealerDashboard(true)}
            className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition active:scale-95"
          >
            <Users className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Dealer Hub</span>
          </button>
          
          <button
            onClick={() => handleARView(allProducts[0])}
            className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition active:scale-95"
          >
            <Award className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">AR Preview</span>
          </button>

          <button
            onClick={() => handle360View(allProducts[0])}
            className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition active:scale-95"
          >
            <Eye className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">360° View</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="text"
              placeholder="Search products by name, category, or feature..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue outline-none bg-white"
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
          <SlidersHorizontal className="h-4 w-4 ml-auto" />
        </button>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-blue hover:text-primary-dark"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Power Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power Range
                </label>
                <select
                  value={filters.powerRange}
                  onChange={(e) => setFilters({ ...filters, powerRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue outline-none bg-white"
                >
                  <option value="">All Power Ranges</option>
                  {powerRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Application */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application
                </label>
                <select
                  value={filters.application}
                  onChange={(e) => setFilters({ ...filters, application: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue outline-none bg-white"
                >
                  <option value="">All Applications</option>
                  {applications.map(app => (
                    <option key={app} value={app}>{app}</option>
                  ))}
                </select>
              </div>

              {/* Technology */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technology
                </label>
                <select
                  value={filters.technology}
                  onChange={(e) => setFilters({ ...filters, technology: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue outline-none bg-white"
                >
                  <option value="">All Technologies</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.powerRange || filters.application || filters.technology) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {filters.powerRange && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {filters.powerRange}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilters({ ...filters, powerRange: '' })}
                      />
                    </span>
                  )}
                  {filters.application && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {filters.application}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilters({ ...filters, application: '' })}
                      />
                    </span>
                  )}
                  {filters.technology && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {filters.technology}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilters({ ...filters, technology: '' })}
                      />
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Categories - Scrollable */}
        <div className="mb-6 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-primary-blue text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Shield className="h-4 w-4" />
              All Products
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === 'all' ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {allProducts.length}
              </span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-primary-blue text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {getCategoryIcon(cat.name)}
                {cat.name}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Catalogue Download */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleDownloadCatalogue}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-sm"
          >
            <Download className="h-4 w-4" />
            Download Complete Catalogue
          </button>
        </div>

        {/* Compare Bar */}
        {selectedProducts.length > 0 && (
          <div className="sticky bottom-4 z-40 mb-6">
            <div className="bg-white rounded-lg shadow-xl border border-emerald-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">
                  {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex -space-x-2">
                  {selectedProducts.map(p => (
                    <div key={p.id} className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-700">
                        {p.name.charAt(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProducts([])}
                  className="flex-1 sm:flex-initial px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowComparison(true)}
                  className="flex-1 sm:flex-initial px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Compare ({selectedProducts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCompareToggle={(checked) => handleCompareToggle(product, checked)}
                isSelected={selectedProducts.some(p => p.id === product.id)}
                on360View={() => handle360View(product)}
                onARView={() => handleARView(product)}
                onWhatsApp={() => handleWhatsApp(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="text-primary-blue hover:text-primary-dark font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Modals - These open as overlays */}
        {showComparison && (
          <CompareProducts
            products={selectedProducts}
            onClose={() => setShowComparison(false)}
          />
        )}

        {showWhatsApp && selectedProductForWhatsApp && (
          <WhatsAppIntegration
            product={selectedProductForWhatsApp}
            onClose={() => setShowWhatsApp(false)}
          />
        )}

        {show360Viewer && selectedProductFor360 && (
          <ProductViewer360
            product={selectedProductFor360}
            onClose={() => setShow360Viewer(false)}
          />
        )}

        {showARPreview && selectedProductForAR && (
          <ARPreview
            product={selectedProductForAR}
            onClose={() => setShowARPreview(false)}
          />
        )}

        {showDealerDashboard && (
          <DealerDashboard
            onClose={() => setShowDealerDashboard(false)}
          />
        )}

        {show3DShowcase && (
          <ProductShowcase3D
            products={filteredProducts.slice(0, 5)}
            onClose={() => setShow3DShowcase(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Products;