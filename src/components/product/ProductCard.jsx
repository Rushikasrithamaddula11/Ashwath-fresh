import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const isPalakova = product.name?.toLowerCase().includes('palakova') || product.category === 'Special Products';
  const isOutOfStock = product.stock <= 0;

  return (
    <div className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
      isPalakova
        ? 'border-amber-200 ring-2 ring-amber-400/20 bg-linear-to-b from-amber-50/30 to-white'
        : 'border-slate-100 hover:border-emerald-200'
    }`}>
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.featured && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Fresh Choice
            </span>
          )}
          {isPalakova && (
            <span className="bg-linear-to-r from-amber-500 to-amber-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Special Product
            </span>
          )}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3 h-3" /> Out of Stock
            </span>
          ) : (
            <span className="bg-white/90 backdrop-blur-xs text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider block mb-1">
            {product.category || 'Fresh Fruits'}
          </span>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Unit */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span className="text-lg sm:text-xl font-extrabold text-slate-900">
              {formatCurrency(product.price)}
            </span>
            <span className="text-xs font-semibold text-slate-500 ml-1">
              / {product.unit || 'Kg'}
            </span>
          </div>
          {product.weight && (
            <span className="text-[11px] font-medium text-slate-400">
              ({product.weight})
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
