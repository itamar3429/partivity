import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { serviceEnum } from './dto/Services.dto';
import User from './users.entity';

@Entity('services')
class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  @Column({ nullable: false })
  userId: number;

  @Column({ type: 'char', length: 100 })
  service: typeof serviceEnum[number];

  @Column({ name: 'service_type' })
  serviceType: string;

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
}

export default Service;
