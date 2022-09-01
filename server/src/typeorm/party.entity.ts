import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import FoodService from './food.entity';
import GeneralService from './general.entity';
import LocationService from './location.entity';
import MusicService from './music.entity';
import User from './users.entity';

@Entity()
class PartyPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: 'pending' | 'open' | 'close';

  @ManyToOne(() => FoodService, (service) => service.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'food_id' })
  foodId: number;

  @ManyToOne(() => LocationService, (service) => service.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'location_id' })
  locationId: number;

  @ManyToOne(() => GeneralService, (service) => service.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'general_id' })
  generalId: number;

  @ManyToOne(() => MusicService, (service) => service.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'music_id' })
  musicId: number;
}

export default PartyPlan;
