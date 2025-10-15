import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserOrm } from './user.orm';
import { ProductOrm } from './product.orm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'Shop',
  schema: 'Shop',
  entities: [UserOrm, ProductOrm],
  synchronize: true,
};
