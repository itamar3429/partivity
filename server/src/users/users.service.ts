import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../typeorm/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  getUser(user: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: [
        {
          username: user,
        },
        {
          email: user,
        },
      ],
    });
  }

  getUserById(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  createUser(user: RegisterDto) {
    return this.userRepo.save(user);
  }
}
