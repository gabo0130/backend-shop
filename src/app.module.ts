import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrm } from './infrastructure/persistence/user.orm';
import { typeOrmConfig } from './infrastructure/persistence/typeorm.config';
import { UserController } from './presentation/controllers/user.controller';
import { UserUseCase } from './application/use-cases/user.use-case';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { AuthService } from './domain/services/auth.service';
import { JwtProvider } from './infrastructure/providers/jwt.provider';
import { ProductController } from './presentation/controllers/product.controller';
import { ProductUseCase } from './application/use-cases/product.use-case';
import { ProductRepositoryImpl } from './infrastructure/repositories/product.repository.impl';
import { ProductOrm } from './infrastructure/persistence/product.orm';
import { OrderOrm } from './infrastructure/persistence/order.orm';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderUseCase } from './application/use-cases/create-order.use-case';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { InventoryService } from './domain/services/inventory.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserOrm, ProductOrm, OrderOrm]),
  ],
  controllers: [UserController, ProductController, OrderController],
  providers: [
    UserUseCase,
    ProductUseCase,
    OrderUseCase,
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
  ],
})
export class AppModule {}
