
import React from 'react';
import { Product } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  language: 'en' | 'ur';
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer border border-transparent hover:border-orange-200">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-0 left-0 bg-[#f85606] text-white px-2 py-0.5 text-[10px] font-bold">
              FREE SHIPPING
            </div>
          </div>
          <div className="p-2.5 flex-grow flex flex-col">
            <h3 className="text-gray-800 text-sm leading-snug line-clamp-2 h-10 mb-1 group-hover:text-[#f85606] transition">
              {language === 'en' ? product.name : product.nameUrdu}
            </h3>
            
            <div className="mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-[#f85606] font-bold text-lg">
                  {language === 'en' ? `Rs. ${product.price.toLocaleString()}` : `${product.price.toLocaleString()} ${t.rs}`}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-gray-400 text-xs line-through">
                  {language === 'en' ? `Rs. ${(product.price * 1.33).toLocaleString()}` : `${(product.price * 1.33).toLocaleString()} ${t.rs}`}
                </span>
                <span className="text-gray-800 text-[10px] font-bold">-25%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-[#faca51] text-[10px]">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-200'}`}></i>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
              </div>
            </div>
          </div>
          <div className="px-2.5 pb-2.5">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-full bg-[#f85606] text-white py-1.5 rounded-sm text-xs font-bold hover:bg-[#d44805] transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
            >
              <i className="fa-solid fa-cart-plus"></i>
              {t.addToCart}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
