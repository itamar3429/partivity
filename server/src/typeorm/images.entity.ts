import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';
import User from './users.entity';

const NAME = 'service_images';

@Entity({ name: NAME })
class ServiceImages {
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

  @Column()
  image: string;

  @Column({ nullable: false, name: 'obj_id' })
  obj_id: string;

  @Column({ name: 'file_ext' })
  file_ext: string;

  @Column({ default: false })
  primary: boolean;

  static getName() {
    return NAME;
  }
}

export default ServiceImages;
