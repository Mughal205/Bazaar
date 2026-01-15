
import React, { useState } from 'react';
import { CartItem, PaymentMethod } from '../types';
import { TRANSLATIONS, PAKISTAN_CITIES } from '../constants';

interface CheckoutPageProps {
  items: CartItem[];
  language: 'en' | 'ur';
  onSuccess: (orderId: string) => void;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ items, language, onSuccess, onBack }) => {
  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 250; // Standard shipping
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Karachi'
  });
  
  const [paymentAccount, setPaymentAccount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethod.COD);
  const [isPlacing, setIsPlacing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacing(true);
    // Simulate API call
    setTimeout(() => {
      const mockId = `BZ-${Math.floor(100000 + Math.random() * 900000)}`;
      onSuccess(mockId);
      setIsPlacing(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-8 cursor-pointer group text-gray-500 hover:text-gray-800 transition" onClick={onBack}>
        <i className={`fa-solid ${isUrdu ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
        <span className="font-bold text-sm uppercase">{isUrdu ? 'واپس کارٹ میں' : 'Back to Cart'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-truck text-[#f85606]"></i>
              {t.shippingDetails}
            </h3>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">{t.fullName}</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Ahmed Ali"
                    className="w-full border rounded p-3 focus:ring-1 focus:ring-[#f85606] outline-none bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">{t.phoneNumber}</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="03XX-XXXXXXX"
                    className="w-full border rounded p-3 focus:ring-1 focus:ring-[#f85606] outline-none bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-1">{t.address}</label>
                <textarea 
                  required 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="House #, Street #, Area Name"
                  className="w-full border rounded p-3 focus:ring-1 focus:ring-[#f85606] outline-none h-24 resize-none bg-gray-50"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-1">{t.city}</label>
                <select 
                  className="w-full border rounded p-3 focus:ring-1 focus:ring-[#f85606] outline-none bg-gray-50"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  {PAKISTAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </form>
          </section>

          <section className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-credit-card text-[#f85606]"></i>
              {isUrdu ? 'ادائیگی کا طریقہ' : 'Payment Method'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: PaymentMethod.COD, label: 'Cash on Delivery', icon: 'fa-truck-ramp-box', color: 'bg-orange-500' },
                { id: PaymentMethod.EASYPAISA, label: 'Easypaisa', icon: 'fa-mobile-screen', color: 'bg-[#40ae49]' },
                { id: PaymentMethod.JAZZCASH, label: 'JazzCash', icon: 'fa-wallet', color: 'bg-[#ed1c24]' },
                { id: PaymentMethod.CARD, label: 'Credit/Debit Card', icon: 'fa-credit-card', color: 'bg-blue-600' }
              ].map(method => (
                <div 
                  key={method.id}
                  onClick={() => {
                    setSelectedPayment(method.id as PaymentMethod);
                    setPaymentAccount(''); // Reset account when changing method
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                    selectedPayment === method.id 
                    ? 'border-[#f85606] bg-orange-50' 
                    : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 ${method.color} text-white rounded-full flex items-center justify-center text-lg shadow-sm`}>
                    <i className={`fa-solid ${method.icon}`}></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{method.label}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">SECURE PAYMENT</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Conditional Payment Details */}
            {(selectedPayment === PaymentMethod.EASYPAISA || selectedPayment === PaymentMethod.JAZZCASH) && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-black text-gray-500 uppercase mb-2">
                  {selectedPayment} {isUrdu ? 'اکاؤنٹ نمبر' : 'Account Mobile Number'}
                </label>
                <div className="relative">
                   <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                   <input 
                    type="tel" 
                    required 
                    value={paymentAccount}
                    onChange={(e) => setPaymentAccount(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="w-full border rounded p-3 pl-10 focus:ring-1 focus:ring-[#f85606] outline-none bg-white"
                  />
                </div>
                <div className="mt-3 flex gap-2 items-start">
                  <i className="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
                  <p className="text-[11px] text-gray-500 leading-tight italic">
                    {isUrdu 
                      ? `اپنا ${selectedPayment} اکاؤنٹ نمبر درج کریں۔ آپ کو اپنے فون پر ادائیگی کی تصدیق کا پیغام ملے گا۔`
                      : `Please ensure your ${selectedPayment} app is installed and active. You will receive a push notification to confirm the payment via your PIN.`}
                  </p>
                </div>
              </div>
            )}

            {selectedPayment === PaymentMethod.CARD && (
              <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-1">{isUrdu ? 'کارڈ نمبر' : 'Card Number'}</label>
                  <div className="relative">
                    <i className="fa-solid fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input 
                      type="text" 
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full border rounded p-3 pl-10 focus:ring-1 focus:ring-[#f85606] outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">{isUrdu ? 'تاریخ تنسیخ' : 'Expiry Date'}</label>
                    <input type="text" placeholder="MM / YY" className="w-full border rounded p-3 focus:ring-1 focus:ring-[#f85606] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">CVV</label>
                    <input type="password" placeholder="XXX" className="w-full border rounded p-3 focus:ring-1 focus:ring-[#f85606] outline-none" />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-24">
            <h3 className="text-lg font-black mb-6 uppercase tracking-tight text-gray-800">Review Order</h3>
            <div className="max-h-48 overflow-y-auto mb-6 pr-2 space-y-3 thin-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} className="w-12 h-12 rounded border object-cover" alt="" />
                  <div className="flex-grow">
                    <p className="text-xs font-bold text-gray-700 line-clamp-1">{language === 'en' ? item.name : item.nameUrdu}</p>
                    <p className="text-[10px] text-gray-400">Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-6 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-gray-800 font-bold">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Shipping Fee</span>
                <span className="text-gray-800 font-bold">Rs. {shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t font-black text-xl">
                <span className="text-gray-800">Total</span>
                <span className="text-[#f85606]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              form="checkout-form"
              disabled={isPlacing}
              className="w-full bg-[#f85606] text-white py-4 rounded-sm font-black text-sm uppercase tracking-widest shadow-lg hover:bg-[#d44805] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPlacing ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  PROCESSING...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock"></i>
                  {t.placeOrder}
                </>
              )}
            </button>
            <p className="text-[9px] text-gray-400 text-center mt-4 leading-tight">
              By clicking "Confirm Order", you agree to Bazaar's Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
