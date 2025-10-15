import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { ProductUseCase } from 'src/application/use-cases/product.use-case';
import { JwtAuthGuard } from 'src/infrastructure/providers/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.productUseCase.executeCreate(dto);
  }

  @Get()
  async findAll() {
    return await this.productUseCase.executeGetAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productUseCase.executeGetById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return await this.productUseCase.executeUpdate(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productUseCase.executeDelete(id);
    return { message: 'Product deleted' };
  }
}
