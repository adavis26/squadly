import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'users', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;
}
