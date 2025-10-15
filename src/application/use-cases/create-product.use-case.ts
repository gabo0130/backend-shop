import { ProductRepository } from '../../domain/repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async executeCreate(dto: CreateProductDto): Promise<Product> {
    const product = new Product(
      uuidv4(),
      dto.name,
      dto.description,
      dto.price,
      dto.stock,
    );
    return await this.productRepository.create(product);
  }

  async executeGetAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async executeGetById(id: string): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }
  async executeUpdate(id: string, dto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }
    const updatedProduct = new Product(
      id,
      dto.name,
      dto.description,
      dto.price,
      dto.stock,
    );
    return await this.productRepository.update(updatedProduct);
  }
  async executeDelete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
