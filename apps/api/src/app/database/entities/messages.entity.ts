import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'messaging', name: 'message' })
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
}
