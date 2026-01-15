
import React, { useState, useMemo } from 'react';
import { UserRole, AppState, Product, User, Order, OrderStatus, PaymentMethod } from './types';
import { MOCK_PRODUCTS, MOCK_USERS, TRANSLATIONS, CATEGORIES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import SellerDashboard from './components/SellerDashboard';
import AdminPanel from './components/AdminPanel';
import CategorySidebar from './components/CategorySidebar';
import AuthModal from './components/AuthModal';
import TrackOrderPage from './components/TrackOrderPage';
import CategoryGrid from './components/CategoryGrid';
import MyOrdersPage from './components/MyOrdersPage';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    user: MOCK_USERS[0], // Starting with a logged-in user for demonstration
    language: 'en',
    cart: []
  });
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'BZ-772104',
      customerId: 'u1',
      date: '12 March, 2024',
      total: 2800,
      status: OrderStatus.DELIVERED,
      paymentMethod: PaymentMethod.COD,
      items: [{ ...MOCK_PRODUCTS[4], quantity: 1 }]
    },
    {
      id: 'BZ-892311',
      customerId: 'u1',
      date: '20 March, 2024',
      total: 7000,
      status: OrderStatus.SHIPPED,
      paymentMethod: PaymentMethod.EASYPAISA,
      items: [
        { ...MOCK_PRODUCTS[2], quantity: 1 },
        { ...MOCK_PRODUCTS[1], quantity: 1 }
      ]
    }
  ]);

  const [currentView, setCurrentView] = useState<'home' | 'cart' | 'checkout' | 'dashboard' | 'admin' | 'track-order' | 'success' | 'my-orders' | 'order-detail'>('home');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const t = TRANSLATIONS[appState.language];
  const isRTL = appState.language === 'ur';

  const toggleLanguage = () => {
    setAppState(prev => ({ ...prev, language: prev.language === 'en' ? 'ur' : 'en' }));
  };

  const handleLogin = (user: User) => {
    setAppState(prev => ({ ...prev, user }));
    if (user.role === UserRole.SELLER) {
      setCurrentView('dashboard');
    } else if (user.role === UserRole.ADMIN) {
      setCurrentView('admin');
    } else {
      setCurrentView('home');
    }
  };

  const handleLogout = () => {
    setAppState(prev => ({ ...prev, user: null }));
    setCurrentView('home');
  };

  const addToCart = (product: Product) => {
    setAppState(prev => {
      const existing = prev.cart.find(item => item.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        };
      }
      return { ...prev, cart: [...prev.cart, { ...product, quantity: 1 }] };
    });
  };

  const removeFromCart = (id: string) => {
    setAppState(prev => ({ ...prev, cart: prev.cart.filter(item => item.id !== id) }));
  };

  const handleOrderSuccess = (orderId: string) => {
    const newOrder: Order = {
      id: orderId,
      customerId: appState.user?.id || 'guest',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      total: appState.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 250,
      status: OrderStatus.PENDING,
      paymentMethod: PaymentMethod.COD, // Simplified for mock
      items: [...appState.cart]
    };
    setOrders(prev => [newOrder, ...prev]);
    setLastOrderId(orderId);
    setAppState(prev => ({ ...prev, cart: [] }));
    setCurrentView('success');
  };

  const handleViewOrderDetail = (id: string) => {
    setSelectedOrderId(id);
    setCurrentView('order-detail');
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.nameUrdu.includes(searchQuery);
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`min-h-screen flex flex-col bg-[#eff0f5] ${isRTL ? 'font-urdu' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header 
        user={appState.user} 
        cartCount={appState.cart.reduce((acc, item) => acc + item.quantity, 0)}
        language={appState.language}
        onToggleLang={toggleLanguage}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onCartClick={() => setCurrentView('cart')}
        onTrackClick={() => setCurrentView('track-order')}
        onMyOrdersClick={() => setCurrentView('my-orders')}
        onHomeClick={() => {
          setCurrentView('home');
          setSelectedCategory(null);
        }}
        onSearch={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-4 py-4 md:py-6">
        {currentView === 'home' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <CategorySidebar 
                language={appState.language} 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </aside>

            <div className="flex-grow space-y-6">
              <div className="bg-[#f85606] text-white rounded-lg shadow-xl overflow-hidden relative min-h-[250px] md:min-h-[350px] flex items-center group cursor-pointer transition-transform duration-500">
                <div className="p-6 md:p-16 z-20 w-full md:w-1/2 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:bg-none">
                  <h2 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-tighter leading-none">
                    {appState.language === 'en' ? 'Bazaar 3.3 Sale' : 'بازار 3.3 سیل'}
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 font-bold opacity-95 text-orange-400">
                    {appState.language === 'en' ? 'Smartphones & More' : 'اسمارٹ فونز اور بہت کچھ'}
                  </p>
                  <p className="text-sm md:text-base mb-8 opacity-80 max-w-xs font-medium">
                    {appState.language === 'en' ? 'Upgrade your lifestyle with the latest mobile tech up to 80% OFF' : 'تازہ ترین موبائل ٹیک پر 80 فیصد تک رعایت کے ساتھ اپنا طرز زندگی بہتر بنائیں'}
                  </p>
                  <button className="bg-white text-[#f85606] px-10 py-4 rounded font-black hover:bg-orange-50 transition-all shadow-2xl transform hover:scale-105 active:scale-95 uppercase tracking-wider text-sm">
                    {appState.language === 'en' ? 'SHOP NOW' : 'ابھی خریداری کریں'}
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-full h-full md:w-2/3 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f85606]/40 to-transparent mix-blend-multiply z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=1000" 
                    alt="Mobile Tech Sale" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 object-center" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-l md:from-black/10"></div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-[#f85606] font-bold text-lg flex items-center gap-2">
                    <i className="fa-solid fa-bolt"></i> {t.flashSale}
                  </h3>
                </div>
                <ProductGrid 
                  products={filteredProducts.slice(0, 5)} 
                  onAddToCart={addToCart} 
                  language={appState.language} 
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                  <h3 className="text-gray-800 font-bold text-lg">
                    {t.categories}
                  </h3>
                </div>
                <CategoryGrid 
                  language={appState.language} 
                  onSelect={(cat) => {
                    setSelectedCategory(cat);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                />
              </div>

              <div>
                <h3 className="text-gray-800 font-bold text-xl mb-4 px-1">{t.justForYou}</h3>
                <ProductGrid 
                  products={filteredProducts} 
                  onAddToCart={addToCart} 
                  language={appState.language} 
                />
              </div>
            </div>
          </div>
        )}

        {currentView === 'cart' && (
          <CartPage 
            items={appState.cart} 
            onRemove={removeFromCart} 
            language={appState.language} 
            onCheckout={() => {
              if (!appState.user) {
                setIsAuthModalOpen(true);
                return;
              }
              setCurrentView('checkout');
            }}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage 
            items={appState.cart} 
            language={appState.language} 
            onSuccess={handleOrderSuccess}
            onBack={() => setCurrentView('cart')}
          />
        )}

        {currentView === 'success' && (
          <div className="max-w-xl mx-auto py-16 text-center bg-white rounded-2xl shadow-xl border">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-check text-4xl"></i>
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-4">{t.orderSuccess}</h2>
            <p className="text-gray-500 mb-8">{t.thankYou}</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-8 mx-12 border border-dashed border-gray-300">
              <p className="text-xs text-gray-400 font-bold uppercase mb-1">Order Tracking ID</p>
              <p className="text-xl font-black text-[#f85606]">{lastOrderId}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-8">
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-gray-100 text-gray-800 px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => {
                   setSelectedOrderId(lastOrderId);
                   setCurrentView('order-detail');
                }}
                className="bg-[#f85606] text-white px-8 py-3 rounded font-bold hover:bg-[#d44805] shadow-lg transition"
              >
                Track My Order
              </button>
            </div>
          </div>
        )}

        {currentView === 'track-order' && (
          <TrackOrderPage language={appState.language} />
        )}

        {currentView === 'my-orders' && (
          <MyOrdersPage 
            orders={orders} 
            language={appState.language} 
            onViewDetail={handleViewOrderDetail} 
          />
        )}

        {currentView === 'order-detail' && selectedOrderId && (
          <TrackOrderPage 
            language={appState.language} 
            initialOrderId={selectedOrderId} 
            onBack={() => setCurrentView('my-orders')}
          />
        )}

        {currentView === 'dashboard' && appState.user?.role === UserRole.SELLER && (
          <SellerDashboard user={appState.user} language={appState.language} />
        )}

        {currentView === 'admin' && appState.user?.role === UserRole.ADMIN && (
          <AdminPanel language={appState.language} />
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
        language={appState.language}
      />
      <Footer language={appState.language} />
    </div>
  );
};

export default App;
