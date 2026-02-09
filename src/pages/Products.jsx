import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Battery,
  Sun,
  Zap,
  Shield,
  CheckCircle
} from 'lucide-react';

import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');

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
      case 'ups systems':
        return <Shield className="h-5 w-5" />;
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

  // ✅ SAFE + BETTER FILTERING
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

    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSearchParams(category === 'all' ? {} : { category });
  };

  // DETAIL SECTIONS (UNCHANGED STRUCTURE)
  const productSections = [
    {
      id: 'inverters',
      title: 'Inverters',
      description: 'Pure sine wave inverters for seamless power backup',
      icon: <Zap className="h-8 w-8" />,
      products: products.inverters,
      features: [
        'Smart Technology',
        'Pure Sine Wave Output',
        'Overload Protection',
        'Silent Operation'
      ]
    },
    {
      id: 'batteries',
      title: 'Batteries',
      description: 'Long-lasting tubular batteries with superior performance',
      icon: <Battery className="h-8 w-8" />,
      products: products.batteries,
      features: [
        'Deep Cycle Design',
        'Low Maintenance',
        'Spill Proof',
        'Long Life'
      ]
    },
    {
      id: 'ups',
      title: 'UPS Systems',
      description: 'Enterprise-grade uninterruptible power supply solutions',
      icon: <Shield className="h-8 w-8" />,
      products: products.ups,
      features: [
        'Online Double Conversion',
        'Zero Transfer Time',
        'LCD Display',
        'Network Management'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-dark mb-4">
            OUR PRODUCT RANGE
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            Premium Power Equipment & Energy Solutions.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary-blue outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 text-neutral-gray">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filter by:</span>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="mb-10 flex flex-wrap gap-3">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'bg-primary-blue text-white'
                : 'bg-neutral-light hover:bg-neutral-200'
            }`}
          >
            <Shield className="h-4 w-4" />
            All Products
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {allProducts.length}
            </span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-primary-blue text-white'
                  : 'bg-neutral-light hover:bg-neutral-200'
              }`}
            >
              {getCategoryIcon(cat.name)}
              {cat.name}
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-neutral-gray mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-neutral-gray mt-2">
              Try changing search or filters
            </p>
          </div>
        )}

        {/* DETAIL SECTIONS */}
        {/* <div className="space-y-12">
          {productSections.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary-blue/10 p-3 rounded-xl">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                  <p className="text-neutral-gray">{section.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-2">
                  {section.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-gray">
                      <CheckCircle className="h-4 w-4 text-secondary-green" />
                      {f}
                    </li>
                  ))}
                </ul>

                <ul className="space-y-2">
                  {section.products.map((p) => (
                    <li key={p.id} className="flex justify-between">
                      <span>{p.name}</span>
                      <Link
                        to={`/contact?product=${encodeURIComponent(p.name)}`}
                        className="text-primary-blue font-medium"
                      >
                        Get Quote
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div> */}

      </div>
    </div>
  );
};

export default Products;
