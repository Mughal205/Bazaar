
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  user: User | null;
  cartCount: number;
  language: 'en' | 'ur';
  onToggleLang: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
  onCartClick: () => void;
  onHomeClick: () => void;
  onTrackClick: () => void;
  onMyOrdersClick: () => void;
  onSearch: (q: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, cartCount, language, onToggleLang, onLoginClick, onLogout, onCartClick, onHomeClick, onTrackClick, onMyOrdersClick, onSearch 
}) => {
  const t = TRANSLATIONS[language];
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-[#002147] text-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-white/10 py-1 text-[11px] font-medium px-4 border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <button onClick={onLoginClick} className="hover:text-orange-400 transition-colors">
              {t.sellOnBazaar}
            </button>
            <span className="opacity-70 cursor-help hover:opacity-100 transition-opacity uppercase">Help & Support</span>
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={onToggleLang} className="font-bold flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded transition">
              <i className="fa-solid fa-globe"></i> {t.language}
            </button>
            <button onClick={onTrackClick} className="cursor-pointer hover:text-orange-400 transition-colors uppercase">
              {t.trackOrder}
            </button>
            
            <div className="relative">
              <button 
                onClick={user ? () => setShowDropdown(!showDropdown) : onLoginClick} 
                className="hover:text-orange-400 transition-colors font-bold uppercase"
              >
                {user ? user.name : (language === 'ur' ? 'لاگ ان / سائن اپ' : 'LOGIN / SIGNUP')}
              </button>
              
              {user && showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-800 rounded shadow-xl border overflow-hidden z-[110]">
                  <div className="p-3 border-b bg-gray-50">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Logged in as</p>
                    <p className="text-sm font-bold truncate">{user.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                    <i className="fa-solid fa-user text-gray-400"></i> My Profile
                  </button>
                  <button 
                    onClick={() => { onMyOrdersClick(); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-box text-gray-400"></i> {t.orderHistory}
                  </button>
                  <button 
                    onClick={() => { onLogout(); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t"
                  >
                    <i className="fa-solid fa-power-off"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div onClick={onHomeClick} className="flex items-center gap-1 cursor-pointer select-none">
          <div className="bg-[#f85606] text-white w-9 h-9 flex items-center justify-center rounded-sm rotate-3 shadow-lg group">
            <i className="fa-solid fa-b text-xl font-black group-hover:scale-110 transition-transform"></i>
          </div>
          <h1 className="text-2xl font-black tracking-tighter ml-1 text-white">BAZAAR</h1>
        </div>

        <div className="flex-grow w-full relative">
          <input 
            type="text" 
            placeholder={t.search} 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/60 rounded-sm py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition border border-white/20 shadow-inner"
          />
          <button className="absolute right-0 top-0 h-full bg-[#f85606] text-white px-4 rounded-r-sm hover:bg-[#d44805] transition shadow-md">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={onCartClick} className="relative group p-2 flex items-center gap-2 text-white">
            <i className="fa-solid fa-cart-shopping text-2xl group-hover:scale-110 transition transform group-active:scale-95"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f85606] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-[#002147] shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
