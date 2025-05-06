
export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: string;
  shippingAddress: Address;
  orderDate: string;
  estimatedDeliveryDate?: string;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface FilterOptions {
  search: string;
  priceRange: [number, number];
  brands: string[];
  categories: string[];
  inStock: boolean;
}
