import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { serviceEnum } from './dto/Services.dto';
import User from './users.entity';

const NAME = 'services';
@Entity(NAME)
class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  @Column({ nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 100 })
  service: typeof serviceEnum[number];

  @Column({ name: 'service_type' })
  service_type: string;

  // for location <====
  @Column({ default: null })
  country: string;

  @Column({ default: null })
  city: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  capacity: number;
  // ====>

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: null })
  name: string;

  @Column({ default: false })
  deleted: boolean;

  static getName(): typeof NAME {
    return NAME;
  }
}

export default Service;
