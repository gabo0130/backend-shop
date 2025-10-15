import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderOrm } from '../persistence/order.orm';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrderOrm)
    private readonly ormRepo: Repository<OrderOrm>,
  ) {}

  async create(order: Order): Promise<Order> {
    const orderOrm = this.ormRepo.create(order);
    const saved = await this.ormRepo.save(orderOrm);
    return new Order(
      saved.id,
      saved.userId,
      saved.items,
      Number(saved.total),
      saved.status,
      saved.createdAt,
    );
  }

  async findByUser(userId: string): Promise<Order[]> {
    const orders = await this.ormRepo.find({ where: { userId } });
    return orders.map(
      (o) =>
        new Order(
          o.id,
          o.userId,
          o.items,
          Number(o.total),
          o.status,
          o.createdAt,
        ),
    );
  }

  async findById(id: string): Promise<Order | null> {
    const o = await this.ormRepo.findOne({ where: { id } });
    if (!o) return null;
    return new Order(
      o.id,
      o.userId,
      o.items,
      Number(o.total),
      o.status,
      o.createdAt,
    );
  }
}
