
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../constants';

interface TrackOrderPageProps {
  language: 'en' | 'ur';
  initialOrderId?: string;
  onBack?: () => void;
}

const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ language, initialOrderId, onBack }) => {
  const [orderId, setOrderId] = useState(initialOrderId || '');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';

  useEffect(() => {
    if (initialOrderId) {
      performTracking(initialOrderId);
    }
  }, [initialOrderId]);

  const performTracking = (id: string) => {
    setIsSearching(true);
    // Mock tracking data response
    setTimeout(() => {
      setTrackingData({
        id: id,
        status: id.includes('772104') ? 'DELIVERED' : 'SHIPPED',
        date: '24 March, 2024',
        estArrival: '28 March, 2024',
        address: 'House #42, Block 4, Gulshan-e-Iqbal, Karachi',
        items: [
          { name: 'Samsung Galaxy S24 Ultra', price: 399999 },
          { name: 'Wireless Bluetooth Earbuds', price: 4500 }
        ]
      });
      setIsSearching(false);
    }, 800);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    performTracking(orderId);
  };

  const steps = [
    { key: 'ordered', icon: 'fa-clipboard-check', label: t.ordered },
    { key: 'processing', icon: 'fa-box-open', label: t.processing },
    { key: 'shipped', icon: 'fa-truck-fast', label: t.shipped },
    { key: 'delivered', icon: 'fa-house-circle-check', label: t.delivered }
  ];

  const getCurrentStepIndex = () => {
    if (!trackingData) return -1;
    switch (trackingData.status) {
      case 'PENDING': return 0;
      case 'PROCESSING': return 1;
      case 'SHIPPED': return 2;
      case 'DELIVERED': return 3;
      default: return 2;
    }
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition font-bold text-sm uppercase mb-4"
        >
          <i className={`fa-solid ${isUrdu ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
          {isUrdu ? 'واپس آرڈرز پر' : 'Back to My Orders'}
        </button>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialOrderId ? (isUrdu ? 'آرڈر کی تفصیلات' : 'Order Details') : t.trackOrder}
        </h2>
        {!initialOrderId && (
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-3">
            <div className="flex-grow relative">
              <i className="fa-solid fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder={t.orderId + ' (e.g. #BZ-10023)'}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full border rounded-sm py-3 pl-10 pr-4 focus:ring-1 focus:ring-[#f85606] outline-none bg-gray-50"
              />
            </div>
            <button 
              type="submit"
              disabled={isSearching}
              className="bg-[#f85606] text-white px-8 py-3 rounded-sm font-bold hover:bg-[#d44805] transition disabled:opacity-50 min-w-[120px]"
            >
              {isSearching ? <i className="fa-solid fa-circle-notch animate-spin"></i> : t.track}
            </button>
          </form>
        )}
      </div>

      {(trackingData || isSearching) && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          {isSearching ? (
             <div className="bg-white p-20 rounded-lg shadow-sm border text-center">
                <i className="fa-solid fa-circle-notch animate-spin text-4xl text-[#f85606] mb-4"></i>
                <p className="font-bold text-gray-500">Fetching order details...</p>
             </div>
          ) : (
            <>
              {/* Status Stepper */}
              <div className="bg-white p-8 rounded-lg shadow-sm border overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{t.orderStatus}</p>
                    <h3 className="text-xl font-bold text-[#f85606]">{trackingData.id}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{t.estDelivery}</p>
                    <h3 className="text-lg font-bold text-gray-800">{trackingData.estArrival}</h3>
                  </div>
                </div>

                <div className="relative flex justify-between">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0">
                    <div 
                      className="h-full bg-green-500 transition-all duration-1000" 
                      style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    ></div>
                  </div>

                  {steps.map((step, index) => (
                    <div key={step.key} className="relative z-10 flex flex-col items-center group">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        index <= currentStep ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200' : 'bg-white border-gray-200 text-gray-300'
                      }`}>
                        <i className={`fa-solid ${step.icon} text-sm`}></i>
                      </div>
                      <p className={`mt-3 text-xs font-bold transition-colors duration-500 ${
                        index <= currentStep ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Delivery Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-[#f85606]"></i>
                    {isUrdu ? 'ترسیل کی تفصیلات' : 'Delivery Details'}
                  </h4>
                  <div className="space-y-3">
                    <div className="pb-3 border-b">
                      <p className="text-xs text-gray-400 uppercase font-bold">{isUrdu ? 'پتہ' : 'Address'}</p>
                      <p className="text-sm text-gray-700 mt-1 leading-relaxed">{trackingData.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">{isUrdu ? 'آرڈر کی تاریخ' : 'Ordered On'}</p>
                      <p className="text-sm text-gray-700 mt-1">{trackingData.date}</p>
                    </div>
                  </div>
                </div>

                {/* Package Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-box text-[#f85606]"></i>
                    {isUrdu ? 'پیکیج کی تفصیل' : 'Package Summary'}
                  </h4>
                  <div className="space-y-3">
                    {trackingData.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 line-clamp-1">{item.name}</span>
                        <span className="font-bold text-gray-800">Rs. {item.price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t flex justify-between items-center font-bold">
                      <span className="text-gray-800">{t.total}</span>
                      <span className="text-[#f85606] text-lg">
                        Rs. {trackingData.items.reduce((acc: number, cur: any) => acc + cur.price, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
