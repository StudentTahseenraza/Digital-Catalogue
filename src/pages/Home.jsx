import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Award, Truck, Battery, Sun, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const featuredProducts = [
    products.inverters[0],
    products.batteries[0],
    products.solar[0],
    products.lithium[0]
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "5000+", label: "Happy Customers" },
    { icon: <Award className="h-8 w-8" />, label: "15+ Years", description: "Industry Experience" },
    { icon: <Truck className="h-8 w-8" />, value: "500+", label: "Dealers Nationwide" },
    { icon: <Battery className="h-8 w-8" />, value: "50+", label: "Product Range" },
  ];

  const certifications = [
    "ISO 9001:2015 Certified Company",
    "BIS Approved Products",
    "Authorized Dealer Network",
    "15 Years of Excellence Award"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary-blue text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              India's Trusted Manufacturer of Premium Power Equipment
            </h1>
            <p className="text-xl mb-8 text-white/90">
              We deliver cutting-edge inverters, batteries, UPS systems, and solar solutions to homes and businesses across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-secondary text-lg px-8 py-4">
                Explore Products
              </Link>
              <Link to="/contact" className="bg-white text-primary-dark hover:bg-neutral-light text-lg font-semibold px-8 py-4 rounded-lg transition-colors">
                Get Best Price Now
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden lg:block">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 bg-secondary-green/20 rounded-full"></div>
            <div className="absolute inset-8 bg-secondary-green/10 rounded-full"></div>
            <Zap className="absolute inset-16 h-32 w-32 text-white/20" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
                  <div className="text-primary-blue">
                    {stat.icon}
                  </div>
                </div>
                {stat.value && (
                  <div className="text-3xl font-bold text-primary-dark mb-2">{stat.value}</div>
                )}
                <div className="text-lg font-semibold text-neutral-dark">{stat.label}</div>
                {stat.description && (
                  <div className="text-neutral-gray text-sm">{stat.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Premium Quality Products</h2>
            <p className="text-neutral-gray max-w-2xl mx-auto">
              Explore our comprehensive range of high-quality power solutions designed for reliability and performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary text-lg px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-primary-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-neutral-dark mb-12">
              Trust & Credibility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark">{cert}</h3>
                    <p className="text-neutral-gray">
                      Ensuring highest standards in manufacturing and service delivery.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-dark to-primary-blue rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Power Your Future?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join our network of 500+ authorized dealers across India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-primary-dark hover:bg-neutral-light text-lg font-semibold px-8 py-4 rounded-lg transition-colors">
                Become a Dealer
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 text-lg font-semibold px-8 py-4 rounded-lg transition-colors">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;