
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { TRANSLATIONS } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  language: 'en' | 'ur';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, language }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'User',
      email: formData.email,
      role: role,
      isApproved: role === UserRole.SELLER
    };
    onLogin(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === 'login' 
              ? (isUrdu ? 'لاگ ان کریں' : 'Welcome to Bazaar! Please login.') 
              : (isUrdu ? 'اکاؤنٹ بنائیں' : 'Create your Bazaar Account')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isUrdu ? 'پورا نام' : 'Full Name'}
              </label>
              <input 
                type="text" 
                required
                className="w-full border rounded-sm p-3 focus:ring-1 focus:ring-[#f85606] outline-none bg-gray-50"
                placeholder={isUrdu ? 'مثال: احمد خان' : 'e.g. Ahmed Khan'}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {isUrdu ? 'ای میل یا فون نمبر' : 'Email or Phone'}
            </label>
            <input 
              type="text" 
              required
              className="w-full border rounded-sm p-3 focus:ring-1 focus:ring-[#f85606] outline-none bg-gray-50"
              placeholder={isUrdu ? 'اپنی ای میل درج کریں' : 'Please enter your email'}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {isUrdu ? 'پاس ورڈ' : 'Password'}
            </label>
            <input 
              type="password" 
              required
              className="w-full border rounded-sm p-3 focus:ring-1 focus:ring-[#f85606] outline-none bg-gray-50"
              placeholder={isUrdu ? 'پاس ورڈ درج کریں' : 'Please enter your password'}
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {mode === 'signup' && (
            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-700 mb-2">{isUrdu ? 'میں جوائن کرنا چاہتا ہوں بطور:' : 'I want to join as:'}</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.CUSTOMER)}
                  className={`p-3 border rounded text-xs font-bold transition ${role === UserRole.CUSTOMER ? 'border-[#f85606] bg-orange-50 text-[#f85606]' : 'bg-gray-50 text-gray-500'}`}
                >
                  <i className="fa-solid fa-user-tag mr-2"></i> {isUrdu ? 'خریدار' : 'Customer'}
                </button>
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.SELLER)}
                  className={`p-3 border rounded text-xs font-bold transition ${role === UserRole.SELLER ? 'border-[#f85606] bg-orange-50 text-[#f85606]' : 'bg-gray-50 text-gray-500'}`}
                >
                  <i className="fa-solid fa-shop mr-2"></i> {isUrdu ? 'بیچنے والا' : 'Seller'}
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-[#f85606] text-white py-4 rounded-sm font-bold shadow-lg hover:bg-[#d44805] transition-all uppercase tracking-wide mt-4"
          >
            {mode === 'login' ? (isUrdu ? 'لاگ ان' : 'Login') : (isUrdu ? 'سائن اپ' : 'Sign Up')}
          </button>

          <div className="text-center text-xs text-gray-500 py-2">
            {isUrdu ? 'یا اس کے ساتھ لاگ ان کریں' : 'Or login with'}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="flex items-center justify-center gap-2 py-2 border rounded-sm hover:bg-gray-50 transition text-sm font-medium">
              <i className="fa-brands fa-facebook text-blue-600"></i> Facebook
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-2 border rounded-sm hover:bg-gray-50 transition text-sm font-medium">
              <i className="fa-brands fa-google text-red-500"></i> Google
            </button>
          </div>

          <div className="text-center pt-4 border-t mt-6">
            <p className="text-sm text-gray-600">
              {mode === 'login' 
                ? (isUrdu ? 'اکاؤنٹ نہیں ہے؟' : "Don't have an account?") 
                : (isUrdu ? 'پہلے سے اکاؤنٹ ہے؟' : 'Already have an account?')}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-blue-500 font-bold ml-1 hover:underline"
              >
                {mode === 'login' ? (isUrdu ? 'ابھی سائن اپ کریں' : 'Register here') : (isUrdu ? 'لاگ ان کریں' : 'Login here')}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
