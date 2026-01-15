
import React from 'react';
import { CartItem } from '../types';
import { TRANSLATIONS } from '../constants';

interface CartPageProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  language: 'en' | 'ur';
  onCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ items, onRemove, language, onCheckout }) => {
  const t = TRANSLATIONS[language];
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
        <div className="text-orange-100 text-8xl mb-4">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {language === 'en' ? 'Your cart is empty' : 'آپ کا کارٹ خالی ہے'}
        </h2>
        <p className="text-gray-500">
          {language === 'en' ? 'Browse products and start shopping!' : 'مصنوعات دیکھیں اور خریداری شروع کریں!'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 bg-[#f85606] text-white px-8 py-3 rounded-sm font-bold shadow-md"
        >
          {language === 'en' ? 'Shop Now' : 'ابھی خریداری کریں'}
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-black mb-4 text-gray-800">{t.cart} ({items.length} {language === 'en' ? 'Items' : 'اشیاء'})</h2>
        <div className="bg-white rounded border divide-y overflow-hidden shadow-sm">
          {items.map(item => (
            <div key={item.id} className="p-4 flex gap-4 hover:bg-gray-50 transition group">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border" />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 line-clamp-1">{language === 'en' ? item.name : item.nameUrdu}</h3>
                  <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Store: {item.sellerId}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-[#f85606] font-black">
                      {language === 'en' ? `Rs. ${item.price.toLocaleString()}` : `${item.price.toLocaleString()} ${t.rs}`}
                    </span>
                    <div className="flex items-center gap-2 px-2 py-0.5 bg-gray-100 rounded text-xs font-bold text-gray-600">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded border shadow-sm sticky top-24">
          <h3 className="text-lg font-black mb-6 uppercase tracking-tight text-gray-800">Order Summary</h3>
          <div className="space-y-4 border-b pb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-gray-800 font-bold">{language === 'en' ? `Rs. ${total.toLocaleString()}` : `${total.toLocaleString()} ${t.rs}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Shipping Fee</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-6 font-black text-xl">
            <span className="text-gray-800">Total</span>
            <span className="text-[#f85606]">{language === 'en' ? `Rs. ${total.toLocaleString()}` : `${total.toLocaleString()} ${t.rs}`}</span>
          </div>

          <button 
            onClick={onCheckout}
            className="w-full bg-[#f85606] text-white py-4 rounded-sm font-black text-sm uppercase tracking-widest shadow-lg hover:bg-[#d44805] transition-all transform hover:scale-[1.02] active:scale-95"
          >
            {t.checkout}
          </button>
          
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <i className="fa-solid fa-shield-halved text-blue-500 text-sm"></i>
              Bazaar Secure Checkout
            </div>
            <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition cursor-help">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-4" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" className="h-4" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Easypaisa_logo.png" className="h-4" alt="Easypaisa" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
