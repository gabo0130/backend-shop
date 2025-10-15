import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AddToCartDto } from '../../application/dto/add-to-cart.dto';
import { CartUseCase } from '../../application/use-cases/cart.use-case';
import { JwtAuthGuard } from 'src/infrastructure/providers/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartUseCase: CartUseCase) {}

  @Post('add')
  async addToCart(@Body() dto: AddToCartDto) {
    return await this.cartUseCase.executeAddToCart(dto);
  }

  @Get(':userId')
  async getUserCart(@Param('userId') userId: string) {
    return await this.cartUseCase.executeGetUserCart(userId);
  }

  @Delete('remove/:itemId')
  async removeItem(@Param('itemId') itemId: string) {
    return await this.cartUseCase.executeRemoveItem(itemId);
  }

  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string) {
    return await this.cartUseCase.executeClearCart(userId);
  }
}
