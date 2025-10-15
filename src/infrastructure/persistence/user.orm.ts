import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
