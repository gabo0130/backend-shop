import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrm } from './infrastructure/persistence/user.orm';
import { typeOrmConfig } from './infrastructure/persistence/typeorm.config';
import { UserController } from './presentation/controllers/user.controller';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { JwtProvider } from './infrastructure/providers/jwt.provider';
import { ProductController } from './presentation/controllers/product.controller';
import { ProductRepositoryImpl } from './infrastructure/repositories/product.repository.impl';
import { ProductOrm } from './infrastructure/persistence/product.orm';
import { OrderOrm } from './infrastructure/persistence/order.orm';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { CartOrm } from './infrastructure/persistence/cart.orm';
import { CartController } from './presentation/controllers/cart.controller';
import { CartRepositoryImpl } from './infrastructure/repositories/cart.repository.impl';
import {
  CartUseCase,
  OrderUseCase,
  ProductUseCase,
  UserUseCase,
} from './application/use-cases';
import { AuthService, InventoryService } from './domain/services';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserOrm, ProductOrm, OrderOrm, CartOrm]),
  ],
  controllers: [
    UserController,
    ProductController,
    OrderController,
    CartController,
  ],
  providers: [
    UserUseCase,
    ProductUseCase,
    OrderUseCase,
    CartUseCase,
    InventoryService,
    AuthService,
    JwtProvider,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
    {
      provide: 'CartRepository',
      useClass: CartRepositoryImpl,
    },
  ],
})
export class AppModule {}
