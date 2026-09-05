import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, MapPin, PhoneCall } from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminHeader from '../../components/admin/AdminHeader';

export const AdminSettingsPage = () => {
  const { settings, updateSettings } = useData();

  const [formData, setFormData] = useState({
    storeName: settings.storeName || 'ASHWATH Fresh',
    phone: settings.phone || '9346763478',
    minimumOrder: settings.minimumOrder || 200,
    deliveryCharge: settings.deliveryCharge ?? 0,
    paymentMethod: 'Cash on Delivery ONLY',
    bannerMessage: settings.bannerMessage || '⚡ Free Express Home Delivery on orders above ₹300! Minimum Order: ₹200 (COD Only).'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSettings({ ...settings, ...formData });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Store Settings"
        subtitle="Manage business parameters, contact phone, minimum order value and store notices"
      />

      <div className="px-6 space-y-6 max-w-3xl pb-16">
        
        {saved && (
          <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Store settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">Business Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Store / Website Name</label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Store Phone / Helpline</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Minimum Order Value (₹) *</label>
              <input
                type="number"
                required
                value={formData.minimumOrder}
                onChange={(e) => setFormData({ ...formData, minimumOrder: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Payment Method</label>
              <input
                type="text"
                disabled
                value="Cash on Delivery ONLY"
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-bold cursor-not-allowed"
              />
            </div>
          </div>

          <div className="text-xs space-y-1">
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Top Banner Announcement</label>
            <input
              type="text"
              value={formData.bannerMessage}
              onChange={(e) => setFormData({ ...formData, bannerMessage: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-1 border border-slate-200/80">
            <span className="font-bold text-slate-900 block">Registered Store Address</span>
            <p className="text-slate-600 leading-relaxed">
              <strong>Location:</strong> Tadakanapally, Kurnool<br />
              <strong>Address:</strong> Plot: 32, H.No: 7-2-32/P, Road No: 5, Durga Nagar, Bairamalguda, Hyderabad - 500079
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-8 py-3 rounded-xl shadow-md flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Store Settings</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AdminSettingsPage;
