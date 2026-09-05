import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, AlertTriangle, ShieldCheck, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';

export const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryCharge,
    totalAmount,
    minimumOrderValue,
    meetsMinimumOrder,
    amountNeededForMinimum
  } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-sm mx-auto">
          <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500">Looks like you haven't added any fresh fruits to your cart yet.</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-2xl text-xs transition-colors shadow-md"
        >
          <span>Explore Fresh Fruits</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Shopping Cart</h1>
          <p className="text-xs text-slate-500">Review your selected fresh fruits before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* MINIMUM ORDER WARNING BANNER IF BELOW ₹200 */}
      {!meetsMinimumOrder && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start space-x-3 text-center sm:text-left">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-amber-950">Minimum order value is ₹200.</h4>
              <p className="text-xs text-amber-800 font-medium">
                Your current subtotal is <strong className="text-slate-900">₹{subtotal}</strong>. Please add <strong className="text-amber-900 font-bold">₹{amountNeededForMinimum}</strong> more worth of items to enable checkout.
              </p>
            </div>
          </div>
          <Link
            to="/shop"
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            Add More Fruits
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Product Info & Image */}
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl border border-slate-100 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                    {item.category || 'Fresh Fruit'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {formatCurrency(item.price)} / {item.unit || 'Kg'}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                {/* Quantity picker */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-white rounded text-slate-700"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-white rounded text-slate-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 block">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link to="/shop" className="inline-flex items-center text-xs font-bold text-emerald-700 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Order Summary & Checkout Trigger */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Delivery Charge</span>
              <span className="font-bold text-slate-900">
                {deliveryCharge === 0 ? <strong className="text-emerald-600">FREE</strong> : formatCurrency(deliveryCharge)}
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Payment Method</span>
              <span className="font-extrabold text-amber-700">Cash on Delivery</span>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Total Amount</span>
              <span className="text-lg text-emerald-700">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div>
            <button
              onClick={handleCheckout}
              disabled={!meetsMinimumOrder}
              className={`w-full py-4 rounded-2xl font-extrabold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all ${
                meetsMinimumOrder
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              <span>{currentUser ? 'Proceed to Checkout' : 'Login to Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!meetsMinimumOrder && (
              <p className="text-[11px] text-rose-600 font-bold text-center mt-2">
                Checkout disabled: Cart subtotal must be at least ₹200.
              </p>
            )}
            {!currentUser && meetsMinimumOrder && (
              <p className="text-[11px] text-slate-500 font-medium text-center mt-2">
                Please log in before placing your order.
              </p>
            )}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center space-x-2 text-slate-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cash on Delivery Guaranteed</span>
            </div>
            <p>Pay in cash upon inspection of fresh fruits at your doorstep.</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default CartPage;
