import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { JwtAuthGuard } from 'src/infrastructure/providers/jwt-auth.guard';
import { OrderUseCase } from 'src/application/use-cases';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderUseCase.executeCreate(dto);
  }

  @Get(':userId')
  async getUserOrders(@Param('userId') userId: string) {
    return await this.orderUseCase.executeGetByUserId(userId);
  }

  @Get('detail/:orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return await this.orderUseCase.executeGetById(orderId);
  }
}
