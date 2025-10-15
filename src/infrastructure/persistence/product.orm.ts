import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class ProductOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;
}
