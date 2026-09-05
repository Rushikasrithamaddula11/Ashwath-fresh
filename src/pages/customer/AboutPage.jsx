import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, ShieldCheck, Heart, Truck, CheckCircle, PhoneCall } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-20">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-4">
        <span className="bg-emerald-900/70 text-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          About ASHWATH Fresh
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">Delivering Fresh Fruits & Health</h1>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          We are committed to bringing farm-fresh, nutrient-dense fruits directly to your doorstep with maximum convenience, quality assurance, and simple Cash on Delivery.
        </p>
      </div>

      {/* Main Story & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Our Mission for Freshness</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At ASHWATH Fresh, we believe everybody deserves access to clean, naturally ripened fresh fruits. From daily staples like apples, bananas, and oranges to seasonal delights like mangoes, watermelons, and imported dragon fruits, we select only prime quality produce.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We also offer our signature <strong>Ashwath Fresh Palakova</strong> prepared with pure high-quality milk, combining the joy of fresh fruits with traditional homemade sweets.
          </p>

          <div className="pt-2">
            <a
              href="tel:9346763478"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white font-extrabold text-xs px-6 py-3 rounded-2xl shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: 9346763478</span>
            </a>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">Why Customers Trust Us</h3>
          
          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Handpicked Quality Inspection</strong>
                <span>Every single fruit batch is inspected to guarantee natural freshness and taste.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Cash on Delivery Convenience</strong>
                <span>No advance online payments. Inspect your fruit order upon delivery and pay cash.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Transparent Pricing & ₹200 Minimum</strong>
                <span>Affordable fruit pricing per Kg/Dozen with minimum order limit of ₹200.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
