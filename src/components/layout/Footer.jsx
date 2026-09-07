import React from 'react';
import { Building, MapPin, Phone } from 'lucide-react';
import { useData } from '../../context/DataContext';
import BrandLogo from '../common/BrandLogo';

export const Footer = () => {
  const { settings } = useData();

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <BrandLogo src={settings.logoUrl} alt={settings.storeName || 'Ashwath Fresh'} className="h-14 w-44 rounded-lg bg-white p-1" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Fresh fruits, vegetables, and traditional products from Ashwath Fresh.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <h2 className="font-bold uppercase tracking-wider text-white">Visit us</h2>
          <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{settings.address?.originLocation || 'Tadakanapally, Kurnool'}</p>
          <p className="flex items-start gap-2"><Building className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{settings.address?.businessAddress || 'Ashwath Fresh'}</p>
        </div>
        <div className="space-y-3 text-sm">
          <h2 className="font-bold uppercase tracking-wider text-white">Contact</h2>
          <a href={`tel:${settings.phone || '9346763478'}`} className="flex items-center gap-2 hover:text-emerald-400">
            <Phone className="h-4 w-4 text-emerald-400" />
            {settings.phone || '9346763478'}
          </a>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {settings.storeName || 'Ashwath Fresh'}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
