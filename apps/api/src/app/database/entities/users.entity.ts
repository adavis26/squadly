import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity({ schema: 'users', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, name: 'username' })
  username: string;

  @Column({ type: 'varchar', unique: true, name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'first_name' })
  first_name: string;

  @Column({ type: 'varchar', name: 'last_name' })
  last_name: string;

  @ManyToMany(() => Chat, (chat) => chat.members, { cascade: true })
  @JoinTable()
  chats: Chat[];
}
