import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { Serializer } from './auth.serialize';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../typeorm/users.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    Serializer,
    {
      provide: 'auth_service',
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
