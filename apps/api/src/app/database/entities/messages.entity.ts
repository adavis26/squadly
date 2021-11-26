import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Chat } from './chat.entity';

@Entity({ schema: 'messaging', name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;

  @Column()
  chatId: number;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    lazy: false,
  })
  chat: Chat;
}
