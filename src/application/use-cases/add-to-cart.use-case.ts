import { CartRepository } from '../../domain/repositories/cart.repository';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { CartItem } from '../../domain/entities/cart.entity';
import { v4 as uuidv4 } from 'uuid';

export class AddToCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(dto: AddToCartDto): Promise<CartItem> {
    const item = new CartItem(
      uuidv4(),
      dto.userId,
      dto.productId,
      dto.quantity,
    );
    return await this.cartRepository.addItem(item);
  }
}
