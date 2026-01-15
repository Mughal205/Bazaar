
import React from 'react';
import { TRANSLATIONS } from '../constants';

const Footer: React.FC<{ language: 'en' | 'ur' }> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const isRTL = language === 'ur';

  return (
    <footer className="bg-[#002147] text-gray-300 py-12 px-4 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h2 className="text-white text-2xl font-bold tracking-tight">BAZAAR</h2>
          <p className="text-sm">
            {language === 'en' 
              ? "Pakistan's most trusted multi-vendor marketplace. Bringing quality products to your doorstep since 2024."
              : "پاکستان کی سب سے قابل اعتماد ملٹی وینڈر مارکیٹ پلیس۔ 2024 سے معیاری مصنوعات آپ کی دہلیز پر پہنچا رہے ہیں۔"}
          </p>
          <div className="flex gap-4 text-xl">
            <i className="fa-brands fa-facebook hover:text-orange-500 cursor-pointer transition"></i>
            <i className="fa-brands fa-instagram hover:text-orange-500 cursor-pointer transition"></i>
            <i className="fa-brands fa-twitter hover:text-orange-500 cursor-pointer transition"></i>
            <i className="fa-brands fa-youtube hover:text-orange-500 cursor-pointer transition"></i>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Help Center</li>
            <li className="hover:text-white cursor-pointer transition">How to Buy</li>
            <li className="hover:text-white cursor-pointer transition">Returns & Refunds</li>
            <li className="hover:text-white cursor-pointer transition">Contact Us</li>
            <li className="hover:text-white cursor-pointer transition">Purchase Protection</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Bazaar Business</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Sell on Bazaar</li>
            <li className="hover:text-white cursor-pointer transition">Join Affiliate Program</li>
            <li className="hover:text-white cursor-pointer transition">Logistic Partnerships</li>
            <li className="hover:text-white cursor-pointer transition">Store Guidelines</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Payment Methods</h4>
          <div className="flex flex-wrap gap-3 items-center">
            {/* Easypaisa - Enhanced prominence */}
            <div className="bg-white p-1 rounded border border-white/20 w-16 h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/df/Easypaisa_logo.png" 
                alt="Easypaisa" 
                className="max-h-full max-w-full object-contain" 
              />
            </div>
            {/* JazzCash */}
            <div className="bg-white p-1 rounded border border-white/20 w-16 h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/29/JazzCash_logo.png" 
                alt="JazzCash" 
                className="max-h-full max-w-full object-contain scale-110" 
              />
            </div>
            {/* Visa */}
            <div className="bg-white p-1 rounded border border-white/20 w-16 h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" 
                alt="Visa" 
                className="max-h-full max-w-full object-contain" 
              />
            </div>
            {/* Mastercard */}
            <div className="bg-white p-1 rounded border border-white/20 w-16 h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" 
                alt="Mastercard" 
                className="max-h-full max-w-full object-contain" 
              />
            </div>
            {/* Cash on Delivery */}
            <div className="bg-[#f85606] text-white px-2 py-1 rounded border border-white/20 text-[10px] font-black flex items-center justify-center h-10 w-16 shadow-lg hover:scale-105 transition-transform cursor-pointer">
              COD
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-xs text-white/50 mb-3 uppercase tracking-tighter font-bold">Download Bazaar App</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">
                <i className="fa-brands fa-apple text-2xl text-[#002147]"></i>
                <div className="flex flex-col">
                  <span className="text-[7px] leading-none font-bold uppercase text-gray-400">Download on the</span>
                  <span className="text-xs leading-tight font-black">App Store</span>
                </div>
              </div>
              <div className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition shadow-lg w-full sm:w-auto">
                <i className="fa-brands fa-google-play text-xl text-[#002147]"></i>
                <div className="flex flex-col">
                  <span className="text-[7px] leading-none font-bold uppercase text-gray-400">Get it on</span>
                  <span className="text-xs leading-tight font-black">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
        © 2024 Bazaar Pakistan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
