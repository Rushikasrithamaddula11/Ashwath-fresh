import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, PhoneCall, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { getCustomerOrdersService } from '../../firebase/storeService';
import { formatCurrency, formatDate, getOrderStatusColor } from '../../utils/formatters';

export const MyOrdersPage = () => {
  const { currentUser } = useAuth();
  const { orders: globalOrders } = useData();
  const [customerOrders, setCustomerOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        if (currentUser) {
          const userOrders = await getCustomerOrdersService(currentUser.uid, currentUser.phone, currentUser.email);
          setCustomerOrders(userOrders);
        } else {
          // If guest user view recent orders in local memory
          setCustomerOrders(globalOrders.slice(0, 5));
        }
      } catch (e) {
        console.error('Error fetching customer orders:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, globalOrders]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">My Orders</h1>
          <p className="text-xs text-slate-500">Track and view your past fruit delivery orders</p>
        </div>
        <Link to="/shop" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors">
          Order Fresh Fruits
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-500">Loading your orders...</div>
      ) : customerOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-md mx-auto space-y-4">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500">You haven't placed any fruit orders yet. Start adding fresh fruits to your cart!</p>
          <Link to="/shop" className="inline-block bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl">
            Browse Fruit Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {customerOrders.map((order) => (
            <div
              key={order.orderId || order.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Order ID</span>
                  <span className="text-sm font-black text-slate-900 font-mono">{order.orderId || order.id}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">{formatDate(order.createdAt)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getOrderStatusColor(order.orderStatus)}`}>
                    Status: {order.orderStatus || 'Pending'}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {(order.items || []).map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs py-1">
                    <span className="font-bold text-slate-800">{item.name} ({item.quantity} x {item.unit || 'Kg'})</span>
                    <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs text-slate-500">
                  <span>Payment: <strong className="text-amber-800">Cash on Delivery</strong> ({order.paymentStatus || 'Pending'})</span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Total Amount</span>
                  <span className="text-lg font-black text-emerald-700">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyOrdersPage;
