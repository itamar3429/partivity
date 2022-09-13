import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const NAME = 'users';
@Entity({ name: NAME })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', default: null })
  first_name: string;

  @Column({ name: 'last_name', default: null })
  last_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: 'admin' | 'provider' | 'client';

  static getName() {
    return NAME;
  }
}

export default User;
