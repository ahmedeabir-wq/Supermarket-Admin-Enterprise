export type Role = 'admin' | 'accountant' | 'customer';

export interface Profile {
  id: string;
  role: Role;
  full_name?: string;
  email?: string;
  loyalty_points?: number;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  cost_price: number;
  stock_quantity: number;
  category: string;
  image_url?: string;
  created_at?: string;
}

export interface Order {
  id: string;
  created_at: string;
  user_id: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  total_amount: number;
  payment_method: 'cash' | 'card' | 'online';
  customer_name?: string; // Joined from profiles usually
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product_name?: string; // Joined
}

export interface SalesReport {
  date: string;
  revenue: number;
  profit: number;
  orders: number;
}

export interface AppSettings {
  id: string;
  loyalty_program_enabled: boolean;
  store_name: string;
  support_email: string;
  maintenance_mode: boolean;
}