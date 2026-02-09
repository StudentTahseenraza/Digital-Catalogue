import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Battery, Sun, Zap, Shield } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryParam = searchParams.get('category');
  const initialCategory = categoryParam || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'inverters':
        return <Zap className="h-5 w-5" />;
      case 'batteries':
        return <Battery className="h-5 w-5" />;
      case 'solar':
      case 'solar panels':
      case 'solar inverters':
        return <Sun className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const allProducts = [
    ...products.inverters,
    ...products.batteries,
    ...products.ups,
    ...products.solar,
    ...products.lithium
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                          product.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchParams(category === 'all' ? {} : { category });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">OUR PRODUCT RANGE</h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Premium Power Equipment & Energy Solutions. Explore our comprehensive range of high-quality products.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full md:w-96 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-neutral-gray">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by:</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary-blue text-white'
                  : 'bg-neutral-light text-neutral-dark hover:bg-neutral-200'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>All Products</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-blue text-white'
                    : 'bg-neutral-light text-neutral-dark hover:bg-neutral-200'
                }`}
              >
                {getCategoryIcon(category.name)}
                <span>{category.name}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <p className="text-neutral-gray mb-4">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
              <p className="text-sm text-neutral-gray">
                Prices available on request. Contact us for quotes and dealership inquiries.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-neutral-light rounded-2xl p-8 max-w-md mx-auto">
              <Search className="h-12 w-12 text-neutral-gray mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">No products found</h3>
              <p className="text-neutral-gray mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryClick('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-secondary-green to-secondary-light rounded-2xl text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Custom Power Solutions?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact our technical team for customized products and bulk pricing for dealers.
          </p>
          <Link to="/contact" className="inline-block bg-white text-secondary-green hover:bg-neutral-light font-semibold px-8 py-3 rounded-lg transition-colors">
            Contact Our Experts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;