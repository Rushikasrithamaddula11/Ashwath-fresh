import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DataProvider, useData } from './context/DataContext';

// Customer Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Admin Layout Components
import AdminSidebar from './components/admin/AdminSidebar';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import ShopPage from './pages/customer/ShopPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderConfirmationPage from './pages/customer/OrderConfirmationPage';
import MyOrdersPage from './pages/customer/MyOrdersPage';
import ProfilePage from './pages/customer/ProfilePage';
import LoginPage from './pages/customer/LoginPage';
import SignupPage from './pages/customer/SignupPage';
import AboutPage from './pages/customer/AboutPage';
import ContactPage from './pages/customer/ContactPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminSalesPage from './pages/admin/AdminSalesPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminBrandPage from './pages/admin/AdminBrandPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Customer Layout Wrapper
const CustomerLayout = () => {
  const { settings } = useData();
  const phoneDigits = (settings.phone || '9346763478').replace(/\D/g, '');
  const whatsappNumber = phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi ASHWATH Fresh, I would like to place an order.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with ASHWATH Fresh on WhatsApp"
        title="Order on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/25 transition-transform hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <MessageCircle className="h-5 w-5 fill-white/10" />
        <span className="hidden sm:inline">Order on WhatsApp</span>
      </a>
    </div>
  );
};

// Admin Layout Wrapper
const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

// Protected Admin Route Guard
const ProtectedAdminRoute = () => {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xs font-bold">
        Verifying Admin Authentication...
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout />;
};

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <Router>
            <Routes>
              
              {/* Customer Routes */}
              <Route element={<CustomerLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/fruits" element={<ShopPage category="Fruits" />} />
                <Route path="/vegetables" element={<ShopPage category="Vegetables" />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>

              {/* Admin login uses the same account login page as customers. */}
              <Route path="/admin/login" element={<Navigate to="/login" replace />} />

              {/* Protected Admin Dashboard Routes */}
              <Route element={<ProtectedAdminRoute />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/categories" element={<AdminCategoriesPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/sales" element={<AdminSalesPage />} />
                <Route path="/admin/customers" element={<AdminCustomersPage />} />
                <Route path="/admin/brand" element={<AdminBrandPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Fallback redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </Router>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
