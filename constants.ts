
import { Product, UserRole, User } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra',
    nameUrdu: 'سام سنگ گلیکسی S24 الٹرا',
    description: 'Latest flagship smartphone with AI features.',
    price: 399999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400',
    sellerId: 's1',
    rating: 4.8,
    reviewsCount: 150,
    stock: 10
  },
  {
    id: '2',
    name: 'Men\'s Cotton Kurta',
    nameUrdu: 'مردانہ سوتی کرتا',
    description: 'Premium quality stitched cotton kurta for summer.',
    price: 2500,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=80&w=400',
    sellerId: 's2',
    rating: 4.5,
    reviewsCount: 89,
    stock: 50
  },
  {
    id: '3',
    name: 'Wireless Bluetooth Earbuds',
    nameUrdu: 'وائرلیس بلوٹوتھ ایئربڈز',
    description: 'Noise cancelling buds with 24h battery life.',
    price: 4500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&q=80&w=400',
    sellerId: 's1',
    rating: 4.2,
    reviewsCount: 300,
    stock: 100
  },
  {
    id: '4',
    name: 'Traditional Peshawari Chappal',
    nameUrdu: 'روایتی پشاوری چپل',
    description: 'Handmade pure leather Peshawari Chappal.',
    price: 3200,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400',
    sellerId: 's3',
    rating: 4.9,
    reviewsCount: 45,
    stock: 20
  },
  {
    id: '5',
    name: 'Cooking Oil - 5 Litre',
    nameUrdu: 'کوکنگ آئل - 5 لیٹر',
    description: 'Premium vegetable oil for healthy cooking.',
    price: 2800,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
    sellerId: 's2',
    rating: 4.6,
    reviewsCount: 1200,
    stock: 500
  }
];

