import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  ClipboardList,
  BarChart3,
  Users,
  Image,
  Settings,
  LogOut,
  Store,
  Sparkles,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import BrandLogo from '../common/BrandLogo';

export const AdminSidebar = () => {
  const { logout } = useAuth();
  const { settings, triggerSeedDatabase } = useData();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Orders', path: '/admin/orders', icon: ClipboardList },
    { name: 'Sales Reports', path: '/admin/sales', icon: BarChart3 },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Brand & Logo', path: '/admin/brand', icon: Image },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleSeed = async () => {
    if (window.confirm('Do you want to re-seed default fruits, categories and store settings?')) {
      await triggerSeedDatabase();
      alert('Database seeded successfully!');
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div className="space-y-6">
        
        {/* Brand Title Header */}
        <div className="flex items-center space-x-3 px-2 py-3 border-b border-slate-800">
          <BrandLogo src={settings.logoUrl} alt={settings.storeName || 'Ashwath Fresh'} className="h-12 w-40 rounded-lg bg-white p-1" />
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Admin Dashboard</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <button
          onClick={handleSeed}
          className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors border border-amber-500/20"
        >
          <Database className="w-3.5 h-3.5" />
          <span>Seed Initial Database</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-colors"
        >
          <Store className="w-3.5 h-3.5" />
          <span>View Customer Site</span>
        </button>

        <button
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className="w-full py-2 px-3 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 transition-colors border border-rose-800/30"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Admin Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
