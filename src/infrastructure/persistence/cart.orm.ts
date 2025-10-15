import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cart_items')
export class CartOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column('int')
  quantity: number;
}
