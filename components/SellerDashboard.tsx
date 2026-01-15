
import React, { useState } from 'react';
import { User, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateProductDescription } from '../services/gemini';

const MOCK_SALES_DATA = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

interface SellerDashboardProps {
  user: User;
  language: 'en' | 'ur';
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ user, language }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'inventory'>('analytics');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [aiDescription, setAiDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Local state for inventory management (simulated)
  const [inventory, setInventory] = useState(MOCK_PRODUCTS.filter(p => p.sellerId === 's1'));

  const handleAiDescription = async () => {
    if (!newProductName) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newProductName);
    setAiDescription(desc || '');
    setIsGenerating(false);
  };

  const adjustStock = (productId: string, amount: number) => {
    setInventory(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: Math.max(0, p.stock + amount) } : p
    ));
  };

  const isUrdu = language === 'ur';

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{isUrdu ? 'سیلر سینٹر' : 'Seller Center'}</h2>
          <p className="text-gray-500">
            {isUrdu ? 'خوش آمدید، ' : 'Welcome back, '}
            <span className="text-orange-600 font-semibold">{user.name}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'analytics', label: isUrdu ? 'تجزیہ' : 'Analytics', icon: 'fa-chart-line' },
            { id: 'products', label: isUrdu ? 'مصنوعات' : 'My Products', icon: 'fa-box' },
            { id: 'inventory', label: isUrdu ? 'انوینٹری' : 'Inventory', icon: 'fa-warehouse' },
            { id: 'orders', label: isUrdu ? 'آرڈرز' : 'Orders', icon: 'fa-truck' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${activeTab === tab.id ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">{isUrdu ? 'کل فروخت' : 'Total Sales'}</p>
              <h3 className="text-3xl font-bold text-blue-900">Rs. 1.2M</h3>
              <p className="text-blue-500 text-xs mt-1">+12.5% from last month</p>
            </div>
            <div className="p-6 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wider">{isUrdu ? 'فعال آرڈرز' : 'Active Orders'}</p>
              <h3 className="text-3xl font-bold text-green-900">42</h3>
              <p className="text-green-500 text-xs mt-1">8 pending shipment</p>
            </div>
            <div className="p-6 bg-purple-50 border border-purple-100 rounded-xl">
              <p className="text-purple-600 text-sm font-semibold uppercase tracking-wider">{isUrdu ? 'سٹور ریٹنگ' : 'Store Rating'}</p>
              <h3 className="text-3xl font-bold text-purple-900">4.7 / 5.0</h3>
              <p className="text-purple-500 text-xs mt-1">Based on 2.4k reviews</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border">
            <h4 className="font-bold mb-6 text-gray-700">Monthly Performance Overview</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_SALES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#ea580c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-tags"></i>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{isUrdu ? 'کل اشیاء' : 'Total SKUs'}</p>
                <p className="text-lg font-black">{inventory.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-circle-exclamation"></i>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{isUrdu ? 'ختم شدہ' : 'Out of Stock'}</p>
                <p className="text-lg font-black">{inventory.filter(p => p.stock === 0).length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-money-bill-wave"></i>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{isUrdu ? 'انوینٹری کی قیمت' : 'Stock Value'}</p>
                <p className="text-lg font-black">Rs. {(inventory.reduce((acc, p) => acc + (p.price * p.stock), 0) / 1000).toFixed(1)}k</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-check-double"></i>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{isUrdu ? 'صحتمند اسٹاک' : 'Healthy Stock'}</p>
                <p className="text-lg font-black">{inventory.filter(p => p.stock > 20).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="font-bold text-gray-800">{isUrdu ? 'اسٹاک مینجمنٹ' : 'Stock Management'}</h3>
              <div className="relative w-full sm:w-64">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                <input type="text" placeholder={isUrdu ? 'تلاش کریں...' : 'Search inventory...'} className="pl-9 pr-4 py-2 border rounded-lg text-xs w-full outline-none focus:ring-1 focus:ring-orange-500" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                  <tr>
                    <th className="px-6 py-4">{isUrdu ? 'مصنوعات' : 'Product'}</th>
                    <th className="px-6 py-4">{isUrdu ? 'حالت' : 'Status'}</th>
                    <th className="px-6 py-4">{isUrdu ? 'بقیہ اسٹاک' : 'Current Stock'}</th>
                    <th className="px-6 py-4">{isUrdu ? 'تبدیلی' : 'Quick Adjust'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {inventory.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="w-10 h-10 rounded border" alt="" />
                          <div>
                            <p className="text-xs font-bold text-gray-800">{language === 'en' ? p.name : p.nameUrdu}</p>
                            <p className="text-[10px] text-gray-400">ID: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.stock === 0 ? 'bg-red-100 text-red-600' : 
                          p.stock < 10 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {p.stock === 0 ? (isUrdu ? 'ختم' : 'Out of Stock') : 
                           p.stock < 10 ? (isUrdu ? 'کم اسٹاک' : 'Low Stock') : (isUrdu ? 'موجود' : 'In Stock')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-black ${p.stock < 10 ? 'text-orange-600' : 'text-gray-700'}`}>
                          {p.stock} {isUrdu ? 'یونٹس' : 'units'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => adjustStock(p.id, -1)}
                            className="w-8 h-8 rounded border hover:bg-gray-100 transition flex items-center justify-center text-gray-500"
                          >
                            <i className="fa-solid fa-minus text-xs"></i>
                          </button>
                          <button 
                            onClick={() => adjustStock(p.id, 1)}
                            className="w-8 h-8 rounded border hover:bg-gray-100 transition flex items-center justify-center text-gray-500"
                          >
                            <i className="fa-solid fa-plus text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{isUrdu ? 'سٹور کیٹلاگ' : 'Store Catalog'}</h3>
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 transition shadow-md"
            >
              <i className="fa-solid fa-plus"></i> {isUrdu ? 'نئی پروڈکٹ' : 'Add New Product'}
            </button>
          </div>

          <div className="overflow-x-auto border rounded-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-500 text-xs font-bold">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {inventory.map(p => (
                  <tr key={p.id}>
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img src={p.image} className="w-10 h-10 rounded-lg" alt="" />
                      <div>
                        <p className="font-semibold text-gray-800">{language === 'en' ? p.name : p.nameUrdu}</p>
                        <p className="text-xs text-gray-400">{p.category}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold">Rs. {p.price.toLocaleString()}</td>
                    <td className="py-4 px-6">⭐ {p.rating}</td>
                    <td className="py-4 px-6">
                      <button className="text-gray-400 hover:text-orange-600 transition p-1"><i className="fa-solid fa-pen"></i></button>
                      <button className="text-gray-400 hover:text-red-600 transition p-1 ml-2"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{isUrdu ? 'نئی فہرست شامل کریں' : 'Add New Listing'}</h3>
              <button onClick={() => setIsAddingProduct(false)} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-xmark text-2xl"></i></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{isUrdu ? 'پروڈکٹ کا نام' : 'Product Name'}</label>
                <input 
                  type="text" 
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none" 
                  placeholder="e.g. Handmade Silk Scarf"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-bold text-gray-700">{isUrdu ? 'پروڈکٹ کی تفصیل' : 'Product Description'}</label>
                  <button 
                    onClick={handleAiDescription}
                    disabled={isGenerating || !newProductName}
                    className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold hover:bg-purple-200 transition disabled:opacity-50"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> {isGenerating ? (isUrdu ? 'لکھ رہا ہے...' : 'Writing...') : (isUrdu ? 'AI سے لکھوائیں' : 'AI Generate (EN/UR)')}
                  </button>
                </div>
                <textarea 
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  className="w-full border rounded-xl p-3 h-40 focus:ring-2 focus:ring-orange-500 outline-none whitespace-pre-wrap" 
                  placeholder="Describe your product in detail..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{isUrdu ? 'قیمت' : 'Price (PKR)'}</label>
                  <input type="number" className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{isUrdu ? 'اسٹاک' : 'Stock Quantity'}</label>
                  <input type="number" className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
              </div>
              <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-orange-700 transition uppercase tracking-wide">
                {isUrdu ? 'پروڈکٹ لسٹ کریں' : 'List Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
