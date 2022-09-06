import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './services.entity';

@Entity()
class serviceMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.id, { cascade: true })
  @JoinColumn({ name: 'service_id' })
  serviceId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column()
  image: string;
}

export default serviceMenu;
