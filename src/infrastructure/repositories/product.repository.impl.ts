import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrm } from '../persistence/product.orm';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductOrm)
    private readonly ormRepo: Repository<ProductOrm>,
  ) {}

  async create(product: Product): Promise<Product> {
    const productOrm = this.ormRepo.create({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    const saved = await this.ormRepo.save(productOrm);
    return new Product(
      saved.id,
      saved.name,
      saved.description,
      Number(saved.price),
      saved.stock,
    );
  }

  async findAll(): Promise<Product[]> {
    const products = await this.ormRepo.find();
    return products.map(
      (p) => new Product(p.id, p.name, p.description, Number(p.price), p.stock),
    );
  }

  async findById(id: string): Promise<Product | null> {
    const p = await this.ormRepo.findOne({ where: { id } });
    if (!p) return null;
    return new Product(p.id, p.name, p.description, Number(p.price), p.stock);
  }

  async update(product: Product): Promise<Product> {
    await this.ormRepo.update(product.id, {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    const updated = await this.ormRepo.findOne({ where: { id: product.id } });
    if (!updated) throw new Error('Product not found');
    return new Product(
      updated.id,
      updated.name,
      updated.description,
      Number(updated.price),
      updated.stock,
    );
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async addStock(productId: string, quantity: number): Promise<void> {
    const product = await this.ormRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error('Product not found');
    product.stock += quantity;
    await this.ormRepo.save(product);
  }
  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const product = await this.ormRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error('Product not found');
    return product.stock >= quantity;
  }

  async decreaseStock(productId: string, qty: number): Promise<void> {
    const product = await this.ormRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error('Product not found');
    if (product.stock < qty) throw new Error('Insufficient stock');
    product.stock -= qty;
    await this.ormRepo.save(product);
  }
}
