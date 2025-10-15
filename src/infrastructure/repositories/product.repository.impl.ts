import { Product } from 'src/domain/entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
