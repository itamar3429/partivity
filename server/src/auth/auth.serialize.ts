import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import User from '../typeorm/users.entity';
import { AuthService } from './auth.service';

export class Serializer extends PassportSerializer {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @Inject('auth_service') private readonly authService: AuthService,
  ) {
    super();
  }
  serializeUser(user: User, done: (err: Error, id: any) => void) {
    done(null, user.id);
  }
  async deserializeUser(
    id: number,
    done: (err: Error, user: Partial<User> | null) => void,
  ) {
    const user = await this.authService.userService.getUserById(id);
    done(null, user);
  }
}
