
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  COD = 'COD',
  CARD = 'CARD',
  EASYPAISA = 'EASYPAISA',
  JAZZCASH = 'JAZZCASH'
}

export interface Product {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sellerId: string;
  rating: number;
  reviewsCount: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isApproved?: boolean; // For Sellers
}

export interface AppState {
  user: User | null;
  language: 'en' | 'ur';
  cart: CartItem[];
}
