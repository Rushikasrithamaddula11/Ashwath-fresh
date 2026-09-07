import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, PhoneCall } from 'lucide-react';
import { useData } from '../../context/DataContext';
import BrandLogo from '../common/BrandLogo';

export const Navbar = () => {
  const { settings } = useData();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 shadow-xs backdrop-blur-md">
      <div className="bg-emerald-700 px-4 py-1.5 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span className="truncate">{settings.bannerMessage || 'Fresh produce, thoughtfully sourced.'}</span>
          <div className="hidden shrink-0 items-center gap-4 text-emerald-100 sm:flex">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-300" />
              {settings.address?.originLocation || 'Tadakanapally, Kurnool'}
            </span>
            <a href={`tel:${settings.phone || '9346763478'}`} className="flex items-center gap-1 font-medium hover:text-white">
              <PhoneCall className="h-3.5 w-3.5 text-amber-300" />
              {settings.phone || '9346763478'}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <BrandLogo src={settings.logoUrl} alt={settings.storeName || 'Ashwath Fresh'} className="h-14 w-44" />
          <div>
            <span className="block text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              {settings.storeName || 'ASHWATH Fresh'}
            </span>
            <span className="-mt-1 block text-[11px] font-medium uppercase tracking-wide text-emerald-600">
              Fresh Fruits &amp; Products
            </span>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex" aria-label="Main navigation">
          <Link to="/" className="transition-colors hover:text-emerald-700">Home</Link>
          <Link to="/about" className="transition-colors hover:text-emerald-700">About Us</Link>
          <Link to="/fruits" className="transition-colors hover:text-emerald-700">Fruits</Link>
          <Link to="/vegetables" className="transition-colors hover:text-emerald-700">Vegetables</Link>
          <Link to="/palakova" className="transition-colors hover:text-emerald-700">Palakova</Link>
          <Link to="/contact" className="transition-colors hover:text-emerald-700">Contact Us</Link>
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={`tel:${settings.phone || '9346763478'}`}
            className="flex items-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            <PhoneCall className="h-4 w-4" />
            Contact us
          </a>
        </div>
      </div>
      <nav className="flex items-center justify-center gap-5 border-t border-slate-100 px-4 py-3 text-xs font-semibold text-slate-700 lg:hidden" aria-label="Mobile navigation">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <Link to="/about" className="hover:text-emerald-700">About Us</Link>
        <Link to="/fruits" className="hover:text-emerald-700">Fruits</Link>
        <Link to="/vegetables" className="hover:text-emerald-700">Vegetables</Link>
        <Link to="/palakova" className="hover:text-emerald-700">Palakova</Link>
        <Link to="/contact" className="hover:text-emerald-700">Contact Us</Link>
      </nav>
    </header>
  );
};

export default Navbar;
