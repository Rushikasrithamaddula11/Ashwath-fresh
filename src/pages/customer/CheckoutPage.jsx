import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/formatters';

export const CheckoutPage = () => {
  const { cartItems, subtotal, deliveryCharge, totalAmount, meetsMinimumOrder, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { placeOrder } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || currentUser?.displayName || '',
    phone: currentUser?.phone || '9346763478',
    email: currentUser?.email || 'customer@ashwathfresh.com',
    houseNo: '',
    street: '',
    area: 'Durga Nagar / Tadakanapally',
    city: 'Hyderabad / Kurnool',
    state: 'Telangana / AP',
    pincode: '500079',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Orders are only available to authenticated users. This also protects
  // visitors who manually enter the checkout URL.
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Login Required</h2>
          <p className="text-xs text-slate-600">Please log in or create an account before placing an order.</p>
        </div>
        <Link to="/login" state={{ from: '/checkout' }} className="inline-block bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md">
          Login to Continue
        </Link>
      </div>
    );
  }

  // Guard if cart subtotal is under ₹200
  if (cartItems.length === 0 || !meetsMinimumOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Minimum Order Required</h2>
          <p className="text-xs text-slate-600">
            Minimum order value is <strong>₹200</strong>. Your current subtotal is <strong>₹{subtotal}</strong>. Please add more fresh fruits to proceed.
          </p>
        </div>
        <Link to="/cart" className="inline-block bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md">
          Return to Cart
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!currentUser) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    // Double check minimum order validation in order creation logic
    if (subtotal < 200) {
      setErrorMsg('Minimum order value is ₹200.');
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.houseNo || !formData.street || !formData.pincode) {
      setErrorMsg('Please fill in all mandatory delivery address fields.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customerId: currentUser?.uid || `guest-${Date.now()}`,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        items: cartItems,
        subtotal,
        deliveryCharge,
        totalAmount,
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        deliveryAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          houseNo: formData.houseNo,
          street: formData.street,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          notes: formData.notes
        }
      };

      const createdOrder = await placeOrder(orderPayload);

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if confetti unsupported
      }

      clearCart();
      navigate(`/order-confirmation/${createdOrder.orderId}`, { state: { order: createdOrder } });
    } catch (err) {
      console.error('Order creation error:', err);
      setErrorMsg(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      <Link to="/cart" className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-emerald-700 space-x-1">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Cart</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Address Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Delivery Address & Details</h1>
            <p className="text-xs text-slate-500">Provide your home address for Cash on Delivery fruit delivery</p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9346763478"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. name@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">House / Flat Number *</label>
                <input
                  type="text"
                  name="houseNo"
                  required
                  value={formData.houseNo}
                  onChange={handleChange}
                  placeholder="e.g. Plot: 32, H.No: 7-2-32/P"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Street *</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="e.g. Road No: 5"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Area / Landmark</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Durga Nagar, Bairamalguda"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Hyderabad / Kurnool"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="500079"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Order Notes (Optional)</label>
              <textarea
                name="notes"
                rows="2"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions for delivery rider..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Payment Method Selection */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">Payment Method</label>
              
              <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">CASH ON DELIVERY (COD)</h4>
                    <p className="text-[11px] text-emerald-800 font-medium">Pay in cash when fresh fruits are delivered to your door.</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">
                  ONLY PAYMENT METHOD
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>PLACE ORDER (₹{totalAmount})</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">Order Items ({cartItems.length})</h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-slate-50">
                <div className="flex items-center space-x-3">
                  <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-[11px] text-slate-500">Qty: {item.quantity} x ₹{item.price}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charge</span>
              <span className="font-bold text-emerald-600">{deliveryCharge === 0 ? 'FREE' : formatCurrency(deliveryCharge)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-100 pt-2">
              <span>Grand Total</span>
              <span className="text-emerald-700">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1 text-xs text-amber-900 font-medium">
            <span className="font-bold block">⚡ Fast Fresh Fruit Delivery</span>
            <p className="text-[11px] leading-relaxed">
              Your order will be prepared freshly and dispatched to {formData.area || 'your address'}. Please keep cash ready.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;
