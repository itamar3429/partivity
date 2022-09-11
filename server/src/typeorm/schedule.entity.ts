import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';

@Entity({
  name: 'service_schedule',
})
class ServiceSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.id, { cascade: true })
  @JoinColumn({ name: 'service_id' })
  serviceId: number;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column()
  title: string;

  @Column()
  price: number;
}

export default ServiceSchedule;
