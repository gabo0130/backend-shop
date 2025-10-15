import { Inject, Injectable } from '@nestjs/common';
import type { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async addStock(productId: string, quantity: number) {
    await this.productRepository.addStock(productId, quantity);
  }

  async checkStock(productId: string, quantity: number): Promise<boolean> {
    return await this.productRepository.checkStock(productId, quantity);
  }
}
