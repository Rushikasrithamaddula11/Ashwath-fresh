import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  CheckCircle,
  PhoneCall,
  Apple,
  Sun,
  Plane,
  Citrus,
  Palmtree,
  PackageCheck,
  CupSoda
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import ProductCard from '../../components/product/ProductCard';

export const HomePage = () => {
  const { products } = useData();

  const activeProducts = products.filter(product => product.active);
  const fruits = activeProducts.filter(product => product.category?.toLowerCase() === 'fruits');
  const vegetables = activeProducts.filter(product => product.category?.toLowerCase() === 'vegetables');
  const palakovaProducts = activeProducts.filter(product =>
    product.category?.toLowerCase() === 'palakova' || product.name?.toLowerCase().includes('palakova')
  );

  // Palakova special item
  const palakovaProduct = products.find(p => p.category === 'Special Products' || p.name.includes('Palakova')) || {
    id: 'prod-palakova-01',
    name: 'Ashwath Fresh Palakova',
    description: 'Traditional authentic homemade milk sweet made with pure high-quality fresh milk and sugar directly from Tadakanapally.',
    category: 'Palakova',
    price: 130,
    unit: '250 grams',
    weight: '250g',
    imageUrl: 'https://images.unsplash.com/photo-1599785209707-a456fc1337cc?auto=format&fit=crop&q=80&w=600',
    stock: 50,
    featured: true,
    active: true
  };

  const fruitShowcaseImages = [
    { name: 'Apples', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300' },
    { name: 'Bananas', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=300' },
    { name: 'Mangoes', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=300' },
    { name: 'Oranges', img: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=300' },
    { name: 'Grapes', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=300' },
    { name: 'Watermelon', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=300' }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 text-white overflow-hidden py-16 lg:py-24 rounded-b-3xl sm:rounded-b-[2.5rem] shadow-xl">
        {/* Background Subtle Shapes */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-emerald-700/80 backdrop-blur-md text-emerald-100 px-4 py-1.5 rounded-full text-xs font-semibold border border-emerald-500/30">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>100% Farm Fresh Fruits & Vegetables • Cash on Delivery</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                FRESH FRUITS & VEGGIES,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-200">
                  DELIVERED TO YOUR DOOR
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-emerald-100 max-w-2xl mx-auto lg:mx-0">
                Fresh • Healthy • Quality Produce
              </p>

              <p className="text-sm text-emerald-200/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience handpicked fruits and fresh vegetables sourced for purity and flavor. From juicy Shimla apples and sweet mangoes to tomatoes, carrots, potatoes, and palak—delivered daily to your doorstep.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 hover:scale-105 transition-all text-center text-sm flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-md transition-all text-center text-sm"
                >
                  VIEW FRUITS
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-700/60 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <span className="text-xl font-extrabold text-amber-300 block">₹200</span>
                  <span className="text-[11px] text-emerald-200 uppercase font-semibold">Min Order</span>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-amber-300 block">100% COD</span>
                  <span className="text-[11px] text-emerald-200 uppercase font-semibold">Pay On Delivery</span>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-amber-300 block">Fast</span>
                  <span className="text-[11px] text-emerald-200 uppercase font-semibold">Doorstep Delivery</span>
                </div>
              </div>

            </div>

            {/* Right Fresh Fruit Showcase Grid */}
            <div className="lg:col-span-5">
              <div className="relative max-w-md mx-auto">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-3xl blur-xl opacity-30 animate-pulse-subtle" />
                
                <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {fruitShowcaseImages.map((fruit, idx) => (
                    <div key={idx} className="group bg-white/90 rounded-2xl p-2 text-center overflow-hidden shadow-md hover:scale-105 transition-all">
                      <img
                        src={fruit.img}
                        alt={fruit.name}
                        className="w-full h-20 object-cover rounded-xl mb-1.5"
                      />
                      <span className="text-xs font-bold text-slate-800 block truncate">{fruit.name}</span>
                    </div>
                  ))}
                </div>

                {/* Floating Fresh Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-2 animate-float">
                  <span className="text-2xl">🍎</span>
                  <div>
                    <span className="text-xs font-extrabold block text-emerald-700">100% Natural</span>
                    <span className="text-[10px] text-slate-500 font-medium">Daily Harvested</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MINIMUM ORDER NOTICE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
              ₹
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-amber-950">Minimum Order Value: ₹200</h4>
              <p className="text-xs text-amber-800">Add fresh fruits, vegetables, or special Palakova to reach ₹200 to enable instant Cash on Delivery checkout!</p>
            </div>
          </div>
          <Link
            to="/shop"
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      {/* SHOP BY NEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-900 p-5 sm:p-8 lg:p-10 overflow-hidden relative">
          <div className="absolute -top-28 right-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-[0.18em]">Fresh from the farm</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white tracking-tight">What are you cooking today?</h2>
            </div>
            <p className="text-sm text-slate-300 max-w-sm">Choose fresh produce for everyday meals, delivered straight to your door.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link to="/fruits" className="group min-h-64 rounded-3xl overflow-hidden relative p-6 flex flex-col justify-end shadow-xl">
              <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=85&w=1200" alt="Fresh fruits" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="relative">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-bold text-white">SWEET & JUICY</span>
                <h3 className="mt-3 text-3xl font-black text-white">Fresh Fruits</h3>
                <span className="mt-2 inline-flex items-center text-sm font-bold text-emerald-200">Shop fruits <ArrowRight className="w-4 h-4 ml-1" /></span>
              </div>
            </Link>

            <Link to="/vegetables" className="group min-h-64 rounded-3xl overflow-hidden relative p-6 flex flex-col justify-end shadow-xl">
              <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=85&w=1200" alt="Fresh vegetables" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
              <div className="relative">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-bold text-white">FARM TO KITCHEN</span>
                <h3 className="mt-3 text-3xl font-black text-white">Fresh Vegetables</h3>
                <span className="mt-2 inline-flex items-center text-sm font-bold text-emerald-200">Shop vegetables <ArrowRight className="w-4 h-4 ml-1" /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SPECIAL PRODUCT HIGHLIGHT: ASHWATH FRESH PALAKOVA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-xl">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center space-x-1.5 bg-amber-900/40 text-amber-100 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border border-amber-300/30">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Special Products Section</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                ASHWATH FRESH PALAKOVA
              </h2>

              <p className="text-amber-100 text-sm leading-relaxed max-w-xl">
                {palakovaProduct.description || 'Traditional authentic homemade milk sweet prepared with 100% pure fresh milk and natural sugar. Rich in heritage taste from Tadakanapally, Kurnool.'}
              </p>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-white">₹{palakovaProduct.price || 130}</span>
                <span className="text-sm font-bold text-amber-200">/ {palakovaProduct.unit || '250 grams'}</span>
              </div>

              <div className="pt-2">
                <ProductCard product={palakovaProduct} />
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-xs w-full bg-white p-3 rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src={palakovaProduct.imageUrl || 'https://images.unsplash.com/photo-1599785209707-a456fc1337cc?auto=format&fit=crop&q=80&w=600'}
                  alt="Ashwath Fresh Palakova"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <div className="p-3 text-center">
                  <span className="text-xs font-bold text-slate-900 block">Authentic Tadakanapally Palakova</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Available for Home Delivery</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPLETE FRESH CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Shop the full collection</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Everyday freshness, all in one place</h2>
          <p className="text-sm text-slate-500">Browse our complete range of fruits, vegetables, and traditional Palakova.</p>
        </div>

        {[
          { title: 'Fresh Fruits', products: fruits, path: '/fruits', accent: 'text-rose-600' },
          { title: 'Fresh Vegetables', products: vegetables, path: '/vegetables', accent: 'text-emerald-600' },
          { title: 'Ashwath Fresh Palakova', products: palakovaProducts, path: '/shop', accent: 'text-amber-600' }
        ].map((section) => (
          section.products.length > 0 && (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className={`text-xl sm:text-2xl font-black ${section.accent}`}>{section.title}</h3>
                <Link to={section.path} className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-700">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          )
        ))}
      </section>

      {/* ABOUT US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-7 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">About ASHWATH Fresh</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Fresh produce with a familiar, homemade touch</h2>
            <p className="text-sm leading-relaxed text-slate-600">We bring carefully selected fruits and vegetables to your doorstep, along with our signature traditional Palakova from Tadakanapally.</p>
          </div>
          <Link to="/about" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white hover:bg-emerald-800">
            Meet ASHWATH Fresh <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US BENEFITS */}
      <section className="bg-slate-100/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Store Guarantees</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Why Choose ASHWATH Fresh?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">100% Farm Fresh Quality</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every fruit is inspected for natural sweetness, firmness, and ripeness before packing to ensure superior quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Cash on Delivery Only</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero online payment risks. Verify your fruit box upon arrival and pay directly in cash.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Reliable Home Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fast doorstep fruit delivery in Tadakanapally, Kurnool and Bairamalguda, Hyderabad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black">Need Bulk Fruit Orders or Assistance?</h3>
            <p className="text-xs sm:text-sm text-slate-400">Call our direct helpline for custom fruit combos, party orders, or Palakova orders.</p>
          </div>
          <a
            href="tel:9346763478"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg flex items-center space-x-2 text-sm shrink-0 transition-transform hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call 9346763478</span>
          </a>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
