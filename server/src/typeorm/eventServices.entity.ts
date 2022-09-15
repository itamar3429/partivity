import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Event from './event.entity';
import ServiceSchedule from './schedule.entity';
import User from './users.entity';

const NAME = 'event_services' as const;

@Entity({ name: NAME })
class EventServices {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.id, { cascade: true })
  @JoinColumn({ name: 'event_id' })
  @Column({ name: 'event_id' })
  event_id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => ServiceSchedule, (schedule) => schedule.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'schedule_id' })
  @Column({ name: 'schedule_id' })
  schedule_id: number;

  static getName() {
    return NAME;
  }
}

export default EventServices;
