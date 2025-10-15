import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrm } from './infrastructure/persistence/user.orm';
import { typeOrmConfig } from './infrastructure/persistence/typeorm.config';
import { UserController } from './presentation/controllers/user.controller';
import { UserUseCase } from './application/use-cases/user.use-case';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { AuthService } from './domain/services/auth.service';
import { JwtProvider } from './infrastructure/providers/jwt.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserOrm]),
  ],
  controllers: [UserController],
  providers: [
    UserUseCase,
    AuthService,
    JwtProvider,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AppModule {}
