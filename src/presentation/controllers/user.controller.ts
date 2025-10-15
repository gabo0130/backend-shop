import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserUseCase } from '../../application/use-cases/user.use-case';
import { CreateUserDto } from 'src/application/dto/create-user.dto';
import { LoginUserDto } from 'src/application/dto/login-user.dto';
import { JwtAuthGuard } from 'src/infrastructure/providers/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserUseCase) {}
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.service.executeCreate(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return await this.service.executeLogin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile() {
    return { message: 'Perfil de usuario' };
  }
}
