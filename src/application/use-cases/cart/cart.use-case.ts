import type { CartRepository } from '../../../domain/repositories/cart.repository';
import { AddToCartDto } from '../../dto/add-to-cart.dto';
import { CartItem } from '../../../domain/entities/cart.entity';
import { v4 as uuidv4 } from 'uuid';
import { Inject } from '@nestjs/common';

export class CartUseCase {
  constructor(
    @Inject('CartRepository') private readonly cartRepository: CartRepository,
  ) {}

  async executeAddToCart(dto: AddToCartDto): Promise<CartItem> {
    const item = new CartItem(
      uuidv4(),
      dto.userId,
      dto.productId,
      dto.quantity,
    );
    return await this.cartRepository.addItem(item);
  }

  async executeGetUserCart(userId: string): Promise<CartItem[]> {
    return await this.cartRepository.getUserCart(userId);
  }

  async executeRemoveItem(itemId: string): Promise<void> {
    await this.cartRepository.removeItem(itemId);
  }
  async executeClearCart(userId: string): Promise<void> {
    await this.cartRepository.clearCart(userId);
  }
}
