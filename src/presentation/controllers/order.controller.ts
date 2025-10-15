import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { OrderRepositoryImpl } from '../../infrastructure/repositories/order.repository.impl';
import { JwtAuthGuard } from 'src/infrastructure/providers/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderRepo: OrderRepositoryImpl) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    const useCase = new CreateOrderUseCase(this.orderRepo);
    return await useCase.execute(dto);
  }

  @Get(':userId')
  async getUserOrders(@Param('userId') userId: string) {
    return await this.orderRepo.findByUser(userId);
  }

  @Get('detail/:orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return await this.orderRepo.findById(orderId);
  }
}
