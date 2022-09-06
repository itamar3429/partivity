import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(readonly userService: UsersService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.getUser(username);
    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createUser(user: RegisterDto) {
    const [usernameExists, emailExists] = await Promise.all([
      this.userService.getUser(user.username),
      this.userService.getUser(user.email),
    ]);
    if (!usernameExists && !emailExists) {
      return {
        user: {
          ...(await this.userService.createUser({
            ...user,
            password: await hash(user.password, 10),
          })),
          password: undefined,
          id: undefined,
        },
        success: true,
      };
    }
    const message = [];
    usernameExists &&
      message.push(
        'username already exists please choose a different username',
      );
    emailExists &&
      message.push('email already exists please choose a different email');
    return {
      message,
      success: false,
    };
  }
}