export const CATEGORIES = [
  { id: '1', name: 'Face Mask & Packs', urdu: 'فیس ماسک', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200', icon: 'fa-mask' },
  { id: '2', name: '3D Printers', urdu: 'تھری ڈی پرنٹرز', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200', icon: 'fa-print' },
  { id: '3', name: 'Pasta & Pizza Tools', urdu: 'پاستا اور پیزا ٹولز', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=200', icon: 'fa-pizza-slice' },
  { id: '4', name: 'SIM Tools', urdu: 'سم ٹولز', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=200', icon: 'fa-sim-card' },
  { id: '5', name: 'Screen Protectors', urdu: 'اسکرین پروٹیکٹرز', image: 'https://images.unsplash.com/photo-1611186871348-b1ec696e52c9?auto=format&fit=crop&q=80&w=200', icon: 'fa-mobile-screen' },
  { id: '6', name: 'Casserole Pots', urdu: 'ہانڈی', image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=200', icon: 'fa-utensils' },
  { id: '7', name: 'Hoodies & Sweatshirts', urdu: 'ہوڈیز', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=200', icon: 'fa-shirt' },
  { id: '8', name: 'Toy Boxes & Organisers', urdu: 'کھلونوں کے ڈبے', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=200', icon: 'fa-box-open' },
  { id: '9', name: 'Electric Clippers', urdu: 'پالتو جانوروں کے کلپرز', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200', icon: 'fa-scissors' },
  { id: '10', name: 'Dining Sets', urdu: 'ڈائننگ سیٹس', image: 'https://images.unsplash.com/photo-1617806118233-f8e137453f9c?auto=format&fit=crop&q=80&w=200', icon: 'fa-chair' },
  { id: '11', name: 'Microphones', urdu: 'مائیکروفون', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200', icon: 'fa-microphone' },
  { id: '12', name: 'Headbands', urdu: 'ہیڈ بینڈز', image: 'https://images.unsplash.com/photo-1589531584826-664f3317711d?auto=format&fit=crop&q=80&w=200', icon: 'fa-ribbon' },
  { id: '13', name: 'Christening Wear', urdu: 'بچوں کے کپڑے', image: 'https://images.unsplash.com/photo-1519689689358-097a3b95a01f?auto=format&fit=crop&q=80&w=200', icon: 'fa-baby' },
  { id: '14', name: 'Leashes & Harnesses', urdu: 'پٹے اور ہارنس', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=200', icon: 'fa-dog' },
  { id: '15', name: 'Donate to Educate', urdu: 'تعلیم کے لیے عطیہ', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=200', icon: 'fa-graduation-cap' },
  { id: '16', name: 'Coloring & Drawing', urdu: 'ڈرائنگ کا سامان', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200', icon: 'fa-palette' }
];

export const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 
  'Hyderabad', 'Peshawar', 'Quetta', 'Sargodha', 'Sialkot', 'Bahawalpur', 'Sukkur', 'Jhang'
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Ahmed Khan', email: 'ahmed@example.com', role: UserRole.CUSTOMER },
  { id: 's1', name: 'Galaxy Store', email: 'seller@galaxy.com', role: UserRole.SELLER, isApproved: true },
  { id: 'admin1', name: 'Bazaar Admin', email: 'admin@bazaar.pk', role: UserRole.ADMIN }
];

export const TRANSLATIONS = {
  en: {
    home: 'Home',
    shop: 'Shop',
    categories: 'Categories',
    cart: 'Cart',
    login: 'Login',
    sellOnBazaar: 'Sell on Bazaar',
    search: 'Search in Bazaar',
    addToCart: 'Add to Cart',
    checkout: 'Checkout',
    total: 'Total',
    orderHistory: 'Order History',
    sellerDashboard: 'Seller Dashboard',
    adminPanel: 'Admin Panel',
    language: 'اردو',
    rs: 'Rs.',
    flashSale: 'Flash Sale',
    justForYou: 'Just For You',
    trackOrder: 'Track My Order',
    orderId: 'Order ID',
    track: 'Track',
    orderStatus: 'Order Status',
    estDelivery: 'Estimated Delivery',
    ordered: 'Ordered',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    shippingDetails: 'Shipping Details',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    address: 'Address',
    city: 'City',
    placeOrder: 'Confirm Order',
    orderSuccess: 'Order Placed Successfully!',
    thankYou: 'Thank you for shopping with Bazaar Pakistan.'
  },
  ur: {
    home: 'ہوم',
    shop: 'شاپ',
    categories: 'اقسام',
    cart: 'کارٹ',
    login: 'لاگ ان',
    sellOnBazaar: 'بازار پر بیچیں',
    search: 'بازار میں تلاش کریں',
    addToCart: 'کارٹ میں شامل کریں',
    checkout: 'چیک آؤٹ',
    total: 'کل رقم',
    orderHistory: 'آرڈر ہسٹری',
    sellerDashboard: 'سیلر ڈیش بورڈ',
    adminPanel: 'ایڈمن پینل',
    language: 'English',
    rs: 'روپے',
    flashSale: 'فلیش سیل',
    justForYou: 'صرف آپ کے لیے',
    trackOrder: 'اپنا آرڈر ٹریک کریں',
    orderId: 'آرڈر آئی ڈی',
    track: 'ٹریک کریں',
    orderStatus: 'آرڈر کی صورتحال',
    estDelivery: 'تخمینی ترسیل',
    ordered: 'آرڈر ہو گیا',
    processing: 'تیار ہو رہا ہے',
    shipped: 'روانہ ہو گیا',
    delivered: 'پہنچ گیا',
    shippingDetails: 'ترسیل کی تفصیلات',
    fullName: 'پورا نام',
    phoneNumber: 'فون نمبر',
    address: 'پتہ',
    city: 'شہر',
    placeOrder: 'آرڈر کنفرم کریں',
    orderSuccess: 'آرڈر کامیابی سے دے دیا گیا!',
    thankYou: 'بازار پاکستان کے ساتھ خریداری کا شکریہ۔'
  }
};
