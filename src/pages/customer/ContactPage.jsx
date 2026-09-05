import React, { useState } from 'react';
import { Phone, MapPin, Building, Mail, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ContactPage = () => {
  const { settings } = useData();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-20">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Contact ASHWATH Fresh</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have questions about fruit availability, bulk orders, or Palakova delivery? Contact us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="bg-gradient-to-br from-emerald-800 to-green-900 text-white p-6 rounded-3xl space-y-4 shadow-lg">
            <h3 className="text-lg font-bold">Store Helpline</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              We are available to take phone calls and WhatsApp orders for fresh fruits and Palakova.
            </p>

            <a
              href="tel:9346763478"
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 text-xs transition-transform hover:scale-105 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CALL NOW: 9346763478</span>
            </a>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-sm">Origin Location</strong>
                <span className="text-slate-600">Tadakanapally, Kurnool</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2 border-t border-slate-100">
              <Building className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-sm">Business Address</strong>
                <p className="text-slate-600 leading-relaxed pt-1">
                  Plot: 32, H.No: 7-2-32/P,<br />
                  Road No: 5, Durga Nagar,<br />
                  Bairamalguda, Hyderabad - 500079
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Message Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Send Us a Direct Message</h3>

          {submitted && (
            <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! Your message has been sent. We will call you back shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Ramesh Kumar"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="9346763478"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message / Inquiry</label>
              <textarea
                rows="4"
                required
                placeholder="Ask about bulk fruit orders, Palakova pricing..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
