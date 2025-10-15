import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  addStock(productId: string, quantity: number): Promise<void>;
  checkStock(productId: string, quantity: number): Promise<boolean>;
  decreaseStock(productId: string, qty: number): Promise<void>;
}
