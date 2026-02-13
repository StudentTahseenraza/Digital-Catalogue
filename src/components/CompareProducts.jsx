import React from 'react';
import { X, Check, Minus } from 'lucide-react';

const CompareProducts = ({ products, onClose }) => {
  if (products.length === 0) return null;

  const allSpecs = [
    { key: 'Power', label: 'Power Rating' },
    { key: 'Warranty', label: 'Warranty' },
    { key: 'Technology', label: 'Technology' },
    { key: 'Efficiency', label: 'Efficiency' },
    { key: 'Application', label: 'Application' },
    { key: 'Weight', label: 'Weight' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="relative bg-white rounded-2xl max-w-6xl mx-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white rounded-t-2xl border-b p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Compare Products</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="p-6 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left pb-4 font-semibold text-gray-600">Specifications</th>
                  {products.map((product) => (
                    <th key={product.id} className="pb-4 px-4">
                      <div className="text-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                        />
                        <h3 className="font-bold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Features */}
                <tr>
                  <td className="py-3 font-semibold bg-gray-50">Features</td>
                  {products.map((product) => (
                    <td key={product.id} className="px-4 py-3 bg-gray-50">
                      <ul className="space-y-1">
                        {product.features?.map((f, i) => (
                          <li key={i} className="text-sm flex items-center">
                            <Check className="h-3 w-3 text-green-600 mr-1" />
                            {f.name}: {f.value}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Specifications */}
                {allSpecs.map(({ key, label }) => (
                  <tr key={key}>
                    <td className="py-3 font-medium">{label}</td>
                    {products.map((product) => {
                      const spec = product.specs?.find(s => s.label === key);
                      return (
                        <td key={product.id} className="px-4 py-3 text-center">
                          {spec ? spec.value : <Minus className="h-4 w-4 mx-auto text-gray-400" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* CTA Row */}
                <tr>
                  <td className="py-4"></td>
                  {products.map((product) => (
                    <td key={product.id} className="px-4 py-4 text-center">
                      <a
                        href={`/contact?product=${encodeURIComponent(product.name)}`}
                        className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition"
                      >
                        Get Quote
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t p-4 text-center text-sm text-gray-500">
            Showing comparison of {products.length} products
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;