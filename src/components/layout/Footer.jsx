import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Building, ShoppingBag, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import BrandLogo from '../common/BrandLogo';

export const Footer = () => {
  const { settings } = useData();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      {/* Brand Features Strip */}
      <div className="bg-emerald-900/60 border-b border-emerald-800/50 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">100% Fresh Fruits</span>
            <span className="text-[11px] text-emerald-200">Handpicked Quality Assured</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Cash on Delivery</span>
            <span className="text-[11px] text-emerald-200">Pay ONLY when delivered</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <ShoppingBag className="w-6 h-6 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Min. Order ₹200</span>
            <span className="text-[11px] text-emerald-200">Guaranteed Fresh Delivery</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Special Palakova</span>
            <span className="text-[11px] text-amber-200">Authentic Homemade Sweet</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Store Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BrandLogo src={settings.logoUrl} alt={settings.storeName || 'Ashwath Fresh'} className="h-14 w-44 rounded-lg bg-white p-1" />
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">ASHWATH FRESH PALAKOVA</h3>
                <p className="text-xs text-emerald-400 font-medium">Fresh Fruits & Products</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Your trusted local destination for daily fresh fruits, nutrient-rich seasonal varieties, imported fruits, juices, and authentic fresh Palakova delivered straight to your home.
            </p>
            <div className="pt-1">
              <span className="inline-block bg-slate-800 text-emerald-400 border border-slate-700 text-xs px-3 py-1 rounded-full font-medium">
                Payment: Cash on Delivery ONLY
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-emerald-400 transition-colors">Shop All Fruits</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-emerald-400 transition-colors">Track My Orders</Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-slate-500 hover:text-amber-400 transition-colors">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Main Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Fruit Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/shop?category=Fresh+Fruits" className="hover:text-emerald-400">Fresh Fruits</Link></li>
              <li><Link to="/shop?category=Seasonal+Fruits" className="hover:text-emerald-400">Seasonal Fruits</Link></li>
              <li><Link to="/shop?category=Imported+Fruits" className="hover:text-emerald-400">Imported Fruits</Link></li>
              <li><Link to="/shop?category=Citrus+Fruits" className="hover:text-emerald-400">Citrus & Tropical</Link></li>
              <li><Link to="/shop?category=Fruit+Combos" className="hover:text-emerald-400">Fruit Combos & Juices</Link></li>
              <li><Link to="/shop?category=Special+Products" className="text-amber-300 font-semibold hover:underline">Special Palakova</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Contact & Address
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Call / WhatsApp</span>
                  <a href="tel:9346763478" className="font-bold text-white hover:text-emerald-400">9346763478</a>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Origin Location</span>
                  <span>Tadakanapally, Kurnool</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Building className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Business Address</span>
                  <p className="leading-relaxed text-[11px] text-slate-300">
                    Plot: 32, H.No: 7-2-32/P,<br />
                    Road No: 5, Durga Nagar,<br />
                    Bairamalguda, Hyderabad - 500079
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} ASHWATH Fresh. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Delivering Health & Freshness in Kurnool & Hyderabad</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
