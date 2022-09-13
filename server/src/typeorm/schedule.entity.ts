import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';

const NAME = 'service_schedule';
@Entity({
  name: NAME,
})
class ServiceSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.id, { cascade: true })
  @JoinColumn({ name: 'service_id' })
  service_id: number;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column()
  title: string;

  @Column()
  price: number;

  static getName() {
    return NAME;
  }
}

export default ServiceSchedule;
