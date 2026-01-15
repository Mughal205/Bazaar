
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryGridProps {
  language: 'en' | 'ur';
  onSelect: (categoryName: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ language, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 border-t border-l border-gray-100">
      {CATEGORIES.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => onSelect(cat.name)}
          className="flex flex-col items-center justify-start p-3 cursor-pointer bg-white border-b border-r border-gray-100 hover:shadow-lg transition-all duration-300 group h-full relative"
        >
          <div className="w-full aspect-square flex items-center justify-center mb-3 overflow-hidden bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          </div>
          <span className="text-[10px] md:text-[11px] font-bold text-gray-700 text-center leading-tight group-hover:text-[#f85606] px-1 line-clamp-2 min-h-[2rem] flex items-center justify-center">
            {language === 'en' ? cat.name : cat.urdu}
          </span>
          <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-10 transition-opacity">
            <i className={`fa-solid ${cat.icon} text-2xl`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
