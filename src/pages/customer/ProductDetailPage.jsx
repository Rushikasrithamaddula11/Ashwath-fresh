import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, Check, ArrowLeft, ShieldCheck, Truck, Sparkles, Plus, Minus, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import ProductCard from '../../components/product/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useData();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500">The product you are looking for might have been removed.</p>
        <Link to="/shop" className="inline-block bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isPalakova = product.name?.toLowerCase().includes('palakova') || product.category === 'Special Products';
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.active && (p.category === product.category || p.featured))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      
      {/* Back Button */}
      <Link to="/shop" className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-emerald-700 space-x-1">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </Link>

      {/* Main Details Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Image Showcase */}
        <div className="space-y-4">
          <div className="relative aspect-4/3 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
            <img
              src={product.imageUrl || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {isPalakova && (
              <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" /> Special Product
              </span>
            )}
          </div>
        </div>

        {/* Right Product Specifications */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {product.category || 'Fresh Fruits'}
              </span>
              {isOutOfStock ? (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
                </span>
              ) : (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  In Stock ({product.stock} available)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{product.name}</h1>

            <div className="flex items-baseline space-x-2 pt-1 border-b border-slate-100 pb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm font-bold text-slate-500">/ {product.unit || 'Kg'}</span>
              {product.weight && (
                <span className="text-xs text-slate-400 font-medium ml-2">({product.weight})</span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
              {product.description || 'Harvested fresh for peak flavor and nutrition. Delivered directly with Cash on Delivery.'}
            </p>
          </div>

          {/* Quantity Picker & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all ${
                  added
                    ? 'bg-emerald-800 text-white'
                    : isOutOfStock
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200'
                }`}
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3.5 px-4 rounded-2xl text-xs font-extrabold text-white flex items-center justify-center space-x-2 shadow-md transition-all ${
                  isOutOfStock
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Features Strip */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cash on Delivery Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Min Order ₹200</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Fruits Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetailPage;
