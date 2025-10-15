import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { AuthService } from 'src/domain/services';
import { JwtProvider } from 'src/infrastructure/providers/jwt.provider';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly authService: AuthService,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async executeCreate(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new Error('Email ya registrado');
    const user = new User(
      uuidv4(),
      data.email,
      await this.authService.hashPassword(data.password),
      data.name,
    );
    return await this.userRepository.create(user);
  }

  async executeLogin(data: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error('Usuario no encontrado');
    const valid = await this.authService.comparePasswords(
      data.password,
      user.password,
    );
    if (!valid) throw new Error('Contraseña incorrecta');
    return this.jwtProvider.sign({ id: user.id, email: user.email });
  }
}
