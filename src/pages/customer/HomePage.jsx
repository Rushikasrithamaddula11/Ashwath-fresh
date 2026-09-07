import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
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
export const HomePage = () => {
  const palakovaProduct = {
    id: 'prod-palakova-01',
    name: 'Ashwath Fresh Palakova',
    description: 'Traditional authentic homemade milk sweet made with pure high-quality fresh milk and sugar directly from Tadakanapally.',
    category: 'Palakova',
    price: 130,
    unit: '250 grams',
    weight: '250g',
    imageUrl: '/palakova.svg',
    stock: 50,
    featured: true,
    active: true
  };

  const produceShowcaseImages = [
    { name: 'Mangoes', type: 'Fruit', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=85&w=800' },
    { name: 'Tomatoes', type: 'Vegetable', img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=85&w=800' },
    { name: 'Bananas', type: 'Fruit', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=85&w=800' },
    { name: 'Carrots', type: 'Vegetable', img: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=85&w=800' },
    { name: 'Watermelon', type: 'Fruit', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=85&w=800' },
    { name: 'Broccoli', type: 'Vegetable', img: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=85&w=800' },
    { name: 'Apples', type: 'Fruit', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=85&w=800' },
    { name: 'Pineapple', type: 'Fruit', img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=85&w=800' },
    { name: 'Spinach', type: 'Vegetable', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=85&w=800' },
    { name: 'Bell Peppers', type: 'Vegetable', img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=85&w=800' },
    { name: 'Grapes', type: 'Fruit', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=85&w=800' },
    { name: 'Cucumber', type: 'Vegetable', img: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&q=85&w=800' },
    { name: 'Pomegranate', type: 'Fruit', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=85&w=800' }
  ];
  const [activeProduce, setActiveProduce] = useState(0);
  const [isSliderMoving, setIsSliderMoving] = useState(true);
  const sliderItems = [...produceShowcaseImages, ...produceShowcaseImages];

  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      setActiveProduce((current) => current + 1);
    }, 4500);

    return () => window.clearInterval(sliderTimer);
  }, [produceShowcaseImages.length]);

  const showPreviousProduce = () => {
    setIsSliderMoving(true);
    setActiveProduce((current) => current === 0 ? produceShowcaseImages.length - 1 : current - 1);
  };

  const showNextProduce = () => {
    setIsSliderMoving(true);
    setActiveProduce((current) => current + 1);
  };

  return (
    <div className="space-y-16 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_42%,#f0fdf4_100%)] pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-linear-to-br from-[#063b2b] via-emerald-900 to-[#092f24] py-14 text-white shadow-[0_24px_70px_-32px_rgba(6,95,70,0.8)] sm:py-20 lg:py-24">
        {/* Background Subtle Shapes */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-size-[16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-100 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>100% Farm Fresh Fruits & Vegetables • Cash on Delivery</span>
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
                FRESH FRUITS & VEGGIES,<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-yellow-200 to-emerald-200">
                  DELIVERED TO YOUR DOOR
                </span>
              </h1>

              <p className="max-w-2xl text-lg font-medium text-emerald-100 sm:text-xl mx-auto lg:mx-0">
                Fresh • Healthy • Quality Produce
              </p>

              <p className="text-sm text-emerald-200/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience handpicked fruits and fresh vegetables sourced for purity and flavor. From juicy Shimla apples and sweet mangoes to tomatoes, carrots, potatoes, and palak—delivered daily to your doorstep.
              </p>

              {/* CTAs */}
              <div className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row lg:justify-start">
                <Link to="/vegetables" className="w-full rounded-xl bg-amber-400 px-6 py-3.5 text-center text-sm font-black text-emerald-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300 sm:w-auto">
                  SHOP VEGETABLES
                </Link>
                <Link to="/fruits" className="w-full rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-center text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto">
                  EXPLORE FRUITS
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mx-auto grid max-w-md grid-cols-3 gap-3 border-t border-emerald-700/60 pt-6 text-center lg:mx-0 lg:text-left">
                <div className="rounded-xl bg-white/5 px-2 py-2">
                  <span className="block text-xl font-extrabold text-amber-300">₹200</span>
                  <span className="text-[11px] text-emerald-200 uppercase font-semibold">Min Order</span>
                </div>
                <div className="rounded-xl bg-white/5 px-2 py-2">
                  <span className="block text-xl font-extrabold text-amber-300">100% COD</span>
                  <span className="text-[11px] text-emerald-200 uppercase font-semibold">Pay On Delivery</span>
                </div>
                <div className="rounded-xl bg-white/5 px-2 py-2">
                  <span className="block text-xl font-extrabold text-amber-300">Fast</span>
                  <span className="text-[11px] text-emerald-200 uppercase font-semibold">Doorstep Delivery</span>
                </div>
              </div>

            </div>

            {/* Right Fresh Produce Showcase Slider */}
            <div className="lg:col-span-5">
              <div className="relative max-w-md mx-auto">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-linear-to-r from-amber-400 to-emerald-400 rounded-3xl blur-xl opacity-30 animate-pulse-subtle" />
                
                <div className="relative overflow-hidden rounded-4xl border border-white/20 bg-emerald-950/35 p-4 shadow-2xl backdrop-blur-md sm:p-5">
                  <div className="mb-4 flex items-center justify-between px-1">
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">Fresh spotlight</span>
                      <span className="mt-1 block text-sm font-bold text-white">Picked fresh for you</span>
                    </div>
                    <span className="rounded-full border border-emerald-200/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-emerald-100">Fresh picks</span>
                  </div>
                  <div className="relative aspect-[1.15] overflow-hidden rounded-3xl bg-white/10">
                    <div
                      className={`flex h-full ${isSliderMoving ? 'transition-transform duration-1000 ease-in-out' : ''}`}
                      style={{ transform: `translateX(-${activeProduce * 100}%)` }}
                      onTransitionEnd={() => {
                        if (activeProduce >= produceShowcaseImages.length) {
                          setIsSliderMoving(false);
                          setActiveProduce(0);
                        }
                      }}
                    >
                    {sliderItems.map((produce, index) => (
                      <div key={`${produce.name}-${index}`} className="relative h-full min-w-full">
                        <img src={produce.img} alt={produce.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-slate-950/90 to-transparent p-5 pt-16">
                          <div>
                            <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">{produce.type}</span>
                            <span className="mt-1 block text-2xl font-black text-white">{produce.name}</span>
                          </div>
                          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">Farm fresh</span>
                        </div>
                      </div>
                    ))}
                    </div>
                    <button type="button" onClick={showPreviousProduce} aria-label="Previous produce" className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/35 text-white backdrop-blur transition hover:bg-slate-950/70">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={showNextProduce} aria-label="Next produce" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/35 text-white backdrop-blur transition hover:bg-slate-950/70">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-center gap-1.5">
                    {produceShowcaseImages.map((produce, index) => (
                      <button key={produce.name} type="button" onClick={() => { setIsSliderMoving(true); setActiveProduce(index); }} aria-label={`Show ${produce.name}`} className={`h-1.5 rounded-full transition-all ${index === activeProduce % produceShowcaseImages.length ? 'w-7 bg-amber-300' : 'w-1.5 bg-white/35 hover:bg-white/70'}`} />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCE HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl border border-slate-800 bg-slate-950 p-5 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.8)] sm:p-8 lg:p-10">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-300">Fresh from the farm</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white tracking-tight">What are you cooking today?</h2>
            </div>
            <p className="text-sm text-slate-300 max-w-sm">Choose fresh produce for everyday meals, delivered straight to your door.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link to="/fruits" className="group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-3xl p-6 shadow-xl ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-amber-300/50">
              <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=85&w=1200" alt="Fresh fruits" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-amber-300 px-3 py-1 text-[11px] font-black text-slate-950">SWEET & JUICY</span>
                <h3 className="mt-3 text-3xl font-black text-white">Fresh Fruits</h3>
                <span className="mt-2 inline-flex items-center text-sm font-bold text-amber-100">Naturally sweet and refreshing <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </Link>

            <Link to="/vegetables" className="group relative flex min-h-72 flex-col justify-end overflow-hidden rounded-3xl p-6 shadow-xl ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-emerald-300/50">
              <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=85&w=1200" alt="Fresh vegetables" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/30 to-transparent" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-emerald-300 px-3 py-1 text-[11px] font-black text-emerald-950">FARM TO KITCHEN</span>
                <h3 className="mt-3 text-3xl font-black text-white">Fresh Vegetables</h3>
                <span className="mt-2 inline-flex items-center text-sm font-bold text-emerald-100">Fresh from farm to kitchen <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SPECIAL PRODUCT HIGHLIGHT: ASHWATH FRESH PALAKOVA */}
      <section id="palakova" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-emerald-700 via-emerald-800 to-slate-950 p-6 text-white shadow-[0_24px_60px_-30px_rgba(6,95,70,0.8)] sm:p-10">
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-amber-300/15 blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center space-x-1.5 rounded-full border border-amber-200/30 bg-amber-300/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-100">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Special Products Section</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                ASHWATH FRESH PALAKOVA
              </h2>

              <p className="max-w-xl text-sm leading-relaxed text-emerald-50">
                {palakovaProduct.description || 'Traditional authentic homemade milk sweet prepared with 100% pure fresh milk and natural sugar. Rich in heritage taste from Tadakanapally, Kurnool.'}
              </p>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-white">₹{palakovaProduct.price || 130}</span>
                <span className="text-sm font-bold text-amber-200">/ {palakovaProduct.unit || '250 grams'}</span>
              </div>

              <p className="pt-2 text-sm font-bold text-amber-100">
                A traditional taste from Tadakanapally, made to be remembered.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs rotate-2 rounded-3xl bg-white p-3 shadow-2xl transition-transform duration-300 hover:rotate-0">
                <img
                  src={palakovaProduct.imageUrl}
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

      {/* ABOUT US */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-7 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <img
            src={palakovaProduct.imageUrl}
            alt="Freshly prepared Ashwath Fresh Palakova"
            className="h-48 w-full rounded-2xl object-cover md:h-40 md:w-56"
            loading="lazy"
          />
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">About ASHWATH Fresh</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Fresh produce with a familiar, homemade touch</h2>
            <p className="text-sm leading-relaxed text-slate-600">We bring carefully selected fruits and vegetables to your doorstep, along with our signature traditional Palakova from Tadakanapally.</p>
          </div>
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
