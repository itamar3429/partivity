import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';

const NAME = 'service_images';

@Entity({ name: NAME })
class ServiceImages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.id, { cascade: true })
  @JoinColumn({ name: 'service_id' })
  service_id: number;

  @Column()
  image: string;

  @Column({ nullable: false, name: 'obj_id' })
  objId: string;

  @Column({ name: 'file_ext' })
  file_ext: string;

  static getName() {
    return NAME;
  }
}

export default ServiceImages;
