import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ schema: 'users', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'first_name' })
  first_name: string;

  @Column({ type: 'varchar', name: 'last_name' })
  last_name: string;
}
