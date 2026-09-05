import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  PhoneCall,
  MapPin,
  Sparkles,
  LogOut,
  ChevronDown,
  Apple,
  Carrot
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import BrandLogo from '../common/BrandLogo';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { totalItemCount, subtotal, meetsMinimumOrder } = useCart();
  const { currentUser, isAdmin, logout } = useAuth();
  const { settings, searchQuery, setSearchQuery } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const categoryLinks = [
    { name: 'Fruits', path: '/fruits', icon: Apple },
    { name: 'Vegetables', path: '/vegetables', icon: Carrot }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-emerald-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-center sm:text-left">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-semibold text-[10px] uppercase tracking-wider shrink-0">
              COD ONLY
            </span>
            <span className="truncate">
              {settings.bannerMessage || 'Fresh Fruits Delivered directly to your door! Minimum order ₹200.'}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-emerald-100 text-xs shrink-0">
            <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-emerald-300" /> {settings.address?.originLocation || 'Tadakanapally, Kurnool'}</span>
            <a href={`tel:${settings.phone || '9346763478'}`} className="flex items-center hover:text-white font-medium">
              <PhoneCall className="w-3.5 h-3.5 mr-1 text-amber-300" /> {settings.phone || '9346763478'}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <BrandLogo src={settings.logoUrl} alt={settings.storeName || 'Ashwath Fresh'} className="h-14 w-44 group-hover:scale-[1.02] transition-transform duration-200" />
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight block group-hover:text-emerald-700 transition-colors">
                {settings.storeName || 'ASHWATH Fresh'}
              </span>
              <span className="text-[11px] font-medium text-emerald-600 tracking-wide uppercase block -mt-1">
                Fresh Fruits Delivery
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search fresh fruits, apples, mangoes, palakova..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 bg-slate-100/80 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-full transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Desktop Right Action Items */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Nav Links */}
            <nav className="flex items-center space-x-6 text-sm font-medium text-slate-700">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`hover:text-emerald-600 transition-colors ${
                    location.pathname === link.path ? 'text-emerald-700 font-bold' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className={`flex items-center gap-1 hover:text-emerald-600 transition-colors ${
                    location.pathname === '/fruits' || location.pathname === '/vegetables'
                      ? 'text-emerald-700 font-bold'
                      : ''
                  }`}
                >
                  Categories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {categoriesOpen && (
                  <div className="absolute right-0 top-full mt-3 w-40 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl z-50">
                    {categoryLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setCategoriesOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <link.icon className="w-4 h-4 text-emerald-600" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="h-6 w-px bg-slate-200" />

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full transition-all duration-150 border border-emerald-200/60"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <div className="text-left text-xs font-semibold">
                <span className="block text-[10px] text-emerald-600 uppercase tracking-wider">Cart</span>
                <span>₹{subtotal}</span>
              </div>
            </Link>

            {/* User Account / Admin Link */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-full text-xs font-medium transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span className="max-w-[90px] truncate">{currentUser.name || currentUser.displayName || 'Account'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-700 hover:text-emerald-600 border border-slate-200 px-3.5 py-2 rounded-full transition-colors"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Login</span>
                </Link>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name || currentUser.displayName || 'Customer'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    {isAdmin && (
                      <span className="mt-1 inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Admin Mode
                      </span>
                    )}
                  </div>

                  <Link
                    to="/my-orders"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    My Profile
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-1 border-t border-slate-100 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Cart Icon Mobile */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 bg-emerald-50 rounded-full hover:bg-emerald-100"
            >
              <ShoppingBag className="w-6 h-6 text-emerald-700" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search fruits, palakova..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs focus:outline-none focus:bg-white focus:border-emerald-500"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Categories
            </div>
            {categoryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-emerald-50 text-emerald-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <link.icon className="inline-block w-4 h-4 mr-2 text-emerald-600 -mt-0.5" />
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            {currentUser ? (
              <>
                <div className="px-3 py-1">
                  <p className="text-xs font-bold text-slate-800">{currentUser.name || currentUser.email}</p>
                  <p className="text-[11px] text-slate-500">Customer Account</p>
                </div>
                <Link
                  to="/my-orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  My Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-bold text-amber-700 bg-amber-50 rounded-lg"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 rounded-lg flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-xs font-medium text-slate-500 hover:text-emerald-700 pt-2"
            >
              Admin Portal Login →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
