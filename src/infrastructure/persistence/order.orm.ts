import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class OrderOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('jsonb')
  items: Array<{ productId: string; quantity: number }>;

  @Column('decimal')
  total: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;
}
