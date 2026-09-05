import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle2, Clock, Phone, MapPin, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminHeader from '../../components/admin/AdminHeader';
import { formatCurrency, formatDate, getOrderStatusColor } from '../../utils/formatters';

export const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ORDER_STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(o => {
    const matchesSearch = !search ||
      (o.orderId && o.orderId.toLowerCase().includes(search.toLowerCase())) ||
      (o.customerName && o.customerName.toLowerCase().includes(search.toLowerCase())) ||
      (o.phone && o.phone.includes(search));

    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId, newStatus, currentPaymentStatus) => {
    // If order status changes to Delivered, automatically switch payment status to Paid for COD!
    const newPaymentStatus = newStatus === 'Delivered' ? 'Paid' : currentPaymentStatus || 'Pending';
    await updateOrderStatus(orderId, newStatus, newPaymentStatus);
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder(prev => ({ ...prev, orderStatus: newStatus, paymentStatus: newPaymentStatus }));
    }
  };

  const handlePaymentStatusChange = async (orderId, currentOrderStatus, newPaymentStatus) => {
    await updateOrderStatus(orderId, currentOrderStatus, newPaymentStatus);
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder(prev => ({ ...prev, paymentStatus: newPaymentStatus }));
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Order Management"
        subtitle="Manage customer fruit orders, update delivery status and track COD payments"
      />

      <div className="px-6 space-y-6 pb-16">
        
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                statusFilter === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              All ({orders.length})
            </button>
            {ORDER_STATUSES.map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                  statusFilter === st ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {st} ({orders.filter(o => o.orderStatus === st).length})
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Items Count</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment (COD)</th>
                  <th className="p-3">Order Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map(order => (
                  <tr key={order.orderId || order.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{order.orderId || order.id}</td>
                    <td className="p-3 font-bold text-slate-800">{order.customerName}</td>
                    <td className="p-3 text-slate-600">{order.phone}</td>
                    <td className="p-3 text-slate-500">{formatDate(order.createdAt)}</td>
                    <td className="p-3 text-slate-700 font-medium">{(order.items || []).length} items</td>
                    <td className="p-3 font-extrabold text-emerald-700">{formatCurrency(order.totalAmount)}</td>
                    
                    <td className="p-3">
                      <select
                        value={order.paymentStatus || 'Pending'}
                        onChange={(e) => handlePaymentStatusChange(order.orderId || order.id, order.orderStatus, e.target.value)}
                        className={`text-[11px] font-bold rounded-lg px-2 py-1 border ${
                          order.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Pending">Pending (COD)</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <select
                        value={order.orderStatus || 'Pending'}
                        onChange={(e) => handleStatusChange(order.orderId || order.id, e.target.value, order.paymentStatus)}
                        className={`text-[11px] font-extrabold rounded-lg px-2.5 py-1 border ${getOrderStatusColor(order.orderStatus)}`}
                      >
                        {ORDER_STATUSES.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Order #{selectedOrder.orderId || selectedOrder.id}</h3>
                <span className="text-xs text-slate-500">{formatDate(selectedOrder.createdAt)}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                <span className="font-bold text-slate-900 block">Customer Information</span>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                <p><strong>Email:</strong> {selectedOrder.email || 'N/A'}</p>
              </div>

              {selectedOrder.deliveryAddress && (
                <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                  <span className="font-bold text-slate-900 block flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delivery Address
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedOrder.deliveryAddress.houseNo}, {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.area}, {selectedOrder.deliveryAddress.city} - {selectedOrder.deliveryAddress.pincode}
                  </p>
                  {selectedOrder.deliveryAddress.notes && (
                    <p className="text-amber-800 italic pt-1">Notes: {selectedOrder.deliveryAddress.notes}</p>
                  )}
                </div>
              )}

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-900 block uppercase text-[10px]">Order Items</span>
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-slate-50">
                    <div>
                      <span className="font-bold text-slate-900 block">{item.name}</span>
                      <span className="text-[11px] text-slate-500">{item.quantity} x {formatCurrency(item.price)} / {item.unit || 'Kg'}</span>
                    </div>
                    <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Amount (COD):</span>
                <span className="text-emerald-700 text-lg">{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrdersPage;
