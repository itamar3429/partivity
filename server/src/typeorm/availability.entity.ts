import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';

@Entity()
class ServiceAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.id, { cascade: true })
  @JoinColumn({ name: 'service_id' })
  serviceId: number;

  //   @Column({ name: 'service_id' })
  //   serviceId: number;

  @Column()
  serviceName: 'music' | 'general' | 'location' | 'food';

  @Column()
  date: Date;

  @Column({ type: 'time', name: 'time_start' })
  timeStart: Date;

  @Column({ type: 'time', name: 'time_end' })
  timeEnd: Date;
}

export default ServiceAvailability;
