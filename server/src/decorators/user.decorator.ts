import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UserEntity from '../typeorm/users.entity';
export type TUser = UserEntity;

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as TUser;
    return user;
  },
);
