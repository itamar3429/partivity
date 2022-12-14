import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';
import User from './users.entity';

const NAME = 'service_schedule';
@Entity({
  name: NAME,
})
export class ServiceSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.id, { cascade: true })
  @JoinColumn({ name: 'service_id' })
  @Column({ name: 'service_id' })
  service_id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ default: false })
  booked: boolean;

  static getName(): typeof NAME {
    return NAME;
  }
}

export default ServiceSchedule;
