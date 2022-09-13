import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './users.entity';
const NAME = 'event_plan' as const;

@Entity({ name: NAME })
class EventPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'varchar', length: 20 })
  status: 'pending' | 'open' | 'close';

  @Column({ type: 'date' })
  date: Date;

  static getName() {
    return NAME;
  }
}

export default EventPlan;
