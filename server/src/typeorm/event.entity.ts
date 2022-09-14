import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './users.entity';
const NAME = 'events' as const;

@Entity({ name: NAME })
class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  user_id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'varchar', length: 20 })
  status: 'pending' | 'open' | 'booked';

  @Column({ type: 'date' })
  date: Date;

  static getName() {
    return NAME;
  }
}

export default Event;
