import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, ShoppingBag, IndianRupee, Package, CheckCircle2, XCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useData } from '../../context/DataContext';
import AdminHeader from '../../components/admin/AdminHeader';
import { formatCurrency } from '../../utils/formatters';

export const AdminSalesPage = () => {
  const { calculateSalesAnalytics, orders } = useData();

  const [timeframe, setTimeframe] = useState('today');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const analytics = calculateSalesAnalytics(timeframe, customStart, customEnd);

  // Group sales data for chart
  const getChartData = () => {
    const dataMap = {};
    (analytics.orders || []).forEach(o => {
      const dateKey = new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      dataMap[dateKey] = (dataMap[dateKey] || 0) + Number(o.totalAmount || 0);
    });

    const result = Object.keys(dataMap).map(key => ({
      date: key,
      sales: dataMap[key]
    }));

    if (result.length === 0) {
      return [
        { date: 'Today', sales: analytics.totalSales || 0 }
      ];
    }
    return result;
  };

  const chartData = getChartData();

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Daily Sales & Business Reports"
        subtitle="Analyze daily, weekly, monthly sales performance and revenue statistics calculated from actual orders"
      />

      <div className="px-6 space-y-6 pb-16">
        
        {/* Timeframe Selector Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Select Timeframe:</span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setTimeframe('today')}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                timeframe === 'today' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe('yesterday')}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                timeframe === 'yesterday' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => setTimeframe('7days')}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                timeframe === '7days' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                timeframe === 'month' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeframe('custom')}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                timeframe === 'custom' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Custom Date Range
            </button>
          </div>
        </div>

        {/* Custom Date Pickers */}
        {timeframe === 'custom' && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-xs font-semibold text-amber-900">
            <div className="flex items-center space-x-2">
              <span>Start Date:</span>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="bg-white border border-amber-300 rounded-xl px-3 py-1.5 focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span>End Date:</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="bg-white border border-amber-300 rounded-xl px-3 py-1.5 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Sales Summary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-gradient-to-br from-emerald-700 to-green-800 text-white p-5 rounded-3xl shadow-md space-y-2">
            <div className="flex justify-between items-center text-emerald-100">
              <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              <IndianRupee className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-3xl font-black">{formatCurrency(analytics.totalSales)}</h3>
            <span className="text-[11px] text-emerald-200 font-semibold block">Calculated from actual orders</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900">{analytics.totalOrders}</h3>
            <span className="text-[11px] text-slate-500">COD Orders: {analytics.codOrders}</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Products Sold</span>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900">{analytics.productsSold}</h3>
            <span className="text-[11px] text-slate-500">Items delivered/ordered</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Avg Order Value</span>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900">₹{analytics.avgOrderValue}</h3>
            <span className="text-[11px] text-slate-500">Per transaction average</span>
          </div>

        </div>

        {/* Secondary Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider block">Delivered Orders</span>
              <span className="text-xl font-black text-emerald-950">{analytics.deliveredOrders}</span>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center space-x-3">
            <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
            <div>
              <span className="text-[10px] text-rose-800 font-extrabold uppercase tracking-wider block">Cancelled Orders</span>
              <span className="text-xl font-black text-rose-950">{analytics.cancelledOrders}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center space-x-3 col-span-2 sm:col-span-1">
            <IndianRupee className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <span className="text-[10px] text-amber-800 font-extrabold uppercase tracking-wider block">Cash on Delivery Orders</span>
              <span className="text-xl font-black text-amber-950">{analytics.codOrders}</span>
            </div>
          </div>
        </div>

        {/* Interactive Sales Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-black text-slate-900">Revenue Trend ({timeframe.toUpperCase()})</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Live Firestore Analytics
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#15803d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#15803d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(val) => [`₹${val}`, 'Sales Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#15803d" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSalesPage;
