
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategorySidebarProps {
  language: 'en' | 'ur';
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ language, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 py-2 w-full hidden lg:block">
      <ul className="space-y-0.5">
        <li 
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 text-sm cursor-pointer transition flex items-center gap-3 hover:bg-orange-50 hover:text-orange-600 ${!selectedCategory ? 'text-orange-600 font-bold bg-orange-50' : 'text-gray-700'}`}
        >
          <i className="fa-solid fa-house w-5 text-center"></i>
          <span>{language === 'en' ? 'All Categories' : 'تمام اقسام'}</span>
        </li>
        {CATEGORIES.map((cat) => (
          <li 
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className={`px-4 py-2 text-sm cursor-pointer transition flex items-center gap-3 hover:bg-orange-50 hover:text-orange-600 ${selectedCategory === cat.name ? 'text-orange-600 font-bold bg-orange-50' : 'text-gray-700'}`}
          >
            <i className={`fa-solid ${cat.icon} w-5 text-center`}></i>
            <span>{language === 'en' ? cat.name : cat.urdu}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
