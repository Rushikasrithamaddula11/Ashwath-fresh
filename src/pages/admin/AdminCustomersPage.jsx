import React, { useState } from 'react';
import { Search, Users, Phone, Mail, ShoppingBag } from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminHeader from '../../components/admin/AdminHeader';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const AdminCustomersPage = () => {
  const { orders } = useData();
  const [search, setSearch] = useState('');

  // Extract unique customer metrics from real orders
  const customerMap = {};
  orders.forEach(o => {
    const key = o.phone || o.email || o.customerName;
    if (!customerMap[key]) {
      customerMap[key] = {
        name: o.customerName || 'Customer',
        phone: o.phone || 'N/A',
        email: o.email || 'N/A',
        totalOrders: 0,
        totalSpent: 0,
        firstDate: o.createdAt,
        lastDate: o.createdAt
      };
    }
    customerMap[key].totalOrders += 1;
    customerMap[key].totalSpent += Number(o.totalAmount || 0);
  });

  const customersList = Object.values(customerMap).filter(c => {
    return !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Customer Directory"
        subtitle="Manage customer profiles, order frequencies and total spending history"
      />

      <div className="px-6 space-y-6 pb-16">
        
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search customer by name, phone or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>

          <span className="text-xs font-bold text-slate-600">Total Registered/Unique Customers: {customersList.length}</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Mobile Phone</th>
                  <th className="p-3">Email Address</th>
                  <th className="p-3">Total Orders</th>
                  <th className="p-3">Total Amount Spent</th>
                  <th className="p-3">First Order Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customersList.map((cust, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{cust.name}</td>
                    <td className="p-3 font-semibold text-slate-700">{cust.phone}</td>
                    <td className="p-3 text-slate-500">{cust.email}</td>
                    <td className="p-3">
                      <span className="bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {cust.totalOrders} orders
                      </span>
                    </td>
                    <td className="p-3 font-extrabold text-slate-900">{formatCurrency(cust.totalSpent)}</td>
                    <td className="p-3 text-slate-500">{formatDate(cust.firstDate)}</td>
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

export default AdminCustomersPage;
