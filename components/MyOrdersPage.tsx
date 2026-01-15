
import React from 'react';
import { Order, OrderStatus } from '../types';
import { TRANSLATIONS } from '../constants';

interface MyOrdersPageProps {
  orders: Order[];
  language: 'en' | 'ur';
  onViewDetail: (id: string) => void;
}

const MyOrdersPage: React.FC<MyOrdersPageProps> = ({ orders, language, onViewDetail }) => {
  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-700';
      case OrderStatus.SHIPPED: return 'bg-blue-100 text-blue-700';
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-3xl font-black text-gray-800">{t.orderHistory}</h2>
        <span className="bg-white border px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm">
          {orders.length} Total Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-20 rounded-2xl border shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
            <i className="fa-solid fa-receipt text-4xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800">No orders found</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#f85606] text-white px-8 py-3 rounded-sm font-bold shadow-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center border group-hover:bg-orange-50 group-hover:border-orange-100 transition">
                    <i className="fa-solid fa-box text-[#f85606] text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-lg">{order.id}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase">{order.date}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                  <div className="text-left md:text-right flex-grow md:flex-grow-0">
                    <p className="text-xs font-bold text-gray-400 uppercase">{t.total}</p>
                    <p className="font-black text-gray-800">Rs. {order.total.toLocaleString()}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <button 
                    onClick={() => onViewDetail(order.id)}
                    className="bg-gray-800 text-white px-6 py-2 rounded-sm text-xs font-bold hover:bg-black transition shadow-sm w-full md:w-auto"
                  >
                    {isUrdu ? 'تفصیل دیکھیں' : 'VIEW DETAILS'}
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t flex flex-wrap gap-2">
                {order.items.slice(0, 3).map((item, idx) => (
                  <img 
                    key={idx} 
                    src={item.image} 
                    className="w-10 h-10 rounded border object-cover grayscale group-hover:grayscale-0 transition duration-500" 
                    alt="" 
                  />
                ))}
                {order.items.length > 3 && (
                  <div className="w-10 h-10 rounded border bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
