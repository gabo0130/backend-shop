import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartOrm } from '../persistence/cart.orm';
import { CartItem } from '../../domain/entities/cart.entity';
import { CartRepository } from '../../domain/repositories/cart.repository';

@Injectable()
export class CartRepositoryImpl implements CartRepository {
  constructor(
    @InjectRepository(CartOrm)
    private readonly ormRepo: Repository<CartOrm>,
  ) {}

  async addItem(item: CartItem): Promise<CartItem> {
    const cartOrm = this.ormRepo.create(item);
    const saved = await this.ormRepo.save(cartOrm);
    return new CartItem(
      saved.id,
      saved.userId,
      saved.productId,
      saved.quantity,
    );
  }

  async getUserCart(userId: string): Promise<CartItem[]> {
    const items = await this.ormRepo.find({ where: { userId } });
    return items.map(
      (i) => new CartItem(i.id, i.userId, i.productId, i.quantity),
    );
  }

  async removeItem(itemId: string): Promise<void> {
    await this.ormRepo.delete(itemId);
  }

  async clearCart(userId: string): Promise<void> {
    await this.ormRepo.delete({ userId });
  }
}
