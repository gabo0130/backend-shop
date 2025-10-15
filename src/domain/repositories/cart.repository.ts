import { CartItem } from '../entities/cart.entity';

export interface CartRepository {
  addItem(item: CartItem): Promise<CartItem>;
  getUserCart(userId: string): Promise<CartItem[]>;
  removeItem(itemId: string): Promise<void>;
  clearCart(userId: string): Promise<void>;
}
