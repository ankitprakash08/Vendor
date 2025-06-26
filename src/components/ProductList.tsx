import React from 'react';
import { Package, DollarSign, Edit, Trash2, Eye, EyeOff, Weight, Hash, Flower2, Star } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';

const ProductList: React.FC = () => {
  const { getVendorProducts, updateProduct, deleteProduct } = useProducts();
  const { currentVendor } = useAuth();
  
  const products = currentVendor ? getVendorProducts(currentVendor.id) : [];

  const handleToggleStock = (productId: string, currentStock: boolean) => {
    updateProduct(productId, { inStock: !currentStock });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this sacred product from your offerings?')) {
      deleteProduct(productId);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-gradient-to-br from-orange-50/90 to-red-50/90 backdrop-blur-xl rounded-3xl shadow-lg border-2 border-orange-200/50 p-12 text-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg relative">
            <Flower2 className="w-10 h-10 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">🕉️</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-orange-800 mb-3">No Sacred Products Yet</h3>
          <p className="text-orange-600 mb-6 text-lg">Begin your spiritual journey by adding your first divine offering to bless devotees worldwide.</p>
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <Flower2 className="w-6 h-6 mr-3" />
            Add Your First Sacred Product
            <Star className="w-5 h-5 ml-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gradient-to-br from-orange-50/90 via-red-50/90 to-yellow-50/90 backdrop-blur-xl rounded-3xl shadow-lg border-2 border-orange-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-bl-3xl"></div>
            
            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-orange-100 to-red-100 relative">
              <img
                src={product.imageUrl || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';
                }}
              />
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                  product.inStock 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                    : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                }`}>
                  {product.inStock ? '✨ Available' : '🔒 Out of Stock'}
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                  🕉️ Sacred
                </span>
              </div>
            </div>
            
            <div className="p-6 relative z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-orange-800 mb-2 line-clamp-2 flex items-center gap-2">
                  <Flower2 className="w-5 h-5 text-orange-600" />
                  {product.name}
                </h3>
                <p className="text-orange-600 text-sm line-clamp-3 leading-relaxed">{product.description}</p>
              </div>
              
              {/* Pricing Section */}
              <div className="space-y-3 mb-4">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-orange-700">Your Offering Price</span>
                    <span className="text-xl font-bold text-orange-800">${product.sellerPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-red-700">Market Price</span>
                    <span className="text-xl font-bold text-red-800">${product.mrp.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-center">
                  <span className="bg-gradient-to-r from-orange-200 to-red-200 text-orange-800 px-4 py-2 rounded-full text-sm font-bold border border-orange-300">
                    {product.category}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {product.weight && product.weightUnit && (
                    <div className="flex items-center justify-center bg-orange-50 rounded-xl p-2 border border-orange-200">
                      <Weight className="w-4 h-4 mr-2 text-orange-600" />
                      <span className="font-semibold text-orange-800">{product.weight} {product.weightUnit}</span>
                    </div>
                  )}
                  
                  {product.quantity && product.quantityUnit && (
                    <div className="flex items-center justify-center bg-red-50 rounded-xl p-2 border border-red-200">
                      <Hash className="w-4 h-4 mr-2 text-red-600" />
                      <span className="font-semibold text-red-800">{product.quantity} {product.quantityUnit}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t-2 border-orange-200">
                <button
                  onClick={() => handleToggleStock(product.id, product.inStock)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                    product.inStock
                      ? 'text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      : 'text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                  }`}
                >
                  {product.inStock ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{product.inStock ? 'Available' : 'Hidden'}</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <button className="p-3 text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-3 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;