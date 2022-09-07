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
  @Column({ name: 'service_id' })
  serviceId: number;

  @Column()
  image: string;

  @Column({ nullable: false, name: 'obj_id' })
  objId: string;

  @Column({ name: 'file_ext' })
  fileExt: string;
}

export default ServiceImages;
