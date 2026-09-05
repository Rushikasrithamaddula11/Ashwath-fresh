import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, SlidersHorizontal, Apple } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProductCard from '../../components/product/ProductCard';

export const ShopPage = ({ category: fixedCategory }) => {
  const { products, categories, searchQuery, setSearchQuery } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryParam = fixedCategory || searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryParam);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (fixedCategory) {
      setSelectedCategory(fixedCategory);
    } else if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
  }, [fixedCategory, searchParams]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    if (categoryName === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryName);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    if (!product.active) return false;

    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' ||
      (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const emptyCategoryLabel = selectedCategory === 'All' ? 'Products' : selectedCategory;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="bg-emerald-900/60 text-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Online Fruit Shop
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">Browse Fresh Fruits & Products</h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Select high-quality fresh fruits harvested daily. Minimum order value ₹200 with Cash on Delivery.
          </p>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div id="categories" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Select Category</span>
          </h2>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Products ({products.filter(p => p.active).length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search Apple, Banana, Mango, Palakova..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-emerald-500"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Status Count & Sort */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
          <span className="text-xs font-medium text-slate-500">
            Showing <strong className="text-slate-900">{sortedProducts.length}</strong> items
          </span>

          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Apple className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No {emptyCategoryLabel} Found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any {emptyCategoryLabel.toLowerCase()} matching your search. Try clearing the search or browsing another category.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors"
          >
            Show All Products
          </button>
        </div>
      )}

    </div>
  );
};

export default ShopPage;
