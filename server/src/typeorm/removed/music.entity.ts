import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../users.entity';

@Entity()
class MusicService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column({ name: 'music_type' })
  musicType: string;

  @Column()
  title: string;

  @Column()
  description: string;
}

export default MusicService;
