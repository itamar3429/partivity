import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', default: null })
  firstName: string;

  @Column({ name: 'last_name', default: null })
  lastName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: 'admin' | 'provider' | 'client';
}

export default User;
