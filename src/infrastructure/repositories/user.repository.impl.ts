import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrm } from '../persistence/user.orm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrm)
    private readonly ormRepo: Repository<UserOrm>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userOrm = await this.ormRepo.findOne({ where: { email } });
    if (!userOrm) return null;
    return new User(userOrm.id, userOrm.email, userOrm.password, userOrm.name);
  }

  async create(user: User): Promise<User> {
    const userOrm = this.ormRepo.create({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    });
    const saved = await this.ormRepo.save(userOrm);
    return new User(saved.id, saved.email, saved.password, saved.name);
  }
}
