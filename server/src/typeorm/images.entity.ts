import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';

@Entity()
class ServiceImages {
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
  image: string;

  @Column()
  role: string;
}

export default ServiceImages;
