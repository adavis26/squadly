import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './messages.entity';

@Entity({ schema: 'messaging', name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

  members: any[]
}
