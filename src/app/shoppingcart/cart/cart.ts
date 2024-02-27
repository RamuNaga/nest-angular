import { Product } from '../models/product';

export interface Cart {
  cartItems: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
