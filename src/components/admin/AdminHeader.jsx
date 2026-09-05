import React from 'react';
import { User, ShieldCheck, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ title, subtitle }) => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{currentUser?.name || currentUser?.displayName || 'Store Administrator'}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
