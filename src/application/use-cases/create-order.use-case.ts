import { OrderRepository } from '../../domain/repositories/order.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../../domain/entities/order.entity';
import { v4 as uuidv4 } from 'uuid';
import { InventoryService } from 'src/domain/services/inventory.service';

export class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly inventoryService: InventoryService,
  ) {}

  async executeCreate(dto: CreateOrderDto): Promise<Order> {
    for (const item of dto.items) {
      const isInStock = await this.inventoryService.checkStock(
        item.productId,
        item.quantity,
      );
      if (!isInStock) {
        throw new Error(
          `El producto ${item.productId} no tiene suficiente stock`,
        );
      }
    }
    const order = new Order(
      uuidv4(),
      dto.userId,
      dto.items,
      dto.total,
      'pending',
      new Date(),
    );
    return await this.orderRepository.create(order);
  }

  async executeGetById(id: string): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }

  async executeGetByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepository.findByUser(userId);
  }
}
