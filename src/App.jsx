import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { DataProvider, useData } from './context/DataContext';
import { CartProvider } from './context/CartContext';

// Customer Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import ShopPage from './pages/customer/ShopPage';
import AboutPage from './pages/customer/AboutPage';
import ContactPage from './pages/customer/ContactPage';

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
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello ASHWATH Fresh')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with ASHWATH Fresh on WhatsApp"
        title="WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25 transition-transform hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <MessageCircle className="h-7 w-7 fill-white/10" />
      </a>
    </div>
  );
};

export function App() {
  return (
    <DataProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/fruits" element={<ShopPage category="Fruits" />} />
              <Route path="/vegetables" element={<ShopPage category="Vegetables" />} />
              <Route path="/palakova" element={<ShopPage category="Palakova" />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </DataProvider>
  );
}

export default App;
