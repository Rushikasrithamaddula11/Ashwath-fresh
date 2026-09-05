import React from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  AlertTriangle,
  Users,
  Layers,
  ArrowRight,
  TrendingUp,
  PackageCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminHeader from '../../components/admin/AdminHeader';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const AdminDashboardPage = () => {
  const { products, orders, calculateSalesAnalytics } = useData();

  const todayAnalytics = calculateSalesAnalytics('today');

  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending');
  const confirmedOrders = orders.filter(o => o.orderStatus === 'Confirmed');
  const preparingOrders = orders.filter(o => o.orderStatus === 'Preparing');
  const outForDeliveryOrders = orders.filter(o => o.orderStatus === 'Out for Delivery');
  const deliveredOrders = orders.filter(o => o.orderStatus === 'Delivered');
  const cancelledOrders = orders.filter(o => o.orderStatus === 'Cancelled');

  const lowStockProducts = products.filter(p => p.stock < 10);
  
  // Calculate unique customer count
  const customerPhones = new Set(orders.map(o => o.phone).filter(Boolean));
  const totalCustomersCount = customerPhones.size || orders.length;

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Admin Overview Dashboard"
        subtitle="Real-time business performance, orders and product metrics"
      />

      <div className="px-6 space-y-6 pb-16">
        
        {/* Main Key Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 text-white p-5 rounded-3xl shadow-md space-y-2">
            <div className="flex justify-between items-center text-emerald-100">
              <span className="text-xs font-bold uppercase tracking-wider">Today's Sales</span>
              <IndianRupee className="w-5 h-5 text-amber-300" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">{formatCurrency(todayAnalytics.totalSales)}</h3>
            <p className="text-[11px] text-emerald-100 font-medium">{todayAnalytics.totalOrders} Orders Placed Today</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Today's Orders</span>
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{todayAnalytics.totalOrders}</h3>
            <p className="text-[11px] text-slate-500">Avg Value: ₹{todayAnalytics.avgOrderValue}</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-amber-200 bg-amber-50/40 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-amber-700">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Orders</span>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-900">{pendingOrders.length}</h3>
            <p className="text-[11px] text-amber-800 font-medium">Action Needed</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
              <Layers className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{products.length}</h3>
            <p className="text-[11px] text-slate-500">{products.filter(p => p.active).length} Active Products</p>
          </div>

        </div>

        {/* Detailed Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-400 block font-semibold">Confirmed</span>
            <span className="text-lg font-black text-blue-700">{confirmedOrders.length}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-400 block font-semibold">Preparing</span>
            <span className="text-lg font-black text-purple-700">{preparingOrders.length}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-400 block font-semibold">Out For Delivery</span>
            <span className="text-lg font-black text-indigo-700">{outForDeliveryOrders.length}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-400 block font-semibold">Delivered</span>
            <span className="text-lg font-black text-emerald-700">{deliveredOrders.length}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-400 block font-semibold">Cancelled</span>
            <span className="text-lg font-black text-rose-700">{cancelledOrders.length}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-400 block font-semibold">Low Stock</span>
            <span className="text-lg font-black text-amber-600">{lowStockProducts.length}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="text-slate-400 block font-semibold">Customers</span>
            <span className="text-lg font-black text-slate-900">{totalCustomersCount}</span>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-900">Recent Customer Orders</h3>
            <Link to="/admin/orders" className="text-xs font-bold text-emerald-700 hover:underline flex items-center">
              View All Orders ({orders.length}) <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map(o => (
                  <tr key={o.orderId || o.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{o.orderId || o.id}</td>
                    <td className="p-3 font-semibold text-slate-800">{o.customerName}</td>
                    <td className="p-3 text-slate-600">{o.phone}</td>
                    <td className="p-3 text-slate-500">{formatDate(o.createdAt)}</td>
                    <td className="p-3 font-bold text-slate-900">{formatCurrency(o.totalAmount)}</td>
                    <td className="p-3"><span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">COD</span></td>
                    <td className="p-3">
                      <span className="font-bold px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-800">
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
