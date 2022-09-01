import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import FoodService from './food.entity';
// import LocationService from './location.entity';
// import MusicService from './music.entity';
// import User from './users.entity';

@Entity()
class ServiceAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToOne(() => FoodService, (service) => service.id, {
  //     createForeignKeyConstraints: false,
  //   })
  //   @ManyToOne(() => LocationService, (service) => service.id, {
  //     createForeignKeyConstraints: false,
  //   })
  //   @ManyToOne(() => GeneralService, (service) => service.id, {
  //     createForeignKeyConstraints: false,
  //   })
  //   @ManyToOne(() => MusicService, (service) => service.id, {
  //     createForeignKeyConstraints: false,
  //   })
  //   @JoinColumn({ name: 'service_id' })
  @Column({ name: 'service_id' })
  serviceId: number;

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
