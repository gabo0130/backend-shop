import { Order } from '../entities/order.entity';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findByUser(userId: string): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
}
