import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminHeader from '../../components/admin/AdminHeader';
import { uploadImage } from '../../firebase/storageService';

export const AdminBrandPage = () => {
  const { settings, updateSettings } = useData();
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || '');
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUploadLogo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, 'brand');
      setLogoUrl(url);
    } catch (err) {
      console.error('Logo upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    await updateSettings({ ...settings, logoUrl });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteLogo = async () => {
    setLogoUrl('');
    await updateSettings({ ...settings, logoUrl: '' });
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Brand Settings & Logo Management"
        subtitle="Upload, preview and manage store logo across Navbar, Footer and Dashboard"
      />

      <div className="px-6 space-y-6 max-w-2xl pb-16">
        
        {saved && (
          <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Store Logo updated successfully! Changes immediately apply across store navbar & footer.</span>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-slate-900">Store Logo Configuration</h3>

          <div className="space-y-4">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
              {logoUrl ? (
                <div className="relative group">
                  <img src={logoUrl} alt="Store Logo" className="h-24 w-auto object-contain rounded-xl bg-white p-2 border border-slate-200" />
                  <button
                    onClick={handleDeleteLogo}
                    className="absolute -top-2 -right-2 bg-rose-600 text-white p-1.5 rounded-full shadow-md hover:bg-rose-700 transition-colors"
                    title="Remove Logo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-green-500 rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-md">
                  AF
                </div>
              )}

              <p className="text-xs text-slate-500">
                {logoUrl ? 'Active Store Logo Preview' : 'No custom logo uploaded yet. Default SVG badge active.'}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Upload New Store Logo (Firebase Storage)
              </label>
              <label className="cursor-pointer inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading to Firebase Storage...' : 'Browse & Upload Logo'}</span>
                <input type="file" accept="image/*" onChange={handleUploadLogo} className="hidden" />
              </label>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Direct Image URL</label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md"
              >
                Save Logo Settings
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminBrandPage;
