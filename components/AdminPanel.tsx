
import React, { useState } from 'react';
import { TRANSLATIONS, MOCK_PRODUCTS } from '../constants';
import { OrderStatus } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AdminPanelProps {
  language: 'en' | 'ur';
}

const AdminPanel: React.FC<AdminPanelProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sellers' | 'products' | 'orders'>('overview');
  const [sellers, setSellers] = useState([
    { id: 's1', name: 'Khyber Crafts', email: 'khyber@pk.com', status: 'Pending Approval', joined: '2024-03-20', sales: 0 },
    { id: 's2', name: 'Lahore Tech', email: 'lahore@tech.com', status: 'Approved', joined: '2024-01-15', sales: 154 },
    { id: 's3', name: 'Fashion Hub', email: 'hub@fashion.com', status: 'Suspended', joined: '2023-11-05', sales: 89 },
  ]);
  const [products, setProducts] = useState(MOCK_PRODUCTS.map(p => ({ ...p, auditStatus: 'unverified' as 'unverified' | 'auditing' | 'safe' | 'flagged', auditNotes: '' })));
  
  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';

  const handleApproveSeller = (id: string) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, status: 'Approved' } : s));
  };

  const runAiAudit = async (productId: string, productName: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, auditStatus: 'auditing' } : p));
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a marketplace policy moderator. Audit this product: "${productName}". 
        Check if it violates common e-commerce policies (e.g. prohibited items like weapons, drugs, or highly misleading names). 
        Return a JSON-like short verdict: "SAFE" or "FLAGGED" followed by a short reason.`,
      });
      
      const result = response.text || "SAFE";
      const isFlagged = result.toUpperCase().includes("FLAGGED");
      
      setProducts(prev => prev.map(p => p.id === productId ? { 
        ...p, 
        auditStatus: isFlagged ? 'flagged' : 'safe',
        auditNotes: result
      } : p));
    } catch (err) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, auditStatus: 'unverified' } : p));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Admin Panel Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-blue-600"></i>
            {isUrdu ? 'ایڈمن کنٹرول پینل' : 'Platform Control Center'}
          </h2>
          <p className="text-sm text-gray-500">{isUrdu ? 'بازار پاکستان کا انتظام کریں' : 'Managing the heart of Bazaar Pakistan'}</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', icon: 'fa-chart-pie', label: isUrdu ? 'جائزہ' : 'Stats' },
            { id: 'sellers', icon: 'fa-user-tie', label: isUrdu ? 'بیچنے والے' : 'Sellers' },
            { id: 'products', icon: 'fa-boxes-packing', label: isUrdu ? 'آڈٹ' : 'Audit' },
            { id: 'orders', icon: 'fa-truck-ramp-box', label: isUrdu ? 'آرڈرز' : 'Orders' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-lg border shadow-sm border-l-4 border-l-green-500">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gross Merchandise Value</p>
               <h3 className="text-3xl font-black text-gray-800 mt-1">Rs. 14.2M</h3>
               <div className="flex items-center gap-1 text-green-500 text-xs font-bold mt-2">
                 <i className="fa-solid fa-arrow-trend-up"></i> +18% vs last week
               </div>
             </div>
             <div className="bg-white p-6 rounded-lg border shadow-sm border-l-4 border-l-blue-500">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Customers</p>
               <h3 className="text-3xl font-black text-gray-800 mt-1">12,492</h3>
               <div className="flex items-center gap-1 text-blue-500 text-xs font-bold mt-2">
                 <i className="fa-solid fa-user-check"></i> 84% Retention rate
               </div>
             </div>
             <div className="bg-white p-6 rounded-lg border shadow-sm border-l-4 border-l-orange-500">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending Shipments</p>
               <h3 className="text-3xl font-black text-gray-800 mt-1">1,204</h3>
               <div className="flex items-center gap-1 text-orange-500 text-xs font-bold mt-2">
                 <i className="fa-solid fa-clock"></i> Avg 4.2h processing time
               </div>
             </div>
             <div className="bg-white p-6 rounded-lg border shadow-sm border-l-4 border-l-red-500">
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dispute Rate</p>
               <h3 className="text-3xl font-black text-gray-800 mt-1">0.42%</h3>
               <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-2">
                 <i className="fa-solid fa-shield-virus"></i> Below target threshold
               </div>
             </div>
          </div>
          
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-4">
                <i className="fa-solid fa-microchip text-blue-400"></i>
                Platform Health
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                    <span>Server Load</span>
                    <span className="text-green-400">Normal (12%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[12%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                    <span>Fraud Risk Level</span>
                    <span className="text-blue-400">Low</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[5%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 py-3 rounded font-bold text-xs hover:bg-blue-700 transition">
              VIEW FULL SYSTEM LOGS
            </button>
          </div>
        </div>
      )}

      {activeTab === 'sellers' && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Vendor Info</th>
                <th className="px-6 py-4">Onboarding Status</th>
                <th className="px-6 py-4 text-center">Revenue Share</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{seller.name}</p>
                    <p className="text-xs text-gray-400">{seller.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      seller.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      seller.status === 'Suspended' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-600">88% / 12%</td>
                  <td className="px-6 py-4">
                    {seller.status === 'Pending Approval' && (
                      <button 
                        onClick={() => handleApproveSeller(seller.id)}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded text-[10px] font-bold hover:bg-blue-700 shadow-sm transition"
                      >
                        APPROVE VENDOR
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 bg-blue-50 border-b flex items-center justify-between">
            <p className="text-xs font-bold text-blue-800 flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              AI Moderation is active. Use Smart Audit to check for policy violations.
            </p>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Listing</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">AI Smart Audit</th>
                <th className="px-6 py-4">Manual Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={product.image} className="w-10 h-10 rounded border object-cover" alt="" />
                    <div>
                      <p className="font-bold text-gray-800 text-sm truncate max-w-[200px]">{language === 'en' ? product.name : product.nameUrdu}</p>
                      <p className="text-[10px] text-gray-400">SKU: {product.id}BZ</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">{product.category}</td>
                  <td className="px-6 py-4">
                    {product.auditStatus === 'unverified' ? (
                      <button 
                        onClick={() => runAiAudit(product.id, product.name)}
                        className="flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition"
                      >
                        <i className="fa-solid fa-magnifying-glass-chart"></i> RUN SMART AUDIT
                      </button>
                    ) : product.auditStatus === 'auditing' ? (
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                        <i className="fa-solid fa-circle-notch animate-spin"></i> ANALYZING...
                      </div>
                    ) : (
                      <div className={`p-2 rounded border text-[10px] max-w-[200px] ${
                        product.auditStatus === 'flagged' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
                      }`}>
                        <div className="font-black uppercase mb-1 flex items-center gap-1">
                          <i className={`fa-solid ${product.auditStatus === 'flagged' ? 'fa-triangle-exclamation' : 'fa-circle-check'}`}></i>
                          {product.auditStatus}
                        </div>
                        <p className="opacity-80 leading-tight italic">{product.auditNotes}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition">
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button className="w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-sm border p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-receipt text-3xl text-gray-200"></i>
          </div>
          <h3 className="font-bold text-gray-800">No active disputes</h3>
          <p className="text-sm text-gray-400">All marketplace transactions are currently operating within normal parameters.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
