import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, PhoneCall, ArrowRight, Clock, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = useData();

  const order = location.state?.order || orders.find(o => o.orderId === orderId || o.id === orderId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 pb-20">
      
      {/* Success Card Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Order Successfully Placed</span>
          <h1 className="text-3xl font-black text-slate-900">Thank You For Your Order!</h1>
          <p className="text-xs text-slate-500">Order ID: <strong className="text-slate-900 font-mono">{orderId}</strong></p>
        </div>

        <div className="inline-block bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded-full text-xs font-bold">
          Payment Status: Cash on Delivery (Pending)
        </div>
      </div>

      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Order Details Summary</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">Customer Name</span>
              <span className="font-bold text-slate-900">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">Phone Number</span>
              <span className="font-bold text-slate-900">{order.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">Order Date</span>
              <span className="font-bold text-slate-900">{formatDate(order.createdAt)}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold uppercase text-[10px]">Payment Method</span>
              <span className="font-bold text-emerald-700">Cash on Delivery</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-slate-400 block font-semibold uppercase text-[10px] mb-2">Ordered Items</span>
            <div className="space-y-2">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-50">
                  <span className="font-bold text-slate-800">{item.name} ({item.quantity} x {item.unit || 'Kg'})</span>
                  <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-3 border-t border-slate-100">
            <span>Total Payable on Delivery:</span>
            <span className="text-lg text-emerald-700">{formatCurrency(order.totalAmount)}</span>
          </div>

          {order.deliveryAddress && (
            <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delivery Address:
              </span>
              <p className="text-slate-600 leading-relaxed">
                {order.deliveryAddress.houseNo}, {order.deliveryAddress.street}, {order.deliveryAddress.area}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/my-orders"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-2xl text-xs text-center shadow-md flex items-center justify-center space-x-2"
        >
          <Clock className="w-4 h-4" />
          <span>Track My Orders</span>
        </Link>
        <Link
          to="/shop"
          className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-3.5 rounded-2xl border border-slate-200 text-xs text-center flex items-center justify-center space-x-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default OrderConfirmationPage;
